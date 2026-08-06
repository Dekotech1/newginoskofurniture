import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Search, Save, CheckCircle, Globe, Share2, FileCode } from "lucide-react";

export default function SeoManager() {
  const { cmsData, updateSection } = useCMS();
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [seoState, setSeoState] = useState(cmsData.seo);

  const handleSaveSeo = async () => {
    const ok = await updateSection("seo", seoState);
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
            <Search className="w-6 h-6 text-ginosko-gold" /> Search Engine Optimization (SEO)
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Global meta tags, Open Graph social share cards, canonical URL targets, and automated sitemap generator.
          </p>
        </div>

        <button
          onClick={handleSaveSeo}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" /> Save SEO Meta
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> SEO meta configuration saved!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Meta Form */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <h3 className="text-lg font-display font-semibold text-white border-b border-stone-800 pb-3">
            Default Meta Configuration
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Default Meta Title Tag</label>
              <input
                type="text"
                value={seoState.defaultTitle}
                onChange={(e) => setSeoState({ ...seoState, defaultTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Default Meta Description</label>
              <textarea
                rows={3}
                value={seoState.defaultDescription}
                onChange={(e) => setSeoState({ ...seoState, defaultDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">SEO Search Keywords (Comma Separated)</label>
              <input
                type="text"
                value={seoState.keywords}
                onChange={(e) => setSeoState({ ...seoState, keywords: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">OpenGraph Social Share Image URL</label>
              <input
                type="text"
                value={seoState.ogImage}
                onChange={(e) => setSeoState({ ...seoState, ogImage: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-ginosko-gold font-mono text-xs focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Canonical Base Domain URL</label>
              <input
                type="text"
                value={seoState.canonicalBaseUrl}
                onChange={(e) => setSeoState({ ...seoState, canonicalBaseUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono text-xs focus:outline-none focus:border-ginosko-gold"
              />
            </div>
          </div>
        </div>

        {/* Live Search Result Preview */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-ginosko-gold" /> Google Search Result Preview
            </h3>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1 font-sans">
              <div className="text-[11px] text-stone-400 font-mono truncate">
                {seoState.canonicalBaseUrl || "https://ginosko-app.com"}
              </div>
              <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {seoState.defaultTitle}
              </div>
              <div className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                {seoState.defaultDescription}
              </div>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-ginosko-gold" /> Social Card Preview (LinkedIn / X)
            </h3>

            <div className="rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
              <img src={seoState.ogImage} alt="OG Preview" className="w-full h-32 object-cover" />
              <div className="p-3 space-y-1">
                <span className="text-[10px] text-stone-500 uppercase font-mono">{seoState.canonicalBaseUrl}</span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{seoState.defaultTitle}</h4>
                <p className="text-[11px] text-stone-400 line-clamp-2">{seoState.defaultDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
