import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { CaseStudies } from "@/components/CaseStudies";
import { CTA } from "@/components/CTA";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

import { getSystemStats } from "@/app/actions/stats";
import { getAboutInfo } from "@/app/actions/about";
import { getServices } from "@/app/actions/services";

export default async function Home() {
  const stats = await getSystemStats();
  const aboutData = await getAboutInfo();
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />
      <main>
        <Hero />
        <Services services={services} />
        <Projects />
        <CaseStudies />
        <Stats stats={stats} />
        <About data={aboutData} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
