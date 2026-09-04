export type ThemeId = "dawn" | "sage" | "ocean" | "dusk" | "sand" | "lavender";

export type Theme = {
  id: ThemeId;
  name: string;
  description: string;
  premium: boolean;
  pageBg: string;
  /** Full page background (gradient / layered) */
  pageBackground: string;
  cardBg: string;
  accent: string;
  accentSoft: string;
  text: string;
  muted: string;
  heroWash: string;
  /** Affirmation card surface */
  cardBackground: string;
  cardBorder: string;
  cardShadow: string;
  /** Typography: CSS font-family stack using next/font variables */
  fontAffirmation: string;
  fontUi: string;
  /** Letter-spacing / weight for hero line */
  affirmTracking: string;
  affirmWeight: number;
  affirmSize: string;
  ambientDefault: "pad" | "rain" | "bowls" | "off";
  /** Sample line for preview */
  previewLine: string;
};

export const THEMES: Theme[] = [
  {
    id: "sage",
    name: "Sage",
    description: "Soft green calm",
    premium: false,
    pageBg: "#f4f0ea",
    pageBackground:
      "radial-gradient(ellipse 90% 50% at 20% 0%, rgba(74,124,104,0.08), transparent 55%), radial-gradient(ellipse 70% 40% at 90% 5%, rgba(212,175,120,0.06), transparent 50%), #f4f0ea",
    cardBg: "#ffffff",
    accent: "#4a7c68",
    accentSoft: "#e8f0eb",
    text: "#2a2825",
    muted: "#6f6a63",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(74,124,104,0.1), transparent 50%)",
    cardBackground: "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(248,252,249,0.95) 100%)",
    cardBorder: "rgba(74, 124, 104, 0.14)",
    cardShadow: "0 10px 36px rgba(74, 124, 104, 0.09)",
    fontAffirmation: "var(--font-affirm-serif), Georgia, serif",
    fontUi: "var(--font-geist-sans), system-ui, sans-serif",
    affirmTracking: "-0.02em",
    affirmWeight: 500,
    affirmSize: "1.45rem",
    ambientDefault: "pad",
    previewLine: "I am enough exactly as I am right now.",
  },
  {
    id: "dawn",
    name: "Dawn",
    description: "Warm light, soft peach",
    premium: true,
    pageBg: "#faf4ef",
    pageBackground:
      "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(255,200,160,0.35), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 80%, rgba(255,180,140,0.12), transparent 50%), #faf4ef",
    cardBg: "#fffbf8",
    accent: "#c4785a",
    accentSoft: "#f8ebe4",
    text: "#2c2622",
    muted: "#7a6e66",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(196,120,90,0.14), transparent 50%)",
    cardBackground: "linear-gradient(160deg, #fffefb 0%, #fff5ee 100%)",
    cardBorder: "rgba(196, 120, 90, 0.18)",
    cardShadow: "0 12px 40px rgba(196, 120, 90, 0.12)",
    fontAffirmation: "var(--font-affirm-display), Georgia, serif",
    fontUi: "var(--font-geist-sans), system-ui, sans-serif",
    affirmTracking: "-0.01em",
    affirmWeight: 500,
    affirmSize: "1.5rem",
    ambientDefault: "pad",
    previewLine: "I meet this day with warmth and quiet courage.",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool blue stillness",
    premium: true,
    pageBg: "#e8eef4",
    pageBackground:
      "radial-gradient(ellipse 80% 50% at 10% 20%, rgba(100,160,200,0.2), transparent 50%), radial-gradient(ellipse 70% 45% at 90% 90%, rgba(70,120,160,0.12), transparent 55%), linear-gradient(180deg, #eef4f8 0%, #e4ebf2 100%)",
    cardBg: "#f5f9fc",
    accent: "#3d6f94",
    accentSoft: "#e0ecf4",
    text: "#1e2a32",
    muted: "#5a6b78",
    heroWash: "radial-gradient(ellipse 80% 55% at 85% 15%, rgba(61,111,148,0.14), transparent 50%)",
    cardBackground: "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(232,242,250,0.9) 100%)",
    cardBorder: "rgba(61, 111, 148, 0.16)",
    cardShadow: "0 12px 40px rgba(61, 111, 148, 0.1)",
    fontAffirmation: "var(--font-affirm-sans), system-ui, sans-serif",
    fontUi: "var(--font-affirm-sans), system-ui, sans-serif",
    affirmTracking: "-0.03em",
    affirmWeight: 500,
    affirmSize: "1.4rem",
    ambientDefault: "rain",
    previewLine: "I am safe in this moment. I breathe in calm.",
  },
  {
    id: "dusk",
    name: "Dusk",
    description: "Quiet evening rose",
    premium: true,
    pageBg: "#f3eef2",
    pageBackground:
      "radial-gradient(ellipse 90% 55% at 80% 0%, rgba(180,120,150,0.22), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(100,80,120,0.1), transparent 50%), #f3eef2",
    cardBg: "#faf6f9",
    accent: "#8f5a74",
    accentSoft: "#f0e4eb",
    text: "#2a2228",
    muted: "#6e6068",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(143,90,116,0.14), transparent 50%)",
    cardBackground: "linear-gradient(155deg, #fffcfe 0%, #f7eef4 100%)",
    cardBorder: "rgba(143, 90, 116, 0.16)",
    cardShadow: "0 12px 40px rgba(143, 90, 116, 0.1)",
    fontAffirmation: "var(--font-affirm-display), Georgia, serif",
    fontUi: "var(--font-geist-sans), system-ui, sans-serif",
    affirmTracking: "0.01em",
    affirmWeight: 500,
    affirmSize: "1.48rem",
    ambientDefault: "bowls",
    previewLine: "I speak to myself with the softness I deserve.",
  },
  {
    id: "sand",
    name: "Sand",
    description: "Neutral earth, soft gold",
    premium: true,
    pageBg: "#f5f0e6",
    pageBackground:
      "radial-gradient(ellipse 70% 45% at 30% 10%, rgba(210,180,120,0.2), transparent 50%), linear-gradient(180deg, #f8f4ec 0%, #f0e9dc 100%)",
    cardBg: "#fffcf7",
    accent: "#9a7b4a",
    accentSoft: "#f0e8d8",
    text: "#2a2620",
    muted: "#6e6658",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(154,123,74,0.12), transparent 50%)",
    cardBackground: "linear-gradient(160deg, #ffefd 0%, #faf3e6 100%)".replace("#ffefd", "#fffef8"),
    cardBorder: "rgba(154, 123, 74, 0.18)",
    cardShadow: "0 12px 36px rgba(154, 123, 74, 0.1)",
    fontAffirmation: "var(--font-affirm-serif), Georgia, serif",
    fontUi: "var(--font-geist-sans), system-ui, sans-serif",
    affirmTracking: "0.02em",
    affirmWeight: 400,
    affirmSize: "1.42rem",
    ambientDefault: "pad",
    previewLine: "I grow at my own pace, rooted and patient.",
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Soft violet ease",
    premium: true,
    pageBg: "#f0ecf5",
    pageBackground:
      "radial-gradient(ellipse 85% 50% at 50% 0%, rgba(160,140,200,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(120,100,180,0.1), transparent 50%), #f0ecf5",
    cardBg: "#f9f7fc",
    accent: "#6f5a9a",
    accentSoft: "#e8e2f2",
    text: "#26222e",
    muted: "#655f70",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(111,90,154,0.14), transparent 50%)",
    cardBackground: "linear-gradient(155deg, #ffcfe 0%, #f3eef9 100%)".replace("#ffcfe", "#fefcff"),
    cardBorder: "rgba(111, 90, 154, 0.16)",
    cardShadow: "0 12px 40px rgba(111, 90, 154, 0.1)",
    fontAffirmation: "var(--font-affirm-sans), system-ui, sans-serif",
    fontUi: "var(--font-affirm-sans), system-ui, sans-serif",
    affirmTracking: "-0.02em",
    affirmWeight: 500,
    affirmSize: "1.38rem",
    ambientDefault: "bowls",
    previewLine: "Peace begins with me, right here, right now.",
  },
];

export function getTheme(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

const THEME_KEY = "iaffirm_theme_v1";

export function loadThemeId(): ThemeId {
  if (typeof window === "undefined") return "sage";
  try {
    const v = localStorage.getItem(THEME_KEY) as ThemeId | null;
    if (v && THEMES.some((t) => t.id === v)) return v;
  } catch { /* */ }
  return "sage";
}

export function saveThemeId(id: ThemeId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, id);
}
