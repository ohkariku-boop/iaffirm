"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface AboutPracticeProps {
  open: boolean;
  onClose: () => void;
}

export function AboutPractice({ open, onClose }: AboutPracticeProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/35 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-base font-medium text-foreground">How this practice works</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pb-6 space-y-5 text-sm leading-relaxed text-foreground/90">
          <div>
            <p className="font-medium text-foreground mb-1">Your own voice</p>
            <p className="text-muted-foreground">
              The mind learns from what it hears often. Words you speak and hear in your own
              voice can land differently than a line on a screen.
            </p>
          </div>

          <div>
            <p className="font-medium text-foreground mb-1">Short and repeated</p>
            <p className="text-muted-foreground">
              Small, regular practice is how habits form. A few honest lines, returned to often,
              matter more than a long list you never revisit.
            </p>
          </div>

          <div>
            <p className="font-medium text-foreground mb-1">Make it personal</p>
            <p className="text-muted-foreground">
              Lines that feel true are easier to say and easier to believe. If a phrase feels
              false, change it until it fits.
            </p>
          </div>

          <div className="rounded-2xl bg-[#f7f3ed] border border-border px-4 py-3">
            <p className="font-medium text-foreground mb-1">What this is not</p>
            <p className="text-muted-foreground">
              iAffirm is a gentle self-talk practice, not therapy or medical treatment. If you
              need professional support, please reach out to a qualified provider or local
              resources.{" "}
              <Link href="/disclaimer" className="text-primary underline underline-offset-2">
                Health disclaimer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
