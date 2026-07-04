/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Image as ImageIcon } from "lucide-react";
import { galleryData } from "../data";

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-ginosko-dark text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-ginosko-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="gallery-header" className="mb-20 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
              VISUAL INSPIRATION
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter leading-none">
              The <span className="text-outline">Artisan</span> Curation.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed font-light text-left md:text-right">
            A visual documentation of wood-veneer structures, monolithic kitchen islands, and structural beams constructed across our active building locations.
          </p>
        </div>

        {/* Pinterest-style Masonry Bento Grid */}
        <div id="gallery-masonry" className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryData.map((item, idx) => (
            <motion.div
              id={`gallery-item-${item.id}`}
              key={item.id}
              className="break-inside-avoid bg-ginosko-charcoal border border-white/5 rounded-none overflow-hidden group relative cursor-zoom-in"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              onClick={() => setActiveImage(item.image)}
            >
              {/* Image element with lazy loading */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Minimal Dark Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ginosko-dark via-ginosko-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6 flex flex-col justify-end" />

              {/* Hover text block */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                <span className="font-mono text-[8px] tracking-widest text-ginosko-gold uppercase mb-1 font-bold">
                  {item.category}
                </span>
                <h4 className="font-sans text-sm text-white font-bold uppercase tracking-wider">
                  {item.title}
                </h4>
              </div>

              {/* Quick view button overlay */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="p-2.5 bg-black/40 hover:bg-ginosko-gold hover:text-black border border-white/10 hover:border-ginosko-gold text-white rounded-none transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              id="gallery-lightbox"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
            >
              {/* Close Button */}
              <button
                id="gallery-lightbox-close"
                onClick={() => setActiveImage(null)}
                className="absolute top-6 right-6 z-20 p-2.5 bg-black/40 hover:bg-ginosko-gold text-white hover:text-black rounded-none transition-colors border border-white/10 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                id="gallery-lightbox-img-wrapper"
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-none bg-ginosko-charcoal border border-white/10 shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeImage}
                  alt="Ginosko Curation Lightbox"
                  className="w-full h-auto max-h-[80vh] object-contain block"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
