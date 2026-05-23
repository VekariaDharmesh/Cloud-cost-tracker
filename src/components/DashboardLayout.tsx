"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings2, 
  Search, 
  Bell, 
  Sparkles, 
  Menu, 
  X, 
  Terminal, 
  LogOut,
  ChevronDown,
  Info,
  AlertTriangle,
  CheckCircle,
  Keyboard,
  Sun,
  Moon
} from "lucide-react";
import CommandPalette from "./CommandPalette";
import AIChatBot from "./AIChatBot";
import OnboardingFlow from "./OnboardingFlow";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    user, 
    logout, 
    currentWorkspace, 
    workspaces, 
    setWorkspace, 
    notifications, 
    markNotificationRead,
    markAllNotificationsRead,
    addActivity 
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  
  // Theme state: dark default or light theme
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Initial theme load
    const savedTheme = localStorage.getItem("nebula_theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme === "light" ? "light-theme" : "dark-theme";
    } else {
      document.body.className = "dark-theme";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("nebula_theme", newTheme);
    document.body.className = newTheme === "light" ? "light-theme" : "dark-theme";
    addActivity(`Switched interface theme to ${newTheme.toUpperCase()}`, "settings");
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    let keyBuffer = "";
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
        return;
      }

      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === "INPUT" || 
        activeEl.tagName === "TEXTAREA" || 
        activeEl.getAttribute("contenteditable") === "true"
      );

      if (isTyping) return;

      if (e.key === "c") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("toggle-nebula-chat"));
        addActivity("Opened AI Cost Assistant via shortcut", "sparkles");
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShortcutsModalOpen(true);
        return;
      }

      keyBuffer += e.key.toLowerCase();
      clearTimeout(timer);
      
      if (keyBuffer === "gd") {
        router.push("/dashboard");
        keyBuffer = "";
      } else if (keyBuffer === "ga") {
        router.push("/dashboard/analytics");
        keyBuffer = "";
      } else if (keyBuffer === "gw") {
        router.push("/dashboard/workspace");
        keyBuffer = "";
      } else if (keyBuffer === "gb") {
        router.push("/dashboard/billing");
        keyBuffer = "";
      } else if (keyBuffer === "gs") {
        router.push("/dashboard/settings");
        keyBuffer = "";
      }

      timer = setTimeout(() => {
        keyBuffer = "";
      }, 800);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [router, addActivity]);

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Cost Analytics", path: "/dashboard/analytics", icon: BarChart3 },
    { name: "Team Workspaces", path: "/dashboard/workspace", icon: Users },
    { name: "Billing Reports", path: "/dashboard/billing", icon: FileText },
    { name: "Settings", path: "/dashboard/settings", icon: Settings2 },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-[var(--border)] bg-[var(--card)] h-screen fixed z-20 transition-all duration-300">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-[var(--border)] shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-semibold text-sm tracking-tight text-[var(--foreground)]">
              Cloud Cost Tracker
            </span>
          </Link>
          <button 
            onClick={() => setShortcutsModalOpen(true)}
            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-[var(--foreground)] transition-colors"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Workspace selector dropdown */}
        <div className="px-4 py-3 relative border-b border-[var(--border)]">
          <button
            onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-900/30 border border-[var(--border)] hover:bg-stone-100 dark:hover:bg-slate-800/50 text-[var(--foreground)] text-xs font-semibold transition-all"
          >
            <span className="truncate">{currentWorkspace}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${workspaceDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {workspaceDropdownOpen && (
            <div className="absolute left-4 right-4 mt-1.5 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl z-30 animate-in fade-in duration-200">
              {workspaces.map((workspace) => (
                <button
                  key={workspace}
                  onClick={() => {
                    setWorkspace(workspace);
                    setWorkspaceDropdownOpen(false);
                    addActivity(`Switched workspace to '${workspace}'`, "compass");
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    currentWorkspace === workspace 
                      ? "bg-blue-500/10 text-blue-500" 
                      : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800/60 hover:text-[var(--foreground)]"
                  }`}
                >
                  {workspace}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation lists */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  active 
                    ? "bg-stone-100 dark:bg-slate-800 text-[var(--foreground)] border-l-2 border-blue-500" 
                    : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-900/20 hover:text-[var(--foreground)] border-l-2 border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-blue-500" : "text-stone-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu: Theme switcher & profile */}
        <div className="p-3 border-t border-[var(--border)] bg-stone-50/40 dark:bg-slate-900/10 flex flex-col gap-2.5">
          {/* Theme switcher */}
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-[var(--foreground)] transition-colors"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* User Details */}
          <div className="flex items-center justify-between p-1.5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                alt={user?.name || "Avatar"} 
                className="w-7 h-7 rounded-full object-cover border border-[var(--border)]"
              />
              <div className="truncate">
                <p className="text-[11px] font-bold text-[var(--foreground)] truncate leading-none">{user?.name || "Dharmesh"}</p>
                <p className="text-[9px] text-stone-400 mt-1 truncate leading-none">{user?.email || "dharmesh@nebula.io"}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="p-1 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container Layout */}
      <div className="flex-1 lg:pl-60 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md px-6 transition-all">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-500 dark:text-stone-400 hover:text-[var(--foreground)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick search input button */}
            <button
              onClick={() => setCmdPaletteOpen(true)}
              className="hidden md:flex items-center gap-2.5 px-3 py-1.5 w-60 rounded-lg bg-stone-100/50 dark:bg-slate-900/30 border border-[var(--border)] hover:border-stone-300 dark:hover:border-slate-700 text-left text-stone-400 text-xs transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search workspace...</span>
              <span className="ml-auto px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-[9px] border border-[var(--border)] font-mono text-stone-400">⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher on mobile / navbar */}
            <button
              onClick={toggleTheme}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-500 dark:text-stone-400"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>FinOps Monitor Online</span>
            </div>

            {/* Notifications Drawer */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-500 dark:text-stone-400 hover:text-[var(--foreground)] transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-sm" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3 w-76 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl z-30 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border)]">
                    <span className="text-xs font-bold text-[var(--foreground)]">Workspace Alerts ({unreadCount})</span>
                    <button 
                      onClick={() => markAllNotificationsRead()}
                      className="text-[10px] text-blue-500 hover:underline font-semibold"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2 pr-0.5">
                    {notifications.length === 0 ? (
                      <p className="text-[10px] text-stone-400 py-6 text-center">Zero warnings active.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            notif.read 
                              ? "bg-transparent border-transparent opacity-50" 
                              : "bg-stone-50 dark:bg-slate-900/30 border-[var(--border)] hover:bg-stone-100 dark:hover:bg-slate-800/40"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {notif.type === "error" && <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />}
                            {notif.type === "warning" && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />}
                            {notif.type === "success" && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />}
                            {notif.type === "info" && <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />}
                            
                            <div className="flex-1 min-w-0">
                              <p className={`text-[10px] font-bold truncate ${notif.read ? "text-stone-400" : "text-[var(--foreground)]"}`}>{notif.title}</p>
                              <p className="text-[9px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">{notif.message}</p>
                              <span className="text-[8px] text-stone-400 mt-1 block">{notif.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs" 
            />

            <div className="fixed top-0 bottom-0 left-0 flex flex-col w-60 bg-[var(--card)] border-r border-[var(--border)] p-5 z-50 animate-sidebar-slide">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-[var(--border)]">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-display font-semibold text-sm tracking-tight text-[var(--foreground)]">Cloud Cost Tracker</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        active 
                          ? "bg-stone-100 dark:bg-slate-800 text-[var(--foreground)] border-l-2 border-blue-500" 
                          : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-900 border-l-2 border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-[var(--border)] pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                    alt={user?.name || "Avatar"} 
                    className="w-8 h-8 rounded-full object-cover border border-[var(--border)]"
                  />
                  <div className="truncate">
                    <p className="text-[10px] font-bold text-[var(--foreground)] truncate leading-none">{user?.name || "Dharmesh"}</p>
                    <p className="text-[8px] text-stone-400 mt-1 truncate leading-none">{user?.email || "dharmesh@nebula.io"}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Main Children */}
        <main className="flex-1 p-6 sm:p-8 animate-fade-in duration-300 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Reusable Modals & Assistant */}
      <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
      <AIChatBot />
      <OnboardingFlow />

      {/* Keyboard Shortcuts Modal */}
      {shortcutsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setShortcutsModalOpen(false)} />
          
          <div className="relative w-full max-w-xs p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl z-50 animate-fade-in">
            <button
              onClick={() => setShortcutsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-[var(--foreground)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <h3 className="font-display font-semibold text-xs text-[var(--foreground)] mb-4 flex items-center gap-1.5 uppercase tracking-wider">
              <Keyboard className="w-4 h-4 text-blue-500" />
              <span>Shortcuts Registry</span>
            </h3>

            <div className="space-y-3 font-mono text-[10px]">
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Search Workspace</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">⌘K</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Open AI Consultant</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">C</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Go to Overview</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">GD</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Go to Analytics</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">GA</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Go to Workspace</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">GW</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                <span className="text-stone-400 font-sans">Go to Settings</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] text-stone-500">GS</span>
              </div>
              <div className="flex items-center justify-between py-1 font-sans text-stone-400">
                <span>Show Help modal</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-900 border border-[var(--border)] font-mono text-stone-500">?</span>
              </div>
            </div>
            
            <button
              onClick={() => setShortcutsModalOpen(false)}
              className="w-full mt-5 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all text-xs font-bold shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
