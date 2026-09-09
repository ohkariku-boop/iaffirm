export const PREMIUM = {
  monthlyPrice: 3.99,
  yearlyPrice: 29.99,
  yearlyPerMonth: 2.5,
  currency: "USD",
  /** Full practice free trial length (on-device) */
  trialDays: 10,
  freeLimits: {
    recordings: 3,
    customAffirmations: 5,
    aiGenerations: 3,
    ambientTypes: ["drone", "off"] as const,
  },
  features: [
    {
      id: "full-library",
      title: "Full affirmation library",
      description: "15 categories and 750+ lines — including career, parenthood, and creativity.",
    },
    {
      id: "unlimited-recordings",
      title: "Unlimited voice recordings",
      description: "Record and save as many practices as you like in your own voice.",
    },
    {
      id: "themes",
      title: "Atmospheres & themes",
      description: "Dawn, ocean, dusk, sand, lavender — colors that match your mood.",
    },
    {
      id: "all-ambient",
      title: "All background sounds",
      description: "Warm drone, soft rain, quiet bowls, and ethereal tones under your voice.",
    },
    {
      id: "ai-personal",
      title: "Personal lines",
      description: "Lines written for your situation, ready to record.",
    },
    {
      id: "custom-library",
      title: "Your library",
      description: "Favorites, personal lines, and saved practices in one place.",
    },
  ],
} as const;

export type PlanId = "monthly" | "yearly";

export type PremiumUsage = {
  /** Paid / demo subscription unlock (not trial) */
  isPremium: boolean;
  /** ISO timestamp when trial started; null if never started */
  trialStartedAt: string | null;
  recordingsUsed: number;
  aiGenerationsUsed: number;
  customUsed: number;
};

const STORAGE_KEY = "iaffirm_premium_usage_v1";

const defaultUsage = (): PremiumUsage => ({
  isPremium: false,
  trialStartedAt: null,
  recordingsUsed: 0,
  aiGenerationsUsed: 0,
  customUsed: 0,
});

export function loadUsage(): PremiumUsage {
  if (typeof window === "undefined") return defaultUsage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultUsage();
    return { ...defaultUsage(), ...JSON.parse(raw) };
  } catch {
    return defaultUsage();
  }
}

export function saveUsage(usage: PremiumUsage) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

/** Whole days remaining in trial (0 if none / expired). */
export function getTrialDaysLeft(usage: PremiumUsage, now = Date.now()): number {
  if (usage.isPremium || !usage.trialStartedAt) return 0;
  const start = Date.parse(usage.trialStartedAt);
  if (Number.isNaN(start)) return 0;
  const elapsed = now - start;
  const msPerDay = 24 * 60 * 60 * 1000;
  const left = PREMIUM.trialDays - elapsed / msPerDay;
  return Math.max(0, Math.ceil(left));
}

export function isTrialActive(usage: PremiumUsage, now = Date.now()): boolean {
  if (usage.isPremium) return false;
  if (!usage.trialStartedAt) return false;
  return getTrialDaysLeft(usage, now) > 0;
}

/** Full practice access: paid or active trial */
export function hasFullAccess(usage: PremiumUsage, now = Date.now()): boolean {
  return usage.isPremium || isTrialActive(usage, now);
}

export function startTrial(usage: PremiumUsage, now = Date.now()): PremiumUsage {
  if (usage.isPremium) return usage;
  if (usage.trialStartedAt) return usage; // already started (active or expired)
  return {
    ...usage,
    trialStartedAt: new Date(now).toISOString(),
  };
}

/** Ensure trial has started once — call on first app ready */
export function ensureTrialStarted(usage: PremiumUsage, now = Date.now()): PremiumUsage {
  if (usage.isPremium || usage.trialStartedAt) return usage;
  return startTrial(usage, now);
}

export function canRecord(usage: PremiumUsage): boolean {
  if (hasFullAccess(usage)) return true;
  return usage.recordingsUsed < PREMIUM.freeLimits.recordings;
}

export function canUseAi(usage: PremiumUsage): boolean {
  if (hasFullAccess(usage)) return true;
  return usage.aiGenerationsUsed < PREMIUM.freeLimits.aiGenerations;
}

export function canUseAmbient(usage: PremiumUsage, type: string): boolean {
  if (hasFullAccess(usage)) return true;
  return (PREMIUM.freeLimits.ambientTypes as readonly string[]).includes(type);
}

export function recordingsLeft(usage: PremiumUsage): number | "unlimited" {
  if (hasFullAccess(usage)) return "unlimited";
  return Math.max(0, PREMIUM.freeLimits.recordings - usage.recordingsUsed);
}

export function aiLeft(usage: PremiumUsage): number | "unlimited" {
  if (hasFullAccess(usage)) return "unlimited";
  return Math.max(0, PREMIUM.freeLimits.aiGenerations - usage.aiGenerationsUsed);
}
