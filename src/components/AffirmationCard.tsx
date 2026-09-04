"use client";

import { useState, useEffect } from "react";
import { Heart, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Affirmation } from "@/types";

interface AffirmationCardProps {
  affirmation: Affirmation;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onPractice?: () => void;
  className?: string;
  large?: boolean;
}

export function AffirmationCard({
  affirmation,
  isFavorite = false,
  onFavorite,
  onPractice,
  className,
  large = false,
}: AffirmationCardProps) {
  const [favorited, setFavorited] = useState(isFavorite);

  useEffect(() => {
    setFavorited(isFavorite);
  }, [isFavorite]);

  const handleFavorite = () => {
    setFavorited(!favorited);
    onFavorite?.();
  };

  if (large) {
    return (
      <div
        className={cn(
          "relative rounded-[1.75rem] px-7 py-12 md:px-10 md:py-14 affirmation-hero overflow-hidden",
          className
        )}
      >
        {/* Soft decorative wash */}
        <div
          className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(74,124,104,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-12 w-48 h-48 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(196,154,92,0.15) 0%, transparent 70%)" }}
        />

        {affirmation.category && (
          <div className="relative flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6 tracking-wide">
            <span>{affirmation.category.icon}</span>
            <span className="uppercase tracking-[0.12em] text-[11px]">{affirmation.category.name}</span>
          </div>
        )}

        <p className="relative text-center text-[1.35rem] md:text-[1.65rem] font-medium leading-[1.45] tracking-[-0.01em] text-foreground max-w-sm mx-auto">
          {affirmation.content}
        </p>

        <div className="relative mt-10 flex items-center justify-center gap-3">
          <button
            onClick={handleFavorite}
            className={cn(
              "p-3 rounded-full transition-colors",
              favorited
                ? "bg-[#fceaea] text-[#b85c5c]"
                : "bg-white/80 text-muted-foreground hover:text-[#b85c5c] border border-border/60"
            )}
            aria-label="Favorite"
          >
            <Heart className={cn("w-4 h-4", favorited && "fill-current")} />
          </button>

          <button
            onClick={onPractice}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <Mic className="w-4 h-4" />
            Record in your voice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl px-5 py-6 affirmation-card transition-all",
        className
      )}
    >
      {affirmation.category && (
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3 tracking-wide">
          <span>{affirmation.category.icon}</span>
          <span>{affirmation.category.name}</span>
        </div>
      )}

      <p className="text-[15px] md:text-base font-medium leading-relaxed text-foreground">
        {affirmation.content}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleFavorite}
          className={cn(
            "p-2 rounded-full transition-colors",
            favorited
              ? "bg-[#fceaea] text-[#b85c5c]"
              : "bg-muted text-muted-foreground hover:text-[#b85c5c]"
          )}
          aria-label="Favorite"
        >
          <Heart className={cn("w-3.5 h-3.5", favorited && "fill-current")} />
        </button>
        <button
          onClick={onPractice}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-primary bg-[#e8f0eb] hover:bg-[#dce8e0] transition-colors"
        >
          <Mic className="w-3.5 h-3.5" />
          Record
        </button>
      </div>
    </div>
  );
}
