import { createClient as createSupabaseJs } from "@supabase/supabase-js"
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

export type AffirmationsPageResult = {
  items: Affirmation[]
  total: number
  pageIndex: number
  pageSize: number
  from: number
  to: number
  totalPages: number
  source: "supabase" | "empty"
}

/**
 * Server-side / remote pagination via Supabase `.range()`.
 * Prefer this over loading an entire category when catalogs grow (e.g. 1000/line).
 *
 * @example
 * const page = await getAffirmationsPage({ categorySlug: "calm", pageIndex: 0, pageSize: 5 })
 */
export async function getAffirmationsPage(options: {
  categorySlug?: string | null
  pageIndex?: number
  pageSize?: number
  language?: string
}): Promise<AffirmationsPageResult> {
  const pageIndex = Math.max(0, options.pageIndex ?? 0)
  const pageSize = Math.min(50, Math.max(1, options.pageSize ?? 5))
  const from = pageIndex * pageSize
  const to = from + pageSize - 1

  const empty = (): AffirmationsPageResult => ({
    items: [],
    total: 0,
    pageIndex,
    pageSize,
    from: 0,
    to: 0,
    totalPages: 1,
    source: "empty",
  })

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return empty()

    // Anon JS client works in Route Handlers (no browser cookies required)
    const supabase = createSupabaseJs(url, key)
    let categoryId: string | null = null

    if (options.categorySlug) {
      const { data: cat, error: catErr } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", options.categorySlug)
        .maybeSingle()

      if (catErr) {
        console.error("category lookup", catErr)
        return empty()
      }
      if (!cat) return empty()
      categoryId = cat.id
    }

    let query = supabase
      .from("affirmations")
      .select(
        `
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
      `,
        { count: "exact" }
      )
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .range(from, to)

    if (categoryId) query = query.eq("category_id", categoryId)
    if (options.language) query = query.eq("language", options.language)

    const { data, error, count } = await query

    if (error) {
      console.error("getAffirmationsPage", error)
      return empty()
    }

    const total = count ?? 0
    const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
    const items: Affirmation[] = (data ?? []).map((row: any) => {
      const cat = Array.isArray(row.category)
        ? row.category[0] ?? null
        : row.category ?? null
      return {
        id: String(row.id),
        content: row.content,
        category_id: row.category_id,
        is_system: row.is_system,
        language: row.language,
        tags: row.tags ?? [],
        category: cat,
      }
    })

    return {
      items,
      total,
      pageIndex,
      pageSize,
      from: total === 0 ? 0 : from + 1,
      to: from + items.length,
      totalPages,
      source: "supabase",
    }
  } catch (e) {
    console.error("getAffirmationsPage", e)
    return empty()
  }
}
