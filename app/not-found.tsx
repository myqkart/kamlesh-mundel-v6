import type { Metadata } from "next";
import Link from "next/link";
import { MissingSheetFigure } from "@/components/not-found/MissingSheetFigure";
import { NotebookAtlas } from "@/components/not-found/NotebookAtlas";
import { SheetDivider } from "@/components/sketch/SheetDivider";
import { NotFoundJsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/seo/SiteFooter";
import {
  notFoundDescription,
  notFoundSeoParagraph,
  notFoundTitle,
} from "@/data/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: notFoundTitle,
  description: notFoundDescription,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: null,
  },
  openGraph: {
    title: `${notFoundTitle} · ${siteConfig.name}`,
    description: notFoundDescription,
    url: absoluteUrl("/"),
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${notFoundTitle} · ${siteConfig.name}`,
    description: notFoundDescription,
    images: ["/og.png"],
  },
};

function CtaArrow() {
  return (
    <svg
      aria-hidden="true"
      className="cta-arrow mt-1 size-5 shrink-0 md:size-6"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        d="M2 9.2c6.2-.8 11.4-.4 16.8.3M14.2 3.2c2.6 1.4 4.4 3.6 5.6 6.2-1.6 1.6-3.7 2.8-6.2 3.4"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CtaUnderline({ delay }: { delay: string }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-1 h-3 w-full overflow-visible text-teal-700"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 160 12"
    >
      <path
        className="cta-line"
        d="M1 8.2c18-3.4 36 2.2 54-1.1 22-4 38 3.2 62 .4 14-1.8 28 1.4 42 1"
        pathLength={1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      <NotFoundJsonLd />

      <main className="sketch-sheet missing-sheet">
        <div aria-hidden="true" className="sketch-grain" />
        <div aria-hidden="true" className="sketch-margin" />

        <p className="sr-only">{notFoundSeoParagraph}</p>

        <article className="relative px-[max(1.85rem,6.5vw)] pt-[max(2.75rem,7vh)] pb-[var(--section-pad-y)] md:px-[7vw]">
          <p className="hero-reveal font-sketch text-[1.35rem] text-teal-700">
            <Link href="/" className="hover:underline">
              ← {siteConfig.name}
            </Link>
            <span aria-hidden="true"> · </span>
            <span>missing sheet</span>
          </p>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-4 lg:mt-8">
            <header className="max-w-[36rem] lg:col-span-5">
              <p
                className="hero-reveal font-sketch -rotate-2 text-[1.75rem] leading-none text-teal-700 md:text-[1.95rem]"
                style={{ animationDelay: "80ms" }}
              >
                404 · not in the archive
              </p>
              <h1
                className="hero-reveal mt-3 max-w-[12ch] -rotate-1 font-display text-[clamp(2.85rem,8vw,5.1rem)] leading-[0.9] text-teal-900"
                style={{ animationDelay: "180ms" }}
              >
                This sheet was never drawn.
              </h1>
              <p
                className="hero-reveal mt-4 max-w-[28rem] text-[1.12rem] leading-snug text-teal-900/75 md:text-[1.2rem]"
                style={{ animationDelay: "380ms" }}
              >
                This URL was never inked. The notebook still is — products,
                stack, and a way back in.
              </p>

              <div
                className="hero-reveal mt-7 flex flex-wrap items-end gap-x-9 gap-y-4"
                style={{ animationDelay: "560ms" }}
              >
                <Link
                  href="/"
                  className="sketch-cta font-display text-[1.55rem] leading-none md:text-[1.85rem]"
                >
                  <span className="relative pb-1">
                    Back to the first page
                    <CtaUnderline delay="850ms" />
                  </span>
                  <CtaArrow />
                </Link>
                <Link
                  href="/#contact"
                  className="sketch-cta font-display text-[1.55rem] leading-none text-teal-700 md:text-[1.85rem]"
                >
                  <span className="relative pb-1">
                    Start a conversation
                    <CtaUnderline delay="980ms" />
                  </span>
                  <CtaArrow />
                </Link>
              </div>
            </header>

            <div className="lg:col-span-7 lg:pt-1">
              <MissingSheetFigure />
            </div>
          </div>

          <SheetDivider />
          <NotebookAtlas />
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
