import {
  ChannelDNA,
  VideoEntry,
  VideoIdea,
  ContentPillar,
  GrowthBlocker,
  ContentFormat,
  VideoCategory,
} from '@/types';
import { scoreVideoIdea, analyzePatterns } from './scoring';
import { SAMPLE_CHANNEL_STATS } from '@/data/sample-creator';

export function generateVideoIdeas(
  channelDNA: ChannelDNA,
  videos: VideoEntry[],
  count = 5
): VideoIdea[] {
  const patterns = analyzePatterns(videos);
  const ideas: Partial<VideoIdea>[] = [];

  if (patterns?.topThemes?.length) {
    ideas.push(generateFromTopTheme(patterns.topThemes[0], channelDNA));
  }
  if (patterns?.topThemes && patterns.topThemes.length > 1) {
    ideas.push(generateCuriosityVersion());
  }
  ideas.push(generateGapFiller(channelDNA, videos));
  ideas.push(generateTrendContent());
  ideas.push(generateEvergreenContent(channelDNA));

  return ideas.slice(0, count).map((idea) => {
    const scores = scoreVideoIdea(idea, channelDNA, videos);
    return { ...idea, scores } as VideoIdea;
  });
}

function generateFromTopTheme(
  topTheme: { name: string; avgViews: number; avgCTR: number },
  dna: ChannelDNA
): Partial<VideoIdea> {
  const templates: Record<string, Partial<VideoIdea>> = {
    'PC Building': {
      title: 'The Ultimate $400 Gaming PC Build — Better Than You Think',
      topic: 'PC Building',
      format: ContentFormat.LONG_FORM,
      targetAngle: 'Budget gamers who think they need to spend more',
      titleDirection: 'Use specific price point + challenge expectation',
      reason: `Your PC Building content averages ${Math.round(topTheme.avgViews)} views — your strongest topic. This doubles down with a specific price point and curiosity hook that challenges assumptions.`,
    },
    'Budget Peripherals': {
      title: "I Replaced ALL My Gear With Budget Alternatives — Here's What Happened",
      topic: 'Budget Peripherals',
      format: ContentFormat.LONG_FORM,
      targetAngle: 'Viewers curious about whether cheap gear can compete',
      titleDirection: 'Personal experiment format with suspense',
      reason: `Budget peripheral content drives your highest CTR (${topTheme.avgCTR?.toFixed(1)}%). This scales the concept into a full experiment video with natural tension.`,
    },
  };

  return (
    templates[topTheme.name] || {
      title: `The Complete ${topTheme.name} Guide for ${dna.targetAudience?.split(' ')[0] || 'Beginners'}`,
      topic: topTheme.name,
      format: ContentFormat.LONG_FORM,
      targetAngle: dna.targetAudience?.split(',')[0] || 'Your core audience',
      titleDirection: 'Comprehensive guide format with clear audience targeting',
      reason: `${topTheme.name} is your best-performing topic area. A comprehensive guide captures search traffic and establishes authority.`,
    }
  );
}

function generateCuriosityVersion(): Partial<VideoIdea> {
  return {
    title: "I Built a Gaming Setup Using Only Amazon's Choice Products",
    topic: 'Budget Builds',
    format: ContentFormat.LONG_FORM,
    targetAngle:
      'Curious viewers who shop on Amazon and wonder if "Amazon\'s Choice" means anything',
    titleDirection: 'Challenge/experiment format with built-in curiosity',
    reason:
      'Combines your two strongest themes (PC building + budget gear) into a single curiosity-driven experiment. This format has breakout potential because it taps into a question millions of Amazon shoppers have.',
  };
}

