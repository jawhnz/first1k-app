# First1K — Project Context

## What is First1K?

First1K is an AI strategy engine for early-stage YouTubers (under 1,000 subscribers). It helps creators decide what to make next, how to package it, when to publish it, and how each upload fits into a larger growth strategy.

## Primary Differentiation

This is NOT another YouTube analytics dashboard. Most competitors focus on SEO, keyword research, thumbnails, and analytics reporting. First1K focuses on:

- Channel strategy and creator-specific recommendations
- First-20-videos planning for new creators
- Video failure diagnosis with actionable fixes
- Launch/distribution planning for every video
- Persistent Channel DNA that constrains all recommendations

## Target User

A new or early-stage YouTube creator who has little data, limited experience, and wants a real edge from day 1.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-based theme config)
- **State:** React Context with localStorage persistence
- **Deployment:** Vercel (auto-deploys from GitHub)

## Project Structure

```
src/
├── app/           # Next.js App Router pages (7 routes)
├── components/
│   ├── ui/        # Reusable primitives (Badge, Card, ScoreRing, ProgressBar)
│   ├── features/  # Domain components (VideoIdeaCard, BlockerCard, etc.)
│   └── layout/    # Sidebar navigation with mobile drawer
├── engine/        # Pure function recommendation logic
│   ├── scoring.ts         # Multi-dimensional scoring heuristics
│   ├── recommendations.ts # Video idea generation + pillar detection
│   ├── blueprint.ts       # Full blueprint with 30-day strategy
│   ├── first20.ts         # 4-phase, 20-video roadmap
│   ├── postmortem.ts      # Failure diagnosis engine
│   └── launch-planner.ts  # Launch plan generation
├── store/         # React Context state management
├── data/          # Sample creator profile + 14 realistic videos
└── types/         # Full TypeScript interfaces and enums
```

## Key Architecture Decisions

- **Engine files are pure functions** — no React dependencies, easy to test and swap
- **All recommendations are constrained by Channel DNA** — nothing is generic
- **Sample data mode** allows instant demo without user input
- **Scoring is heuristic-based** — structured clearly for future ML replacement

## Product Guardrails

- Do NOT position the product as "cracking the algorithm"
- Do NOT claim certainty about virality
- Frame outputs as signal-based recommendations and creator-specific strategy
- The language should feel smart, credible, and helpful
- Avoid generic "post consistently" advice — everything must be specific and actionable
