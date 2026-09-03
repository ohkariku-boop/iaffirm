"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryPillsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryPills({ categories, selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-0.5 px-0.5 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all",
          selected === null
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-white text-muted-foreground border border-border hover:border-primary/30"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-1.5",
            selected === cat.slug
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-white text-muted-foreground border border-border hover:border-primary/30"
          )}
        >
          <span className="text-[12px]">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
