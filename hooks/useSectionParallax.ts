"use client";

import { useEffect, type RefObject } from "react";

/**
 * Shared section parallax — sets --py (-1..1) and --p (0..1) on the section element.
 * Matches the hero scroll style: rAF-throttled, no CSS transition lag.
 * Disabled on narrow viewports so mobile layouts stay stable.
 */
export function useSectionParallax(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");

    let ticking = false;
    let frame = 0;

    const clear = () => {
      node.style.removeProperty("--py");
      node.style.removeProperty("--p");
    };

    const update = () => {
      if (reduce.matches || narrow.matches) {
        clear();
        ticking = false;
        return;
      }

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Bidirectional offset from viewport center (hero-compatible feel)
      const y = (rect.top + rect.height * 0.4 - vh * 0.5) / vh;
      const py = Math.max(-1, Math.min(1, y));

      // Linear progress through the section (0 enter → 1 leave)
      const travel = vh + rect.height;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / travel));

      node.style.setProperty("--py", py.toFixed(4));
      node.style.setProperty("--p", p.toFixed(4));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    };

    const onModeChange = () => {
      if (reduce.matches || narrow.matches) {
        clear();
        return;
      }
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reduce.addEventListener("change", onModeChange);
    narrow.addEventListener("change", onModeChange);
    onModeChange();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onModeChange);
      narrow.removeEventListener("change", onModeChange);
      cancelAnimationFrame(frame);
      clear();
    };
  }, [ref, enabled]);
}
