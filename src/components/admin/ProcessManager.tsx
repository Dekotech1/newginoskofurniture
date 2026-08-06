import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { ProcessStep } from "../../types";
import { Layers, Plus, Edit3, Trash2, Save, CheckCircle } from "lucide-react";

export default function ProcessManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const processSteps = cmsData.processSteps || [];

  const handleSaveStep = async () => {
    if (!editingStep) return;
    let updated = [];
    const exists = processSteps.some((s) => s.id === editingStep.id);
    if (exists) {
      updated = processSteps.map((s) => (s.id === editingStep.id ? editingStep : s));
    } else {
      updated = [...processSteps, editingStep];
    }

    const ok = await updateSection("processSteps", updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingStep(null);
    }
  };

  const handleCreateStep = () => {
    const nextNum = (processSteps.length + 1).toString().padStart(2, "0");
    const newStep: ProcessStep = {
      id: Date.now(),
      number: nextNum,
      title: "New Architectural Workflow Step",
      description: "Brief summary of the engineering and artisan phase.",
      details: "Detailed breakdown of millwork, quality checks, and site installation."
    };
    setEditingStep(newStep);
  };

  const handleDeleteStep = async (id: number) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      const updated = processSteps.filter((s) => s.id !== id);
      await updateSection("processSteps", updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-ginosko-gold" /> Architectural Process & Workflow
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Define step-by-step engineering, timber selection, precision joinery, and site installation workflow.
          </p>
        </div>

        <button
          onClick={handleCreateStep}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Process Step
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Architectural process workflow updated and live!
        </div>
      )}

      {/* Process Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processSteps.map((step) => (
          <div
            key={step.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl relative hover:border-ginosko-gold/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-bold text-ginosko-gold font-mono">
                  {step.number}
                </span>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                  Step #{step.number}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white">
                {step.title}
              </h3>

              <p className="text-xs text-stone-300 font-medium">
                {step.description}
              </p>

              <p className="text-xs text-stone-400 leading-relaxed pt-1">
                {step.details}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingStep(step)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                title="Edit Step"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteStep(step.id)}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                title="Delete Step"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Step Editor Modal */}
      {editingStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Edit process step
              </h3>
              <button
                onClick={() => setEditingStep(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Step Number</label>
                  <input
                    type="text"
                    value={editingStep.number}
                    onChange={(e) => setEditingStep({ ...editingStep, number: e.target.value })}
                    placeholder="01"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingStep.title}
                    onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                    placeholder="Step Title..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={editingStep.description}
                  onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                  placeholder="Overview text..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Technical Breakdown</label>
                <textarea
                  rows={4}
                  value={editingStep.details}
                  onChange={(e) => setEditingStep({ ...editingStep, details: e.target.value })}
                  placeholder="In-depth step details..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setEditingStep(null)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStep}
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
