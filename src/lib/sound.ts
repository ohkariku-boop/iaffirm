export type AmbienceId = "pad" | "rain" | "bowls" | "off";

export type SoundOption = {
  id: AmbienceId;
  name: string;
  description: string;
  premium: boolean;
};

export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: "pad",
    name: "Soft pad",
    description: "Warm, low drone under your voice",
    premium: false,
  },
  {
    id: "rain",
    name: "Soft rain",
    description: "Gentle filtered rain texture",
    premium: true,
  },
  {
    id: "bowls",
    name: "Quiet bowls",
    description: "Soft resonant tones with slow beats",
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

export function loadPreferredAmbience(): AmbienceId {
  if (typeof window === "undefined") return "pad";
  try {
    const v = localStorage.getItem(KEY) as AmbienceId | null;
    if (v && SOUND_OPTIONS.some((s) => s.id === v)) return v;
  } catch { /* */ }
  return "pad";
}

export function savePreferredAmbience(id: AmbienceId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, id);
}
