import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Users, Save, CheckCircle, Plus, Trash2, Building } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function AboutManager() {
  const { cmsData, updateSection } = useCMS();
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [aboutState, setAboutState] = useState(cmsData.about);

  const handleSaveAbout = async () => {
    const ok = await updateSection("about", aboutState);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: `team-${Date.now()}`,
      name: "Master Craftsman",
      role: "Lead Joinery Engineer",
      desc: "Specializing in custom timber veneers and CNC precision joinery.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      email: "joinery@ginoskoconstruction.com",
      phone: "+234 803 000 0000"
    };
    setAboutState({
      ...aboutState,
      teamMembers: [...aboutState.teamMembers, newMember]
    });
  };

  const handleDeleteTeamMember = (index: number) => {
    if (confirm("Remove team member?")) {
      const updated = aboutState.teamMembers.filter((_, i) => i !== index);
      setAboutState({ ...aboutState, teamMembers: updated });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-ginosko-gold" /> About Atelier & Leadership Team
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage company legacy, founding story, studio location, and leadership/craftsmen profiles.
          </p>
        </div>

        <button
          onClick={handleSaveAbout}
          className="px-5 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 text-xs cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" /> Save About Details
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" /> About section saved and updated live!
        </div>
      )}

      {/* Main Story & Parameters */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-ginosko-gold" /> Atelier Story & Foundations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-400 mb-1">Badge Tagline</label>
            <input
              type="text"
              value={aboutState.badge}
              onChange={(e) => setAboutState({ ...aboutState, badge: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-400 mb-1">Founding Year</label>
            <input
              type="text"
              value={aboutState.foundingYear}
              onChange={(e) => setAboutState({ ...aboutState, foundingYear: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-stone-400 mb-1">Section Main Headline</label>
            <input
              type="text"
              value={aboutState.title}
              onChange={(e) => setAboutState({ ...aboutState, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-stone-400 mb-1">Company History & Mission Statement</label>
            <textarea
              rows={4}
              value={aboutState.description}
              onChange={(e) => setAboutState({ ...aboutState, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-stone-400 mb-1">Studio Headquarters City</label>
            <input
              type="text"
              value={aboutState.studioLocation}
              onChange={(e) => setAboutState({ ...aboutState, studioLocation: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
            />
          </div>
        </div>
      </div>

      {/* Leadership & Master Craftsmen Team */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-ginosko-gold" /> Leadership & Craftsmen Profiles
          </h3>
          <button
            onClick={handleAddTeamMember}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-ginosko-gold text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Team Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutState.teamMembers?.map((member, index) => (
            <div
              key={member.id || index}
              className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 relative text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-ginosko-gold uppercase tracking-wider">
                  Member #{index + 1}
                </span>
                <button
                  onClick={() => handleDeleteTeamMember(index)}
                  className="p-1 rounded-md bg-rose-950/80 text-rose-300 hover:bg-rose-900 cursor-pointer"
                  title="Remove Profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-400">Full Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...aboutState.teamMembers];
                      updated[index].name = e.target.value;
                      setAboutState({ ...aboutState, teamMembers: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1 focus:outline-none focus:border-ginosko-gold"
                  />
                </div>

                <div>
                  <label className="text-stone-400">Role Title</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => {
                      const updated = [...aboutState.teamMembers];
                      updated[index].role = e.target.value;
                      setAboutState({ ...aboutState, teamMembers: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1 focus:outline-none focus:border-ginosko-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400">Biography / Specialty</label>
                <textarea
                  rows={2}
                  value={member.desc}
                  onChange={(e) => {
                    const updated = [...aboutState.teamMembers];
                    updated[index].desc = e.target.value;
                    setAboutState({ ...aboutState, teamMembers: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1 focus:outline-none focus:border-ginosko-gold"
                />
              </div>

              <div>
                <ImageUploader
                  label="Profile Picture"
                  value={member.image}
                  onChange={(url) => {
                    const updated = [...aboutState.teamMembers];
                    updated[index].image = url;
                    setAboutState({ ...aboutState, teamMembers: updated });
                  }}
                  folder="Team Members"
                  aspectRatio="square"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={handleSaveAbout}
            className="px-6 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 text-xs cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" /> Save About Details
          </button>
        </div>
      </div>
    </div>
  );
}
