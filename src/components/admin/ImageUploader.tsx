import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Upload, Image as ImageIcon, FolderOpen, Trash2, Check, X, Link } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUploader({
  label = "Upload Image",
  value,
  onChange,
  folder = "CMS Uploads",
  className = "",
  aspectRatio = "auto"
}: ImageUploaderProps) {
  const { cmsData, uploadMedia } = useCMS();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState(value || "");
  const [isProcessing, setIsProcessing] = useState(false);

  // File Upload Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        // Automatically save to Media Library in CMSContext
        if (uploadMedia) {
          try {
            await uploadMedia({
              name: file.name,
              url: dataUrl,
              type: "image",
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              folder: folder
            });
          } catch (err) {
            console.warn("Media auto-save warning:", err);
          }
        }
        onChange(dataUrl);
        setUrlDraft(dataUrl);
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      alert("Failed to read image file. Please try a different photo.");
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlDraft) {
      onChange(urlDraft);
      setShowUrlInput(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setUrlDraft("");
  };

  const mediaList = cmsData?.media || [];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-stone-300">
          {label}
        </label>
      )}

      {/* Cover Image Box matching the inspiration UI layout */}
      <div className="space-y-2">
        {value ? (
          <div className="flex flex-col items-start gap-2">
            <div className="relative group w-28 h-28 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 shadow-md flex items-center justify-center">
              <img
                src={value}
                alt="Cover Preview"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-rose-400 hover:text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remove Picture"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all shadow-sm">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                {isProcessing ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isProcessing}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs flex items-center gap-1 cursor-pointer"
                title="Choose from CMS Library"
              >
                <FolderOpen className="w-3.5 h-3.5 text-ginosko-gold" />
                Library
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2">
            <div className="w-28 h-28 rounded-xl bg-slate-900/80 border-2 border-dashed border-slate-700/80 flex flex-col items-center justify-center text-slate-500 gap-1 p-2 text-center">
              <ImageIcon className="w-6 h-6 text-slate-400" />
              <span className="text-[10px]">No image</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all shadow-sm">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                {isProcessing ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isProcessing}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs flex items-center gap-1 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-ginosko-gold" />
                Library
              </button>
            </div>
          </div>
        )}

        {/* Secondary URL toggle */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-stone-400 hover:text-ginosko-gold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Link className="w-3 h-3" />
            {showUrlInput ? "Hide image URL field" : "Optionally paste external image URL"}
          </button>
          {value && (
            <span className="text-stone-500 font-mono truncate max-w-[180px]">
              {value.startsWith("data:") ? "Local Upload (Base64)" : value}
            </span>
          )}
        </div>

        {showUrlInput && (
          <form onSubmit={handleApplyUrl} className="flex gap-2 pt-1">
            <input
              type="text"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-ginosko-gold"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-ginosko-gold text-ginosko-dark text-xs font-bold hover:bg-yellow-400 cursor-pointer"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Media Library Selector Modal */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-ginosko-gold" />
                Select Image from CMS Media Library
              </h3>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {mediaList.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto text-stone-600" />
                  <p className="text-xs">No media assets in library yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onChange(item.url);
                        setUrlDraft(item.url);
                        setIsLibraryOpen(false);
                      }}
                      className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer aspect-square bg-stone-950 ${
                        value === item.url
                          ? "border-ginosko-gold ring-2 ring-ginosko-gold/40"
                          : "border-stone-800 hover:border-stone-600"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] text-stone-200 truncate">
                        {item.name}
                      </div>
                      {value === item.url && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-ginosko-gold text-ginosko-dark flex items-center justify-center shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs">
              <label className="px-3.5 py-1.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold hover:bg-yellow-400 cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Upload New Image File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                    setIsLibraryOpen(false);
                  }}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
