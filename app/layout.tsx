import type { Metadata } from "next";
import { Caveat, Kalam, Reenie_Beanie } from "next/font/google";
import { SplashScreen } from "@/components/splash/SplashScreen";
import "./globals.css";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const reenie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie",
});

export const metadata: Metadata = {
  title: "Kamlesh Mundel — Sr. Full Stack Developer",
  description:
    "Kamlesh Mundel is a Sr. Full Stack Developer based in Ahmedabad — building production web products with React, Next.js, Node.js, TypeScript, Python, Frappe, and AI integrations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${kalam.variable} ${caveat.variable} ${reenie.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-teal-900">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
