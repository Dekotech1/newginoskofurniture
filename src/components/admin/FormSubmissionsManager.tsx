import React, { useState } from "react";
import { useCMS, CMSFormSubmission } from "../../context/CMSContext";
import { Inbox, Download, Trash2, Eye, Mail, Phone, Calendar, Search, Filter, CheckCircle, Clock } from "lucide-react";

export default function FormSubmissionsManager() {
  const { cmsData, updateSubmissionStatus, deleteSubmission } = useCMS();
  const [selectedSub, setSelectedSub] = useState<CMSFormSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "contact" | "quote">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");

  if (!cmsData) return null;

  const submissions = cmsData.submissions;

  const handleStatusToggle = async (sub: CMSFormSubmission) => {
    const nextStatus = sub.status === "unread" ? "read" : "unread";
    await updateSubmissionStatus(sub.id, nextStatus);
    if (selectedSub && selectedSub.id === sub.id) {
      setSelectedSub({ ...selectedSub, status: nextStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission entry?")) {
      await deleteSubmission(id);
      if (selectedSub && selectedSub.id === id) {
        setSelectedSub(null);
      }
    }
  };

  const handleExportCSV = () => {
    window.open("/api/cms/submissions/export", "_blank");
  };

  const filteredSubs = submissions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || s.type === filterType;
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-ginosko-gold" /> Form Submissions & Inquiries
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Review contact form messages and AI Quote Space Planner consultations submitted by visitors.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-ginosko-gold text-ginosko-dark font-semibold hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-lg"
        >
          <Download className="w-4 h-4" /> Export All to CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
          <input
            type="text"
            placeholder="Search by client name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-ginosko-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-ginosko-gold"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact Messages</option>
            <option value="quote">Quote Consultations</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-ginosko-gold"
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-xs font-semibold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Subject / Budget</th>
                <th className="py-3.5 px-4">Received Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredSubs.map((sub) => (
                <tr
                  key={sub.id}
                  className={`hover:bg-stone-800/40 transition-colors ${
                    sub.status === "unread" ? "bg-stone-900/90 font-semibold" : "opacity-80"
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleStatusToggle(sub)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                        sub.status === "unread"
                          ? "bg-rose-950/80 text-rose-300 border border-rose-800 animate-pulse"
                          : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      {sub.status === "unread" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3 text-emerald-400" />}
                      {sub.status.toUpperCase()}
                    </button>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase ${
                        sub.type === "quote"
                          ? "bg-ginosko-gold/20 text-ginosko-gold border border-ginosko-gold/30"
                          : "bg-blue-950/60 text-blue-300 border border-blue-800"
                      }`}
                    >
                      {sub.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    {sub.name}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-400 space-y-0.5">
                    <div>{sub.email}</div>
                    {sub.phone && <div className="text-[11px] font-mono text-stone-500">{sub.phone}</div>}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-300 max-w-xs truncate">
                    {sub.subject || sub.projectType || "General Inquiry"}
                    {sub.budgetRange && <span className="text-ginosko-gold block text-[10px] font-mono">Budget: {sub.budgetRange}</span>}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-stone-500 font-mono">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedSub(sub);
                          if (sub.status === "unread") {
                            updateSubmissionStatus(sub.id, "read");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="View Submission Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                        title="Delete Entry"
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

      {/* Submission Details Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-ginosko-gold/20 text-ginosko-gold text-xs font-semibold uppercase">
                  {selectedSub.type} Inquiry
                </span>
                <h3 className="text-lg font-display font-bold text-white">{selectedSub.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-stone-400 hover:text-white text-sm cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div>
                  <span className="text-stone-500 block font-semibold">Email Address</span>
                  <a href={`mailto:${selectedSub.email}`} className="text-ginosko-gold hover:underline">
                    {selectedSub.email}
                  </a>
                </div>
                <div>
                  <span className="text-stone-500 block font-semibold">Phone Contact</span>
                  <span>{selectedSub.phone || "Not provided"}</span>
                </div>
                {selectedSub.projectType && (
                  <div>
                    <span className="text-stone-500 block font-semibold">Project Type</span>
                    <span>{selectedSub.projectType}</span>
                  </div>
                )}
                {selectedSub.budgetRange && (
                  <div>
                    <span className="text-stone-500 block font-semibold">Estimated Budget</span>
                    <span className="text-ginosko-gold font-semibold">{selectedSub.budgetRange}</span>
                  </div>
                )}
              </div>

              <div>
                <span className="text-stone-400 font-semibold block mb-1">Subject / Project Title</span>
                <p className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-white font-medium">
                  {selectedSub.subject || selectedSub.projectType || "General Consultation"}
                </p>
              </div>

              <div>
                <span className="text-stone-400 font-semibold block mb-1">Message / Space Vision</span>
                <p className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 leading-relaxed font-mono">
                  {selectedSub.message || selectedSub.spaceDescription || "No additional comments provided."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={() => handleStatusToggle(selectedSub)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs cursor-pointer"
              >
                Mark as {selectedSub.status === "unread" ? "Read" : "Unread"}
              </button>
              <button
                onClick={() => handleDelete(selectedSub.id)}
                className="px-4 py-2 rounded-xl bg-rose-950/80 text-rose-300 hover:bg-rose-900 text-xs cursor-pointer"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
