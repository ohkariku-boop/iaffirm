"use client";

import { Heart, Mic, Trash2 } from "lucide-react";
import type { Affirmation } from "@/types";
import type { LibraryState } from "@/hooks/useLibrary";

interface LibraryViewProps {
  lib: LibraryState;
  affirmations: Affirmation[];
  isPremium: boolean;
  onPractice: (text: string) => void;
  onRemoveRecording: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpgrade: () => void;
}

export function LibraryView({
  lib,
  affirmations,
  isPremium,
  onPractice,
  onRemoveRecording,
  onToggleFavorite,
  onUpgrade,
}: LibraryViewProps) {
  const favAffirmations = affirmations.filter((a) => lib.favorites.includes(a.id));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Your library</h2>
        <p className="text-sm text-muted-foreground">
          Favorites, personal lines, and recordings you save.
        </p>
      </div>

      {/* Favorites */}
      <section className="space-y-3">
        <h3 className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5" /> Favorites
        </h3>
        {favAffirmations.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border px-4 py-6 text-center">
            Heart an affirmation on Today to keep it here.
          </p>
        ) : (
          <div className="space-y-2">
            {favAffirmations.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-border bg-white px-4 py-3 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  {a.category && (
                    <p className="text-[11px] text-muted-foreground mb-1">
                      {a.category.icon} {a.category.name}
                    </p>
                  )}
                  <p className="text-sm text-foreground leading-relaxed">{a.content}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => onPractice(a.content)}
                    className="p-2 rounded-full bg-[#e8f0eb] text-primary"
                    aria-label="Record"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(a.id)}
                    className="p-2 rounded-full text-[#b85c5c]"
                    aria-label="Unfavorite"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom / AI lines */}
      <section className="space-y-3">
        <h3 className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase">
          Personal lines
        </h3>
        {lib.customLines.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border px-4 py-6 text-center">
            Lines from “Write for me” appear here when you save them.
          </p>
        ) : (
          <div className="space-y-2">
            {lib.customLines.map((line) => (
              <div
                key={line.id}
                className="rounded-2xl border border-border bg-white px-4 py-3 flex items-start justify-between gap-3"
              >
                <p className="text-sm text-foreground leading-relaxed">{line.content}</p>
                <button
                  onClick={() => onPractice(line.content)}
                  className="p-2 rounded-full bg-[#e8f0eb] text-primary shrink-0"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recordings metadata */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5" /> Recordings
          </h3>
          {!isPremium && (
            <button onClick={onUpgrade} className="text-[11px] text-primary font-medium">
              Unlimited with full practice
            </button>
          )}
        </div>
        {lib.recordings.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border px-4 py-6 text-center">
            After you record and save, a note of that practice shows up here.
          </p>
        ) : (
          <div className="space-y-2">
            {lib.recordings.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-border bg-white px-4 py-3 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{r.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onPractice(r.text)}
                    className="p-2 rounded-full bg-[#e8f0eb] text-primary"
                    aria-label="Record again"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveRecording(r.id)}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
