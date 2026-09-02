"use client";

import { useEffect } from "react";

/** Progressive enhancement: copy buttons on fenced code blocks. */
export function CodeBlockEnhancer() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(
      ".blog-prose figure[data-rehype-pretty-code-figure]",
    );

    blocks.forEach((figure) => {
      if (figure.querySelector(".blog-code-copy")) return;

      const code = figure.querySelector("code");
      const text = code?.textContent?.trim();
      if (!text) return;

      const lang = code?.getAttribute("data-language") ?? "code";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "blog-code-copy";
      button.setAttribute("aria-label", `Copy ${lang} code`);
      button.textContent = "copy";

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "copied";
          window.setTimeout(() => {
            button.textContent = "copy";
          }, 1600);
        } catch {
          button.textContent = "failed";
        }
      });

      const label = document.createElement("span");
      label.className = "blog-code-lang";
      label.textContent = lang;
      label.setAttribute("aria-hidden", "true");

      const toolbar = document.createElement("div");
      toolbar.className = "blog-code-toolbar";
      toolbar.append(label, button);
      figure.prepend(toolbar);
    });
  }, []);

  return null;
}
