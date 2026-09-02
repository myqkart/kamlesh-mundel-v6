import Link from "next/link";

interface BlogFilterItem {
  name: string;
  slug: string;
  count: number;
}

interface BlogFiltersProps {
  categories: BlogFilterItem[];
  tags: BlogFilterItem[];
  activeCategory?: string;
  activeTag?: string;
}

export function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
}: BlogFiltersProps) {
  return (
    <div className="blog-filters space-y-6">
      <div>
        <p className="font-sketch text-[1.2rem] text-teal-700">filter by category</p>
        <div
          role="group"
          aria-label="Filter by category"
          className="archive-tabs mt-3 flex flex-wrap items-end gap-2 md:gap-3"
        >
          <Link
            href="/blog"
            className={`archive-tab ${!activeCategory && !activeTag ? "is-active" : ""}`}
            aria-current={!activeCategory && !activeTag ? "page" : undefined}
          >
            <span className="archive-tab-label">All</span>
          </Link>
          {categories.map((category) => {
            const pressed = activeCategory === category.slug;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`archive-tab ${pressed ? "is-active" : ""}`}
                aria-current={pressed ? "page" : undefined}
              >
                <span className="archive-tab-label">{category.name}</span>
                <span className="archive-tab-count">{category.count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="font-sketch text-[1.2rem] text-teal-700">filter by tag</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {tags.map((tag) => {
            const pressed = activeTag === tag.slug;
            return (
              <li key={tag.slug}>
                <Link
                  href={`/tag/${tag.slug}`}
                  className={`blog-tag-link font-sketch text-[1.15rem] ${pressed ? "is-active" : ""}`}
                  aria-current={pressed ? "page" : undefined}
                >
                  [{tag.name}]
                  <span className="ml-1 text-teal-700/50">{tag.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
