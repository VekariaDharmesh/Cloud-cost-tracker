"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types definition
export interface CloudCredential {
  id: string;
  provider: "aws" | "azure" | "gcp";
  name: string;
  status: "active" | "error" | "pending";
  addedAt: string;
  details: string;
}

export interface BudgetRule {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: "all" | "compute" | "storage" | "database" | "network" | "ai";
  cloud: "all" | "aws" | "azure" | "gcp";
  alertThreshold: number; // e.g. 85 for 85%
}

export interface CostRecord {
  date: string;
  aws: number;
  azure: number;
  gcp: number;
  categories: {
    compute: number;
    storage: number;
    database: number;
    network: number;
    ai: number;
  };
}

export interface AISuggestion {
  id: string;
  provider: "aws" | "azure" | "gcp" | "general";
  title: string;
  description: string;
  category: "compute" | "storage" | "database" | "network" | "ai";
  potentialSavings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "active" | "applied" | "snoozed";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "warning" | "success" | "info" | "error";
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface AppContextType {
  // Auth state
  user: { name: string; email: string; avatar: string; onboarded: boolean } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  setOnboarded: (onboarded: boolean) => void;

  // Active Workspace
  currentWorkspace: string;
  workspaces: string[];
  setWorkspace: (name: string) => void;
  addWorkspace: (name: string) => void;

  // Cloud credentials
  credentials: CloudCredential[];
  addCredential: (provider: "aws" | "azure" | "gcp", name: string, details: string) => void;
  removeCredential: (id: string) => void;

  // Budget Rules
  budgets: BudgetRule[];
  addBudget: (budget: Omit<BudgetRule, "id" | "spent">) => void;
  removeBudget: (id: string) => void;

  // Spending data & metrics
  spendingData: CostRecord[];
  getFilteredSpendingData: (cloud: string, category: string) => any[];
  totalCost: number;
  previousMonthCost: number;
  predictedCost: number;
  totalSavings: number;

  // AI Cost suggestions
  suggestions: AISuggestion[];
  applySuggestion: (id: string) => void;
  snoozeSuggestion: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Activity logs
  activityLogs: ActivityLog[];
  addActivity: (action: string, icon: string) => void;

  // AI Chat Bot
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to generate mock daily cost history over past 90 days
const generateMockCostHistory = (): CostRecord[] => {
  const data: CostRecord[] = [];
  const start = new Date();
  start.setDate(start.getDate() - 90);

  let awsBase = 120;
  let azureBase = 80;
  let gcpBase = 45;

  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    // Introduce natural fluctuations & weekend dips
    const dayOfWeek = currentDate.getDay();
    const multiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.75 : 1.0;
    const randomVariation = () => (Math.random() * 0.15 - 0.05); // -5% to +10%

    // Calculate cloud costs
    const aws = parseFloat((awsBase * (1 + randomVariation()) * multiplier).toFixed(2));
    const azure = parseFloat((azureBase * (1 + randomVariation()) * multiplier).toFixed(2));
    const gcp = parseFloat((gcpBase * (1 + randomVariation()) * multiplier).toFixed(2));

    // Base cost slowly increases over time to simulate scaling infrastructure
    if (i > 60) {
      awsBase = 135;
      azureBase = 90;
      gcpBase = 58;
    }

    // Category breakdown math (adds up to total aws + azure + gcp)
    const total = aws + azure + gcp;
    const compute = parseFloat((total * 0.45).toFixed(2));
    const database = parseFloat((total * 0.25).toFixed(2));
    const storage = parseFloat((total * 0.15).toFixed(2));
    const network = parseFloat((total * 0.08).toFixed(2));
    const ai = parseFloat((total * 0.07).toFixed(2));

    data.push({
      date: dateStr,
      aws,
      azure,
      gcp,
      categories: { compute, storage, database, network, ai },
    });
  }

  return data;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State
  const [user, setUser] = useState<AppContextType["user"]>(null);

  // Active Workspace
  const [currentWorkspace, setWorkspace] = useState<string>("Personal Lab");
  const [workspaces, setWorkspaces] = useState<string[]>(["Personal Lab", "Acme Production", "Solopreneur SaaS"]);

  // Cloud credentials list
  const [credentials, setCredentials] = useState<CloudCredential[]>([
    {
      id: "cred-1",
      provider: "aws",
      name: "Acme AWS Production",
      status: "active",
      addedAt: "2026-03-12",
      details: "IAM Role: arn:aws:iam::123456789012:role/NebulaCostReadOnly",
    },
    {
      id: "cred-2",
      provider: "gcp",
      name: "Nebula Core GCP",
      status: "active",
      addedAt: "2026-04-05",
      details: "Service Account: nebula-sync@nebula-core.iam.gserviceaccount.com",
    },
    {
      id: "cred-3",
      provider: "azure",
      name: "Staging Azure Subscription",
      status: "error",
      addedAt: "2026-05-10",
      details: "Subscription ID: f821d394-46bb-49e0-8a1a-4c22fb09ff3b",
    },
  ]);

  // Budget Rules
  const [budgets, setBudgets] = useState<BudgetRule[]>([
    { id: "b-1", name: "AWS EC2 Compute Cap", amount: 3500, spent: 3020, category: "compute", cloud: "aws", alertThreshold: 85 },
    { id: "b-2", name: "AI API Model Budgets", amount: 800, spent: 610, category: "ai", cloud: "all", alertThreshold: 75 },
    { id: "b-3", name: "Storage Overflow Limit", amount: 1500, spent: 1650, category: "storage", cloud: "all", alertThreshold: 90 },
  ]);

  // Cost Data State
  const [spendingData, setSpendingData] = useState<CostRecord[]>([]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Budget Threshold Exceeded",
      message: "The budget 'Storage Overflow Limit' has exceeded its $1500 threshold and currently sits at $1650 (110% used).",
      type: "error",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "Cost Spike Detected on GCP",
      message: "GCP BigQuery costs spiked 42% on May 21st, due to a massive batch sync operation.",
      type: "warning",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: "notif-3",
      title: "Savings Recommendations Ready",
      message: "Nebula AI has discovered $685 in potential monthly savings. Tap dashboard optimization to apply.",
      type: "success",
      timestamp: "2 days ago",
      read: true,
    },
  ]);

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: "log-1", user: "You", action: "Generated Billing Report (PDF) for April 2026", timestamp: "1 hour ago", icon: "file" },
    { id: "log-2", user: "Nebula AI", action: "Detected underutilized AWS RDS Database db.t3.medium", timestamp: "5 hours ago", icon: "cpu" },
    { id: "log-3", user: "You", action: "Updated Azure credentials for 'Staging Azure Subscription'", timestamp: "1 day ago", icon: "key" },
    { id: "log-4", user: "System", action: "Connected Google Cloud Service Account sync", timestamp: "3 days ago", icon: "cloud" },
  ]);

  // AI suggestions
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([
    {
      id: "sug-1",
      provider: "aws",
      title: "Convert to EC2 Reserved Instances",
      description: "You have 4 x t3.large EC2 compute nodes running continuously in us-east-1. Converting them to a 1-year No-Upfront Reserved Instance saves 34% compared to on-demand pricing.",
      category: "compute",
      potentialSavings: 142,
      difficulty: "Easy",
      status: "active",
    },
    {
      id: "sug-2",
      provider: "gcp",
      title: "Prune Detached SSD Persistent Disks",
      description: "Identified 8 detached, non-partitioned high-performance SSD persistent disks totalizing 1.2 TB of unattached storage in asia-east1.",
      category: "storage",
      potentialSavings: 180,
      difficulty: "Easy",
      status: "active",
    },
    {
      id: "sug-3",
      provider: "aws",
      title: "Upgrade gp2 EBS Volumes to gp3",
      description: "Upgrade 12 EBS volumes from gp2 to gp3. gp3 provides 20% cheaper storage per GB with higher baseline IOPS Performance.",
      category: "storage",
      potentialSavings: 95,
      difficulty: "Medium",
      status: "active",
    },
    {
      id: "sug-4",
      provider: "azure",
      title: "Scale Down Idle SQL Databases",
      description: "Database 'acme-user-staging' has stayed under 2% CPU usage for the past 14 consecutive days. Downgrade from Premium P1 to Standard S1.",
      category: "database",
      potentialSavings: 120,
      difficulty: "Easy",
      status: "active",
    },
    {
      id: "sug-5",
      provider: "general",
      title: "Implement LLM Context Caching",
      description: "AI API usage spiked 80% due to redundant system instructions on Anthropic/OpenAI APIs. Enable semantic prompt caching inside your orchestrator node.",
      category: "ai",
      potentialSavings: 240,
      difficulty: "Hard",
      status: "active",
    },
  ]);

  // AI chatbot messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "c-1",
      sender: "ai",
      text: "Hello! I am Nebula's AI Cost Optimization Assistant. I can analyze your multi-cloud spending, identify spikes, and detail cheaper architectural alternatives. Try asking me: 'How can I save on AWS?' or 'Explain my storage budget overruns.'",
      timestamp: "System Initialized",
    },
  ]);

  // Initialize and load mock data
  useEffect(() => {
    setSpendingData(generateMockCostHistory());
    
    // Check if user is pre-loaded or on-boarded
    const storedUser = localStorage.getItem("nebula_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Setup a default initial user that hasn't finished onboarding yet
      setUser({
        name: "Dharmesh",
        email: "dharmesh@nebula.io",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        onboarded: false,
      });
    }
  }, []);

  // Sync user state changes to localStorage
  const login = (name: string, email: string) => {
    const updatedUser = {
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&w=150&q=80`,
      onboarded: true,
    };
    setUser(updatedUser);
    localStorage.setItem("nebula_user", JSON.stringify(updatedUser));
    addActivity(`Logged in as ${name}`, "user");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nebula_user");
  };

  const setOnboarded = (onboarded: boolean) => {
    if (user) {
      const updatedUser = { ...user, onboarded };
      setUser(updatedUser);
      localStorage.setItem("nebula_user", JSON.stringify(updatedUser));
    }
  };

  const addWorkspace = (name: string) => {
    setWorkspaces((prev) => [...prev, name]);
    addActivity(`Created workspace '${name}'`, "plus-circle");
  };

  // Cloud credential logic
  const addCredential = (provider: "aws" | "azure" | "gcp", name: string, details: string) => {
    const newCred: CloudCredential = {
      id: `cred-${Date.now()}`,
      provider,
      name,
      status: "active",
      addedAt: new Date().toISOString().split("T")[0],
      details,
    };
    setCredentials((prev) => [...prev, newCred]);
    addActivity(`Connected ${provider.toUpperCase()} integration: ${name}`, "cloud");
    
    // Push notification toast
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Integration Successful",
      message: `Successfully connected ${provider.toUpperCase()} account '${name}' to Nebula. Ingesting metrics...`,
      type: "success",
      timestamp: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const removeCredential = (id: string) => {
    const credential = credentials.find((c) => c.id === id);
    setCredentials((prev) => prev.filter((c) => c.id !== id));
    if (credential) {
      addActivity(`Disconnected ${credential.provider.toUpperCase()}: ${credential.name}`, "trash");
    }
  };

  // Budget management logic
  const addBudget = (budget: Omit<BudgetRule, "id" | "spent">) => {
    const newBudget: BudgetRule = {
      ...budget,
      id: `b-${Date.now()}`,
      spent: Math.floor(Math.random() * budget.amount * 0.8), // simulated current usage
    };
    setBudgets((prev) => [...prev, newBudget]);
    addActivity(`Created budget '${budget.name}' with limit $${budget.amount}`, "dollar-sign");
  };

  const removeBudget = (id: string) => {
    const budget = budgets.find((b) => b.id === id);
    setBudgets((prev) => prev.filter((b) => b.id !== id));
    if (budget) {
      addActivity(`Deleted budget rule: ${budget.name}`, "trash");
    }
  };

  // Process Cost Metric math
  const currentMonthCosts = spendingData.slice(-30);
  const totalCost = currentMonthCosts.reduce((sum, day) => sum + day.aws + day.azure + day.gcp, 0);

  const prevMonthCosts = spendingData.slice(-60, -30);
  const previousMonthCost = prevMonthCosts.length > 0
    ? prevMonthCosts.reduce((sum, day) => sum + day.aws + day.azure + day.gcp, 0)
    : totalCost * 0.92;

  const predictedCost = totalCost * 1.08; // forecast slightly higher based on ingestion trend
  const totalSavings = suggestions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.potentialSavings, 0);

  // Apply suggestions
  const applySuggestion = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (suggestion) {
      setSuggestions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "applied" as const } : s))
      );
      addActivity(`Applied savings recommendation: ${suggestion.title}`, "check-circle");
      
      const newNotification: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Savings Applied Successfully",
        message: `Applied '${suggestion.title}'. Your cloud invoice will reflect an estimated $${suggestion.potentialSavings}/mo reduction.`,
        type: "success",
        timestamp: "Just now",
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
  };

  const snoozeSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "snoozed" as const } : s))
    );
  };

  // Activity stream adder
  const addActivity = (action: string, icon: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: user?.name || "You",
      action,
      timestamp: "Just now",
      icon,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Notifications functions
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Flexible category and provider filter
  const getFilteredSpendingData = (cloud: string, category: string) => {
    if (!spendingData.length) return [];
    
    return spendingData.slice(-30).map((record) => {
      let cost = 0;
      if (cloud === "all") {
        cost = record.aws + record.azure + record.gcp;
      } else if (cloud === "aws") {
        cost = record.aws;
      } else if (cloud === "azure") {
        cost = record.azure;
      } else if (cloud === "gcp") {
        cost = record.gcp;
      }

      // If category is specific, scale down to match category representation
      if (category !== "all") {
        const catMap: { [key: string]: number } = {
          compute: 0.45,
          database: 0.25,
          storage: 0.15,
          network: 0.08,
          ai: 0.07,
        };
        cost = cost * (catMap[category] || 1);
      }

      return {
        date: new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        cost: parseFloat(cost.toFixed(2)),
        aws: cloud === "all" || cloud === "aws" ? record.aws : 0,
        azure: cloud === "all" || cloud === "azure" ? record.azure : 0,
        gcp: cloud === "all" || cloud === "gcp" ? record.gcp : 0,
      };
    });
  };

  // Dynamic Rule-Based AI Response Engine
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `chat-${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // Calculate simulated processing time for visual delay
    setTimeout(() => {
      let reply = "";
      const query = text.toLowerCase();

      if (query.includes("save") || query.includes("optimize") || query.includes("cheaper")) {
        reply = `Nebula AI cost engine is tracking **$${totalSavings.toFixed(0)}/month** in potential optimizations across your active projects:
\n\n1. **AWS EC2 Reserved Instances**: Save **$142/mo** by securing 1-year contract coverage.
\n2. **Prune Orphaned GCP SSDs**: Save **$180/mo** by deleting 1.2 TB of unattached block drives.
\n3. **Implement LLM Prompt Caching**: Save **$240/mo** in token payloads.
\n\nWould you like me to guide you through applying any of these policies directly?`;
      } else if (query.includes("aws") || query.includes("amazon")) {
        const awsSpent = spendingData.slice(-30).reduce((sum, r) => sum + r.aws, 0);
        reply = `Your Amazon Web Services (AWS) spending over the last 30 days is **$${awsSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}**.
\n\n- **Primary Resource Cost**: Elastic Compute Cloud (EC2) accounts for 45% of total AWS costs.
\n- **Cost Anomalies**: No heavy anomalous peaks. Minor fluctuations are due to routine dev builds.
\n- **Best Optimization**: Moving 4 continuously running dev nodes in us-east-1 to gp3 volume structures saves ~20% of storage cost, and securing a Standard RI will cut compute costs.`;
      } else if (query.includes("azure") || query.includes("microsoft")) {
        const azureSpent = spendingData.slice(-30).reduce((sum, r) => sum + r.azure, 0);
        reply = `Your Azure integration is currently reflecting a billing total of **$${azureSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}** for the past 30 days.
\n\n⚠️ **Sync Warning**: Note that your 'Staging Azure Subscription' is currently yielding API connection timeouts. I recommend regenerating your Azure API credentials in [Settings](file:///Users/vekariadharmeshh/Desktop/Dharmesh's%20File/Cloud%20Cost%20Tracker/src/app/dashboard/settings/page.tsx) to resolve cost-ingestion syncs!`;
      } else if (query.includes("gcp") || query.includes("google") || query.includes("cloud SQL")) {
        const gcpSpent = spendingData.slice(-30).reduce((sum, r) => sum + r.gcp, 0);
        reply = `Your Google Cloud Platform (GCP) spending stands at **$${gcpSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}** this month.
\n\n- **Highlight Area**: Storage disks. We detected **$180/mo** lost on 8 fully detached SSD Persistent Disks.
\n- **Storage Spike**: BigQuery querying experienced a 42% cost spike on May 21st due to a batch ETL operation.`;
      } else if (query.includes("budget") || query.includes("overrun") || query.includes("exceed")) {
        reply = `You have **3 configured budgets**. Currently, **1 budget is in warning / overrun state**:
\n\n- 🔴 **Storage Overflow Limit**: Active overrun. Spent **$1,650** of **$1,500** budget limit (110% used).
\n- 🟡 **AI API Model Budgets**: Near limit. Spent **$610** of **$800** budget limit (76.2% used).
\n- 🟢 **AWS EC2 Compute Cap**: Healthy. Spent **$3,020** of **$3,500** budget limit (86.2% used).
\n\nYou can configure threshold Slack/Email alerts or scale down unattached drives to get back inside your budget targets.`;
      } else if (query.includes("compute") || query.includes("instance") || query.includes("server")) {
        reply = `Compute costs represent **45%** of your total monthly infrastructure spending, totaling roughly **$${(totalCost * 0.45).toFixed(2)}**.
\n\nOur analysis suggests you are over-provisioning:
\n- Your staging Kubernetes clusters have a baseline CPU utilization under 12%.
\n- Staging Azure SQL databases have run under 2% usage for 14 straight days.
\n- You can safely downscale these staging environments on weekends to save an estimated **$220/month**.`;
      } else {
        reply = `I've analyzed your multi-cloud environment:
\n\n- **Total Monthly Spend**: $${totalCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
\n- **Projected End-of-Month Spend**: $${predictedCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
\n- **Active Savings Found**: $${totalSavings.toFixed(0)}/mo
\n\nYou can narrow down our conversation by asking specific infrastructure questions, such as "List my GCP savings suggestions" or "Which integrations have failures?".`;
      }

      const aiMessage: ChatMessage = {
        id: `chat-${Date.now()}-ai`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    }, 850);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: "c-1",
        sender: "ai",
        text: "Chat feed cleared. Let me know if you need any cloud architecture reviews!",
        timestamp: "System Reset",
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        setOnboarded,
        currentWorkspace,
        workspaces,
        setWorkspace,
        addWorkspace,
        credentials,
        addCredential,
        removeCredential,
        budgets,
        addBudget,
        removeBudget,
        spendingData,
        getFilteredSpendingData,
        totalCost,
        previousMonthCost,
        predictedCost,
        totalSavings,
        suggestions,
        applySuggestion,
        snoozeSuggestion,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        activityLogs,
        addActivity,
        chatMessages,
        sendChatMessage,
        clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
