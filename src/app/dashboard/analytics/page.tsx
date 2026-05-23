"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  BarChart3, 
  Cloud, 
  Cpu, 
  Calendar,
  Zap
} from "lucide-react";

export default function CostAnalytics() {
  const { spendingData } = useApp();
  const [timeRange, setTimeRange] = useState("30");

  const dataSlice = spendingData.slice(-parseInt(timeRange));

  let totalAws = 0;
  let totalAzure = 0;
  let totalGcp = 0;
  let totalCompute = 0;
  let totalStorage = 0;
  let totalDatabase = 0;
  let totalNetwork = 0;
  let totalAi = 0;

  dataSlice.forEach((record) => {
    totalAws += record.aws;
    totalAzure += record.azure;
    totalGcp += record.gcp;
    
    const recordTotal = record.aws + record.azure + record.gcp;
    totalCompute += recordTotal * 0.45;
    totalDatabase += recordTotal * 0.25;
    totalStorage += recordTotal * 0.15;
    totalNetwork += recordTotal * 0.08;
    totalAi += recordTotal * 0.07;
  });

  const cloudCompareData = [
    { name: "AWS", value: parseFloat(totalAws.toFixed(0)), color: "#6b7280" },
    { name: "Azure", value: parseFloat(totalAzure.toFixed(0)), color: "#9ca3af" },
    { name: "GCP", value: parseFloat(totalGcp.toFixed(0)), color: "#3b82f6" },
  ];

  const categoryDistributionData = [
    { name: "Compute", value: parseFloat(totalCompute.toFixed(0)), color: "#3b82f6" },
    { name: "Database", value: parseFloat(totalDatabase.toFixed(0)), color: "#4b5563" },
    { name: "Storage", value: parseFloat(totalStorage.toFixed(0)), color: "#10b981" },
    { name: "Network", value: parseFloat(totalNetwork.toFixed(0)), color: "#9ca3af" },
    { name: "AI APIs", value: parseFloat(totalAi.toFixed(0)), color: "#f59e0b" },
  ];

  const barChartData = dataSlice.map((record) => {
    return {
      date: new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      AWS: parseFloat(record.aws.toFixed(0)),
      Azure: parseFloat(record.azure.toFixed(0)),
      GCP: parseFloat(record.gcp.toFixed(0)),
    };
  });

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4.5">
        <div>
          <h1 className="font-display font-semibold text-xl tracking-tight text-stone-900 dark:text-white">
            Cost Analytics
          </h1>
          <p className="text-stone-450 dark:text-stone-400 text-xs mt-1 font-medium">
            Perform detailed segmentations audits, clouds comparisons, and category allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-stone-450 shrink-0" />
          <div className="flex rounded-lg bg-stone-50 dark:bg-slate-900 border border-[var(--border)] p-0.5">
            {[
              { id: "7", name: "7 Days" },
              { id: "30", name: "30 Days" },
              { id: "90", name: "90 Days" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTimeRange(opt.id)}
                className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  timeRange === opt.id 
                    ? "bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs border border-[var(--border)]" 
                    : "text-stone-450 dark:text-stone-400 hover:text-[var(--foreground)]"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-650 border border-[var(--border)] shrink-0">
            <Cloud className="w-4.5 h-4.5 text-blue-500" />
          </div>
          <div>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Top Allocation</span>
            <p className="text-sm font-bold text-stone-900 dark:text-white mt-1 leading-none">Amazon Web Services</p>
            <span className="text-[9.5px] text-stone-450 mt-1.5 block">AWS represents 49.3% of total cost syncs.</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-650 border border-[var(--border)] shrink-0">
            <Cpu className="w-4.5 h-4.5 text-stone-500" />
          </div>
          <div>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Primary Cost Driver</span>
            <p className="text-sm font-bold text-stone-900 dark:text-white mt-1 leading-none">Elastic Compute (VM)</p>
            <span className="text-[9.5px] text-stone-450 mt-1.5 block">Compute products account for 45% of spend.</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-650 border border-[var(--border)] shrink-0">
            <Zap className="w-4.5 h-4.5 text-emerald-650" />
          </div>
          <div>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Efficiency Score</span>
            <p className="text-sm font-bold text-stone-900 dark:text-white mt-1 leading-none">94.8% optimized</p>
            <span className="text-[9.5px] text-stone-450 mt-1.5 block">Excellent database caches, few detached volumes.</span>
          </div>
        </div>

      </div>

      {/* Comparative Stacked Bar Chart */}
      <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs mb-6">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Multi-Cloud comparative ledger</h3>
          <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Visualizing spending weights ratios across connected environments.</p>
        </div>

        <div className="h-68 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
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
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip 
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "11px",
                  boxShadow: "var(--shadow-subtle)",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }} />
              <Bar dataKey="AWS" fill="#6b7280" radius={[2, 2, 0, 0]} stackId="a" />
              <Bar dataKey="Azure" fill="#9ca3af" radius={[2, 2, 0, 0]} stackId="a" />
              <Bar dataKey="GCP" fill="#3b82f6" radius={[2, 2, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Double details chart panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Donut */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="mb-5.5 pb-3 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Product Categories weightings</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Attribution of operational costs by functional infrastructure classes.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="h-48 w-48 shrink-0 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDistributionData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[8px] text-stone-400 font-bold uppercase tracking-wider">AGGREGATE</span>
                <span className="text-base font-bold font-mono text-stone-900 dark:text-white mt-1">${(totalCompute + totalDatabase + totalStorage + totalNetwork + totalAi).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            {/* Legends list */}
            <div className="flex-1 space-y-2 w-full">
              {categoryDistributionData.map((item) => {
                const totalDist = totalCompute + totalDatabase + totalStorage + totalNetwork + totalAi;
                const percent = totalDist > 0 ? (item.value / totalDist) * 100 : 0;
                return (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-stone-500 dark:text-stone-300 font-semibold">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-stone-900 dark:text-white font-bold">${item.value.toLocaleString()}</span>
                      <span className="text-[9px] text-stone-400 ml-1.5 font-mono">({percent.toFixed(0)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Donut */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="mb-5.5 pb-3 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Cloud Provider weigh ratios</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Consolidated billing distributions weight ratios by running connectors.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="h-48 w-48 shrink-0 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cloudCompareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {cloudCompareData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[8px] text-stone-400 font-bold uppercase tracking-wider">PROVIDERS</span>
                <span className="text-base font-bold font-mono text-stone-900 dark:text-white mt-1">${(totalAws + totalAzure + totalGcp).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="flex-1 space-y-2 w-full">
              {cloudCompareData.map((item) => {
                const totalDist = totalAws + totalAzure + totalGcp;
                const percent = totalDist > 0 ? (item.value / totalDist) * 100 : 0;
                return (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-stone-500 dark:text-stone-300 font-semibold">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-stone-900 dark:text-white font-bold">${item.value.toLocaleString()}</span>
                      <span className="text-[9px] text-stone-400 ml-1.5 font-mono">({percent.toFixed(0)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
