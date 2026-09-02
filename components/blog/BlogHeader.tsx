import Link from "next/link";
import { siteConfig } from "@/lib/site";

interface BlogHeaderProps {
  total: number;
  categoryCount: number;
  tagCount: number;
}

export function BlogHeader({ total, categoryCount, tagCount }: BlogHeaderProps) {
  return (
    <header className="blog-header grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 lg:col-span-7">
        <p className="font-sketch text-[1.35rem] text-teal-700">
          <Link href="/" className="hover:underline">
            ← {siteConfig.name}
          </Link>
        </p>

        <p className="mt-6 font-sketch text-[1.5rem] text-teal-700 md:text-[1.65rem]">
          Engineering blog
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.92] text-teal-900">
          Technical writing
        </h1>
        <p className="mt-4 max-w-[38rem] text-[1.1rem] leading-snug text-teal-900/75 md:text-[1.15rem]">
          Notes on React, Frappe, AWS, and the workflows that keep small teams
          shipping — from the same engineer behind the portfolio.
        </p>
      </div>

      <aside className="lg:col-span-5 lg:justify-self-stretch">
        <div className="blog-header-stats">
          <p className="font-sketch text-[1.25rem] text-teal-700">at a glance</p>
          <p className="mt-2 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-teal-900">
            {String(total).padStart(2, "0")}
            <span className="ml-2 font-sketch text-[1.25rem] text-teal-700">
              articles
            </span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-teal-900/10 pt-5">
            <div>
              <dt className="font-sketch text-[1rem] text-teal-700/70">categories</dt>
              <dd className="font-display text-[1.4rem] text-teal-900">{categoryCount}</dd>
            </div>
            <div>
              <dt className="font-sketch text-[1rem] text-teal-700/70">tags</dt>
              <dd className="font-display text-[1.4rem] text-teal-900">{tagCount}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </header>
  );
}
