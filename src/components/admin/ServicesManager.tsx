import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { ServiceItem } from "../../types";
import { Briefcase, Plus, Edit3, Trash2, Save, CheckCircle, Search } from "lucide-react";

export default function ServicesManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const services = cmsData.services;

  const handleSaveService = async () => {
    if (!editingService) return;
    let updated = [];
    const exists = services.some((s) => s.id === editingService.id);
    if (exists) {
      updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    } else {
      updated = [...services, editingService];
    }

    const ok = await updateSection("services", updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingService(null);
    }
  };

  const handleCreateService = () => {
    const newService: ServiceItem = {
      id: `serv-${Date.now()}`,
      title: "New Architectural Capability",
      category: "Furniture",
      description: "Custom design and engineering tailored to project requirements.",
      iconName: "Hammer",
      features: [
        "Kiln-dried hardwoods",
        "European hardware integration",
        "Laser-guided alignment"
      ]
    };
    setEditingService(newService);
  };

  const handleDeleteService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const updated = services.filter((s) => s.id !== id);
      await updateSection("services", updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-ginosko-gold" /> Services & Capabilities
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage custom woodwork manufacturing, kitchen systems, civil construction, and interior fit-out services.
          </p>
        </div>

        <button
          onClick={handleCreateService}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Services list saved and updated live!
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((serv) => (
          <div
            key={serv.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-ginosko-gold/10 text-ginosko-gold border border-ginosko-gold/30 text-[10px] font-semibold uppercase tracking-wider">
                  {serv.category}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  Icon: {serv.iconName}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white">
                {serv.title}
              </h3>

              <p className="text-xs text-stone-400 leading-relaxed">
                {serv.description}
              </p>

              <div className="pt-2 space-y-1">
                <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">Features:</span>
                <ul className="text-xs text-stone-400 space-y-1 list-disc list-inside">
                  {serv.features?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingService(serv)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                title="Edit Service"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteService(serv.id)}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Editor Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-xl font-display font-bold text-white">
                Edit Service: {editingService.title}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Category</label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                >
                  <option value="Furniture">Furniture</option>
                  <option value="Construction">Construction</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Icon Name (Lucide Icon)</label>
                <input
                  type="text"
                  value={editingService.iconName}
                  onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Description Paragraph</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Features (Comma separated)</label>
                <input
                  type="text"
                  value={editingService.features?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="px-5 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
