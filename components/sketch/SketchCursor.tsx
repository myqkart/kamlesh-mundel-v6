"use client";

import { useEffect } from "react";
import {
  INK_CHANGE_EVENT,
  markerSvg,
  pencilSvg,
  penSvg,
  readStoredInk,
  svgToCursor,
  type InkChoice,
} from "@/lib/sketch-kit";

const EDITABLE =
  "textarea, select, [contenteditable]:not([contenteditable='false']), input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='file'])";

const INTERACTIVE =
  "a, button, [href], [role='button'], summary, label, input[type='button'], input[type='submit'], input[type='checkbox'], input[type='radio']";

function cursorSheet(pencil: string, pen: string, marker: string) {
  return `@media (pointer: fine) and (hover: hover) {
  html.sketch-cursors,
  html.sketch-cursors * {
    cursor: ${pencil} !important;
  }
  html.sketch-cursors :is(a, button, [href], [role="button"], summary, label, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], .ink-tab, .ink-swatch, .ink-mix) {
    cursor: ${pen} !important;
  }
  html.sketch-cursors.is-marking,
  html.sketch-cursors.is-marking * {
    cursor: ${marker} !important;
  }
  html.sketch-cursors :is(${EDITABLE}) {
    cursor: text !important;
  }
}`;
}

export function SketchCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!fine.matches) return;

    const html = document.documentElement;
    const sheet = document.createElement("style");
    sheet.setAttribute("data-sketch-cursors", "");
    document.head.appendChild(sheet);

    let pencil = "auto";
    let pen = "pointer";
    let marker = "text";
    let alive = true;

    const paintSheet = () => {
      sheet.textContent = cursorSheet(pencil, pen, marker);
    };

    const boot = async () => {
      const [nextPencil, nextPen, nextMarker] = await Promise.all([
        svgToCursor(pencilSvg()),
        svgToCursor(penSvg()),
        svgToCursor(markerSvg(readStoredInk().hex)),
      ]);
      if (!alive) return;
      pencil = nextPencil;
      pen = nextPen;
      marker = nextMarker;
      paintSheet();
      html.classList.add("sketch-cursors");
    };

    const onInk = (event: Event) => {
      const hex =
        event instanceof CustomEvent
          ? (event as CustomEvent<InkChoice>).detail?.hex
          : readStoredInk().hex;
      void svgToCursor(markerSvg(hex ?? readStoredInk().hex)).then((next) => {
        if (!alive) return;
        marker = next;
        paintSheet();
      });
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }
      if (event.button !== 0) return;
      const target = event.target;
      if (
        target instanceof Element &&
        !target.closest(EDITABLE) &&
        !target.closest(INTERACTIVE) &&
        !target.closest(".ink-drawer, .ink-tab")
      ) {
        html.classList.add("is-marking");
      }
    };

    const onUp = () => {
      html.classList.remove("is-marking");
    };

    void boot();
    window.addEventListener(INK_CHANGE_EVENT, onInk);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      alive = false;
      html.classList.remove("sketch-cursors", "is-marking");
      sheet.remove();
      window.removeEventListener(INK_CHANGE_EVENT, onInk);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return null;
}
