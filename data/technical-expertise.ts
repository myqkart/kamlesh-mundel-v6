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
    label: "APIs & ORM",
    number: "04",
    context: "Integrations, ORMs, authentication, and service boundaries.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    number: "05",
    context: "AWS deployment, CI/CD, Docker, and production delivery.",
  },
  {
    id: "ai",
    label: "AI",
    number: "06",
    context: "LangChain, RAG, and AI integrations in production products.",
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
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: "primary",
    descriptor: "Core language across frontend and Node services.",
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
    id: "angular",
    name: "Angular",
    category: "frontend",
    level: "secondary",
    descriptor: "Enterprise and product frontends at scale.",
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
    descriptor: "Backend systems, Frappe apps, and AI integrations.",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    level: "secondary",
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "backend",
    level: "secondary",
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
    id: "mysql",
    name: "MySQL",
    category: "data",
    level: "primary",
    descriptor: "Relational data for production product backends.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data",
    level: "secondary",
    descriptor: "Document data for product backends.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data",
    level: "secondary",
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "apis",
    level: "secondary",
  },
  {
    id: "sequelize",
    name: "Sequelize",
    category: "apis",
    level: "supporting",
  },
  {
    id: "objection",
    name: "Objection.js",
    category: "apis",
    level: "supporting",
  },
  {
    id: "rest",
    name: "REST APIs",
    category: "apis",
    level: "secondary",
  },
  {
    id: "aws",
    name: "AWS",
    category: "infrastructure",
    level: "secondary",
    descriptor: "Deployment, CI/CD, and production infrastructure.",
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
    id: "langchain",
    name: "LangChain",
    category: "ai",
    level: "secondary",
    descriptor: "RAG and conversational AI applications.",
  },
  {
    id: "chatgpt",
    name: "ChatGPT / OpenAI",
    category: "ai",
    level: "secondary",
    descriptor: "GPT models for product features and feedback loops.",
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
