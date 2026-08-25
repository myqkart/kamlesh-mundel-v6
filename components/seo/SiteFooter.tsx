import Link from "next/link";
import { projects } from "@/data/projects";
import { expertiseCategories } from "@/data/technical-expertise";
import { contactInfo } from "@/data/contact";
import { siteConfig } from "@/lib/site";

/** Server-rendered crawl paths + contact signals (footer). */
export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative border-t border-teal-900/15 px-[max(1.85rem,6.5vw)] py-12 md:px-[7vw] md:py-14"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="font-display text-[1.85rem] leading-none text-teal-900">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-[22rem] text-[1rem] leading-snug text-teal-900/70">
            {siteConfig.jobTitle} · {siteConfig.location.city},{" "}
            {siteConfig.location.country}
          </p>
          <p className="mt-4 font-sketch text-[1.35rem] text-teal-700">
            <a href={`mailto:${contactInfo.email}`} className="hover:underline">
              {contactInfo.emailLabel}
            </a>
          </p>
        </div>

        <nav
          aria-label="Site sections"
          className="md:col-span-3"
        >
          <p className="font-sketch text-[1.35rem] text-teal-700">On this site</p>
          <ul className="mt-3 space-y-2 text-[1.02rem] text-teal-900/85">
            {[
              ["About", "/#about"],
              ["Work", "/#work"],
              ["Experience", "/#experience"],
              ["Expertise", "/expertise"],
              ["Impact", "/#impact"],
              ["FAQ", "/#faq"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-teal-700 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Selected projects" className="md:col-span-3">
          <p className="font-sketch text-[1.35rem] text-teal-700">Projects</p>
          <ul className="mt-3 space-y-2 text-[1.02rem] text-teal-900/85">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-teal-700 hover:underline"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Expertise areas" className="md:col-span-2">
          <p className="font-sketch text-[1.35rem] text-teal-700">Expertise</p>
          <ul className="mt-3 space-y-2 text-[1.02rem] text-teal-900/85">
            {expertiseCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/expertise/${category.id}`}
                  className="hover:text-teal-700 hover:underline"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-10 text-[0.95rem] text-teal-900/55">
        © {new Date().getFullYear()} {siteConfig.name}. Built for clarity in
        search, AI answers, and humans.
      </p>
    </footer>
  );
}
