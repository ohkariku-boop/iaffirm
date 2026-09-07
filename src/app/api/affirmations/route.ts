import { NextRequest, NextResponse } from "next/server"
import { getAffirmationsPage } from "@/lib/supabase/data"
import { ALL_AFFIRMATIONS, getAffirmationsForTier } from "@/lib/content"
import { paginate, LIBRARY_PAGE_SIZE } from "@/lib/pagination"

/**
 * GET /api/affirmations?category=calm&page=0&pageSize=5&premium=1
 *
 * Tries Supabase range query first; falls back to in-memory catalog
 * (same page contract) when DB is empty or unavailable.
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

  // 1) Supabase server-side range
  const remote = await getAffirmationsPage({
    categorySlug: category,
    pageIndex,
    pageSize,
  })

  if (remote.total > 0 && remote.items.length > 0) {
    return NextResponse.json({
      ...remote,
      source: "supabase",
    })
  }

  // 2) Local catalog fallback (bundled content)
  let list = getAffirmationsForTier(isPremium)
  if (category) {
    list = list.filter((a) => a.category?.slug === category)
  } else if (!isPremium) {
    list = list // already free-tier limited
  }

  // When premium and no category, still paginate full set
  if (isPremium && !category) {
    list = ALL_AFFIRMATIONS
  }

  const local = paginate(list, pageIndex, pageSize)

  return NextResponse.json({
    items: local.pageItems,
    total: local.totalItems,
    pageIndex: local.pageIndex,
    pageSize: local.pageSize,
    from: local.from,
    to: local.to,
    totalPages: local.totalPages,
    source: "local",
  })
}
