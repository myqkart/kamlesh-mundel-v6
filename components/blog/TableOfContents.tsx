"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TocItem } from "@/lib/markdown";

interface TableOfContentsProps {
  items: TocItem[];
  variant?: "default" | "sidebar";
}

interface TocGroup {
  id: string;
  title: string;
  sectionNum: number;
  children: TocItem[];
}

const COMPACT_THRESHOLD = 6;

function buildGroups(items: TocItem[]): TocGroup[] {
  const groups: TocGroup[] = [];
  let sectionNum = 0;

  for (const item of items) {
    if (item.level === 2) {
      sectionNum += 1;
      groups.push({
        id: item.id,
        title: item.text,
        sectionNum,
        children: [],
      });
    } else if (groups.length > 0) {
      groups[groups.length - 1]!.children.push(item);
    }
  }

  return groups;
}

export function TableOfContents({ items, variant = "default" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);
  const [userExpanded, setUserExpanded] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  const groups = useMemo(() => buildGroups(items), [items]);
  const compact = items.length >= COMPACT_THRESHOLD;
  const isSidebar = variant === "sidebar";

  const activeGroup = useMemo(
    () =>
      groups.find(
        (group) =>
          group.id === activeId ||
          group.children.some((child) => child.id === activeId),
      ) ?? null,
    [activeId, groups],
  );

  const activeGroupId = activeGroup?.id ?? null;
  const expandedGroup = userExpanded ?? activeGroupId;

  useEffect(() => {
    if (items.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: reduce.matches ? "0px" : "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.45, 0.7],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const node = activeRef.current;
    const container = scrollRef.current;
    if (!node || !container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodeTop = node.offsetTop;
    const nodeBottom = nodeTop + node.offsetHeight;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    if (nodeTop < viewTop + 24 || nodeBottom > viewBottom - 24) {
      container.scrollTo({
        top: nodeTop - container.clientHeight / 2 + node.offsetHeight / 2,
        behavior: reduce.matches ? "auto" : "smooth",
      });
    }
  }, [activeId, expandedGroup, compact]);

  if (items.length === 0) return null;

  const heading = isSidebar ? "Contents" : "On this page";
  const activeSectionNum = activeGroup?.sectionNum ?? 0;

  return (
    <nav
      aria-label="Table of contents"
      className={`blog-toc ${isSidebar ? "blog-toc--sidebar" : ""}`}
    >
      <button
        type="button"
        className="blog-toc-toggle lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-sketch text-[1.2rem] text-teal-700">
          {heading}
          <span className="ml-2 text-[0.95rem] text-teal-700/55">
            ({groups.length} sections)
          </span>
        </span>
        <span className="text-teal-900/60">{open ? "−" : "+"}</span>
      </button>

      <div className={`blog-toc-panel ${open ? "is-open" : ""}`}>
        <div className="blog-toc-head">
          <div className="blog-toc-head-row">
            <p className="blog-toc-heading">{heading}</p>
            {isSidebar && activeSectionNum > 0 ? (
              <p className="blog-toc-progress" aria-live="polite">
                {String(activeSectionNum).padStart(2, "0")} /{" "}
                {String(groups.length).padStart(2, "0")}
              </p>
            ) : null}
          </div>
          {compact ? (
            <p className="blog-toc-subhead">
              {groups.length} sections{compact ? " · expand for subsections" : ""}
            </p>
          ) : null}
        </div>

        <div ref={scrollRef} className="blog-toc-scroll">
          <ol className="blog-toc-list">
            {groups.map((group) => {
              const isExpanded =
                !compact ||
                expandedGroup === group.id ||
                activeGroupId === group.id;
              const groupActive =
                group.id === activeId ||
                group.children.some((child) => child.id === activeId);

              return (
                <li key={group.id} className="blog-toc-group">
                  <div className="blog-toc-group-head">
                    <a
                      ref={
                        groupActive && !group.children.some((c) => c.id === activeId)
                          ? activeRef
                          : undefined
                      }
                      href={`#${group.id}`}
                      className={`blog-toc-link blog-toc-link--h2 ${groupActive ? "is-active" : ""}`}
                      onClick={() => {
                        setOpen(false);
                        if (compact) setUserExpanded(group.id);
                      }}
                    >
                      <span className="blog-toc-num" aria-hidden="true">
                        {String(group.sectionNum).padStart(2, "0")}
                      </span>
                      <span className="blog-toc-text">{group.title}</span>
                    </a>
                    {compact && group.children.length > 0 ? (
                      <button
                        type="button"
                        className="blog-toc-expand"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} subsections for ${group.title}`}
                        onClick={() =>
                          setUserExpanded((current) =>
                            current === group.id ? null : group.id,
                          )
                        }
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>

                  {group.children.length > 0 && isExpanded ? (
                    <ol className="blog-toc-sublist">
                      {group.children.map((child) => (
                        <li key={child.id} className="blog-toc-item--sub">
                          <a
                            ref={child.id === activeId ? activeRef : undefined}
                            href={`#${child.id}`}
                            className={`blog-toc-link ${child.id === activeId ? "is-active" : ""}`}
                            onClick={() => setOpen(false)}
                          >
                            <span className="blog-toc-text">{child.text}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
