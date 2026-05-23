"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { 
  Key, 
  Trash2,
  PlusCircle,
  DollarSign
} from "lucide-react";

export default function SystemSettings() {
  const { 
    credentials, 
    addCredential, 
    removeCredential, 
    budgets, 
    addBudget, 
    removeBudget 
  } = useApp();

  const [provider, setProvider] = useState<"aws" | "azure" | "gcp">("aws");
  const [credName, setCredName] = useState("");
  const [credDetails, setCredDetails] = useState("");

  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(1000);
  const [budgetCloud, setBudgetCloud] = useState<"all" | "aws" | "azure" | "gcp">("all");
  const [budgetCategory, setBudgetCategory] = useState<"all" | "compute" | "storage" | "database" | "network" | "ai">("all");

  const handleAddCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credName.trim() || !credDetails.trim()) return;

    addCredential(provider, credName, credDetails);
    
    setCredName("");
    setCredDetails("");
    alert(`Connected Cloud integration: ${credName}. Telemetry synchronizations active!`);
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetName.trim()) return;

    addBudget({
      name: budgetName,
      amount: budgetAmount,
      cloud: budgetCloud,
      category: budgetCategory,
      alertThreshold: 85,
    });

    setBudgetName("");
    setBudgetAmount(1000);
    alert(`Created spend budget: '${budgetName}'.`);
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4.5">
        <div>
          <h1 className="font-display font-semibold text-xl tracking-tight text-stone-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-stone-450 dark:text-stone-400 text-xs mt-1 font-medium">
            Configure secure read-only cloud credentials, add new budget thresholds, and verify alerts.
          </p>
        </div>
      </div>

      {/* Grid forms split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card: Cloud integration Credentials forms */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <div className="pb-3.5 border-b border-[var(--border)] mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Cloud Connectors setup</h3>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Set up secure, read-only credential keys to pull telemetry data.</p>
              </div>
              <Key className="w-4 h-4 text-blue-500" />
            </div>

            <form onSubmit={handleAddCredential} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "aws", name: "AWS IAM" },
                  { id: "azure", name: "Azure Sub" },
                  { id: "gcp", name: "GCP Key" },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => setProvider(prov.id as any)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      provider === prov.id 
                        ? "bg-stone-50 dark:bg-slate-900 border-stone-400 dark:border-slate-700 text-[var(--foreground)]" 
                        : "bg-white dark:bg-slate-900/30 border-[var(--border)] text-stone-400 hover:border-stone-300 dark:hover:border-slate-800"
                    }`}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Connector Name</label>
                <input
                  type="text"
                  required
                  value={credName}
                  onChange={(e) => setCredName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                  placeholder="e.g. Acme AWS Main Ingest"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  {provider === "aws" && "Cross-Account IAM Role ARN"}
                  {provider === "azure" && "Subscription ID"}
                  {provider === "gcp" && "Service Account JSON contents"}
                </label>
                <input
                  type="text"
                  required
                  value={credDetails}
                  onChange={(e) => setCredDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)] font-mono"
                  placeholder={
                    provider === "aws" ? "arn:aws:iam::123456789012:role/FinOps" :
                    provider === "azure" ? "8f92bd3a-e24c-4911-aa93..." :
                    "Paste raw Service Account JSON contents..."
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 mt-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Initialize Connector</span>
              </button>
            </form>
          </div>

          {/* Connected list */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-[var(--border)]">Active Credential Synchronizations</h3>
            
            <div className="space-y-3">
              {credentials.map((cred) => (
                <div 
                  key={cred.id}
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-stone-50/10 dark:bg-slate-900/10 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-stone-900 dark:text-white block leading-tight truncate">{cred.name}</span>
                    <span className="text-[8.5px] text-stone-400 font-mono tracking-wider uppercase mt-1 block">{cred.provider} Sync &middot; Connected {cred.addedAt}</span>
                  </div>

                  <button
                    onClick={() => removeCredential(cred.id)}
                    className="p-1 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500 transition-all shrink-0"
                    title="Disconnect account credentials"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Enforce Custom Budgets cost caps */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <div className="pb-3.5 border-b border-[var(--border)] mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Configure Spend Budgets Caps</h3>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Establish warning boundaries across clouds and category segments.</p>
              </div>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>

            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Cap Target Name</label>
                <input
                  type="text"
                  required
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                  placeholder="e.g. AWS AI Model Token budget"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Monthly Spend limit ($)</label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="50000"
                    step="100"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Target Cloud Cloud</label>
                  <select
                    value={budgetCloud}
                    onChange={(e) => setBudgetCloud(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] text-xs text-stone-500 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Connected Clouds</option>
                    <option value="aws">AWS Account Ingestion</option>
                    <option value="azure">Azure Subscription Ingestion</option>
                    <option value="gcp">Google Cloud Ingestion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Target Resource Segment</label>
                <select
                  value={budgetCategory}
                  onChange={(e) => setBudgetCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] text-xs text-stone-500 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Operational Products</option>
                  <option value="compute">Compute Instances</option>
                  <option value="storage">Storage volume allocations</option>
                  <option value="database">Running Databases engines</option>
                  <option value="network">Network data transfer</option>
                  <option value="ai">AI Model API tokens</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 mt-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Enforce cost cap</span>
              </button>
            </form>
          </div>

          {/* Active lists */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-[var(--border)]">Workspace caps registry</h3>
            
            <div className="space-y-3">
              {budgets.map((b) => (
                <div 
                  key={b.id}
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-stone-50/10 dark:bg-slate-900/10 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-stone-900 dark:text-white block leading-tight truncate">{b.name}</span>
                    <span className="text-[8.5px] text-stone-400 font-mono tracking-wider uppercase mt-1.5 block">
                      Limit: <span className="text-stone-700 dark:text-stone-300 font-bold font-mono">${b.amount.toLocaleString()}</span> &middot; Segment: {b.category.toUpperCase()}
                    </span>
                  </div>

                  <button
                    onClick={() => removeBudget(b.id)}
                    className="p-1 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500 transition-all shrink-0"
                    title="Delete budget rule limit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
