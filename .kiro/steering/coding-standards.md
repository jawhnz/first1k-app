---
inclusion: fileMatch
fileMatchPattern: "**/*.{ts,tsx}"
---

# Coding Standards

## TypeScript

- Use strict TypeScript — no `any` types unless absolutely necessary
- All component props must be typed with explicit interfaces or inline types
- Engine functions must have typed parameters and return types
- Use the types defined in `src/types/index.ts` — do not create duplicate type definitions

## React Components

- All page components are client components (`'use client'`) since they access the store
- Use the `useStore()` hook from `src/store/provider.tsx` for state access
- Prefer composition over prop drilling — use feature components from `src/components/features/`
- UI primitives live in `src/components/ui/` — reuse Badge, Card, StatCard, ScoreRing, ProgressBar

## Styling

- Use Tailwind CSS utility classes exclusively — no inline styles except for dynamic values
- Theme colors are defined as CSS variables in `globals.css` and referenced via `var(--color-*)` in Tailwind
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- All grids must be mobile-responsive: start with `grid-cols-1` and scale up

## Engine Logic

- Engine files in `src/engine/` must be pure functions with no React imports
- All recommendation logic must reference Channel DNA — never generate generic advice
- Scoring functions return 0-100 values and must use the `IdeaScores` interface
- Keep engine logic modular — each file handles one domain (scoring, recommendations, blueprint, etc.)

## File Organization

- Pages go in `src/app/{route}/page.tsx`
- Shared feature components go in `src/components/features/`
- Reusable UI primitives go in `src/components/ui/`
- Data models and enums go in `src/types/index.ts`
- Sample data goes in `src/data/`
