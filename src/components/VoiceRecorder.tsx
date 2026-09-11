"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Play, Pause, Trash2, Check, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AmbienceType = "drone" | "rain" | "bowls" | "ethereal" | "off";

interface VoiceRecorderProps {
  affirmationText: string;
  onSave?: (audioBlob: Blob) => void;
  onClose?: () => void;
  onUpgrade?: () => void;
  isPremium?: boolean;
  defaultAmbience?: AmbienceType;
}

/**
 * Voice capture with browser noise controls + light Web Audio conditioning:
 * high-pass (rumble), gentle compression, soft presence boost, noise floor gate.
 */
async function createCleanVoiceStream(): Promise<{
  stream: MediaStream;
  raw: MediaStream;
  ctx: AudioContext;
  stop: () => void;
}> {
  const raw = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
      // Prefer voice-oriented sample rate when supported
      sampleRate: 48000,
    },
    video: false,
  });

  const ctx = new AudioContext();
  const source = ctx.createMediaStreamSource(raw);

  // Cut low rumble / handling noise
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 85;
  highpass.Q.value = 0.7;

  // Soft presence for speech intelligibility
  const presence = ctx.createBiquadFilter();
  presence.type = "peaking";
  presence.frequency.value = 1800;
  presence.Q.value = 0.9;
  presence.gain.value = 2.5;

  // Tame peaks
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -28;
  compressor.knee.value = 18;
  compressor.ratio.value = 3.5;
  compressor.attack.value = 0.008;
  compressor.release.value = 0.18;

  // Output gain
  const outGain = ctx.createGain();
  outGain.gain.value = 1.05;

  // Simple noise gate via script processor alternative: use analyser + gain automation
  const gateGain = ctx.createGain();
  gateGain.gain.value = 1;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.7;

  source.connect(highpass);
  highpass.connect(presence);
  presence.connect(compressor);
  compressor.connect(analyser);
  analyser.connect(gateGain);
  gateGain.connect(outGain);

  const dest = ctx.createMediaStreamDestination();
  outGain.connect(dest);

  const data = new Uint8Array(analyser.fftSize);
  let gateTimer: number | null = null;
  const gateLoop = () => {
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    // Soft gate: attenuate when very quiet (room noise), open for speech
    const target = rms < 0.018 ? 0.15 : rms < 0.04 ? 0.55 : 1;
    const now = ctx.currentTime;
    gateGain.gain.cancelScheduledValues(now);
    gateGain.gain.setTargetAtTime(target, now, 0.05);
    gateTimer = window.setTimeout(gateLoop, 40);
  };
  gateLoop();

  const stop = () => {
    if (gateTimer) window.clearTimeout(gateTimer);
    raw.getTracks().forEach((t) => t.stop());
    source.disconnect();
    highpass.disconnect();
    presence.disconnect();
    compressor.disconnect();
    analyser.disconnect();
    gateGain.disconnect();
    outGain.disconnect();
    ctx.close().catch(() => {});
  };

  return { stream: dest.stream, raw, ctx, stop };
}

