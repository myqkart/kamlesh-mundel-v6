import { siteConfig } from "@/lib/site";

type ShareLinksProps = {
  path?: string;
};

/** Visible social sharing destinations — unique labels, sketch-native. */
export function ShareLinks({ path = "/" }: ShareLinksProps) {
  const url =
    !path || path === "/"
      ? siteConfig.url
      : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(siteConfig.title);

  const links = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
  ] as const;

  return (
    <nav aria-label="Share this page">
      <p className="font-sketch text-[1.35rem] text-teal-700">Share</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[1.02rem] text-teal-900/85">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-700 hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
