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
  if (totalItems <= 0) return null;

  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      <p className="text-[11px]" style={{ color: muted }}>
        {from}–{to} of {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="p-2 rounded-full border disabled:opacity-30 transition-opacity"
          style={{ borderColor: `${accent}30`, color: accent }}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[11px] tabular-nums min-w-[3.5rem] text-center" style={{ color: muted }}>
          {pageIndex + 1} / {totalPages}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="p-2 rounded-full border disabled:opacity-30 transition-opacity"
          style={{ borderColor: `${accent}30`, color: accent }}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
