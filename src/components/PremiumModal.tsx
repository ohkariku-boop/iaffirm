"use client";

import { useState } from "react";
import { X, Check, Heart, Mic, Volume2, Pencil } from "lucide-react";
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
    body: "Keep going in your own voice — unlimited recordings when you’re ready for a fuller practice.",
    icon: Mic,
  },
  ai: {
    title: "You’ve used your free personal lines",
    body: "Get affirmations written for what you’re actually going through, anytime you need them.",
    icon: Pencil,
  },
  ambient: {
    title: "That sound is part of the fuller practice",
    body: "Soft rain and quiet bowls sit under your voice. They’re included when you open the full practice.",
    icon: Volume2,
  },
  general: {
    title: "Your practice, a little deeper",
    body: "Unlimited recordings in your voice, personal lines for your situation, and gentle sounds under them.",
    icon: Heart,
  },
};

export function PremiumModal({
  open,
  onClose,
  onSubscribe,
  reason = "general",
}: PremiumModalProps) {
  const [plan, setPlan] = useState<PlanId>("yearly");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  if (!open) return null;

  const handleCheckout = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      // Stripe not configured — demo unlock on device
      if (data.demo || res.status === 503) {
        onSubscribe?.(plan);
        onClose();
        return;
      }
      setErr(data.error || "Checkout unavailable. Try again later.");
    } catch {
      onSubscribe?.(plan);
      onClose();
    } finally {
      setLoading(false);
    }
  };

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

          <div className="w-11 h-11 rounded-full bg-[#fce8e8] flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-[#b85c5c]" />
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
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading
              ? "Redirecting…"
              : `Continue · ${plan === "yearly" ? `$${PREMIUM.yearlyPrice}/year` : `$${PREMIUM.monthlyPrice}/month`}`}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Not now — keep browsing
          </button>
          {err && <p className="text-center text-[11px] text-red-600">{err}</p>}
          <p className="text-center text-[11px] text-muted-foreground">
            Secure checkout when Stripe is configured. Otherwise unlocks on this device for demo.
          </p>
        </div>
      </div>
    </div>
  );
}
