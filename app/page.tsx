import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";
import CardSpotlight from "@/components/CardSpotlight";
import BackgroundSceneLoader from "@/components/BackgroundSceneLoader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function Home() {
  return (
    <>
      <Preloader />
      <BackgroundSceneLoader />
      <ScrollProgress />
      <CursorFollower />
      <CardSpotlight />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <About />
        <Services />
        <MarqueeStrip />
        <Pricing />
        <Projects />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
