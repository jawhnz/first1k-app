import { ChannelDNA, VideoEntry, VideoIdea, LaunchPlan } from '@/types';

export function generateLaunchPlan(
  idea: VideoIdea,
  dna: ChannelDNA,
  videos: VideoEntry[]
): LaunchPlan {
  return {
    videoTitle: idea.title,
    bestTiming: getBestTiming(dna, videos),
    titleApproach: getTitleApproach(idea),
    thumbnailConcept: getThumbnailConcept(idea),
    hookFirst30s: getHook(idea),
    shortsTeaser: idea.format !== 'Shorts',
    shortsTeaserIdea: getShortsTeaser(idea),
    partOfSeries: isSeriesCandidate(idea, videos),
    seriesName: getSeriesName(idea),
    sequelOpportunity: getSequel(idea),
    watchChecklist48h: getChecklist(),
    distributionTips: getDistribution(),
  };
}

export function generateAllLaunchPlans(
  ideas: VideoIdea[],
  dna: ChannelDNA,
  videos: VideoEntry[]
): LaunchPlan[] {
  return ideas.map((i) => generateLaunchPlan(i, dna, videos));
}

function getBestTiming(dna: ChannelDNA, videos: VideoEntry[]): string {
  const dayPerf: Record<string, { views: number; count: number }> = {};
  videos.forEach((v) => {
    const day = new Date(v.publishDate).toLocaleDateString('en-US', { weekday: 'long' });
    if (!dayPerf[day]) dayPerf[day] = { views: 0, count: 0 };
    dayPerf[day].views += v.views;
    dayPerf[day].count++;
  });
  let bestDay = 'Tuesday or Wednesday';
  let bestAvg = 0;
  Object.entries(dayPerf).forEach(([day, d]) => {
    const avg = d.views / d.count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestDay = day;
    }
  });
  const time = /tech|gaming/i.test(dna.niche) ? '12:00 PM – 3:00 PM EST' : '2:00 PM – 4:00 PM EST';
  return `${bestDay} at ${time}. Based on your data, ${bestDay} uploads average ${Math.round(bestAvg)} views — your strongest day.`;
}

function getTitleApproach(idea: VideoIdea): string {
  const t = idea.title;
  const parts: string[] = [];
  if (/\$/.test(t)) parts.push('Price anchor creates immediate relevance for budget-conscious viewers.');
  if (/vs|versus/i.test(t)) parts.push('VS format creates natural tension. Viewers click to see who wins.');
  if (/truth|actually|real/i.test(t)) parts.push("Contrarian framing signals you'll share an honest take others won't.");
  if (/\d+/.test(t)) parts.push('Numbers set clear expectations and signal organized content.');
  if (/\?$/.test(t)) parts.push('Question format creates an open loop the viewer needs to close by watching.');
  parts.push(`A/B test alternative: "Stop Making This ${idea.topic || ''} Mistake"`);
  return parts.join(' ');
}

function getThumbnailConcept(idea: VideoIdea): string {
  const t = idea.title;
  if (/vs|versus|compared/i.test(t))
    return 'Split thumbnail with both options side by side. Contrasting colors (red vs green). Large VS in center. Your face showing genuine reaction.';
  if (/budget|cheap|\$/i.test(t))
    return 'Show the product prominently with the price in large, bold text. Green or gold for the price. Expression: pleasant surprise.';
  if (/mistake|wrong|truth/i.test(t))
    return 'Your face with a concerned expression. Red X marks or warning symbols. One clear focal point. Max 3 words text overlay.';
  if (/guide|how to|tutorial/i.test(t))
    return 'Show the end result or transformation. Clean, professional look with minimal text. Confident expression.';
  return 'One clear focal point with high contrast. Genuine emotion on your face. Max 3-4 words text overlay. Test with the "squint test."';
}

