"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Cloud, 
  Cpu, 
  Play, 
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lock
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { 
    totalCost, 
    predictedCost, 
    totalSavings, 
    suggestions, 
    applySuggestion, 
    getFilteredSpendingData,
    budgets,
    activityLogs,
    addActivity
  } = useApp();

  const [activeCloud, setActiveCloud] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const chartData = getFilteredSpendingData(activeCloud, activeCategory);

  const activeBudgetLimit = budgets.reduce((sum, b) => sum + b.amount, 0);
  const budgetUsagePercent = activeBudgetLimit > 0 ? (totalCost / activeBudgetLimit) * 100 : 0;
  const activeSuggestions = suggestions.filter((s) => s.status === "active");

  const cloudFilters = [
    { id: "all", name: "All" },
    { id: "aws", name: "AWS" },
    { id: "azure", name: "Azure" },
    { id: "gcp", name: "GCP" },
  ];

  const categoryFilters = [
    { id: "all", name: "All Categories" },
    { id: "compute", name: "Compute" },
    { id: "storage", name: "Storage" },
    { id: "database", name: "Database" },
    { id: "network", name: "Network" },
    { id: "ai", name: "AI APIs" },
  ];

  const renderLogIcon = (iconName: string) => {
    switch (iconName) {
      case "file":
        return <FileText className="w-3.5 h-3.5 text-blue-500" />;
      case "cpu":
        return <Cpu className="w-3.5 h-3.5 text-blue-500" />;
      case "key":
        return <Lock className="w-3.5 h-3.5 text-amber-500" />;
      case "cloud":
        return <Cloud className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-xl tracking-tight text-stone-900 dark:text-white">
            Workspace Observability
          </h1>
          <p className="text-stone-450 dark:text-stone-400 text-xs mt-1 font-medium">
            Review active multi-cloud ingestion streams, forecasted caps, and optimization suggestions.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-[var(--border)] text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>Billing Reports</span>
          </Link>
          
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("toggle-nebula-chat"));
              addActivity("Launched conversational AI optimization assistant", "sparkles");
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-950 dark:border-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Consult AI</span>
          </button>
        </div>
      </div>

      {/* KPI summaries cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between min-h-32">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Active Monthly Bill</span>
            <div className="p-1 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 border border-[var(--border)]">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white tracking-tight leading-none">
              ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[9px] text-emerald-600 font-semibold mt-2 block">
              -8.4% compared to April
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between min-h-32">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Spend Cap Forecast</span>
            <div className="p-1 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 border border-[var(--border)]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white tracking-tight leading-none">
              ${predictedCost.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <div className="mt-2.5">
              <div className="w-full bg-stone-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    budgetUsagePercent > 90 ? "bg-amber-500" : "bg-blue-500"
                  }`} 
                  style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] text-stone-450 dark:text-stone-500 mt-1 font-mono leading-none">
                <span>{budgetUsagePercent.toFixed(1)}% of total cap limits</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between min-h-32">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">AI Waste Detected</span>
            <div className="p-1 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 border border-[var(--border)]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold font-mono text-emerald-600 tracking-tight leading-none">
              ${totalSavings.toFixed(0)} / mo
            </p>
            <span className="text-[9px] text-stone-450 dark:text-stone-400 font-medium mt-2 block">
              {activeSuggestions.length} optimization options active
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between min-h-32">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Sync Integrity</span>
            <div className="p-1 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 border border-[var(--border)]">
              <Cloud className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white tracking-tight leading-none">
              2 / 3 Connected
            </p>
            <span className="text-[9px] text-amber-500 font-semibold mt-2 block flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5" />
              <span>Azure connector failed</span>
            </span>
          </div>
        </div>

      </div>

      {/* Elegant Telemetry Area Chart */}
      <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs mb-6">
        
        {/* Filters bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-[var(--border)] pb-4.5">
          <div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Costs Telemetry curves</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Dynamically select cloud tenants or resource divisions to attribution.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Cloud select tabs */}
            <div className="flex rounded-lg bg-stone-50 dark:bg-slate-900 border border-[var(--border)] p-0.5">
              {cloudFilters.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCloud(tab.id)}
                  className={`px-3 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase transition-colors ${
                    activeCloud === tab.id 
                      ? "bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs border border-[var(--border)]" 
                      : "text-stone-450 dark:text-stone-400 hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Categories select tabs */}
            <div className="flex rounded-lg bg-stone-50 dark:bg-slate-900 border border-[var(--border)] p-0.5">
              {categoryFilters.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase transition-colors ${
                    activeCategory === tab.id 
                      ? "bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs border border-[var(--border)]" 
                      : "text-stone-450 dark:text-stone-400 hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sophisticated Recharts Area Chart */}
        <div className="h-68 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="glowBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.08}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="awsGray" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.06}/>
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.06)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="rgba(156,163,175,0.4)" 
                fontSize={9} 
                fontFamily="var(--font-mono)" 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="rgba(156,163,175,0.4)" 
                fontSize={9} 
                fontFamily="var(--font-mono)" 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "11px",
                  color: "var(--foreground)",
                  boxShadow: "var(--shadow-subtle)",
                }}
                formatter={(value: any) => [`$${value}`, "Spent"]}
              />
              {activeCloud === "all" ? (
                <>
                  <Area type="monotone" dataKey="aws" name="AWS" stroke="#6b7280" strokeWidth={1} fillOpacity={1} fill="url(#awsGray)" stackId="1" />
                  <Area type="monotone" dataKey="azure" name="Azure" stroke="#9ca3af" strokeWidth={1} fillOpacity={1} fill="none" stackId="1" />
                  <Area type="monotone" dataKey="gcp" name="GCP" stroke="#3b82f6" strokeWidth={1} fillOpacity={1} fill="url(#glowBlue)" stackId="1" />
                </>
              ) : (
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  name={`${activeCloud.toUpperCase()} Cost`} 
                  stroke="#3b82f6" 
                  strokeWidth={1.5} 
                  fillOpacity={1} 
                  fill="url(#glowBlue)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Split details row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: AI Inefficiencies cuts recommendations (Span 2) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>AI suggestions optimization models</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-bold tracking-wider font-mono">
              {activeSuggestions.length} ACTIONS READY
            </span>
          </div>

          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-0.5">
            {activeSuggestions.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs text-stone-400 font-bold">Workspace efficiency score at 100%. Zero waste located.</p>
              </div>
            ) : (
              activeSuggestions.map((sug) => (
                <div 
                  key={sug.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-stone-50/20 dark:bg-slate-900/10 hover:border-stone-300 dark:hover:border-slate-800 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded border border-[var(--border)] bg-white dark:bg-slate-900 text-stone-500">
                        {sug.provider.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-stone-900 dark:text-white">{sug.title}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-450 mt-1.5 leading-relaxed font-medium">{sug.description}</p>
                    <div className="flex items-center gap-3 mt-2.5 text-[8.5px] text-stone-400 font-mono">
                      <span>Category: <span className="text-stone-500 dark:text-stone-300 font-semibold">{sug.category.toUpperCase()}</span></span>
                      <span>Difficulty: <span className="text-stone-500 dark:text-stone-300 font-semibold">{sug.difficulty}</span></span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-3.5 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3.5 sm:pt-0 border-[var(--border)] shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[8px] text-stone-400 font-bold uppercase tracking-wider block">POTENTIAL SAVINGS</span>
                      <span className="text-sm font-bold font-mono text-emerald-600">${sug.potentialSavings} / mo</span>
                    </div>
                    
                    <button
                      onClick={() => applySuggestion(sug.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 text-[10px] font-bold shadow-xs transition-all cursor-pointer"
                    >
                      Apply Cut
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Card: Activity feed logs */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Workspace activity stream</span>
            </h3>
            <span className="text-[8px] text-stone-400 font-mono tracking-wider">EVENT FEED</span>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-0.5">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex gap-3">
                <div className="p-1.5 rounded bg-stone-50 dark:bg-slate-900 border border-[var(--border)] shrink-0 h-7 w-7 flex items-center justify-center">
                  {renderLogIcon(log.icon)}
                </div>
                
                <div className="min-w-0">
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-normal font-medium">
                    <span className="font-bold text-stone-900 dark:text-white">{log.user}</span> {log.action}
                  </p>
                  <span className="text-[8px] text-stone-400 dark:text-stone-500 font-mono block mt-1">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
