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
  type PremiumUsage,
  type PlanId,
} from "@/lib/premium";

export function usePremium() {
  const [usage, setUsage] = useState<PremiumUsage>(() => loadUsage());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsage(loadUsage());
    setReady(true);
  }, []);

  const persist = useCallback((next: PremiumUsage) => {
    setUsage(next);
    saveUsage(next);
  }, []);

  const markRecording = useCallback(() => {
    setUsage((prev) => {
      if (prev.isPremium) return prev;
      const next = { ...prev, recordingsUsed: prev.recordingsUsed + 1 };
      saveUsage(next);
      return next;
    });
  }, []);

  const markAiGeneration = useCallback(() => {
    setUsage((prev) => {
      if (prev.isPremium) return prev;
      const next = { ...prev, aiGenerationsUsed: prev.aiGenerationsUsed + 1 };
      saveUsage(next);
      return next;
    });
  }, []);

  /** Placeholder subscribe — swap for Stripe / store later */
  const activatePremium = useCallback((_plan: PlanId) => {
    const next = { ...loadUsage(), isPremium: true };
    persist(next);
  }, [persist]);

  const deactivatePremium = useCallback(() => {
    const next = { ...loadUsage(), isPremium: false };
    persist(next);
  }, [persist]);

  return {
    ready,
    usage,
    isPremium: usage.isPremium,
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
