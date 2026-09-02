export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  sort_order: number
}

export type Affirmation = {
  id: string
  content: string
  category_id: string | null
  is_system: boolean
  language: string
  tags: string[]
  category?: Category | null
}

export type UserAffirmation = {
  id: string
  user_id: string
  content: string
  category_id: string | null
  is_favorite: boolean
  audio_url: string | null
  times_practiced: number
  last_practiced_at: string | null
  created_at: string
  category?: Category | null
}

export type Profile = {
  id: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  preferred_themes: string[]
  notification_settings: {
    enabled: boolean
    times: string[]
    frequency: 'low' | 'medium' | 'high'
  }
  streak_count: number
  last_checkin: string | null
}

export type MoodEntry = {
  id: string
  mood: number
  note: string | null
  created_at: string
}
