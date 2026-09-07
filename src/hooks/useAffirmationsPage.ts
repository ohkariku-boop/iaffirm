"use client";

import { useCallback, useEffect, useState } from "react";
import type { Affirmation } from "@/types";
import { LIBRARY_PAGE_SIZE } from "@/lib/pagination";

export type AffirmationsPageState = {
  items: Affirmation[];
  total: number;
  pageIndex: number;
  pageSize: number;
  from: number;
  to: number;
  totalPages: number;
  source: "supabase" | "local" | "loading" | "error";
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  next: () => void;
  prev: () => void;
  refresh: () => void;
};

/**
 * Fetches one page of affirmations from /api/affirmations
 * (Supabase range when available, local fallback otherwise).
 */
export function useAffirmationsPage(options: {
  categorySlug: string | null;
  isPremium: boolean;
  pageSize?: number;
  enabled?: boolean;
}): AffirmationsPageState {
  const pageSize = options.pageSize ?? LIBRARY_PAGE_SIZE;
  const enabled = options.enabled ?? true;
  const [pageIndex, setPageIndex] = useState(0);
  const [items, setItems] = useState<Affirmation[]>([]);
  const [total, setTotal] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [source, setSource] = useState<"supabase" | "local" | "loading" | "error">("loading");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to first page when filters change
  useEffect(() => {
    setPageIndex(0);
  }, [options.categorySlug, options.isPremium]);

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(pageIndex),
        pageSize: String(pageSize),
        premium: options.isPremium ? "1" : "0",
      });
      if (options.categorySlug) params.set("category", options.categorySlug);

      const res = await fetch(`/api/affirmations?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load affirmations");
      const data = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setFrom(data.from ?? 0);
      setTo(data.to ?? 0);
      setTotalPages(data.totalPages ?? 1);
      setSource(data.source === "supabase" ? "supabase" : "local");
      // Clamp page if server corrected it
      if (typeof data.pageIndex === "number" && data.pageIndex !== pageIndex) {
        setPageIndex(data.pageIndex);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setSource("error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, pageIndex, pageSize, options.categorySlug, options.isPremium]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    items,
    total,
    pageIndex,
    pageSize,
    from,
    to,
    totalPages,
    source,
    loading,
    error,
    setPage: setPageIndex,
    next: () => setPageIndex((p) => p + 1),
    prev: () => setPageIndex((p) => Math.max(0, p - 1)),
    refresh: load,
  };
}
