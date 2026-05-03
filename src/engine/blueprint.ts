import {
  ChannelDNA,
  VideoEntry,
  Blueprint,
  WeekPlan,
  TrendInsight,
  VideoIdea,
  ContentPillar,
  GrowthBlocker,
} from '@/types';
import { detectContentPillars, identifyGrowthBlocker, generateVideoIdeas } from './recommendations';
import { analyzePatterns } from './scoring';

export function generateBlueprint(channelDNA: ChannelDNA, videos: VideoEntry[]): Blueprint {
  const pillars = detectContentPillars(videos, channelDNA);
  const blocker = identifyGrowthBlocker(videos, channelDNA);
  const videoIdeas = generateVideoIdeas(channelDNA, videos, 5);
  const strategy30Day = generate30DayStrategy(channelDNA, videoIdeas, pillars);
  const trendInsights = analyzeTrends(channelDNA, videos, pillars);
  const narrative = generateNarrative(channelDNA, pillars, blocker, videos);

  return { pillars, blocker, videoIdeas, strategy30Day, trendInsights, narrative };
}

// ===== 30-DAY STRATEGY =====

function generate30DayStrategy(dna: ChannelDNA, ideas: VideoIdea[], pillars: ContentPillar[]): WeekPlan[] {
  const freq = (dna.uploadFrequency || '').toLowerCase();
  const perWeek = freq.includes('3+') ? 3 : freq.includes('2-3') ? 2 : freq.includes('1-2') ? 2 : 1;
  const niche = dna.niche?.split(/[&,]/)[0]?.trim() || 'your niche';
  const topPillar = pillars[0]?.name || niche;

  const weeks: WeekPlan[] = [
    {
      week: 1,
      theme: 'Foundation & Quick Win',
      focus: `Start with your strongest topic (${topPillar}) to build momentum. Lead with a proven format.`,
      videos: [
        {
          title: ideas[0]?.title || `Pillar content in ${topPillar}`,
          type: 'Pillar Content',
          day: 'Tuesday',
          reason: 'Mid-week uploads get better initial traction. Lead with your highest-scoring idea.',
        },
        ...(perWeek >= 2 ? [{
          title: `Quick tip Short from ${topPillar}`,
          type: 'Short',
          day: 'Saturday',
          reason: 'Weekend Shorts capture casual browsing traffic and expand discovery.',
        }] : []),
      ],
    },
    {
      week: 2,
      theme: 'Authority Building',
      focus: `Establish expertise with educational content in ${niche} that ranks in search.`,
      videos: [
        {
          title: ideas[4]?.title || `Comprehensive ${niche} guide`,
          type: 'Evergreen',
          day: 'Wednesday',
          reason: 'Evergreen content builds long-term search traffic in your niche.',
        },
        ...(perWeek >= 2 ? [{
          title: ideas[1]?.title || `Curiosity-driven ${niche} experiment`,
          type: 'Breakout Attempt',
          day: 'Saturday',
          reason: 'Experiment videos have higher breakout potential and test new angles.',
        }] : []),
      ],
    },
    {
      week: 3,
      theme: 'Breakout Swing',
      focus: 'Take a calculated risk with high-potential packaging. This is your breakout attempt.',
      videos: [
        {
          title: ideas[2]?.title || 'Gap-filling content with strong hook',
          type: 'Breakout Attempt',
          day: 'Tuesday',
          reason: 'Curiosity-gap titles drive higher CTR and browse discovery.',
        },
        ...(perWeek >= 2 ? [{
          title: `Behind-the-data Short: "What I learned from my ${niche} analytics"`,
          type: 'Short',
          day: 'Thursday',
          reason: 'Meta-content Shorts can drive subscribers who want more depth.',
        }] : []),
      ],
    },
    {
      week: 4,
      theme: 'Consolidate & Convert',
      focus: `Reinforce ${topPillar} and convert viewers into subscribers.`,
      videos: [
        {
          title: ideas[3]?.title || `Timely ${niche} content`,
          type: 'Trend Response',
          day: 'Wednesday',
          reason: 'Timely content captures search spikes and shows your channel is active.',
        },
        ...(perWeek >= 2 ? [{
          title: `Follow-up to your best performer with a new angle`,
          type: 'Sequel',
          day: 'Saturday',
          reason: 'Sequels to proven videos have built-in audience interest.',
        }] : []),
      ],
    },
  ];

  return weeks;
}

// ===== TREND ANALYSIS =====

