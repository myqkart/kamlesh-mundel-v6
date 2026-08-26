import Link from "next/link";
import { projects } from "@/data/projects";
import { expertiseCategories } from "@/data/technical-expertise";

const destinations = [
  {
    href: "/",
    id: "home",
    label: "Home",
    note: "first page",
    rotate: "-rotate-2",
  },
  {
    href: "/#work",
    id: "work",
    label: "Work",
    note: "what shipped",
    rotate: "rotate-1",
  },
  {
    href: "/expertise",
    id: "expertise",
    label: "Expertise",
    note: "the stack",
    rotate: "rotate-2",
  },
  {
    href: "/#contact",
    id: "contact",
    label: "Contact",
    note: "start a build",
    rotate: "-rotate-1",
  },
] as const;

const pegTilt = [-8, 5, -3, 7, -6, 4, -2, 6] as const;

/**
 * Drawn atlas of live pages — sketches, not a table of contents.
 * Links stay crawlable; the sheet does the talking.
 */
export function NotebookAtlas() {
  return (
    <section aria-labelledby="missing-index-heading" className="missing-atlas">
      <header className="missing-atlas-head">
        <p className="missing-atlas-kicker hero-reveal font-sketch -rotate-2 text-[1.65rem] leading-none text-teal-700 md:text-[1.85rem]">
          still in the binder
        </p>
        <h2
          id="missing-index-heading"
          className="hero-reveal mt-2 max-w-[14ch] -rotate-1 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.9] text-teal-900"
        >
          Draw a way back.
        </h2>
      </header>

      <nav aria-label="Pages that exist" className="missing-atlas-board">
        {destinations.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`missing-pin missing-pin--${item.id} group`}
          >
            <span className={`missing-pin-draw ${item.rotate}`}>
              {item.id === "home" ? <HomeSketch /> : null}
              {item.id === "work" ? <WorkSketch /> : null}
              {item.id === "expertise" ? <StackSketch /> : null}
              {item.id === "contact" ? <MailSketch /> : null}
            </span>
            <span className="missing-pin-label">{item.label}</span>
            <span className="missing-pin-note">{item.note}</span>
          </Link>
        ))}
      </nav>

      <div className="missing-atlas-lower">
        <div>
          <p className="missing-atlas-caption">
            <span>work hanging on the line</span>
            <CaptionRule />
          </p>
          <ul aria-label="Selected work" className="missing-line">
            <li aria-hidden="true" className="missing-line-wire">
              <svg fill="none" preserveAspectRatio="none" viewBox="0 0 1000 24">
                <path
                  d="M4 14 C 80 4, 160 20, 250 10 C 340 1, 420 18, 510 8 C 600 0, 680 16, 770 7 C 860 0, 930 14, 996 8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
            </li>
            {projects.map((project, index) => (
              <li key={project.slug} className="missing-peg">
                <Link
                  href={`/work/${project.slug}`}
                  className="missing-ticket"
                  style={{
                    transform: `rotate(${pegTilt[index % pegTilt.length]}deg)`,
                  }}
                >
                  <span aria-hidden="true" className="missing-ticket-pin" />
                  <span className="missing-ticket-name">{project.title}</span>
                  <span className="missing-ticket-type">{project.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="missing-atlas-caption">
            <span>tools in the margin</span>
            <CaptionRule />
          </p>
          <ul aria-label="Expertise areas" className="missing-tools">
            {expertiseCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/expertise/${category.id}`}
                  className="missing-tool group"
                >
                  <span aria-hidden="true" className="missing-tool-draw">
                    <ToolSketch id={category.id} />
                  </span>
                  <span className="missing-tool-label">{category.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CaptionRule() {
  return (
    <svg
      aria-hidden="true"
      className="missing-caption-rule"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 400 12"
    >
      <path
        d="M2 7c28-3 56 3 86-1 38-5 72 4 108 0 34-4 70 3 98 1 28-2 62 2 102 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function HomeSketch() {
  return (
    <svg fill="none" viewBox="0 0 220 170">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 44 H104 V148 H28 Z" strokeWidth="1.7" />
        <path d="M104 44 H188 V148 H104 Z" strokeWidth="1.7" />
        <path d="M104 44 V148" strokeWidth="1.5" />
        <circle cx="36" cy="58" r="3.2" strokeWidth="1.1" />
        <circle cx="36" cy="78" r="3.2" strokeWidth="1.1" />
        <circle cx="36" cy="98" r="3.2" strokeWidth="1.1" />
        <circle cx="36" cy="118" r="3.2" strokeWidth="1.1" />
        <path d="M48 70 H90 M48 86 H82 M48 102 H88" strokeWidth="1.15" strokeOpacity="0.45" />
        <path d="M128 96 L146 78 L164 96 V132 H128 Z" strokeWidth="1.6" />
        <path d="M140 132 V114 H152 V132" strokeWidth="1.3" />
        <path d="M118 88 H174" strokeWidth="1.2" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}

function WorkSketch() {
  return (
    <svg fill="none" viewBox="0 0 220 170">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M36 38 H148 V118 H36 Z" strokeWidth="1.5" strokeOpacity="0.45" />
        <path d="M36 52 H148" strokeWidth="1.2" strokeOpacity="0.4" />
        <path d="M58 28 H176 V132 H58 Z" strokeWidth="1.55" strokeOpacity="0.55" />
        <path d="M58 44 H176" strokeWidth="1.2" strokeOpacity="0.45" />
        <path d="M78 48 H198 V148 H78 Z" strokeWidth="1.8" />
        <path d="M78 66 H198" strokeWidth="1.4" />
        <circle cx="90" cy="57" r="3.2" strokeWidth="1.1" />
        <circle cx="102" cy="57" r="3.2" strokeWidth="1.1" />
        <circle cx="114" cy="57" r="3.2" strokeWidth="1.1" />
        <path d="M96 88 H160 V124 H96 Z" strokeWidth="1.3" />
        <path d="M112 100 l10 10 22 -24" strokeWidth="1.9" />
      </g>
    </svg>
  );
}

function StackSketch() {
  return (
    <svg fill="none" viewBox="0 0 220 170">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 36 H172 V68 H48 Z" strokeWidth="1.7" />
        <path d="M60 48 H132" strokeWidth="1.2" strokeOpacity="0.45" />
        <path d="M108 68 V84" strokeWidth="1.4" />
        <path d="M48 84 H172 V116 H48 Z" strokeWidth="1.7" />
        <path d="M60 96 H120 M60 106 H148" strokeWidth="1.15" strokeOpacity="0.45" />
        <path d="M108 116 V128" strokeWidth="1.4" />
        <ellipse cx="108" cy="136" rx="52" ry="12" strokeWidth="1.6" />
        <path d="M56 136 V152" strokeWidth="1.5" />
        <path d="M160 136 V152" strokeWidth="1.5" />
        <ellipse cx="108" cy="152" rx="52" ry="12" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

function MailSketch() {
  return (
    <svg fill="none" viewBox="0 0 220 170">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 58 H148 V138 H32 Z" strokeWidth="1.8" />
        <path d="M32 58 L90 104 L148 58" strokeWidth="1.7" />
        <path
          className="missing-wander"
          d="M156 78 C 168 62, 184 70, 196 52"
          strokeWidth="1.4"
        />
        <path d="M168 42 L196 52 L178 66 L184 50 Z" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

function ToolSketch({ id }: { id: string }) {
  const common = {
    fill: "none" as const,
    viewBox: "0 0 72 72",
  };

  if (id === "frontend") {
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeLinecap="round">
          <path d="M10 16 H62 V56 H10 Z" strokeWidth="1.7" />
          <path d="M10 26 H62" strokeWidth="1.3" />
          <circle cx="18" cy="21" r="2.2" strokeWidth="1.1" />
          <circle cx="26" cy="21" r="2.2" strokeWidth="1.1" />
        </g>
      </svg>
    );
  }
  if (id === "backend") {
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeLinecap="round">
          <path d="M16 18 H56 V30 H16 Z" strokeWidth="1.6" />
          <path d="M16 34 H56 V46 H16 Z" strokeWidth="1.6" />
          <path d="M16 50 H56 V62 H16 Z" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }
  if (id === "data") {
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeLinecap="round">
          <ellipse cx="36" cy="22" rx="20" ry="8" strokeWidth="1.6" />
          <path d="M16 22 V50" strokeWidth="1.6" />
          <path d="M56 22 V50" strokeWidth="1.6" />
          <ellipse cx="36" cy="50" rx="20" ry="8" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }
  if (id === "apis") {
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeLinecap="round">
          <circle cx="20" cy="36" r="10" strokeWidth="1.6" />
          <circle cx="52" cy="36" r="10" strokeWidth="1.6" />
          <path d="M30 36 H42" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }
  if (id === "infrastructure") {
    return (
      <svg {...common}>
        <g stroke="currentColor" strokeLinecap="round">
          <path
            d="M22 44 C 14 44, 12 32, 24 30 C 26 20, 44 18, 48 28 C 60 28, 62 42, 52 44 Z"
            strokeWidth="1.6"
          />
        </g>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M36 12 L40 30 L58 36 L40 42 L36 60 L32 42 L14 36 L32 30 Z" strokeWidth="1.55" />
      </g>
    </svg>
  );
}
