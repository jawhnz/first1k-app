# Breakout Blueprint — Design

## Architecture

The Blueprint feature follows a layered architecture:

```
Page (src/app/blueprint/page.tsx)
  └── calls BlueprintEngine.generate()
        ├── detectContentPillars()    → src/engine/recommendations.ts
        ├── identifyGrowthBlocker()   → src/engine/recommendations.ts
        ├── generateVideoIdeas()      → src/engine/recommendations.ts
        │     └── scoreVideoIdea()    → src/engine/scoring.ts
        ├── generate30DayStrategy()   → src/engine/blueprint.ts
        ├── analyzeTrends()           → src/engine/blueprint.ts
        └── generateNarrative()       → src/engine/blueprint.ts
```

## Data Flow

1. Page reads `channelDNA` and `videos` from the React Context store
2. Passes both to `generateBlueprint(channelDNA, videos)` — a pure function
3. Blueprint engine orchestrates sub-engines (scoring, recommendations)
4. Returns a typed `Blueprint` object
5. Page renders the blueprint using feature components (PillarCard, BlockerCard, VideoIdeaCard)

## Key Interfaces

```typescript
interface Blueprint {
  pillars: ContentPillar[];        // Top 3 content themes
  blocker: GrowthBlocker | null;   // Biggest growth issue
  videoIdeas: VideoIdea[];         // 5 scored recommendations
  strategy30Day: WeekPlan[];       // 4-week posting plan
  trendInsights: TrendInsight[];   // Niche-relevant trends
  narrative: string;               // Written strategy summary
}
```

## Scoring Model

Each video idea is scored 0-100 on 6 dimensions using heuristic rules:

| Dimension | Weight | Signal Sources |
|-----------|--------|----------------|
| Audience Fit | 25% | Niche keywords, audience description, format preference |
| Channel Alignment | 20% | Content types, tone style, creator strengths |
| Novelty | 15% | Overlap with existing video titles |
| Clarity | 15% | Title structure (numbers, how-to, vs format) |
| Breakout Potential | 15% | Curiosity hooks, price anchors, historical breakout topics |
| Execution Difficulty | 10% | Creator constraints, format complexity |

## UI Components

- **Strategy Narrative**: Gradient hero panel with markdown-to-HTML rendering
- **Content Pillars**: 3-column grid of PillarCard components with colored top borders
- **Growth Blocker**: BlockerCard with severity color, evidence, and fix sections
- **Video Ideas**: Stacked VideoIdeaCard components with ScoreRing and dimension breakdown
- **30-Day Strategy**: 2-column layout — week cards on left, strategy principles on right
- **Trend Insights**: 3-column grid of trend cards with impact and recommendation
