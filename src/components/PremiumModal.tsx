"use client";

import { useState } from "react";
import { X, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PREMIUM, type PlanId } from "@/lib/premium";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe?: (plan: PlanId) => void;
}

export function PremiumModal({ open, onClose, onSubscribe }: PremiumModalProps) {
  const [plan, setPlan] = useState<PlanId>("yearly");

  if (!open) return null;

  const handleSubscribe = () => {
    // Placeholder: wire Stripe / App Store later
    onSubscribe?.(plan);
    alert(
      plan === "yearly"
        ? "Yearly plan selected ($29.99/year). Payment integration coming soon."
        : "Monthly plan selected ($3.99/month). Payment integration coming soon."
    );
    onClose();
  };

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

          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide uppercase">iAffirm Premium</span>
          </div>
          <h2 className="text-2xl font-medium text-foreground leading-snug">
            A deeper practice,<br />still gentle.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Unlock unlimited recordings, ambient sounds, personal affirmations, and a library that grows with you.
          </p>
        </div>

        {/* Plans */}
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

        {/* Features */}
        <div className="px-6 py-5 space-y-3">
          {PREMIUM.features.map((f) => (
            <div key={f.id} className="flex gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#e8f0eb] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handleSubscribe}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Continue with {plan === "yearly" ? "Yearly" : "Monthly"}
          </button>
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            Payment coming soon. Free users can still browse and try a few recordings.
          </p>
        </div>
      </div>
    </div>
  );
}
