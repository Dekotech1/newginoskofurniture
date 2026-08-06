import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Testimonial } from "../../types";
import { MessageSquareQuote, Plus, Edit3, Trash2, Save, CheckCircle, Star } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function TestimonialsManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const testimonials = cmsData.testimonials || [];

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return;
    let updated = [];
    const exists = testimonials.some((t) => t.id === editingTestimonial.id);
    if (exists) {
      updated = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
    } else {
      updated = [...testimonials, editingTestimonial];
    }

    const ok = await updateSection("testimonials", updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingTestimonial(null);
    }
  };

  const handleCreateTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `testi-${Date.now()}`,
      name: "Arc. Ibrahim Sanusi",
      role: "Lead Principal Architect",
      company: "Sanusi & Associates Ltd.",
      comment: "Ginosko delivered custom woodwork and joinery precision that elevated our residential luxury villa project.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    };
    setEditingTestimonial(newTestimonial);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Are you sure you want to delete this client testimonial?")) {
      const updated = testimonials.filter((t) => t.id !== id);
      await updateSection("testimonials", updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-ginosko-gold" /> Client Testimonials & Endorsements
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage client reviews, architectural quotes, star ratings, and developer feedback.
          </p>
        </div>

        <button
          onClick={handleCreateTestimonial}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Client testimonials list saved and updated live!
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
                  {item.company}
                </span>
              </div>

              <p className="text-xs text-stone-300 italic leading-relaxed">
                "{item.comment}"
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-ginosko-gold/40"
                />
                <div>
                  <div className="text-sm font-bold text-white leading-tight">{item.name}</div>
                  <div className="text-[11px] text-ginosko-gold font-medium">{item.role}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingTestimonial(item)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                title="Edit Testimonial"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTestimonial(item.id)}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                title="Delete Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Editor Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Edit testimonial
              </h3>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    placeholder="Full name..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    placeholder="e.g. Chief Architect"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Firm</label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    placeholder="Company name..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Testimonial Quote</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.comment}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })}
                  placeholder="Client feedback paragraph..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <ImageUploader
                  label="Client Profile Picture"
                  value={editingTestimonial.image}
                  onChange={(url) => setEditingTestimonial({ ...editingTestimonial, image: url })}
                  folder="Client Avatars"
                  aspectRatio="square"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTestimonial}
                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-all flex items-center gap-1.5 text-xs cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" /> Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
