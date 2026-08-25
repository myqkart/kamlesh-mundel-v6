import type { FeaturedVisual } from "@/data/featured-work";

type ProjectVisualProps = {
  visual: FeaturedVisual;
  title: string;
  delay?: string;
};

export function ProjectVisual({ visual, title, delay = "120ms" }: ProjectVisualProps) {
  return (
    <div
      className="work-visual relative aspect-[16/11] w-full overflow-hidden text-teal-900 md:aspect-[16/10]"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_10%,rgb(120_205_215_/_0.18),transparent_45%),linear-gradient(160deg,rgb(13_92_99_/_0.04),transparent_55%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgb(13 92 99 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(13 92 99 / 0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-3 text-teal-900/30"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          className="cred-ink"
          d="M2 3.5 C 30 1.8, 70 2.2, 97.5 3 C 98.6 24, 98.5 70, 97 96.8 C 66 98.4, 30 98, 2.8 96.5 C 1.4 68, 1.5 26, 2 3.5 Z"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: delay }}
        />
      </svg>

      <div className="relative z-10 flex h-full items-center justify-center p-6 md:p-10">
        {visual === "vault" ? <VaultSketch /> : null}
        {visual === "extract" ? <ExtractSketch /> : null}
        {visual === "erp" ? <ErpSketch /> : null}
      </div>

      <p className="pointer-events-none absolute bottom-4 left-5 font-sketch text-[1.15rem] text-teal-700 md:bottom-5 md:left-7 md:text-[1.3rem]">
        {title}
      </p>
    </div>
  );
}

function VaultSketch() {
  return (
    <svg
      aria-hidden="true"
      className="h-[min(100%,18rem)] w-full max-w-[28rem] text-teal-900"
      fill="none"
      viewBox="0 0 420 280"
    >
      <path
        className="cred-ink"
        d="M120 70h180c14 0 26 12 26 26v120c0 14-12 26-26 26H120c-14 0-26-12-26-26V96c0-14 12-26 26-26Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.8"
        style={{ animationDelay: "280ms" }}
      />
      <path
        className="cred-ink"
        d="M168 128c0-24 18-42 42-42s42 18 42 42v22H168v-22Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ animationDelay: "420ms" }}
      />
      <circle
        className="cred-node"
        cx="210"
        cy="178"
        r="16"
        fill="var(--color-off-white)"
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ animationDelay: "560ms" }}
      />
      <path
        className="cred-ink"
        d="M210 194v28"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
        style={{ animationDelay: "640ms" }}
      />
      <path
        className="cred-ink"
        d="M78 118c-18 20-24 48-16 74M342 118c18 20 24 48 16 74"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.45"
        strokeWidth="1.3"
        style={{ animationDelay: "720ms" }}
      />
    </svg>
  );
}

function ExtractSketch() {
  return (
    <svg
      aria-hidden="true"
      className="h-[min(100%,18rem)] w-full max-w-[30rem] text-teal-900"
      fill="none"
      viewBox="0 0 440 280"
    >
      <path
        className="cred-ink"
        d="M70 58h120c8 0 14 6 14 14v150c0 8-6 14-14 14H70c-8 0-14-6-14-14V72c0-8 6-14 14-14Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.7"
        style={{ animationDelay: "280ms" }}
      />
      <path
        className="cred-ink"
        d="M84 92h90M84 118h72M84 144h82M84 170h60"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.45"
        strokeWidth="1.4"
        style={{ animationDelay: "420ms" }}
      />
      <path
        className="cred-ink"
        d="M220 140h48"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
        style={{ animationDelay: "560ms" }}
      />
      <path
        className="cred-ink"
        d="M256 128l20 12-20 12"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        style={{ animationDelay: "620ms" }}
      />
      <path
        className="cred-ink"
        d="M290 78h90c10 0 18 8 18 18v108c0 10-8 18-18 18h-90c-10 0-18-8-18-18V96c0-10 8-18 18-18Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.7"
        style={{ animationDelay: "700ms" }}
      />
      <path
        className="cred-ink"
        d="M304 112h62M304 138h48M304 164h56M304 190h40"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        style={{ animationDelay: "820ms" }}
      />
      <circle
        className="cred-node"
        cx="244"
        cy="140"
        r="5"
        fill="currentColor"
        stroke="none"
        style={{ animationDelay: "540ms" }}
      />
    </svg>
  );
}

function ErpSketch() {
  return (
    <svg
      aria-hidden="true"
      className="h-[min(100%,17rem)] w-full max-w-[30rem] text-teal-900"
      fill="none"
      viewBox="0 0 440 260"
    >
      <path
        className="cred-ink"
        d="M70 120h70M160 120h70M250 120h70M340 120h40"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        style={{ animationDelay: "280ms" }}
      />
      <path
        className="cred-ink"
        d="M195 120V70h90V120M195 120v70h90v-70"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ animationDelay: "420ms" }}
      />
      {[
        [90, 120],
        [180, 120],
        [270, 120],
        [360, 120],
        [240, 70],
        [240, 190],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className="cred-node"
          cx={cx}
          cy={cy}
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="var(--color-off-white)"
          style={{ animationDelay: `${500 + index * 80}ms` }}
        />
      ))}
    </svg>
  );
}
