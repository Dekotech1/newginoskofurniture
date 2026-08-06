/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Hammer, ShieldCheck } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  openAdvisor: () => void;
}

export default function Header({ activeSection, onNavigate, openAdvisor }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsAdminOpen, user } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "blog", label: "Blog" },
    { id: "careers", label: "Careers" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        id="ginosko-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-ginosko-dark/95 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("hero")}
            className="flex items-center space-x-3 group cursor-pointer text-left"
          >
            <div className="relative w-10 h-10 bg-ginosko-amber/10 border border-ginosko-amber/30 rounded-lg flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <Hammer className="w-5 h-5 text-ginosko-gold group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ginosko-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-2xl font-black tracking-tighter text-ginosko-gold block leading-none">
                GINOSKO
              </span>
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/60 font-medium uppercase block mt-1">
                Furniture & Construction
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer py-2"
                  style={{ color: isActive ? "#D4AF37" : "rgba(255, 255, 255, 0.7)" }}
                >
                  <span className="hover:text-white transition-colors">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-ginosko-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Actions */}
          <div id="nav-actions" className="hidden lg:flex items-center space-x-5">
            <a
              id="nav-phone-link"
              href="tel:+234800GINOSKO"
              className="flex items-center space-x-2 text-xs tracking-widest text-white/80 hover:text-ginosko-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-ginosko-gold animate-pulse" />
              <span className="font-mono">+234 (0) 803 123 4567</span>
            </a>
            <button
              id="nav-advisor-btn"
              onClick={openAdvisor}
              className="px-4 py-2.5 bg-ginosko-gold hover:bg-ginosko-amber text-ginosko-dark font-sans text-xs tracking-widest font-semibold uppercase rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-ginosko-gold/20"
            >
              AI Space Planner
            </button>
            <button
              id="nav-cms-btn"
              onClick={() => setIsAdminOpen(true)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-ginosko-gold/40 text-ginosko-gold hover:text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:border-ginosko-gold"
              title="Open Enterprise CMS Management Portal"
            >
              <ShieldCheck className="w-4 h-4 text-ginosko-gold" />
              <span>{user ? "CMS Admin" : "CMS Portal"}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            className="fixed inset-0 z-40 bg-ginosko-dark flex flex-col justify-between pt-24 pb-12 px-8 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    id={`mobile-nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left text-2xl font-serif tracking-wider font-semibold focus:outline-none"
                    style={{ color: isActive ? "#D4AF37" : "rgba(255, 255, 255, 0.8)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              id="mobile-menu-footer"
              className="border-t border-white/5 pt-8 flex flex-col space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                id="mobile-nav-advisor-btn"
                onClick={() => {
                  openAdvisor();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 bg-ginosko-gold text-ginosko-dark font-sans text-xs tracking-widest font-semibold uppercase rounded-sm text-center shadow-md"
              >
                Launch AI Space Planner
              </button>
              <button
                id="mobile-nav-cms-btn"
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-white/5 border border-ginosko-gold/40 text-ginosko-gold font-sans text-xs tracking-widest font-semibold uppercase rounded-sm text-center shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-ginosko-gold" />
                <span>{user ? "Open CMS Dashboard" : "CMS Admin Portal"}</span>
              </button>
              <div className="flex justify-between items-center text-[10px] tracking-widest text-white/50 font-mono">
                <span>LAGOS, NIGERIA</span>
                <a href="tel:+2348031234567" className="text-ginosko-gold">
                  +234 803 123 4567
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
