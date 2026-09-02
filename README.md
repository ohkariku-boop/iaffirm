# iAffirm

Daily affirmations that actually stick — in your own voice.

The effortless delivery of the best widget apps + the proven power of own-voice recording + AI personalization.

**Web app available now · Native iOS & Android planned next.**

## Live Structure

| Path | Purpose |
|------|---------|
| `/` | Promotional landing page |
| `/app` | The iAffirm web application |

## Strategy

We ship the web version first so people can use it, give feedback, and validate the core experience.  
Native mobile apps (iOS + Android) come next — same backend, refined mobile experience.

The web app also serves as the marketing site and early-access product.

## Why iAffirm

We studied the top affirmation apps (I Am, ThinkUp, Innertune, Selfpause, Gratitude, Mantra, Say After Me, and others) and combined their strongest ideas:

- **From I Am** → Frictionless daily presence and beautiful presentation
- **From ThinkUp / Selfpause** → Own-voice recording (research-backed as more effective)
- **From Innertune** → High-quality, categorized library
- **From newer AI apps** → Personalized affirmations generated for your goals
- **Plus** → Clean modern design, respectful product, path to native apps

## Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Hosting**: Vercel (web)
- **Future**: Native iOS & Android (React Native / Expo or similar), same Supabase backend

## Getting Started

### 1. Database setup (required)

In your Supabase SQL Editor, run:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/seed.sql`

### 2. Environment

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run

```bash
npm install
npm run dev
```

- Landing page → http://localhost:3000
- App → http://localhost:3000/app

## Feature Roadmap

### Now (Web MVP)
- [x] Beautiful affirmation cards + category filters
- [x] Own-voice recording
- [x] Curated library (10 categories, 50+ affirmations)
- [x] Dark, calm UI
- [x] Promotional landing page
- [ ] Wire real Supabase data (replace mocks)
- [ ] Auth (email + social)
- [ ] Save recordings to Supabase Storage
- [ ] Create & edit custom affirmations

### Next
- [ ] AI-generated personalized affirmations
- [ ] Background music / ambient layer for playback
- [ ] Smart, controllable reminders
- [ ] Streaks & simple mood check-in
- [ ] Personal library (favorites + customs + recordings)

### Later
- [ ] Native iOS app
- [ ] Native Android app
- [ ] Home screen widgets (native)
- [ ] “Say after me” active practice mode
- [ ] Light journaling / reflection prompts
- [ ] Structured rituals (morning / evening)
- [ ] Apple Watch / companion support

## Project Structure

```
src/
  app/
    page.tsx          # Landing page
    app/page.tsx      # Main web application
  components/         # UI components
  lib/supabase/       # Supabase clients + data helpers
  types/
supabase/
  migrations/         # Schema + RLS
  seed.sql            # Categories + sample affirmations
```

## License

Private
