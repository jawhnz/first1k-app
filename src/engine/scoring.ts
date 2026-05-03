import {
  ChannelDNA,
  VideoEntry,
  VideoIdea,
  IdeaScores,
  ContentFormat,
  ToneStyle,
  TopicPerformance,
  AnalysisPatterns,
  PerformanceTier,
} from '@/types';

// ===== PERFORMANCE TIER (dynamic, based on actual data) =====

export function getPerformanceTier(video: VideoEntry, videos: VideoEntry[]): PerformanceTier {
  if (videos.length === 0) return 'average';
  const avgViews = videos.reduce((s, v) => s + v.views, 0) / videos.length;
  if (video.views >= avgViews * 2) return 'breakout';
  if (video.views >= avgViews * 1.2) return 'strong';
  if (video.views >= avgViews * 0.6) return 'average';
  if (video.views >= avgViews * 0.3) return 'weak';
  return 'failed';
}

// ===== PATTERN ANALYSIS =====

export function analyzePatterns(videos: VideoEntry[]): AnalysisPatterns | null {
  if (!videos.length) return null;

  const themes: Record<string, { videos: VideoEntry[]; totalViews: number; ctrSum: number }> = {};
  videos.forEach((v) => {
    if (!themes[v.topic]) themes[v.topic] = { videos: [], totalViews: 0, ctrSum: 0 };
    themes[v.topic].videos.push(v);
    themes[v.topic].totalViews += v.views;
    themes[v.topic].ctrSum += v.ctr;
  });

  const sorted: TopicPerformance[] = Object.entries(themes)
    .map(([name, d]) => ({
      name,
      videos: d.videos,
      totalViews: d.totalViews,
      avgViews: d.totalViews / d.videos.length,
      avgCTR: d.ctrSum / d.videos.length,
    }))
    .sort((a, b) => b.avgViews - a.avgViews);

  return {
    topThemes: sorted.slice(0, 3),
    weakThemes: sorted.slice(-3).reverse(),
    avgViews: videos.reduce((s, v) => s + v.views, 0) / videos.length,
    avgCTR: videos.reduce((s, v) => s + v.ctr, 0) / videos.length,
    totalImpressions: videos.reduce((s, v) => s + v.impressions, 0),
  };
}

// ===== IDEA SCORING =====

export function scoreVideoIdea(
  idea: Partial<VideoIdea>,
  channelDNA: ChannelDNA,
  videos: VideoEntry[]
): IdeaScores {
  const scores: IdeaScores = {
    audienceFit: scoreAudienceFit(idea, channelDNA),
    novelty: scoreNovelty(idea, videos),
    clarity: scoreClarity(idea),
    channelAlignment: scoreChannelAlignment(idea, channelDNA),
    breakoutPotential: scoreBreakoutPotential(idea, videos),
    executionDifficulty: scoreExecutionDifficulty(idea, channelDNA),
    overall: 0,
  };
  scores.overall = calculateOverall(scores);
  return scores;
}

export function calculateOverall(scores: Omit<IdeaScores, 'overall'>): number {
  const weights = {
    audienceFit: 0.25,
    novelty: 0.15,
    clarity: 0.15,
    channelAlignment: 0.2,
    breakoutPotential: 0.15,
    executionDifficulty: 0.1,
  };
  let total = 0;
  for (const [key, weight] of Object.entries(weights)) {
    total += (scores[key as keyof typeof weights] || 0) * weight;
  }
  return Math.round(total);
}

function clamp(v: number) {
  return Math.min(100, Math.max(0, v));
}

function scoreAudienceFit(idea: Partial<VideoIdea>, dna: ChannelDNA): number {
  let score = 50;
  const titleLower = (idea.title || '').toLowerCase();
  const nicheLower = (dna.niche || '').toLowerCase();
  const audienceLower = (dna.targetAudience || '').toLowerCase();

  // Niche keyword overlap
  nicheLower.split(/\s+/).forEach((w) => {
    if (w.length > 3 && titleLower.includes(w)) score += 10;
  });

  // Audience keyword signals
  const audienceKeywords = audienceLower.split(/\s+/).filter((w) => w.length > 4);
  audienceKeywords.forEach((w) => {
    if (titleLower.includes(w)) score += 8;
  });

  // Common audience intent patterns
  if (audienceLower.includes('budget') && /budget|cheap|affordable|under \$|free/i.test(titleLower)) score += 15;
  if (audienceLower.includes('beginner') && /beginner|first|start|guide|how to|intro/i.test(titleLower)) score += 10;
  if (audienceLower.includes('advanced') && /advanced|pro|expert|master/i.test(titleLower)) score += 10;

  // Format alignment
  if (idea.format === ContentFormat.SHORT && dna.formatFocus === 'longform') score -= 10;
  if (idea.format === ContentFormat.LONG_FORM && dna.formatFocus === 'shorts') score -= 10;

  return clamp(score);
}

