import React, { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import DashboardOverview from "./DashboardOverview";
import PageManager from "./PageManager";
import HomepageBuilder from "./HomepageBuilder";
import BlogManager from "./BlogManager";
import PortfolioManager from "./PortfolioManager";
import ServicesManager from "./ServicesManager";
import MediaLibraryManager from "./MediaLibraryManager";
import NavigationManager from "./NavigationManager";
import FormSubmissionsManager from "./FormSubmissionsManager";
import WebsiteSettingsManager from "./WebsiteSettingsManager";
import SeoManager from "./SeoManager";
import UserManager from "./UserManager";
import SecurityAuditManager from "./SecurityAuditManager";

import {
  LayoutDashboard,
  FileText,
  Layout,
  TrendingUp,
  FolderKanban,
  Briefcase,
  Image as ImageIcon,
  Settings,
  Inbox,
  Globe,
  Search,
  Users,
  ShieldCheck,
  LogOut,
  Eye,
  Lock,
  X,
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";

export default function AdminPanel() {
  const { user, login, logout, setIsAdminOpen, cmsData } = useCMS();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loginEmail, setLoginEmail] = useState("danganajohn72@gmail.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    const result = await login(loginEmail, loginPassword);
    setIsLoggingIn(false);
    if (!result.success) {
      setLoginError(result.error || "Authentication failed.");
    }
  };

  // If not authenticated, render Login Dialog
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-ginosko-gold/20 border border-ginosko-gold/40 flex items-center justify-center text-ginosko-gold mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-wide">
              Ginosko Enterprise CMS
            </h2>
            <p className="text-xs text-stone-400">
              Sign in with your administrative credentials to manage live website content.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold transition-colors"
                placeholder="danganajohn72@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold transition-colors font-mono"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-bold text-sm hover:bg-yellow-400 transition-all shadow-lg hover:shadow-ginosko-gold/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {isLoggingIn ? "Authenticating..." : "Access Control Panel"}
            </button>
          </form>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 text-center space-y-1">
            <span className="text-[11px] text-ginosko-gold font-semibold uppercase tracking-wider block">
              Default Super Admin Pre-Configured
            </span>
            <p className="text-[11px] text-stone-400 font-mono">
              Email: <span className="text-white">danganajohn72@gmail.com</span> | Password: <span className="text-white">admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const navMenuItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "pages", label: "Page Manager", icon: FileText },
    { id: "homepage", label: "Homepage Builder", icon: Layout },
    { id: "portfolio", label: "Projects & Portfolio", icon: FolderKanban },
    { id: "blog", label: "Blog & Insights", icon: TrendingUp },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "media", label: "Media Library", icon: ImageIcon },
    { id: "navigation", label: "Navigation Menus", icon: Settings },
    { id: "submissions", label: "Form Submissions", icon: Inbox, badge: cmsData?.submissions.filter(s => s.status === 'unread').length || 0 },
    { id: "settings", label: "Website Settings", icon: Globe },
    { id: "seo", label: "SEO Meta Tags", icon: Search },
    { id: "users", label: "Admin Users", icon: Users },
    { id: "audit", label: "Security & Audit", icon: ShieldCheck }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-ginosko-dark text-white flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 bg-stone-950 border-b border-stone-800 px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ginosko-gold/20 border border-ginosko-gold/40 flex items-center justify-center text-ginosko-gold font-display font-bold">
            G
          </div>
          <div>
            <h1 className="text-base font-display font-bold text-white tracking-wide leading-none">
              Ginosko Enterprise CMS
            </h1>
            <span className="text-[10px] text-stone-400 font-mono">
              Live Connected Database • {user.role} Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-ginosko-gold" /> Preview Live Site
          </button>

          <div className="h-6 w-[1px] bg-stone-800" />

          <div className="flex items-center gap-3">
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-ginosko-gold/40"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-none">{user.name}</div>
              <div className="text-[10px] text-ginosko-gold font-mono">{user.email}</div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 transition-colors cursor-pointer ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-stone-950/90 border-r border-stone-800 p-4 overflow-y-auto space-y-1 shrink-0 hidden md:block">
          <div className="px-3 py-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Content Management
          </div>

          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? "bg-ginosko-gold/15 text-ginosko-gold font-semibold border border-ginosko-gold/30 shadow-md"
                    : "text-stone-400 hover:text-white hover:bg-stone-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-ginosko-gold" : "text-stone-500"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold animate-pulse">
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-3.5 h-3.5 text-ginosko-gold" />
                )}
              </button>
            );
          })}
        </aside>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden bg-stone-900 p-3 border-b border-stone-800 flex items-center justify-between w-full z-10">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs"
          >
            {navMenuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} {item.badge ? `(${item.badge} new)` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Main Work Area */}
        <main className="flex-1 bg-stone-950/40 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />}
            {activeTab === "pages" && <PageManager />}
            {activeTab === "homepage" && <HomepageBuilder />}
            {activeTab === "portfolio" && <PortfolioManager />}
            {activeTab === "blog" && <BlogManager />}
            {activeTab === "services" && <ServicesManager />}
            {activeTab === "media" && <MediaLibraryManager />}
            {activeTab === "navigation" && <NavigationManager />}
            {activeTab === "submissions" && <FormSubmissionsManager />}
            {activeTab === "settings" && <WebsiteSettingsManager />}
            {activeTab === "seo" && <SeoManager />}
            {activeTab === "users" && <UserManager />}
            {activeTab === "audit" && <SecurityAuditManager />}
          </div>
        </main>
      </div>
    </div>
  );
}
