"use client";

import { Heart } from "lucide-react";

interface LimitBannerProps {
  recordingsLeft: number | "unlimited";
  aiLeft: number | "unlimited";
  onUpgrade: () => void;
}

export function LimitBanner({ recordingsLeft, aiLeft, onUpgrade }: LimitBannerProps) {
  const rec = typeof recordingsLeft === "number" ? recordingsLeft : null;
  const ai = typeof aiLeft === "number" ? aiLeft : null;

  if (rec === null && ai === null) return null;

  const exhausted = (rec === 0 || rec === null) && (ai === 0 || ai === null);
  const low = (rec !== null && rec <= 1) || (ai !== null && ai <= 1);

  if (!exhausted && !low && rec !== null && rec > 1 && ai !== null && ai > 1) {
    return (
      <p className="text-xs text-muted-foreground text-center">
        {rec} free recording{rec === 1 ? "" : "s"}
        {" · "}
        {ai} free personal line{ai === 1 ? "" : "s"} left
      </p>
    );
  }

  if (exhausted) {
    return (
      <button
        onClick={onUpgrade}
        className="w-full rounded-2xl border border-[#e8c4c4] bg-[#fdf6f6] px-4 py-3 text-left hover:bg-[#fceeee] transition-colors"
      >
        <div className="flex items-start gap-3">
          <Heart className="w-4 h-4 text-[#b85c5c] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Free tries used — ready to go further?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Open the full practice for unlimited recordings and personal lines.
            </p>
          </div>
        </div>
      </button>
    );
  }

  const msg =
    rec === 0
      ? "No free recordings left"
      : rec === 1
        ? "1 free recording left"
        : ai === 0
          ? "No free personal lines left"
          : ai === 1
            ? "1 free personal line left"
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
            Continue without limits when you’re ready
          </p>
        </div>
        <span className="text-xs font-medium text-primary shrink-0">See options</span>
      </div>
    </button>
  );
}
