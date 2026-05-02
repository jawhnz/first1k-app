import { ChannelDNA, ExperienceLevel, ContentFormat, ContentType, ToneStyle } from '@/types';

export const SAMPLE_CHANNEL_DNA: ChannelDNA = {
  channelName: 'TechCraft with Alex',
  niche: 'Tech Reviews & PC Building',
  targetAudience:
    'Budget-conscious tech enthusiasts aged 18-30 who want honest, no-BS reviews and build guides',
  experienceLevel: ExperienceLevel.BEGINNER,
  contentGoals: [
    'Reach 1,000 subscribers in 6 months',
    'Become a trusted voice for budget PC builds',
    'Build a community of fellow tech enthusiasts',
    'Eventually monetize through affiliate links',
  ],
  preferredFormats: [ContentFormat.LONG_FORM, ContentFormat.SHORT],
  contentTypes: [ContentType.REVIEWS, ContentType.TUTORIALS, ContentType.EDUCATIONAL],
  toneStyle: ToneStyle.CASUAL,
  strengths: [
    'Deep technical knowledge',
    'Good at explaining complex topics simply',
    'Access to hardware for testing',
    'Consistent editing style',
  ],
  constraints: [
    'Limited budget for new hardware',
    'Can only film on weekends',
    'No studio — films in bedroom',
    'Solo creator, no team',
  ],
  uploadFrequency: '1-2 videos per week',
  formatFocus: 'both',
};

export const SAMPLE_CHANNEL_STATS = {
  subscribers: 347,
  totalViews: 28400,
  totalVideos: 14,
  avgViews: 2028,
  avgCTR: 4.2,
  avgRetention: 42,
  channelAge: '3 months',
  bestVideo: 'Budget Gaming PC Under $500 — Full Build Guide',
  bestVideoViews: 8200,
};
