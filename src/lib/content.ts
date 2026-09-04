import type { Affirmation, Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Confidence", slug: "confidence", description: "Steady self-belief", icon: "🌿", color: "#4a7c68", sort_order: 1 },
  { id: "2", name: "Self-Love", slug: "self-love", description: "Kindness toward yourself", icon: "💗", color: "#c45c7a", sort_order: 2 },
  { id: "3", name: "Calm", slug: "anxiety", description: "Ease and safety", icon: "🌊", color: "#5a8a9e", sort_order: 3 },
  { id: "4", name: "Motivation", slug: "motivation", description: "Gentle drive", icon: "☀️", color: "#c49a5c", sort_order: 4 },
  { id: "5", name: "Gratitude", slug: "gratitude", description: "Noticing the good", icon: "🙏", color: "#7a9e5a", sort_order: 5 },
  { id: "6", name: "Success", slug: "success", description: "Progress and purpose", icon: "✨", color: "#8a7ac4", sort_order: 6 },
  { id: "7", name: "Relationships", slug: "relationships", description: "Connection and care", icon: "🤝", color: "#c47a9a", sort_order: 7 },
  { id: "8", name: "Health", slug: "health", description: "Body and energy", icon: "🌱", color: "#5a9e7a", sort_order: 8 },
  { id: "9", name: "Resilience", slug: "resilience", description: "Bounce back", icon: "🛡️", color: "#6a7ab4", sort_order: 9 },
  { id: "10", name: "Mindfulness", slug: "mindfulness", description: "Present moment", icon: "🧘", color: "#5a9aaa", sort_order: 10 },
];

const cat = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;

