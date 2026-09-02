"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSectionParallax } from "@/hooks/useSectionParallax";

export function BlogIndexShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useSectionParallax(ref);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`blog-index-shell relative ${ready ? "blog-ready" : ""} ${visible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
