import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import Team from "@/components/Team";
import MarqueeStrip from "@/components/MarqueeStrip";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustLogos />
      <About />
      <Founder />
      <Services />
      <Team />
      <MarqueeStrip />
      <Pricing />
      <Projects />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
    </main>
  );
}
