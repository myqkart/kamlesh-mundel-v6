export type ExperienceRole = {
  id: string;
  number: string;
  company: string;
  companyLegal?: string;
  companyUrl?: string;
  title: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  scope: string;
  responsibilities: readonly string[];
  focus: readonly string[];
  impact?: string;
  note?: string;
  domain: string;
};

export const experienceRoles: readonly ExperienceRole[] = [
  {
    id: "momentum91",
    number: "01",
    company: "Momentum91",
    companyLegal: "Saasjoy Solutions Private Limited",
    title: "SDE-2",
    start: "Nov 2025",
    end: "Present",
    location: "Ahmedabad, India",
    current: true,
    scope:
      "Full-stack ownership of enterprise solutions — architecture, delivery, and the systems that keep them reliable in production.",
    responsibilities: [
      "Shape system architecture across Frappe/ERPNext and modern web stacks",
      "Own backend, API, and frontend delivery for production enterprise products",
      "Drive CI/CD, deployment automation, and code quality across the team",
      "Mentor engineers and contribute to technical decision-making",
    ],
    focus: [
      "Frappe/ERPNext",
      "Architecture",
      "APIs",
      "DevOps",
      "CI/CD",
      "Mentoring",
    ],
    impact:
      "Building scalable enterprise solutions with attention to architecture, automation, and long-term maintainability.",
    domain: "Enterprise · Product Engineering",
  },
  {
    id: "techuz-fullstack",
    number: "02",
    company: "Techuz Infoweb",
    companyUrl: "https://www.techuz.com/",
    title: "Full-Stack Developer",
    start: "Jul 2022",
    end: "Nov 2025",
    location: "Ahmedabad, India",
    scope:
      "Built product-facing web applications end to end — interfaces, APIs, and data — for startup and enterprise clients.",
    responsibilities: [
      "Developed high-performance web applications with React, Next.js, and Node.js",
      "Shipped features across TypeScript frontends and MySQL-backed services",
      "Translated product requirements into reliable, usable interfaces",
    ],
    focus: ["React", "Next.js", "Node.js", "TypeScript", "MySQL"],
    impact:
      "Delivered production web products across education, marketplaces, and AI-assisted tools.",
    note: "Emerging Employee of the Month — 23 November 2022.",
    domain: "Product · Full Stack",
  },
  {
    id: "techuz-trainee",
    number: "03",
    company: "Techuz Infoweb",
    companyUrl: "https://www.techuz.com/",
    title: "Software Developer Trainee",
    start: "Jan 2022",
    end: "Jul 2022",
    location: "Ahmedabad, India",
    scope:
      "The starting point — learning how professional software is designed, reviewed, and shipped.",
    responsibilities: [
      "Developed foundational skills across the company’s web engineering stack",
      "Grew into product work that led to a full-stack developer role",
    ],
    focus: ["JavaScript", "React", "Web fundamentals"],
    domain: "Foundation",
  },
] as const;

export const experienceMeta = {
  location: "Ahmedabad, India",
  since: "Since 2022",
  evolution: "Trainee → Full Stack → SDE-2",
} as const;
