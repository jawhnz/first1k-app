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

// ===== VIDEO IDEA GENERATION =====

export function generateVideoIdeas(
  dna: ChannelDNA,
  videos: VideoEntry[],
  count = 5
): VideoIdea[] {
  const patterns = analyzePatterns(videos);
  const ideas: Partial<VideoIdea>[] = [];
  const niche = nicheShort(dna);

  // Strategy 1: Double down on top-performing topic
  if (patterns?.topThemes?.length) {
    const top = patterns.topThemes[0];
    ideas.push({
      title: `The Ultimate ${top.name} Guide — Everything You Need to Know`,
      topic: top.name,
      format: ContentFormat.LONG_FORM,
      targetAngle: `Viewers already interested in ${top.name} who want a comprehensive resource`,
      titleDirection: 'Comprehensive guide format — "Ultimate" signals depth and authority',
      reason: `Your ${top.name} content averages ${Math.round(top.avgViews)} views with ${top.avgCTR.toFixed(1)}% CTR — your strongest topic. A definitive guide captures search traffic and cements your authority here.`,
    });
  }

  // Strategy 2: Curiosity/experiment version combining top themes
  if (patterns?.topThemes && patterns.topThemes.length >= 2) {
    const t1 = patterns.topThemes[0].name;
    const t2 = patterns.topThemes[1].name;
    ideas.push({
      title: `I Tried the Most Popular ${t1} Advice — Here's What Actually Worked`,
      topic: t1,
      format: ContentFormat.LONG_FORM,
      targetAngle: `Viewers curious about whether common ${niche} advice actually holds up`,
      titleDirection: 'Personal experiment with "Here\'s What Actually Worked" creates suspense and honesty',
      reason: `Combines your two strongest themes (${t1} + ${t2}) into a curiosity-driven experiment. This format has breakout potential because it tests claims your audience has heard before.`,
    });
  } else {
    ideas.push({
      title: `I Tested the Most Common ${niche} Tips — Here's What Actually Works`,
      topic: niche,
      format: ContentFormat.LONG_FORM,
      targetAngle: `${dna.targetAudience?.split(',')[0] || 'Your audience'} who want proven advice`,
      titleDirection: 'Experiment format with built-in curiosity and honest framing',
      reason: `Experiment videos have the highest breakout ceiling for small channels. Testing common advice in your niche creates natural tension and positions you as an honest voice.`,
    });
  }

  // Strategy 3: Fill a content gap
  if (videos.length > 0) {
    const coveredTopics = new Set(videos.map((v) => v.topic.toLowerCase()));
    const allTopicWords = videos.flatMap((v) => v.topic.toLowerCase().split(/\s+/));
    const relatedTopic = findRelatedUncoveredTopic(dna, coveredTopics);
    ideas.push({
      title: `${relatedTopic} — What Nobody Tells You`,
      topic: relatedTopic,
      format: ContentFormat.LONG_FORM,
      targetAngle: `Viewers searching for ${relatedTopic} who haven't found your channel yet`,
      titleDirection: '"What Nobody Tells You" creates a curiosity gap and positions you as an insider',
      reason: `You haven't covered ${relatedTopic} yet, but it's a natural extension of your ${niche} niche. This fills a content gap while expanding your search footprint.`,
    });
  } else {
    ideas.push({
      title: `Top 5 ${niche} Mistakes Beginners Make`,
      topic: niche,
      format: ContentFormat.LONG_FORM,
      targetAngle: `New ${niche} enthusiasts who want to avoid common pitfalls`,
      titleDirection: 'Number + "Mistakes" creates urgency and clear value proposition',
      reason: `Mistake videos are highly searchable and position you as knowledgeable. The list format is easy to produce and keeps viewers watching through each point.`,
    });
  }

  // Strategy 4: Trend/timely content
  ideas.push({
    title: `${niche} in 2026 — What's Changed and What to Do Now`,
    topic: niche,
    format: ContentFormat.LONG_FORM,
    targetAngle: `${dna.targetAudience?.split(',')[0] || 'Your audience'} looking for current, up-to-date advice`,
    titleDirection: 'Current year in title signals freshness. "What to Do Now" adds actionable value',
    reason: `Timely content captures search spikes when people look for current-year advice. Positioning as a "what's changed" advisor builds trust and drives repeat viewers.`,
  });

  // Strategy 5: Evergreen beginner content
  ideas.push({
    title: `${niche} for Absolute Beginners — Complete Guide`,
    topic: niche,
    format: ContentFormat.LONG_FORM,
    targetAngle: `Complete beginners who are just getting started with ${niche.toLowerCase()}`,
    titleDirection: '"Absolute Beginners" + "Complete Guide" captures the widest search intent in your niche',
    reason: `Evergreen beginner content is the backbone of sustainable growth. This video can rank in search for months and serve as a subscriber funnel for your entire channel.`,
  });

  // Score all ideas and sort by overall score
  const scored = ideas.slice(0, count).map((idea) => {
    const scores = scoreVideoIdea(idea, dna, videos);
    return { ...idea, scores } as VideoIdea;
  });

  return scored.sort((a, b) => b.scores.overall - a.scores.overall);
}

