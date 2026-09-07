/** Client-side page slice — only render current page (scales in the UI).
 * For 1000+/category later: swap `source` for a server/Supabase range query
 * using the same pageIndex + pageSize (offset = pageIndex * pageSize).
 */
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
