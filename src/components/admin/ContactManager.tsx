import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { PhoneCall, Save, CheckCircle, MapPin, Mail, Clock, Globe, MessageSquare } from "lucide-react";

export default function ContactManager() {
  const { cmsData, updateSection } = useCMS();
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [contactState, setContactState] = useState({
    title: cmsData.contact?.title || "Get In Touch With Our Studio",
    subtitle: cmsData.contact?.subtitle || "Speak directly with our principal architects and master joiners.",
    address: cmsData.contact?.address || "Plot 1402, Ginosko Industrial Avenue, Idu Industrial Zone, Abuja, Nigeria",
    phone: cmsData.contact?.phone || "+234 803 000 9988 / +234 901 222 3344",
    email: cmsData.contact?.email || "consult@ginoskoconstruction.com",
    hours: cmsData.contact?.hours || "Mon - Sat: 8:00 AM - 6:00 PM (WAT)",
    mapEmbedUrl: cmsData.contact?.mapEmbedUrl || "https://maps.google.com/maps?q=Abuja+Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed",
    whatsapp: cmsData.contact?.whatsapp || "+2348030009988",
    instagram: cmsData.contact?.instagram || "https://instagram.com/ginoskoconstruction",
    linkedin: cmsData.contact?.linkedin || "https://linkedin.com/company/ginosko"
  });

  const handleSaveContact = async () => {
    const ok = await updateSection("contact", contactState);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-ginosko-gold" /> Contact Information & Atelier Coordinates
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage headquarters address, hotline numbers, consultation emails, and Google Maps embed location.
          </p>
        </div>

        <button
          onClick={handleSaveContact}
          className="px-5 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 text-xs cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Contact Details
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Contact details saved and updated live!
        </div>
      )}

      {/* Main Form Fields */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-400 mb-1">Section Title</label>
            <input
              type="text"
              value={contactState.title}
              onChange={(e) => setContactState({ ...contactState, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-400 mb-1">Subheading Description</label>
            <input
              type="text"
              value={contactState.subtitle}
              onChange={(e) => setContactState({ ...contactState, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-ginosko-gold" /> Physical Headquarters Address
            </label>
            <textarea
              rows={2}
              value={contactState.address}
              onChange={(e) => setContactState({ ...contactState, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-ginosko-gold" /> Phone Hotline Numbers
            </label>
            <textarea
              rows={2}
              value={contactState.phone}
              onChange={(e) => setContactState({ ...contactState, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-ginosko-gold" /> Official Inquiry Email
            </label>
            <input
              type="email"
              value={contactState.email}
              onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-ginosko-gold" /> Atelier Operating Hours
            </label>
            <input
              type="text"
              value={contactState.hours}
              onChange={(e) => setContactState({ ...contactState, hours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-ginosko-gold" /> Google Maps Embed URL
            </label>
            <input
              type="text"
              value={contactState.mapEmbedUrl}
              onChange={(e) => setContactState({ ...contactState, mapEmbedUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Direct Number
            </label>
            <input
              type="text"
              value={contactState.whatsapp}
              onChange={(e) => setContactState({ ...contactState, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">Instagram Link</label>
            <input
              type="text"
              value={contactState.instagram}
              onChange={(e) => setContactState({ ...contactState, instagram: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={handleSaveContact}
            className="px-6 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 text-xs cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Contact Details
          </button>
        </div>
      </div>
    </div>
  );
}
