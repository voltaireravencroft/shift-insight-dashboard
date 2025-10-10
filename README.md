# Shift Insight — Warehouse Ops Dashboard (MVP)

A full-stack Next.js dashboard that tracks **throughput** and **delay minutes** by station.  
Seed data generates realistic daily charts so you can demo instantly.

---

## Tech Stack

- Next.js 15 (App Router) + TypeScript  
- Prisma ORM → Postgres (Neon)  
- Recharts (charts)  
- TailwindCSS + Radix UI (components)  
- Server Actions (Quick Log)

---

## Live Demo

Deployed on Vercel: (https://shift-insight.vercel.app)

---

## Requirements

- **Node.js 18+** (recommended 18 / 20 / 22)  
- **npm** (or pnpm / yarn)  
- **Postgres connection** — e.g. [Neon](https://neon.tech) (free)

---

## Setup

```bash
# clone
git clone https://github.com/<your-username>/shift-insight-dashboard.git
cd shift-insight-dashboard

# create env file
cp .env.example .env
# add your DATABASE_URL inside .env
