"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Terminal, Sparkles, ArrowRight, Lock, Mail, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("Dharmesh");
  const [email, setEmail] = useState("dharmesh@nebula.io");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex min-h-screen items-center justify-center p-4 bg-[#fafaf9] dark:bg-[#0e121b] text-stone-900 dark:text-stone-100 transition-colors duration-300 font-sans">
      
      {/* Outer wrapper panel */}
      <div className="w-full max-w-3xl min-h-[460px] rounded-2xl overflow-hidden border border-stone-250/80 dark:border-slate-800 bg-white dark:bg-[#151b26] shadow-xl flex flex-col md:flex-row relative">
        
        {/* Form block */}
        <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-6.5 h-6.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center border border-stone-200 dark:border-slate-800">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-semibold text-sm tracking-tight">Cloud Cost Tracker</span>
            </Link>

            <h2 className="font-display font-bold text-xl tracking-tight leading-none text-stone-900 dark:text-white">
              {isLogin ? "Welcome back" : "Create FinOps instance"}
            </h2>
            <p className="text-stone-400 dark:text-stone-500 text-xs mt-2 font-medium">
              {isLogin 
                ? "Authenticate your developer keys to enter the telemetry console." 
                : "Create a shared cost observability workspace for your team."
              }
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              {!isLogin && (
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-450 dark:text-stone-400 mb-1.5">Workspace Nickname</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50/50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                      placeholder="e.g. Dharmesh"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-450 dark:text-stone-400 mb-1.5">Developer Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50/50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                    placeholder="dharmesh@nebula.io"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-stone-450 dark:text-stone-400 mb-1.5">Secret Key Access</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    required
                    defaultValue="developer-token-pass"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50/50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 mt-5.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>{isLogin ? "Authenticate Console" : "Launch Workspace"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-[11px] text-stone-400 dark:text-stone-500 font-medium">
            {isLogin ? (
              <p>
                Don&apos;t have an instance?{" "}
                <button onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline font-bold">
                  Create Workspace
                </button>
              </p>
            ) : (
              <p>
                Already have an instance?{" "}
                <button onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline font-bold">
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Right side bullets info panel */}
        <div className="hidden md:flex w-80 bg-stone-50/40 dark:bg-slate-900/30 border-l border-stone-200/80 dark:border-slate-800 p-8 flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8.5px] text-blue-500 font-bold mb-4 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              <span>FinOps Hardened</span>
            </div>
            
            <h3 className="font-display font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wide leading-snug">
              Continuous Cloud Cost Optimization
            </h3>
            
            <p className="text-stone-550 dark:text-stone-400 text-[10.5px] leading-relaxed mt-2.5">
              Consolidate spending matrices, establish warning caps, download csv spreadsheets, and chat with AI compilers inside a quiet space.
            </p>
          </div>

          <div className="space-y-3.5 border-t border-stone-200 dark:border-slate-850 pt-6">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-stone-900 dark:text-white uppercase tracking-wider">Read-only IAM Sync</p>
                <p className="text-[9px] text-stone-450 dark:text-stone-500 mt-0.5 font-medium">Metrics synchronize safely using cross-account roles.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-stone-900 dark:text-white uppercase tracking-wider">Predictive warnings</p>
                <p className="text-[9px] text-stone-455 dark:text-stone-500 mt-0.5 font-medium">Identify cost spikes before budget thresholds overrun.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
