/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Compass, HardHat, Sofa } from "lucide-react";
import { brandImages } from "../data";

interface HeroProps {
  onExploreProjects: () => void;
  onRequestQuote: () => void;
}

export default function Hero({ onExploreProjects, onRequestQuote }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-ginosko-dark flex items-center justify-center overflow-hidden"
    >
      {/* Background Cinematic Image - Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          id="hero-bg-zoom"
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${brandImages.hero})` }}
          initial={{ scale: 1.15, rotate: 0.5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        {/* Deep luxury linear overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ginosko-dark via-ginosko-dark/50 to-ginosko-dark/20 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Floating Design Grid Accents (Subtle, Premium) */}
      <div className="absolute inset-0 z-10 hidden md:grid grid-cols-4 pointer-events-none opacity-20">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="h-full" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 w-full flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl text-left">
          
          {/* Subtle Accent Badges */}
          <motion.div
            id="hero-badges"
            className="flex flex-col mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-ginosko-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Premium Craftsmanship Since 2014
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-widest uppercase rounded-full flex items-center gap-2">
                <Sofa className="w-3 h-3 text-ginosko-gold" />
                Bespoke Furniture
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-widest uppercase rounded-full flex items-center gap-2">
                <Compass className="w-3 h-3 text-ginosko-gold" />
                Luxury Interior
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-widest uppercase rounded-full flex items-center gap-2">
                <HardHat className="w-3 h-3 text-ginosko-gold" />
                Construction Excellence
              </span>
            </div>
          </motion.div>

          {/* Master Slogan Heading */}
          <motion.h1
            id="hero-headline"
            className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black leading-[0.9] uppercase tracking-tighter mb-8 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting <span className="text-outline">Timeless</span> <br />
            <span className="text-ginosko-cream">Spaces.</span>{" "}
            <span className="text-outline">Building</span> <span className="text-ginosko-gold">Futures.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            id="hero-subheading"
            className="font-sans text-sm sm:text-base md:text-lg text-white/70 tracking-wide max-w-2xl font-light leading-relaxed mb-12 border-l-2 border-ginosko-gold/60 pl-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ginosko Furniture & Construction is Nigeria's premier atelier delivering masterly crafted custom joinery, high-fidelity luxury interior finishing, and state-of-the-art turnkey civil engineering.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            id="hero-ctas"
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              id="hero-projects-btn"
              onClick={onExploreProjects}
              className="group px-8 py-4 bg-ginosko-gold text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-3 hover:bg-ginosko-amber gold-glow cursor-pointer"
            >
              Explore Projects
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              id="hero-quote-btn"
              onClick={onRequestQuote}
              className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Space Estimate
            </button>
          </motion.div>
        </div>
      </div>

      {/* Delicate floating background dimension detail */}
      <div className="absolute right-12 bottom-12 z-20 hidden xl:flex items-center space-x-6">
        <div className="flex flex-col text-right">
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">CURRENT STANDARD</span>
          <span className="font-mono text-xs text-ginosko-gold">LAGOS ATELIER v2026.07</span>
        </div>
        <div className="w-[1px] h-10 bg-white/20" />
        <div className="font-serif text-3xl italic text-stroke">Ginosko</div>
      </div>
    </section>
  );
}
