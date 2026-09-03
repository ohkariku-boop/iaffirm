"use client";

import { Sparkles } from "lucide-react";

interface LimitBannerProps {
  recordingsLeft: number | "unlimited";
  aiLeft: number | "unlimited";
  onUpgrade: () => void;
}

export function LimitBanner({ recordingsLeft, aiLeft, onUpgrade }: LimitBannerProps) {
  const rec =
    typeof recordingsLeft === "number" ? recordingsLeft : null;
  const ai = typeof aiLeft === "number" ? aiLeft : null;

  // Don't show if unlimited
  if (rec === null && ai === null) return null;

  const exhausted = (rec === 0 || rec === null) && (ai === 0 || ai === null);
  const low = (rec !== null && rec <= 1) || (ai !== null && ai <= 1);

  if (!exhausted && !low && rec !== null && rec > 1 && ai !== null && ai > 1) {
    // Soft status only
    return (
      <p className="text-xs text-muted-foreground text-center">
        {rec} free recording{rec === 1 ? "" : "s"}
        {" · "}
        {ai} free AI suggestion{ai === 1 ? "" : "s"} left
      </p>
    );
  }

  if (exhausted) {
    return (
      <button
        onClick={onUpgrade}
        className="w-full rounded-2xl border border-primary/25 bg-[#e8f0eb]/80 px-4 py-3 text-left hover:bg-[#e8f0eb] transition-colors"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Free tries used — ready for more?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Unlock unlimited recordings and personal AI affirmations from $3.99/mo.
            </p>
          </div>
        </div>
      </button>
    );
  }

  // Low on one resource
  const msg =
    rec === 0
      ? "No free recordings left"
      : rec === 1
        ? "1 free recording left"
        : ai === 0
          ? "No free AI suggestions left"
          : ai === 1
            ? "1 free AI suggestion left"
            : null;

  if (!msg) return null;

  return (
    <button
      onClick={onUpgrade}
      className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-left hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{msg}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Premium continues your practice without limits
          </p>
        </div>
        <span className="text-xs font-medium text-primary shrink-0">Upgrade</span>
      </div>
    </button>
  );
}
