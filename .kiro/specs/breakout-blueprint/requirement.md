# Breakout Blueprint Feature

## Overview

The Breakout Blueprint is the hero feature of First1K. It generates a personalized growth strategy for early-stage YouTubers based on their Channel DNA profile and historical video performance data.

## Requirements

1. **Content Pillar Detection**: Analyze video performance data to identify the creator's top 3 content pillars ranked by average views and CTR.

2. **Growth Blocker Identification**: Detect the single biggest growth blocker from patterns in the data. Possible blockers include topic scatter, low CTR (packaging problem), retention issues, and the personal content trap.

3. **Video Idea Generation**: Generate 5 recommended next videos, each scored across 6 dimensions:
   - Audience fit (weighted 25%)
   - Channel alignment (weighted 20%)
   - Novelty (weighted 15%)
   - Clarity (weighted 15%)
   - Breakout potential (weighted 15%)
   - Execution difficulty (weighted 10%)

4. **30-Day Posting Strategy**: Create a 4-week posting plan with specific video assignments per day, respecting the creator's upload frequency from their Channel DNA.

5. **Trend Insights**: Surface 2-3 current trends relevant to the creator's niche with specific content recommendations.

6. **Strategy Narrative**: Generate a written summary that ties together what's working, what's not, the path to 1K subscribers, and a key insight — all specific to this creator's data.

## Constraints

- All outputs MUST reference Channel DNA — no generic recommendations
- Do not claim certainty about virality or "cracking the algorithm"
- Frame everything as signal-based recommendations
- The narrative must feel smart, credible, and actionable
- Scoring must be heuristic-based with clear, auditable logic

## Acceptance Criteria

- [ ] Blueprint generates successfully with sample data
- [ ] All 3 content pillars are detected and ranked correctly
- [ ] Growth blocker is identified with evidence and a fix
- [ ] 5 video ideas are generated with scores across all 6 dimensions
- [ ] 30-day strategy respects upload frequency from Channel DNA
- [ ] Trend insights are niche-specific
- [ ] Narrative references the creator's actual channel name and data
