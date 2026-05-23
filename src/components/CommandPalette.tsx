"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Terminal, 
  Sparkles, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings2,
  DollarSign,
  ArrowRight
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { addActivity } = useApp();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, search]);

  const items = [
    {
      name: "Go to Dashboard Overview",
      desc: "Summary widgets, primary costs telemetry and spend caps progress",
      category: "Navigation",
      icon: LayoutDashboard,
      action: () => {
        router.push("/dashboard");
        addActivity("Navigated to Overview via search panel", "compass");
        onClose();
      }
    },
    {
      name: "Go to Cost Analytics",
      desc: "Perform category allocations audits and multi-cloud comparatives",
      category: "Navigation",
      icon: BarChart3,
      action: () => {
        router.push("/dashboard/analytics");
        addActivity("Navigated to Analytics via search panel", "compass");
        onClose();
      }
    },
    {
      name: "Go to Team Workspace",
      desc: "Configure developer access rights and connect cloud sync targets",
      category: "Navigation",
      icon: Users,
      action: () => {
        router.push("/dashboard/workspace");
        addActivity("Navigated to Workspace via search panel", "compass");
        onClose();
      }
    },
    {
      name: "Go to Billing Reports",
      desc: "Download historic billing CSVs and compile PDF summaries",
      category: "Navigation",
      icon: FileText,
      action: () => {
        router.push("/dashboard/billing");
        addActivity("Navigated to Billing Reports via search panel", "compass");
        onClose();
      }
    },
    {
      name: "Go to System Settings",
      desc: "Configure provider integration keys and configure cost cap limits",
      category: "Navigation",
      icon: Settings2,
      action: () => {
        router.push("/dashboard/settings");
        addActivity("Navigated to Settings via search panel", "compass");
        onClose();
      }
    },
    {
      name: "Launch AI Optimization Assistant",
      desc: "Review cost waste recommendations with Nebula conversational compiler",
      category: "AI FinOps",
      icon: Sparkles,
      action: () => {
        window.dispatchEvent(new CustomEvent("toggle-nebula-chat"));
        addActivity("Invoked AI conversation helper", "sparkles");
        onClose();
      }
    },
    {
      name: "Establish Cost Budget Rule",
      desc: "Enforce monthly caps on specific providers or products categories",
      category: "Actions",
      icon: DollarSign,
      action: () => {
        router.push("/dashboard/settings");
        addActivity("Navigated to budget setups via search panel", "compass");
        onClose();
      }
    }
  ];

  const filteredItems = items.filter(
    (item) => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs" 
          />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Input Search block */}
            <div className="flex items-center gap-3 px-4.5 py-3.5 border-b border-[var(--border)] bg-stone-50/50 dark:bg-slate-900/10">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-[var(--foreground)] placeholder-stone-400 focus:outline-none text-xs"
                placeholder="Search resources, navigation pathways or FinOps commands..."
              />
              <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-[8px] text-stone-400 font-mono">ESC</span>
            </div>

            {/* List entries */}
            <div className="max-h-76 overflow-y-auto p-1.5">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <Terminal className="w-6 h-6 text-stone-350 dark:text-stone-700 mx-auto mb-2" />
                  <p className="text-[10px] text-stone-400 font-semibold">No commands found matching &quot;{search}&quot;</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const highlighted = index === selectedIndex;
                    return (
                      <button
                        key={item.name}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                          highlighted 
                            ? "bg-stone-100 dark:bg-slate-800 text-[var(--foreground)] border-l-2 border-blue-500" 
                            : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-900/10 hover:text-[var(--foreground)] border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            highlighted ? "bg-blue-500/15 text-blue-500" : "bg-stone-100 dark:bg-slate-900 text-stone-400"
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold">{item.name}</span>
                              <span className="text-[8px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 text-stone-400 border border-[var(--border)]">{item.category}</span>
                            </div>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 truncate leading-none">{item.desc}</p>
                          </div>
                        </div>

                        {highlighted && (
                          <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Command Palette footer navigation guides */}
            <div className="px-4 py-2 border-t border-[var(--border)] bg-stone-50/40 dark:bg-slate-900/10 flex items-center justify-between text-[8px] text-stone-400 font-mono">
              <span className="flex items-center gap-1">
                <span>↑↓</span> to navigate
              </span>
              <span className="flex items-center gap-1">
                <span>⏎</span> to select
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
