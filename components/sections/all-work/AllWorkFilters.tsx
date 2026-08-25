import type { FilterCategory } from "@/data/projects";

type AllWorkFiltersProps = {
  categories: FilterCategory[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
};

export function AllWorkFilters({
  categories,
  active,
  onChange,
}: AllWorkFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-x-6 gap-y-3"
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="archive-filter"
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
