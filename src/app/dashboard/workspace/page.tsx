"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { 
  PlusCircle, 
  Mail, 
  Cloud,
  CheckCircle,
  AlertTriangle,
  Shield,
  Trash2
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Developer" | "Billing Manager" | "Viewer";
  status: "Active" | "Pending";
  avatar: string;
}

export default function WorkspaceManagement() {
  const { 
    currentWorkspace, 
    addWorkspace, 
    setWorkspace, 
    credentials,
    addActivity 
  } = useApp();

  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "m-1",
      name: "Dharmesh",
      email: "dharmesh@nebula.io",
      role: "Admin",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "m-2",
      name: "Emily Watson",
      email: "emily@nebula.io",
      role: "Billing Manager",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "m-3",
      name: "Liam Carter",
      email: "liam@nebula.io",
      role: "Developer",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "m-4",
      name: "Sarah Chen",
      email: "sarah@nebula.io",
      role: "Viewer",
      status: "Pending",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer");

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    addWorkspace(newWorkspaceName);
    setWorkspace(newWorkspaceName);
    setNewWorkspaceName("");
    setShowWorkspaceForm(false);
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&w=150&q=80`,
    };

    setTeamMembers((prev) => [...prev, newMember]);
    addActivity(`Invited collaborator '${inviteEmail}' as ${inviteRole}`, "plus-circle");
    setInviteEmail("");
  };

  const handleRemoveMember = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    if (member && member.role !== "Admin") {
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      addActivity(`Revoked team access for ${member.email}`, "trash");
    }
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4.5">
        <div>
          <h1 className="font-display font-semibold text-xl tracking-tight text-stone-900 dark:text-white">
            Workspace Settings
          </h1>
          <p className="text-stone-450 dark:text-stone-400 text-xs mt-1 font-medium">
            Manage team access rights, partition workspace environments, and verify cloud syncs integrity.
          </p>
        </div>

        <button
          onClick={() => setShowWorkspaceForm(!showWorkspaceForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-[var(--border)] text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5 text-stone-450" />
          <span>New Workspace</span>
        </button>
      </div>

      {/* Add Workspace Modal */}
      {showWorkspaceForm && (
        <form 
          onSubmit={handleCreateWorkspace}
          className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] max-w-sm mb-6 animate-fade-in shadow-sm"
        >
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">Create Workspace division</h3>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
              placeholder="e.g. Acme Production"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      )}

      {/* Split grids layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Team roster table representation (Span 2) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border)] mb-6">
            <div>
              <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Active Workspace Collaborators</h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Verify credentials permissions and configure roles.</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-stone-50 dark:bg-slate-900 border border-[var(--border)] text-[9px] text-stone-400 font-mono">
              {teamMembers.length} MEMBERS
            </span>
          </div>

          {/* Collaborators List */}
          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-0.5">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="p-3.5 rounded-xl border border-[var(--border)] bg-stone-50/10 dark:bg-slate-900/10 hover:border-stone-300 dark:hover:border-slate-800 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-8 h-8 rounded-full object-cover border border-[var(--border)] shrink-0" 
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white leading-tight">{member.name}</p>
                    <p className="text-[9.5px] text-stone-450 dark:text-stone-500 truncate mt-1 leading-none">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-blue-500/5 border border-blue-500/10 text-[8.5px] text-blue-500 font-bold uppercase font-mono">
                      {member.role}
                    </span>
                    <span className={`block text-[7.5px] font-bold mt-1.5 font-mono uppercase tracking-wider ${
                      member.status === "Active" ? "text-emerald-600" : "text-amber-500"
                    }`}>
                      {member.status}
                    </span>
                  </div>

                  {member.role !== "Admin" ? (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-red-500 transition-colors"
                      title="Revoke Team Access"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="p-1 text-stone-300">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Invite Collaborator Form */}
          <form onSubmit={handleInviteMember} className="mt-8 border-t border-[var(--border)] pt-6">
            <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">Invite new collaborator</h4>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] focus:border-blue-500 focus:outline-none text-xs text-[var(--foreground)]"
                  placeholder="collaborator@enterprise.io"
                />
              </div>

              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] text-xs text-stone-500 focus:border-blue-500 focus:outline-none min-w-[130px]"
              >
                <option value="Viewer">Viewer (Read)</option>
                <option value="Developer">Developer</option>
                <option value="Billing Manager">Billing Manager</option>
              </select>

              <button
                type="submit"
                className="px-4.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 cursor-pointer"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Connected Cloud Sync Connectors */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
          <div className="pb-3.5 border-b border-[var(--border)] mb-6">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">Cloud Connectors</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">Verify credentials status assigned to {currentWorkspace}.</p>
          </div>

          <div className="space-y-4">
            {credentials.map((cred) => (
              <div 
                key={cred.id}
                className="p-4 rounded-xl border border-[var(--border)] bg-stone-50/10 dark:bg-slate-900/10 flex flex-col justify-between min-h-24"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 border border-[var(--border)]">
                      <Cloud className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-white block leading-tight">{cred.name}</span>
                      <span className="text-[8px] font-mono text-stone-400 uppercase tracking-wide mt-1 block">{cred.provider} Sync</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono tracking-wider uppercase flex items-center gap-1 border ${
                    cred.status === "active" ? "bg-emerald-500/5 border-emerald-500/15 text-emerald-600" :
                    cred.status === "pending" ? "bg-amber-500/5 border-amber-500/15 text-amber-500" :
                    "bg-red-500/5 border-red-500/15 text-red-500"
                  }`}>
                    {cred.status === "active" ? <CheckCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                    <span>{cred.status}</span>
                  </span>
                </div>

                <div className="text-[9.5px] text-stone-450 dark:text-stone-550 font-mono mt-3 leading-normal truncate">
                  {cred.details}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
