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
    id: "tutorac",
    slug: "tutorac",
    title: "Tutorac",
    description:
      "An online learning platform for classes 11 & 12 — 4K video lessons with 3D visuals, live exam prep, integrated quizzes, and a student–teacher doubt clarification module. Built from scratch for an immersive learning experience.",
    emphasis: "Ed-tech built end to end — from immersive lessons to live exam prep.",
    role: "Full Stack Developer",
    type: "Ed-Tech Platform",
    category: "Product",
    technologies: ["Node.js", "Angular", "MongoDB", "MySQL"],
    href: "/work/tutorac",
    featured: true,
    layout: "primary",
    visual: "vault",
  },
  {
    id: "partspractice",
    slug: "partspractice",
    title: "PartsPractice",
    description:
      "An AI-powered training platform for medical therapists (Oxford Mtrain) — realistic patient simulations, role-playing exercises, progress tracking, and AI-generated feedback with secure access and personalized subscriptions.",
    emphasis: "AI patient simulations that help therapists train with confidence.",
    role: "Full Stack Developer",
    type: "AI Medical Training",
    category: "AI",
    technologies: ["Node.js", "React", "MySQL", "ChatGPT"],
    href: "/work/partspractice",
    featured: true,
    layout: "reverse",
    visual: "extract",
  },
  {
    id: "eezily",
    slug: "eezily",
    title: "Eezily",
    description:
      "A real-estate platform on Frappe and React that streamlines property management and customer interactions — projects, floor plans, amenities, pricing, brokers, and end-user buy/sell/rent flows through a responsive interface.",
    emphasis: "Property ops and customer journeys on one Frappe + React system.",
    role: "Full Stack Developer",
    type: "Real Estate Platform",
    category: "Enterprise",
    technologies: ["Frappe", "React", "Python", "MariaDB", "REST APIs"],
    href: "/work/eezily",
    featured: true,
    layout: "primary",
    visual: "erp",
  },
  {
    id: "getlitt",
    slug: "getlitt",
    title: "GetLitt!",
    description:
      "A gamified e-learning platform that builds reading habits in children through a digital library and interactive challenges — books across genres, global reading olympiads, and school partnerships.",
    emphasis: "Gamified reading that turns kids into consistent readers.",
    role: "Full Stack Developer",
    type: "Kids' Reading Platform",
    category: "Product",
    technologies: ["Node.js", "Angular", "MySQL", "PostgreSQL"],
    href: "/work/getlitt",
    featured: false,
  },
  {
    id: "divorcex",
    slug: "divorcex",
    title: "DivorceX",
    description:
      "An AI-driven web app using ChatGPT APIs for contextual divorce-related support — users send messages, documents, or audio and receive personalized responses, with interaction history and subscription-based advanced access.",
    emphasis: "Contextual AI support for sensitive, real-life scenarios.",
    role: "Full Stack Developer",
    type: "AI Support Product",
    category: "AI",
    technologies: ["Node.js", "React", "MySQL", "ChatGPT"],
    href: "/work/divorcex",
    featured: false,
    visual: "extract",
  },
  {
    id: "insyd",
    slug: "insyd",
    title: "Insyd",
    description:
      "A discovery and engagement platform for professionals in the AEC industries — led database design, PR reviews, and AWS deployment.",
    emphasis: "Discovery and engagement for AEC professionals.",
    role: "Project Lead · Full Stack",
    type: "AEC Platform",
    category: "Enterprise",
    technologies: ["Node.js", "AWS", "MySQL"],
    href: "/work/insyd",
    featured: false,
    visual: "erp",
  },
  {
    id: "aloha-bids",
    slug: "aloha-bids",
    title: "Aloha-Bids",
    description:
      "A web portal for listing, bidding, and purchasing automobiles with role-based access for buyers, sellers, and admins — focused on seamless UX, security, and performance. Led bidding logic with Stripe, PR reviews, and AWS deployment.",
    emphasis: "Live bidding, Stripe payments, and role-based auction flows.",
    role: "Project Lead · Full Stack",
    type: "Car Auction Platform",
    category: "Product",
    technologies: ["Node.js", "Stripe", "AWS"],
    href: "/work/aloha-bids",
    featured: false,
  },
  {
    id: "harrier-chatbot",
    slug: "harrier-chatbot",
    title: "Harrier Chatbot",
    description:
      "A RAG application using LangChain for conversational support for Harrier car users — identifies potential issues and returns context-aware answers from documentation and technical knowledge, reducing unnecessary service visits.",
    emphasis: "RAG support that answers car issues from real technical docs.",
    role: "Full Stack Developer",
    type: "RAG Application",
    category: "AI",
    technologies: ["LangChain", "RAG", "Python"],
    href: "/work/harrier-chatbot",
    featured: false,
    visual: "extract",
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
