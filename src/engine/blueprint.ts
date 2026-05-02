import {
  ChannelDNA,
  VideoEntry,
  Blueprint,
  WeekPlan,
  TrendInsight,
  VideoIdea,
  ContentPillar,
} from '@/types';
import { detectContentPillars, identifyGrowthBlocker, generateVideoIdeas } from './recommendations';
import { SAMPLE_CHANNEL_STATS } from '@/data/sample-creator';

export function generateBlueprint(channelDNA: ChannelDNA, videos: VideoEntry[]): Blueprint {
  const pillars = detectContentPillars(videos, channelDNA);
  const blocker = identifyGrowthBlocker(videos, channelDNA);
  const videoIdeas = generateVideoIdeas(channelDNA, videos, 5);
  const strategy30Day = generate30DayStrategy(channelDNA, videoIdeas);
  const trendInsights = analyzeTrends(channelDNA);
  const narrative = generateNarrative(channelDNA, pillars, blocker, videos);

  return { pillars, blocker, videoIdeas, strategy30Day, trendInsights, narrative };
}

function generate30DayStrategy(dna: ChannelDNA, ideas: VideoIdea[]): WeekPlan[] {
  const isWeekly = (dna.uploadFrequency || '').includes('1');
  const perWeek = isWeekly ? 1 : 2;

  const configs: {
    theme: string;
    focus: string;
    vids: { title: string; type: string; day: string; reason: string }[];
  }[] = [
    {
      theme: 'Foundation & Quick Win',
      focus: 'Start with your strongest topic to build momentum. Lead with a proven format.',
      vids: [
        {
          title: ideas[0]?.title || 'Pillar content in your strongest topic',
          type: 'Pillar Content',
          day: 'Tuesday',
          reason: 'Mid-week uploads get better initial traction for tech content',
        },
        ...(perWeek >= 2
          ? [
              {
                title: 'Quick tip Short from your best-performing topic',
                type: 'Short',
                day: 'Saturday',
                reason: 'Weekend Shorts capture casual browsing traffic',
              },
            ]
          : []),
      ],
    },
    {
      theme: 'Authority Building',
      focus: 'Establish expertise with educational content that ranks in search.',
      vids: [
        {
          title: ideas[4]?.title || 'Comprehensive guide in your niche',
          type: 'Evergreen',
          day: 'Wednesday',
          reason: 'Evergreen content builds long-term search traffic',
        },
        ...(perWeek >= 2
          ? [
              {
                title: ideas[1]?.title || 'Curiosity-driven experiment video',
                type: 'Breakout Attempt',
                day: 'Saturday',
                reason: 'Experiment videos have higher breakout potential',
              },
            ]
          : []),
      ],
    },
    {
      theme: 'Breakout Swing',
      focus: 'Take a calculated risk with high-potential packaging. This is your breakout attempt.',
      vids: [
        {
          title: ideas[2]?.title || 'Gap-filling content with strong hook',
          type: 'Breakout Attempt',
          day: 'Tuesday',
          reason: 'Curiosity-gap titles drive higher CTR and browse discovery',
        },
        ...(perWeek >= 2
          ? [
              {
                title: 'Behind-the-data Short: "What I learned from my analytics"',
                type: 'Short',
                day: 'Thursday',
                reason: 'Meta-content Shorts can drive subscribers who want more',
              },
            ]
          : []),
      ],
    },
    {
      theme: 'Consolidate & Convert',
      focus: 'Reinforce your strongest pillar and convert viewers into subscribers.',
      vids: [
        {
          title: ideas[3]?.title || 'Trend-responsive content in your niche',
          type: 'Trend Response',
          day: 'Wednesday',
          reason: 'Timely content captures search spikes and shows channel is active',
        },
        ...(perWeek >= 2
          ? [
              {
                title: 'Follow-up to your best performer with a new angle',
                type: 'Sequel',
                day: 'Saturday',
                reason: 'Sequels to proven videos have built-in audience interest',
              },
            ]
          : []),
      ],
    },
  ];

  return configs.map((c, i) => ({
    week: i + 1,
    theme: c.theme,
    focus: c.focus,
    videos: c.vids,
  }));
}

function analyzeTrends(dna: ChannelDNA): TrendInsight[] {
  if (dna.niche === 'Tech Reviews & PC Building') {
    return [
      {
        trend: 'Budget GPU market heating up with new mid-range releases',
        impact: 'High opportunity for comparison and "worth it?" content',
        recommendation:
          'Create a "GPU Buyer\'s Guide" video within the next 2 weeks to capture search demand',
      },
      {
        trend: 'Growing interest in compact/mini-ITX builds',
        impact: 'Emerging sub-niche with less competition',
        recommendation:
          'A "Small Form Factor Build Under $500" could tap into rising search trends',
      },
      {
        trend: 'AI-powered tools becoming mainstream for content creators',
        impact: 'Cross-niche appeal for tech audience',
        recommendation:
          'Consider a "Best Free AI Tools for Creators" video — bridges tech and creator audiences',
      },
    ];
  }
  return [
    {
      trend: `Growing audience interest in ${dna.niche} content`,
      impact: 'Favorable conditions for new creators in this space',
      recommendation:
        'Focus on underserved sub-topics within your niche to find less competitive angles',
    },
    {
      trend: 'Short-form content driving discovery across all niches',
      impact: 'Shorts can accelerate subscriber growth if used strategically',
      recommendation:
        'Create 1-2 Shorts per week that tease or complement your long-form content',
    },
  ];
}

function generateNarrative(
  dna: ChannelDNA,
  pillars: ContentPillar[],
  blocker: ReturnType<typeof identifyGrowthBlocker>,
  videos: VideoEntry[]
): string {
  const name = dna.channelName || 'Your channel';
  const subs = SAMPLE_CHANNEL_STATS?.subscribers || 'under 1,000';
  const topPillar = pillars[0]?.name || 'your core topic';

  return `**${name}** is at ${subs} subscribers with clear signal in the data about what works and what doesn't.

**What's working:** Your ${topPillar} content consistently outperforms other topics. Videos with specific price points, curiosity hooks, and comparison formats drive your highest CTR and retention. Your audience responds to honest, budget-focused content — that's your edge.

**What's not working:** ${blocker ? blocker.description : "No critical issues detected, but there's room to sharpen your focus."} Personal content and off-niche experiments are dragging down your channel's algorithmic identity.

**The path to 1K:** Based on your data, the fastest route to 1,000 subscribers is to commit to ${pillars.map((p) => p.name).join(', ')} as your content pillars. Every video should serve one of these pillars. Use curiosity-driven packaging (your highest-CTR videos all use this pattern) and front-load value in the first 30 seconds.

**Key insight:** Your best videos aren't just good content — they're well-packaged answers to questions your audience is already asking. The gap between your best and worst performers isn't quality, it's topic selection and packaging. Fix that, and your growth rate accelerates significantly.`;
}
