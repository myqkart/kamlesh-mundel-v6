export type ProjectCategory = "Product" | "Enterprise" | "AI";

export type FeaturedLayout = "primary" | "reverse" | "compact";

export type FeaturedVisual = "vault" | "extract" | "erp";

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  emphasis: string;
  role: string;
  type: string;
  category: ProjectCategory;
  technologies: string[];
  href: string;
  featured: boolean;
  layout?: FeaturedLayout;
  visual?: FeaturedVisual;
};

export const projects: Project[] = [
  {
    id: "credencex",
    slug: "credencex",
    title: "CredenceX",
    description:
      "A zero-knowledge password vault for secure credential management — built around encryption, authenticated access, and a resilient PWA experience.",
    emphasis:
      "Security-first product engineering for credentials you never store in plaintext.",
    role: "Full Stack Developer",
    type: "Security Platform",
    category: "Product",
    technologies: ["Next.js", "MongoDB", "PWA", "JWT", "AES-256"],
    href: "/work/credencex",
    featured: true,
    layout: "primary",
    visual: "vault",
  },
  {
    id: "property-extraction",
    slug: "property-extraction",
    title: "Property Brochure Extraction",
    description:
      "An AI system that turns real-estate brochure PDFs into structured property data teams can actually use.",
    emphasis: "Unstructured property documents → structured usable data.",
    role: "Product Engineer",
    type: "AI Product",
    category: "AI",
    technologies: ["Next.js", "Claude", "PDF", "Frappe"],
    href: "/work/property-extraction",
    featured: true,
    layout: "reverse",
    visual: "extract",
  },
  {
    id: "frappe-enterprise",
    slug: "frappe-enterprise",
    title: "Frappe Enterprise Systems",
    description:
      "Enterprise workflows, APIs, and business logic on Frappe — shaped by real operational requirements and integration constraints.",
    emphasis:
      "Complex business rules, reliable data models, and systems that hold up in production.",
    role: "Full Stack Developer",
    type: "Enterprise System",
    category: "Enterprise",
    technologies: ["Frappe", "Python", "APIs", "Databases"],
    href: "/work/frappe-enterprise",
    featured: true,
    layout: "primary",
    visual: "erp",
  },
];

export type FilterCategory = "All" | ProjectCategory;

export const projectCategories: FilterCategory[] = [
  "All",
  "Product",
  "AI",
  "Enterprise",
];

export const featuredProjects = projects.filter((project) => project.featured);

/** Archive index — complete body of work available in the dataset. */
export const archiveProjects = projects;

export type FeaturedProject = {
  slug: string;
  number: string;
  name: string;
  description: string;
  emphasis: string;
  role: string;
  type: string;
  stack: string[];
  href: string;
  layout: FeaturedLayout;
  visual: FeaturedVisual;
};

export function toFeaturedProject(
  project: Project,
  index: number,
): FeaturedProject {
  return {
    slug: project.slug,
    number: String(index + 1).padStart(2, "0"),
    name: project.title,
    description: project.description,
    emphasis: project.emphasis,
    role: project.role,
    type: project.type,
    stack: project.technologies,
    href: project.href,
    layout: project.layout ?? "compact",
    visual: project.visual ?? "vault",
  };
}

export const featuredWorkItems = featuredProjects.map(toFeaturedProject);
