"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Check, 
  TrendingDown,
  BarChart3,
  DollarSign,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [bill, setBill] = useState(5000);

  const calculateSavings = (monthlyBill: number) => {
    return Math.floor(monthlyBill * 0.28); // average 28% Nebula savings
  };

  const features = [
    {
      icon: Cpu,
      title: "Waste Isolation Compiler",
      desc: "Autodetect idle compute databases and orphaned high-performance block storage volumes in secondary development clusters."
    },
    {
      icon: BarChart3,
      title: "Consolidated Ingestions",
      desc: "Assemble read-only telemetry across AWS, Google Cloud, and Azure subscriptions into a single calm workspace."
    },
    {
      icon: TrendingDown,
      title: "Threshold cost forecasting",
      desc: "Avoid unexpected runaways with predictive alerts dispatched to Slack or email before budget thresholds are breached."
    },
    {
      icon: Sparkles,
      title: "AI FinOps Assistant",
      desc: "Ask our conversational advisor in natural English: 'Detail my GCP SSD costs' or 'How do I cut compute expenditures?'"
    },
    {
      icon: Layers,
      title: "Multi-workspace partitions",
      desc: "Compartmentalize infrastructure expenditures by projects, development environments, clients, or engineering units."
    },
    {
      icon: ShieldCheck,
      title: "Hardened IAM Security",
      desc: "Synchronize billing metrics securely using read-only API connectors or locked scoped credential profiles."
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#fafaf9] dark:bg-[#0e121b] text-stone-900 dark:text-stone-100 transition-colors duration-300 font-sans">
      
      {/* Header navbar */}
      <header className="w-full h-16 border-b border-stone-200/80 dark:border-slate-800/40 bg-white/60 dark:bg-[#0e121b]/40 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-12 flex items-center justify-between transition-colors">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-semibold text-sm tracking-tight">Cloud Cost Tracker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
          <a href="#features" className="hover:text-stone-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#calculator" className="hover:text-stone-900 dark:hover:text-white transition-colors">Calculator</a>
          <a href="#pricing" className="hover:text-stone-900 dark:hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Sign In
          </Link>
          <Link 
            href="/auth" 
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
          >
            <span>Start Workspace</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-6xl mx-auto px-6 sm:px-12 pt-20 pb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-500 font-bold mb-6">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>Quiet FinOps Workspace</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl text-stone-900 dark:text-white tracking-tight max-w-3xl leading-none">
          Understand your cloud spending <br className="hidden sm:block" />
          <span className="text-blue-500 dark:text-blue-400">without the chaos.</span>
        </h1>

        <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base max-w-xl mt-4.5 leading-relaxed font-medium">
          A modern developer-focused Cost Observability dashboard built to identify wastes, track active caps, and automate infrastructure optimizations.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8.5 w-full sm:w-auto justify-center">
          <Link 
            href="/auth" 
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6.5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-stone-100 text-xs font-bold transition-all shadow-sm border border-stone-200 dark:border-slate-800"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          
          <a 
            href="#calculator" 
            className="w-full sm:w-auto flex items-center justify-center px-6.5 py-3 rounded-xl bg-stone-50 dark:bg-slate-900/30 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 text-xs font-bold transition-all"
          >
            <span>Simulate Savings</span>
          </a>
        </div>

        {/* Quiet Dashboard Preview Screenshot */}
        <div className="w-full max-w-4xl mt-14 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-[#151b26] p-2 shadow-2xl relative">
          <div className="relative rounded-xl border border-stone-100 dark:border-slate-850/80 overflow-hidden bg-white dark:bg-[#0e121b] min-h-[360px] p-5 flex flex-col justify-between text-left shadow-inner">
            
            {/* Top address bar mockup */}
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-850 pb-3.5 mb-3.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-stone-200 dark:bg-slate-800" />
                <div className="w-3 h-3 rounded-full bg-stone-200 dark:bg-slate-800" />
                <div className="w-3 h-3 rounded-full bg-stone-200 dark:bg-slate-800" />
              </div>
              <div className="px-3.5 py-1 rounded bg-stone-50 dark:bg-slate-900 border border-stone-150 dark:border-slate-850 text-[9px] text-stone-400 font-mono tracking-wide leading-none">
                cloudcosttracker.com/dashboard/overview
              </div>
            </div>

            {/* Simulated Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/40 border border-stone-150 dark:border-slate-850 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Workspace spent</span>
                  <p className="text-xl font-bold font-mono text-stone-900 dark:text-white mt-1">$4,728.42</p>
                </div>
                <div className="text-[9.5px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span>-8.4% compared to April</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/40 border border-stone-150 dark:border-slate-850 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">End-of-Month Forecast</span>
                  <p className="text-xl font-bold font-mono text-stone-900 dark:text-white mt-1">$5,106.00</p>
                </div>
                <div className="text-[9.5px] text-stone-400 font-semibold">
                  <span>88.2% of active cost cap limit</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/40 border border-stone-150 dark:border-slate-850 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Wastage Score</span>
                  <p className="text-xl font-bold font-mono text-blue-500 mt-1">94.8%</p>
                </div>
                <div className="text-[9.5px] text-stone-400 font-medium">
                  <span>FinOps State: Efficient</span>
                </div>
              </div>
            </div>
            
            {/* Visual placeholder details */}
            <div className="h-36 w-full mt-3.5 rounded-xl bg-stone-50/50 dark:bg-slate-900/20 border border-stone-150 dark:border-slate-850 p-4.5 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                <span>Expenditures Telemetry Stream</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[8px] font-bold tracking-wide">Telemetry Active</span>
              </div>
              <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono">
                <span>May 1</span>
                <span>May 10</span>
                <span>May 20</span>
                <span>May 30</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted By logo row */}
      <section className="w-full py-10 border-y border-stone-200/80 dark:border-slate-800 bg-stone-50/40 dark:bg-slate-900/5 text-center">
        <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block mb-4">OPTIMIZING BILLS FOR ENGINEERS AT</span>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-bold text-stone-400 dark:text-stone-500 font-mono tracking-widest uppercase">
          <span>Stripe</span>
          <span>Linear</span>
          <span>Notion</span>
          <span>Vercel</span>
          <span>Arc</span>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section id="calculator" className="w-full py-20 bg-stone-50/30 dark:bg-slate-900/5 border-b border-stone-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-white tracking-tight leading-none mb-3">
              Calculate your visual FinOps savings
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-6 font-medium">
              Startups and enterprise engineering teams secure an average of **28% monthly invoice reduction** within weeks of deploying cost allocations, budget caps, and persistent block ssd pruning templates.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-500 font-bold max-w-xs">
              <Zap className="w-4 h-4 shrink-0" />
              <span>Verified against actual active cloud cost logs.</span>
            </div>
          </div>

          {/* Calculator slide */}
          <div className="w-full max-w-sm p-5.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm">
            <div className="mb-5.5">
              <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">
                <span>Monthly Cloud Expenses</span>
                <span className="text-xs text-stone-900 dark:text-white font-mono font-bold">${bill.toLocaleString()}</span>
              </div>
              
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={bill}
                onChange={(e) => setBill(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 appearance-none cursor-pointer accent-blue-500 focus:outline-none"
              />
              
              <div className="flex justify-between text-[9px] text-stone-400 font-mono mt-1.5">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 dark:bg-slate-900/40 border border-blue-500/10 text-center">
              <span className="text-[9px] text-stone-450 dark:text-stone-400 font-bold uppercase tracking-wider block">Estimated Annualized savings</span>
              <p className="text-3xl font-extrabold font-mono text-blue-500 mt-1 tracking-tight leading-none">
                ${(calculateSavings(bill) * 12).toLocaleString()}
              </p>
              <span className="text-[8.5px] text-stone-400 dark:text-stone-500 mt-1.5 block">(${calculateSavings(bill)}/mo average retention)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid feature showcase */}
      <section id="features" className="max-w-5xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h2 className="font-display font-bold text-2xl sm:text-4xl text-stone-900 dark:text-white tracking-tight mb-3">
          Deep observability. Breatheable design.
        </h2>
        <p className="text-stone-550 dark:text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-14">
          Everything startups require to consolidate billing logs, track spending velocity thresholds and automate waste cuts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title} 
                className="p-5.5 rounded-xl bg-white dark:bg-slate-900/60 border border-stone-200/80 dark:border-slate-800 text-left flex flex-col justify-between min-h-52 hover:border-stone-400 dark:hover:border-slate-700 transition-colors shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-4 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wide">{feat.title}</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mt-2">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Spacing elegant pricing grids */}
      <section id="pricing" className="w-full py-20 bg-stone-50/40 dark:bg-slate-900/5 border-t border-stone-200/85 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-stone-900 dark:text-white tracking-tight mb-3">
            Startup pricing that scales with you
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs max-w-sm mx-auto leading-relaxed mb-14">
            Cloud Cost Tracker grows along with your active multi-cloud infrastructures. Set up free tracking, upgrade to pro rules when needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col justify-between min-h-[380px] shadow-xs">
              <div>
                <span className="text-[9px] text-stone-450 dark:text-stone-400 font-bold uppercase tracking-wider font-mono">Personal lab</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">Hobby</h3>
                <p className="text-[11px] text-stone-400 mt-2">Perfect for solo developer side projects and portfolio syncs.</p>
                
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">$0</span>
                  <span className="text-[10px] text-stone-400 font-semibold font-mono">/ month</span>
                </div>

                <div className="space-y-2 text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-slate-850 pt-5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Single cloud integration credential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Max $1,500 tracked monthly spend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Weekly static costs summary</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/auth" 
                className="w-full mt-5 py-2 rounded-lg bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-700 text-center font-bold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                Start Free
              </Link>
            </div>

            {/* Pro tier */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-blue-500/40 dark:border-blue-500/30 flex flex-col justify-between min-h-[380px] shadow-xs relative">
              <div className="absolute top-4.5 right-4.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] text-blue-500 font-bold uppercase tracking-wide">
                RECOMMENDED
              </div>
              
              <div>
                <span className="text-[9px] text-blue-500 font-bold uppercase tracking-wider font-mono">SaaS Expansion</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">Startup Pro</h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">For high-growth teams requiring live threshold warnings and conversational AI reviews.</p>
                
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">$49</span>
                  <span className="text-[10px] text-stone-400 font-semibold font-mono">/ month</span>
                </div>

                <div className="space-y-2 text-[11px] text-stone-600 dark:text-stone-300 border-t border-stone-100 dark:border-slate-850 pt-5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Unlimited connected cloud integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>AI FinOps assistant conversational agent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Fuzzy search Cmd+K command palette</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/auth" 
                className="w-full mt-5 py-2.5 rounded-lg bg-blue-500 text-center font-bold text-xs text-white hover:bg-blue-600 transition-all shadow-sm cursor-pointer"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise tier */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col justify-between min-h-[380px] shadow-xs">
              <div>
                <span className="text-[9px] text-stone-450 dark:text-stone-400 font-bold uppercase tracking-wider font-mono">Custom Ingestion</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">Scale</h3>
                <p className="text-[11px] text-stone-400 mt-2">For large-scale teams needing Single-Sign-On (SSO) and dedicated node deployments.</p>
                
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold font-mono text-stone-900 dark:text-white">Custom</span>
                  <span className="text-[10px] text-stone-400 font-semibold font-mono">/ month</span>
                </div>

                <div className="space-y-2 text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-slate-850 pt-5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Dedicated technical FinOps account analyst</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>SAML / SSO integrations & custom SLA terms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>VPC logs cost allocations ingestion</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/auth" 
                className="w-full mt-5 py-2 rounded-lg bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-700 text-center font-bold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA elegant section */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 py-16 text-center relative z-10">
        <div className="p-10 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-[#151b26] flex flex-col items-center shadow-md">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-white tracking-tight">
            Consolidate your cloud expenditures today.
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs max-w-sm mx-auto mt-3 leading-relaxed font-medium">
            Stop over-paying for orphaned block resources and running developer clusters. Configure Cloud Cost Tracker inside 3 minutes.
          </p>
          
          <Link 
            href="/auth" 
            className="mt-6.5 flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
          >
            <span>Launch workspace instance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Page Footer */}
      <footer className="w-full py-8 border-t border-stone-200 dark:border-slate-850/60 bg-stone-50/20 dark:bg-[#0e121b]/40 text-center text-[10px] text-stone-450 dark:text-stone-500 font-mono tracking-wider uppercase">
        <p>© 2026 Cloud Cost Tracker Systems, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
