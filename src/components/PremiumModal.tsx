"use client";

import { useState } from "react";
import { X, Check, Sparkles, Mic, Volume2, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { PREMIUM, type PlanId } from "@/lib/premium";

export type PremiumReason = "recordings" | "ai" | "ambient" | "general";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe?: (plan: PlanId) => void;
  reason?: PremiumReason;
}

const REASON_COPY: Record<
  PremiumReason,
  { title: string; body: string; icon: typeof Mic }
> = {
  recordings: {
    title: "You’ve used your free recordings",
    body: "Premium lets you record without limits — so the words that matter can live in your own voice.",
    icon: Mic,
  },
  ai: {
    title: "You’ve used your free AI suggestions",
    body: "Premium unlocks personal affirmations whenever you need lines that fit this moment.",
    icon: Brain,
  },
  ambient: {
    title: "That sound is in Premium",
    body: "Soft rain and quiet bowls sit gently under your voice. Unlock all ambient sounds with Premium.",
    icon: Volume2,
  },
  general: {
    title: "A deeper practice, still gentle",
    body: "Unlimited recordings, all ambient sounds, and AI affirmations written for you.",
    icon: Sparkles,
  },
};

export function PremiumModal({
  open,
  onClose,
  onSubscribe,
  reason = "general",
}: PremiumModalProps) {
  const [plan, setPlan] = useState<PlanId>("yearly");
  if (!open) return null;

  const copy = REASON_COPY[reason];
  const Icon = copy.icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-border overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="relative px-6 pt-6 pb-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-11 h-11 rounded-full bg-[#e8f0eb] flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-medium text-foreground leading-snug">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {copy.body}
          </p>
        </div>

        <div className="px-6 space-y-3">
          <button
            onClick={() => setPlan("yearly")}
            className={cn(
              "w-full text-left rounded-2xl border-2 p-4 transition-all",
              plan === "yearly"
                ? "border-primary bg-[#e8f0eb]/60"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">Yearly</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    Best value
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ${PREMIUM.yearlyPerMonth.toFixed(2)}/mo · billed ${PREMIUM.yearlyPrice}/year
                </p>
              </div>
              <span className="text-lg font-medium text-foreground">${PREMIUM.yearlyPrice}</span>
            </div>
          </button>

          <button
            onClick={() => setPlan("monthly")}
            className={cn(
              "w-full text-left rounded-2xl border-2 p-4 transition-all",
              plan === "monthly"
                ? "border-primary bg-[#e8f0eb]/60"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-medium text-foreground">Monthly</span>
                <p className="text-xs text-muted-foreground mt-0.5">Cancel anytime</p>
              </div>
              <span className="text-lg font-medium text-foreground">
                ${PREMIUM.monthlyPrice}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </span>
            </div>
          </button>
        </div>

        <div className="px-6 py-5 space-y-2.5">
          {PREMIUM.features.map((f) => (
            <div key={f.id} className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{f.title}</p>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={() => {
              onSubscribe?.(plan);
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Unlock Premium · {plan === "yearly" ? `$${PREMIUM.yearlyPrice}/yr` : `$${PREMIUM.monthlyPrice}/mo`}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Not now — keep browsing
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Demo: activates on this device. Real checkout comes next.
          </p>
        </div>
      </div>
    </div>
  );
}
