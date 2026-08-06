import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { JobOpening } from "../../types";
import { Briefcase, Plus, Edit3, Trash2, Save, CheckCircle, MapPin, Clock } from "lucide-react";

export default function CareersManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const careers = cmsData.careers || [];

  const handleSaveJob = async () => {
    if (!editingJob) return;
    let updated = [];
    const exists = careers.some((j) => j.id === editingJob.id);
    if (exists) {
      updated = careers.map((j) => (j.id === editingJob.id ? editingJob : j));
    } else {
      updated = [...careers, editingJob];
    }

    const ok = await updateSection("careers", updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingJob(null);
    }
  };

  const handleCreateJob = () => {
    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: "Senior Master Joiner & Cabinetmaker",
      department: "Furniture",
      location: "Abuja Atelier & Factory",
      type: "Full-Time",
      experience: "5+ Years Precision Woodworking",
      description: "Operate high-end woodworking machinery, oversee hardwood joinery assembly, and mentor apprentice craftsmen.",
      requirements: [
        "Proficiency in solid wood jointing & veneering",
        "Ability to read technical architectural shop drawings",
        "Uncompromising attention to detail & finish coat application"
      ]
    };
    setEditingJob(newJob);
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      const updated = careers.filter((j) => j.id !== id);
      await updateSection("careers", updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-ginosko-gold" /> Careers & Master Craftsmen Recruitment
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage open architectural, joinery, civil engineering, and artisan positions.
          </p>
        </div>

        <button
          onClick={handleCreateJob}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Career Opening
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Career openings list saved and updated live!
        </div>
      )}

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((job) => (
          <div
            key={job.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-ginosko-gold/10 text-ginosko-gold border border-ginosko-gold/30 text-[10px] font-semibold uppercase tracking-wider">
                  {job.department}
                </span>
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-stone-500" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-500" /> {job.type}</span>
                </div>
              </div>

              <h3 className="text-lg font-display font-bold text-white">
                {job.title}
              </h3>

              <div className="text-xs text-stone-400 font-mono">
                Req. Experience: <span className="text-stone-200">{job.experience}</span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {job.description}
              </p>

              {job.requirements && job.requirements.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">Key Requirements:</span>
                  <ul className="text-xs text-stone-400 space-y-1 list-disc list-inside">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingJob(job)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                title="Edit Job"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                title="Delete Job"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Editor Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Edit job position
              </h3>
              <button
                onClick={() => setEditingJob(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Position Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  placeholder="Job title..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                  <select
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value="Furniture">Furniture & Joinery</option>
                    <option value="Construction">Civil Construction</option>
                    <option value="Design">Architectural Design</option>
                    <option value="Management">Project Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={editingJob.type}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    placeholder="e.g. Abuja Atelier"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={editingJob.experience}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    placeholder="e.g. 3+ Years"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  placeholder="Overview of duties..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Requirements (Comma Separated)</label>
                <input
                  type="text"
                  value={editingJob.requirements?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      requirements: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Req 1, Req 2, Req 3..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setEditingJob(null)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJob}
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
