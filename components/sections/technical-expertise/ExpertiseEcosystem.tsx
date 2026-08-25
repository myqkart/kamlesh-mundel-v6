"use client";

import type {
  ExpertiseCategory,
  ExpertiseCategoryId,
  ExpertiseTech,
} from "@/data/technical-expertise";

type ExpertiseEcosystemProps = {
  technologies: readonly ExpertiseTech[];
  categories: readonly ExpertiseCategory[];
  activeCategory: ExpertiseCategoryId | "all";
  activeTech: string | null;
  onHoverTech: (id: string | null) => void;
  onSelectTech: (id: string) => void;
};

export function ExpertiseEcosystem({
  technologies,
  categories,
  activeCategory,
  activeTech,
  onHoverTech,
  onSelectTech,
}: ExpertiseEcosystemProps) {
  const primary = technologies.filter((t) => t.level === "primary");
  const secondary = technologies.filter((t) => t.level === "secondary");
  const supporting = technologies.filter((t) => t.level === "supporting");

  const isDimmed = (tech: ExpertiseTech) =>
    activeCategory !== "all" && tech.category !== activeCategory;

  const isHot = (tech: ExpertiseTech) =>
    activeTech === tech.id ||
    (activeCategory !== "all" && tech.category === activeCategory && !activeTech);

  const categoryLabel = (id: ExpertiseCategoryId) =>
    categories.find((c) => c.id === id)?.label ?? id;

  const activeDescriptor =
    technologies.find((t) => t.id === activeTech)?.descriptor ??
    categories.find((c) => c.id === activeCategory)?.context ??
    null;

  return (
    <div className="expertise-ecosystem">
      <div className="cred-write" style={{ animationDelay: "420ms" }}>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          Core stack
        </p>
        <ul className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-4 md:gap-x-7">
          {primary.map((tech, index) => (
            <li key={tech.id}>
              <button
                type="button"
                className={`expertise-tech is-primary ${isDimmed(tech) ? "is-dim" : ""} ${isHot(tech) ? "is-hot" : ""}`}
                style={{ animationDelay: `${480 + index * 70}ms` }}
                onMouseEnter={() => onHoverTech(tech.id)}
                onMouseLeave={() => onHoverTech(null)}
                onFocus={() => onSelectTech(tech.id)}
                onClick={() => onSelectTech(tech.id)}
              >
                <span className="expertise-tech-name font-display wonk tracking-[-0.03em] text-teal-900">
                  {tech.name}
                </span>
                <span className="expertise-tech-meta">
                  {categoryLabel(tech.category)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="cred-write mt-12 md:mt-14"
        style={{ animationDelay: "620ms" }}
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          Working stack
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-3 md:gap-x-5">
          {secondary.map((tech, index) => (
            <li key={tech.id}>
              <button
                type="button"
                className={`expertise-tech is-secondary ${isDimmed(tech) ? "is-dim" : ""} ${isHot(tech) ? "is-hot" : ""}`}
                style={{ animationDelay: `${680 + index * 50}ms` }}
                onMouseEnter={() => onHoverTech(tech.id)}
                onMouseLeave={() => onHoverTech(null)}
                onFocus={() => onSelectTech(tech.id)}
                onClick={() => onSelectTech(tech.id)}
              >
                <span className="expertise-tech-name font-display tracking-[-0.02em] text-teal-900">
                  {tech.name}
                </span>
                <span className="expertise-tech-meta">
                  {categoryLabel(tech.category)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="cred-write mt-10 md:mt-12"
        style={{ animationDelay: "780ms" }}
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-teal-500">
          Supporting tools
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-3.5 gap-y-2.5">
          {supporting.map((tech, index) => (
            <li key={tech.id}>
              <button
                type="button"
                className={`expertise-tech is-supporting ${isDimmed(tech) ? "is-dim" : ""} ${isHot(tech) ? "is-hot" : ""}`}
                style={{ animationDelay: `${820 + index * 40}ms` }}
                onMouseEnter={() => onHoverTech(tech.id)}
                onMouseLeave={() => onHoverTech(null)}
                onFocus={() => onSelectTech(tech.id)}
                onClick={() => onSelectTech(tech.id)}
              >
                <span className="expertise-tech-name text-teal-900">
                  {tech.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="expertise-detail cred-write mt-10 min-h-[4.5rem] md:mt-12"
        style={{ animationDelay: "920ms" }}
        aria-live="polite"
      >
        {activeDescriptor ? (
          <p className="max-w-[34rem] font-sketch text-[1.3rem] leading-snug text-teal-700 md:text-[1.45rem]">
            {activeDescriptor}
          </p>
        ) : (
          <p className="max-w-[34rem] font-sketch text-[1.25rem] leading-snug text-teal-700/70 md:text-[1.35rem]">
            Technology is a means, not the product.
          </p>
        )}
      </div>
    </div>
  );
}
