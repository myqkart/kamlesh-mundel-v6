import { projects } from "./projects";

export type ImpactDimension =
  | "Product"
  | "Efficiency"
  | "Reliability"
  | "Experience"
  | "Enablement";

export type ImpactStory = {
  id: string;
  number: string;
  dimension: ImpactDimension;
  title: string;
  transformation: string;
  challenge: string;
  intervention: string;
  outcome: string;
  projectSlug: string;
  projectTitle: string;
  projectHref: string;
  emphasis?: boolean;
};

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export const impactStories: readonly ImpactStory[] = [
  {
    id: "immersive-learning",
    number: "01",
    dimension: "Experience",
    title: "Learning that feels immersive",
    transformation: "Static study materials → 4K lessons with live prep",
    challenge:
      "Classes 11 & 12 needed more than recorded lectures — students needed visuals, live exam prep, quizzes, and a way to clear doubts with teachers.",
    intervention:
      "Built Tutorac from scratch with 4K video lessons, 3D visuals, live tests, integrated quizzes, and a student–teacher doubt module.",
    outcome:
      "Learners get an immersive platform that supports study, practice, and clarification in one place.",
    projectSlug: "tutorac",
    projectTitle: bySlug.tutorac!.title,
    projectHref: bySlug.tutorac!.href,
    emphasis: true,
  },
  {
    id: "ai-clinical-training",
    number: "02",
    dimension: "Enablement",
    title: "Training therapists with AI",
    transformation: "Limited practice access → realistic AI patient simulations",
    challenge:
      "Medical therapists need safe, repeatable practice with realistic patients, feedback, and progress tracking — without waiting for scarce clinical opportunities.",
    intervention:
      "Engineered PartsPractice (Oxford Mtrain) with AI simulations, role-play, progress tracking, and ChatGPT-powered feedback plus subscription access.",
    outcome:
      "Therapists can rehearse scenarios and receive personalized AI feedback that strengthens skills and patient care.",
    projectSlug: "partspractice",
    projectTitle: bySlug.partspractice!.title,
    projectHref: bySlug.partspractice!.href,
  },
  {
    id: "property-operations",
    number: "03",
    dimension: "Reliability",
    title: "Property ops in one system",
    transformation: "Scattered property workflows → connected digital platform",
    challenge:
      "Real-estate organizations juggle projects, floor plans, amenities, pricing, brokers, and end-user buy/sell/rent journeys across disconnected tools.",
    intervention:
      "Developed Eezily end to end on Frappe and React — REST APIs, authentication, CI/CD, deployments, and system architecture across frontend and backend.",
    outcome:
      "Teams manage residential and commercial portfolios while customers browse, buy, sell, or rent through one responsive experience.",
    projectSlug: "eezily",
    projectTitle: bySlug.eezily!.title,
    projectHref: bySlug.eezily!.href,
  },
] as const;

export const impactSignals = [
  { label: "4.5+", detail: "years shipping production software" },
  { label: "8+", detail: "projects across product, AI & enterprise" },
  { label: "3", detail: "impact stories evidenced here" },
] as const;

export const impactArc = ["Problem", "Engineering", "Outcome"] as const;