function getHook(idea: VideoIdea): string {
  const t = idea.title;
  const base = "Open with the most surprising finding or result. Don't save the best for last — lead with it.";
  if (/vs|compared/i.test(t))
    return `${base}\n\n"I tested [A] against [B] and the results genuinely surprised me. Let me show you exactly what happened." Then immediately show the key comparison moment.\n\nKill any intro longer than 5 seconds.`;
  if (/budget|cheap|\$/i.test(t))
    return `${base}\n\n"I found something for [price] that performs like it costs 3x more. Here's the proof." Show the product immediately.\n\nKill any intro longer than 5 seconds.`;
  if (/mistake|wrong/i.test(t))
    return `${base}\n\n"If you're doing [common thing], you're probably making this mistake and it's costing you [consequence]." Demonstrate the mistake and fix immediately.\n\nKill any intro longer than 5 seconds.`;
  return `${base}\n\n"Here's something about ${idea.topic || 'this topic'} that most people get completely wrong." Present your contrarian take with evidence.\n\nKill any intro longer than 5 seconds.`;
}

function getShortsTeaser(idea: VideoIdea): string {
  if (/vs|compared/i.test(idea.title))
    return 'Create a 30-second Short showing just the key comparison moment with the surprising result. End with "Full video on my channel."';
  if (/budget|cheap/i.test(idea.title))
    return 'Show the "unboxing moment" or first impression. React genuinely. End with "Full review on my channel."';
  return 'Pull the single most interesting 30-45 seconds. The moment that makes viewers say "wait, really?" Post 24 hours before the main video.';
}

function isSeriesCandidate(idea: VideoIdea, videos: VideoEntry[]): boolean {
  const topic = (idea.topic || '').toLowerCase();
  const related = videos.filter(
    (v) => v.topic.toLowerCase().includes(topic) || topic.includes(v.topic.toLowerCase())
  );
  return related.length >= 2 || /part|episode|series/i.test(idea.title);
}

function getSeriesName(idea: VideoIdea): string {
  const t = idea.topic || idea.title;
  if (/budget|cheap/i.test(t)) return 'Budget Builds Series';
  if (/vs|compared/i.test(t)) return 'Head-to-Head Series';
  if (/review/i.test(t)) return 'Honest Reviews Series';
  return `${t} Series`;
}

function getSequel(idea: VideoIdea): string {
  if (/\$/.test(idea.title))
    return 'Follow up with a different price point: "What About $[higher price]? — Is the Upgrade Worth It?"';
  if (/vs/i.test(idea.title))
    return 'Test the winner against a new challenger. Or do a "6 months later" follow-up.';
  if (/mistake|wrong/i.test(idea.title))
    return '"5 MORE Mistakes" sequel, or flip it: "5 Things You\'re Doing RIGHT"';
  return 'Create a follow-up that goes deeper on the most-discussed point from the comments.';
}

function getChecklist(): string[] {
  return [
    'Hour 0: Publish and share to relevant communities (Reddit, Discord) — add value, don\'t just drop a link',
    'Hour 1: Pin a comment asking a specific question to drive early engagement',
    'Hour 2: Reply to every single comment — this signals active engagement to YouTube',
    'Hour 6: Check initial CTR. If below 4%, consider updating the thumbnail',
    'Hour 12: Post a Short teaser or behind-the-scenes clip linking back to the main video',
    'Hour 24: Review the audience retention graph. Note biggest drop-offs for future improvement',
    'Hour 24: Share to email list or social media with a personal note',
    'Hour 36: If CTR is strong but views are low, the topic may be too niche. Note for future planning',
    'Hour 48: Write down 3 things that worked and 3 things to improve',
  ];
}

function getDistribution(): string[] {
  return [
    'Post to 2-3 relevant subreddits with genuine value-add context',
    'Share in niche Discord servers where you\'re an active member',
    'Create a Twitter/X thread summarizing key takeaways with a link',
    'Comment on related videos from larger creators (genuinely, not spammy)',
    'Add the video to relevant playlists on your channel',
  ];
}