export function VoiceRecorder({
  affirmationText,
  onSave,
  onClose,
  onUpgrade,
  isPremium = false,
  defaultAmbience = "drone",
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ambience, setAmbience] = useState<AmbienceType>(defaultAmbience);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const captureStopRef = useRef<(() => void) | null>(null);
  const levelTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Playback ambience
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const freeOk = defaultAmbience === "drone" || defaultAmbience === "off";
    const allowed = isPremium || freeOk;
    setAmbience(allowed ? defaultAmbience : "drone");
  }, [defaultAmbience, isPremium]);

  useEffect(() => {
    return () => {
      stopAmbience();
      captureStopRef.current?.();
      if (timerRef.current) clearInterval(timerRef.current);
      if (levelTimerRef.current) clearInterval(levelTimerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAmbience = useCallback(() => {
    oscRefs.current.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* */
      }
    });
    oscRefs.current = [];
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
      } catch {
        /* */
      }
      noiseSourceRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);


  const startPad = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.07;
    const freqs = [65.41, 98.0, 130.81, 196.0];
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.value = 0.28 / (i + 1);
      osc.connect(g);
      g.connect(master);
      osc.start();
      return osc;
    });
  };

  const startRain = (ctx: AudioContext, master: GainNode) => {
    // Bright, light patter — distinct from old river (deeper flow)
    master.gain.value = 0.08;
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const high = ctx.createBiquadFilter();
    high.type = "bandpass";
    high.frequency.value = 2800;
    high.Q.value = 0.45;
    const air = ctx.createBiquadFilter();
    air.type = "highpass";
    air.frequency.value = 600;
    const g = ctx.createGain();
    g.gain.value = 0.42;
    noise.connect(air);
    air.connect(high);
    high.connect(g);
    g.connect(master);
    noise.start();
    noiseSourceRef.current = noise;
  };


  const startBowls = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.065;
    const freqs = [174.61, 220.0, 261.63, 329.63];
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.value = 0.2 / (i + 1);
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.06 + i * 0.025;
      lfoG.gain.value = 0.03;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      return osc;
    });
  };

  /** Soft ethereal: airy stacked sines with slow chorus-like motion */
  const startEthereal = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.075;
    const freqs = [130.81, 196.0, 261.63, 329.63, 392.0, 523.25];
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc2.type = "sine";
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 1.003; // slight detune
      g.gain.value = 0.12 / Math.sqrt(i + 1);
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.04 + i * 0.015;
      lfoG.gain.value = 0.025;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      // soft high shelf feel via lowpass on a parallel path is heavy; keep pure
      osc.connect(g);
      osc2.connect(g);
      g.connect(master);
      osc.start();
      osc2.start();
      lfo.start();
      return osc;
    });
  };

  const startAmbience = async (type: AmbienceType) => {
    if (type === "off") return;
    stopAmbience();
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const master = ctx.createGain();
    master.connect(ctx.destination);
    if (type === "drone") startPad(ctx, master);
    else if (type === "rain") startRain(ctx, master);
    else if (type === "bowls") startBowls(ctx, master);
    else if (type === "ethereal") startEthereal(ctx, master);
  };

  const startRecording = async () => {
    setError(null);
    try {
      const capture = await createCleanVoiceStream();
      captureStopRef.current = capture.stop;

      const mime =
        MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "";

      const recorder = mime
        ? new MediaRecorder(capture.stream, { mimeType: mime, audioBitsPerSecond: 128000 })
        : new MediaRecorder(capture.stream);

      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        captureStopRef.current?.();
        captureStopRef.current = null;
        if (levelTimerRef.current) {
          clearInterval(levelTimerRef.current);
          levelTimerRef.current = null;
        }
        setLevel(0);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);

      // Level meter from clean stream track is limited; approximate via time
      levelTimerRef.current = setInterval(() => {
        setLevel((n) => Math.min(1, 0.35 + Math.random() * 0.45));
      }, 120);
    } catch (e: unknown) {
      console.error(e);
      const name = e && typeof e === "object" && "name" in e ? String((e as { name: string }).name) : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setError(
          "Microphone is blocked. On iPhone: Settings → Safari → Microphone, allow this site, then try again. On Android: site settings → allow mic."
        );
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setError("No microphone found. Connect a mic or use a phone with a built-in microphone.");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        setError("Microphone is in use by another app. Close it and try again.");
      } else if (name === "SecurityError") {
        setError("Microphone needs a secure connection (HTTPS) and a user tap to start.");
      } else {
        setError("Microphone access is needed to record. Check browser permissions and try again.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const togglePlay = async () => {
    if (!audioUrl) return;
    if (isPlaying) {
      voiceRef.current?.pause();
      stopAmbience();
      setIsPlaying(false);
      return;
    }
    const audio = new Audio(audioUrl);
    voiceRef.current = audio;
    audio.onended = () => {
      setIsPlaying(false);
      stopAmbience();
    };
    await audio.play();
    setIsPlaying(true);
    if (ambience !== "off") await startAmbience(ambience);
  };

  const changeAmbience = async (type: AmbienceType) => {
    if (!isPremium && type !== "drone" && type !== "off") {
      onUpgrade?.();
      return;
    }
    setAmbience(type);
    if (isPlaying) {
      stopAmbience();
      if (type !== "off") await startAmbience(type);
    }
  };

  const reset = () => {
    stopAmbience();
    voiceRef.current?.pause();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setAudioBlob(null);
    setIsPlaying(false);
    setDuration(0);
    setError(null);
  };

  const handleSave = () => {
    if (audioBlob) onSave?.(audioBlob);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const ambienceOptions: { id: AmbienceType; label: string; premium?: boolean }[] = [
    { id: "drone", label: "Warm drone" },
    { id: "rain", label: "Soft rain", premium: true },
    { id: "bowls", label: "Quiet bowls", premium: true },
    { id: "ethereal", label: "Ethereal", premium: true },
    { id: "off", label: "Voice only" },
  ];

  const ts = themeStyle ?? {
    pageBackground: "#f4f0ea",
    pageBg: "#f4f0ea",
    cardBackground: "rgba(255,255,255,0.95)",
    cardBorder: "rgba(74,124,104,0.14)",
    cardShadow: "0 10px 36px rgba(74,124,104,0.09)",
    text: "#2a2825",
    muted: "#6f6a63",
    accent: "#4a7c68",
    accentSoft: "#e8f0eb",
    fontAffirmation: "var(--font-affirm-serif), Georgia, serif",
    affirmTracking: "0.01em",
    affirmWeight: 500,
    affirmSize: "1.35rem",
    heroWash: "none",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: ts.pageBackground, color: ts.text }}
      role="dialog"
      aria-modal="true"
      aria-label="Record affirmation"
    >
      {/* Atmosphere wash */}
      {ts.heroWash && ts.heroWash !== "none" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: ts.heroWash }}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-col flex-1 max-w-lg mx-auto w-full px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between shrink-0">
          <p
            className="text-[11px] font-medium tracking-[0.14em] uppercase"
            style={{ color: ts.muted }}
          >
            Practice in your voice
          </p>
          <button
            type="button"
            onClick={() => {
              reset();
              onClose?.();
            }}
            className="p-2 rounded-full transition-opacity hover:opacity-80"
            style={{ color: ts.muted, background: `${ts.accent}12` }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-0 py-6">
          <div
            className="relative rounded-[1.75rem] px-6 py-10 sm:px-8 sm:py-12 text-center"
            style={{
              background: ts.cardBackground,
              border: `1px solid ${ts.cardBorder}`,
              boxShadow: ts.cardShadow,
            }}
          >
            <p
              className="leading-snug"
              style={{
                color: ts.text,
                fontFamily: ts.fontAffirmation,
                letterSpacing: ts.affirmTracking,
                fontWeight: ts.affirmWeight,
                fontSize: ts.affirmSize,
              }}
            >
              {affirmationText}
            </p>
          </div>

          {error && (
            <p className="mt-4 text-xs text-center text-red-700/90 bg-red-50/90 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="shrink-0 space-y-5 pb-2">
          <div className="flex flex-col items-center gap-3">
            {!audioUrl ? (
              <>
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg",
                    isRecording ? "bg-red-500 text-white animate-pulse" : "text-white hover:opacity-90"
                  )}
                  style={!isRecording ? { background: ts.accent } : undefined}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <Square className="w-7 h-7" /> : <Mic className="w-8 h-8" />}
                </button>
                <p className="text-sm" style={{ color: ts.muted }}>
                  {isRecording ? `Recording · ${formatTime(duration)}` : "Tap to record"}
                </p>
                {isRecording && (
                  <div
                    className="w-40 h-1.5 rounded-full overflow-hidden"
                    style={{ background: `${ts.accent}22` }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-100"
                      style={{
                        width: `${Math.max(8, level * 100)}%`,
                        background: ts.accent,
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: ts.accent }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
                <p className="text-sm" style={{ color: ts.muted }}>
                  {isPlaying ? "Playing with background…" : "Listen to your recording"}
                </p>

                <div className="w-full space-y-2 pt-1">
                  <div
                    className="flex items-center gap-1.5 text-xs justify-center"
                    style={{ color: ts.muted }}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Background sound</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {ambienceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => changeAmbience(opt.id)}
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                        style={
                          ambience === opt.id
                            ? {
                                borderColor: `${ts.accent}66`,
                                color: ts.accent,
                                background: ts.accentSoft,
                              }
                            : {
                                borderColor: `${ts.accent}28`,
                                color: ts.muted,
                                background: "transparent",
                              }
                        }
                      >
                        {opt.label}
                        {opt.premium && !isPremium ? " · Full" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80 mt-1"
                  style={{ color: ts.muted }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Record again
                </button>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose?.();
              }}
              className="flex-1 py-3.5 rounded-2xl text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: `${ts.accent}18`, color: ts.text }}
            >
              Cancel
            </button>
            {audioUrl && (
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-3.5 rounded-2xl text-sm font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ background: ts.accent }}
              >
                <Check className="w-4 h-4" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
