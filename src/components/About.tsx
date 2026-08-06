/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Award, Eye, Shield, Target, Users } from "lucide-react";
import { useCMS } from "../context/CMSContext";

export default function About() {
  const { cmsData } = useCMS();
  const aboutData = cmsData?.about;

  const badgeText = aboutData?.badge || "OUR HERITAGE";
  const titleText = aboutData?.title || "Delivering Unrivaled Spatial Mastery.";
  const descriptionText = aboutData?.description || "Ginosko Furniture & Construction was founded in Nigeria on a singular, powerful premise: that spaces should inspire and structures should endure.";
  const teamMembers = (aboutData?.teamMembers && aboutData.teamMembers.length > 0) ? aboutData.teamMembers : [
    {
      id: "tm-1",
      name: "Arch. Segun Ginosko",
      role: "CEO & Chief Design Director",
      desc: "A visionary architect with over 15 years designing luxury residences and corporate hubs across West Africa.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "tm-2",
      name: "John Dangana",
      role: "Chief Finance & Accountant",
      desc: "Leading financial strategy, budgeting, compliance, and reporting to drive sustainable business growth.",
      image: "/src/assets/images/john_dangana_original_photo_1783270650113.jpg"
    },
    {
      id: "tm-3",
      name: "Simon Aseya Atuwa",
      role: "Head Of Project Operation & Site Engineering",
      desc: "A rigorous project manager ensuring flawless safety, schedule compliance, and absolute finishing standards.",
      image: "/src/assets/images/simon_atuwa_screenshot_1783276612257.jpg"
    }
  ];

  const coreValues = [
    {
      id: "val-1",
      icon: Award,
      title: "Generational Craftsmanship",
      desc: "Our woodwork and civil structures are built using premium, hand-verified materials to outlast generations."
    },
    {
      id: "val-2",
      icon: Shield,
      title: "Absolute Integrity",
      desc: "From precise quantities in our Bills of Quantities (BOQs) to structural steel grades, honesty is our foundation."
    },
    {
      id: "val-3",
      icon: Target,
      title: "Design Innovation",
      desc: "We push boundaries with modern minimalism, architectural hardware, and state-of-the-art smart space integrations."
    }
  ];

  return (
    <section id="about" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Text */}
      <div className="absolute top-10 right-10 select-none pointer-events-none opacity-[0.02] text-[15rem] font-black leading-none uppercase font-sans">
        Atelier
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="about-header" className="mb-20 text-left">
          <motion.span
            id="about-tag"
            className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {badgeText}
          </motion.span>
          <motion.h2
            id="about-title"
            className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {titleText}
          </motion.h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Story Two Column Section */}
        <div id="about-story-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <motion.div
            id="about-col-left"
            className="lg:col-span-7 space-y-6 text-gray-300 font-sans text-sm sm:text-base leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg font-normal text-white mb-4 leading-relaxed">
              {descriptionText}
            </p>
            <p>
              By fusing a state-of-the-art wood manufacturing workshop with an elite, full-service civil engineering and structural construction division, we have achieved a level of turnkey design and finish consistency that is virtually unmatched in the West African region.
            </p>
          </motion.div>

          <motion.div
            id="about-col-right"
            className="lg:col-span-5 text-white p-10 rounded-none border border-white/10 shadow-2xl relative wood-grain"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Mission & Vision layout inside card */}
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm text-ginosko-cream font-bold uppercase tracking-wider mb-2">Our Mission</h4>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    To manufacture exquisite, long-lasting custom wood products and build magnificent, structurally flawless residential and commercial architectural milestones across Nigeria.
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm text-ginosko-cream font-bold uppercase tracking-wider mb-2">Our Vision</h4>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    To set the definitive gold standard for integrated architectural design, bespoke furniture manufacturing, and turnkey civil finishing in Africa.
                  </p>
                </div>
              </div>
            </div>
            {/* Artistic label background */}
            <div className="absolute right-6 bottom-4 font-mono text-[9px] text-white/10 tracking-widest uppercase pointer-events-none select-none">
              EST. NIGERIA
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div id="about-values" className="mb-24">
          <h3 className="font-sans text-sm text-ginosko-gold tracking-widest uppercase font-bold mb-10 border-b border-white/10 pb-4">
            Our Core Pillars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  id={`value-card-${val.id}`}
                  key={val.id}
                  className="bg-[#161616] p-8 rounded-none border border-white/5 hover:border-ginosko-gold/30 hover:shadow-2xl transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-ginosko-gold transition-colors duration-500">
                    <Icon className="w-5 h-5 text-ginosko-gold group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h4 className="font-sans text-base text-white font-bold uppercase tracking-wider mb-3 group-hover:text-ginosko-gold transition-colors">
                    {val.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Professional Team Section */}
        <div id="about-team">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
            <h3 className="font-sans text-sm text-white tracking-widest uppercase font-bold">
              Atelier Directors
            </h3>
            <span className="font-sans text-xs text-ginosko-gold tracking-widest uppercase flex items-center gap-2">
              <Users className="w-4 h-4" /> Professional Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                id={`team-member-${idx}`}
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <div className="relative overflow-hidden aspect-[3/4] rounded-none mb-6 bg-ginosko-charcoal border border-white/10 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full ${member.name === "John Dangana" || member.name === "Simon Aseya Atuwa" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-105`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500" />
                </div>
                <h4 className="font-sans text-base text-white font-bold uppercase tracking-wider mb-1">
                  {member.name}
                </h4>
                <p className="font-sans text-[10px] tracking-widest text-ginosko-gold uppercase font-semibold mb-3">
                  {member.role}
                </p>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
