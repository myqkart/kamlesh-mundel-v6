import {
  expertiseCategories,
  expertiseTechnologies,
  type ExpertiseCategoryId,
  type ExpertiseTech,
} from "./technical-expertise";
import { projects } from "./projects";
import { experienceRoles } from "./experience";
import { siteConfig } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Answer-ready FAQs for Google rich results + AI citation (GEO). */
export const siteFaqs: readonly FaqItem[] = [
  {
    question: "Who is Kamlesh Mundel?",
    answer:
      "Kamlesh Mundel is a Sr. Full Stack Developer based in Ahmedabad, India. Since 2022 he has shipped production web products across ed-tech, AI training, real estate, auctions, and enterprise systems using React, Next.js, Node.js, TypeScript, Python, Frappe/ERPNext, AWS, and AI integrations.",
  },
  {
    question: "What technologies does Kamlesh Mundel work with?",
    answer: `Kamlesh works across the full stack: ${expertiseTechnologies
      .filter((t) => t.level === "primary" || t.level === "secondary")
      .map((t) => t.name)
      .join(", ")}. Primary focus areas include TypeScript, JavaScript, React, Next.js, Node.js, Python, MySQL, plus Frappe, AWS, LangChain, and ChatGPT/OpenAI for AI products.`,
  },
  {
    question: "Where is Kamlesh Mundel based?",
    answer: `Kamlesh Mundel is based in ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}, and works on remote-friendly product and enterprise engineering.`,
  },
  {
    question: "What kind of products has Kamlesh Mundel built?",
    answer: `He has built and shipped products including ${projects
      .map((p) => `${p.title} (${p.type})`)
      .join(", ")} — spanning immersive ed-tech, AI medical training, property operations, gamified reading, auctions, AEC platforms, and RAG support apps.`,
  },
  {
    question: "Is Kamlesh Mundel available for full-stack or AI product work?",
    answer:
      "Yes. Contact Kamlesh via the form on this site, email kamleshmundel18@gmail.com, or LinkedIn for full-stack product engineering, Frappe/ERPNext systems, AWS delivery, and AI (LangChain, RAG, ChatGPT) integrations.",
  },
  {
    question: "What is Kamlesh Mundel’s current role?",
    answer: `${experienceRoles[0]!.title} at ${experienceRoles[0]!.company} (${experienceRoles[0]!.start}–${experienceRoles[0]!.end}), leading scalable enterprise solutions with Frappe/ERPNext, modern web stacks, architecture, DevOps, and mentoring.`,
  },
] as const;

export type ExpertiseSeoCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  techs: ExpertiseTech[];
};

function buildExpertiseSeoCopy(): Record<ExpertiseCategoryId, ExpertiseSeoCopy> {
  const entries = expertiseCategories.map((category) => {
    const techs = expertiseTechnologies.filter((t) => t.category === category.id);
    const copy: ExpertiseSeoCopy = {
      title: `${category.label} expertise — Kamlesh Mundel`,
      description: `Kamlesh Mundel’s ${category.label.toLowerCase()} expertise: ${category.context} Technologies include ${techs.map((t) => t.name).join(", ")}.`,
      heading: `${category.label} engineering`,
      intro: category.context,
      techs: [...techs],
    };
    return [category.id, copy] as const;
  });

  return Object.fromEntries(entries) as Record<
    ExpertiseCategoryId,
    ExpertiseSeoCopy
  >;
}

export const expertiseSeoCopy = buildExpertiseSeoCopy();

export const homeSeoParagraph = [
  "Kamlesh Mundel is a Sr. Full Stack Developer in Ahmedabad who designs and ships production software end to end — interfaces, APIs, data models, cloud deployment, and AI features.",
  "His work covers React and Next.js frontends, Node.js and Python backends, MySQL and MongoDB data layers, Frappe/ERPNext enterprise systems, AWS infrastructure, and AI products built with LangChain, RAG, and ChatGPT.",
  "Featured products include Tutorac (ed-tech), PartsPractice (AI medical training), Eezily (real-estate on Frappe + React), GetLitt!, DivorceX, Insyd, Aloha-Bids, and Harrier Chatbot.",
].join(" ");