function generateGapFiller(dna: ChannelDNA, videos: VideoEntry[]): Partial<VideoIdea> {
  const covered = videos.map((v) => v.topic.toLowerCase());
  const gaps = [
    { topic: 'Cable Management', title: 'Cable Management That Actually Looks Good — Budget Tips' },
    { topic: 'Cooling', title: "Your PC Is Thermal Throttling and You Don't Even Know It" },
    { topic: 'Storage', title: 'SSD vs HDD in 2026 — The Real Difference Nobody Talks About' },
    {
      topic: 'Upgrading',
      title: "The One Upgrade That Makes the Biggest Difference (It's Not What You Think)",
    },
  ];
  const gap = gaps.find((g) => !covered.includes(g.topic.toLowerCase())) || gaps[3];

  return {
    title: gap.title,
    topic: gap.topic,
    format: ContentFormat.LONG_FORM,
    targetAngle:
      "Viewers searching for specific component advice who haven't found your channel yet",
    titleDirection: 'Curiosity hook + specific topic = search + browse discovery',
    reason: `You haven't covered ${gap.topic} yet, but it's a natural extension of your niche. This fills a content gap while maintaining your budget-focused identity.`,
  };
}

function generateTrendContent(): Partial<VideoIdea> {
  return {
    title: "New Budget GPUs Are Coming — Here's What to Buy (and Avoid) Right Now",
    topic: 'GPU Market',
    format: ContentFormat.LONG_FORM,
    targetAngle: 'Budget builders who are unsure whether to buy now or wait',
    titleDirection: 'Timely advice format with clear actionable value',
    reason:
      'Trend-responsive content captures search spikes. Positioning as a "buy now or wait" advisor builds trust and drives repeat viewers who want your take on market changes.',
  };
}

function generateEvergreenContent(dna: ChannelDNA): Partial<VideoIdea> {
  return {
    title: 'PC Building for Absolute Beginners — Everything You Need to Know in 2026',
    topic: 'PC Building',
    format: ContentFormat.LONG_FORM,
    targetAngle: 'Complete beginners who are intimidated by PC building',
    titleDirection: 'Comprehensive beginner guide with current year for freshness',
    reason:
      'Evergreen beginner content is the backbone of sustainable growth. This video can rank in search for months and serve as a subscriber funnel for your entire channel.',
  };
}

export function detectContentPillars(
  videos: VideoEntry[],
  channelDNA: ChannelDNA
): ContentPillar[] {
  const perf: Record<
    string,
    { topic: string; count: number; totalViews: number; ctrSum: number; best: VideoEntry | null }
  > = {};

  videos.forEach((v) => {
    if (!perf[v.topic])
      perf[v.topic] = { topic: v.topic, count: 0, totalViews: 0, ctrSum: 0, best: null };
    const p = perf[v.topic];
    p.count++;
    p.totalViews += v.views;
    p.ctrSum += v.ctr;
    if (!p.best || v.views > p.best.views) p.best = v;
  });

  const sorted = Object.values(perf).sort(
    (a, b) => b.totalViews / b.count - a.totalViews / a.count
  );

  return sorted.slice(0, 3).map((tp, i) => ({
    rank: i + 1,
    name: tp.topic,
    description: getPillarDescription(tp.topic, channelDNA),
    avgViews: Math.round(tp.totalViews / tp.count),
    videoCount: tp.count,
    avgCTR: (tp.ctrSum / tp.count).toFixed(1),
    bestVideo: tp.best?.title,
  }));
}

function getPillarDescription(topic: string, dna: ChannelDNA): string {
  const map: Record<string, string> = {
    'PC Building': `Your strongest content pillar. PC build guides align perfectly with your ${dna.targetAudience?.includes('budget') ? 'budget-focused' : ''} audience and showcase your technical knowledge. This is your authority foundation.`,
    'Budget Peripherals':
      'High-CTR content that drives curiosity clicks. The "cheap vs expensive" angle creates natural tension and positions you as the honest budget reviewer viewers trust.',
    'GPU Reviews':
      'Timely review content that captures search demand. Your honest, no-BS review style differentiates you from larger channels that get free review units.',
    Comparison:
      'VS-format content that creates natural viewer engagement. Comparisons keep viewers watching for the verdict and drive strong comment section activity.',
    'PC Building Tips':
      'Educational list content that ranks well in search. Positions you as knowledgeable while being easy to produce consistently.',
  };
  return map[topic] || `${topic} content resonates with your audience and fits your channel identity.`;
}

