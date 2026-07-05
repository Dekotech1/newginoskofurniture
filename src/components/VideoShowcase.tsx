/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Maximize2, 
  Film, 
  Sparkles, 
  Layers, 
  Compass, 
  Hammer,
  RotateCcw,
  Clock,
  CheckCircle,
  Eye
} from "lucide-react";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showDirectModal, setShowDirectModal] = useState(false);
  const [activeSegment, setActiveSegment] = useState(0);
  
  const videoDuration = 180; // 3 minutes total simulated film
  const videoUrl = "https://photos.google.com/album/AF1QipOrFcrNXc62g15fOoOyGK0W574hudih1xqDJdO5/photo/AF1QipOKaLHxauuTRxs2Ft7zeU8fAKYhwZHnSXoQldpz";
  
  // Custom chapters for Ginosko's sample work video
  const chapters = [
    { time: 0, label: "Timber Curation", desc: "Sourcing premium logs of Teak, Mahogany, and Walnut" },
    { time: 45, label: "Precision Milling", desc: "Industrial slicing and CNC precision wood leveling" },
    { time: 90, label: "Handcrafted Assembly", desc: "Master artisans executing mortise & tenon joinery" },
    { time: 135, label: "Monolithic Finishing", desc: "Sanding and premium polyurethane spray finishing" },
  ];

  // Simulated playback ticker when playing is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= videoDuration) {
            setIsPlaying(false);
            return 0;
          }
          const nextTime = prev + 1;
          
          // Auto-switch active segment based on current time
          const currentChapterIndex = chapters.findIndex((ch, idx) => {
            const nextCh = chapters[idx + 1];
            return nextTime >= ch.time && (!nextCh || nextTime < nextCh.time);
          });
          if (currentChapterIndex !== -1 && currentChapterIndex !== activeSegment) {
            setActiveSegment(currentChapterIndex);
          }
          
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSegment]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    
    const currentChapterIndex = chapters.findIndex((ch, idx) => {
      const nextCh = chapters[idx + 1];
      return newTime >= ch.time && (!nextCh || newTime < nextCh.time);
    });
    if (currentChapterIndex !== -1) {
      setActiveSegment(currentChapterIndex);
    }
  };

  return (
    <section id="videoshowcase" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      {/* Background visual graphics */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ginosko-gold/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ginosko-amber/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="videoshowcase-header" className="mb-16 text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
              ATELIER IN MOTION
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter leading-none mb-6">
              The <span className="text-outline">Craft</span> on Screen.
            </h2>
            <div className="w-16 h-[2px] bg-ginosko-gold" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-white/50 max-w-md leading-relaxed font-light">
            A comprehensive visual showcase of Ginosko's master woodwrights executing high-end luxury furniture fabrication and interior structural joinery from raw material selection to final hand-polished delivery.
          </p>
        </div>

        {/* Master Showcase Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Simulated Video Player */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-[#111] border border-white/10 group overflow-hidden shadow-2xl">
              
              {/* Actual Image Background */}
              <img 
                src="/src/assets/images/atelier_workshop_cinematic_1783268273759.jpg" 
                alt="Ginosko Master Woodwright Workshop"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />

              {/* High Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

              {/* Sound/Equalizer Waves (Renders dynamically when playing) */}
              <div className="absolute top-6 left-6 flex items-center space-x-1.5 z-10">
                <div className="w-3.5 h-3.5 bg-ginosko-gold/20 rounded-full flex items-center justify-center border border-ginosko-gold/40">
                  <span className="w-1.5 h-1.5 bg-ginosko-gold rounded-full animate-ping" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold">
                  {isPlaying ? "PLAYING SAMPLE DEMO FILM" : "FILM PREVIEW READY"}
                </span>
              </div>

              {/* Resolution / Camera Badge */}
              <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center space-x-4 bg-black/60 px-3 py-1.5 border border-white/10">
                <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase font-bold">
                  UHD 4K QUALITY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Floating Large Play/Pause Button when hovered */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.button
                  id="media-center-play-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-ginosko-gold hover:bg-ginosko-amber text-black rounded-none border border-black/5 flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer gold-glow group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-black" />
                  ) : (
                    <Play className="w-8 h-8 fill-black translate-x-0.5" />
                  )}
                </motion.button>
              </div>

              {/* Dynamic Overlay Caption based on simulated chapters */}
              <div className="absolute bottom-16 left-6 right-6 z-10 pointer-events-none text-left">
                <motion.div
                  key={activeSegment}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1 bg-black/60 backdrop-blur-md p-4 border border-white/10 max-w-sm"
                >
                  <span className="font-mono text-[8px] tracking-[0.3em] text-ginosko-gold uppercase font-bold">
                    CURRENT CHAPTER: {chapters[activeSegment].label}
                  </span>
                  <p className="font-sans text-[11px] text-white/90 font-light leading-relaxed">
                    {chapters[activeSegment].desc}
                  </p>
                </motion.div>
              </div>

              {/* Player Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/95 border-t border-white/10 flex items-center justify-between px-4 z-10 text-white select-none">
                
                {/* Left controls */}
                <div className="flex items-center space-x-4">
                  <button 
                    id="controls-play-toggle"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-ginosko-gold transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    id="controls-restart"
                    onClick={() => setCurrentTime(0)}
                    className="hover:text-ginosko-gold transition-colors cursor-pointer"
                    title="Restart Film"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-white/60">
                    {formatTime(currentTime)} / {formatTime(videoDuration)}
                  </span>
                </div>

                {/* Progress bar Scrubber */}
                <div className="flex-1 px-4 hidden sm:block">
                  <input 
                    id="media-scrub-input"
                    type="range"
                    min="0"
                    max={videoDuration}
                    value={currentTime}
                    onChange={handleScrub}
                    className="w-full accent-ginosko-gold bg-white/10 h-[3px] rounded-none cursor-pointer hover:h-[5px] transition-all"
                  />
                </div>

                {/* Right controls */}
                <div className="flex items-center space-x-4">
                  <button 
                    id="controls-mute-toggle"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-ginosko-gold transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button 
                    id="controls-launch-modal"
                    onClick={() => setShowDirectModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:border-ginosko-gold text-white hover:text-ginosko-gold font-sans text-[9px] tracking-widest uppercase transition-all cursor-pointer"
                    title="Launch Full Screen Player"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>EXPAND</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Simulated Live Audio Spectrum/Equalizer */}
            <div className="bg-[#111111] border border-white/5 p-4 flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4 text-ginosko-gold" />
                <span className="font-mono text-[9px] tracking-widest text-white/60 uppercase">
                  ACTIVE ATELIER SPECTRUM FEED
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-5 px-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-ginosko-gold"
                    animate={{ 
                      height: isPlaying ? [4, 20, 8, 16, 4][i % 5] : 4
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.04
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Spec / Metadata & Direct Google Photos Link */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Main Descriptive Card */}
            <div className="bg-[#161616] border border-white/5 p-8 flex flex-col justify-between h-full space-y-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-ginosko-gold/5 blur-2xl pointer-events-none" />
              
              <div className="space-y-6 text-left">
                <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold block">
                  TIMELINE & SEQUENCE
                </span>
                <h3 className="font-sans text-xl text-white font-black uppercase tracking-tight">
                  Virtual Atelier Experience
                </h3>
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                  Our exclusive video features actual footage of high-end millwork, luxury joinery assemblies, and construction details being brought to life inside Ginosko's workshop. Watch our master carpenters deploy elite Nigerian woodcraft.
                </p>

                {/* Micro Steps with play-matching updates */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  {chapters.map((ch, idx) => {
                    const isPassed = currentTime >= ch.time;
                    const isActive = activeSegment === idx && isPlaying;
                    return (
                      <div 
                        id={`video-chapter-step-${idx}`}
                        key={idx}
                        className={`flex items-start gap-3 p-2.5 transition-colors cursor-pointer border ${
                          isActive 
                            ? "bg-ginosko-gold/5 border-ginosko-gold/20" 
                            : isPassed 
                            ? "border-white/5 opacity-80" 
                            : "border-transparent opacity-40"
                        }`}
                        onClick={() => {
                          setCurrentTime(ch.time);
                          setActiveSegment(idx);
                        }}
                      >
                        <div className={`w-5 h-5 rounded-none flex items-center justify-center border text-[9px] font-mono mt-0.5 ${
                          isActive 
                            ? "bg-ginosko-gold text-black border-ginosko-gold" 
                            : isPassed 
                            ? "bg-black/60 text-ginosko-gold border-white/20" 
                            : "bg-transparent text-white/40 border-white/10"
                        }`}>
                          {isPassed ? <CheckCircle className="w-3 h-3 text-ginosko-gold" /> : `0${idx + 1}`}
                        </div>
                        <div>
                          <h4 className={`font-sans text-xs font-bold uppercase tracking-wider ${
                            isActive ? "text-ginosko-gold" : "text-white"
                          }`}>
                            {ch.label}
                          </h4>
                          <span className="block text-[10px] text-gray-500 font-mono mt-0.5">
                            Chapter Starts at: {formatTime(ch.time)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Big Action Button to open Google Photos directly */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <a
                  id="direct-photos-launch"
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-xs tracking-widest font-bold uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg gold-glow"
                >
                  <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  <span>Launch Google Video Portfolio</span>
                </a>
                <span className="block text-center font-sans text-[10px] text-white/30 italic">
                  Opens original UHD Video in a secure, high-speed connection.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Cinematic Fullscreen Expansion Overlay Modal */}
      <AnimatePresence>
        {showDirectModal && (
          <motion.div
            id="video-expand-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDirectModal(false)}
          >
            <motion.div
              id="video-expand-modal"
              className="bg-[#111111] max-w-5xl w-full border border-white/15 overflow-hidden relative shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="video-expand-close"
                onClick={() => setShowDirectModal(false)}
                className="absolute top-6 right-6 z-20 p-2.5 bg-black/60 hover:bg-ginosko-gold text-white hover:text-black rounded-none border border-white/10 transition-colors cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="p-8 md:p-12 text-center text-white space-y-8">
                <div className="max-w-2xl mx-auto space-y-4">
                  <span className="font-mono text-[9px] tracking-widest text-ginosko-gold uppercase font-bold block">
                    EXTERNAL UHD WORKFLOW MEDIA PLAYER
                  </span>
                  <h3 className="font-sans text-2xl sm:text-4xl text-white font-black uppercase tracking-tighter leading-tight">
                    Secure Portfolio Gateway
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    To maintain pristine, uncompressed 4K video playback with authentic workshop audio fidelity, our sample workspace video is safely stored on the official Google Photos platform. Click below to launch the film instantly.
                  </p>
                </div>

                {/* Simulated Screen Box */}
                <div className="relative aspect-video max-w-3xl mx-auto bg-black border border-white/10 overflow-hidden group">
                  <img 
                    src="/src/assets/images/atelier_workshop_cinematic_1783268273759.jpg" 
                    alt="Cinema Master" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 space-y-4">
                    <div className="w-16 h-16 bg-ginosko-gold rounded-full flex items-center justify-center animate-pulse">
                      <Play className="w-6 h-6 fill-black translate-x-0.5 text-black" />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-ginosko-gold uppercase font-bold bg-[#111] px-4 py-1.5 border border-white/10">
                      RESOLVING ATELIER FILM CODES...
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                  <button
                    onClick={() => setShowDirectModal(false)}
                    className="px-6 py-3.5 border border-white/15 hover:border-white text-white font-sans text-xs tracking-widest font-bold uppercase rounded-none transition-colors cursor-pointer bg-transparent text-center"
                  >
                    Return to site
                  </button>
                  <a
                    id="modal-direct-photos-launch"
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3.5 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-xs tracking-widest font-bold uppercase rounded-none transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-xl gold-glow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Film Player
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
