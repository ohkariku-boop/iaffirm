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
  return data ?? []
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
    // Filter via the joined category
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
  return (data as Affirmation[]) ?? []
}
