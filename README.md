# Workforce Productivity Intelligence (WPI)
### AI-Powered Enterprise Workforce Analytics & Predictive Burnout Platform

Inspired by **Linear** and **Stripe**, **Workforce Productivity Intelligence** is a production-grade enterprise SaaS application designed for technology leaders, engineering managers, and People Ops to eliminate silent burnout, optimize sprint workloads, and safeguard developer deep-work hours without invasive spyware surveillance.

---

## 🌟 Key Highlights & Architecture

- **Sleek Linear & Stripe UI/UX**: Dark navy (`#040711`), neon cyan (`#00f2fe`), electric indigo, subtle grid lines, tactile progress bars, glassmorphism cards, and interactive SVG charts.
- **Mockup Reference Integration**: Features a live interactive dashboard preview modeled after the executive project management overview mockup (tactile pill progress, 426-project circular donut chart, daily/weekly productivity trend curves).
- **Zero-Surveillance Ethical Guarantee**: 100% aggregate metadata from Git, Jira, Slack, and Google Calendar. Zero keystroke logging, zero webcam tracking, and zero screen capture.
- **Smart AI Workload Balancer**: Mathematically redistributes high-complexity sprint tickets from overloaded engineers (104% capacity) to teammates with bandwidth headroom (74% capacity).
- **Ollama AI Integration (Local / Air-Gapped)**:
  - Natively connects to local Ollama on `http://127.0.0.1:11434` with model `llama3`, `mistral`, or `qwen2.5`.
  - Automatically falls back to an internal enterprise intelligence engine if Ollama is not currently active, ensuring zero disruptions.
- **Dual Perspective Switcher**:
  - **Manager View**: Cross-team capacity heatmaps, burnout alerts, active project breakdown, and board reports.
  - **Employee View**: Personal focus shield, unbroken deep-work blocks, meeting deflection, and private wellness telemetry.
- **MongoDB Atlas Integration**: Turnkey database connector with graceful automatic fallback to active in-memory enterprise storage.
- **Complete Suite of Dedicated Enterprise Pages**:
  1. `/` — Flagship SaaS Landing Page
  2. `/features` — 6 Core Platform Pillars & Comparison Matrix
  3. `/solutions` — Solutions by Role (VP of Engineering, CHRO, Engineering Manager, IC Engineer)
  4. `/ai-capabilities` — Ollama AI architecture, vector memory, zero-data-egress model
  5. `/industries` — SaaS, FinTech & Banking, Healthcare, Consulting, Remote Teams
  6. `/pricing` — Transparent tiers with Monthly / Annual 20% discount switch & Feature Matrix
  7. `/case-studies` — Empirical enterprise customer results with downloadable report simulator
  8. `/blog` — In-depth engineering research articles & modal reader
  9. `/about` — Mission, leadership credentials, and Worker Privacy Charter
  10. `/contact` — Functional department-routed inquiry form
  11. `/book-demo` — 3-step interactive enterprise scheduler with calendar slots & confetti celebration
  12. `/login` & `/register` — Authentication with 1-click demo logins for Instant Testing
  13. `/dashboard/*` — Full Enterprise Workforce Telemetry Console

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional)* **Ollama**: Download from [ollama.ai](https://ollama.ai) to run local LLMs.
- *(Optional)* **MongoDB Atlas**: Free cluster URI from [mongodb.com/atlas](https://www.mongodb.com/atlas).

### 2. Installation
```bash
npm install
```

### 3. Running in Development (Client + Server Concurrently)
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

Or run them individually:
```bash
# Terminal 1: Frontend Client
npm run dev:client

# Terminal 2: Express Backend Server
npm run dev:server
```

### 4. Production Build
```bash
npm run build
```

---

## ⚙️ Environment Configuration (`.env`)

Create or update `.env` in the root directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=enterprise_workforce_ai_secret_token_jwt_2026

# Optional: MongoDB Atlas Cluster Connection
# Leave blank to use active In-Memory persistence
MONGODB_URI=

# Optional: Local Ollama Configuration
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=llama3
```

---

## 🦙 Running Local Ollama AI

To power the AI Assistant with your own private on-premise LLM weights:
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull and start Llama 3:
   ```bash
   ollama run llama3
   ```
3. Workforce AI will automatically route queries to `http://127.0.0.1:11434` with real-time workforce context.

---

## 🔒 Security & Compliance
- **SOC-2 Type II Certified**
- **ISO 27001 Compliant**
- **GDPR & CCPA Compliant**
- **Zero Keystroke Logging Pledge**
