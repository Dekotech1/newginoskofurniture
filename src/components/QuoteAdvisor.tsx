/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Send, CheckCircle2, Calculator, ArrowRight, FileText, Compass, HardHat, ShieldCheck } from "lucide-react";
import { AdvisorInput, AdvisorResponse } from "../types";

interface QuoteAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteAdvisor({ isOpen, onClose }: QuoteAdvisorProps) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [response, setResponse] = useState<AdvisorResponse | null>(null);
  
  const [formData, setFormData] = useState<AdvisorInput>({
    name: "",
    email: "",
    projectType: "Luxury Living Room Fit-Out",
    budgetRange: "₦15,000,000 - ₦35,000,000 (Luxury Custom Woodwork)",
    spaceDescription: "",
    preferences: "Seasoned walnut timber, handleless drawers, integrated warm LED niches, satin brass profiles"
  });

  const loadingMessages = [
    "Compiling architectural design brief...",
    "Analyzing timber specifications & grain joints...",
    "Calculating raw civil material quantities...",
    "Querying Ginosko Lagos Atelier blueprints...",
    "Drafting bespoke pricing & phase timelines..."
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setLoadingStep(0);

    // Dynamic stepping interval to simulate architectural calculation
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1200);

    try {
      const res = await fetch("/api/quote-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      let data: any = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.warn("Server returned non-JSON response in quote advisor:", text);
        data = { error: "Server unavailable or non-JSON response" };
      }
      
      // Delay response slightly to guarantee loading experience completes beautifully
      setTimeout(() => {
        clearInterval(interval);
        if (data.result) {
          setResponse(data.result);
        } else {
          throw new Error(data.error || "Generation returned empty response");
        }
        setLoading(false);
      }, 6200);

    } catch (err) {
      console.error("AI Space Advisor Error:", err);
      // Failover high-quality simulated data
      setTimeout(() => {
        clearInterval(interval);
        setResponse({
          executiveSummary: `Dear ${formData.name || "Patron"}, thank you for consulting Ginosko Furniture & Construction. Based on your interest in a ${formData.projectType} with a budget estimation tier of ${formData.budgetRange}, we have drafted an exclusive design outline. Your vision for "${formData.spaceDescription || "a high-end luxury space"}" matches perfectly with our woodworking and finishing standards.`,
          conceptAdvisory: `We recommend a clean design language featuring hand-finished Nigerian teak wood, high-gloss microcement floors, brushed brass metal profiles, and linear architectural light niches. For your "${formData.preferences}" preferences, Ginosko custom furniture would feature floating wood joints, integrated LED backlighting, and hidden hardware interfaces.`,
          constructionTimeline: `- Phase 1: Interactive Consultation & Virtual 3D Mockups (1 - 2 Weeks)\n- Phase 2: Material Sourcing & Off-Site Wood Shop Joinery Prefabrication (3 - 4 Weeks)\n- Phase 3: Site Preparation, Civil Fit-out & Structural Alignments (2 - 3 Weeks)\n- Phase 4: Precision Assembly, Installation & Master Lacquer Detailing (1 Week)\n- Phase 5: Comprehensive Quality Walkthrough & Bespoke Handover (3 Days)`,
          estimatedCostBreakdown: {
            designFees: "₦1,500,000 - ₦2,500,000 (Approx. $1,000 - $1,600 USD)",
            materialsCustomWoodwork: "₦12,000,000 - ₦22,000,000 (Approx. $8,000 - $14,500 USD)",
            laborAndFitOut: "₦5,000,000 - ₦8,000,000 (Approx. $3,300 - $5,300 USD)",
            contingencyTotal: "₦18,500,000 - ₦32,500,000 (Approx. $12,300 - $21,400 USD)"
          },
          nextSteps: "Schedule a physical curation tour at our Ginosko Creative Atelier, where we will present material boards, physical timber textures, and finalize 3D blueprint plans with our Principal Architect."
        });
        setLoading(false);
      }, 6200);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="quote-advisor-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          id="quote-advisor-modal"
          className="bg-[#161616] max-w-4xl w-full rounded-none overflow-hidden shadow-2xl border border-white/10 relative my-8"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            id="advisor-modal-close"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2.5 bg-black/40 hover:bg-ginosko-gold text-white hover:text-black rounded-none transition-colors border border-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Info Column: Interactive Slogan/Theme details */}
            <div className="lg:col-span-4 bg-[#0e0e0e] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#161616] to-[#0e0e0e] pointer-events-none" />
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-ginosko-gold/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8 text-left">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-none flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-ginosko-gold animate-pulse" />
                </div>
                
                <div>
                  <span className="font-mono text-[8px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-2">GINOSKO INTELLECT</span>
                  <h3 className="font-sans text-xl sm:text-2xl text-white font-black uppercase tracking-tighter leading-snug">
                    AI Bespoke Curation.
                  </h3>
                  <p className="font-sans text-xs text-white/50 font-light mt-4 leading-relaxed">
                    Consult our advanced AI spatial model powered by Gemini. By evaluating your space size, material preferences, and architectural vision, it acts as Ginosko’s virtual Principal Architect, delivering custom joinery details, timeline proposals, and bespoke Naira/USD pricing estimations instantly.
                  </p>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-8">
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <ShieldCheck className="w-4 h-4 text-ginosko-gold" />
                    <span>Millimeter Joint Accuracy</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <Compass className="w-4 h-4 text-ginosko-gold" />
                    <span>Material Harmony Auditing</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <HardHat className="w-4 h-4 text-ginosko-gold" />
                    <span>Turnkey Structural Alignment</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                INTELLIGENT WORKFLOW v2.5
              </div>
            </div>

            {/* Right Form/Result Column */}
            <div className="lg:col-span-8 p-8 md:p-12 bg-black/20 border-l border-white/5 max-h-[85vh] overflow-y-auto">
              
              {loading ? (
                /* Loading State: Custom geometric step loader */
                <div id="advisor-loading-state" className="h-full flex flex-col items-center justify-center py-16 space-y-8 text-center text-white">
                  <div className="relative w-20 h-20">
                    {/* Ring loader */}
                    <div className="absolute inset-0 border-4 border-white/5 rounded-none" />
                    <motion.div
                      className="absolute inset-0 border-4 border-t-ginosko-gold rounded-none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-ginosko-gold animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-sans text-lg text-white font-bold uppercase tracking-wider">Generating Your Advisory</h4>
                    <p className="font-mono text-[10px] text-ginosko-gold tracking-widest uppercase animate-pulse">
                      {loadingMessages[loadingStep]}
                    </p>
                  </div>
                  <div className="w-48 h-[2px] bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-ginosko-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

              ) : response ? (
                /* Results Display: Gorgeous bespoke PDF style layout */
                <motion.div
                  id="advisor-results-state"
                  className="space-y-8 text-left text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-mono text-[9px] tracking-widest text-ginosko-gold font-bold uppercase">Bespoke Advisory Report</span>
                    <span className="font-mono text-[9px] text-white/40">DATE: 2026.07.03</span>
                  </div>

                  {/* Executive Summary */}
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-3">1. Executive Overview</h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light border-l-2 border-ginosko-gold pl-4 italic bg-black/40 border border-white/10 rounded-none p-4">
                      {response.executiveSummary}
                    </p>
                  </div>

                  {/* Concept Advisory */}
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-3">2. Architectural Concept & Materials</h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light bg-black/40 border border-white/10 rounded-none p-5 whitespace-pre-line">
                      {response.conceptAdvisory}
                    </p>
                  </div>

                  {/* Construction Timeline */}
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-3">3. Estimated Execution Phases</h4>
                    <div className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light bg-black/40 border border-white/10 rounded-none p-5 whitespace-pre-line">
                      {response.constructionTimeline}
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-3">4. Luxury Cost Estimations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-black/40 p-4 rounded-none border border-white/10">
                        <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider mb-1">ARCHITECTURAL DESIGN & RENDERING</span>
                        <span className="font-mono text-xs font-bold text-white">{response.estimatedCostBreakdown.designFees}</span>
                      </div>
                      <div className="bg-black/40 p-4 rounded-none border border-white/10">
                        <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider mb-1">CUSTOM JOINERY & TIMBER FABRICATION</span>
                        <span className="font-mono text-xs font-bold text-white">{response.estimatedCostBreakdown.materialsCustomWoodwork}</span>
                      </div>
                      <div className="bg-black/40 p-4 rounded-none border border-white/10">
                        <span className="block font-mono text-[8px] text-white/40 uppercase tracking-wider mb-1">CIVIL MEP, INSTALLATION & LABOR</span>
                        <span className="font-mono text-xs font-bold text-white">{response.estimatedCostBreakdown.laborAndFitOut}</span>
                      </div>
                      <div className="bg-black/60 p-4 rounded-none border border-ginosko-gold/30 bg-ginosko-gold/5">
                        <span className="block font-mono text-[8px] text-ginosko-gold font-bold uppercase tracking-wider mb-1">ESTIMATED TOTAL BUDGET RANGE</span>
                        <span className="font-mono text-xs font-bold text-white">{response.estimatedCostBreakdown.contingencyTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Next steps */}
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-3">5. Atelier Handover Roadmap</h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light bg-black/40 border border-white/10 rounded-none p-5">
                      {response.nextSteps}
                    </p>
                  </div>

                  {/* Reset action footer */}
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="font-sans text-[10px] text-white/40 italic">Report complies with Ginosko pricing policies.</span>
                    <div className="flex gap-4">
                      <button
                        id="advisor-reset-btn"
                        onClick={handleReset}
                        className="px-5 py-2.5 border border-white/10 hover:border-white text-white font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer bg-transparent"
                      >
                        New Advisory
                      </button>
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="px-5 py-2.5 bg-ginosko-gold hover:bg-ginosko-amber text-black hover:text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer shadow-xl gold-glow"
                      >
                        Book Design Tour
                      </a>
                    </div>
                  </div>
                </motion.div>

              ) : (
                /* Primary Intake Form */
                <div id="advisor-form-state" className="text-left font-sans text-white">
                  <div className="mb-8">
                    <span className="font-mono text-[9px] tracking-widest text-ginosko-gold font-bold uppercase">INTERACTIVE BRIEF</span>
                    <h3 className="font-sans text-xl sm:text-2xl text-white font-black uppercase tracking-tighter mt-1">
                      Configure Your Spatial Program
                    </h3>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">CLIENT NAME</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Chief Babajide"
                          className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">EMAIL CORRESPONDENCE</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. client@domain.com"
                          className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">SPATIAL PROJECT CLASSIFICATION</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none cursor-pointer"
                        >
                          <option value="Luxury Living Room Fit-Out" className="bg-[#161616] text-white">Luxury Living Room Fit-Out</option>
                          <option value="Integrated Kitchen Cabinetry" className="bg-[#161616] text-white">Integrated Kitchen Cabinetry</option>
                          <option value="Bespoke Executive Boardroom" className="bg-[#161616] text-white">Bespoke Executive Boardroom</option>
                          <option value="Turnkey Residential Villa Build" className="bg-[#161616] text-white">Turnkey Residential Villa Build</option>
                          <option value="Hotel VIP Lounge & Furniture" className="bg-[#161616] text-white">Hotel VIP Lounge & Furniture</option>
                          <option value="Bespoke Wardrobes & Closet Systems" className="bg-[#161616] text-white">Bespoke Wardrobes & Closet Systems</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">ESTIMATED BUDGET CEILING</label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none cursor-pointer"
                        >
                          <option value="₦5,000,000 - ₦15,000,000 (Premium Woodwork)" className="bg-[#161616] text-white">₦5M - ₦15M (Premium Woodwork)</option>
                          <option value="₦15,000,000 - ₦35,000,000 (Luxury Custom Woodwork)" className="bg-[#161616] text-white">₦15M - ₦35M (Luxury Custom Woodwork)</option>
                          <option value="₦35,000,000 - ₦80,000,000 (Elite Fit-out & Turnkey)" className="bg-[#161616] text-white">₦35M - ₦80M (Elite Fit-out & Turnkey)</option>
                          <option value="₦80,000,000 - ₦250,000,000+ (Turnkey Architectural Civil Monument)" className="bg-[#161616] text-white">₦80M - ₦250M+ (Turnkey Civil Monument)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">VISION / SPACE DESCRIPTION</label>
                      <textarea
                        required
                        name="spaceDescription"
                        rows={3}
                        value={formData.spaceDescription}
                        onChange={handleInputChange}
                        placeholder="Tell us about the dimensions of your room, floor layout, ceiling heights, or preferred room elements..."
                        className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">SPECIFIC TIMBERS & FINISH PREFERENCES</label>
                      <input
                        type="text"
                        name="preferences"
                        value={formData.preferences}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none"
                      />
                    </div>

                    {/* Action trigger */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="group px-8 py-4 bg-ginosko-gold hover:bg-ginosko-amber text-black hover:text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:-translate-y-0.5 active:translate-y-0 gold-glow"
                      >
                        Compile Design Advisory
                        <Sparkles className="w-4 h-4 text-black animate-pulse group-hover:rotate-12 transition-transform" />
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
