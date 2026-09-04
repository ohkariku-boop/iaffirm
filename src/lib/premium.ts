export const PREMIUM = {
  monthlyPrice: 3.99,
  yearlyPrice: 29.99,
  yearlyPerMonth: 2.5,
  currency: "USD",
  freeLimits: {
    recordings: 3,
    customAffirmations: 5,
    aiGenerations: 3,
    ambientTypes: ["pad", "off"] as const,
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
      description: "Soft pad, soft rain, quiet bowls under your voice.",
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
  isPremium: boolean;
  recordingsUsed: number;
  aiGenerationsUsed: number;
  customUsed: number;
};

const STORAGE_KEY = "iaffirm_premium_usage_v1";

const defaultUsage = (): PremiumUsage => ({
  isPremium: false,
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

export function canRecord(usage: PremiumUsage): boolean {
  if (usage.isPremium) return true;
  return usage.recordingsUsed < PREMIUM.freeLimits.recordings;
}

export function canUseAi(usage: PremiumUsage): boolean {
  if (usage.isPremium) return true;
  return usage.aiGenerationsUsed < PREMIUM.freeLimits.aiGenerations;
}

export function canUseAmbient(
  usage: PremiumUsage,
  type: string
): boolean {
  if (usage.isPremium) return true;
  return (PREMIUM.freeLimits.ambientTypes as readonly string[]).includes(type);
}

export function recordingsLeft(usage: PremiumUsage): number | "unlimited" {
  if (usage.isPremium) return "unlimited";
  return Math.max(0, PREMIUM.freeLimits.recordings - usage.recordingsUsed);
}

export function aiLeft(usage: PremiumUsage): number | "unlimited" {
  if (usage.isPremium) return "unlimited";
  return Math.max(0, PREMIUM.freeLimits.aiGenerations - usage.aiGenerationsUsed);
}
