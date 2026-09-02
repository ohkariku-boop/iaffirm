-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  preferred_themes text[] default '{}',
  notification_settings jsonb default '{"enabled": true, "times": ["08:00", "12:00", "18:00"], "frequency": "medium"}'::jsonb,
  streak_count integer default 0,
  last_checkin date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories for affirmations
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  color text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Core affirmations library (system + community later)
create table public.affirmations (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  category_id uuid references public.categories(id) on delete set null,
  is_system boolean default true,
  created_by uuid references public.profiles(id) on delete set null,
  language text default 'en',
  tags text[] default '{}',
  usage_count integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User's personal / custom affirmations
create table public.user_affirmations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  category_id uuid references public.categories(id) on delete set null,
  is_favorite boolean default false,
  audio_url text, -- path in storage for own-voice recording
  source_affirmation_id uuid references public.affirmations(id) on delete set null,
  times_practiced integer default 0,
  last_practiced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Favorites (quick link to system affirmations)
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  affirmation_id uuid references public.affirmations(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, affirmation_id)
);

-- Daily mood / check-ins
create table public.mood_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mood integer check (mood >= 1 and mood <= 5), -- 1=very low, 5=great
  note text,
  affirmation_id uuid references public.affirmations(id) on delete set null,
  created_at timestamptz default now()
);

-- Practice sessions (for streaks & analytics)
create table public.practice_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  affirmation_id uuid, -- can be system or user
  is_custom boolean default false,
  duration_seconds integer,
  practice_type text check (practice_type in ('read', 'speak', 'listen', 'write')),
  created_at timestamptz default now()
);

-- Indexes
create index idx_affirmations_category on public.affirmations(category_id);
create index idx_affirmations_active on public.affirmations(is_active) where is_active = true;
create index idx_user_affirmations_user on public.user_affirmations(user_id);
create index idx_favorites_user on public.favorites(user_id);
create index idx_mood_entries_user_date on public.mood_entries(user_id, created_at);
create index idx_practice_sessions_user on public.practice_sessions(user_id);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.affirmations enable row level security;
alter table public.user_affirmations enable row level security;
alter table public.favorites enable row level security;
alter table public.mood_entries enable row level security;
alter table public.practice_sessions enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Categories: public read
create policy "Anyone can read categories"
  on public.categories for select
  using (is_active = true);

-- Affirmations: public read for system ones
create policy "Anyone can read active system affirmations"
  on public.affirmations for select
  using (is_active = true);

-- User affirmations: owner only
create policy "Users can CRUD own affirmations"
  on public.user_affirmations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Favorites: owner only
create policy "Users can manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Mood entries: owner only
create policy "Users can manage own mood entries"
  on public.mood_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Practice sessions: owner only
create policy "Users can manage own practice sessions"
  on public.practice_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger affirmations_updated_at
  before update on public.affirmations
  for each row execute procedure public.set_updated_at();

create trigger user_affirmations_updated_at
  before update on public.user_affirmations
  for each row execute procedure public.set_updated_at();
