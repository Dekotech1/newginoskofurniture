/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { statsData } from "../data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds animation duration
    const end = value;
    const range = end - start;
    let current = start;
    const stepTime = Math.max(Math.floor(duration / range), 15);
    
    const timer = setInterval(() => {
      current += Math.ceil(range / (duration / stepTime));
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={containerRef} className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-white select-none leading-none">
      {count}
      <span className="text-ginosko-gold font-sans font-black">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 bg-[#0e0e0e] border-y border-white/5 overflow-hidden">
      {/* Absolute styling line accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 items-center">
          {statsData.map((stat, idx) => (
            <motion.div
              id={`stat-box-${stat.id}`}
              key={stat.id}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Animated value counter */}
              <Counter value={stat.value} suffix={stat.suffix} />
              
              {/* Divider styling line */}
              <div className="w-8 h-[2px] bg-ginosko-gold group-hover:w-16 transition-all duration-500" />
              
              {/* Label description */}
              <span className="font-sans text-[10px] tracking-widest text-white/50 uppercase leading-relaxed font-bold max-w-[200px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
