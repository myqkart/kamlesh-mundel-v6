"use client";

import type { ApproachPrinciple } from "@/data/engineering-approach";

type ApproachListProps = {
  principles: readonly ApproachPrinciple[];
  activeId: string;
  visualId: string;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
};

export function ApproachList({
  principles,
  activeId,
  visualId,
  onSelect,
  onHover,
}: ApproachListProps) {
  return (
    <div
      role="tablist"
      aria-label="Engineering principles"
      aria-orientation="vertical"
      className="flex flex-col gap-1"
    >
      {principles.map((principle, index) => {
        const selected = principle.id === activeId;
        const highlighted = principle.id === visualId;

        return (
          <button
            key={principle.id}
            type="button"
            role="tab"
            id={`approach-tab-${principle.id}`}
            aria-selected={selected}
            aria-controls={`approach-panel-${principle.id}`}
            tabIndex={selected ? 0 : -1}
            className={`approach-tab cred-write group text-left ${highlighted ? "is-active" : ""}`}
            style={{ animationDelay: `${420 + index * 90}ms` }}
            onClick={() => onSelect(principle.id)}
            onMouseEnter={() => onHover(principle.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onSelect(principle.id)}
            onKeyDown={(event) => {
              const current = principles.findIndex((p) => p.id === activeId);
              if (current < 0) return;

              let next = current;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                next = (current + 1) % principles.length;
              } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                next = (current - 1 + principles.length) % principles.length;
              } else if (event.key === "Home") {
                next = 0;
              } else if (event.key === "End") {
                next = principles.length - 1;
              } else {
                return;
              }

              event.preventDefault();
              onSelect(principles[next]!.id);
              document
                .getElementById(`approach-tab-${principles[next]!.id}`)
                ?.focus();
            }}
          >
            <span className="approach-tab-num font-sketch text-[1.15rem] leading-none text-teal-700">
              {principle.number}
            </span>
            <span className="approach-tab-title font-display text-[1.05rem] leading-snug tracking-[-0.02em] text-teal-900 md:text-[1.15rem]">
              {principle.title}
            </span>
            <span aria-hidden="true" className="approach-tab-mark" />
          </button>
        );
      })}
    </div>
  );
}