function scoreNovelty(idea: Partial<VideoIdea>, videos: VideoEntry[]): number {
  let score = 70;
  const titleLower = (idea.title || '').toLowerCase();
  videos.forEach((v) => {
    const vLower = v.title.toLowerCase();
    const common = titleLower.split(/\s+/).filter((w) => w.length > 3 && vLower.includes(w));
    if (common.length >= 3) score -= 15;
    else if (common.length >= 2) score -= 8;
  });
  return clamp(score);
}

function scoreClarity(idea: Partial<VideoIdea>): number {
  let score = 60;
  const title = idea.title || '';
  if (/how to|guide|tutorial|explained/i.test(title)) score += 15;
  if (/\d+/.test(title)) score += 10;
  if (/vs|versus|compared/i.test(title)) score += 10;
  if (/best|top|worst|tier/i.test(title)) score += 5;
  if (title.length < 60) score += 5;
  if (title.length > 80) score -= 10;
  return clamp(score);
}

function scoreChannelAlignment(idea: Partial<VideoIdea>, dna: ChannelDNA): number {
  let score = 50;
  const titleLower = (idea.title || '').toLowerCase();

  // Content type alignment
  dna.contentTypes?.forEach((type) => {
    if (titleLower.includes(type.toLowerCase())) score += 15;
  });

  // Tone alignment
  if (dna.toneStyle === ToneStyle.CASUAL && /my|I |we |our/i.test(idea.title || '')) score += 5;
  if (dna.toneStyle === ToneStyle.AUTHORITATIVE && /truth|real|honest|actually/i.test(idea.title || '')) score += 10;
  if (dna.toneStyle === ToneStyle.HUMOROUS && /funny|hilarious|try not|challenge/i.test(idea.title || '')) score += 10;
  if (dna.toneStyle === ToneStyle.ENERGETIC && /insane|crazy|epic|ultimate/i.test(idea.title || '')) score += 10;

  // Strength alignment
  dna.strengths?.forEach((s) => {
    s.toLowerCase().split(/\s+/).forEach((w) => {
      if (w.length > 4 && titleLower.includes(w)) score += 8;
    });
  });

  return clamp(score);
}

function scoreBreakoutPotential(idea: Partial<VideoIdea>, videos: VideoEntry[]): number {
  let score = 40;
  const title = idea.title || '';

  // Curiosity/hook patterns
  if (/this|these|why|secret|truth|actually|destroyed|killed|broke|insane/i.test(title)) score += 15;
  if (/\?$/.test(title)) score += 5;
  if (/\$\d+/.test(title)) score += 10;
  if (/vs|versus/i.test(title)) score += 10;
  if (/never|nobody|everyone|no one/i.test(title)) score += 8;

  // Check if similar topics performed well historically
  const avgViews = videos.length ? videos.reduce((s, v) => s + v.views, 0) / videos.length : 0;
  const topVideos = videos.filter((v) => v.views >= avgViews * 2);
  topVideos.forEach((v) => {
    const vWords = v.topic.toLowerCase().split(/\s+/);
    const ideaWords = (idea.topic || idea.title || '').toLowerCase().split(/\s+/);
    if (vWords.filter((w) => w.length > 3 && ideaWords.includes(w)).length > 0) score += 12;
  });

  return clamp(score);
}

function scoreExecutionDifficulty(idea: Partial<VideoIdea>, dna: ChannelDNA): number {
  let score = 70;

  // Check constraints
  dna.constraints?.forEach((c) => {
    const cl = c.toLowerCase();
    const tl = (idea.title || '').toLowerCase();
    if (cl.includes('budget') && /expensive|premium|high.end/i.test(tl)) score -= 20;
    if (cl.includes('solo') && /collab|interview|with.*creator/i.test(tl)) score -= 15;
    if (cl.includes('time') && /marathon|24.hour|week.long/i.test(tl)) score -= 15;
    if (cl.includes('equipment') && /cinematic|drone|studio/i.test(tl)) score -= 15;
  });

  if (idea.format === ContentFormat.SHORT) score += 10;
  if (idea.format === ContentFormat.LIVE) score -= 10;

  return clamp(score);
}
