# iAffirm

A calm place to practice positive self-talk — with affirmations in your own voice.

**Web app available now · Native iOS & Android coming soon.**

## Live Structure

| Path | Purpose |
|------|---------|
| `/` | Landing page |
| `/app` | The iAffirm web application |

## About

iAffirm helps you build a simple, personal affirmation practice. Record affirmations in your own voice, explore thoughtful categories, save what resonates, and return to them whenever you need.

The web version is available now so people can start using it and share feedback. Native mobile apps are planned next.

## Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Hosting**: Vercel (web)
- **Future**: Native iOS & Android, same Supabase backend

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
- [x] Affirmation cards + category filters
- [x] Own-voice recording
- [x] Curated library (categories + sample affirmations)
- [x] Calm, focused UI
- [x] Landing page
- [ ] Wire real Supabase data (replace mocks)
- [ ] Auth (email + social)
- [ ] Save recordings to Storage
- [ ] Create & edit custom affirmations

### Next
- [ ] More personalization options
- [ ] Background audio for playback
- [ ] Optional reminders
- [ ] Streaks & simple check-ins
- [ ] Personal library (favorites + customs + recordings)

### Later
- [ ] Native iOS app
- [ ] Native Android app
- [ ] Home screen widgets
- [ ] Additional practice modes
- [ ] Light journaling / reflection

## Project Structure

```
src/
  app/
    page.tsx          # Landing page
    app/page.tsx      # Main web application
  components/
  lib/supabase/
  types/
supabase/
  migrations/
  seed.sql
```

## License

Private
