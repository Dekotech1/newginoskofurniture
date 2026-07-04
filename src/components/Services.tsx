/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sofa, LayoutGrid, Home, Building, Layers, Briefcase, CheckCircle2 } from "lucide-react";
import { servicesData } from "../data";

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Sofa,
  LayoutGrid,
  Home,
  Building,
  Layers,
  Briefcase
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Furniture" | "Construction" | "Design">("All");

  const categories = [
    { id: "All", label: "All Disciplines" },
    { id: "Furniture", label: "Furniture Atelier" },
    { id: "Construction", label: "Turnkey Construction" },
    { id: "Design", label: "Design & Supervision" }
  ];

  const filteredServices = servicesData.filter(
    (srv) => activeCategory === "All" || srv.category === activeCategory
  );

  return (
    <section id="services" className="py-24 bg-ginosko-dark text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-ginosko-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-ginosko-wood/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="services-header" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
              OUR CAPABILITIES
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter leading-none">
              Integrated <span className="text-outline">Architectural</span> Services.
            </h2>
          </div>
          <div className="w-12 h-[2px] bg-ginosko-gold md:hidden" />
        </div>

        {/* Categories Tab Navigation */}
        <div id="services-tabs" className="flex flex-wrap gap-2 border-b border-white/10 pb-6 mb-16">
          {categories.map((cat) => (
            <button
              id={`service-tab-${cat.id}`}
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-3 font-sans text-[10px] tracking-widest uppercase font-bold rounded-none transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-ginosko-gold text-black shadow-lg gold-glow font-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid with AnimatePresence */}
        <motion.div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const IconComponent = iconMap[service.iconName] || Sofa;
              return (
                <motion.div
                  id={`service-card-${service.id}`}
                  key={service.id}
                  className="bg-[#161616] p-10 rounded-none border border-white/5 hover:border-ginosko-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group h-full relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  layout
                >
                  {/* Subtle geometric wood-ring background overlay on hover */}
                  <div className="absolute -right-16 -bottom-16 w-40 h-40 border border-white/2 rounded-full pointer-events-none group-hover:scale-110 group-hover:border-ginosko-gold/5 transition-transform duration-700" />
                  
                  <div>
                    {/* Icon Container */}
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-none flex items-center justify-center mb-8 group-hover:bg-ginosko-gold/10 group-hover:border-ginosko-gold/40 transition-colors duration-500">
                      <IconComponent className="w-6 h-6 text-ginosko-gold" />
                    </div>

                    {/* Service Title */}
                    <h3 className="font-sans text-lg text-white font-bold uppercase tracking-wider mb-4 group-hover:text-ginosko-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-8">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-3.5 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-ginosko-gold shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-white/80 leading-relaxed font-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner architectural coordinates accent */}
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
                      GINOSKO • {service.category.toUpperCase()}
                    </span>
                    <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-ginosko-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      Inquire →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Mini Quote CTA Banner inside Services */}
        <motion.div
          id="services-cta"
          className="mt-20 p-8 md:p-12 wood-grain border border-white/10 rounded-none flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left">
            <h4 className="font-sans text-lg md:text-xl text-white font-bold uppercase tracking-wider mb-2">
              Require highly specific woodwork specifications or complex civil engineering?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light">
              Our principal team is equipped to review architectural DWGs, tender specs, and custom furniture designs.
            </p>
          </div>
          <a
            href="#contact"
            className="px-8 py-4 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-all duration-300 shrink-0 text-center w-full md:w-auto gold-glow"
          >
            Submit Tender Documents
          </a>
        </motion.div>

      </div>
    </section>
  );
}
