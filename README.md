# ☁️ Cloud Cost Tracker

> A premium, deeply human-centered multi-cloud cost observability and AI optimization SaaS workspace for engineering teams, startups, and indie hackers. 

Consolidate spending telemetry across **AWS, Google Cloud, and Azure** into a single calm workspace, identify operational waste, track active spend thresholds, and consult our FinOps AI conversational assistant.

Live Production URL: **[https://cloud-cost-tracker-cyan.vercel.app](https://cloud-cost-tracker-cyan.vercel.app)**  
GitHub Repository: **[https://github.com/VekariaDharmesh/Cloud-cost-tracker](https://github.com/VekariaDharmesh/Cloud-cost-tracker)**

---

## 🎨 Design Philosophy: "Quiet Luxury"

Cloud Cost Tracker shifts away from high-contrast neon cyberpunk templates and adopts a minimal, timeless, elegant, and deeply human-centered layout inspired by **Apple, Linear, Stripe, and Notion**:

*   **Warm dual-theme**: Elegant Graphite-dark mode default (`#0e121b` comfortable dark canvas) and Warm Alabaster-light mode (`#fafaf9` soft ivory base) transitions seamlessly.
*   **typographic elegance**: Leverages clean paired weights using Google Fonts **Inter** (for UI copy) and **Outfit** (headings display).
*   **Breathable whitespace**: Generous, visually breathable margins, thin 1px graphite borders (`border-stone-250/80` or `rgba(255,255,255,0.08)`), and realistic soft shadows.
*   **Quiet data visualizations**: Muted Recharts curves stacked area charts, comparative bar telemetry, and custom Cell distribution donuts with high-readability cartesian lines.

---

## ⚙️ Core Platform Features

1.  **Multi-Cloud Expense Tracking**: Connect and audit telemetry from AWS cross-account IAM roles, Google Cloud Service accounts, and Azure Subscription keys.
2.  **Telemetry Trends Graph**: Review daily spend velocities with stacked Recharts curve areas filterable by cloud tenants and categories.
3.  **Active Cost Cap Budgets**: Enforce monthly ops limits and verify warn thresholds progress rings (with immediate overrun indicator warnings).
4.  **AI optimization recommendations**: Continuous waste compiler that locates orphaned SSD block volumes, legacygp2 EBS structures, idle RDS instances, and prompt tokens payload inefficiencies.
5.  **Simulated Ingestions Engine**: High-fidelity React state framework pre-loaded with 90 days of realistic daily metrics data, notifying toasts alerts, and live event logs.
6.  **CSV/PDF Cost Summaries Compiler**: Interactive cost report assemblers with spinning progress states and confetti bursts on finished assembly.

---

## ⚡ Special UX Elements

*   **Onboarding slide wizard**: Human-friendly three-step onboarding introduction capturing nicknames, cloud integrations, and monthly spend limits.
*   **Notion-style Command Palette (`⌘K` / `Ctrl+K`)**: Query commands, pages pathways, and invoke AI assistant sessions via arrow keys and Enter.
*   **Conversational AI Assistant (`C` Hotkey)**: Conversational FinOps compiler interpreting natural prompts (e.g. *"Analyze GCP cost spike"*, *"How can I save on AWS?"*).
*   **Keyboard navigation combo hotkeys**:
    *   `G` then `D` &rarr; Go to Overview Dashboard
    *   `G` then `A` &rarr; Go to Analytics Deep-Dive
    *   `G` then `W` &rarr; Go to Team Workspace Settings
    *   `G` then `B` &rarr; Go to Billing Reports Ledgers
    *   `G` then `S` &rarr; Go to System Settings
    *   `C` &rarr; Open AI chat consultant
    *   `?` &rarr; Trigger shortcuts registry modal help

---

## 🛠️ Frontend Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack compiling, React 19)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (fluid sidebar drawers, page transitions)
*   **Telemetry charts**: [Recharts](https://recharts.org/)
*   **Iconography**: [Lucide React](https://lucide.dev/)
*   **Celebration bursts**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)

---

## 🚀 Quick Local Setup

Follow these steps to deploy and run Cloud Cost Tracker locally on your development machine:

1.  **Clone repository**:
    ```bash
    git clone https://github.com/VekariaDharmesh/Cloud-cost-tracker.git
    cd Cloud-cost-tracker
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch local development server**:
    ```bash
    npm run dev
    ```

4.  **Open web browser**:
    Navigate to **[http://localhost:3000](http://localhost:3000)** (or `http://localhost:3001` if port 3000 is occupied).

5.  **Compile production bundle**:
    Verify code static rendering or build compilation:
    ```bash
    npm run build
    ```

---

## 📂 Directories Architecture

```text
src/
├── app/
│   ├── auth/            # Apple-style minimalist Auth panel
│   ├── dashboard/       # Core application dashboard routes
│   │   ├── analytics/   # Recharts Comparative Bar & Cell Pie Donuts
│   │   ├── billing/     # Invoices ledgers table and CSV/PDF compiler
│   │   ├── settings/    # Integrations controls and budgets enforcement
│   │   └── workspace/   # Collaborators rosters and roles syncer
│   ├── globals.css      # Warm Alabaster & Graphite themes variables
│   ├── layout.tsx       # Root layout font pairings injector
│   └── page.tsx         # Vercel-style brochure landing page
├── components/
│   ├── AIChatBot.tsx    # Conversational FinOps chat assistant drawer
│   ├── CommandPalette.tsx # Fuzzy search Cmd+K navigations modal
│   ├── DashboardLayout.tsx # Responsive sidebar menu and theme switcher
│   └── OnboardingFlow.tsx # Friendly setup onboarding sliders
└── context/
    └── AppContext.tsx   # React FinOps simulated telemetry engine
```
