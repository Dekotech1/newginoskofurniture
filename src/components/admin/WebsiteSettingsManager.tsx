import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Settings, Save, CheckCircle, Globe, Shield, ToggleLeft, ToggleRight } from "lucide-react";

export default function WebsiteSettingsManager() {
  const { cmsData, updateSection } = useCMS();
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [settingsState, setSettingsState] = useState(cmsData.settings);

  const handleSaveSettings = async () => {
    const ok = await updateSection("settings", settingsState);
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
            <Globe className="w-6 h-6 text-ginosko-gold" /> Global Website Settings
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Site identity, branding colors, contact email routing, AI features, and analytics integrations.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Website Settings
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Website settings updated successfully!
        </div>
      )}

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">Website Title Name</label>
            <input
              type="text"
              value={settingsState.siteName}
              onChange={(e) => setSettingsState({ ...settingsState, siteName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">Primary Brand Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settingsState.primaryColor}
                onChange={(e) => setSettingsState({ ...settingsState, primaryColor: e.target.value })}
                className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer"
              />
              <input
                type="text"
                value={settingsState.primaryColor}
                onChange={(e) => setSettingsState({ ...settingsState, primaryColor: e.target.value })}
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-ginosko-gold font-mono text-xs focus:outline-none focus:border-ginosko-gold"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-400 mb-1">Site Description</label>
            <textarea
              rows={2}
              value={settingsState.siteDescription}
              onChange={(e) => setSettingsState({ ...settingsState, siteDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">Contact Routing Email</label>
            <input
              type="text"
              value={settingsState.contactEmail}
              onChange={(e) => setSettingsState({ ...settingsState, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-1">Google Analytics ID (G-XXXXX)</label>
            <input
              type="text"
              value={settingsState.googleAnalyticsId}
              onChange={(e) => setSettingsState({ ...settingsState, googleAnalyticsId: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono text-xs focus:outline-none focus:border-ginosko-gold"
            />
          </div>
        </div>

        {/* AI Quote Advisor Toggle */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white">Gemini AI Space Planner & Quote Advisor</h4>
            <p className="text-xs text-stone-400">Enable or disable the interactive AI Space Planner modal for website visitors.</p>
          </div>

          <button
            onClick={() => setSettingsState({ ...settingsState, enableAiQuoteAdvisor: !settingsState.enableAiQuoteAdvisor })}
            className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
              settingsState.enableAiQuoteAdvisor
                ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                : "bg-stone-800 text-stone-400 border-stone-700"
            }`}
          >
            {settingsState.enableAiQuoteAdvisor ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5" />}
            {settingsState.enableAiQuoteAdvisor ? "AI Advisor Active" : "AI Advisor Disabled"}
          </button>
        </div>
      </div>
    </div>
  );
}
