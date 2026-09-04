export type ThemeId = "dawn" | "sage" | "ocean" | "dusk" | "sand" | "lavender";

export type Theme = {
  id: ThemeId;
  name: string;
  description: string;
  premium: boolean;
  /** CSS variables / class accents */
  pageBg: string;
  cardBg: string;
  accent: string;
  accentSoft: string;
  text: string;
  muted: string;
  heroWash: string;
  ambientDefault: "pad" | "rain" | "bowls" | "off";
};

export const THEMES: Theme[] = [
  {
    id: "sage",
    name: "Sage",
    description: "Soft green calm — default",
    premium: false,
    pageBg: "#f4f0ea",
    cardBg: "#ffffff",
    accent: "#4a7c68",
    accentSoft: "#e8f0eb",
    text: "#2a2825",
    muted: "#6f6a63",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(74,124,104,0.1), transparent 50%)",
    ambientDefault: "pad",
  },
  {
    id: "dawn",
    name: "Dawn",
    description: "Warm light, soft peach",
    premium: true,
    pageBg: "#faf4ef",
    cardBg: "#fffbf8",
    accent: "#c4785a",
    accentSoft: "#f8ebe4",
    text: "#2c2622",
    muted: "#7a6e66",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(196,120,90,0.12), transparent 50%)",
    ambientDefault: "pad",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool blue stillness",
    premium: true,
    pageBg: "#eef3f6",
    cardBg: "#f7fafb",
    accent: "#4a7a9e",
    accentSoft: "#e4eef5",
    text: "#243038",
    muted: "#5f6f7a",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(74,122,158,0.12), transparent 50%)",
    ambientDefault: "rain",
  },
  {
    id: "dusk",
    name: "Dusk",
    description: "Quiet evening rose",
    premium: true,
    pageBg: "#f5f0f3",
    cardBg: "#fcf8fa",
    accent: "#9a6a82",
    accentSoft: "#f3e8ee",
    text: "#2a2428",
    muted: "#6f646a",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(154,106,130,0.12), transparent 50%)",
    ambientDefault: "bowls",
  },
  {
    id: "sand",
    name: "Sand",
    description: "Neutral earth, soft gold",
    premium: true,
    pageBg: "#f6f2ea",
    cardBg: "#fffcf7",
    accent: "#a68b5b",
    accentSoft: "#f3ecdf",
    text: "#2a2824",
    muted: "#6f6a60",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(166,139,91,0.12), transparent 50%)",
    ambientDefault: "pad",
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Soft violet ease",
    premium: true,
    pageBg: "#f3f0f7",
    cardBg: "#faf8fc",
    accent: "#7a6a9e",
    accentSoft: "#ece8f4",
    text: "#28242e",
    muted: "#6a6570",
    heroWash: "radial-gradient(ellipse 80% 55% at 90% 10%, rgba(122,106,158,0.12), transparent 50%)",
    ambientDefault: "bowls",
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
