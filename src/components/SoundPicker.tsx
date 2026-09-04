"use client";

import { SOUND_OPTIONS, type AmbienceId } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { Lock, Volume2 } from "lucide-react";

interface SoundPickerProps {
  current: AmbienceId;
  isPremium: boolean;
  onSelect: (id: AmbienceId) => void;
  onNeedPremium: () => void;
  accent?: string;
}

export function SoundPicker({
  current,
  isPremium,
  onSelect,
  onNeedPremium,
  accent = "#4a7c68",
}: SoundPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Volume2 className="w-4 h-4" style={{ color: accent }} />
        <p className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase">
          Background sound
        </p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Plays under your voice when you listen back to a recording. Full practice unlocks every sound.
      </p>
      <div className="grid gap-2">
        {SOUND_OPTIONS.map((s) => {
          const locked = s.premium && !isPremium;
          const active = current === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => (locked ? onNeedPremium() : onSelect(s.id))}
              className={cn(
                "w-full text-left rounded-2xl border px-4 py-3 transition-all flex items-start justify-between gap-3",
                active ? "border-primary bg-white shadow-sm" : "border-border bg-white/70 hover:border-primary/30"
              )}
              style={active ? { borderColor: accent, background: `${accent}10` } : undefined}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  {s.name}
                  {locked && <Lock className="w-3 h-3 text-muted-foreground" />}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
              </div>
              {active && (
                <span className="text-[10px] font-medium uppercase tracking-wide shrink-0" style={{ color: accent }}>
                  Default
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
