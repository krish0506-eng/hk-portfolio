"use client";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Hero from "@/components/Hero";
import BrandValues from "@/components/BrandValues";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThreeBackdrop from "@/components/ThreeBackdrop";
import ScrollDepthEngine from "@/components/ScrollDepthEngine";
import AIChatAgent from "@/components/AIChatAgent";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <CustomCursor />
      <ThreeBackdrop />
      <ScrollDepthEngine />
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <BrandValues />
      <WhyWorkWithMe />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <Testimonials />
      <Contact />
      <Footer />
      <AIChatAgent />
    </main>
  );
}