function findRelatedUncoveredTopic(dna: ChannelDNA, covered: Set<string>): string {
  // Generate potential related topics from the niche and content types
  const niche = dna.niche || '';
  const nicheWords = niche.toLowerCase().split(/[\s&,]+/).filter((w) => w.length > 3);

  // Common sub-topic patterns by content type
  const subTopicPatterns = [
    'Tips & Tricks',
    'Common Mistakes',
    'Best Practices',
    'Gear & Equipment',
    'Strategy',
    'Advanced Techniques',
    'Comparison',
    'History',
    'Community',
    'Trends',
  ];

  for (const pattern of subTopicPatterns) {
    const candidate = `${nicheWords[0] ? nicheWords[0].charAt(0).toUpperCase() + nicheWords[0].slice(1) : 'Niche'} ${pattern}`;
    if (!covered.has(candidate.toLowerCase())) return candidate;
  }

  return `Advanced ${nicheShort(dna)}`;
}

// ===== CONTENT PILLAR DETECTION =====

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

  const avgViews = videos.reduce((s, v) => s + v.views, 0) / videos.length;
  const sorted = Object.values(perf).sort(
    (a, b) => b.totalViews / b.count - a.totalViews / a.count
  );

  return sorted.slice(0, 3).map((tp, i) => {
    const topicAvg = Math.round(tp.totalViews / tp.count);
    const topicCTR = (tp.ctrSum / tp.count).toFixed(1);
    const vsAvg = Math.round((topicAvg / avgViews) * 100);

    return {
      rank: i + 1,
      name: tp.topic,
      description: generatePillarDescription(tp, channelDNA, avgViews, i),
      avgViews: topicAvg,
      videoCount: tp.count,
      avgCTR: topicCTR,
      bestVideo: tp.best?.title,
    };
  });
}

function generatePillarDescription(
  tp: { topic: string; count: number; totalViews: number; ctrSum: number; best: VideoEntry | null },
  dna: ChannelDNA,
  channelAvg: number,
  rank: number
): string {
  const topicAvg = Math.round(tp.totalViews / tp.count);
  const topicCTR = (tp.ctrSum / tp.count).toFixed(1);
  const vsAvg = Math.round((topicAvg / channelAvg) * 100);
  const niche = nicheShort(dna);

  if (rank === 0) {
    return `Your strongest content pillar. ${tp.topic} content averages ${topicAvg.toLocaleString()} views (${vsAvg}% of your channel average) with ${topicCTR}% CTR across ${tp.count} video${tp.count > 1 ? 's' : ''}. This is your authority foundation — the topic your audience comes to you for.`;
  }
  if (rank === 1) {
    return `Your second-strongest theme. ${tp.topic} averages ${topicAvg.toLocaleString()} views with ${topicCTR}% CTR. This topic complements your primary pillar and gives you range within your ${niche} niche.`;
  }
  return `${tp.topic} content shows potential with ${topicAvg.toLocaleString()} average views and ${topicCTR}% CTR. With ${tp.count} video${tp.count > 1 ? 's' : ''}, there's room to develop this into a stronger pillar.`;
}

// ===== GROWTH BLOCKER IDENTIFICATION =====

