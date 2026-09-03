"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Trash2, Check, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  affirmationText: string;
  onSave?: (audioBlob: Blob) => void;
  onClose?: () => void;
}

export function VoiceRecorder({ affirmationText, onSave, onClose }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);

  // Soft ambient pad using Web Audio (no external file needed)
  const startAmbientMusic = async () => {
    if (!musicEnabled) return;
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.value = 0.04; // very soft
      gain.connect(ctx.destination);
      musicGainRef.current = gain;

      // Gentle ethereal tones (C major-ish soft pad)
      const freqs = [130.81, 164.81, 196.0, 261.63]; // C3 E3 G3 C4
      oscRefs.current = freqs.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        oscGain.gain.value = 0.15 - i * 0.02;
        // subtle slow tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.15 + i * 0.05;
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        osc.connect(oscGain);
        oscGain.connect(gain);
        osc.start();
        lfo.start();
        return osc;
      });
    } catch (e) {
      console.warn("Ambient music unavailable", e);
    }
  };

  const stopAmbientMusic = () => {
    oscRefs.current.forEach((o) => {
      try { o.stop(); } catch { /* already stopped */ }
    });
    oscRefs.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    musicGainRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
      stopAmbientMusic();
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
      stopAmbientMusic();
      setIsPlaying(false);
    } else {
      if (musicEnabled) await startAmbientMusic();
      voiceRef.current.currentTime = 0;
      await voiceRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVoiceEnded = () => {
    stopAmbientMusic();
    setIsPlaying(false);
  };

  const handleSave = () => {
    if (chunksRef.current.length && onSave) {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onSave(blob);
    }
  };

  const reset = () => {
    stopAmbientMusic();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlaying(false);
    setDuration(0);
    chunksRef.current = [];
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
        {/* Header */}
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
                <audio
                  ref={voiceRef}
                  src={audioUrl}
                  onEnded={handleVoiceEnded}
                />
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
                  {isPlaying ? "Playing with soft ambient tone…" : "Listen to your recording"}
                </p>

                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={cn(
                    "flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-colors",
                    musicEnabled
                      ? "border-primary/40 text-primary bg-[#e8f0eb]"
                      : "border-border text-muted-foreground"
                  )}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {musicEnabled ? "Ambient sound on" : "Ambient sound off"}
                </button>

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
