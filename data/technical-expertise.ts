export type ExpertiseLevel = "primary" | "secondary" | "supporting";

export type ExpertiseCategoryId =
  | "frontend"
  | "backend"
  | "data"
  | "apis"
  | "infrastructure"
  | "ai";

export type ExpertiseTech = {
  id: string;
  name: string;
  category: ExpertiseCategoryId;
  level: ExpertiseLevel;
  descriptor?: string;
};

export type ExpertiseCategory = {
  id: ExpertiseCategoryId;
  label: string;
  number: string;
  context: string;
};

export const expertiseCategories: readonly ExpertiseCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    number: "01",
    context: "Interfaces, product experiences, and full-stack web applications.",
  },
  {
    id: "backend",
    label: "Backend",
    number: "02",
    context: "APIs, services, workflows, and server-side systems.",
  },
  {
    id: "data",
    label: "Data",
    number: "03",
    context: "Application data, structured systems, and product backends.",
  },
  {
    id: "apis",
    label: "APIs",
    number: "04",
    context: "Integrations, authentication, and service boundaries.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    number: "05",
    context: "Deployment, environments, and production delivery.",
  },
  {
    id: "ai",
    label: "AI",
    number: "06",
    context: "Intelligent systems, extraction, and AI-assisted products.",
  },
] as const;

export const expertiseTechnologies: readonly ExpertiseTech[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "primary",
    descriptor: "Typed application code across the product stack.",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "primary",
    descriptor: "Interfaces, dashboards, and interactive product experiences.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: "primary",
    descriptor: "Production web applications and full-stack experiences.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: "primary",
    descriptor: "APIs, services, integrations, and backend systems.",
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    level: "primary",
    descriptor: "Backend systems, APIs, automation, and AI integrations.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: "secondary",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: "supporting",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    level: "secondary",
    descriptor: "High-performance Python APIs and backend services.",
  },
  {
    id: "django",
    name: "Django",
    category: "backend",
    level: "secondary",
  },
  {
    id: "frappe",
    name: "Frappe",
    category: "backend",
    level: "secondary",
    descriptor: "Business applications, workflows, and enterprise systems.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data",
    level: "secondary",
    descriptor: "Application data for product backends.",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "data",
    level: "secondary",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data",
    level: "supporting",
  },
  {
    id: "rest",
    name: "REST APIs",
    category: "apis",
    level: "secondary",
  },
  {
    id: "auth",
    name: "Authentication",
    category: "apis",
    level: "supporting",
    descriptor: "JWT and authenticated access patterns.",
  },
  {
    id: "integrations",
    name: "Integrations",
    category: "apis",
    level: "supporting",
  },
  {
    id: "aws",
    name: "AWS",
    category: "infrastructure",
    level: "secondary",
    descriptor: "Deployment and production infrastructure.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "infrastructure",
    level: "supporting",
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "infrastructure",
    level: "supporting",
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    level: "supporting",
    descriptor: "AI-assisted extraction and product features.",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai",
    level: "supporting",
  },
  {
    id: "rag",
    name: "RAG",
    category: "ai",
    level: "supporting",
  },
] as const;

export const expertiseFlow = [
  "Frontend",
  "Backend",
  "Data",
  "APIs",
  "Infrastructure",
] as const;

export const expertisePrimary = expertiseTechnologies.filter(
  (tech) => tech.level === "primary",
);
