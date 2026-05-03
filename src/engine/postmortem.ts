import { ChannelDNA, VideoEntry, Postmortem, Diagnosis, FailureType, VideoCategory } from '@/types';
import { getPerformanceTier } from './scoring';

export function analyzeAllPostmortems(
  videos: VideoEntry[],
  channelDNA: ChannelDNA
): Postmortem[] {
  if (videos.length === 0) return [];
  const avgViews = videos.reduce((s, v) => s + v.views, 0) / videos.length;
  const weak = videos.filter((v) => v.views < avgViews * 0.6);
  return weak.map((v) => analyzeVideo(v, videos, channelDNA, avgViews));
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function analyzeVideo(
  video: VideoEntry,
  all: VideoEntry[],
  dna: ChannelDNA,
  avgViews: number
): Postmortem {
  const diagnoses: Diagnosis[] = [];
  const niche = dna.niche?.split(/[&,]/)[0]?.trim() || 'your niche';

  // Weak hook — low retention + early drop signals
  if (/drop.off|leaving|low retention|early drop/i.test(video.retentionNotes) && video.avgViewDuration < 200) {
    diagnoses.push({
      type: FailureType.WEAK_HOOK,
      confidence: 'High',
      evidence: `Average view duration of ${fmt(video.avgViewDuration)} with noted early drop-off. Viewers aren't getting past the first 30 seconds.`,
      packagingFix: 'Open with the most interesting finding or claim first. Cut any intro longer than 5 seconds. Start mid-action or mid-sentence.',
      contentFix: "Restructure to front-load the payoff. Tell viewers what they'll learn in the first 10 seconds, then deliver immediately.",
      followUpIdea: `Remake this topic with a stronger hook: "The Real Reason ${video.topic} Matters (And What Nobody Tells You)"`,
    });
  }

  // Title-thumbnail mismatch — high impressions but low CTR
  if (video.impressions > avgViews * 3 && video.ctr < 3.5) {
    diagnoses.push({
      type: FailureType.TITLE_THUMB_MISMATCH,
      confidence: 'High',
      evidence: `${video.impressions.toLocaleString()} impressions but only ${video.ctr}% CTR. YouTube showed this to people but they didn't click.`,
      packagingFix: 'Rewrite the title with a curiosity gap or specific number. Make the thumbnail tell a story in one glance.',
      contentFix: 'The content may be fine. This is a packaging problem. A/B test a new title and thumbnail.',
      followUpIdea: `Same content, better packaging: "The ${video.topic} Mistake That's Costing You"`,
    });
  }

  // Wrong audience — low impressions means algorithm doesn't know who to show it to
  const avgImpressions = all.reduce((s, v) => s + v.impressions, 0) / all.length;
  if (video.impressions < avgImpressions * 0.4) {
    const topTopics = [...all].sort((a, b) => b.views - a.views).slice(0, 3).map((v) => v.topic);
    if (!topTopics.includes(video.topic)) {
      diagnoses.push({
        type: FailureType.WRONG_AUDIENCE,
        confidence: 'Medium',
        evidence: `Only ${video.impressions.toLocaleString()} impressions — YouTube didn't know who to show this to. Your channel is known for ${topTopics.join(', ')}, but this video is about ${video.topic}.`,
        packagingFix: `Bridge the topic to your core niche. Frame it through the lens of ${topTopics[0]}.`,
        contentFix: `Connect it explicitly to your main content. "As a ${niche} creator, here's why this matters..."`,
        followUpIdea: `Reframe for your audience: "How ${video.topic} Affects Your ${topTopics[0]} Experience"`,
      });
    }
  }

  // Too broad — personal/vlog content
  if (/vlog|day in|setup tour|behind|unboxing.*my|my.*setup|my.*room/i.test(video.topic)) {
    diagnoses.push({
      type: FailureType.TOO_BROAD,
      confidence: 'High',
      evidence: `"${video.title}" is personal content that only works for established creators. At your stage, viewers discover you through topics, not personality.`,
      packagingFix: `Tie personal content to a searchable topic. Reframe around ${niche} value instead of personal interest.`,
      contentFix: 'Save personal/vlog content until you have 5K+ subscribers. Every upload at this stage should answer a question or solve a problem.',
      followUpIdea: `Topic-first version: "The Best ${niche} Setup for ${dna.targetAudience?.split(/[,.]/)[0] || 'Beginners'}"`,
    });
  }

  // Bad timing — conversion content too early
  if (video.category === VideoCategory.CONVERSION && video.views < avgViews * 0.3) {
    diagnoses.push({
      type: FailureType.BAD_TIMING,
      confidence: 'Medium',
      evidence: `This is subscriber-conversion content, but your channel doesn't have enough subscribers yet. Only ${video.views} views vs ${Math.round(avgViews)} average.`,
      packagingFix: 'Reframe as value-first content. Instead of "for my subscribers," make it "for anyone interested in X."',
      contentFix: 'Conversion content works after you have a loyal base. At this stage, focus on discovery content.',
      followUpIdea: `Discovery version: "Why ${niche} Is About to Blow Up in 2026"`,
    });
  }

  // Poor format — long-form with very low watch time
  if (video.format === 'Long-form' && video.avgViewDuration < 180 && /low|poor|drop/i.test(video.retentionNotes)) {
    diagnoses.push({
      type: FailureType.POOR_FORMAT,
      confidence: 'Medium',
      evidence: `Long-form video with only ${fmt(video.avgViewDuration)} average watch time. This topic might work better as a Short or a tighter 5-minute video.`,
      packagingFix: "Consider making this a Short instead. Some topics don't need 10+ minutes.",
      contentFix: "If keeping long-form, cut the runtime by 40%. Remove any section that doesn't serve the title's promise.",
      followUpIdea: `Short version: "60-Second ${video.topic} Tip That Actually Works"`,
    });
  }

  // Default fallback
  if (diagnoses.length === 0) {
    diagnoses.push({
      type: FailureType.POOR_PACKAGING,
      confidence: 'Low',
      evidence: `${video.views} views vs ${Math.round(avgViews)} channel average. No single clear failure point, but the packaging likely didn't generate enough curiosity.`,
      packagingFix: 'Rewrite the title with a stronger hook. Add a number, a question, or a surprising claim.',
      contentFix: 'Review the first 30 seconds. Does it immediately tell the viewer why they should keep watching?',
      followUpIdea: `Repackaged: "I Was Wrong About ${video.topic} — Here's the Truth"`,
    });
  }

  return {
    video,
    performanceTier: getPerformanceTier(video, all),
    viewsVsAverage: Math.round((video.views / avgViews) * 100),
    diagnoses,
    primaryDiagnosis: diagnoses[0],
  };
}
