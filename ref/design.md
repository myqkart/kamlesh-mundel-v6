# Portfolio Design System — Teal Palette

A cohesive five-step teal palette, ranging from a deep, ink-like teal down to an off-white base. Built for a **design-heavy portfolio** — a site where imagery, case studies, and visual work need to breathe, with color used sparingly and intentionally as an accent rather than a dominant layer.

---

## Color Palette

| Swatch | Name | Hex | RGB | Role |
|---|---|---|---|---|
| 🟩 | Deep Teal | `#0D5C63` | rgb(13, 92, 99) | Primary / Dark accent |
| 🟩 | Teal | `#247B7B` | rgb(36, 123, 123) | Secondary / Headers |
| 🟦 | Mid Teal | `#44A1A0` | rgb(68, 161, 160) | Supporting / Links |
| 🟦 | Soft Teal | `#78CDD7` | rgb(120, 205, 215) | Highlights / Backgrounds |
| ⬜ | Off White | `#FFFFFA` | rgb(255, 255, 250) | Base / Surface |

---

## Portfolio Layout Philosophy

Since project imagery is the hero, color should stay in the background, in type, and in small interactive details — never competing with case study screenshots or hero shots.

- **80/20 rule:** ~80% of the UI stays neutral (`#FFFFFA` + dark teal text); ~20% carries color, concentrated in nav, hover states, and section dividers.
- **One accent per screen:** don't mix Mid Teal and Soft Teal as competing accents on the same viewport — pick one supporting tone per section.
- **Let images set the palette on hover:** use `#0D5C63` as an overlay tint (10–20% opacity) on project thumbnails for a cohesive gallery feel.

## Usage Guidelines

### Primary — `#0D5C63` (Deep Teal)
- Logo / wordmark, nav bar text or background
- Hero headline text on light background
- Footer background
- Cursor / custom pointer accent

### Secondary — `#247B7B` (Teal)
- Section eyebrow labels ("Selected Work", "About")
- Active nav link underline
- Case study title text

### Accent — `#44A1A0` (Mid Teal)
- Hyperlinks within case study body copy
- "View project" arrow icons, hover underlines
- Tag chips for project categories (UI/UX, Branding, etc.)

### Highlight — `#78CDD7` (Soft Teal)
- Subtle background block behind a pull-quote or testimonial
- Progress bar / scroll indicator
- Hover state background on project grid cards

### Base — `#FFFFFA` (Off White)
- Primary page background (keeps imagery color-accurate)
- Card surfaces for project thumbnails
- Negative space around large hero imagery

---

## Typography Pairing (Portfolio Context)

Color alone won't carry a design-heavy portfolio — pair the palette with confident, editorial type:

| Use | Suggested style | Color |
|---|---|---|
| Hero name/title | Large serif or bold grotesk, 64–120px | `#0D5C63` |
| Nav / eyebrow labels | Small caps, letter-spaced, 12–14px | `#247B7B` |
| Case study titles | Medium-bold sans, 28–40px | `#0D5C63` |
| Body copy | Regular sans/serif, 16–18px, 1.6 line-height | `#0D5C63` @ 85% opacity |
| Captions / metadata | Small sans, 12–13px | `#44A1A0` |

Keep color out of body paragraphs — reserve it for labels, links, and headings so reading long case studies stays effortless.

## Suggested Text Contrast

| Background | Recommended Text Color | Notes |
|---|---|---|
| `#0D5C63` | `#FFFFFA` | High contrast, WCAG AA/AAA pass |
| `#247B7B` | `#FFFFFA` | High contrast, WCAG AA pass |
| `#44A1A0` | `#0D5C63` or `#FFFFFA` | Check contrast per use case |
| `#78CDD7` | `#0D5C63` | Dark text reads best |
| `#FFFFFA` | `#0D5C63` or `#247B7B` | Standard body text |

---

## Gradient

A vertical/diagonal gradient built from the palette (as seen in the reference image):

```css
background: linear-gradient(160deg, #0D5C63 0%, #247B7B 45%, #44A1A0 75%, #78CDD7 100%);
```

---

## Tailwind CSS Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#0D5C63', // Deep Teal
          700: '#247B7B', // Teal
          500: '#44A1A0', // Mid Teal
          300: '#78CDD7', // Soft Teal
          50:  '#FFFFFA', // Off White
        },
      },
    },
  },
};
```

---

## CSS Custom Properties

```css
:root {
  --color-teal-900: #0D5C63;
  --color-teal-700: #247B7B;
  --color-teal-500: #44A1A0;
  --color-teal-300: #78CDD7;
  --color-off-white: #FFFFFA;
}
```

---

## Design Notes for a Design-Heavy Portfolio

- **Mood:** Calm, professional, trustworthy — a quiet backdrop that lets project imagery, casework, and typography lead.
- **Contrast strategy:** Pair the two darkest shades with off-white text; pair the two lightest shades with deep teal text.
- **Accessibility:** Always verify contrast ratios (4.5:1 minimum for body text) when combining mid-range shades (`#44A1A0`, `#78CDD7`) with text.
- **Do:**
  - Use the full gradient only once — as a hero backdrop or intro/loader screen — then drop to flat `#FFFFFA` for the rest of the scroll.
  - Let large project images/videos sit on plain `#FFFFFA` cards with generous whitespace; add color only in captions, tags, or on hover.
  - Use `#0D5C63` as a full-bleed background for a single "About" or "Contact" section to create rhythm/contrast against the mostly-white grid.
- **Don't:**
  - Don't tint or filter project screenshots with palette colors — it distorts the real work's colors.
  - Don't place `#78CDD7` text on `#44A1A0` (or similar adjacent-shade combos) — contrast is too low.
  - Don't use more than one saturated teal block per fold; it starts competing with the portfolio pieces themselves.