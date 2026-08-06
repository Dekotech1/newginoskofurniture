import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Project } from "../../types";
import { FolderKanban, Plus, Edit3, Trash2, Save, CheckCircle, Search, MapPin, Calendar, Building, DollarSign } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function PortfolioManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const projects = cmsData.projects;

  const handleSaveProject = async () => {
    if (!editingProject) return;
    let updated = [];
    const exists = projects.some((p) => p.id === editingProject.id);
    if (exists) {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    } else {
      updated = [editingProject, ...projects];
    }

    const ok = await updateSection("projects", updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingProject(null);
    }
  };

  const handleCreateProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: "New Architectural Landmark",
      category: "Residential",
      location: "Lekki Phase 1, Lagos",
      description: "Custom turnkey luxury interior and joinery fit-out.",
      details: "Spanning 600m², this project features solid teak wood panels and custom kitchen cabinetry.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      year: new Date().getFullYear().toString(),
      size: "650 m²",
      architect: "Ginosko Design Studio"
    };
    setEditingProject(newProject);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      await updateSection("projects", updated);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-ginosko-gold" /> Portfolio & Project Management
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage architectural construction projects, custom furniture commissions, and villa interior fit-outs.
          </p>
        </div>

        <button
          onClick={handleCreateProject}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Project updated and published to live website portfolio!
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
        <input
          type="text"
          placeholder="Search projects by title, category, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-950">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-ginosko-gold border border-ginosko-gold/30 text-[10px] font-semibold uppercase tracking-wider">
                  {proj.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-stone-300 text-[10px] font-mono">
                  {proj.year}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-display font-bold text-white group-hover:text-ginosko-gold transition-colors">
                  {proj.name}
                </h3>

                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-ginosko-gold" /> {proj.location}
                </p>

                <p className="text-stone-400 text-xs line-clamp-3 leading-relaxed pt-1">
                  {proj.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-800/60 mt-3 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-mono">
                {proj.size || "Bespoke Size"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProject(proj)}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal - Inspired by xubraminenig.com/admin/projects */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Edit project
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  placeholder="Project title..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  >
                    <option value="Furniture">Furniture & Joinery</option>
                    <option value="Residential">Residential Villa</option>
                    <option value="Commercial">Commercial Fit-Out</option>
                    <option value="Interior Design">Interior Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                  <select
                    value={editingProject.year ? "Completed" : "Ongoing"}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value === "Completed" ? "2026" : "Ongoing" })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  >
                    <option value="Ongoing">Ongoing Construction</option>
                    <option value="Completed">Completed Landmark</option>
                    <option value="Planned">Planned Concept</option>
                  </select>
                </div>
              </div>

              {/* Location & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Duration / Footprint</label>
                  <input
                    type="text"
                    value={editingProject.size || editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, size: e.target.value })}
                    placeholder="e.g. 18 Months / 650 m²"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Overview description..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                />
              </div>

              {/* Cover Image Uploader */}
              <div>
                <ImageUploader
                  label="Cover image"
                  value={editingProject.image}
                  onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                  folder="Portfolio Projects"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
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
