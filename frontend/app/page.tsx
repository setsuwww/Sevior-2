import { Navbar } from "@/_components/landing/Navbar";
import { Hero } from "@/_components/landing/Hero";
import { About } from "@/_components/landing/About";
import { Services } from "@/_components/landing/Services";
import { Pricing } from "@/_components/landing/Pricing";
import { Testimonials } from "@/_components/landing/Testimonials";
import { Contact } from "@/_components/landing/Contact";
import { Footer } from "@/_components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-teal-500/30">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
