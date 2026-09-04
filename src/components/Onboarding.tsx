"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { Category } from "@/types";

type Step = "welcome" | "focus" | "ready";

interface OnboardingProps {
  categories: Category[];
  onComplete: (focusSlug: string | null) => void;
}

export function Onboarding({ categories, onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[70] bg-[#f4f0ea] flex flex-col">
      <div className="px-6 pt-6">
        <Logo size="sm" href="/" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-6 pb-12">
        {step === "welcome" && (
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-wide text-[#5b8a72]">Welcome</p>
              <h1 className="text-3xl font-semibold tracking-tight text-[#2a2825] leading-snug">
                The words you speak to yourself matter.
              </h1>
              <p className="text-[#6b6560] leading-relaxed">
                iAffirm is a quiet place to practice kinder self-talk — in your own voice.
                Record a line. Listen back. Let it land.
              </p>
            </div>
            <button
              onClick={() => setStep("focus")}
              className="w-full py-3.5 rounded-2xl bg-[#5b8a72] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === "focus" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm tracking-wide text-[#5b8a72]">Step 2 of 3</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#2a2825]">
                What do you need most right now?
              </h2>
              <p className="text-sm text-[#6b6560]">
                You can change this anytime. Pick one to begin.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFocus(c.slug)}
                  className={`text-left rounded-2xl border px-4 py-3 transition-all ${
                    focus === c.slug
                      ? "border-[#5b8a72] bg-[#e8f0eb] ring-1 ring-[#5b8a72]/30"
                      : "border-[#e5dfd5] bg-white hover:border-[#5b8a72]/40"
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <p className="text-sm font-medium text-[#2a2825] mt-1">{c.name}</p>
                </button>
              ))}
            </div>
            <button
              disabled={!focus}
              onClick={() => setStep("ready")}
              className="w-full py-3.5 rounded-2xl bg-[#5b8a72] text-white text-sm font-medium disabled:opacity-40 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === "ready" && (
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-wide text-[#5b8a72]">Ready</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#2a2825]">
                Your first practice is simple.
              </h2>
              <ul className="space-y-3 text-[#6b6560] text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-[#5b8a72] font-medium">1.</span>
                  Read today&apos;s line
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5b8a72] font-medium">2.</span>
                  Record it in your own voice
                </li>
                <li className="flex gap-2">
                  <span className="text-[#5b8a72] font-medium">3.</span>
                  Play it back — let the words land
                </li>
              </ul>
              <p className="text-xs text-[#6b6560]/90 leading-relaxed">
                Recordings stay on this device. Nothing is uploaded unless you use features that need the network (like personal lines).
              </p>
            </div>
            <button
              onClick={() => onComplete(focus)}
              className="w-full py-3.5 rounded-2xl bg-[#5b8a72] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              Begin today&apos;s practice
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
