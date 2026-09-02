# iAffirm

Daily affirmations that stick — with your own voice.

## Structure

- `/` — Promotional / informational landing page
- `/app` — The actual PWA affirmations app

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind
- Supabase (Auth, Database, Storage)
- PWA-ready

## Deploy

1. Import this repo on [Vercel](https://vercel.com)
2. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

## Database setup

Run these in Supabase SQL Editor:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/seed.sql`

## Local development

```bash
npm install
npm run dev
```

- Landing: http://localhost:3000
- App: http://localhost:3000/app
