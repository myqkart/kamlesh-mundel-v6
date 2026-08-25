import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import { impactStories } from "@/data/impact";
import { projects } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} — ${project.type}`;
  const description = project.description;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.type,
      ...project.technologies,
      "Kamlesh Mundel",
      "case study",
      project.category,
    ],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${title} · ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/work/${project.slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const impact = impactStories.find((story) => story.projectSlug === slug);
  const related = projects.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <>
      <ProjectJsonLd
        slug={project.slug}
        title={project.title}
        description={project.description}
        technologies={project.technologies}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/#work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]}
      />

      <main className="sketch-sheet">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <article className="relative px-[max(1.85rem,6.5vw)] pt-[max(3rem,8vh)] pb-[var(--section-pad-y)] md:px-[7vw]">
          <p className="font-sketch text-[1.35rem] text-teal-700">
            <Link href="/" className="hover:underline">
              ← {siteConfig.name}
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/#work" className="hover:underline">
              Work
            </Link>
          </p>

          <p className="mt-8 font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]">
            {project.category} · {project.type}
          </p>

          <h1 className="mt-3 max-w-[16ch] -rotate-1 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] text-teal-900">
            {project.title}
          </h1>

          <p className="mt-4 max-w-[40rem] text-[1.15rem] leading-snug text-teal-900/80 md:text-[1.25rem]">
            {project.description}
          </p>

          <p className="mt-5 max-w-[36rem] font-sketch text-[1.55rem] leading-snug text-teal-700 md:text-[1.7rem]">
            {project.emphasis}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="font-sketch text-[1.3rem] text-teal-700">Role</dt>
              <dd className="mt-1 font-display text-[1.45rem] text-teal-900">
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="font-sketch text-[1.3rem] text-teal-700">Type</dt>
              <dd className="mt-1 font-display text-[1.45rem] text-teal-900">
                {project.type}
              </dd>
            </div>
            <div>
              <dt className="font-sketch text-[1.3rem] text-teal-700">Stack</dt>
              <dd className="mt-1 font-display text-[1.35rem] leading-snug text-teal-900">
                {project.technologies.join(" · ")}
              </dd>
            </div>
          </dl>

          {impact ? (
            <section
              aria-labelledby="impact-heading"
              className="mt-14 max-w-[42rem]"
            >
              <h2
                id="impact-heading"
                className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-none text-teal-900"
              >
                Problem → engineering → outcome
              </h2>
              <p className="mt-3 font-sketch text-[1.4rem] text-teal-700">
                {impact.transformation}
              </p>
              <div className="mt-8 space-y-6 text-[1.08rem] leading-snug text-teal-900/80 md:text-[1.12rem]">
                <div>
                  <h3 className="font-display text-[1.45rem] text-teal-900">
                    Challenge
                  </h3>
                  <p className="mt-2">{impact.challenge}</p>
                </div>
                <div>
                  <h3 className="font-display text-[1.45rem] text-teal-900">
                    Intervention
                  </h3>
                  <p className="mt-2">{impact.intervention}</p>
                </div>
                <div>
                  <h3 className="font-display text-[1.45rem] text-teal-900">
                    Outcome
                  </h3>
                  <p className="mt-2">{impact.outcome}</p>
                </div>
              </div>
            </section>
          ) : (
            <section className="mt-14 max-w-[42rem]">
              <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-none text-teal-900">
                What was built
              </h2>
              <p className="mt-4 text-[1.08rem] leading-snug text-teal-900/80 md:text-[1.12rem]">
                {project.description} Delivered as {project.role.toLowerCase()}{" "}
                work with a focus on reliable product engineering using{" "}
                {project.technologies.join(", ")}.
              </p>
            </section>
          )}

          <p className="mt-12">
            <Link
              href="/#contact"
              className="sketch-cta font-display text-[1.65rem] leading-none md:text-[1.85rem]"
            >
              Discuss a similar build →
            </Link>
          </p>

          <section aria-labelledby="related-heading" className="mt-16">
            <h2
              id="related-heading"
              className="font-sketch text-[1.6rem] text-teal-700"
            >
              More work
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="font-display text-[1.45rem] text-teal-900 hover:text-teal-700 hover:underline"
                  >
                    {item.title}
                    <span className="ml-2 font-sketch text-[1.2rem] text-teal-700">
                      {item.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
