"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BillingReports() {
  const { budgets, totalCost, addActivity } = useApp();
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");

  const invoices = [
    { id: "inv-2026-04", period: "April 1 - April 30, 2026", aws: 3950.20, azure: 2560.10, gcp: 1480.50, status: "Paid" },
    { id: "inv-2026-03", period: "March 1 - March 31, 2026", aws: 3820.40, azure: 2420.90, gcp: 1390.20, status: "Paid" },
    { id: "inv-2026-02", period: "February 1 - February 28, 2026", aws: 3510.60, azure: 2310.40, gcp: 1190.50, status: "Paid" },
  ];

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    setExporting(true);
    setExportStatus("Aggregating workspace cost logs...");

    setTimeout(() => {
      setExportStatus("Compiling multi-cloud vectors...");
    }, 1000);

    setTimeout(() => {
      setExportStatus("Generating document ledger...");
    }, 2000);

    setTimeout(() => {
      setExporting(false);
      setExportStatus("");
      addActivity(`Downloaded cost report (${exportFormat.toUpperCase()})`, "file");

      // Blast gorgeous confetti celebrating successful report generation!
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#3b82f6", "#10b981", "#6b7280", "#4b5563"]
      });

      alert(`Success! Nebula has successfully assembled and downloaded your cost report in ${exportFormat.toUpperCase()} format.`);
    }, 3200);
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4.5">
        <div>
          <h1 className="font-display font-semibold text-xl tracking-tight text-stone-900 dark:text-white">
            Billing & Ledger
          </h1>
          <p className="text-stone-450 dark:text-stone-400 text-xs mt-1 font-medium">
            Review historic invoice rosters, download cost spreadsheets, and track active caps boundaries.
          </p>
        </div>
      </div>

      {/* Split grids layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Ledger & Export Control (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Invoice Table Ledger */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <div className="pb-3.5 border-b border-[var(--border)] mb-6">
              <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Invoices History</h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Review historic cloud spending consolidated by billing cycles.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider font-mono">
                    <th className="pb-3 pl-2">Period</th>
                    <th className="pb-3">AWS Sync</th>
                    <th className="pb-3">Azure Sync</th>
                    <th className="pb-3">GCP Sync</th>
                    <th className="pb-3">Gross Invoice</th>
                    <th className="pb-3 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-850">
                  {invoices.map((inv) => {
                    const total = inv.aws + inv.azure + inv.gcp;
                    return (
                      <tr key={inv.id} className="text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 font-bold text-stone-900 dark:text-white pl-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                          <span>{inv.period}</span>
                        </td>
                        <td className="py-3.5 font-mono text-[10.5px]">${inv.aws.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="py-3.5 font-mono text-[10.5px]">${inv.azure.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="py-3.5 font-mono text-[10.5px]">${inv.gcp.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="py-3.5 font-mono font-bold text-stone-900 dark:text-white">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="py-3.5 text-right pr-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/15 text-[8.5px] text-emerald-600 font-bold uppercase font-mono">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Report Card */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <div className="pb-3.5 border-b border-[var(--border)] mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Compile Cost Summary Report</h3>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Download aggregated multi-cloud metrics formatted in clear sheets.</p>
              </div>
              <Download className="w-4.5 h-4.5 text-blue-500" />
            </div>

            <form onSubmit={handleExport} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-2">Report Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setExportFormat("pdf")}
                      className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                        exportFormat === "pdf" 
                          ? "bg-stone-50 dark:bg-slate-900 border-stone-400 dark:border-slate-700 text-[var(--foreground)]" 
                          : "bg-white dark:bg-slate-900/30 border-[var(--border)] text-stone-400 hover:border-stone-300 dark:hover:border-slate-800"
                      }`}
                    >
                      Executive Summary (PDF)
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setExportFormat("csv")}
                      className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                        exportFormat === "csv" 
                          ? "bg-stone-50 dark:bg-slate-900 border-stone-400 dark:border-slate-700 text-[var(--foreground)]" 
                          : "bg-white dark:bg-slate-900/30 border-[var(--border)] text-stone-400 hover:border-stone-300 dark:hover:border-slate-800"
                      }`}
                    >
                      Raw Costs Matrix (CSV)
                    </button>
                  </div>
                </div>
              </div>

              {exporting ? (
                <div className="mt-5 p-3 rounded-xl bg-stone-50 dark:bg-slate-900 border border-[var(--border)] flex items-center justify-center gap-2.5">
                  <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold font-mono">{exportStatus}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 mt-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Assemble Cost Document</span>
                </button>
              )}
            </form>
          </div>

        </div>

        {/* Right Column: Active Budgets caps progress */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="pb-3.5 border-b border-[var(--border)] mb-6">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Workspace Cost Caps</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Verify operational expenditures limits against budget rules.</p>
          </div>

          <div className="space-y-6">
            {budgets.map((b) => {
              const usagePercent = (b.spent / b.amount) * 100;
              const overrun = b.spent > b.amount;
              return (
                <div key={b.id} className="p-4 rounded-xl border border-[var(--border)] bg-stone-50/10 dark:bg-slate-900/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-white block leading-tight">{b.name}</span>
                      <span className="text-[8px] font-mono text-stone-400 mt-1 block uppercase tracking-wider">
                        {b.cloud === "all" ? "GLOBAL" : b.cloud.toUpperCase()} &middot; {b.category.toUpperCase()}
                      </span>
                    </div>

                    {overrun ? (
                      <span className="px-2 py-0.5 rounded border border-red-500/15 bg-red-500/5 text-[8px] font-bold font-mono tracking-wider text-red-500 flex items-center gap-1 uppercase">
                        <AlertTriangle className="w-2.5 h-2.5 animate-pulse" />
                        <span>OVERRUN</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded border border-emerald-500/15 bg-emerald-500/5 text-[8px] font-bold font-mono tracking-wider text-emerald-600 flex items-center gap-1 uppercase">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>HEALTHY</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3.5">
                    <div className="w-full bg-white dark:bg-slate-900 border border-[var(--border)] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          overrun ? "bg-red-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-[9px] text-stone-400 mt-2 font-mono leading-none">
                      <span>Spent: <span className="text-stone-700 dark:text-stone-300 font-bold">${b.spent.toLocaleString()}</span></span>
                      <span>Limit: <span className="font-bold">${b.amount.toLocaleString()}</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
