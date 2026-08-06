import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { Layout, Save, CheckCircle, Image as ImageIcon, Plus, Trash2, Edit2, Users, HelpCircle, PhoneCall, Building } from "lucide-react";

export default function HomepageBuilder() {
  const { cmsData, updateSection } = useCMS();
  const [activeSubTab, setActiveSubTab] = useState<"hero" | "about" | "testimonials" | "partners" | "faqs" | "contact" | "footer">("hero");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!cmsData) return null;

  const [heroState, setHeroState] = useState(cmsData.hero);
  const [aboutState, setAboutState] = useState(cmsData.about);
  const [testimonialsState, setTestimonialsState] = useState(cmsData.testimonials);
  const [partnersState, setPartnersState] = useState(cmsData.partners);
  const [faqsState, setFaqsState] = useState(cmsData.faqs);
  const [contactState, setContactState] = useState(cmsData.contact);
  const [footerState, setFooterState] = useState(cmsData.footer);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const saveHero = async () => {
    const ok = await updateSection("hero", heroState);
    if (ok) triggerSaveNotification();
  };

  const saveAbout = async () => {
    const ok = await updateSection("about", aboutState);
    if (ok) triggerSaveNotification();
  };

  const saveTestimonials = async () => {
    const ok = await updateSection("testimonials", testimonialsState);
    if (ok) triggerSaveNotification();
  };

  const savePartners = async () => {
    const ok = await updateSection("partners", partnersState);
    if (ok) triggerSaveNotification();
  };

  const saveFaqs = async () => {
    const ok = await updateSection("faqs", faqsState);
    if (ok) triggerSaveNotification();
  };

  const saveContact = async () => {
    const ok = await updateSection("contact", contactState);
    if (ok) triggerSaveNotification();
  };

  const saveFooter = async () => {
    const ok = await updateSection("footer", footerState);
    if (ok) triggerSaveNotification();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Layout className="w-6 h-6 text-ginosko-gold" /> Homepage Section Builder
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Directly modify text, imagery, button targets, FAQs, and contact info displayed on the live homepage.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-sm flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-5 h-5 text-emerald-400" /> Section changes saved successfully and updated on live site!
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-2">
        {[
          { id: "hero", label: "Hero Banner", icon: Layout },
          { id: "about", label: "About & Team", icon: Users },
          { id: "testimonials", label: "Testimonials", icon: Building },
          { id: "partners", label: "Client Logos", icon: Building },
          { id: "faqs", label: "FAQ Manager", icon: HelpCircle },
          { id: "contact", label: "Contact Details", icon: PhoneCall },
          { id: "footer", label: "Footer Info", icon: Layout }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-ginosko-gold text-ginosko-dark shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sub-Tab 1: HERO */}
      {activeSubTab === "hero" && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-lg font-display font-semibold text-white">Hero Welcome Banner Settings</h3>
            <button
              onClick={saveHero}
              className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Save Hero Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Top Badge Tag</label>
              <input
                type="text"
                value={heroState.badge}
                onChange={(e) => setHeroState({ ...heroState, badge: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Headline Part 1</label>
              <input
                type="text"
                value={heroState.headlinePart1}
                onChange={(e) => setHeroState({ ...heroState, headlinePart1: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Gold Highlight Text</label>
              <input
                type="text"
                value={heroState.headlineGold}
                onChange={(e) => setHeroState({ ...heroState, headlineGold: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-ginosko-gold focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Headline Part 2</label>
              <input
                type="text"
                value={heroState.headlinePart2}
                onChange={(e) => setHeroState({ ...heroState, headlinePart2: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-400 mb-1">Subheading Paragraph</label>
              <textarea
                rows={3}
                value={heroState.subheading}
                onChange={(e) => setHeroState({ ...heroState, subheading: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Primary Button Label</label>
              <input
                type="text"
                value={heroState.primaryButtonText}
                onChange={(e) => setHeroState({ ...heroState, primaryButtonText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Secondary Button Label</label>
              <input
                type="text"
                value={heroState.secondaryButtonText}
                onChange={(e) => setHeroState({ ...heroState, secondaryButtonText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-400 mb-1">Background Hero Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroState.backgroundImage}
                  onChange={(e) => setHeroState({ ...heroState, backgroundImage: e.target.value })}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold text-xs"
                />
              </div>
              {heroState.backgroundImage && (
                <div className="mt-3 relative h-36 w-full rounded-xl overflow-hidden border border-stone-800">
                  <img src={heroState.backgroundImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: ABOUT & TEAM */}
      {activeSubTab === "about" && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-lg font-display font-semibold text-white">About & Executive Team Settings</h3>
            <button
              onClick={saveAbout}
              className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Save About Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Badge Title</label>
              <input
                type="text"
                value={aboutState.badge}
                onChange={(e) => setAboutState({ ...aboutState, badge: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Main Heading</label>
              <input
                type="text"
                value={aboutState.title}
                onChange={(e) => setAboutState({ ...aboutState, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Founding Year</label>
              <input
                type="text"
                value={aboutState.foundingYear}
                onChange={(e) => setAboutState({ ...aboutState, foundingYear: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Atelier Studio Location</label>
              <input
                type="text"
                value={aboutState.studioLocation}
                onChange={(e) => setAboutState({ ...aboutState, studioLocation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-400 mb-1">Story & Mission Overview</label>
              <textarea
                rows={4}
                value={aboutState.description}
                onChange={(e) => setAboutState({ ...aboutState, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>
          </div>

          {/* Team Members List Editor */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-ginosko-gold" /> Key Team Members
              </h4>
              <button
                onClick={() => {
                  const newMember = {
                    id: `team-${Date.now()}`,
                    name: "New Executive",
                    role: "Senior Consultant",
                    desc: "Executive leader overseeing design and operations.",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
                    email: "info@ginosko.com"
                  };
                  setAboutState({ ...aboutState, teamMembers: [...aboutState.teamMembers, newMember] });
                }}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-xs text-stone-200 hover:bg-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutState.teamMembers.map((member, index) => (
                <div key={member.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                    <span className="text-xs font-bold text-ginosko-gold uppercase tracking-wider">
                      Member #{index + 1}
                    </span>
                    <button
                      onClick={() => {
                        const filtered = aboutState.teamMembers.filter((m) => m.id !== member.id);
                        setAboutState({ ...aboutState, teamMembers: filtered });
                      }}
                      className="text-rose-400 hover:text-rose-300 text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
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
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400">Title / Designation</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const updated = [...aboutState.teamMembers];
                          updated[index].role = e.target.value;
                          setAboutState({ ...aboutState, teamMembers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400">Description / Biography</label>
                      <textarea
                        rows={2}
                        value={member.desc}
                        onChange={(e) => {
                          const updated = [...aboutState.teamMembers];
                          updated[index].desc = e.target.value;
                          setAboutState({ ...aboutState, teamMembers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400">Profile Image Path / URL</label>
                      <input
                        type="text"
                        value={member.image}
                        onChange={(e) => {
                          const updated = [...aboutState.teamMembers];
                          updated[index].image = e.target.value;
                          setAboutState({ ...aboutState, teamMembers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-ginosko-gold font-mono text-[11px] mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: FAQ MANAGER */}
      {activeSubTab === "faqs" && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-lg font-display font-semibold text-white">Frequently Asked Questions (FAQ)</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newFaq = {
                    id: `faq-${Date.now()}`,
                    question: "New Frequently Asked Question",
                    answer: "Comprehensive answer explaining Ginosko's processes."
                  };
                  setFaqsState([...faqsState, newFaq]);
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-800 text-white hover:bg-stone-700 transition-all flex items-center gap-1 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
              <button
                onClick={saveFaqs}
                className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" /> Save FAQs
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqsState.map((faq, index) => (
              <div key={faq.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs font-bold text-ginosko-gold uppercase tracking-wider">
                    Question #{index + 1}
                  </span>
                  <button
                    onClick={() => {
                      setFaqsState(faqsState.filter((f) => f.id !== faq.id));
                    }}
                    className="text-rose-400 hover:text-rose-300 text-xs cursor-pointer"
                  >
                    Delete FAQ
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-stone-400 font-semibold">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...faqsState];
                        updated[index].question = e.target.value;
                        setFaqsState(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-semibold">Answer</label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...faqsState];
                        updated[index].answer = e.target.value;
                        setFaqsState(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: CONTACT DETAILS */}
      {activeSubTab === "contact" && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-lg font-display font-semibold text-white">Contact & Location Settings</h3>
            <button
              onClick={saveContact}
              className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Save Contact Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Physical Address</label>
              <input
                type="text"
                value={contactState.address}
                onChange={(e) => setContactState({ ...contactState, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Phone Numbers</label>
              <input
                type="text"
                value={contactState.phone}
                onChange={(e) => setContactState({ ...contactState, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Official Email</label>
              <input
                type="text"
                value={contactState.email}
                onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Opening Operating Hours</label>
              <input
                type="text"
                value={contactState.openingHours}
                onChange={(e) => setContactState({ ...contactState, openingHours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-400 mb-1">Instagram URL</label>
              <input
                type="text"
                value={contactState.socialLinks?.instagram || ""}
                onChange={(e) =>
                  setContactState({
                    ...contactState,
                    socialLinks: { ...contactState.socialLinks, instagram: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 5: FOOTER */}
      {activeSubTab === "footer" && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-lg font-display font-semibold text-white">Footer Copy & Branding</h3>
            <button
              onClick={saveFooter}
              className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Save Footer Settings
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Footer About Blurb</label>
              <textarea
                rows={3}
                value={footerState.aboutText}
                onChange={(e) => setFooterState({ ...footerState, aboutText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Copyright Notice Text</label>
              <input
                type="text"
                value={footerState.copyrightText}
                onChange={(e) => setFooterState({ ...footerState, copyrightText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-ginosko-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={footerState.tagline}
                onChange={(e) => setFooterState({ ...footerState, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-ginosko-gold focus:outline-none focus:border-ginosko-gold"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