/** Rich system library — free sees a subset; full practice unlocks all */
export const ALL_AFFIRMATIONS: Affirmation[] = [
  // Confidence
  { id: "c1", content: "I am confident in my abilities and trust myself completely.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c2", content: "I speak with clarity and my voice matters.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c3", content: "I trust my intuition and make decisions with ease.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c4", content: "I am becoming more confident every single day.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c5", content: "I walk into rooms knowing I belong here.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c6", content: "My presence is enough. I do not need to prove myself.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c7", content: "I handle challenges with a steady mind and an open heart.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },
  { id: "c8", content: "I am proud of how far I have already come.", category_id: "1", is_system: true, language: "en", tags: ["confidence"], category: cat("confidence") },

  // Self-Love
  { id: "s1", content: "I am enough exactly as I am right now.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s2", content: "I treat myself with the same kindness I give others.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s3", content: "I am worthy of love, respect, and happiness.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s4", content: "I forgive myself and release what no longer serves me.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s5", content: "My body is my home and I care for it with love.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s6", content: "I speak to myself the way I would speak to someone I love.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s7", content: "I allow myself to rest without guilt.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },
  { id: "s8", content: "I am allowed to take up space and have needs.", category_id: "2", is_system: true, language: "en", tags: ["self-love"], category: cat("self-love") },

  // Calm
  { id: "a1", content: "I am safe in this moment. I breathe in calm and exhale tension.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a2", content: "I release worry and choose peace instead.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a3", content: "My thoughts do not control me. I can return to the present.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a4", content: "This feeling will pass. I am steady through it.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a5", content: "I soften my shoulders and unclench my jaw. I am here.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a6", content: "I meet uncertainty with curiosity, not fear.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a7", content: "One breath at a time is enough.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },
  { id: "a8", content: "I am grounded. My feet are on the floor. I am okay.", category_id: "3", is_system: true, language: "en", tags: ["calm"], category: cat("anxiety") },

  // Motivation
  { id: "m1", content: "I take consistent action toward my goals every day.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m2", content: "I begin where I am, with what I have.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m3", content: "Progress, not perfection, moves me forward.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m4", content: "I show up for myself even when motivation is quiet.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m5", content: "Small steps still count. I take the next one.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m6", content: "I am capable of hard things, one focused moment at a time.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m7", content: "Discipline is a form of self-respect. I honor my commitments.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },
  { id: "m8", content: "I finish what I start, or I adjust with honesty.", category_id: "4", is_system: true, language: "en", tags: ["motivation"], category: cat("motivation") },

  // Gratitude
  { id: "g1", content: "I am grateful for all the abundance already in my life.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },
  { id: "g2", content: "I notice small good things and let them land.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },
  { id: "g3", content: "Thank you for this breath, this day, this chance to begin again.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },
  { id: "g4", content: "I appreciate the people who make my life warmer.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },
  { id: "g5", content: "There is enough goodness here for me to notice today.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },
  { id: "g6", content: "I receive simple joys without needing to earn them.", category_id: "5", is_system: true, language: "en", tags: ["gratitude"], category: cat("gratitude") },

  // Success
  { id: "u1", content: "I am creating the life I desire with every choice I make.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },
  { id: "u2", content: "I define success on my own terms.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },
  { id: "u3", content: "I am open to opportunities that align with my values.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },
  { id: "u4", content: "My effort compounds. I trust the process.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },
  { id: "u5", content: "I celebrate wins without diminishing them.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },
  { id: "u6", content: "I learn from setbacks and keep moving with dignity.", category_id: "6", is_system: true, language: "en", tags: ["success"], category: cat("success") },

  // Relationships
  { id: "r1", content: "I offer and receive kindness with an open heart.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },
  { id: "r2", content: "I communicate with honesty and care.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },
  { id: "r3", content: "I attract relationships built on mutual respect.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },
  { id: "r4", content: "I set boundaries that protect my peace and honor others.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },
  { id: "r5", content: "I am worthy of connection that feels safe.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },
  { id: "r6", content: "I listen fully and speak when it is true for me.", category_id: "7", is_system: true, language: "en", tags: ["relationships"], category: cat("relationships") },

  // Health
  { id: "h1", content: "I honor my body by listening to what it needs.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },
  { id: "h2", content: "Rest is productive. I allow myself to recover.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },
  { id: "h3", content: "I move in ways that feel good and sustainable.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },
  { id: "h4", content: "I nourish myself with patience, not punishment.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },
  { id: "h5", content: "I have energy for what matters when I care for the basics.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },
  { id: "h6", content: "I am strong, resilient, and kind to my body.", category_id: "8", is_system: true, language: "en", tags: ["health"], category: cat("health") },

  // Resilience
  { id: "e1", content: "I have survived hard days before. I can meet this one too.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },
  { id: "e2", content: "Setbacks are part of the path. I am still on it.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },
  { id: "e3", content: "I bend without breaking. I adapt with courage.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },
  { id: "e4", content: "I give myself permission to feel, then to continue.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },
  { id: "e5", content: "My past does not write my future. I do.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },
  { id: "e6", content: "I rise again, even if slowly.", category_id: "9", is_system: true, language: "en", tags: ["resilience"], category: cat("resilience") },

  // Mindfulness
  { id: "n1", content: "I am fully present in this moment.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
  { id: "n2", content: "I observe my thoughts without judgment.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
  { id: "n3", content: "Peace begins with me, right here, right now.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
  { id: "n4", content: "I breathe deeply and return to the present.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
  { id: "n5", content: "This moment is enough. I am enough.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
  { id: "n6", content: "I notice beauty in ordinary things.", category_id: "10", is_system: true, language: "en", tags: ["mindfulness"], category: cat("mindfulness") },
];

/** Free tier: first 3 per primary categories only */
export const FREE_CATEGORY_SLUGS = ["confidence", "self-love", "anxiety", "motivation", "gratitude", "success"];

export function getAffirmationsForTier(isPremium: boolean): Affirmation[] {
  if (isPremium) return ALL_AFFIRMATIONS;
  return ALL_AFFIRMATIONS.filter((a) => {
    const slug = a.category?.slug;
    if (!slug || !FREE_CATEGORY_SLUGS.includes(slug)) return false;
    // limit free to 3 per category
    const same = ALL_AFFIRMATIONS.filter((x) => x.category?.slug === slug);
    const idx = same.findIndex((x) => x.id === a.id);
    return idx >= 0 && idx < 3;
  });
}

export function getCategoriesForTier(isPremium: boolean): Category[] {
  if (isPremium) return CATEGORIES;
  return CATEGORIES.filter((c) => FREE_CATEGORY_SLUGS.includes(c.slug));
}
