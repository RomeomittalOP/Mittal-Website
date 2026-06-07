import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import Team from "@/components/Team";
import MarqueeStrip from "@/components/MarqueeStrip";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Founder />
      <Services />
      <Team />
      <MarqueeStrip />
      <Pricing />
      <Projects />
      <Process />
      <FAQ />
      <FinalCTA />
      <Contact />
    </main>
  );
}
