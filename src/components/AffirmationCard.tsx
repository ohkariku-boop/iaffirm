"use client";

import { useState } from "react";
import { Heart, Volume2, Mic, Share2 } from "lucide-react";
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

  const handleFavorite = () => {
    setFavorited(!favorited);
    onFavorite?.();
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-card border border-border p-6 md:p-8 affirmation-glow transition-all duration-300",
        large ? "min-h-[280px] flex flex-col justify-center" : "",
        className
      )}
    >
      {affirmation.category && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{affirmation.category.icon}</span>
          <span>{affirmation.category.name}</span>
        </div>
      )}

      <p
        className={cn(
          "text-center font-medium leading-relaxed tracking-tight",
          large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
        )}
      >
        {affirmation.content}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handleFavorite}
          className={cn(
            "p-2.5 rounded-full transition-colors",
            favorited
              ? "bg-pink-500/20 text-pink-400"
              : "bg-muted/50 text-muted-foreground hover:text-pink-400"
          )}
          aria-label="Favorite"
        >
          <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
        </button>

        <button
          onClick={onPractice}
          className="p-2.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          aria-label="Practice / Speak"
        >
          <Mic className="w-5 h-5" />
        </button>

        <button
          className="p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Listen"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <button
          className="p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
