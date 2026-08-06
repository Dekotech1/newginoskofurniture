import React from "react";
import { useCMS } from "../../context/CMSContext";
import { 
  FileText, 
  FolderKanban, 
  Briefcase, 
  Image as ImageIcon, 
  Inbox, 
  Users, 
  TrendingUp, 
  Activity, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Settings,
  ShieldCheck,
  Zap
} from "lucide-react";

interface Props {
  onNavigateTab: (tab: string) => void;
}

export default function DashboardOverview({ onNavigateTab }: Props) {
  const { cmsData } = useCMS();

  const totalPages = cmsData?.pages?.length || 0;
  const totalPosts = cmsData?.blog?.length || 0;
  const totalProjects = cmsData?.projects?.length || 0;
  const totalServices = cmsData?.services?.length || 0;
  const totalMedia = cmsData?.media?.length || 0;
  const totalSubmissions = cmsData?.submissions?.length || 0;
  const unreadSubmissions = (cmsData?.submissions || []).filter((s) => s.status === "unread").length;
  const totalUsers = cmsData?.users?.length || 0;

  const statsList = [
    { label: "Total Pages", count: totalPages, icon: FileText, color: "from-blue-500/20 to-indigo-500/10", border: "border-blue-500/30", tab: "pages" },
    { label: "Blog Insights", count: totalPosts, icon: TrendingUp, color: "from-amber-500/20 to-yellow-500/10", border: "border-amber-500/30", tab: "blog" },
    { label: "Projects & Portfolio", count: totalProjects, icon: FolderKanban, color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/30", tab: "portfolio" },
    { label: "Services", count: totalServices, icon: Briefcase, color: "from-purple-500/20 to-pink-500/10", border: "border-purple-500/30", tab: "services" },
    { label: "Media Library Assets", count: totalMedia, icon: ImageIcon, color: "from-cyan-500/20 to-blue-500/10", border: "border-cyan-500/30", tab: "media" },
    { label: "Inquiries & Quotes", count: totalSubmissions, badge: unreadSubmissions > 0 ? `${unreadSubmissions} New` : null, icon: Inbox, color: "from-rose-500/20 to-red-500/10", border: "border-rose-500/30", tab: "submissions" },
    { label: "Admin Users", count: totalUsers, icon: Users, color: "from-indigo-500/20 to-purple-500/10", border: "border-indigo-500/30", tab: "users" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ginosko-dark via-stone-900 to-black border border-ginosko-gold/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ginosko-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ginosko-gold/20 border border-ginosko-gold/40 text-ginosko-gold text-xs uppercase tracking-widest font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Ginosko Enterprise CMS v3.5
            </div>
            <h1 className="text-3xl font-display font-bold text-white tracking-wide">
              Website Management Control Panel
            </h1>
            <p className="text-stone-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Live database connection active. Any modifications, publishing, or media updates here will automatically publish live to the Ginosko Furniture & Construction website instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab("homepage")}
              className="px-5 py-2.5 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg hover:shadow-ginosko-gold/20 text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4" /> Edit Homepage Sections
            </button>
            <button
              onClick={() => onNavigateTab("media")}
              className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-ginosko-gold" /> Upload Media
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div>
        <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-ginosko-gold" /> Live System Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigateTab(stat.tab)}
                className={`group cursor-pointer p-5 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-ginosko-gold/50 relative overflow-hidden`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    {stat.label}
                  </span>
                  <div className="p-2.5 rounded-xl bg-black/40 text-ginosko-gold group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-display font-bold text-white tracking-tight">
                    {stat.count}
                  </div>
                  {stat.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold animate-pulse">
                      {stat.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics & Quick Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Operational Shortcuts */}
        <div className="lg:col-span-2 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-ginosko-gold" /> Rapid Publishing Actions
            </h3>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full">
              System Online • Sync Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigateTab("pages")}
              className="p-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 hover:border-ginosko-gold/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-ginosko-gold transition-colors">Manage Page Slugs & SEO</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Edit meta titles, descriptions, and publish status</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab("portfolio")}
              className="p-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 hover:border-ginosko-gold/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-ginosko-gold transition-colors">Add Architectural Project</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Publish new villas, hotel fit-outs, or teak furniture</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab("blog")}
              className="p-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 hover:border-ginosko-gold/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-ginosko-gold transition-colors">Write Craft Insights Post</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Publish joinery guides and woodworking articles</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab("navigation")}
              className="p-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 hover:border-ginosko-gold/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-ginosko-gold transition-colors">Navigation & Menus</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Reorder header and footer menu links</p>
                </div>
              </div>
            </button>
          </div>

          {/* Analytics Visualization Placeholder */}
          <div className="pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Website Traffic & Engagement Metrics</span>
              <span className="text-xs text-ginosko-gold font-mono">Last 30 Days</span>
            </div>
            <div className="h-28 w-full bg-black/50 rounded-xl p-4 flex items-end justify-between gap-2 border border-stone-800/80">
              {[40, 65, 50, 80, 95, 70, 85, 100, 90, 110, 125, 140].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    style={{ height: `${(val / 140) * 100}%` }}
                    className="w-full bg-gradient-to-t from-ginosko-gold/30 to-ginosko-gold rounded-t-sm group-hover:from-yellow-400 transition-all"
                  />
                  <span className="text-[9px] text-stone-500 font-mono">W{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Activity Feed */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-ginosko-gold" /> System Activity Log
            </h3>
            <button
              onClick={() => onNavigateTab("audit")}
              className="text-xs text-ginosko-gold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
            {(cmsData?.auditLogs || []).slice(0, 7).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-stone-800/50 border border-stone-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-stone-300 font-semibold">
                  <span>{log.action}</span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px]">{log.target}</p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-700/30">
                  <span className="text-ginosko-gold/80">{log.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
