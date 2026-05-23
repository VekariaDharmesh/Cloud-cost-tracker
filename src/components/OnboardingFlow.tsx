"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Check, 
  Cloud, 
  DollarSign,
  TrendingUp,
  Cpu
} from "lucide-react";
import confetti from "canvas-confetti";

export default function OnboardingFlow() {
  const { user, setOnboarded, addCredential, addBudget, addActivity } = useApp();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedClouds, setSelectedClouds] = useState<string[]>(["aws"]);
  const [budgetVal, setBudgetVal] = useState(2500);

  useEffect(() => {
    if (user && !user.onboarded) {
      setName(user.name || "Developer");
      setShow(true);
    }
  }, [user]);

  const toggleCloud = (id: string) => {
    setSelectedClouds((prev) => 
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    const duration = 2.0 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.15, 0.3), y: Math.random() - 0.25 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.85), y: Math.random() - 0.25 } });
    }, 250);

    selectedClouds.forEach((cloud) => {
      const nameMap: { [key: string]: string } = {
        aws: "Acme AWS Telemetry",
        azure: "Core Azure Workspace",
        gcp: "Google Cloud Sync Project",
      };
      addCredential(cloud as any, nameMap[cloud], `Synchronized during initial setup`);
    });

    addBudget({
      name: "Global Ops Limit Cap",
      amount: budgetVal,
      category: "all",
      cloud: "all",
      alertThreshold: 80,
    });

    addActivity("Completed setup onboarding", "sparkles");
    
    setTimeout(() => {
      setShow(false);
      setOnboarded(true);
    }, 800);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs" 
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl p-7 z-50 min-h-[420px] flex flex-col justify-between"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-5.5 h-5.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center border border-[var(--border)]">
                <Terminal className="w-3 h-3" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-stone-400 font-semibold uppercase">Workspace Onboarding</span>
            </div>
            
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    s <= step ? "bg-blue-500" : "bg-stone-100 dark:bg-slate-800"
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Slide 1 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-2xl text-[var(--foreground)] tracking-tight mb-2 leading-tight">
                Calm and clear cloud cost management.
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-5.5">
                Welcome to Cloud Cost Tracker. A quiet developer workspace built to consolidate your multi-cloud Telemetry, analyze usage anomalies, and recommend architectural optimizations. Let&apos;s start by setting up your workspace name.
              </p>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Workspace Nickname</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                  placeholder="Enter your workspace username"
                />
              </div>
            </motion.div>
          )}

          {/* Slide 2 */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-500">
                <Cloud className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-xl text-[var(--foreground)] tracking-tight mb-2 leading-none">
                Select your cloud targets
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-5.5">
                Choose the infrastructure platforms you currently deploy on. We will initialize secure read-only cost telemetry simulation models.
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "aws", name: "AWS", desc: "EC2, S3, RDS", col: "border-orange-500/30 text-orange-500" },
                  { id: "azure", name: "Azure", desc: "VMs, Storage", col: "border-sky-500/30 text-sky-500" },
                  { id: "gcp", name: "GCP", desc: "Compute Engine", col: "border-yellow-500/30 text-yellow-500" },
                ].map((cloud) => {
                  const active = selectedClouds.includes(cloud.id);
                  return (
                    <button
                      key={cloud.id}
                      onClick={() => toggleCloud(cloud.id)}
                      className={`p-3.5 rounded-xl text-left border flex flex-col justify-between h-28 transition-all relative ${
                        active 
                          ? `bg-stone-50 dark:bg-slate-900 border-stone-400 dark:border-slate-700` 
                          : "bg-white dark:bg-slate-900/30 border-[var(--border)] hover:border-stone-300 dark:hover:border-slate-800 text-stone-400"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[9px] font-bold font-mono tracking-wider ${active ? "text-[var(--foreground)]" : "text-stone-400"}`}>{cloud.name}</span>
                        {active && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[var(--foreground)]">{cloud.name} Telemetry</p>
                        <span className="text-[8px] text-stone-400 mt-0.5 block leading-none">{cloud.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Slide 3 */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-500">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-xl text-[var(--foreground)] tracking-tight mb-2 leading-none">
                Define cost threshold caps
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-5.5">
                Set a total monthly spending budget limit. Cloud Cost Tracker will notify you when daily spend speeds forecast an overrun.
              </p>

              <div className="p-4.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-[var(--border)] shadow-inner">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">MONTHLY OPS BUDGET</span>
                  <span className="text-base font-bold font-mono text-blue-500">${budgetVal.toLocaleString()} / mo</span>
                </div>
                
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-stone-200 dark:bg-slate-800 appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />

                <div className="flex justify-between text-[9px] text-stone-400 font-mono mt-2 leading-none">
                  <span>$500</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[10px] text-stone-400 leading-normal">
                <TrendingUp className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>AI projection model: Based on connected environments, setting a $2,500 budget establishes an active warning buffer of $800 against routine spikes.</span>
              </div>
            </motion.div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-between mt-6 border-t border-[var(--border)] pt-4 flex-row">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-3 py-1.5 text-xs font-semibold text-stone-400 hover:text-[var(--foreground)] transition-colors ${
                step === 1 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={() => step < 3 && setStep(step + 1)}
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-sm hover:bg-slate-800"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs shadow-sm hover:bg-blue-600 border border-blue-600/10"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Initialize Workspace</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
