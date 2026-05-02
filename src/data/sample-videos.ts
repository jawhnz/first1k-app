import { VideoEntry, ContentFormat, VideoCategory, PerformanceTier } from '@/types';
import { SAMPLE_CHANNEL_STATS } from './sample-creator';

export const SAMPLE_VIDEOS: VideoEntry[] = [
  {
    id: 'v1',
    title: 'Budget Gaming PC Under $500 — Full Build Guide',
    topic: 'PC Building',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-02-15',
    impressions: 45000,
    ctr: 6.8,
    avgViewDuration: 480,
    retentionNotes:
      'Strong first 2 min, slight dip at parts list, recovers at build montage. 52% retention at midpoint.',
    views: 8200,
    likes: 340,
    comments: 67,
    aiSummary:
      'Top performer. Strong search intent topic with clear value proposition. Good retention suggests content delivers on promise.',
    category: VideoCategory.EVERGREEN,
  },
  {
    id: 'v2',
    title: 'Is the RTX 4060 Worth It in 2026?',
    topic: 'GPU Reviews',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-02-22',
    impressions: 32000,
    ctr: 5.4,
    avgViewDuration: 390,
    retentionNotes: 'Good hook, steady retention through benchmarks. Drop-off at conclusion section.',
    views: 5100,
    likes: 210,
    comments: 45,
    aiSummary:
      'Solid performer. Timely topic with search demand. Review format works well for this creator.',
    category: VideoCategory.AUTHORITY,
  },
  {
    id: 'v3',
    title: 'My Desk Setup Tour 2026',
    topic: 'Setup Tour',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-01',
    impressions: 8500,
    ctr: 3.1,
    avgViewDuration: 180,
    retentionNotes:
      'High initial drop-off at 30s. Viewers leaving before seeing the full setup. Low retention throughout.',
    views: 890,
    likes: 42,
    comments: 12,
    aiSummary:
      'Underperformer. Setup tours from small creators lack draw. No search intent, no unique angle.',
    category: VideoCategory.CONVERSION,
  },
  {
    id: 'v4',
    title: '5 Mistakes New PC Builders Make',
    topic: 'PC Building Tips',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-08',
    impressions: 28000,
    ctr: 5.9,
    avgViewDuration: 420,
    retentionNotes:
      'Excellent hook. Each mistake segment keeps viewers engaged. Strong retention curve.',
    views: 4800,
    likes: 195,
    comments: 38,
    aiSummary:
      'Strong performer. List format with clear value. Searchable topic that positions creator as knowledgeable.',
    category: VideoCategory.EVERGREEN,
  },
  {
    id: 'v5',
    title: 'I Tried the Cheapest Keyboard on Amazon',
    topic: 'Budget Peripherals',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-12',
    impressions: 18000,
    ctr: 7.2,
    avgViewDuration: 350,
    retentionNotes:
      'Great CTR from curiosity. Retention dips in middle during detailed specs. Recovers at verdict.',
    views: 3400,
    likes: 156,
    comments: 52,
    aiSummary:
      'Good CTR shows packaging works. Curiosity-driven format suits this niche. Could be a series.',
    category: VideoCategory.BREAKOUT,
  },
  {
    id: 'v6',
    title: 'Why I Switched to Linux (and Switched Back)',
    topic: 'Operating Systems',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-18',
    impressions: 6200,
    ctr: 2.8,
    avgViewDuration: 210,
    retentionNotes:
      'Very low impressions. Audience not interested in OS content. Early drop-off suggests wrong audience.',
    views: 520,
    likes: 28,
    comments: 15,
    aiSummary:
      'Poor fit for channel audience. Topic too far from core niche. Low impressions suggest algorithm confusion.',
    category: VideoCategory.BREAKOUT,
  },
  {
    id: 'v7',
    title: 'Best Budget Monitor for Gaming — Under $200',
    topic: 'Monitor Reviews',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-22',
    impressions: 22000,
    ctr: 5.1,
    avgViewDuration: 360,
    retentionNotes:
      'Solid throughout. Comparison format keeps viewers watching. Good call-to-action at end.',
    views: 3200,
    likes: 130,
    comments: 28,
    aiSummary:
      'Consistent performer. Budget angle aligns with channel identity. Search-friendly title.',
    category: VideoCategory.EVERGREEN,
  },
  {
    id: 'v8',
    title: 'Unboxing My New Camera (Channel Upgrade!)',
    topic: 'Behind the Scenes',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-03-25',
    impressions: 4100,
    ctr: 2.4,
    avgViewDuration: 150,
    retentionNotes:
      'Extremely low engagement. Subscribers dont care about creator gear at this stage.',
    views: 310,
    likes: 35,
    comments: 8,
    aiSummary:
      'Classic small-creator trap. Behind-the-scenes content only works with established audience connection.',
    category: VideoCategory.CONVERSION,
  },
  {
    id: 'v9',
    title: '$300 vs $1000 Gaming Setup — Worth the Upgrade?',
    topic: 'Comparison',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-04-01',
    impressions: 38000,
    ctr: 6.5,
    avgViewDuration: 510,
    retentionNotes:
      'Excellent retention. Comparison format creates natural tension. Viewers stay for the verdict.',
    views: 6800,
    likes: 290,
    comments: 72,
    aiSummary:
      'Second best performer. VS format with clear stakes works extremely well. High engagement signals.',
    category: VideoCategory.BREAKOUT,
  },
  {
    id: 'v10',
    title: 'Quick Tip: Fix Slow Boot Times in 2 Minutes',
    topic: 'PC Tips',
    format: ContentFormat.SHORT,
    publishDate: '2026-04-05',
    impressions: 15000,
    ctr: 4.8,
    avgViewDuration: 45,
    retentionNotes:
      'Good for Shorts. Quick value delivery. Some viewers convert to channel page.',
    views: 2100,
    likes: 89,
    comments: 14,
    aiSummary:
      'Decent Short. Quick tips format works for discovery. Could drive traffic to longer content.',
    category: VideoCategory.EVERGREEN,
  },
  {
    id: 'v11',
    title: 'The Truth About Pre-Built Gaming PCs',
    topic: 'Pre-Built PCs',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-04-10',
    impressions: 25000,
    ctr: 5.7,
    avgViewDuration: 400,
    retentionNotes:
      'Strong opinion-driven content. Viewers engaged with takes. Good comment section debate.',
    views: 4200,
    likes: 185,
    comments: 58,
    aiSummary:
      'Opinion content performs well. "Truth about" framing creates curiosity. Positions creator as honest reviewer.',
    category: VideoCategory.AUTHORITY,
  },
  {
    id: 'v12',
    title: 'Day in My Life as a Tech YouTuber',
    topic: 'Vlog',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-04-14',
    impressions: 3800,
    ctr: 2.1,
    avgViewDuration: 120,
    retentionNotes:
      'Lowest performer. No search intent, no curiosity hook, audience doesnt know creator well enough.',
    views: 240,
    likes: 22,
    comments: 6,
    aiSummary:
      'Worst performer. Vlog content from unknown creators has near-zero discovery potential.',
    category: VideoCategory.CONVERSION,
  },
  {
    id: 'v13',
    title: 'This $40 Mouse Destroyed My $120 Mouse',
    topic: 'Budget Peripherals',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-04-18',
    impressions: 42000,
    ctr: 7.8,
    avgViewDuration: 440,
    retentionNotes:
      'Highest CTR on channel. Curiosity gap in title works perfectly. Strong throughout.',
    views: 7500,
    likes: 320,
    comments: 85,
    aiSummary:
      'Near-breakout video. Curiosity-driven packaging with budget angle is the winning formula for this channel.',
    category: VideoCategory.BREAKOUT,
  },
  {
    id: 'v14',
    title: 'How to Choose the Right PSU for Your Build',
    topic: 'PC Components',
    format: ContentFormat.LONG_FORM,
    publishDate: '2026-04-22',
    impressions: 12000,
    ctr: 3.8,
    avgViewDuration: 300,
    retentionNotes:
      'Moderate performance. Educational but dry. Needs better packaging to compete.',
    views: 1600,
    likes: 68,
    comments: 19,
    aiSummary:
      'Underperforming for the topic. PSU content has search demand but title lacks hook. Too tutorial-like without personality.',
    category: VideoCategory.EVERGREEN,
  },
];

export function getVideoPerformanceTier(video: VideoEntry): PerformanceTier {
  const avgViews = SAMPLE_CHANNEL_STATS.avgViews;
  if (video.views >= avgViews * 2) return 'breakout';
  if (video.views >= avgViews * 1.2) return 'strong';
  if (video.views >= avgViews * 0.6) return 'average';
  if (video.views >= avgViews * 0.3) return 'weak';
  return 'failed';
}

export function getPerformanceBadgeColor(tier: PerformanceTier) {
  const map: Record<PerformanceTier, string> = {
    breakout: 'bg-green-500/10 text-[var(--color-green)]',
    strong: 'bg-blue-500/10 text-[var(--color-blue)]',
    average: 'bg-yellow-500/10 text-[var(--color-orange)]',
    weak: 'bg-red-500/10 text-[var(--color-red)]',
    failed: 'bg-red-500/10 text-[var(--color-red)]',
  };
  return map[tier];
}
