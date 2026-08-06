/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Send } from "lucide-react";
import { useCMS } from "../context/CMSContext";

export default function Contact() {
  const { cmsData } = useCMS();
  const contactData = cmsData?.contact;

  const address = contactData?.address || "42 Alfred Rewane Road, Ikoyi, Lagos, Nigeria.";
  const phone = contactData?.phone || "+234 (0) 803 123 4567";
  const email = contactData?.email || "contact@ginoskofurniture.com";
  const workingHours = contactData?.workingHours || "Mon - Fri: 8:00 AM - 6:00 PM";

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom Furniture Inquiry",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "Custom Furniture Inquiry", message: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-ginosko-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="contact-header" className="mb-20 text-left">
          <span className="font-mono text-[10px] tracking-[0.4em] text-ginosko-gold uppercase font-bold block mb-4">
            INITIATE COLLABORATION
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
            Let’s <span className="text-outline">Shape</span> Your Vision.
          </h2>
          <div className="w-16 h-[2px] bg-ginosko-gold" />
        </div>

        <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Intake Contact Form */}
          <motion.div
            id="contact-form-wrapper"
            className="lg:col-span-7 bg-[#161616] p-8 md:p-12 rounded-none border border-white/5 shadow-2xl relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {formSubmitted ? (
              <motion.div
                id="contact-success-state"
                className="py-16 text-center space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center mx-auto border border-ginosko-gold">
                  <CheckCircle2 className="w-8 h-8 text-ginosko-gold" />
                </div>
                <h3 className="font-sans text-2xl text-white font-bold uppercase tracking-wide">Message Dispatched</h3>
                <p className="font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm mx-auto">
                  Thank you. Ginosko's Client Services division has logged your request. Our Design Estimator will contact you within 24 working hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">CLIENT NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">TELEPHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">INQUIRY SUBJECT</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none transition-colors cursor-pointer"
                    >
                      <option value="Custom Furniture Inquiry">Custom Furniture Manufacturing</option>
                      <option value="Luxury Interior Design">Luxury Interior Fit-Out</option>
                      <option value="Residential Construction">Residential Turnkey Construction</option>
                      <option value="Commercial Construction">Commercial civil construction</option>
                      <option value="Bespoke Woodwork">Bespoke Woodwork & Cabinetry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-widest text-white/60 font-bold uppercase mb-2">YOUR SPATIAL VISION / MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your spaces, dimensions, structural design preferences, and timber requirements..."
                    className="w-full px-4 py-3.5 text-xs bg-black/40 text-white border border-white/10 focus:outline-none focus:border-ginosko-gold rounded-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="group px-8 py-4 bg-ginosko-gold hover:bg-ginosko-amber text-black font-sans text-[10px] tracking-widest font-bold uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl hover:-translate-y-0.5 active:translate-y-0 gold-glow"
                  >
                    Send Invitation
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Physical Atelier details & Google map vector representation */}
          <motion.div
            id="contact-info-wrapper"
            className="lg:col-span-5 space-y-12 text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Channels */}
            <div className="space-y-8 font-sans text-xs sm:text-sm text-gray-400 font-light">
              
              <div className="flex gap-5">
                <div className="w-11 h-11 rounded-none bg-[#161616] border border-white/5 shadow-md flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-1.5">CREATIVE ATELIER</h4>
                  <p className="leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-11 h-11 rounded-none bg-[#161616] border border-white/5 shadow-md flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-1.5">TELEPHONE SERVICES</h4>
                  <p className="font-mono leading-relaxed text-gray-300">
                    Main Atelier: <a href={`tel:${phone}`} className="hover:text-ginosko-gold transition-colors">{phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-11 h-11 rounded-none bg-[#161616] border border-white/5 shadow-md flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-1.5">ELECTRONIC CORRESPONDENCE</h4>
                  <p className="leading-relaxed text-gray-300 font-medium">
                    Intake & Tenders: <a href={`mailto:${email}`} className="hover:text-ginosko-gold transition-colors underline">{email}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-11 h-11 rounded-none bg-[#161616] border border-white/5 shadow-md flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-ginosko-gold" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-1.5">BUSINESS HOURS</h4>
                  <p className="leading-relaxed whitespace-pre-line">
                    {workingHours}
                  </p>
                </div>
              </div>

            </div>

            {/* Google map custom vector style rendering */}
            <div className="bg-black/40 rounded-none p-6 border border-white/10 shadow-2xl relative overflow-hidden h-[240px]">
              {/* Map grid representation */}
              <div className="absolute inset-0 bg-[#111111] opacity-40 pointer-events-none grid grid-cols-6 grid-rows-6">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border-r border-b border-white/5" />
                ))}
              </div>
              
              {/* Abstract Roads */}
              <div className="absolute left-0 top-[40%] w-full h-[6px] bg-white/10 rotate-1 pointer-events-none" />
              <div className="absolute left-[30%] top-0 w-[4px] h-full bg-white/10 -rotate-12 pointer-events-none" />
              <div className="absolute right-[20%] top-0 w-[4px] h-full bg-white/5 rotate-45 pointer-events-none" />
              <div className="absolute left-[5%] top-1/2 w-[80px] h-[50px] border border-white/5 bg-white/2 pointer-events-none" />
              <div className="absolute right-[5%] bottom-1/3 w-[120px] h-[70px] border border-white/5 bg-white/2 pointer-events-none" />

              {/* Map content info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-sans text-sm text-white font-bold uppercase tracking-wide mb-1">Ikoyi Curation Center</h5>
                    <p className="font-mono text-[8px] tracking-widest text-white/50">42 ALFRED REWANE RD, LAGOS</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-ginosko-gold flex items-center justify-center animate-bounce shadow-lg shadow-ginosko-gold/30">
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">
                    COORDINATES: 6.4549° N, 3.4314° E
                  </span>
                  <a
                    href="https://google.com/maps?q=Alfred+Rewane+Road,+Ikoyi,+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#161616] hover:bg-ginosko-gold border border-white/10 hover:border-ginosko-gold text-white hover:text-black font-sans text-[8px] tracking-widest uppercase font-bold rounded-none transition-all"
                  >
                    Open Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action Button */}
            <div className="pt-4">
              <a
                id="whatsapp-direct-btn"
                href="https://wa.me/2348031234567?text=Hello%20Ginosko%20Furniture%20%26%20Construction,%20I%20would%20like%20to%20schedule%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans text-xs tracking-widest font-bold uppercase rounded-none transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Chat Directly on WhatsApp
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
