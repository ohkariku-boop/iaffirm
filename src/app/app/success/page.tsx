"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { loadUsage, saveUsage } from "@/lib/premium";

export default function CheckoutSuccessPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const usage = loadUsage();
    saveUsage({ ...usage, isPremium: true });
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f0ea] px-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[#e8f0eb] flex items-center justify-center mx-auto">
          <Check className="w-7 h-7 text-[#5b8a72]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#2a2825]">Full practice is on</h1>
          <p className="text-sm text-[#6b6560] leading-relaxed">
            {ready
              ? "Thank you. Themes, the full library, and unlimited recordings are unlocked on this device."
              : "Activating…"}
          </p>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center justify-center w-full py-3.5 rounded-2xl bg-[#5b8a72] text-white text-sm font-medium"
        >
          Continue practicing
        </Link>
      </div>
    </div>
  );
}
