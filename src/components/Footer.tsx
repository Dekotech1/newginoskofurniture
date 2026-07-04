/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowUp, Instagram, Linkedin, Youtube, ArrowRight, Compass, ShieldCheck, Mail } from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-ginosko-dark text-white border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute left-[10%] bottom-0 w-[400px] h-[400px] bg-ginosko-gold/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand & Introduction (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div>
              <span className="font-sans text-2xl font-black tracking-tighter text-ginosko-gold select-none block">
                GINOSKO
              </span>
              <span className="block font-sans text-[8px] tracking-[0.4em] text-white/60 font-medium uppercase mt-1">
                FURNITURE & CONSTRUCTION
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light max-w-sm">
              We create exceptional bespoke furniture and deliver luxurious turnkey construction monuments. By combining architectural precision with deep material integrity, we shape the spaces that inspire generations.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#161616] hover:bg-ginosko-gold text-white hover:text-black border border-white/10 rounded-none transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#161616] hover:bg-ginosko-gold text-white hover:text-black border border-white/10 rounded-none transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#161616] hover:bg-ginosko-gold text-white hover:text-black border border-white/10 rounded-none transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Architectural Divisions (3 cols) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold">
              DIVISIONS
            </h4>
            <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-white/60 font-light">
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Bespoke Woodwork Atelier</a></li>
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Luxury Custom Furniture</a></li>
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Turnkey Residential Civil Build</a></li>
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Corporate Interior Fit-Outs</a></li>
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Project Supervision Council</a></li>
            </ul>
          </div>

          {/* Column 3: Navigation Quick links (2 cols) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <h4 className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold">
              SITEMAP
            </h4>
            <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-white/60 font-light">
              <li><a href="#about" className="hover:text-ginosko-gold transition-colors">Story & Leadership</a></li>
              <li><a href="#services" className="hover:text-ginosko-gold transition-colors">Capabilities</a></li>
              <li><a href="#portfolio" className="hover:text-ginosko-gold transition-colors">Blueprints & Projects</a></li>
              <li><a href="#process" className="hover:text-ginosko-gold transition-colors">Execution Process</a></li>
              <li><a href="#careers" className="hover:text-ginosko-gold transition-colors">Artisan Careers</a></li>
              <li><a href="#contact" className="hover:text-ginosko-gold transition-colors">Inquire</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold">
              NEWSLETTER
            </h4>
            <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
              Subscribe to receive curated woodwork publications, structural guides, and new collection launches.
            </p>
            {subscribed ? (
              <p className="font-sans text-xs text-ginosko-gold font-bold uppercase tracking-wider">
                ✓ SUBSRIPTION RECORDED
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex items-center bg-black/40 border border-white/10 rounded-none overflow-hidden p-1.5 focus-within:border-ginosko-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-white/40 ml-2 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none px-2 py-1.5 font-sans"
                />
                <button
                  type="submit"
                  className="p-2 bg-ginosko-gold hover:bg-ginosko-amber text-black rounded-none transition-colors cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-wider text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Ginosko Furniture & Construction Ltd. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Made with precision in Nigeria</span>
          </div>

          {/* Back to top scroll link */}
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="flex items-center gap-2.5 font-sans text-[10px] tracking-widest uppercase font-bold text-white/60 hover:text-ginosko-gold transition-all duration-300 group cursor-pointer"
          >
            Back To Top
            <div className="w-8 h-8 rounded-none border border-white/15 group-hover:border-ginosko-gold/50 flex items-center justify-center transition-all bg-white/5">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
