"use client";

import { THEMES, type ThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface ThemePickerProps {
  current: ThemeId;
  isPremium: boolean;
  onSelect: (id: ThemeId) => void;
  onNeedPremium: () => void;
}

export function ThemePicker({ current, isPremium, onSelect, onNeedPremium }: ThemePickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase">
        Atmosphere
      </p>
      <div className="grid grid-cols-3 gap-2">
        {THEMES.map((t) => {
          const locked = t.premium && !isPremium;
          return (
            <button
              key={t.id}
              onClick={() => (locked ? onNeedPremium() : onSelect(t.id))}
              className={cn(
                "relative rounded-2xl border p-3 text-left transition-all",
                current === t.id
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border hover:border-primary/25"
              )}
              style={{ background: t.pageBg }}
            >
              <div
                className="w-full h-8 rounded-lg mb-2"
                style={{
                  background: `linear-gradient(135deg, ${t.accentSoft}, ${t.cardBg})`,
                  border: `1px solid ${t.accent}22`,
                }}
              />
              <p className="text-xs font-medium" style={{ color: t.text }}>
                {t.name}
              </p>
              {locked && (
                <span className="absolute top-2 right-2 p-1 rounded-full bg-white/90 text-muted-foreground">
                  <Lock className="w-3 h-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Themes change colors and the default sound under your voice.
        {isPremium ? "" : " Full practice unlocks every atmosphere."}
      </p>
    </div>
  );
}
