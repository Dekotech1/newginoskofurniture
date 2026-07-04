/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, User, Clock, X, ChevronRight, BookOpen } from "lucide-react";
import { BlogItem } from "../types";
import { blogData } from "../data";

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogItem | null>(null);
  const [drawerSubscribed, setDrawerSubscribed] = useState(false);

  return (
    <section id="blog" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="blog-header" className="mb-20 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            GINOSKO JOURNALS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            Insights on <span className="text-outline">Craft & Structural</span> Art.
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Blog Post Cards Grid */}
        <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((post, idx) => (
            <motion.div
              id={`blog-card-${post.id}`}
              key={post.id}
              className="bg-[#161616] rounded-none border border-white/5 overflow-hidden shadow-md hover:border-ginosko-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div>
                {/* Post Image with zoom */}
                <div className="relative overflow-hidden aspect-[16/10] bg-ginosko-charcoal">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-black/95 text-white text-[9px] tracking-widest uppercase px-2.5 py-1.5 rounded-none border border-white/10 shadow-md">
                    {post.category}
                  </div>
                </div>

                {/* Post Body info */}
                <div className="p-8 text-left">
                  {/* Meta parameters */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 mb-4 uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ginosko-gold" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-ginosko-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Post Title */}
                  <h3 className="font-sans text-xl text-white font-bold uppercase tracking-wide group-hover:text-ginosko-gold transition-colors duration-300 mb-4 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read button footer */}
              <div className="px-8 pb-8 text-left">
                <button
                  id={`read-post-btn-${post.id}`}
                  onClick={() => {
                    setActivePost(post);
                    setDrawerSubscribed(false);
                  }}
                  className="flex items-center gap-2 text-xs tracking-widest font-bold uppercase text-ginosko-gold hover:text-white transition-colors cursor-pointer"
                >
                  Read Essay
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Essay Modal / Slideout Drawer */}
        <AnimatePresence>
          {activePost && (
            <motion.div
              id="blog-modal-overlay"
              className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
            >
              {/* Slideout Panel container */}
              <motion.div
                id="blog-drawer"
                className="bg-[#161616] border-l border-white/10 max-w-2xl w-full h-full shadow-2xl p-8 md:p-12 overflow-y-auto flex flex-col justify-between text-left text-white"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  {/* Drawer header control */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-ginosko-gold uppercase font-bold">
                      {activePost.category} JOURNAL
                    </span>
                    <button
                      id="blog-drawer-close"
                      onClick={() => setActivePost(null)}
                      className="p-2.5 bg-black/40 hover:bg-ginosko-gold hover:text-black border border-white/10 rounded-none transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Essay Title */}
                  <h3 className="font-sans text-2xl sm:text-3xl text-white font-black uppercase tracking-tighter leading-tight mb-6">
                    {activePost.title}
                  </h3>

                  {/* Author Meta Details */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 mb-8 pb-6 border-b border-white/10 font-sans">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-ginosko-gold" />
                      <span>{activePost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-ginosko-gold" />
                      <span>{activePost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ginosko-gold" />
                      <span>{activePost.readTime}</span>
                    </div>
                  </div>

                  {/* Essay Featured Image */}
                  <div className="aspect-[16/9] overflow-hidden rounded-none mb-8 bg-ginosko-charcoal border border-white/10">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Full Essay Content */}
                  <div className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light space-y-6">
                    <p className="font-normal text-white text-base sm:text-lg leading-relaxed border-l-2 border-ginosko-gold pl-4 italic">
                      {activePost.excerpt}
                    </p>
                    <p className="pt-4">
                      {activePost.content}
                    </p>
                    <p>
                      At Ginosko, we believe that material integrity is non-negotiable. Every timber, concrete pour, hinge spec, and lacquering run is checked by our in-house engineers and artisans. In our journals, we provide complete technical transparency to ensure our clients understand the precision required to deliver true, everlasting luxury.
                    </p>
                  </div>
                </div>

                {/* Footer and newsletter signup inside Blog read panel */}
                <div className="border-t border-white/10 pt-8 mt-12 bg-black/40 p-6 rounded-none text-center wood-grain">
                  <BookOpen className="w-8 h-8 text-ginosko-gold mx-auto mb-3" />
                  <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Subscribe to the Ginosko Curation
                  </h4>
                  <p className="font-sans text-[10px] text-gray-400 mb-4 font-light">
                    Receive technical joinery guides and architectural essays directly.
                  </p>
                  {drawerSubscribed ? (
                    <p className="font-sans text-xs text-ginosko-gold font-bold uppercase tracking-wider py-2">
                      ✓ SUBSRIPTION RECORDED
                    </p>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setDrawerSubscribed(true);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 bg-black/60 text-xs text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-[10px] tracking-widest uppercase font-bold rounded-none transition-colors cursor-pointer"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
