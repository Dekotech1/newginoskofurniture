/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import QuoteAdvisor from "./components/QuoteAdvisor";
import Footer from "./components/Footer";

export default function App() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "portfolio", "process", "testimonials", "blog", "careers", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleExploreProjects = () => {
    handleNavigate("portfolio");
  };

  return (
    <div className="bg-ginosko-dark text-white font-sans selection:bg-ginosko-gold selection:text-ginosko-dark min-h-screen">
      
      {/* Dynamic Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        openAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Hero Welcome banner */}
      <Hero
        onExploreProjects={handleExploreProjects}
        onRequestQuote={() => setIsAdvisorOpen(true)}
      />

      {/* About segment */}
      <About />

      {/* Capability list */}
      <Services />

      {/* Blueprints / Portfolio gallery */}
      <Portfolio />

      {/* Execution protocol timeline */}
      <Process />

      {/* Numeric Milestones */}
      <Stats />

      {/* Client Endorsements */}
      <Testimonials />

      {/* Material Curation Grid */}
      <Gallery />

      {/* Insights Blog */}
      <Blog />

      {/* Career Academies */}
      <Careers />

      {/* Intake Contact Desk */}
      <Contact />

      {/* Corporate footer */}
      <Footer />

      {/* SIGNATURE FEATURE: Gemini-Powered Bespoke Space Planner Modal */}
      <QuoteAdvisor isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />

    </div>
  );
}
