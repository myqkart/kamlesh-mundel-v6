import { contactInfo } from "@/data/contact";
import { projects } from "@/data/projects";
import { siteFaqs } from "@/data/seo";
import { expertiseTechnologies } from "@/data/technical-expertise";
import { absoluteUrl, siteConfig } from "@/lib/site";

function jsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function HomeJsonLd() {
  const personId = absoluteUrl("/#person");
  const websiteId = absoluteUrl("/#website");

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: [...siteConfig.sameAs],
    knowsAbout: expertiseTechnologies.map((t) => t.name),
    worksFor: {
      "@type": "Organization",
      name: "Saasjoy Solutions",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    url: absoluteUrl("/"),
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    about: { "@id": personId },
  };

  const itemList = {
    "@type": "ItemList",
    name: "Selected work by Kamlesh Mundel",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.slug}`),
      description: project.description,
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: siteFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const professionalService = {
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Full Stack Development`,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    description: siteConfig.description,
    telephone: contactInfo.phoneHref.replace("tel:", ""),
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    areaServed: ["IN", "Worldwide"],
    priceRange: "$$",
    founder: { "@id": personId },
  };

  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, itemList, faqPage, professionalService],
  });
}

export function ProjectJsonLd({
  slug,
  title,
  description,
  technologies,
}: {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
}) {
  const url = absoluteUrl(`/work/${slug}`);

  return jsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    keywords: technologies.join(", "),
    inLanguage: siteConfig.language,
  });
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}
