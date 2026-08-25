import { About } from "@/components/sections/about";
import { AllWork } from "@/components/sections/all-work";
import { Credibility } from "@/components/sections/credibility";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Credibility />
      <About />
      <FeaturedWork />
      <AllWork />
      <div id="contact" />
    </main>
  );
}
