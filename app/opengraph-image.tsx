import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(160deg, #0D5C63 0%, #247B7B 45%, #44A1A0 75%, #78CDD7 100%)",
          padding: "64px 72px",
          color: "#FFFFFA",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {siteConfig.jobTitle}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, lineHeight: 0.95, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              maxWidth: 820,
              lineHeight: 1.25,
              opacity: 0.95,
            }}
          >
            React · Next.js · Node.js · TypeScript · Python · Frappe · AWS · AI
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, opacity: 0.85 }}>
          {siteConfig.location.city}, {siteConfig.location.country}
        </div>
      </div>
    ),
    { ...size },
  );
}
