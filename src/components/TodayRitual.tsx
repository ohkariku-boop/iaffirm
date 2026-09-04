"use client";

import { Mic, Check } from "lucide-react";
import type { Affirmation } from "@/types";

interface TodayRitualProps {
  affirmation: Affirmation;
  practiced: boolean;
  onPractice: () => void;
  theme?: {
    accent: string;
    accentSoft: string;
    text: string;
    muted: string;
    cardBackground: string;
    cardBorder: string;
    cardShadow: string;
    fontAffirmation: string;
    affirmTracking: string;
    affirmWeight: number;
  };
}

export function TodayRitual({
  affirmation,
  practiced,
  onPractice,
  theme,
}: TodayRitualProps) {
  const accent = theme?.accent ?? "#4a7c68";
  const muted = theme?.muted ?? "#6f6a63";
  const text = theme?.text ?? "#2a2825";

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[11px] font-medium tracking-[0.14em] uppercase"
            style={{ color: muted }}
          >
            Today&apos;s practice
          </p>
          <p className="text-xs mt-0.5" style={{ color: muted }}>
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {practiced ? (
          <span
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
            style={{ background: theme?.accentSoft ?? "#e8f0eb", color: accent }}
          >
            <Check className="w-3 h-3" />
            Practiced
          </span>
        ) : (
          <span className="text-[11px]" style={{ color: muted }}>
            One line · your voice
          </span>
        )}
      </div>

      <div
        className="rounded-[1.5rem] px-6 py-10 text-center"
        style={{
          background: theme?.cardBackground ?? "#fff",
          border: `1px solid ${theme?.cardBorder ?? "rgba(0,0,0,0.06)"}`,
          boxShadow: theme?.cardShadow,
        }}
      >
        {affirmation.category && (
          <p className="text-[11px] mb-3" style={{ color: muted }}>
            {affirmation.category.icon} {affirmation.category.name}
          </p>
        )}
        <p
          className="leading-snug"
          style={{
            color: text,
            fontFamily: theme?.fontAffirmation,
            fontWeight: theme?.affirmWeight ?? 500,
            letterSpacing: theme?.affirmTracking ?? "-0.01em",
            fontSize: "1.35rem",
          }}
        >
          {affirmation.content}
        </p>
        <button
          onClick={onPractice}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: accent }}
        >
          <Mic className="w-4 h-4" />
          {practiced ? "Practice again" : "Record this line"}
        </button>
      </div>
    </section>
  );
}
