"use client";

/**
 * Simple fixed-row virtual window — example technique for long lists.
 * Prefer server pagination (5–20/page) for iAffirm library.
 * Use virtualization when you must keep a long list in one scroll view
 * (e.g. search results of hundreds of lines).
 *
 * Production alternative: @tanstack/react-virtual
 *
 * @example
 * <VirtualAffirmationList
 *   items={allInCategory}
 *   rowHeight={88}
 *   height={400}
 *   renderRow={(a) => <AffirmationCard affirmation={a} />}
 * />
 */
import { useMemo, useRef, useState, useEffect, type ReactNode } from "react";

interface VirtualAffirmationListProps<T> {
  items: T[];
  rowHeight?: number;
  height?: number;
  overscan?: number;
  renderRow: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
}

export function VirtualAffirmationList<T>({
  items,
  rowHeight = 88,
  height = 400,
  overscan = 4,
  renderRow,
  getKey,
}: VirtualAffirmationListProps<T>) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.ceil(height / rowHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const windowItems = useMemo(
    () =>
      items.slice(startIndex, endIndex).map((item, i) => ({
        item,
        index: startIndex + i,
      })),
    [items, startIndex, endIndex]
  );

  return (
    <div
      ref={outerRef}
      style={{ height, overflow: "auto", position: "relative" }}
      className="rounded-2xl border border-border"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {windowItems.map(({ item, index }) => (
          <div
            key={getKey ? getKey(item, index) : index}
            style={{
              position: "absolute",
              top: index * rowHeight,
              left: 0,
              right: 0,
              height: rowHeight,
              padding: "0 0 8px",
              boxSizing: "border-box",
            }}
          >
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
