"use client";

import { useState } from "react";
import { Sparkles, Loader2, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalAffirmationProps {
  canUseAi: boolean;
  aiLeft: number | "unlimited";
  onNeedPremium: () => void;
  onPractice: (text: string) => void;
  onGenerated?: () => void;
}

export function PersonalAffirmation({
  canUseAi,
  aiLeft,
  onNeedPremium,
  onPractice,
  onGenerated,
}: PersonalAffirmationProps) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    if (!canUseAi) {
      onNeedPremium();
      return;
    }
    setOpen(true);
  };

  const generate = async () => {
    if (!canUseAi) {
      onNeedPremium();
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch("/api/ai/affirmations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mood }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not generate affirmations.");
        return;
      }
      setResults(data.affirmations || []);
      onGenerated?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-left hover:border-primary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e8f0eb] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Make it personal</p>
            <p className="text-xs text-muted-foreground">
              {canUseAi
                ? aiLeft === "unlimited"
                  ? "AI affirmations for your situation"
                  : `${aiLeft} free AI suggestion${aiLeft === 1 ? "" : "s"} left`
                : "Premium · unlock AI affirmations"}
            </p>
          </div>
        </div>
        <span className="text-xs text-primary font-medium">Try</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <h3 className="text-base font-medium">Personal affirmations</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 pb-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tell us what you’re working on. We’ll suggest a few short lines you can record in your own voice.
              </p>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">What’s on your mind?</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="e.g. I feel nervous before presentations at work"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/40 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">How do you want to feel? (optional)</label>
                <input
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g. calm, confident, grounded"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/40"
                />
              </div>

              <button
                onClick={generate}
                disabled={loading || prompt.trim().length < 3}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-opacity",
                  loading || prompt.trim().length < 3
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Writing…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Suggest affirmations
                  </>
                )}
              </button>

              {error && <p className="text-sm text-[#b85c5c]">{error}</p>}

              {results.length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-muted-foreground">Choose one to practice</p>
                  {results.map((line) => (
                    <div
                      key={line}
                      className="rounded-xl border border-border bg-background p-3 space-y-2"
                    >
                      <p className="text-sm text-foreground leading-relaxed">{line}</p>
                      <button
                        onClick={() => {
                          setOpen(false);
                          onPractice(line);
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        Record this
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Suggestions only — not medical or therapeutic advice. Edit anything that doesn’t feel true for you.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
