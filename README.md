# iAffirm

Daily affirmations that actually stick — in your own voice.

The effortless delivery of the best widget apps + the proven power of own-voice recording + AI personalization.

## Live Structure

| Path | Purpose |
|------|---------|
| `/` | Promotional landing page |
| `/app` | The iAffirm application |

## Why iAffirm

We studied the top affirmation apps (I Am, ThinkUp, Innertune, Selfpause, Gratitude, Mantra, Say After Me, and others) and combined their strongest ideas:

- **From I Am** → Frictionless daily presence and beautiful presentation
- **From ThinkUp / Selfpause** → Own-voice recording (research-backed as more effective)
- **From Innertune** → High-quality, categorized library
- **From newer AI apps** → Personalized affirmations generated for your goals
- **Plus** → Clean modern design, cross-platform, respectful product

## Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Hosting**: Vercel

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

### Now (MVP)
- [x] Beautiful affirmation cards + category filters
- [x] Own-voice recording (MediaRecorder)
- [x] Curated library (10 categories, 50+ affirmations)
- [x] Favorites-ready data model
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
- [ ] “Say after me” active practice mode
- [ ] Light journaling / reflection prompts
- [ ] Structured rituals (e.g. morning / evening)
- [ ] Native mobile apps (iOS + Android)
- [ ] Home screen widgets (native)
- [ ] Apple Watch / companion support
- [ ] Advanced progress insights

## Project Structure

```
src/
  app/
    page.tsx          # Landing page
    app/page.tsx      # Main application
  components/         # UI components
  lib/supabase/       # Supabase clients + data helpers
  types/
supabase/
  migrations/         # Schema + RLS
  seed.sql            # Categories + sample affirmations
```

## License

Private
