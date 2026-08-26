"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  INK_CHANGE_EVENT,
  INK_PRESETS,
  applyInk,
  readStoredInk,
  type InkChoice,
} from "@/lib/sketch-kit";

export function HighlighterDrawer() {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ink, setInk] = useState<InkChoice>(() => ({
    id: "sun",
    hex: "#FFD93B",
  }));

  useEffect(() => {
    const stored = readStoredInk();
    setInk(applyInk(stored));

    const onInk = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const next = event.detail as InkChoice | undefined;
      if (next?.hex) setInk(next);
    };

    window.addEventListener(INK_CHANGE_EVENT, onInk);
    return () => window.removeEventListener(INK_CHANGE_EVENT, onInk);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const root = rootRef.current;
      if (root && event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const choose = (hex: string, id?: string) => {
    setInk(applyInk({ id: id ?? "custom", hex }));
  };

  return (
    <div
      ref={rootRef}
      className={`ink-drawer ${open ? "is-open" : ""}`}
      style={{ ["--ink-now" as string]: ink.hex }}
    >
      <div className="ink-case">
        <div
          id={panelId}
          className="ink-panel"
          role="dialog"
          aria-label="Choose highlighter color"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="ink-panel-body">
            <p className="ink-tray-title">Pick a highlighter</p>
            <p className="ink-tray-note">Ink for the page stain</p>

            <div className="ink-grid">
              {INK_PRESETS.map((preset) => {
                const selected = ink.hex === preset.hex;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`ink-swatch ${selected ? "is-selected" : ""}`}
                    style={{ ["--swatch" as string]: preset.hex }}
                    aria-label={`${preset.name} highlighter`}
                    aria-pressed={selected}
                    onClick={() => choose(preset.hex, preset.id)}
                  >
                    <span className="ink-swatch-body">
                      <span className="ink-swatch-chisel" />
                    </span>
                    <span className="ink-swatch-name">{preset.name}</span>
                  </button>
                );
              })}

              <label className={`ink-swatch ink-mix ${ink.id === "custom" ? "is-selected" : ""}`}>
                <span className="ink-swatch-body ink-mix-body">
                  <input
                    type="color"
                    className="ink-mix-input"
                    value={ink.id === "custom" ? ink.hex : "#E8A0BF"}
                    aria-label="Mix your own highlighter"
                    onChange={(event) => choose(event.target.value, "custom")}
                  />
                </span>
                <span className="ink-swatch-name">Mix</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="ink-tab"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={(event) => {
            setOpen((value) => !value);
            if (event.detail > 0) event.currentTarget.blur();
          }}
        >
          <span className="ink-tab-cap" />
          <span className="ink-tab-label">inks</span>
        </button>
      </div>
    </div>
  );
}
