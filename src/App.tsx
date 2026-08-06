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
import VideoShowcase from "./components/VideoShowcase";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import QuoteAdvisor from "./components/QuoteAdvisor";
import Footer from "./components/Footer";
import AdminPanel from "./components/admin/AdminPanel";
import { useCMS } from "./context/CMSContext";
import { ShieldCheck } from "lucide-react";

export default function App() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isAdminOpen, setIsAdminOpen, user } = useCMS();


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "portfolio", "videoshowcase", "process", "testimonials", "blog", "careers", "contact"];
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

      {/* Cinematic Workshop Documentary / Video Showcase */}
      <VideoShowcase />

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

      {/* ENTERPRISE CMS: Admin Dashboard Modal Overlay */}
      {isAdminOpen && <AdminPanel />}

      {/* Floating CMS Portal Access Trigger */}
      <button
        id="floating-cms-trigger"
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-2.5 bg-stone-900/95 hover:bg-stone-800 border border-ginosko-gold/40 hover:border-ginosko-gold text-ginosko-gold text-xs font-mono font-medium rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 group transition-all duration-300 hover:scale-105 cursor-pointer"
        title="Open Ginosko Enterprise CMS Control Panel"
      >
        <ShieldCheck className="w-4 h-4 text-ginosko-gold group-hover:rotate-12 transition-transform" />
        <span className="font-sans text-[11px] font-bold tracking-wider uppercase">
          {user ? `CMS: ${user.name}` : "CMS Admin"}
        </span>
      </button>

    </div>
  );
}
