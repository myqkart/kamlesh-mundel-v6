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
    id: "saasjoy",
    number: "01",
    company: "Saasjoy Solutions",
    companyLegal: "Saasjoy Solutions Private Limited",
    title: "Sr. Full Stack Developer",
    start: "Nov 2025",
    end: "Present",
    location: "Ahmedabad, India",
    current: true,
    scope:
      "Leading scalable enterprise solutions with Frappe/ERPNext and modern web technologies — architecture, DevOps, and reliable products that create measurable business value.",
    responsibilities: [
      "Lead development of enterprise solutions on Frappe/ERPNext and modern web stacks",
      "Shape system architecture, DevOps, CI/CD, and deployment automation",
      "Uphold code quality and mentor engineers across delivery",
      "Build reliable products focused on measurable business impact",
    ],
    focus: [
      "Frappe/ERPNext",
      "Architecture",
      "DevOps",
      "CI/CD",
      "Mentoring",
    ],
    impact:
      "Passionate about system architecture, technical mentoring, and products that hold up in production.",
    domain: "Enterprise · Product Engineering",
  },
  {
    id: "techuz-fullstack",
    number: "02",
    company: "Techuz Infoweb",
    companyLegal: "Techuz Infoweb PVT. LTD.",
    companyUrl: "https://www.techuz.com/",
    title: "Full-Stack Developer",
    start: "Jan 2022",
    end: "Nov 2025",
    location: "Ahmedabad, India",
    scope:
      "Crafted intuitive, high-performance web apps with React.js, Next.js, Node.js, TypeScript, and MySQL — focused on seamless UX and business impact.",
    responsibilities: [
      "Built production web applications with React, Next.js, Node.js, and TypeScript",
      "Shipped full-stack features backed by MySQL and modern APIs",
      "Led projects including database design, bidding logic with Stripe, PR reviews, and AWS deployment",
      "Delivered products across ed-tech, marketplaces, real estate, and AI-assisted tools",
    ],
    focus: ["React", "Next.js", "Node.js", "TypeScript", "MySQL", "AWS"],
    impact:
      "Delivered production products across education, auctions, AEC, and AI — from UX to deployment.",
    note: "Emerging Employee of the Month — 23 November 2022.",
    domain: "Product · Full Stack",
  },
] as const;

export const experienceMeta = {
  location: "Ahmedabad, India",
  since: "Since 2022",
  evolution: "Full Stack → Sr. Full Stack",
} as const;

export const education = {
  degree: "Bachelor of Technology (Electronics & Communication)",
  school: "Jodhpur Institute of Technology",
  start: "Aug 2018",
  end: "May 2022",
  location: "Rajasthan, India",
} as const;

export const certificates = [
  { name: "Angular", issuer: "HackerRank" },
  { name: "Node.js", issuer: "HackerRank" },
  { name: "MySQL", issuer: "HackerRank" },
] as const;
