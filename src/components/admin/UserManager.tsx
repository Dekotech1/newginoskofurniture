import React, { useState } from "react";
import { useCMS, CMSUser } from "../../context/CMSContext";
import { Users, Plus, Trash2, Edit3, Shield, CheckCircle, Lock, Mail } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function UserManager() {
  const { cmsData, user: currentUser, saveUserAccount, deleteUserAccount } = useCMS();
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const users = cmsData.users;

  const handleSaveUser = async () => {
    if (!editingUser) return;
    const ok = await saveUserAccount(editingUser);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setEditingUser(null);
    }
  };

  const handleCreateUser = () => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: "New Administrator",
      email: `editor${Date.now().toString().slice(-3)}@ginosko.com`,
      role: "Editor" as const,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      password: "ginosko2026"
    };
    setEditingUser(newUser);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this user account?")) {
      await deleteUserAccount(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-ginosko-gold" /> Admin User Management & Roles
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Configure access roles (Super Admin, Admin, Editor, Author, Viewer) and team login credentials.
          </p>
        </div>

        <button
          onClick={handleCreateUser}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" /> Invite Admin User
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> User account updated successfully!
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-ginosko-gold/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={u.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"}
                alt={u.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-ginosko-gold/40"
              />
              <div>
                <h3 className="text-base font-display font-bold text-white">{u.name}</h3>
                <span className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-ginosko-gold" /> {u.email}
                </span>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-ginosko-gold/20 text-ginosko-gold border border-ginosko-gold/30 text-[10px] font-semibold uppercase">
                  {u.role}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
              <span>
                Joined: {new Date(u.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingUser({ ...u, password: "" })}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Edit User"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                {users.length > 1 && u.id !== currentUser?.id && (
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Editor Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-display font-bold text-white">
                Configure User Account
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Access Role Permission</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-sm"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Admin">Admin (Content & Users)</option>
                  <option value="Editor">Editor (Content Edit Only)</option>
                  <option value="Author">Author (Create Posts Only)</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>

              <div>
                <ImageUploader
                  label="Profile Avatar Picture"
                  value={editingUser.avatar || ""}
                  onChange={(url) => setEditingUser({ ...editingUser, avatar: url })}
                  folder="Avatars"
                  aspectRatio="square"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Set Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep existing password"
                  value={editingUser.password || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-5 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all text-sm cursor-pointer shadow-lg"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
