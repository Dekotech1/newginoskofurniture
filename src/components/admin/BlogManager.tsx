import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { BlogItem } from "../../types";
import { TrendingUp, Plus, Edit3, Trash2, Save, CheckCircle, Search, Calendar, User, Clock, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function BlogManager() {
  const { cmsData, updateSection } = useCMS();
  const [editingPost, setEditingPost] = useState<BlogItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const blogPosts = cmsData.blog;

  const handleSavePost = async () => {
    if (!editingPost) return;
    let updatedPosts = [];
    const exists = blogPosts.some((b) => b.id === editingPost.id);
    if (exists) {
      updatedPosts = blogPosts.map((b) => (b.id === editingPost.id ? editingPost : b));
    } else {
      updatedPosts = [editingPost, ...blogPosts];
    }

    const ok = await updateSection("blog", updatedPosts);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingPost(null);
    }
  };

  const handleCreatePost = () => {
    const newPost: BlogItem = {
      id: `blog-${Date.now()}`,
      title: "New Joinery & Architectural Insight",
      excerpt: "An overview of contemporary hardwood craftsmanship and timber drying techniques.",
      content: "Deep exploration of timber joinery, wood selection, and architectural finishes.",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "Ginosko Atelier Director",
      readTime: "5 min read",
      category: "Woodwork & Joinery",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
    };
    setEditingPost(newPost);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updated = blogPosts.filter((b) => b.id !== id);
      await updateSection("blog", updated);
    }
  };

  const filteredPosts = blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-ginosko-gold" /> Blog & Insights Management
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Publish woodworking articles, architectural design trends, and timber joinery guides.
          </p>
        </div>

        <button
          onClick={handleCreatePost}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> Blog post updated and published live!
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
        <input
          type="text"
          placeholder="Search articles by title, category, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold"
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all group"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-stone-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-ginosko-gold border border-ginosko-gold/30 text-[10px] font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-ginosko-gold" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-ginosko-gold" /> {post.readTime}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-ginosko-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-stone-400 text-xs line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-800/60 mt-3 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono truncate max-w-[140px]">
                By {post.author}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                  title="Edit Post"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Editor Modal - Inspired by xubraminenig.com/admin/projects */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Edit article
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Article Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="Title..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                />
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    placeholder="e.g. Joinery Guide"
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    placeholder="Author name..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>
              </div>

              {/* Date & Read time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Publishing Date</label>
                  <input
                    type="text"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                  />
                </div>
              </div>

              {/* Cover Image Uploader */}
              <div>
                <ImageUploader
                  label="Cover image"
                  value={editingPost.image}
                  onChange={(url) => setEditingPost({ ...editingPost, image: url })}
                  folder="Blog Covers"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Short summary..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-xs transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
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
