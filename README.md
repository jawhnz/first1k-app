# First1K — AI Strategy Engine for Early-Stage YouTubers

First1K helps creators with under 1,000 subscribers decide **what to make next**, how to package it, when to publish it, and how each upload fits into a larger growth strategy.

This is not another analytics dashboard. Most YouTube tools focus on SEO, keywords, and reporting. First1K focuses on **channel strategy** — personalized recommendations, video failure diagnosis, launch planning, and a sequenced roadmap to your first 1,000 subscribers.

## Features

### Channel DNA
A persistent creator profile that captures your niche, audience, goals, strengths, constraints, and content style. Every recommendation in the app is constrained by this profile — nothing is generic.

### Breakout Blueprint (Hero Feature)
A personalized growth strategy that includes:
- **Top 3 content pillars** detected from your performance data
- **Biggest growth blocker** with evidence and a fix
- **5 recommended next videos** scored across 6 dimensions (audience fit, novelty, clarity, channel alignment, breakout potential, execution difficulty)
- **30-day posting strategy** with a week-by-week plan
- **Trend insights** relevant to your niche

### First 20 Videos Planner
A sequenced roadmap for creators with little or no data. 20 videos across 4 phases (Foundation → Authority → Breakout → Conversion), each with a purpose, packaging angle, and ordering rationale.

### Video Failure Postmortem
Analyzes underperforming videos and diagnoses likely failure reasons: weak hook, title-thumbnail mismatch, wrong audience fit, topic too broad/narrow, poor timing, bad format choice. Each diagnosis includes evidence, a packaging fix, a content fix, and a better follow-up idea.

### Launch Planner
For every recommended video, generates a launch plan with: best publish timing, title approach, thumbnail concept, hook for the first 30 seconds, Shorts teaser strategy, series potential, sequel opportunity, and a 48-hour watch checklist.

### Data Input
- Manual video entry with full metrics
- CSV upload for bulk import
- Sample data mode for instant demo

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| State | React Context + localStorage persistence |
| Deployment | [Vercel](https://vercel.com/) |

## Project Structure

```
src/
├── app/                    # Next.js App Router — 7 page routes
│   ├── page.tsx            # Overview dashboard
│   ├── blueprint/          # Breakout Blueprint
│   ├── channel-dna/        # Channel DNA onboarding + profile
│   ├── first20/            # First 20 Videos planner
│   ├── launch-planner/     # Launch plans
│   ├── postmortems/        # Video failure diagnosis
│   └── upload-data/        # Manual entry + CSV upload
├── components/
│   ├── ui/                 # Reusable primitives (Badge, Card, ScoreRing, ProgressBar)
│   ├── features/           # Domain components (VideoIdeaCard, BlockerCard, PillarCard, etc.)
│   └── layout/             # Sidebar with responsive mobile drawer
├── engine/                 # Pure-function recommendation logic
│   ├── scoring.ts          # 6-dimension scoring heuristics
│   ├── recommendations.ts  # Idea generation, pillar detection, blocker analysis
│   ├── blueprint.ts        # Blueprint orchestration + 30-day strategy
│   ├── first20.ts          # 4-phase, 20-video roadmap generator
│   ├── postmortem.ts       # Failure diagnosis engine
│   └── launch-planner.ts   # Launch plan generation
├── store/                  # React Context state management
├── data/                   # Sample creator profile + 14 sample videos
└── types/                  # TypeScript interfaces and enums
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### Install and Run

```bash
git clone https://github.com/jawhnz/first1k-app.git
cd first1k-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Sample Data

The app ships with a built-in sample creator profile ("TechCraft with Alex" — a 3-month-old budget PC building channel with 14 videos). Toggle **Sample Data** in the sidebar to explore the full app without entering your own data.

An additional sample CSV for a Minecraft Bedwars channel (20 videos) is available at [`public/samples/minecraft-bedwars-channel.csv`](public/samples/minecraft-bedwars-channel.csv) — upload it via the Upload Data page to test with a different creator profile.

## Kiro Integration

This project uses [Kiro](https://kiro.dev/) for AI-assisted development. The `.kiro/` directory contains:

- **Steering** — Project context and coding standards that guide AI behavior
- **Hooks** — Automated checks (lint on save, build verification before push, engine change review)
- **Specs** — Feature specifications with requirements, design docs, and task tracking (see the Breakout Blueprint spec)

## Architecture Decisions

- **Engine files are pure functions** with no React dependencies — easy to test, swap, or move to an API
- **All recommendations are constrained by Channel DNA** — the app never generates generic "post consistently" advice
- **Scoring is heuristic-based** with clear weights and logic, structured for future ML replacement
- **Sample data mode** enables instant demo without any user input
- **Mobile-first responsive design** with a collapsible sidebar drawer

## Product Philosophy

- Do not position the product as "cracking the algorithm"
- Do not claim certainty about virality
- Frame outputs as signal-based recommendations and creator-specific strategy
- Avoid generic advice — everything must be specific and actionable
- The language should feel smart, credible, and helpful

## License

[MIT](LICENSE)
