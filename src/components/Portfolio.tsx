/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Ruler, Compass, Plus, ArrowRight } from "lucide-react";
import { Project } from "../types";
import { projectsData } from "../data";
import { useCMS } from "../context/CMSContext";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Furniture" | "Residential" | "Commercial" | "Interior Design">("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { cmsData } = useCMS();

  const projectsList = (cmsData?.projects && cmsData.projects.length > 0) ? cmsData.projects : projectsData;

  const filterCategories = [
    { id: "All", label: "All Works" },
    { id: "Furniture", label: "Bespoke Furniture" },
    { id: "Residential", label: "Residential Construction" },
    { id: "Commercial", label: "Commercial Buildings" },
    { id: "Interior Design", label: "Luxury Interiors" }
  ];

  const filteredProjects = projectsList.filter(
    (proj) => selectedCategory === "All" || proj.category === selectedCategory
  );

  return (
    <section id="portfolio" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="portfolio-header" className="mb-16 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            COMPLETED MONUMENTS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            A Testament to Spatial <span className="text-outline">Precision.</span>
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Dynamic Category Filtering Row */}
        <div id="portfolio-filters" className="flex flex-wrap gap-2 pb-8 border-b border-white/10 mb-16">
          {filterCategories.map((cat) => (
            <button
              id={`portfolio-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 font-sans text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer rounded-none border ${
                selectedCategory === cat.id
                  ? "bg-ginosko-gold text-black border-ginosko-gold font-black gold-glow"
                  : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Project Grid */}
        <motion.div
          id="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Custom layout height variations to simulate a stunning architectural masonry rhythm
              const isTall = idx % 3 === 0;
              return (
                <motion.div
                  id={`project-card-${project.id}`}
                  key={project.id}
                  className={`bg-[#161616] rounded-none border border-white/5 shadow-md hover:border-ginosko-gold/30 hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col justify-between cursor-pointer ${
                    isTall ? "md:row-span-2" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  onClick={() => setActiveProject(project)}
                  layout
                >
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[240px] max-h-[420px]">
                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay Layer */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-8" />
                    
                    {/* Absolute Elements shown only on hover */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold mb-2 block">
                          {project.category.toUpperCase()}
                        </span>
                        <h3 className="font-sans text-xl text-white font-black uppercase tracking-tight mb-3">
                          {project.name}
                        </h3>
                        <div className="flex items-center text-white/70 text-xs font-light gap-1.5 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-ginosko-gold" />
                          {project.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-ginosko-gold text-xs tracking-widest uppercase font-bold">
                        View Blueprint Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Simple badge shown when not hovered (mobile friendly) */}
                    <div className="absolute bottom-4 left-4 z-10 bg-[#161616]/95 px-3 py-1.5 rounded-none border border-white/10 shadow-md pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                      <span className="font-sans text-[9px] tracking-widest text-ginosko-gold uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Clean info header when not hovered */}
                  <div className="p-6 bg-[#161616] border-t border-white/5 group-hover:bg-[#1e1e1e] transition-colors duration-400">
                    <h4 className="font-sans text-lg text-white group-hover:text-ginosko-gold font-bold uppercase tracking-wider mb-1 transition-colors">
                      {project.name}
                    </h4>
                    <p className="font-sans text-xs text-gray-400 group-hover:text-white/60 font-light transition-colors line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Elegant Blueprint Lightbox / Details Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              id="portfolio-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                id="portfolio-modal-content"
                className="bg-[#161616] max-w-5xl w-full rounded-none overflow-hidden shadow-2xl border border-white/10 relative my-8"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  id="modal-close-btn"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 z-20 p-2.5 bg-black/90 hover:bg-ginosko-gold text-white hover:text-black rounded-none transition-colors border border-white/10 shadow-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column: Huge Image */}
                  <div className="lg:col-span-7 relative h-[320px] lg:h-[620px] bg-ginosko-charcoal">
                    <img
                      src={activeProject.image}
                      alt={activeProject.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Coordinates styling on image corner */}
                    <div className="absolute left-6 bottom-6 bg-black/85 px-4 py-2 border border-white/10 rounded-none">
                      <span className="font-mono text-[9px] tracking-widest text-ginosko-gold font-bold uppercase">
                        GINOSKO BLUEPRINT SPECIFICATION
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Specifications Detail */}
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[#111111] text-white h-full min-h-[420px] lg:min-h-[620px] wood-grain">
                    <div>
                      {/* Project Category Tag */}
                      <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
                        {activeProject.category}
                      </span>
                      
                      {/* Project Title */}
                      <h3 className="font-sans text-3xl sm:text-4xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
                        {activeProject.name}
                      </h3>

                      {/* Technical specifications table */}
                      <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6 mb-8 text-xs font-sans">
                        <div className="flex items-center gap-2.5 text-gray-300">
                          <MapPin className="w-4 h-4 text-ginosko-gold shrink-0" />
                          <div>
                            <span className="block font-bold text-white uppercase text-[9px] tracking-widest mb-0.5">LOCATION</span>
                            {activeProject.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-300">
                          <Calendar className="w-4 h-4 text-ginosko-gold shrink-0" />
                          <div>
                            <span className="block font-bold text-white uppercase text-[9px] tracking-widest mb-0.5">YEAR COMPLETED</span>
                            {activeProject.year}
                          </div>
                        </div>
                        {activeProject.size && (
                          <div className="flex items-center gap-2.5 text-gray-300">
                            <Ruler className="w-4 h-4 text-ginosko-gold shrink-0" />
                            <div>
                              <span className="block font-bold text-white uppercase text-[9px] tracking-widest mb-0.5">AREA / DIMENSIONS</span>
                              {activeProject.size}
                            </div>
                          </div>
                        )}
                        {activeProject.architect && (
                          <div className="flex items-center gap-2.5 text-gray-300">
                            <Compass className="w-4 h-4 text-ginosko-gold shrink-0" />
                            <div>
                              <span className="block font-bold text-white uppercase text-[9px] tracking-widest mb-0.5">PRINCIPAL DESIGNER</span>
                              {activeProject.architect}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Deep Description */}
                      <div className="space-y-4 font-sans text-sm text-gray-400 leading-relaxed font-light mb-8">
                        <p className="font-normal text-white text-base">
                          {activeProject.description}
                        </p>
                        <p>
                          {activeProject.details}
                        </p>
                      </div>
                    </div>

                    {/* Modal Footer CTA */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-gray-500 tracking-widest">
                        ESTIMATE CO-DESIGN
                      </span>
                      <a
                        href="#contact"
                        onClick={() => setActiveProject(null)}
                        className="flex items-center gap-2 text-ginosko-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                      >
                        Inquire About This Service →
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
