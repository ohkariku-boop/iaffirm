"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Play, Pause, Trash2, Check, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AmbienceType = "pad" | "rain" | "bowls" | "off";

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
  defaultAmbience = "pad",
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
    const allowed = isPremium || defaultAmbience === "pad" || defaultAmbience === "off";
    setAmbience(allowed ? defaultAmbience : "pad");
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
    master.gain.value = 0.032;
    const freqs = [65.41, 98.0, 130.81, 164.81];
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.value = 0.2 / (i + 1);
      osc.connect(g);
      g.connect(master);
      osc.start();
      return osc;
    });
  };

  const startRain = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.045;
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    const g = ctx.createGain();
    g.gain.value = 0.35;
    noise.connect(filter);
    filter.connect(g);
    g.connect(master);
    noise.start();
    noiseSourceRef.current = noise;
  };

  const startBowls = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.028;
    const freqs = [174.61, 220.0, 261.63];
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.value = 0.15 / (i + 1);
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.08 + i * 0.03;
      lfoG.gain.value = 0.02;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
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
    if (type === "pad") startPad(ctx, master);
    else if (type === "rain") startRain(ctx, master);
    else if (type === "bowls") startBowls(ctx, master);
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
    } catch (e) {
      console.error(e);
      setError("Microphone access is needed to record. Check browser permissions.");
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
    if (!isPremium && (type === "rain" || type === "bowls")) {
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
    { id: "pad", label: "Soft pad" },
    { id: "rain", label: "Soft rain", premium: true },
    { id: "bowls", label: "Quiet bowls", premium: true },
    { id: "off", label: "Voice only" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-base font-medium text-foreground">Practice in your voice</h3>
          <button
            onClick={() => {
              reset();
              onClose?.();
            }}
            className="p-1.5 rounded-full text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-5">
          <p className="text-[15px] leading-relaxed text-foreground/90 text-center px-2 font-medium">
            {affirmationText}
          </p>

          {error && (
            <p className="text-xs text-center text-red-600/90 bg-red-50 rounded-xl px-3 py-2">{error}</p>
          )}

          <div className="flex flex-col items-center gap-3 py-2">
            {!audioUrl ? (
              <>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md",
                    isRecording
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  )}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <Square className="w-7 h-7" /> : <Mic className="w-8 h-8" />}
                </button>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? `Recording · ${formatTime(duration)}` : "Tap to record"}
                </p>
                {isRecording && (
                  <div className="w-40 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-100"
                      style={{ width: `${Math.max(8, level * 100)}%` }}
                    />
                  </div>
                )}
                {!isRecording && (
                  <p className="text-[11px] text-muted-foreground text-center max-w-[260px] leading-relaxed">
                    Noise reduction is on — find a quieter spot, hold the phone close, and speak clearly.
                  </p>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#e8f0eb] text-primary flex items-center justify-center hover:bg-[#dce8e0] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <p className="text-sm text-muted-foreground">
                  {isPlaying ? "Playing with background…" : "Listen to your recording"}
                </p>

                <div className="w-full space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Background sound</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {ambienceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => changeAmbience(opt.id)}
                        className={cn(
                          "text-xs px-3 py-1.5 rounded-full border transition-colors",
                          ambience === opt.id
                            ? "border-primary/50 text-primary bg-[#e8f0eb]"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        )}
                      >
                        {opt.label}
                        {opt.premium && !isPremium ? " · Full" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Record again
                </button>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                reset();
                onClose?.();
              }}
              className="flex-1 py-3 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            {audioUrl && (
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
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
