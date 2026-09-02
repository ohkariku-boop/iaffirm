import { createClient } from "@/lib/supabase/client"
import type { Affirmation, Category } from "@/types"

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }
  return (data as Category[]) ?? []
}

export async function getAffirmations(categorySlug?: string | null): Promise<Affirmation[]> {
  const supabase = createClient()
  
  let query = supabase
    .from("affirmations")
    .select(`
      id,
      content,
      category_id,
      is_system,
      language,
      tags,
      category:categories (
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(50)

  if (categorySlug) {
    const { data: cats } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single()
    
    if (cats) {
      query = query.eq("category_id", cats.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching affirmations:", error)
    return []
  }

  // Supabase join can return category as object or array depending on relationship
  // Normalize to single Category | null
  const normalized: Affirmation[] = (data ?? []).map((row: any) => {
    const cat = Array.isArray(row.category) ? row.category[0] ?? null : row.category ?? null
    return {
      id: row.id,
      content: row.content,
      category_id: row.category_id,
      is_system: row.is_system,
      language: row.language,
      tags: row.tags ?? [],
      category: cat,
    }
  })

  return normalized
}
