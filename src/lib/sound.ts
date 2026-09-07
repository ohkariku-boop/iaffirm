export type AmbienceId = "drone" | "rain" | "bowls" | "ethereal" | "off";

export type SoundOption = {
  id: AmbienceId;
  name: string;
  description: string;
  premium: boolean;
};

/** Focused set: one steady bed, one water, two tonal, voice only */
export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: "drone",
    name: "Warm drone",
    description: "Low, steady bed under your voice",
    premium: false,
  },
  {
    id: "rain",
    name: "Soft rain",
    description: "Light, bright water texture",
    premium: true,
  },
  {
    id: "bowls",
    name: "Quiet bowls",
    description: "Soft resonant tones",
    premium: true,
  },
  {
    id: "ethereal",
    name: "Ethereal",
    description: "Airy floating tones",
    premium: true,
  },
  {
    id: "off",
    name: "Voice only",
    description: "No background sound",
    premium: false,
  },
];

const KEY = "iaffirm_ambient_v1";

/** Map legacy ids from older builds */
function migrateId(v: string | null): AmbienceId {
  if (!v) return "drone";
  if (v === "pad" || v === "river") return v === "river" ? "rain" : "drone";
  if (SOUND_OPTIONS.some((s) => s.id === v)) return v as AmbienceId;
  return "drone";
}

export function loadPreferredAmbience(): AmbienceId {
  if (typeof window === "undefined") return "drone";
  try {
    return migrateId(localStorage.getItem(KEY));
  } catch {
    return "drone";
  }
}

export function savePreferredAmbience(id: AmbienceId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, id);
}
