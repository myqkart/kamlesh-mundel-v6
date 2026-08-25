export type ApproachPrinciple = {
  id: string;
  number: string;
  title: string;
  philosophy: string;
  explanation: string;
  keywords: readonly string[];
};

export const approachPrinciples: readonly ApproachPrinciple[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand Before Building",
    philosophy:
      "I prefer understanding the problem deeply before deciding what to build.",
    explanation:
      "Requirements, user needs, business context, existing systems, constraints, and edge cases come first — so the solution fits the real problem.",
    keywords: ["Requirements", "Context", "Constraints"],
  },
  {
    id: "system",
    number: "02",
    title: "Design the System, Not Just the Feature",
    philosophy:
      "A feature rarely exists in isolation. Good implementation considers the system around it.",
    explanation:
      "Architecture, data flow, APIs, state, dependencies, and failure modes shape how a change should land — not just the ticket description.",
    keywords: ["Architecture", "APIs", "Data"],
  },
  {
    id: "complexity",
    number: "03",
    title: "Keep Complexity Intentional",
    philosophy:
      "Complexity should solve a real problem, not demonstrate technical ability.",
    explanation:
      "Simple abstractions, clear boundaries, and maintainable code beat cleverness. Premature optimization stays off the path.",
    keywords: ["Boundaries", "Maintainability"],
  },
  {
    id: "users",
    number: "04",
    title: "Build for Real Users",
    philosophy:
      "The implementation is successful when the user experience is successful.",
    explanation:
      "Usability, accessibility, performance, feedback, and honest loading and error states are engineering decisions — not afterthoughts.",
    keywords: ["Accessibility", "Performance", "UX"],
  },
  {
    id: "reliable",
    number: "05",
    title: "Make It Reliable",
    philosophy: "Reliability is part of the feature, not something added afterward.",
    explanation:
      "Validation, error handling, security, logging, and failure recovery belong in the same delivery as the happy path.",
    keywords: ["Security", "Observability", "Integrity"],
  },
  {
    id: "ship",
    number: "06",
    title: "Ship, Learn, Improve",
    philosophy: "Shipping creates feedback. Feedback creates better software.",
    explanation:
      "Deployment is a beginning: monitor, learn, iterate, and refactor with evidence instead of assumption.",
    keywords: ["Deployment", "Feedback", "Iteration"],
  },
] as const;
