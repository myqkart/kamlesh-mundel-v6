import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import { expertiseCategories, expertiseTechnologies } from "@/data/technical-expertise";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical expertise",
  description: `Full-stack technical expertise of ${siteConfig.name}: frontend, backend, data, APIs, infrastructure, and AI — including React, Next.js, Node.js, TypeScript, Python, Frappe, AWS, LangChain, and RAG.`,
  alternates: {
    canonical: "/expertise",
  },
  openGraph: {
    title: `Technical expertise · ${siteConfig.name}`,
    description: `Production stack across frontend, backend, data, APIs, infrastructure, and AI.`,
    url: absoluteUrl("/expertise"),
  },
};

export default function ExpertiseIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
        ]}
      />

      <main className="sketch-sheet">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <div className="relative px-[max(1.85rem,6.5vw)] pt-[max(3rem,8vh)] pb-[var(--section-pad-y)] md:px-[7vw]">
          <p className="font-sketch text-[1.35rem] text-teal-700">
            <Link href="/" className="hover:underline">
              ← {siteConfig.name}
            </Link>
          </p>

          <p className="mt-8 font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]">
            technical expertise
          </p>
          <h1 className="mt-3 max-w-[14ch] -rotate-1 font-display text-[clamp(3rem,8vw,5.2rem)] leading-[0.9] text-teal-900">
            The stack behind the products.
          </h1>
          <p className="mt-4 max-w-[38rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]">
            {siteConfig.name} builds across interfaces, APIs, data, cloud, and
            AI — with deep production experience in modern JavaScript/TypeScript
            and Python systems.
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseCategories.map((category) => {
              const techs = expertiseTechnologies.filter(
                (tech) => tech.category === category.id,
              );
              return (
                <li key={category.id}>
                  <Link
                    href={`/expertise/${category.id}`}
                    className="group block max-w-[22rem]"
                  >
                    <span className="font-sketch text-[1.35rem] text-teal-700">
                      {category.number}
                    </span>
                    <span className="mt-1 block font-display text-[2rem] leading-none text-teal-900 group-hover:text-teal-700 group-hover:underline">
                      {category.label}
                    </span>
                    <span className="mt-2 block text-[1.02rem] leading-snug text-teal-900/75">
                      {category.context}
                    </span>
                    <span className="mt-3 block font-sketch text-[1.25rem] text-teal-700/90">
                      {techs.map((t) => t.name).join(" · ")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <SiteFooter />
      </main>
    </>
  );
}
