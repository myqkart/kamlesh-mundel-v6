const technologies = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Python",
  "FastAPI",
  "Django",
  "Frappe",
] as const;

export function CredibilityTech() {
  return (
    <div
      className="cred-write flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-10"
      style={{ animationDelay: "1500ms" }}
    >
      <p className="shrink-0 font-sketch text-[1.2rem] text-teal-700 md:text-[1.35rem]">
        core stack annotations
      </p>
      <p className="max-w-[52rem] font-sketch text-[1.25rem] leading-relaxed text-teal-900 md:text-[1.4rem]">
        {technologies.join(" · ")}
      </p>
    </div>
  );
}
