import type { Affirmation } from "@/types";

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function pickDailyAffirmation(
  list: Affirmation[],
  day = todayKey()
): Affirmation | null {
  if (!list.length) return null;
  let hash = 0;
  for (let i = 0; i < day.length; i++) {
    hash = (hash * 31 + day.charCodeAt(i)) >>> 0;
  }
  return list[hash % list.length];
}

const ONBOARD_KEY = "iaffirm_onboarded_v1";
const FOCUS_KEY = "iaffirm_focus_v1";
const DAILY_DONE_KEY = "iaffirm_daily_done_v1";

export function hasOnboarded(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(ONBOARD_KEY) === "1";
}

export function setOnboarded() {
  localStorage.setItem(ONBOARD_KEY, "1");
}

export function getFocusSlug(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FOCUS_KEY);
}

export function setFocusSlug(slug: string) {
  localStorage.setItem(FOCUS_KEY, slug);
}

export function isDailyPracticed(day = todayKey()): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(DAILY_DONE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    return Boolean(map[day]);
  } catch {
    return false;
  }
}

export function markDailyPracticed(day = todayKey()) {
  try {
    const raw = localStorage.getItem(DAILY_DONE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[day] = true;
    const keys = Object.keys(map).sort();
    while (keys.length > 60) {
      delete map[keys.shift()!];
    }
    localStorage.setItem(DAILY_DONE_KEY, JSON.stringify(map));
  } catch {
    /* */
  }
}
