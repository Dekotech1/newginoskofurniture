import React from "react";
import { useCMS } from "../../context/CMSContext";
import { ShieldCheck, Clock, CheckCircle2, Lock, Key } from "lucide-react";

export default function SecurityAuditManager() {
  const { cmsData } = useCMS();

  if (!cmsData) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-ginosko-gold" /> Security & Audit Logs
        </h2>
        <p className="text-stone-400 text-sm mt-1">
          Detailed audit trail of all content updates, publishing actions, and admin system authentication history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Database Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">Active & Encrypted</div>
          <p className="text-[11px] text-stone-500">Persistent database sync enabled</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Authentication Protocol</span>
            <Lock className="w-4 h-4 text-ginosko-gold" />
          </div>
          <div className="text-xl font-bold text-white">JWT Session Auth</div>
          <p className="text-[11px] text-stone-500">Role-Based Access Control (RBAC)</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Rate Limiting & CORS</span>
            <Key className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">Protected</div>
          <p className="text-[11px] text-stone-500">Server-side payload limits enforced</p>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-display font-semibold text-white border-b border-stone-800 pb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-ginosko-gold" /> Comprehensive Audit Log Stream
        </h3>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {(cmsData?.auditLogs || []).map((log) => (
            <div key={log.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-ginosko-gold text-sm">{log.action}</span>
                <span className="text-stone-500 font-mono text-[11px]">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-stone-300">
                <span className="text-stone-500">Target:</span>
                <span className="font-mono bg-stone-900 px-2 py-0.5 rounded text-white">{log.target}</span>
              </div>

              {log.details && (
                <p className="text-stone-400 font-mono text-[11px] pt-1 border-t border-stone-800/80">
                  {log.details}
                </p>
              )}

              <div className="text-[10px] text-stone-500">
                Triggered by: <span className="text-stone-300 font-semibold">{log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
