"use client";

import { useEffect, useState } from "react";
import { INK_CHANGE_EVENT, readStoredInk, type InkChoice } from "@/lib/sketch-kit";

/** Felt-tip overlay that replaces the native selection on the sketch sheet. */

type Stroke = {
  top: number;
  left: number;
  width: number;
  height: number;
  tilt: number;
  seed: number;
};

const MARKS = [
  "M6 10 L18 4.2 C54 7.5 102 2.8 152 5.6 C194 7.8 220 4.4 234 6.8 L238 12.2 L232 23.4 C188 20.2 136 25.6 88 21.8 C46 18.4 22 24.2 12 21.6 L4 16.4 Z",
  "M5 12.4 L14 5.1 C48 3.6 96 7.8 146 4.4 C192 1.6 222 6.2 236 8 L239 13.6 L231 22.8 C186 25.4 128 19.6 82 23.2 C42 26.2 20 20.8 10 19.4 L3 15.2 Z",
  "M4 8.8 L17 5.6 C62 8.4 108 3.2 158 6.2 C198 8.6 224 5.2 235 7.4 L238 13 L230 24 C176 21.4 122 26.8 74 22.4 C38 19.2 18 23.6 11 22 L3 17.2 Z",
  "M7 11.2 L19 3.8 C58 6.6 110 8.2 160 4.8 C204 2.2 226 7 237 9.2 L236 15.4 L228 24.6 C180 22 130 18.8 84 22.6 C44 25.8 18 21 11 20.2 L5 15.6 Z",
] as const;

function unit(n: number) {
  const t = Math.sin(n * 12.9898) * 43758.5453;
  return t - Math.floor(t);
}

function isEditable(node: Node | null) {
  const el = node instanceof Element ? node : node?.parentElement;
  return Boolean(
    el?.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"),
  );
}

function mergeLineRects(rects: DOMRect[]) {
  const sorted = [...rects].sort((a, b) => a.top - b.top || a.left - b.left);
  const lines: DOMRect[] = [];

  for (const rect of sorted) {
    if (rect.width < 2 || rect.height < 2) continue;

    const prev = lines[lines.length - 1];
    const sameLine =
      prev && Math.abs(rect.top - prev.top) < Math.min(rect.height, prev.height) * 0.55;

    if (prev && sameLine) {
      const left = Math.min(prev.left, rect.left);
      const top = Math.min(prev.top, rect.top);
      const right = Math.max(prev.right, rect.right);
      const bottom = Math.max(prev.bottom, rect.bottom);
      lines[lines.length - 1] = new DOMRect(left, top, right - left, bottom - top);
    } else {
      lines.push(rect);
    }
  }

  return lines;
}

function collectStrokes(): Stroke[] {
  const selection = document.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return [];

  const raw: DOMRect[] = [];

  for (let i = 0; i < selection.rangeCount; i += 1) {
    const range = selection.getRangeAt(i);
    if (!range.toString().replace(/\s+/g, "")) continue;
    if (isEditable(range.commonAncestorContainer)) return [];
    raw.push(...range.getClientRects());
  }

  return mergeLineRects(raw).map((rect) => {
    const inset = rect.height * 0.22;
    const n = rect.left * 0.37 + rect.top * 1.13;
    return {
      left: rect.left - 3,
      top: rect.top + inset * 0.72,
      width: rect.width + 6,
      height: Math.max(9, rect.height - inset * 0.82),
      tilt: (unit(n) - 0.5) * 2.2,
      seed: Math.floor(unit(n * 1.7) * MARKS.length),
    };
  });
}

export function SketchHighlighter() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [ink, setInk] = useState("#FFD93B");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("sketch-hl-on");
    setInk(readStoredInk().hex);

    let frame = 0;
    const paint = () => {
      frame = 0;
      setStrokes(collectStrokes());
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    const onInk = (event: Event) => {
      if (event instanceof CustomEvent) {
        const next = (event as CustomEvent<InkChoice>).detail?.hex;
        if (next) setInk(next);
      }
      schedule();
    };

    let dragging = false;
    const onSelectStart = () => {
      dragging = true;
    };
    const onDrag = () => {
      if (dragging) schedule();
    };
    const onDragEnd = () => {
      dragging = false;
      schedule();
    };

    document.addEventListener("selectionchange", schedule);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag, { passive: true });
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchend", onDragEnd);
    window.addEventListener(INK_CHANGE_EVENT, onInk);
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    window.visualViewport?.addEventListener("resize", schedule);

    return () => {
      html.classList.remove("sketch-hl-on");
      window.cancelAnimationFrame(frame);
      document.removeEventListener("selectionchange", schedule);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchend", onDragEnd);
      window.removeEventListener(INK_CHANGE_EVENT, onInk);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, []);

  if (strokes.length === 0) return null;

  return (
    <div aria-hidden="true" className="sketch-hl" key={ink}>
      <svg className="sketch-hl-canvas">
        <defs>
          <linearGradient id="sketch-hl-ink" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.42" />
            <stop offset="38%" stopColor="currentColor" stopOpacity="0.92" />
            <stop offset="72%" stopColor="currentColor" stopOpacity="0.78" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.38" />
          </linearGradient>
          <filter
            colorInterpolationFilters="sRGB"
            id="sketch-hl-grain"
            x="-8%"
            y="-45%"
            width="116%"
            height="190%"
          >
            <feTurbulence
              baseFrequency="0.035 0.28"
              numOctaves="3"
              result="noise"
              seed="2"
              type="fractalNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {strokes.map((stroke, index) => (
          <svg
            key={`${Math.round(stroke.top)}-${Math.round(stroke.left)}-${index}`}
            overflow="visible"
            preserveAspectRatio="none"
            viewBox="0 0 240 28"
            width={stroke.width}
            height={stroke.height}
            x={stroke.left}
            y={stroke.top}
          >
            <g transform={`rotate(${stroke.tilt} 120 14)`}>
              <path
                d={MARKS[stroke.seed] ?? MARKS[0]}
                fill="url(#sketch-hl-ink)"
                filter="url(#sketch-hl-grain)"
              />
            </g>
          </svg>
        ))}
      </svg>
    </div>
  );
}
