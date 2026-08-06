import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Search, Filter, Eye, FolderPlus, FileText } from "lucide-react";

export default function MediaLibraryManager() {
  const { cmsData, uploadMedia, deleteMedia } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newMediaName, setNewMediaName] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);

  if (!cmsData) return null;

  const mediaList = cmsData.media;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        setIsUploading(true);
        await uploadMedia({
          name: file.name,
          url: result,
          type: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "document",
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dimensions: "Original Aspect Ratio",
          folder: "Uploads"
        });
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaName || !newMediaUrl) return;
    setIsUploading(true);
    await uploadMedia({
      name: newMediaName,
      url: newMediaUrl,
      type: "image",
      size: "External URL",
      folder: "General"
    });
    setNewMediaName("");
    setNewMediaUrl("");
    setIsUploading(false);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this media asset?")) {
      await deleteMedia(id);
    }
  };

  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === "All" || m.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-ginosko-gold" /> Media Library & Digital Assets
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Upload, manage, organize, and copy image links for furniture models, site renders, and team profiles.
          </p>
        </div>

        <label className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg">
          <Upload className="w-4 h-4" /> Upload Local Image
          <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Drag & Drop Upload Dropzone */}
      <div className="p-6 rounded-2xl bg-stone-900 border-2 border-dashed border-stone-800 hover:border-ginosko-gold/60 transition-all text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-stone-800 text-ginosko-gold flex items-center justify-center mx-auto shadow-inner">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Upload Pictures Directly from Device</h3>
          <p className="text-xs text-stone-400 mt-1">Select photos from your device, computer, or camera to store in the CMS Media Library</p>
        </div>
        <label className="inline-flex px-5 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold text-xs cursor-pointer hover:bg-yellow-400 transition-all shadow-lg">
          {isUploading ? "Uploading Picture..." : "Choose Image File"}
          <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* URL Upload Box (Optional) */}
      <form onSubmit={handleUrlSubmit} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
        <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
          <FolderPlus className="w-4 h-4 text-ginosko-gold" /> Quick Import via Image URL
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Image Title (e.g. Executive Teak Desk)"
            value={newMediaName}
            onChange={(e) => setNewMediaName(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:border-ginosko-gold"
          />
          <input
            type="text"
            placeholder="Image URL (https://...)"
            value={newMediaUrl}
            onChange={(e) => setNewMediaUrl(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:border-ginosko-gold"
          />
          <button
            type="submit"
            disabled={isUploading || !newMediaName || !newMediaUrl}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-ginosko-gold font-semibold text-xs border border-stone-700 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isUploading ? "Uploading..." : "Save Image to Library"}
          </button>
        </div>
      </form>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
          <input
            type="text"
            placeholder="Search media files by filename..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold"
          />
        </div>
      </div>

      {/* Media Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg hover:border-ginosko-gold/50 transition-all flex flex-col justify-between"
          >
            <div
              onClick={() => setPreviewMedia(media)}
              className="relative aspect-square overflow-hidden bg-stone-950 cursor-pointer"
            >
              <img
                src={media.url}
                alt={media.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="p-2 rounded-full bg-black/80 text-ginosko-gold">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="p-3 space-y-1">
              <h4 className="text-xs font-semibold text-white truncate" title={media.name}>
                {media.name}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <span>{media.size}</span>
                <span>{media.dimensions || "Image"}</span>
              </div>
            </div>

            <div className="p-2 pt-0 border-t border-stone-800/80 flex items-center justify-between">
              <button
                onClick={() => handleCopy(media.url, media.id)}
                className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy Image URL"
              >
                {copiedId === media.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedId === media.id ? "Copied" : "Copy URL"}
              </button>

              <button
                onClick={() => handleDelete(media.id)}
                className="p-1 rounded-lg text-rose-400 hover:bg-rose-950/60 cursor-pointer transition-colors"
                title="Delete Media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Media Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white text-sm cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-display font-bold text-white pr-8">{previewMedia.name}</h3>

            <div className="relative rounded-xl overflow-hidden border border-stone-800 max-h-[60vh] flex items-center justify-center bg-stone-950">
              <img src={previewMedia.url} alt={previewMedia.name} className="max-h-[60vh] object-contain" />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-800 pt-3">
              <div>
                <span>Uploaded: {new Date(previewMedia.uploadedAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>Size: {previewMedia.size}</span>
              </div>
              <button
                onClick={() => handleCopy(previewMedia.url, previewMedia.id)}
                className="px-4 py-1.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Image URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
