"use client";

import type { FilterCategory } from "@/data/projects";

type AllWorkFiltersProps = {
  categories: FilterCategory[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
};

/** Folder-tab filters — like labeled tabs on a sketch binder. */
export function AllWorkFilters({
  categories,
  active,
  onChange,
  counts,
}: AllWorkFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="archive-tabs flex flex-wrap items-end gap-2 md:gap-3"
    >
      {categories.map((category, index) => {
        const pressed = active === category;
        const tilt = index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "-rotate-2";

        return (
          <button
            key={category}
            type="button"
            className={`archive-tab ${tilt} ${pressed ? "is-active" : ""}`}
            aria-pressed={pressed}
            onClick={() => onChange(category)}
          >
            <span className="archive-tab-label">{category}</span>
            <span className="archive-tab-count">{counts[category] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
