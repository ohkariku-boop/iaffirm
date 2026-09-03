"use client";

import { useState } from "react";
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

  const handleFavorite = () => {
    setFavorited(!favorited);
    onFavorite?.();
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 md:p-8 transition-all",
        large ? "affirmation-card-featured min-h-[240px] flex flex-col justify-center" : "affirmation-card",
        className
      )}
    >
      {affirmation.category && (
        <div className="absolute top-4 left-5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{affirmation.category.icon}</span>
          <span>{affirmation.category.name}</span>
        </div>
      )}

      <p
        className={cn(
          "text-center font-medium leading-relaxed text-foreground",
          large ? "text-xl md:text-2xl mt-4" : "text-base md:text-lg"
        )}
      >
        {affirmation.content}
      </p>

      <div className={cn("flex items-center justify-center gap-2", large ? "mt-8" : "mt-5")}>
        <button
          onClick={handleFavorite}
          className={cn(
            "p-2.5 rounded-full transition-colors",
            favorited
              ? "bg-[#fce8e8] text-[#c45c5c]"
              : "bg-muted text-muted-foreground hover:text-[#c45c5c]"
          )}
          aria-label="Favorite"
        >
          <Heart className={cn("w-4 h-4", favorited && "fill-current")} />
        </button>

        <button
          onClick={onPractice}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Mic className="w-4 h-4" />
          Record
        </button>
      </div>
    </div>
  );
}
