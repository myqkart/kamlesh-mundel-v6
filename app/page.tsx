import { About } from "@/components/sections/about";
import { AllWork } from "@/components/sections/all-work";
import { Contact } from "@/components/sections/contact";
import { Credibility } from "@/components/sections/credibility";
import { EngineeringApproach } from "@/components/sections/engineering-approach";
import { Experience } from "@/components/sections/experience";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { TechnicalExpertise } from "@/components/sections/technical-expertise";

export default function Home() {
  return (
    <main>
      <Hero />
      <Credibility />
      <About />
      <FeaturedWork />
      <AllWork />
      <EngineeringApproach />
      <Experience />
      <TechnicalExpertise />
      <Impact />
      <Contact />
    </main>
  );
}
