/** Shared page math for client + server */

export function paginate<T>(
  items: T[],
  pageIndex: number,
  pageSize: number
): {
  pageItems: T[];
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  from: number;
  to: number;
} {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1);
  const safePage = Math.min(Math.max(0, pageIndex), totalPages - 1);
  const start = safePage * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return {
    pageItems,
    pageIndex: safePage,
    pageSize,
    totalItems,
    totalPages,
    hasPrev: safePage > 0,
    hasNext: safePage < totalPages - 1,
    from: totalItems === 0 ? 0 : start + 1,
    to: start + pageItems.length,
  };
}

export const LIBRARY_PAGE_SIZE = 5;

/**
 * Supabase range example (same contract as GET /api/affirmations):
 *
 * ```ts
 * const pageIndex = 0
 * const pageSize = 5
 * const from = pageIndex * pageSize        // 0
 * const to = from + pageSize - 1           // 4
 *
 * const { data, count } = await supabase
 *   .from("affirmations")
 *   .select("*, category:categories(*)", { count: "exact" })
 *   .eq("category_id", categoryId)
 *   .eq("is_active", true)
 *   .order("created_at", { ascending: true })
 *   .range(from, to)  // inclusive indices
 * ```
 *
 * Virtual scrolling (when a single long scroll is required):
 * - Window only visible rows (see VirtualAffirmationList)
 * - Or @tanstack/react-virtual for dynamic row heights
 * - Still pair with server pages or infinite query — don't load 10k rows at once
 */
