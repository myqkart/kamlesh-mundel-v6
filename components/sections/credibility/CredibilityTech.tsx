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
      <p className="shrink-0 font-sketch text-[1.6rem] text-teal-700 md:text-[1.8rem]">
        core stack annotations
      </p>
      <p className="max-w-[52rem] font-sketch text-[1.7rem] leading-snug text-teal-900 md:text-[1.95rem]">
        {technologies.join(" · ")}
      </p>
    </div>
  );
}
