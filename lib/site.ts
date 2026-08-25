/**
 * Canonical site identity for SEO, GEO, sitemaps, and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://kamleshmundel.com).
 */
export const siteConfig = {
  name: "Kamlesh Mundel",
  shortName: "Kamlesh Mundel",
  title: "Kamlesh Mundel — Sr. Full Stack Developer",
  titleTemplate: "%s · Kamlesh Mundel",
  description:
    "Kamlesh Mundel is a Sr. Full Stack Developer in Ahmedabad, India. He builds production web products with React, Next.js, Node.js, TypeScript, Python, Frappe/ERPNext, AWS, and AI (LangChain, RAG, ChatGPT) — from ed-tech and real estate to medical training and enterprise systems.",
  locale: "en_IN",
  language: "en",
  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
  },
  jobTitle: "Sr. Full Stack Developer",
  email: "kamleshmundel18@gmail.com",
  phone: "+917790997718",
  sameAs: [
    "https://in.linkedin.com/in/kamlesh-mundel-88b7401a1",
  ] as const,
  keywords: [
    "Kamlesh Mundel",
    "Full Stack Developer",
    "Sr Full Stack Developer",
    "Full Stack Developer Ahmedabad",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "Python developer",
    "Frappe developer",
    "ERPNext developer",
    "AWS developer",
    "LangChain developer",
    "RAG application developer",
    "AI full stack developer",
    "web application development",
    "enterprise software engineer",
    "ed-tech developer",
    "real estate platform developer",
  ] as const,
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(
    /\/$/,
    "",
  );
  if (vercel) return `https://${vercel}`;

  const vercelUrl = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