function analyzeTrends(dna: ChannelDNA, videos: VideoEntry[], pillars: ContentPillar[]): TrendInsight[] {
  const niche = dna.niche?.split(/[&,]/)[0]?.trim() || 'your niche';
  const topPillar = pillars[0]?.name || niche;
  const patterns = analyzePatterns(videos);

  const insights: TrendInsight[] = [];

  // Insight based on their best-performing format
  if (videos.length > 0) {
    const bestVideo = videos.reduce((best, v) => v.views > best.views ? v : best, videos[0]);
    const bestFormat = bestVideo.format;
    insights.push({
      trend: `Your highest-performing content uses the ${bestVideo.topic} + ${bestFormat} combination`,
      impact: `"${bestVideo.title}" hit ${bestVideo.views.toLocaleString()} views — ${Math.round(bestVideo.views / (patterns?.avgViews || 1) * 100)}% above your average`,
      recommendation: `Create 2-3 more videos in the ${bestVideo.topic} topic using similar packaging patterns. Study what made this title and format work.`,
    });
  }

  // Shorts opportunity
  const shorts = videos.filter((v) => v.format === 'Shorts');
  if (shorts.length === 0 && dna.formatFocus !== 'longform') {
    insights.push({
      trend: `Short-form content is driving discovery across ${niche} and related niches`,
      impact: 'You have zero Shorts — missing a major discovery channel',
      recommendation: `Create 1-2 Shorts per week that tease or complement your long-form ${topPillar} content. Quick tips and highlights work best.`,
    });
  } else if (shorts.length > 0) {
    const shortsAvg = Math.round(shorts.reduce((s, v) => s + v.views, 0) / shorts.length);
    insights.push({
      trend: `Your Shorts average ${shortsAvg.toLocaleString()} views — ${shortsAvg > (patterns?.avgViews || 0) ? 'above' : 'below'} your channel average`,
      impact: shortsAvg > (patterns?.avgViews || 0) ? 'Shorts are a strong discovery channel for you' : 'Shorts need better hooks to compete with your long-form',
      recommendation: shortsAvg > (patterns?.avgViews || 0)
        ? 'Increase Shorts frequency. Use them to funnel viewers to your long-form content.'
        : 'Focus Shorts on your highest-performing topics. Lead with the most surprising moment.',
    });
  }

  // Content gap insight
  if (pillars.length >= 2) {
    const weakPillar = pillars[pillars.length - 1];
    insights.push({
      trend: `${weakPillar.name} is your weakest pillar with ${weakPillar.avgViews.toLocaleString()} avg views`,
      impact: `Either this topic doesn't resonate with your audience, or it needs better packaging`,
      recommendation: `Test one more ${weakPillar.name} video with stronger packaging (curiosity hook + specific number). If it still underperforms, consider replacing this pillar.`,
    });
  }

  return insights.slice(0, 3);
}

// ===== NARRATIVE =====

function generateNarrative(
  dna: ChannelDNA,
  pillars: ContentPillar[],
  blocker: GrowthBlocker | null,
  videos: VideoEntry[]
): string {
  const name = dna.channelName || 'Your channel';
  const niche = dna.niche?.split(/[&,]/)[0]?.trim() || 'your niche';
  const topPillar = pillars[0]?.name || 'your core topic';
  const totalViews = videos.reduce((s, v) => s + v.views, 0);
  const avgViews = videos.length ? Math.round(totalViews / videos.length) : 0;
  const bestVideo = videos.length ? videos.reduce((b, v) => v.views > b.views ? v : b, videos[0]) : null;
  const worstVideo = videos.length ? videos.reduce((w, v) => v.views < w.views ? v : w, videos[0]) : null;

  // Identify what patterns work
  const highCTR = videos.filter((v) => v.ctr >= 6).map((v) => v.title);
  const patterns = analyzePatterns(videos);
  const topThemeNames = patterns?.topThemes?.map((t) => t.name).join(', ') || topPillar;

  let workingPatterns = `Your ${topPillar} content consistently outperforms other topics.`;
  if (highCTR.length > 0) {
    workingPatterns += ` Videos with strong curiosity hooks drive your highest CTR.`;
  }
  if (bestVideo && bestVideo.views > avgViews * 1.5) {
    workingPatterns += ` "${bestVideo.title}" at ${bestVideo.views.toLocaleString()} views shows what resonates with your audience.`;
  }

  let notWorking = blocker ? blocker.description : "No critical issues detected, but there's room to sharpen your focus.";
  if (worstVideo && worstVideo.views < avgViews * 0.3) {
    notWorking += ` "${worstVideo.title}" at only ${worstVideo.views.toLocaleString()} views shows what to avoid.`;
  }

  return `**${name}** has ${videos.length} videos with ${totalViews.toLocaleString()} total views, averaging ${avgViews.toLocaleString()} views per video.

**What's working:** ${workingPatterns} Your audience responds to ${niche} content that delivers clear value — that's your edge.

**What's not working:** ${notWorking}

**The path to 1K:** Based on your data, the fastest route to 1,000 subscribers is to commit to ${topThemeNames} as your content pillars. Every video should serve one of these pillars. Use curiosity-driven packaging and front-load value in the first 30 seconds.

**Key insight:** The gap between your best and worst performers isn't content quality — it's topic selection and packaging. Your best videos are well-packaged answers to questions your audience is already asking. Replicate that pattern consistently, and your growth rate accelerates.`;
}
