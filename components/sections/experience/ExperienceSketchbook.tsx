"use client";

type ExperienceSketchbookProps = {
  activeId: string;
};

export function ExperienceSketchbook({ activeId }: ExperienceSketchbookProps) {
  return (
    <div aria-hidden="true" className="experience-sketchbook">
      {/* Always-on page marks — notebook margins & corners */}
      <svg
        className="experience-sketchbook-page absolute inset-0 h-full w-full text-teal-900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 900"
      >
        <g stroke="currentColor" strokeLinecap="round" className="text-teal-900/20">
          <path d="M48 40 H120 M48 40 V112" strokeWidth="1.2" />
          <path d="M1152 40 H1080 M1152 40 V112" strokeWidth="1.2" />
          <path d="M48 860 H120 M48 860 V788" strokeWidth="1.2" />
          <path d="M1152 860 H1080 M1152 860 V788" strokeWidth="1.2" />
          <path d="M70 0 V900" strokeWidth="0.7" strokeDasharray="2 10" />
          <path d="M92 0 V900" strokeWidth="0.55" strokeOpacity="0.5" />
          <circle cx="980" cy="160" r="120" strokeDasharray="5 9" strokeWidth="0.7" />
          <path
            d="M820 720c60-18 110 12 160 4 42-6 78-28 120-18"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
        </g>
      </svg>

      {/* Role drawings — free across the right field */}
      <div
        className={`experience-sketchbook-layer ${activeId === "momentum91" ? "is-active" : ""}`}
      >
        <SketchEnterpriseField />
      </div>
      <div
        className={`experience-sketchbook-layer ${activeId === "techuz-fullstack" ? "is-active" : ""}`}
      >
        <SketchProductField />
      </div>
      <div
        className={`experience-sketchbook-layer ${activeId === "techuz-trainee" ? "is-active" : ""}`}
      >
        <SketchFoundationField />
      </div>
    </div>
  );
}

function SketchEnterpriseField() {
  return (
    <svg
      className="absolute top-[8%] right-[-4%] h-[88%] w-[70%] max-w-none text-teal-900 md:right-0 md:w-[58%]"
      fill="none"
      viewBox="0 0 640 720"
    >
      <defs>
        <filter id="exp-book-wobble" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter="url(#exp-book-wobble)" stroke="currentColor" strokeLinecap="round">
        <g className="text-teal-900/22">
          <circle cx="340" cy="320" r="210" strokeWidth="1" />
          <circle cx="340" cy="320" r="210" strokeDasharray="6 10" strokeWidth="0.6" />
          <path d="M120 80 H210 M120 80 V170" strokeWidth="1.2" />
          <path d="M560 620 H470 M560 620 V530" strokeWidth="1.2" />
        </g>

        <path className="experience-sketch-ink" d="M180 160 H310 V280 H180 Z" strokeWidth="1.7" style={{ animationDelay: "80ms" }} />
        <path className="experience-sketch-ink" d="M360 120 H500 V250 H360 Z" strokeWidth="1.7" style={{ animationDelay: "160ms" }} />
        <path className="experience-sketch-ink" d="M210 340 H330 V480 H210 Z" strokeWidth="1.7" style={{ animationDelay: "240ms" }} />
        <path className="experience-sketch-ink" d="M390 320 H530 V500 H390 Z" strokeWidth="1.8" style={{ animationDelay: "320ms" }} />

        <path
          className="experience-sketch-ink"
          d="M310 220 H360 M270 340 V280 M390 400 H330 M460 320 V250"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          style={{ animationDelay: "420ms" }}
        />

        <path
          className="experience-sketch-ink"
          d="M150 520c70-10 130 30 200 18 58-10 110-40 170-28"
          strokeWidth="1.6"
          strokeOpacity="0.5"
          style={{ animationDelay: "520ms" }}
        />

        <circle className="experience-sketch-node" cx="245" cy="220" r="6" style={{ animationDelay: "600ms" }} />
        <circle className="experience-sketch-node" cx="430" cy="185" r="6" style={{ animationDelay: "680ms" }} />
        <circle className="experience-sketch-node" cx="270" cy="410" r="6" style={{ animationDelay: "760ms" }} />
        <circle className="experience-sketch-node is-hot" cx="460" cy="410" r="8" style={{ animationDelay: "840ms" }} />

        <text x="190" y="140" className="experience-sketch-label" fill="currentColor">ARCH</text>
        <text x="390" y="100" className="experience-sketch-label" fill="currentColor">API</text>
        <text x="230" y="520" className="experience-sketch-label" fill="currentColor">DATA</text>
        <text x="430" y="540" className="experience-sketch-label" fill="currentColor">SHIP</text>
        <text x="300" y="640" className="experience-sketch-note" fill="currentColor">systems · ownership</text>
      </g>
    </svg>
  );
}

