import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import { projects } from "@/data/projects";
import { expertiseSeoCopy } from "@/data/seo";
import {
  expertiseCategories,
  type ExpertiseCategoryId,
} from "@/data/technical-expertise";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ category: string }>;
};

const categoryIds = expertiseCategories.map((c) => c.id);

export function generateStaticParams() {
  return categoryIds.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const copy = expertiseSeoCopy[category];

  return {
    title: copy.heading,
    description: copy.description,
    keywords: [
      ...copy.techs.map((t) => t.name),
      `${copy.heading} developer`,
      "Kamlesh Mundel",
      "full stack",
    ],
    alternates: {
      canonical: `/expertise/${category}`,
    },
    openGraph: {
      title: `${copy.title}`,
      description: copy.description,
      url: absoluteUrl(`/expertise/${category}`),
    },
  };
}

function isCategory(value: string): value is ExpertiseCategoryId {
  return categoryIds.includes(value as ExpertiseCategoryId);
}

export default async function ExpertiseCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const meta = expertiseCategories.find((c) => c.id === category)!;
  const copy = expertiseSeoCopy[category];
  const relatedProjects = projects.filter((project) =>
    project.technologies.some((tech) =>
      copy.techs.some(
        (t) =>
          tech.toLowerCase().includes(t.name.toLowerCase().split(" ")[0]!) ||
          t.name.toLowerCase().includes(tech.toLowerCase()),
      ),
    ),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: meta.label, path: `/expertise/${category}` },
        ]}
      />

      <main className="sketch-sheet">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <article className="relative px-[max(1.85rem,6.5vw)] pt-[max(3rem,8vh)] pb-[var(--section-pad-y)] md:px-[7vw]">
          <p className="font-sketch text-[1.35rem] text-teal-700">
            <Link href="/expertise" className="hover:underline">
              ← Expertise
            </Link>
          </p>

          <p className="mt-8 font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]">
            {meta.number} · {meta.label.toLowerCase()}
          </p>
          <h1 className="mt-3 max-w-[16ch] -rotate-1 font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-teal-900">
            {copy.heading}
          </h1>
          <p className="mt-4 max-w-[38rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]">
            {siteConfig.name} applies {meta.label.toLowerCase()} skills in
            production products: {copy.intro}
          </p>

          <section aria-labelledby="techs-heading" className="mt-12">
            <h2
              id="techs-heading"
              className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] text-teal-900"
            >
              Technologies
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {copy.techs.map((tech) => (
                <li key={tech.id} className="max-w-[24rem]">
                  <p className="font-display text-[1.55rem] leading-none text-teal-900">
                    {tech.name}
                  </p>
                  <p className="mt-1 font-sketch text-[1.25rem] text-teal-700">
                    {tech.level}
                  </p>
                  {tech.descriptor ? (
                    <p className="mt-2 text-[1.02rem] leading-snug text-teal-900/75">
                      {tech.descriptor}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          {relatedProjects.length > 0 ? (
            <section aria-labelledby="projects-heading" className="mt-14">
              <h2
                id="projects-heading"
                className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] text-teal-900"
              >
                Projects using this stack
              </h2>
              <ul className="mt-5 space-y-3">
                {relatedProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="font-display text-[1.45rem] text-teal-900 hover:text-teal-700 hover:underline"
                    >
                      {project.title}
                    </Link>
                    <span className="ml-2 text-[1rem] text-teal-900/65">
                      {project.technologies.join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-12">
            <Link
              href="/#contact"
              className="sketch-cta font-display text-[1.65rem] leading-none"
            >
              Hire for {meta.label.toLowerCase()} work →
            </Link>
          </p>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
