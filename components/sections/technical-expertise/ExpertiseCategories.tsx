"use client";

import type { ExpertiseCategory, ExpertiseCategoryId } from "@/data/technical-expertise";

type ExpertiseCategoriesProps = {
  categories: readonly ExpertiseCategory[];
  active: ExpertiseCategoryId | "all";
  onChange: (id: ExpertiseCategoryId | "all") => void;
  onHover: (id: ExpertiseCategoryId | "all" | null) => void;
};

export function ExpertiseCategories({
  categories,
  active,
  onChange,
  onHover,
}: ExpertiseCategoriesProps) {
  return (
    <div
      role="tablist"
      aria-label="Technology categories"
      className="flex flex-wrap items-baseline gap-x-5 gap-y-3 md:gap-x-7"
      onMouseLeave={() => onHover(null)}
    >
      <button
        type="button"
        role="tab"
        aria-selected={active === "all"}
        className={`expertise-cat ${active === "all" ? "is-active" : ""}`}
        onClick={() => onChange("all")}
        onMouseEnter={() => onHover("all")}
        onFocus={() => onChange("all")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={active === category.id}
          className={`expertise-cat ${active === category.id ? "is-active" : ""}`}
          onClick={() => onChange(category.id)}
          onMouseEnter={() => onHover(category.id)}
          onFocus={() => onChange(category.id)}
        >
          <span className="expertise-cat-num">{category.number}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}