function SketchProductField() {
  return (
    <svg
      className="absolute top-[6%] right-[-6%] h-[90%] w-[74%] max-w-none text-teal-900 md:right-0 md:w-[60%]"
      fill="none"
      viewBox="0 0 640 720"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <g className="text-teal-900/22">
          <path d="M140 90 H230 M140 90 V180" strokeWidth="1.2" />
          <path d="M100 560 H560" strokeWidth="0.9" strokeDasharray="4 8" />
          <circle cx="420" cy="280" r="180" strokeDasharray="5 9" strokeWidth="0.7" />
        </g>

        <path className="experience-sketch-ink" d="M130 140 H310 V340 H130 Z" strokeWidth="1.8" style={{ animationDelay: "80ms" }} />
        <path
          className="experience-sketch-ink"
          d="M158 175 H282 M158 215 H250 M158 255 H268 M158 295 H240"
          strokeWidth="1.25"
          strokeOpacity="0.4"
          style={{ animationDelay: "180ms" }}
        />

        <path
          className="experience-sketch-ink"
          d="M360 170 C400 150 440 190 480 175 C510 164 540 200 580 185"
          strokeWidth="1.7"
          style={{ animationDelay: "280ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M360 250 C410 230 450 275 500 255 C530 242 555 275 585 262"
          strokeWidth="1.7"
          style={{ animationDelay: "360ms" }}
        />
        <path
          className="experience-sketch-ink"
          d="M360 330 C405 315 445 350 495 335 C525 325 555 350 585 340"
          strokeWidth="1.6"
          style={{ animationDelay: "440ms" }}
        />

        <path
          className="experience-sketch-ink"
          d="M220 340 V420 C220 470 280 510 360 510 C440 510 500 470 500 420 V340"
          strokeWidth="1.55"
          strokeOpacity="0.7"
          style={{ animationDelay: "540ms" }}
        />

        <path
          className="experience-sketch-ink"
          d="M160 600c80-24 150 20 230 8 70-10 130-36 200-20"
          strokeWidth="1.4"
          strokeOpacity="0.45"
          style={{ animationDelay: "640ms" }}
        />

        <circle className="experience-sketch-node" cx="220" cy="240" r="6" style={{ animationDelay: "720ms" }} />
        <circle className="experience-sketch-node is-hot" cx="480" cy="250" r="8" style={{ animationDelay: "800ms" }} />
        <circle className="experience-sketch-node" cx="360" cy="510" r="6" style={{ animationDelay: "880ms" }} />

        <text x="150" y="120" className="experience-sketch-label" fill="currentColor">UI</text>
        <text x="430" y="140" className="experience-sketch-label" fill="currentColor">API</text>
        <text x="320" y="560" className="experience-sketch-label" fill="currentColor">MYSQL</text>
        <text x="250" y="660" className="experience-sketch-note" fill="currentColor">interface → product</text>
      </g>
    </svg>
  );
}

function SketchFoundationField() {
  return (
    <svg
      className="absolute top-[8%] right-[-2%] h-[88%] w-[68%] max-w-none text-teal-900 md:right-[2%] md:w-[56%]"
      fill="none"
      viewBox="0 0 640 720"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <g className="text-teal-900/22">
          <path d="M100 580 H560" strokeWidth="1.1" />
          <path d="M150 580 V220 M250 580 V280 M350 580 V180 M450 580 V300 M550 580 V240" strokeWidth="0.8" strokeDasharray="3 7" />
          <path d="M520 90 H580 M580 90 V150" strokeWidth="1.2" />
        </g>

        <path className="experience-sketch-ink" d="M150 480 H230 V580 H150 Z" strokeWidth="1.7" style={{ animationDelay: "80ms" }} />
        <path className="experience-sketch-ink" d="M250 400 H330 V580 H250 Z" strokeWidth="1.7" style={{ animationDelay: "180ms" }} />
        <path className="experience-sketch-ink" d="M350 300 H430 V580 H350 Z" strokeWidth="1.75" style={{ animationDelay: "280ms" }} />
        <path className="experience-sketch-ink" d="M450 210 H550 V580 H450 Z" strokeWidth="1.85" style={{ animationDelay: "380ms" }} />

        <path
          className="experience-sketch-ink"
          d="M190 450 C270 390 340 340 410 280 C460 240 510 200 540 170"
          strokeWidth="1.65"
          strokeOpacity="0.65"
          style={{ animationDelay: "500ms" }}
        />

        <path
          className="experience-sketch-ink"
          d="M180 640c70-14 140 18 210 6 60-10 110-30 170-16"
          strokeWidth="1.3"
          strokeOpacity="0.4"
          style={{ animationDelay: "600ms" }}
        />

        <circle className="experience-sketch-node" cx="190" cy="480" r="5.5" style={{ animationDelay: "700ms" }} />
        <circle className="experience-sketch-node" cx="290" cy="400" r="5.5" style={{ animationDelay: "760ms" }} />
        <circle className="experience-sketch-node" cx="390" cy="300" r="6" style={{ animationDelay: "820ms" }} />
        <circle className="experience-sketch-node is-hot" cx="500" cy="210" r="8" style={{ animationDelay: "900ms" }} />

        <text x="150" y="150" className="experience-sketch-label" fill="currentColor">START</text>
        <text x="470" y="140" className="experience-sketch-label" fill="currentColor">GROW</text>
        <text x="260" y="680" className="experience-sketch-note" fill="currentColor">learn · build · rise</text>
      </g>
    </svg>
  );
}
