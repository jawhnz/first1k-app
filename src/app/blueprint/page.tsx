'use client';

import Link from 'next/link';
import { useStore } from '@/store/provider';
import { generateBlueprint } from '@/engine/blueprint';
import { PillarCard } from '@/components/features/pillar-card';
import { BlockerCard } from '@/components/features/blocker-card';
import { VideoIdeaCard } from '@/components/features/video-idea-card';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LiveTrends } from '@/components/features/live-trends';

export default function BlueprintPage() {
  const { channelDNA, videos } = useStore();

  if (!channelDNA) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <div className="text-5xl mb-4 opacity-30">🧬</div>
          <h3 className="font-semibold text-[var(--color-text-secondary)] mb-2">Channel DNA Required</h3>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6">Set up your Channel DNA first to generate your personalized Breakout Blueprint.</p>
          <Link href="/channel-dna" className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm">Build Channel DNA</Link>
        </div>
      </div>
    );
  }

  const bp = generateBlueprint(channelDNA, videos);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Breakout Blueprint</h1>
        <p className="text-[var(--color-text-muted)]">Your personalized growth strategy based on Channel DNA and performance data</p>
      </div>

      {/* Narrative */}
      <div className="bg-gradient-to-br from-[var(--color-green)]/12 to-[var(--color-primary)]/8 border border-[var(--color-green)]/20 rounded-[20px] p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎯</span>
          <h3 className="text-xl font-bold">Strategy Summary</h3>
        </div>
        <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-3">
          {bp.narrative.split('\n\n').map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-text)]">$1</strong>') }} />
          ))}
        </div>
      </div>

      {/* Pillars */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Content Pillars</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Your top 3 content themes based on performance data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 stagger">
          {bp.pillars.map((p) => <PillarCard key={p.rank} pillar={p} />)}
        </div>
      </section>

      {/* Blocker */}
      {bp.blocker && (
        <section className="mb-8">
          <BlockerCard blocker={bp.blocker} />
        </section>
      )}

      {/* Video Ideas */}
      <section className="mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold">5 Recommended Next Videos</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Scored and ranked by audience fit, breakout potential, and channel alignment</p>
        </div>
        <div className="space-y-4">
          {bp.videoIdeas.map((idea, i) => <VideoIdeaCard key={i} idea={idea} index={i} />)}
        </div>
      </section>

      {/* 30-Day Strategy */}
      <section className="mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold">30-Day Posting Strategy</h3>
          <p className="text-sm text-[var(--color-text-muted)]">A week-by-week plan to build momentum</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {bp.strategy30Day.map((week) => (
              <Card key={week.week}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] flex items-center justify-center font-extrabold text-sm">
                    W{week.week}
                  </div>
                  <div>
                    <div className="font-bold">{week.theme}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Week {week.week}</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{week.focus}</p>
                {week.videos.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-t border-[var(--color-border)]">
                    <Badge variant="purple">{v.day}</Badge>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{v.title}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{v.reason}</div>
                    </div>
                    <Badge variant={v.type === 'Short' ? 'pink' : 'blue'}>{v.type}</Badge>
                  </div>
                ))}
              </Card>
            ))}
          </div>
          <div>
            <div className="bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-pink)]/5 border border-[var(--color-primary)]/15 rounded-[14px] p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">🧠 Strategy Principles</h4>
              {[
                'Lead with your strongest topic each week to build algorithmic momentum',
                'Alternate between evergreen and breakout content to balance growth and stability',
                'Use Shorts strategically to tease long-form content, not as standalone',
                'Every video should serve one of your 3 content pillars — no off-topic experiments this month',
              ].map((text, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-[var(--color-border)] last:border-0">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Web Trends */}
      <section className="mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold">🌐 Live Trend Insights</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Real-time trends from the web that could affect your {channelDNA.niche} content strategy</p>
        </div>
        <LiveTrends channelDNA={channelDNA} pillars={bp.pillars} />
      </section>

      {/* Data-driven Trends */}
      {bp.trendInsights.length > 0 && (
        <section>
          <div className="mb-6">
            <h3 className="text-lg font-bold">📊 Data-Driven Insights</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Patterns from your own channel data that suggest strategic opportunities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 stagger">
            {bp.trendInsights.map((t, i) => (
              <Card key={i}>
                <div className="text-sm font-semibold mb-2">{t.trend}</div>
                <div className="text-xs text-[var(--color-orange)] mb-3">Impact: {t.impact}</div>
                <div className="text-sm text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
                  <strong className="text-[var(--color-green)]">→</strong> {t.recommendation}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