export function identifyGrowthBlocker(
  videos: VideoEntry[],
  channelDNA: ChannelDNA
): GrowthBlocker | null {
  const patterns = analyzePatterns(videos);
  if (!patterns) return null;

  const blockers: GrowthBlocker[] = [];

  // Topic scatter
  const uniqueTopics = new Set(videos.map((v) => v.topic)).size;
  const topicRatio = uniqueTopics / videos.length;
  if (topicRatio > 0.7) {
    blockers.push({
      type: 'Topic Scatter',
      severity: 'high',
      description: `Your channel covers too many different topics. The algorithm can't figure out who to recommend your videos to. Focus on 2-3 core topics to build a recognizable identity.`,
      evidence: `${uniqueTopics} unique topics across ${videos.length} videos (${Math.round(topicRatio * 100)}% unique). Channels that grow fastest have 60% or more of content in 2-3 pillars.`,
      fix: 'Commit to your top 3 performing topics for the next 10 videos. Off-topic experiments should be no more than 1 in 5 uploads.',
    });
  }

  // Low CTR
  if (patterns.avgCTR < 4.0) {
    blockers.push({
      type: 'Packaging Problem',
      severity: 'high',
      description: `Your average CTR is below the threshold where YouTube actively promotes content. Your titles and thumbnails aren't compelling enough to earn clicks from impressions.`,
      evidence: `Average CTR of ${patterns.avgCTR.toFixed(1)}% across all videos. Videos need 4-6%+ CTR to signal to YouTube that the packaging works.`,
      fix: 'Study your highest-CTR videos and replicate their title patterns. Use curiosity gaps, specific numbers, and emotional hooks.',
    });
  }

  // Retention issues
  const avgRetention = videos.reduce((s, v) => s + (v.avgViewDuration / 600) * 100, 0) / videos.length;
  if (avgRetention < 40) {
    blockers.push({
      type: 'Retention Problem',
      severity: 'medium',
      description: `Viewers are leaving your videos too early. This signals to YouTube that your content isn't delivering on the promise of your title and thumbnail.`,
      evidence: `Estimated average retention around ${Math.round(avgRetention)}%. Aim for 50%+ retention to get meaningful algorithmic push.`,
      fix: 'Front-load value in the first 30 seconds. Cut slow intros. Use pattern interrupts every 2-3 minutes to maintain attention.',
    });
  }

  // Personal content trap
  const personalVideos = videos.filter(
    (v) => /vlog|behind|setup tour|day in|unboxing.*my|my.*setup/i.test(v.topic) || v.category === VideoCategory.CONVERSION
  );
  if (personalVideos.length >= 2) {
    const personalAvg = personalVideos.reduce((s, v) => s + v.views, 0) / personalVideos.length;
    if (personalAvg < patterns.avgViews * 0.3) {
      blockers.push({
        type: 'Personal Content Trap',
        severity: 'medium',
        description: `You're making personal/vlog content that only works for established creators. At your stage, viewers discover you through topics, not personality.`,
        evidence: `Your personal content averages ${Math.round(personalAvg)} views vs ${Math.round(patterns.avgViews)} channel average. That's ${Math.round((personalAvg / patterns.avgViews) * 100)}% of your normal performance.`,
        fix: 'Save personal content until you hit 5K+ subscribers. Right now, every upload should be topic-first, not creator-first.',
      });
    }
  }

  // Format mismatch
  const shorts = videos.filter((v) => v.format === ContentFormat.SHORT);
  const longform = videos.filter((v) => v.format === ContentFormat.LONG_FORM);
  if (shorts.length > 0 && longform.length > 0) {
    const shortsAvg = shorts.reduce((s, v) => s + v.views, 0) / shorts.length;
    const longAvg = longform.reduce((s, v) => s + v.views, 0) / longform.length;
    if (shortsAvg > longAvg * 2 && channelDNA.formatFocus !== 'shorts') {
      blockers.push({
        type: 'Format Mismatch',
        severity: 'medium',
        description: `Your Shorts significantly outperform your long-form content, but your channel is focused on long-form. Consider leaning into Shorts or improving your long-form packaging.`,
        evidence: `Shorts average ${Math.round(shortsAvg)} views vs ${Math.round(longAvg)} for long-form. That's a ${Math.round(shortsAvg / longAvg)}x difference.`,
        fix: 'Either double down on Shorts as your primary format, or study why your long-form packaging underperforms and fix the titles/thumbnails.',
      });
    }
  }

  blockers.sort((a, b) => {
    const sev: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return (sev[b.severity] || 0) - (sev[a.severity] || 0);
  });

  return blockers[0] || {
    type: 'Consistency',
    severity: 'medium' as const,
    description: 'Your biggest growth lever right now is consistent output in your strongest topics. The data shows clear winners — lean into them.',
    evidence: 'No critical blockers detected, but growth requires sustained focus on proven content pillars.',
    fix: 'Maintain your upload schedule and focus 80% of content on your top 3 topics.',
  };
}

// ===== HELPERS =====

function nicheShort(dna: ChannelDNA): string {
  return dna.niche?.split(/[&,]/)[0]?.trim() || 'Your Niche';
}
