import { NextRequest, NextResponse } from "next/server"
import { getAffirmationsPage } from "@/lib/supabase/data"
import { ALL_AFFIRMATIONS, getAffirmationsForTier } from "@/lib/content"
import { paginate, LIBRARY_PAGE_SIZE } from "@/lib/pagination"

/**
 * GET /api/affirmations?category=calm&page=0&pageSize=5&premium=1
 *
 * System catalog is served from the bundled library (750 lines) with
 * server-side page math. Supabase is used when it has a full/equal set
 * for that filter (e.g. after a complete seed).
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const category = sp.get("category")
  const pageIndex = Math.max(0, parseInt(sp.get("page") || "0", 10) || 0)
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(sp.get("pageSize") || String(LIBRARY_PAGE_SIZE), 10) || LIBRARY_PAGE_SIZE)
  )
  const isPremium = sp.get("premium") === "1" || sp.get("premium") === "true"

  // Local system catalog (source of truth for the 15×50 library)
  let list = isPremium ? ALL_AFFIRMATIONS : getAffirmationsForTier(false)
  if (category) {
    list = list.filter((a) => a.category?.slug === category)
  }
  const local = paginate(list, pageIndex, pageSize)
  const localPayload = {
    items: local.pageItems,
    total: local.totalItems,
    pageIndex: local.pageIndex,
    pageSize: local.pageSize,
    from: local.from,
    to: local.to,
    totalPages: local.totalPages,
    source: "local" as const,
  }

  // Optional: prefer Supabase when it has at least as many rows as local
  try {
    const remote = await getAffirmationsPage({
      categorySlug: category,
      pageIndex,
      pageSize,
    })
    if (remote.total > 0 && remote.total >= local.totalItems) {
      return NextResponse.json({
        ...remote,
        source: "supabase",
      })
    }
  } catch {
    /* fall through to local */
  }

  return NextResponse.json(localPayload)
}
