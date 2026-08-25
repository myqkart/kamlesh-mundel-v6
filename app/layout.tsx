import type { Metadata } from "next";
import { Caveat, Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Kamlesh Mundel — Senior Full Stack Developer",
  description:
    "Kamlesh Mundel is a Senior Full Stack Developer (SDE-2) who designs, engineers, and ships production-ready digital products across MERN, TypeScript, Next.js, and Python.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-teal-900">
        {children}
      </body>
    </html>
  );
}
