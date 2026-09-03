export const PREMIUM = {
  monthlyPrice: 3.99,
  yearlyPrice: 29.99,
  yearlyPerMonth: 2.5,
  currency: "USD",
  freeLimits: {
    recordings: 3,
    customAffirmations: 5,
    ambientTypes: ["pad"] as const,
  },
  features: [
    {
      id: "unlimited-recordings",
      title: "Unlimited voice recordings",
      description: "Record and save as many affirmations as you like in your own voice.",
      free: false,
    },
    {
      id: "all-ambient",
      title: "All ambient sounds",
      description: "Soft pad, soft rain, quiet bowls — and more as we add them.",
      free: false,
    },
    {
      id: "ai-personal",
      title: "AI personal affirmations",
      description: "Affirmations written for your goals and how you’re feeling.",
      free: false,
    },
    {
      id: "custom-library",
      title: "Personal library",
      description: "Favorites, customs, and recordings in one calm place.",
      free: false,
    },
    {
      id: "reminders",
      title: "Gentle reminders",
      description: "Optional prompts that support your practice without pressure.",
      free: false,
    },
    {
      id: "all-categories",
      title: "Full category library",
      description: "Everything unlocked — confidence, calm, self-love, and more.",
      free: true, // core free for goodwill; premium still listed as full access
    },
  ],
} as const;

export type PlanId = "monthly" | "yearly";
