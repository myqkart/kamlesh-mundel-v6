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
    id: "documents-to-data",
    number: "01",
    dimension: "Efficiency",
    title: "Documents into usable data",
    transformation: "Unstructured documents → structured property data",
    challenge:
      "Property information trapped inside brochure PDFs — hard to search, process, or feed into downstream systems.",
    intervention:
      "Engineered an AI extraction pipeline that reads brochure PDFs and turns them into structured property records.",
    outcome:
      "Teams can process and use property data digitally instead of retyping and reconstructing it by hand.",
    projectSlug: "property-extraction",
    projectTitle: bySlug["property-extraction"]!.title,
    projectHref: bySlug["property-extraction"]!.href,
    emphasis: true,
  },
  {
    id: "secure-credentials",
    number: "02",
    dimension: "Product",
    title: "Security that stays usable",
    transformation: "Complex security requirements → usable product",
    challenge:
      "Credential management needs strong encryption and authenticated access without becoming unusable for everyday work.",
    intervention:
      "Built a zero-knowledge password vault around encrypted storage, JWT authentication, and a resilient PWA experience.",
    outcome:
      "Users keep control of sensitive credentials in a product designed for secure access — not plaintext storage.",
    projectSlug: "credencex",
    projectTitle: bySlug.credencex!.title,
    projectHref: bySlug.credencex!.href,
  },
  {
    id: "enterprise-workflows",
    number: "03",
    dimension: "Reliability",
    title: "Workflows that hold in production",
    transformation: "Manual business workflows → connected digital systems",
    challenge:
      "Enterprise operations depend on complex rules, integrations, and data models that fail when treated as one-off tickets.",
    intervention:
      "Engineered Frappe-based workflows, APIs, and business logic shaped by real operational constraints.",
    outcome:
      "Business processes run as connected digital systems — more reliable data flow, clearer ownership, less operational friction.",
    projectSlug: "frappe-enterprise",
    projectTitle: bySlug["frappe-enterprise"]!.title,
    projectHref: bySlug["frappe-enterprise"]!.href,
  },
] as const;

export const impactSignals = [
  { label: "4.5+", detail: "years shipping production software" },
  { label: "10+", detail: "projects delivered across product & enterprise" },
  { label: "3", detail: "impact dimensions evidenced here" },
] as const;

export const impactArc = ["Problem", "Engineering", "Outcome"] as const;
