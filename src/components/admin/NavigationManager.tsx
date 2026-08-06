import React, { useState } from "react";
import { useCMS, CMSNavigationItem } from "../../context/CMSContext";
import { Settings, Plus, Trash2, ArrowUp, ArrowDown, Save, CheckCircle, ExternalLink } from "lucide-react";

export default function NavigationManager() {
  const { cmsData, updateSection } = useCMS();
  const [activeMenu, setActiveMenu] = useState<"headerMenu" | "footerMenu">("headerMenu");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [headerLinks, setHeaderLinks] = useState<CMSNavigationItem[]>(cmsData.navigation.headerMenu);
  const [footerLinks, setFooterLinks] = useState<CMSNavigationItem[]>(cmsData.navigation.footerMenu);

  const currentLinks = activeMenu === "headerMenu" ? headerLinks : footerLinks;

  const handleSaveNavigation = async () => {
    const updatedNav = {
      ...cmsData.navigation,
      headerMenu: headerLinks,
      footerMenu: footerLinks
    };
    const ok = await updateSection("navigation", updatedNav);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAddLink = () => {
    const newLink: CMSNavigationItem = {
      id: `nav-${Date.now()}`,
      label: "New Link",
      href: "#section",
      isExternal: false
    };
    if (activeMenu === "headerMenu") {
      setHeaderLinks([...headerLinks, newLink]);
    } else {
      setFooterLinks([...footerLinks, newLink]);
    }
  };

  const handleRemoveLink = (id: string) => {
    if (activeMenu === "headerMenu") {
      setHeaderLinks(headerLinks.filter((l) => l.id !== id));
    } else {
      setFooterLinks(footerLinks.filter((l) => l.id !== id));
    }
  };

  const handleMoveOrder = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const links = activeMenu === "headerMenu" ? [...headerLinks] : [...footerLinks];
    if (targetIdx < 0 || targetIdx >= links.length) return;
    const temp = links[index];
    links[index] = links[targetIdx];
    links[targetIdx] = temp;

    if (activeMenu === "headerMenu") {
      setHeaderLinks(links);
    } else {
      setFooterLinks(links);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-ginosko-gold" /> Navigation & Menu Builder
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Reorder header navigation items and footer quick links.
          </p>
        </div>

        <button
          onClick={handleSaveNavigation}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" /> Save Navigation
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Navigation menus updated live!
        </div>
      )}

      {/* Menu Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveMenu("headerMenu")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeMenu === "headerMenu"
              ? "bg-ginosko-gold text-ginosko-dark"
              : "bg-stone-900 text-stone-400 hover:text-white"
          }`}
        >
          Header Navigation Bar
        </button>
        <button
          onClick={() => setActiveMenu("footerMenu")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeMenu === "footerMenu"
              ? "bg-ginosko-gold text-ginosko-dark"
              : "bg-stone-900 text-stone-400 hover:text-white"
          }`}
        >
          Footer Links Column
        </button>
      </div>

      {/* Navigation Table / List */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-sm font-semibold text-white">
            {activeMenu === "headerMenu" ? "Header Navigation Links" : "Footer Links"}
          </h3>
          <button
            onClick={handleAddLink}
            className="px-3 py-1.5 rounded-lg bg-stone-800 text-xs text-ginosko-gold hover:bg-stone-700 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Menu Item
          </button>
        </div>

        <div className="space-y-3">
          {currentLinks.map((link, index) => (
            <div
              key={link.id}
              className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveOrder(index, "up")}
                  disabled={index === 0}
                  className="p-1 hover:text-ginosko-gold disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveOrder(index, "down")}
                  disabled={index === currentLinks.length - 1}
                  className="p-1 hover:text-ginosko-gold disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-stone-500">#{index + 1}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full text-xs">
                <div>
                  <label className="text-[10px] text-stone-500 block">Menu Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const updated = [...currentLinks];
                      updated[index].label = e.target.value;
                      if (activeMenu === "headerMenu") setHeaderLinks(updated);
                      else setFooterLinks(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 block">Link Target / Anchor (e.g. #about or /page)</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const updated = [...currentLinks];
                      updated[index].href = e.target.value;
                      if (activeMenu === "headerMenu") setHeaderLinks(updated);
                      else setFooterLinks(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-ginosko-gold font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => handleRemoveLink(link.id)}
                className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg cursor-pointer"
                title="Remove Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
