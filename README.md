# iAffirm — Daily Affirmations That Stick

A modern, cross-platform affirmations app inspired by "I Am - Daily Affirmations", but better.

## Key Differentiators
- **Own-voice recording** — Hear affirmations in your own voice (research-backed)
- Beautiful dark UI with glanceable cards
- AI-powered personal affirmation generation (coming)
- PWA-first (installable) → later Capacitor for native stores
- Supabase backend (auth, data, storage for audio)

## Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- **Backend**: Supabase (Auth, Postgres, Storage, Edge Functions)
- **Hosting**: Vercel (frontend) + Supabase
- **State**: Zustand + TanStack Query (planned)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment
Copy `.env.local` (already created with your Supabase project).

### 3. Database setup
1. Go to your Supabase dashboard → SQL Editor
2. Run the contents of `supabase/migrations/001_initial_schema.sql`
3. Then run `supabase/seed.sql` to populate categories + sample affirmations

### 4. Run locally
```bash
npm run dev
```

Open http://localhost:3000

## Project Structure
```
src/
  app/              # Next.js App Router pages
  components/       # UI components (AffirmationCard, VoiceRecorder, etc.)
  lib/
    supabase/       # Supabase client helpers
    utils.ts
  types/            # Shared TypeScript types
supabase/
  migrations/       # SQL schema
  seed.sql          # Sample data
public/
  manifest.json     # PWA manifest
```

## Current Status (MVP foundation)
- [x] Project scaffold + dark theme
- [x] Affirmation cards + category filters
- [x] Own-voice recorder (MediaRecorder API)
- [x] Full Supabase schema + RLS + seed data
- [x] PWA manifest
- [ ] Wire real Supabase data (replace mocks)
- [ ] Auth (email / Apple / Google)
- [ ] Upload recordings to Supabase Storage
- [ ] Custom affirmations CRUD
- [ ] AI generation endpoint
- [ ] Web Push notifications
- [ ] Streaks & mood tracking UI

## Next Steps
1. Apply the SQL migration + seed in Supabase dashboard
2. Replace mock data with real Supabase queries
3. Add auth UI
4. Implement audio upload to Storage bucket `recordings`
5. Add AI generation via Edge Function or Vercel AI SDK

## License
Private
