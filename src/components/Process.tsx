/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Ruler, Hammer, HardHat, FileText, Compass, Search, Smile } from "lucide-react";
import { processSteps } from "../data";

const iconMap: { [key: number]: React.ComponentType<any> } = {
  1: Search,
  2: Compass,
  3: FileText,
  4: Hammer,
  5: Ruler,
  6: HardHat,
  7: Smile
};

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  return (
    <section id="process" className="py-24 bg-ginosko-dark text-white relative overflow-hidden">
      {/* Visual coordinates layer background */}
      <div className="absolute top-12 left-12 font-mono text-[9px] text-white/5 tracking-[0.5em] uppercase select-none pointer-events-none">
        GINOSKO PROTOCOL / WORKFLOW OUTLINE
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="process-header" className="mb-20 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            OUR TIMELINE
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            The <span className="text-outline">Masterplan</span> of Execution.
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Desktop Interface: Interactive Segmented Timeline & Focused view */}
        <div id="desktop-process" className="hidden lg:block">
          
          {/* Horizontal Navigation Dots / Lines */}
          <div className="relative flex items-center justify-between mb-16">
            <div className="absolute left-0 w-full h-[1px] bg-white/10 z-0" />
            <motion.div
              className="absolute left-0 h-[2px] bg-ginosko-gold z-0"
              style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            {processSteps.map((step, idx) => {
              const Icon = iconMap[step.id] || Hammer;
              const isActive = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <button
                  id={`timeline-node-${step.id}`}
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-none flex items-center justify-center border-2 transition-all duration-500 ${
                      isActive
                        ? "bg-ginosko-gold border-ginosko-gold text-black shadow-xl scale-110"
                        : isPassed
                        ? "bg-[#161616] border-ginosko-gold text-ginosko-gold"
                        : "bg-[#161616] border-white/20 text-white/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase mt-4 transition-colors ${
                      isActive ? "text-ginosko-gold font-bold" : "text-white/40 group-hover:text-white"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-sans text-[10px] tracking-wider uppercase font-bold mt-1 max-w-[120px] text-center transition-colors truncate ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Focused Step Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              id={`focused-step-card-${processSteps[activeStep].id}`}
              key={activeStep}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 bg-[#161616] p-12 rounded-none border border-white/5 shadow-2xl relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Corner Watermark Number */}
              <div className="absolute right-12 bottom-4 font-mono text-[120px] text-white/3 font-black tracking-tighter leading-none pointer-events-none select-none">
                {processSteps[activeStep].number}
              </div>

              {/* Detail Content left column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="font-mono text-xs text-ginosko-gold tracking-widest uppercase font-bold">
                  PHASE {processSteps[activeStep].number} OF {processSteps.length}
                </span>
                <h3 className="font-sans text-3xl text-white font-black uppercase tracking-tighter">
                  {processSteps[activeStep].title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                  {processSteps[activeStep].description}
                </p>
                <div className="w-12 h-[1px] bg-white/20 my-6" />
                <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {processSteps[activeStep].details}
                </p>
              </div>

              {/* Right Column: Architectural Checklist */}
              <div className="lg:col-span-5 bg-black/20 border border-white/10 p-8 rounded-none flex flex-col justify-between wood-grain">
                <div>
                  <h4 className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold mb-4">
                    EXPECTED OUTPUTS & DOCUMENTS
                  </h4>
                  <ul className="space-y-4">
                    {activeStep === 0 && (
                      <>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Detailed Design Brief Document</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Mood boards & Aesthetic Alignment</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Conceptual Budget Framework</li>
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Photorealistic 3D Renders</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Cabinetry & Wood Joinery Plans</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Interior Material Sample Boards</li>
                      </>
                    )}
                    {activeStep === 2 && (
                      <>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Absolute Bills of Quantities (BOQ)</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Civil Structural Site Layouts</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Kiln Timber Drying Logs (8% target)</li>
                      </>
                    )}
                    {activeStep > 2 && (
                      <>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Precision wood machining specs</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Concrete compression strength tests</li>
                        <li className="flex items-center gap-3 text-xs text-white/80"><span className="w-1.5 h-1.5 bg-ginosko-gold rounded-none" /> Hardware stress tests & Soft close check</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Progress Control Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    id="prev-step-btn"
                    onClick={handlePrev}
                    className="p-3 bg-white/5 border border-white/10 hover:border-ginosko-gold rounded-none transition-colors cursor-pointer text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    id="next-step-btn"
                    onClick={handleNext}
                    className="p-3 bg-ginosko-gold hover:bg-ginosko-amber rounded-none text-black transition-colors cursor-pointer font-bold"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Mobile Interface: Simple Stacking List with Detailed Accordion */}
        <div id="mobile-process" className="lg:hidden space-y-4">
          {processSteps.map((step, idx) => {
            const Icon = iconMap[step.id] || Hammer;
            const isOpen = activeStep === idx;
            return (
              <div
                id={`mobile-process-item-${step.id}`}
                key={step.id}
                className="bg-[#161616] border border-white/5 rounded-none p-6 text-left cursor-pointer"
                onClick={() => setActiveStep(idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-ginosko-gold font-bold">{step.number}</span>
                    <div className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-ginosko-gold" />
                    </div>
                    <h3 className="font-sans text-base font-bold uppercase tracking-wider text-white">{step.title}</h3>
                  </div>
                  <span className="text-ginosko-gold text-xs">{isOpen ? "▲" : "▼"}</span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-white/5 text-xs text-white/70 space-y-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{step.description}</p>
                      <p className="text-white/40 italic font-light">{step.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
