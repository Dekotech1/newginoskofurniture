/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Star, Quote, Heart } from "lucide-react";
import { testimonialsData } from "../data";
import { useCMS } from "../context/CMSContext";

export default function Testimonials() {
  const { cmsData } = useCMS();
  const list = (cmsData?.testimonials && cmsData.testimonials.length > 0) ? cmsData.testimonials : testimonialsData;

  return (
    <section id="testimonials" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      {/* Absolute faint quotes background */}
      <div className="absolute right-12 top-12 font-serif text-[240px] text-white/2 font-black tracking-tighter leading-none pointer-events-none select-none">
        “
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="testimonials-header" className="mb-20 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            CLIENT REVIEWS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            Endorsed by West Africa’s <span className="text-outline">Discerning</span>.
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Testimonials Grid */}
        <div id="testimonials-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {list.map((test, idx) => (
            <motion.div
              id={`testimonial-card-${test.id}`}
              key={test.id}
              className="bg-[#161616] p-10 rounded-none border border-white/5 hover:border-ginosko-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group h-full relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div>
                {/* Five Stars Rating indicator */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ginosko-gold text-ginosko-gold" />
                  ))}
                </div>

                {/* Double quote overlay icon */}
                <Quote className="w-10 h-10 text-white/5 mb-6 group-hover:text-ginosko-gold/25 transition-colors duration-500" />

                {/* Testimonial review content */}
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light italic mb-8">
                  "{test.comment}"
                </p>
              </div>

              {/* Author profile block */}
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-sans text-sm text-white font-bold uppercase tracking-wide leading-tight">
                    {test.name}
                  </h4>
                  <p className="font-sans text-[10px] text-ginosko-gold tracking-widest font-bold uppercase mt-0.5">
                    {test.role}, <span className="font-bold text-white">{test.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic trust stamp banner */}
        <motion.div
          id="testimonials-trust"
          className="mt-20 flex flex-wrap gap-8 items-center justify-center py-6 border-y border-white/10 opacity-60 text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">ISO 9001:2015 CERTIFIED</span>
          <span className="w-1.5 h-1.5 rounded-none bg-ginosko-gold" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">COREN REGISTERED ENGINEERS</span>
          <span className="w-1.5 h-1.5 rounded-none bg-ginosko-gold" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">LIFTING GENERATIONS SINCE 2016</span>
        </motion.div>

      </div>
    </section>
  );
}