export function identifyGrowthBlocker(
  videos: VideoEntry[],
  channelDNA: ChannelDNA
): GrowthBlocker | null {
  const patterns = analyzePatterns(videos);
  if (!patterns) return null;

  const blockers: GrowthBlocker[] = [];

  const uniqueTopics = new Set(videos.map((v) => v.topic)).size;
  const topicRatio = uniqueTopics / videos.length;
  if (topicRatio > 0.7) {
    blockers.push({
      type: 'Topic Scatter',
      severity: 'high',
      description:
        "Your channel covers too many different topics. The algorithm can't figure out who to recommend your videos to. Focus on 2-3 core topics to build a recognizable identity.",
      evidence: `${uniqueTopics} unique topics across ${videos.length} videos (${Math.round(topicRatio * 100)}% unique). Channels that grow fastest have 60% or more of content in 2-3 pillars.`,
      fix: 'Commit to your top 3 performing topics for the next 10 videos. Off-topic experiments should be no more than 1 in 5 uploads.',
    });
  }

  if (patterns.avgCTR < 4.0) {
    blockers.push({
      type: 'Packaging Problem',
      severity: 'high',
      description:
        "Your average CTR is below the threshold where YouTube actively promotes content. Your titles and thumbnails aren't compelling enough to earn clicks from impressions.",
      evidence: `Average CTR of ${patterns.avgCTR.toFixed(1)}% across all videos. Videos need 4-6%+ CTR to signal to YouTube that the packaging works.`,
      fix: 'Study your highest-CTR videos and replicate their title patterns. Use curiosity gaps, specific numbers, and emotional hooks.',
    });
  }

  const avgRetention =
    videos.reduce((s, v) => s + (v.avgViewDuration / 600) * 100, 0) / videos.length;
  if (avgRetention < 40) {
    blockers.push({
      type: 'Retention Problem',
      severity: 'medium',
      description:
        "Viewers are leaving your videos too early. This signals to YouTube that your content isn't delivering on the promise of your title and thumbnail.",
      evidence: `Estimated average retention around ${Math.round(avgRetention)}%. Aim for 50%+ retention to get meaningful algorithmic push.`,
      fix: 'Front-load value in the first 30 seconds. Cut slow intros. Use pattern interrupts every 2-3 minutes to maintain attention.',
    });
  }

  const personalVideos = videos.filter(
    (v) => /vlog|behind|setup tour|day in/i.test(v.topic) || v.category === VideoCategory.CONVERSION
  );
  if (personalVideos.length >= 2) {
    const personalAvg = personalVideos.reduce((s, v) => s + v.views, 0) / personalVideos.length;
    if (personalAvg < patterns.avgViews * 0.3) {
      blockers.push({
        type: 'Personal Content Trap',
        severity: 'medium',
        description:
          "You're making personal/vlog content that only works for established creators. At your stage, viewers discover you through topics, not personality.",
        evidence: `Your personal content averages ${Math.round(personalAvg)} views vs ${Math.round(patterns.avgViews)} channel average. That's ${Math.round((personalAvg / patterns.avgViews) * 100)}% of your normal performance.`,
        fix: 'Save personal content until you hit 5K+ subscribers. Right now, every upload should be topic-first, not creator-first.',
      });
    }
  }

  blockers.sort((a, b) => {
    const sev: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return (sev[b.severity] || 0) - (sev[a.severity] || 0);
  });

  return (
    blockers[0] || {
      type: 'Consistency',
      severity: 'medium' as const,
      description:
        'Your biggest growth lever right now is consistent output in your strongest topics. The data shows clear winners — lean into them.',
      evidence:
        'No critical blockers detected, but growth requires sustained focus on proven content pillars.',
      fix: 'Maintain your upload schedule and focus 80% of content on your top 3 topics.',
    }
  );
}
