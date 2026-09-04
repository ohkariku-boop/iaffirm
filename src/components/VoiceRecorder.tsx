"use client";

import { useState, useRef, useEffect } from "react";
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

export function VoiceRecorder({ affirmationText, onSave, onClose, onUpgrade, isPremium = false, defaultAmbience = "pad" }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ambience, setAmbience] = useState<AmbienceType>(defaultAmbience);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const oscRefs = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const allowed = isPremium || defaultAmbience === "pad" || defaultAmbience === "off";
    setAmbience(allowed ? defaultAmbience : "pad");
  }, [defaultAmbience, isPremium]);

  const stopAmbience = () => {
    oscRefs.current.forEach((o) => {
      try { o.stop(); } catch { /* already stopped */ }
    });
    oscRefs.current = [];
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); } catch { /* */ }
      noiseSourceRef.current = null;
    }
    nodesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  // Warm, soft drone pad — slower, lower, more sustained
  const startPad = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.035;
    // Warm low drone + soft upper partials (C major-ish, darker)
    const freqs = [65.41, 98.0, 130.81, 164.81]; // C2 G2 C3 E3
    oscRefs.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i === 0 ? "sine" : "sine";
      osc.frequency.value = freq;
      // Slight detune for warmth
      osc.detune.value = (i % 2 === 0 ? 1 : -1) * (3 + i);
      g.gain.value = 0.22 - i * 0.04;
      // Very slow amplitude movement
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 0.08 + i * 0.03;
      lfoG.gain.value = 0.025;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      return osc;
    });
  };

  // Soft rain-like filtered noise
  const startRain = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.05;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noiseSourceRef.current = noise;

    // Bandpass to soften into rain texture
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.5;

    const filter2 = ctx.createBiquadFilter();
    filter2.type = "lowpass";
    filter2.frequency.value = 2800;

    const g = ctx.createGain();
    g.gain.value = 0.35;

    noise.connect(filter);
    filter.connect(filter2);
    filter2.connect(g);
    g.connect(master);
    noise.start();
  };

  // Quiet singing-bowl style: soft resonant tones with slow beats
  const startBowls = (ctx: AudioContext, master: GainNode) => {
    master.gain.value = 0.03;
    // Two close frequencies create a gentle beating (like bowls)
    const pairs: [number, number][] = [
      [174.61, 175.2],   // F3-ish
      [220.0, 220.8],    // A3
      [261.63, 262.5],   // C4
    ];
    oscRefs.current = [];
    pairs.forEach(([f1, f2], pairIdx) => {
      [f1, f2].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        g.gain.value = 0.12 - pairIdx * 0.02;
        // Slow fade envelope feel via LFO
        const lfo = ctx.createOscillator();
        const lfoG = ctx.createGain();
        lfo.frequency.value = 0.06 + pairIdx * 0.02;
        lfoG.gain.value = 0.04;
        lfo.connect(lfoG);
        lfoG.connect(g.gain);
        osc.connect(g);
        g.connect(master);
        osc.start();
        lfo.start();
        oscRefs.current.push(osc);
      });
    });
  };

  const startAmbience = async (type: AmbienceType) => {
    if (type === "off") return;
    stopAmbience();
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const master = ctx.createGain();
      master.connect(ctx.destination);

      if (type === "pad") startPad(ctx, master);
      else if (type === "rain") startRain(ctx, master);
      else if (type === "bowls") startBowls(ctx, master);
    } catch (e) {
      console.warn("Ambience unavailable", e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
      stopAmbience();
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Please allow microphone access to record your affirmation.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlayback = async () => {
    if (!voiceRef.current || !audioUrl) return;

    if (isPlaying) {
      voiceRef.current.pause();
      stopAmbience();
      setIsPlaying(false);
    } else {
      await startAmbience(ambience);
      voiceRef.current.currentTime = 0;
      await voiceRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVoiceEnded = () => {
    stopAmbience();
    setIsPlaying(false);
  };

  // If user changes ambience while playing, restart it
  const changeAmbience = async (type: AmbienceType) => {
    // Free: pad + voice only; rain/bowls require premium
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

  const handleSave = () => {
    if (chunksRef.current.length && onSave) {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onSave(blob);
    }
  };

  const reset = () => {
    stopAmbience();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlaying(false);
    setDuration(0);
    chunksRef.current = [];
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-base font-medium text-foreground">Record your affirmation</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-6">
          <p className="text-center text-foreground/80 leading-relaxed px-2 pt-2">
            {affirmationText}
          </p>

          <div className="flex flex-col items-center gap-4 py-2">
            {!audioUrl ? (
              <>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-sm",
                    isRecording
                      ? "bg-[#e87070] text-white"
                      : "bg-primary text-white hover:opacity-90"
                  )}
                >
                  {isRecording ? (
                    <Square className="w-7 h-7 fill-current" />
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </button>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? `Recording… ${formatTime(duration)}` : "Tap to record"}
                </p>
              </>
            ) : (
              <>
                <audio ref={voiceRef} src={audioUrl} onEnded={handleVoiceEnded} />
                <button
                  onClick={togglePlayback}
                  className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
                <p className="text-sm text-muted-foreground">
                  {isPlaying ? "Playing…" : "Listen to your recording"}
                </p>

                {/* Ambience selector */}
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
                        {opt.premium && !isPremium ? " · Pro" : ""}
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
              onClick={onClose}
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
