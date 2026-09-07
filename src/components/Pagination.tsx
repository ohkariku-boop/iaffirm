"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageIndex: number;
  totalPages: number;
  from: number;
  to: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  accent?: string;
  muted?: string;
}

export function Pagination({
  pageIndex,
  totalPages,
  from,
  to,
  totalItems,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  accent = "#4a7c68",
  muted = "#6f6a63",
}: PaginationProps) {
  if (totalItems <= 0 || totalPages <= 1) return null;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border px-4 py-3"
      style={{ borderColor: `${accent}25`, background: `${accent}08` }}
    >
      <p className="text-xs" style={{ color: muted }}>
        Showing <span className="font-medium" style={{ color: accent }}>{from}–{to}</span>
        {" "}of {totalItems} · Page {pageIndex + 1} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-medium disabled:opacity-35 transition-opacity"
          style={{ borderColor: `${accent}35`, color: accent }}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium text-white disabled:opacity-35 transition-opacity"
          style={{ background: accent }}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
