'use client';

import Link from 'next/link';
import { useStore } from '@/store/provider';
import { StatCard } from '@/components/ui/card';
import { TopicList } from '@/components/features/topic-list';
import { BlockerCard } from '@/components/features/blocker-card';
import { VideoIdeaCard } from '@/components/features/video-idea-card';
import { MetricBar } from '@/components/ui/progress-bar';
import { analyzePatterns } from '@/engine/scoring';
import { identifyGrowthBlocker, generateVideoIdeas } from '@/engine/recommendations';
import { ContentFormat } from '@/types';

export default function OverviewPage() {
  const { channelDNA, videos } = useStore();

  if (!channelDNA) return <Welcome />;

  const patterns = analyzePatterns(videos);
  const blocker = identifyGrowthBlocker(videos, channelDNA);
  const ideas = generateVideoIdeas(channelDNA, videos, 3);

  const totalViews = videos.reduce((s, v) => s + v.views, 0);
  const avgCTR = videos.length
    ? (videos.reduce((s, v) => s + v.ctr, 0) / videos.length).toFixed(1)
    : '0';
  const bestVideo = videos.reduce(
    (best, v) => (v.views > (best?.views || 0) ? v : best),
    videos[0]
  );
  const avgViews = videos.length ? Math.round(totalViews / videos.length) : 0;

  const shorts = videos.filter((v) => v.format === ContentFormat.SHORT);
  const longform = videos.filter((v) => v.format === ContentFormat.LONG_FORM);
  const shortsAvg = shorts.length
    ? Math.round(shorts.reduce((s, v) => s + v.views, 0) / shorts.length)
    : 0;
  const longAvg = longform.length
    ? Math.round(longform.reduce((s, v) => s + v.views, 0) / longform.length)
    : 0;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-primary-light)]/5 border border-[var(--color-primary)]/20 rounded-[20px] p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/5 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(229,57,53,0.1),transparent_70%)] pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-pink)] rounded-[14px] flex items-center justify-center text-xl font-extrabold text-white">
            {channelDNA.channelName[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{channelDNA.channelName}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{channelDNA.niche}</p>
          </div>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Here&apos;s your strategy overview based on {videos.length} videos and your Channel DNA
          profile.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blueprint"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm shadow-[0_2px_8px_rgba(229,57,53,0.3)] hover:-translate-y-0.5 transition-all"
          >
            View Breakout Blueprint
          </Link>
          <Link
            href="/first20"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] text-[var(--color-text)] rounded-[10px] font-semibold text-sm hover:border-[var(--color-primary)] transition-all"
          >
            First 20 Videos Plan
          </Link>
        </div>
      </div>

      {/* Stats */}
      {videos.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 stagger">
          <StatCard icon="📊" value={String(videos.length)} label="Total Videos" />
          <StatCard
            icon="👁"
            value={totalViews.toLocaleString()}
            label="Total Views"
            change={`~${avgViews.toLocaleString()} avg`}
            positive
            bgColor="bg-[var(--color-green)]/10"
          />
          <StatCard
            icon="🎯"
            value={avgCTR + '%'}
            label="Average CTR"
            change={Number(avgCTR) >= 4.5 ? 'Above average' : 'Room to improve'}
            positive={Number(avgCTR) >= 4.5}
            bgColor="bg-[var(--color-blue)]/10"
          />
          <StatCard
            icon="🏆"
            value={bestVideo ? bestVideo.views.toLocaleString() : '—'}
            label="Best Video Views"
            change={bestVideo ? bestVideo.title.slice(0, 30) + '…' : ''}
            positive
            bgColor="bg-[var(--color-orange)]/10"
          />
        </div>
      )}

      {/* Themes */}
      {patterns && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
          <TopicList topics={patterns.topThemes} title="🔥 Top Performing Themes" />
          <TopicList topics={patterns.weakThemes} title="📉 Weakest Themes" />
        </div>
      )}

      {/* Blocker */}
      {blocker && (
        <div className="mb-8">
          <BlockerCard blocker={blocker} />
        </div>
      )}

      {/* Quick Recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Quick Recommendations</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Based on your Channel DNA and performance data
            </p>
          </div>
          <Link
            href="/blueprint"
            className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            View Full Blueprint →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 stagger">
          {ideas.map((idea, i) => (
            <VideoIdeaCard key={i} idea={idea} index={i} />
          ))}
        </div>
      </div>

      {/* Shorts vs Long-form */}
      {(shorts.length > 0 || longform.length > 0) && (
        <div>
          <h3 className="text-lg font-bold mb-6">Shorts vs Long-form</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-bold">Shorts</div>
                  <div className="text-sm text-[var(--color-text-muted)]">
                    {shorts.length} video{shorts.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <MetricBar
                label="Avg Views"
                value={shortsAvg}
                max={Math.max(shortsAvg, longAvg)}
                color="var(--color-pink)"
              />
              <p className="text-sm text-[var(--color-text-secondary)]">
                {shorts.length
                  ? 'Shorts are useful for discovery but convert fewer subscribers. Use them to tease long-form content.'
                  : 'No Shorts data yet. Consider testing short-form content for discovery.'}
              </p>
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎬</span>
                <div>
                  <div className="font-bold">Long-form</div>
                  <div className="text-sm text-[var(--color-text-muted)]">
                    {longform.length} video{longform.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <MetricBar
                label="Avg Views"
                value={longAvg}
                max={Math.max(shortsAvg, longAvg)}
                color="var(--color-primary)"
              />
              <p className="text-sm text-[var(--color-text-secondary)]">
                {longform.length
                  ? 'Long-form is your primary growth driver. Focus on searchable topics with strong hooks.'
                  : 'No long-form data yet. Long-form content is essential for building subscriber relationships.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Welcome() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="text-center max-w-xl">
        <div className="text-7xl mb-6">🚀</div>
        <h1 className="text-3xl font-extrabold mb-3">Welcome to First1K</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Your AI-powered strategy engine for reaching your first 1,000 subscribers. Let&apos;s
          start by building your Channel DNA.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/channel-dna"
            className="px-7 py-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold shadow-[0_2px_8px_rgba(229,57,53,0.3)] hover:-translate-y-0.5 transition-all"
          >
            Build Channel DNA →
          </Link>
        </div>
      </div>
    </div>
  );
}
