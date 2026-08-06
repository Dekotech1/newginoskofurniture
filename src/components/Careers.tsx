/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, MapPin, Clock, X, Upload, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { JobOpening } from "../types";
import { careersData } from "../data";
import { useCMS } from "../context/CMSContext";

export default function Careers() {
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { cmsData } = useCMS();

  const careersList = (cmsData?.careers && cmsData.careers.length > 0) ? cmsData.careers : careersData;
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setApplyJob(null);
      setFile(null);
    }, 3000);
  };

  return (
    <section id="careers" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="careers-header" className="mb-20 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            GINOSKO ACADEMY & CAREERS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            Join the <span className="text-outline">Cohort</span> of Master Artisans.
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        {/* Career openings listing columns */}
        <div id="careers-list" className="max-w-4xl mx-auto space-y-6 text-left">
          {careersList.map((job, idx) => (
            <motion.div
              id={`job-row-${job.id}`}
              key={job.id}
              className="bg-[#161616] p-8 rounded-none border border-white/5 hover:border-ginosko-gold/30 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => setActiveJob(job)}
            >
              <div>
                <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold mb-2 block">
                  {job.department} DIVISION
                </span>
                <h3 className="font-sans text-xl text-white font-bold uppercase tracking-wider group-hover:text-ginosko-gold transition-colors duration-300 mb-4">
                  {job.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-sans font-light">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-ginosko-gold" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-ginosko-gold" />
                    {job.type}
                  </span>
                  <span>• Experience Required: {job.experience}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="font-mono text-[10px] tracking-widest text-ginosko-gold uppercase font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  Join Guild
                </span>
                <div className="w-10 h-10 rounded-none bg-black/40 border border-white/10 flex items-center justify-center group-hover:bg-ginosko-gold group-hover:text-black group-hover:border-ginosko-gold transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Job opening details lightbox modal */}
        <AnimatePresence>
          {activeJob && (
            <motion.div
              id="job-detail-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
            >
              <motion.div
                id="job-detail-modal"
                className="bg-[#161616] max-w-2xl w-full rounded-none overflow-hidden p-8 md:p-12 relative text-left shadow-2xl border border-white/10 text-white"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  id="job-modal-close"
                  onClick={() => setActiveJob(null)}
                  className="absolute top-6 right-6 p-2.5 bg-black/40 hover:bg-ginosko-gold hover:text-black text-white rounded-none border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold block mb-2">
                    {activeJob.department} Guild opening
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl text-white font-black uppercase tracking-tighter mb-6">
                    {activeJob.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 mb-8 pb-6 border-b border-white/10 font-sans">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-ginosko-gold" /> {activeJob.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-ginosko-gold" /> {activeJob.type}</span>
                    <span>Required: {activeJob.experience}</span>
                  </div>

                  <div className="space-y-6 font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-8">
                    <p className="font-normal text-white">{activeJob.description}</p>
                    
                    <div>
                      <h4 className="font-sans text-sm font-bold text-white tracking-widest uppercase mb-4">
                        RESPONSIBILITIES & REQUIREMENTS
                      </h4>
                      <ul className="space-y-3.5">
                        {activeJob.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-ginosko-gold shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Submit application button */}
                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                      id="job-apply-trigger"
                      onClick={() => {
                        setApplyJob(activeJob);
                        setActiveJob(null);
                      }}
                      className="px-8 py-4 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-xs tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer shadow-xl gold-glow"
                    >
                      Apply for Guild Position
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Form Modal with Drag-and-Drop CV upload */}
        <AnimatePresence>
          {applyJob && (
            <motion.div
              id="job-apply-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyJob(null)}
            >
              <motion.div
                id="job-apply-modal"
                className="bg-[#161616] max-w-lg w-full rounded-none overflow-hidden p-8 md:p-10 relative text-left shadow-2xl border border-white/10 my-8 text-white"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  id="apply-modal-close"
                  onClick={() => setApplyJob(null)}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-ginosko-gold hover:text-black text-white rounded-none border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSubmitted ? (
                  <motion.div
                    className="py-12 text-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center mx-auto border border-ginosko-gold">
                      <CheckCircle2 className="w-8 h-8 text-ginosko-gold" />
                    </div>
                    <h3 className="font-sans text-2xl text-white font-bold uppercase tracking-wide">Application Received</h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm mx-auto">
                      Thank you for applying. Ginosko's Apprentice Council and Head of Operations will review your portfolio and reach out within 5 working days.
                    </p>
                  </motion.div>
                ) : (
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold block mb-2">
                      SUBMIT DOSSIER
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl text-white font-black uppercase tracking-tighter mb-6">
                      Guild Application: <span className="font-normal italic text-ginosko-gold lowercase">{applyJob.title}</span>
                    </h3>

                    <form onSubmit={handleApplySubmit} className="space-y-5 font-sans">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">FULL NAME</label>
                          <input type="text" required className="w-full px-4 py-3 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">EMAIL ADDRESS</label>
                          <input type="email" required className="w-full px-4 py-3 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">PHONE NUMBER</label>
                          <input type="tel" required className="w-full px-4 py-3 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">PORTFOLIO LINK</label>
                          <input type="url" placeholder="https://" className="w-full px-4 py-3 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none" />
                        </div>
                      </div>

                      {/* Drag and Drop File Upload Area */}
                      <div>
                        <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">UPLOAD CV & CERTIFICATES (PDF/DOCX)</label>
                        <div
                          className={`border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all ${
                            dragOver
                              ? "border-ginosko-gold bg-[#222222]"
                              : file
                              ? "border-ginosko-gold/40 bg-black/40"
                              : "border-white/10 bg-black/40 hover:border-ginosko-gold/40"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          
                          {file ? (
                            <div className="flex flex-col items-center space-y-2">
                              <FileText className="w-8 h-8 text-ginosko-gold" />
                              <span className="font-mono text-xs text-white font-semibold truncate max-w-[280px]">
                                {file.name}
                              </span>
                              <span className="text-[10px] text-gray-400 font-light">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center space-y-2">
                              <Upload className="w-8 h-8 text-white/40" />
                              <p className="font-sans text-xs text-gray-400 font-light">
                                <span className="font-bold text-ginosko-gold">Drag your resume here</span> or click to browse
                              </p>
                              <span className="text-[10px] text-white/30 font-light">
                                Max size: 10MB • Supporting PDF, DOCX
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action submissions */}
                      <div className="pt-4 flex justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setApplyJob(null)}
                          className="w-1/3 py-3.5 border border-white/10 hover:border-white text-white font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer text-center bg-transparent"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 py-3.5 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer text-center shadow-xl gold-glow"
                        >
                          Submit Dossier
                        </button>
                      </div>

                    </form>
                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
