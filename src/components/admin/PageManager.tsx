import React, { useState } from "react";
import { useCMS, CMSPage } from "../../context/CMSContext";
import { FileText, Plus, Trash2, Edit3, Copy, Eye, CheckCircle, Clock, Save, Search, ArrowUp, ArrowDown } from "lucide-react";

export default function PageManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const pages = cmsData.pages;

  const handleSavePage = async () => {
    if (!editingPage) return;
    const updatedPages = pages.map((p) => (p.id === editingPage.id ? { ...editingPage, updatedAt: new Date().toISOString() } : p));
    const ok = await updateSection("pages", updatedPages);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingPage(null);
    }
  };

  const handleCreatePage = async () => {
    const newPage: CMSPage = {
      id: `page-${Date.now()}`,
      title: "New Custom Page",
      slug: `/custom-page-${Date.now().toString().slice(-4)}`,
      status: "draft",
      seoTitle: "New Custom Page | Ginosko Furniture",
      metaDescription: "Bespoke custom page content.",
      order: pages.length + 1,
      updatedAt: new Date().toISOString()
    };
    const updatedPages = [...pages, newPage];
    await updateSection("pages", updatedPages);
    setEditingPage(newPage);
  };

  const handleDeletePage = async (id: string) => {
    if (pages.length <= 1) {
      alert("Cannot delete the last remaining page.");
      return;
    }
    if (confirm("Are you sure you want to delete this page?")) {
      const updatedPages = pages.filter((p) => p.id !== id);
      await updateSection("pages", updatedPages);
    }
  };

  const handleDuplicatePage = async (page: CMSPage) => {
    const dup: CMSPage = {
      ...page,
      id: `page-${Date.now()}`,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "draft",
      order: pages.length + 1,
      updatedAt: new Date().toISOString()
    };
    await updateSection("pages", [...pages, dup]);
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= pages.length) return;
    const reordered = [...pages];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    // Update order indexes
    reordered.forEach((p, idx) => (p.order = idx + 1));
    await updateSection("pages", reordered);
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-ginosko-gold" /> Page Management
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Create, manage slugs, schedule publishing, duplicate, and configure per-page SEO settings.
          </p>
        </div>

        <button
          onClick={handleCreatePage}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add New Page
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Page configuration saved and updated live!
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
        <input
          type="text"
          placeholder="Search pages by title or slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold"
        />
      </div>

      {/* Pages Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-xs font-semibold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Page Title</th>
                <th className="py-3.5 px-4">Slug URL</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">SEO Title</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredPages.map((page, index) => (
                <tr key={page.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveOrder(index, "up")}
                        disabled={index === 0}
                        className="p-1 hover:text-ginosko-gold disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(index, "down")}
                        disabled={index === pages.length - 1}
                        className="p-1 hover:text-ginosko-gold disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <span>{page.order}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    {page.title}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs text-ginosko-gold">
                    {page.slug}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        page.status === "published"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                          : page.status === "draft"
                          ? "bg-amber-950/80 text-amber-400 border border-amber-800"
                          : "bg-blue-950/80 text-blue-400 border border-blue-800"
                      }`}
                    >
                      {page.status === "published" && <CheckCircle className="w-3 h-3" />}
                      {page.status === "draft" && <Clock className="w-3 h-3" />}
                      {page.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-400 max-w-xs truncate">
                    {page.seoTitle}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPage(page)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Page Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicatePage(page)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="Duplicate Page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePage(page.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Page Drawer / Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-xl font-display font-bold text-white">
                Edit Page: {editingPage.title}
              </h3>
              <button
                onClick={() => setEditingPage(null)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Page Title</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Page Slug URL</label>
                <input
                  type="text"
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-ginosko-gold font-mono text-xs focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Publishing Status</label>
                <select
                  value={editingPage.status}
                  onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={editingPage.seoTitle}
                  onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={editingPage.metaDescription}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePage}
                className="px-5 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" /> Save Page Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
