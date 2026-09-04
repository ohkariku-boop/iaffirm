"use client";

import { THEMES, type ThemeId, type Theme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Lock, Mic } from "lucide-react";

interface ThemePickerProps {
  current: ThemeId;
  isPremium: boolean;
  onSelect: (id: ThemeId) => void;
  onNeedPremium: () => void;
  /** Live preview theme (hover or current) */
  previewId?: ThemeId;
  onPreview?: (id: ThemeId | null) => void;
}

function PreviewPhone({ theme }: { theme: Theme }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[220px] rounded-[1.75rem] border-[6px] border-[#2a2825]/90 shadow-xl overflow-hidden aspect-[9/16]"
      style={{ background: theme.pageBackground }}
    >
      {/* status bar fake */}
      <div className="flex justify-between px-4 pt-2 text-[9px] opacity-50" style={{ color: theme.text }}>
        <span>9:41</span>
        <span>●●●</span>
      </div>
      <div className="px-4 pt-6 pb-4 flex flex-col h-[calc(100%-1.5rem)]">
        <p
          className="text-[9px] uppercase tracking-[0.14em] text-center mb-4"
          style={{ color: theme.muted, fontFamily: theme.fontUi }}
        >
          {theme.name}
        </p>
        <div
          className="flex-1 rounded-2xl px-4 py-8 flex flex-col items-center justify-center text-center"
          style={{
            background: theme.cardBackground,
            border: `1px solid ${theme.cardBorder}`,
            boxShadow: theme.cardShadow,
          }}
        >
          <p
            className="leading-snug"
            style={{
              color: theme.text,
              fontFamily: theme.fontAffirmation,
              fontWeight: theme.affirmWeight,
              letterSpacing: theme.affirmTracking,
              fontSize: "0.95rem",
            }}
          >
            {theme.previewLine}
          </p>
          <div
            className="mt-6 flex items-center gap-1.5 text-[9px] font-medium px-3 py-1.5 rounded-full text-white"
            style={{ background: theme.accent }}
          >
            <Mic className="w-2.5 h-2.5" />
            Record in your voice
          </div>
        </div>
        <p className="text-[8px] text-center mt-3 opacity-60" style={{ color: theme.muted, fontFamily: theme.fontUi }}>
          Your voice · not just a wallpaper
        </p>
      </div>
    </div>
  );
}

export function ThemePicker({
  current,
  isPremium,
  onSelect,
  onNeedPremium,
  previewId,
  onPreview,
}: ThemePickerProps) {
  const activePreview = THEMES.find((t) => t.id === (previewId || current)) || THEMES[0];

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase">
        Atmosphere
      </p>

      {/* Live preview */}
      <div className="rounded-2xl border border-border bg-white/50 px-4 py-5">
        <p className="text-xs text-muted-foreground text-center mb-4">
          Preview · {activePreview.name}
          {activePreview.premium && !isPremium ? " (full practice)" : ""}
        </p>
        <PreviewPhone theme={activePreview} />
        <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
          Each atmosphere has its own colors, type, and card style — built for practice, not only looking pretty.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {THEMES.map((t) => {
          const locked = t.premium && !isPremium;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => (locked ? onNeedPremium() : onSelect(t.id))}
              onMouseEnter={() => onPreview?.(t.id)}
              onMouseLeave={() => onPreview?.(null)}
              onFocus={() => onPreview?.(t.id)}
              onBlur={() => onPreview?.(null)}
              className={cn(
                "relative rounded-2xl border p-2.5 text-left transition-all",
                current === t.id
                  ? "ring-2 ring-offset-1"
                  : "border-border hover:border-primary/30"
              )}
              style={{
                background: t.pageBackground,
                borderColor: current === t.id ? t.accent : undefined,
                // @ts-expect-error ring
                ["--tw-ring-color"]: t.accent,
              }}
            >
              <div
                className="w-full h-10 rounded-lg mb-2 flex items-end justify-center pb-1.5 px-1"
                style={{
                  background: t.cardBackground,
                  border: `1px solid ${t.cardBorder}`,
                }}
              >
                <span
                  className="text-[7px] leading-tight text-center line-clamp-2"
                  style={{
                    fontFamily: t.fontAffirmation,
                    color: t.text,
                    fontWeight: t.affirmWeight,
                  }}
                >
                  Aa
                </span>
              </div>
              <p className="text-[11px] font-medium truncate" style={{ color: t.text, fontFamily: t.fontUi }}>
                {t.name}
              </p>
              {locked && (
                <span className="absolute top-1.5 right-1.5 p-0.5 rounded-full bg-white/90 text-muted-foreground">
                  <Lock className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Tap to apply. Hover to preview type and color.
        {isPremium ? "" : " Full practice unlocks every atmosphere."}
      </p>
    </div>
  );
}
