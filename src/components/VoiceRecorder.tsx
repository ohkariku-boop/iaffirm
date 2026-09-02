"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Trash2, Check } from "lucide-react";
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
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

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    if (chunksRef.current.length && onSave) {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onSave(blob);
    }
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlaying(false);
    setDuration(0);
    chunksRef.current = [];
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Record in your voice</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-2">
            {affirmationText}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!audioUrl ? (
            <>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all",
                  isRecording
                    ? "bg-red-500 animate-pulse"
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white fill-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? `Recording… ${formatTime(duration)}` : "Tap to start recording"}
              </p>
            </>
          ) : (
            <>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayback}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={reset}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Listen back, then save</p>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80"
          >
            Cancel
          </button>
          {audioUrl && (
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
