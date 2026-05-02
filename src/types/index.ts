// ===== ENUMS =====

export const ContentFormat = {
  LONG_FORM: 'Long-form',
  SHORT: 'Shorts',
  BOTH: 'Both',
  LIVE: 'Live Stream',
  PODCAST: 'Podcast Style',
} as const;
export type ContentFormatValue = (typeof ContentFormat)[keyof typeof ContentFormat];

export const ExperienceLevel = {
  BRAND_NEW: 'Brand New',
  BEGINNER: 'Beginner (< 10 videos)',
  INTERMEDIATE: 'Intermediate (10-50 videos)',
  EXPERIENCED: 'Experienced (50+ videos)',
} as const;
export type ExperienceLevelValue = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];

export const ContentType = {
  GAMEPLAY: 'Gameplay',
  IRL: 'IRL / Vlog',
  EDUCATIONAL: 'Educational',
  COMMENTARY: 'Commentary',
  REVIEWS: 'Reviews',
  TUTORIALS: 'Tutorials',
  ENTERTAINMENT: 'Entertainment',
  MULTI_GENRE: 'Multi-Genre',
  DOCUMENTARY: 'Documentary Style',
  REACTION: 'Reaction',
  STORYTELLING: 'Storytelling',
} as const;
export type ContentTypeValue = (typeof ContentType)[keyof typeof ContentType];

export const ToneStyle = {
  CASUAL: 'Casual & Conversational',
  PROFESSIONAL: 'Professional & Polished',
  ENERGETIC: 'High Energy',
  CALM: 'Calm & Thoughtful',
  HUMOROUS: 'Humorous',
  AUTHORITATIVE: 'Authoritative',
  RAW: 'Raw & Authentic',
} as const;
export type ToneStyleValue = (typeof ToneStyle)[keyof typeof ToneStyle];

export const VideoCategory = {
  EVERGREEN: 'Searchable Evergreen',
  AUTHORITY: 'Authority Building',
  BREAKOUT: 'Experimental Breakout',
  CONVERSION: 'Subscriber Conversion',
  TRENDING: 'Trend Response',
} as const;
export type VideoCategoryValue = (typeof VideoCategory)[keyof typeof VideoCategory];

export const FailureType = {
  WEAK_HOOK: 'Weak Hook',
  TITLE_THUMB_MISMATCH: 'Title-Thumbnail Mismatch',
  WRONG_AUDIENCE: 'Wrong Audience Fit',
  TOO_BROAD: 'Too Broad Topic',
  TOO_NARROW: 'Too Narrow Topic',
  EARLY_RETENTION_DROP: 'Early Retention Drop',
  POOR_PACKAGING: 'Poor Packaging',
  BAD_TIMING: 'Bad Timing in Channel Journey',
  POOR_FORMAT: 'Poor Format Choice',
} as const;
export type FailureTypeValue = (typeof FailureType)[keyof typeof FailureType];

// ===== MODELS =====

export interface ChannelDNA {
  channelName: string;
  niche: string;
  targetAudience: string;
  experienceLevel: string;
  contentGoals: string[];
  preferredFormats: string[];
  contentTypes: string[];
  toneStyle: string;
  strengths: string[];
  constraints: string[];
  uploadFrequency: string;
  formatFocus: 'shorts' | 'longform' | 'both';
}

export interface VideoEntry {
  id: string;
  title: string;
  topic: string;
  format: string;
  publishDate: string;
  impressions: number;
  ctr: number;
  avgViewDuration: number;
  retentionNotes: string;
  views: number;
  likes: number;
  comments: number;
  aiSummary: string;
  category: string;
}

export interface IdeaScores {
  audienceFit: number;
  novelty: number;
  clarity: number;
  channelAlignment: number;
  breakoutPotential: number;
  executionDifficulty: number;
  overall: number;
}

export interface VideoIdea {
  title: string;
  topic?: string;
  format: string;
  targetAngle: string;
  titleDirection: string;
  reason: string;
  scores: IdeaScores;
}

export interface ContentPillar {
  rank: number;
  name: string;
  description: string;
  avgViews: number;
  videoCount: number;
  avgCTR: string;
  bestVideo?: string;
}

export interface GrowthBlocker {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  evidence: string;
  fix: string;
}

export interface TrendInsight {
  trend: string;
  impact: string;
  recommendation: string;
}

export interface WeekPlan {
  week: number;
  theme: string;
  focus: string;
  videos: WeekVideo[];
}

export interface WeekVideo {
  title: string;
  type: string;
  day: string;
  reason: string;
}

export interface Blueprint {
  pillars: ContentPillar[];
  blocker: GrowthBlocker | null;
  videoIdeas: VideoIdea[];
  strategy30Day: WeekPlan[];
  trendInsights: TrendInsight[];
  narrative: string;
}

export interface First20Video {
  number: number;
  idea: string;
  purpose: string;
  category: string;
  format: string;
  packagingAngle: string;
  orderReason: string;
}

export interface First20Phase {
  name: string;
  description: string;
  videoRange: string;
  color: string;
  videos: First20Video[];
}

export interface Diagnosis {
  type: string;
  confidence: string;
  evidence: string;
  packagingFix: string;
  contentFix: string;
  followUpIdea: string;
}

export interface Postmortem {
  video: VideoEntry;
  performanceTier: string;
  viewsVsAverage: number;
  diagnoses: Diagnosis[];
  primaryDiagnosis: Diagnosis;
}

export interface LaunchPlan {
  videoTitle: string;
  bestTiming: string;
  titleApproach: string;
  thumbnailConcept: string;
  hookFirst30s: string;
  shortsTeaser: boolean;
  shortsTeaserIdea: string;
  partOfSeries: boolean;
  seriesName: string;
  sequelOpportunity: string;
  watchChecklist48h: string[];
  distributionTips: string[];
}

export type PerformanceTier = 'breakout' | 'strong' | 'average' | 'weak' | 'failed';

export interface TopicPerformance {
  name: string;
  videos: VideoEntry[];
  totalViews: number;
  avgViews: number;
  avgCTR: number;
}

export interface AnalysisPatterns {
  topThemes: TopicPerformance[];
  weakThemes: TopicPerformance[];
  avgViews: number;
  avgCTR: number;
  totalImpressions: number;
}
