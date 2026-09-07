# PWA installation pitfalls, mobile accessibility & iOS Safari testing

Practical guide for iAffirm (web / home-screen app). Not a substitute for WCAG audits or App Store review.

---

## 1. PWA installation pitfalls

### Cross-platform

| Pitfall | What happens | Mitigation |
|---------|----------------|------------|
| **Not HTTPS** | Install / SW blocked | Always ship on HTTPS (Vercel OK) |
| **In-app browsers** | Instagram, Facebook, Gmail open a limited WebView — no reliable “Add to Home Screen” | Prompt: “Open in Safari / Chrome” (`/install`) |
| **SVG-only icons** | Some Android/iOS versions want **PNG 192 & 512** | Add PNG icons; keep SVG as extra |
| **Wrong `start_url`** | Icon opens landing instead of app | `start_url: "/app"` (current) |
| **Stale service worker** | Users stuck on old JS/CSS | Cache version bump (`iaffirm-static-v2`); network-first HTML |
| **Caching `/api/*`** | Checkout / AI break offline or serve stale | Never cache API (current SW) |
| **Expecting one install UX** | Chrome ≠ Safari ≠ Samsung Internet | Separate copy for iPhone vs Android |
| **Storage eviction** | iOS may clear data under pressure; “Full practice” in localStorage can vanish | Set expectations; accounts later |
| **Push on iOS** | Web Push only in recent iOS, often needs installed PWA + permission | Treat reminders as best-effort on iPhone |

### iOS / Safari–specific

| Pitfall | Detail |
|---------|--------|
| **No install banner like Chrome** | User must use **Share → Add to Home Screen** |
| **Must use Safari** | Chrome on iOS still uses WebKit but Share sheet / A2HS is most reliable in **Safari** |
| **Standalone gaps** | No true ambient background audio like native; mic permissions re-prompt edge cases |
| **`apple-touch-icon`** | Prefer 180×180 PNG for home-screen icon clarity |
| **Safe areas** | Notch / home indicator — use `viewport-fit=cover` + `env(safe-area-inset-*)` if full-bleed UI |
| **Audio** | Playback often requires a **user gesture**; autoplay ambient may fail until tap |
| **MediaRecorder** | Supported on modern iOS but mime types vary (`audio/mp4` vs `webm`) |
| **Private mode** | localStorage / SW limited or ephemeral |
| **Add from tab vs Share** | Steps differ slightly by iOS version; keep instructions generic |

### Android-specific

| Pitfall | Detail |
|---------|--------|
| **Install vs “Add to Home screen”** | Chrome may show either; both OK |
| **OEM browsers** | Xiaomi/Huawei may strip install prompts |
| **Battery optimization** | Can delay notifications |

---

## 2. Mobile accessibility standards (practical subset)

Aim toward **WCAG 2.2 Level AA** patterns that matter most on phones:

| Area | Standard / practice | iAffirm checklist |
|------|---------------------|-------------------|
| **Touch targets** | ~44×44 pt (Apple HIG); WCAG 2.5.5 Target Size (enhanced) 44×44 CSS px | Record / play / nav pills ≥ 44px |
| **Contrast** | WCAG 1.4.3 AA: 4.5:1 text, 3:1 large text / UI | Dark text on cream; verify accent on soft green |
| **Name, Role, Value** | WCAG 4.1.2 | `aria-label` on icon-only buttons (close, mic, pager) |
| **Keyboard / focus** | 2.1.1, 2.4.7 | Focus ring visible; modal traps focus where possible |
| **Motion** | 2.3.3 / `prefers-reduced-motion` | Avoid essential info only in animation |
| **Labels** | 3.3.2 | Form fields and AI prompt labeled |
| **Status messages** | 4.1.3 | “Recording…”, “Practiced”, errors announced if possible |
| **Zoom** | 1.4.4 | Avoid disabling pinch-zoom long-term (`userScalable: false` helps accidental zoom during record but hurts a11y — prefer allowing zoom outside recorder) |
| **Language** | 3.1.1 | `html lang="en"` |
| **Media** | Captions N/A for user mic; don’t rely on sound alone for critical UI | Visual recording state always |

**Screen readers (VoiceOver / TalkBack):**  
Primary path should work: open app → hear today’s line → start/stop record → play → next page of lines.

---

## 3. iOS Safari testing steps (specific)

Use a **physical iPhone** when possible (simulator ≠ real mic / A2HS).

### A. Fresh install path

1. Open **Safari** (not Chrome, not Instagram in-app browser).
2. Go to the production URL (HTTPS).
3. Load **/** then **/app** — no blank screen, no infinite spinner.
4. Tap **Share** (square with arrow) → **Add to Home Screen** → **Add**.
5. Close Safari. Launch from **home-screen icon**.
6. Confirm it opens **/app** (or onboarding) in standalone (minimal browser chrome).

### B. Onboarding & Today

7. Complete onboarding (or reset site data to test first run).
8. Confirm **Today’s practice** shows a line.
9. Tap **Record this line**.

### C. Microphone & recording (critical)

10. When prompted, allow **Microphone**.
11. Record 5–10 seconds → **Stop**.
12. **Play** — voice audible; optional **Warm drone / Soft rain** under voice.
13. **Save** — appears in Library / practiced state updates.
14. Deny mic once (Settings → Safari → Microphone, or reset permission) → UI shows a clear error, no white screen.
15. Re-allow mic → record again.

### D. Audio quirks

16. Lock screen during playback — note behavior (may pause; acceptable for PWA).
17. Switch apps mid-record — confirm you can recover or re-record without crash.
18. Volume: ambient quieter than voice (intelligibility).

### E. Library & pagination

19. Full practice (or demo unlock) → pick a category.
20. Confirm **5 lines**, **Next** → lines 6–10, count e.g. 1–5 of 50.
21. Favorite / practice from a list card.

### F. Storage & “membership”

22. Settings → Safari → **Advanced** → **Website Data** → remove iAffirm (or Clear History).
23. Re-open: expect logged-out / free state — document this for users (“stays on this device”).

### G. Accessibility spot-checks (VoiceOver)

24. Settings → Accessibility → VoiceOver **On**.
25. Swipe through header, Today line, **Record**, tab bar.
26. Confirm buttons have spoken names (not just “button”).
27. VoiceOver **Off** when done.

### H. Network

28. Airplane mode after first load → shell may work; API/AI fail gracefully.
29. Back online → page works without hard refresh (SW network-first).

### I. Install page

30. Open **/install** in Safari — steps match what you just did.
31. Open the same URL inside **Instagram in-app browser** — confirm you understand the limitation; copy should push users to Safari.

---

## 4. Quick Android Chrome companion (short)

1. Chrome → site → menu **⋮** → **Install app** / **Add to Home screen**.  
2. Mic record → play → save.  
3. Pagination + Full practice.  
4. Site settings → clear data → premium reset expected.

---

## 5. Pre-public sign-off (iOS)

- [ ] A2HS from Safari works; icon opens app  
- [ ] Record + playback on device speaker  
- [ ] Permission denied path is clear  
- [ ] Today + category pager work  
- [ ] No critical actions without visible text/label  
- [ ] `/install` instructions match iOS version you tested  

---

## 6. Related product notes for iAffirm

- Recordings and Full practice demo state are **on-device** — say so in UI/legal.  
- Native app later for widgets, stronger notifications, store billing.  
- Prefer **PNG** home-screen icons before marketing “install as app” widely.
