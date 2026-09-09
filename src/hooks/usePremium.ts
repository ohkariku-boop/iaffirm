"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadUsage,
  saveUsage,
  canRecord,
  canUseAi,
  canUseAmbient,
  recordingsLeft,
  aiLeft,
  hasFullAccess,
  isTrialActive,
  getTrialDaysLeft,
  ensureTrialStarted,
  PREMIUM,
  type PremiumUsage,
  type PlanId,
} from "@/lib/premium";

export function usePremium() {
  const [usage, setUsage] = useState<PremiumUsage>(() => loadUsage());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next = loadUsage();
    // Auto-start 10-day Full practice trial on first visit
    const withTrial = ensureTrialStarted(next);
    if (withTrial !== next) {
      saveUsage(withTrial);
      next = withTrial;
    }
    setUsage(next);
    setReady(true);
  }, []);

  const persist = useCallback((next: PremiumUsage) => {
    setUsage(next);
    saveUsage(next);
  }, []);

  const markRecording = useCallback(() => {
    setUsage((prev) => {
      if (hasFullAccess(prev)) return prev;
      const next = { ...prev, recordingsUsed: prev.recordingsUsed + 1 };
      saveUsage(next);
      return next;
    });
  }, []);

  const markAiGeneration = useCallback(() => {
    setUsage((prev) => {
      if (hasFullAccess(prev)) return prev;
      const next = { ...prev, aiGenerationsUsed: prev.aiGenerationsUsed + 1 };
      saveUsage(next);
      return next;
    });
  }, []);

  /** Paid / demo subscribe */
  const activatePremium = useCallback(
    (_plan: PlanId) => {
      const next = { ...loadUsage(), isPremium: true };
      persist(next);
    },
    [persist]
  );

  const deactivatePremium = useCallback(() => {
    const cur = loadUsage();
    const next = { ...cur, isPremium: false };
    persist(next);
  }, [persist]);

  const fullAccess = hasFullAccess(usage);
  const trialActive = isTrialActive(usage);
  const trialDaysLeft = getTrialDaysLeft(usage);

  return {
    ready,
    usage,
    /** Full practice (paid or trial) */
    isPremium: fullAccess,
    isPaid: usage.isPremium,
    isTrialActive: trialActive,
    trialDaysLeft,
    trialDaysTotal: PREMIUM.trialDays,
    canRecord: canRecord(usage),
    canUseAi: canUseAi(usage),
    canUseAmbient: (type: string) => canUseAmbient(usage, type),
    recordingsLeft: recordingsLeft(usage),
    aiLeft: aiLeft(usage),
    markRecording,
    markAiGeneration,
    activatePremium,
    deactivatePremium,
  };
}
