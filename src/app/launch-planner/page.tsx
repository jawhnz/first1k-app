'use client';

import Link from 'next/link';
import { useStore } from '@/store/provider';
import { generateVideoIdeas } from '@/engine/recommendations';
import { generateAllLaunchPlans } from '@/engine/launch-planner';
import { LaunchPlanCard } from '@/components/features/launch-plan-card';
import { StatCard } from '@/components/ui/card';

export default function LaunchPlannerPage() {
  const { channelDNA, videos } = useStore();

  if (!channelDNA) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <div className="text-5xl mb-4 opacity-30">🚀</div>
          <h3 className="font-semibold text-[var(--color-text-secondary)] mb-2">Channel DNA Required</h3>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6">Set up your Channel DNA first to generate launch plans.</p>
          <Link href="/channel-dna" className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm">Build Channel DNA</Link>
        </div>
      </div>
    );
  }

  const ideas = generateVideoIdeas(channelDNA, videos, 5);
  const plans = generateAllLaunchPlans(ideas, channelDNA, videos);
  const withShorts = plans.filter((p) => p.shortsTeaser).length;
  const seriesCandidates = plans.filter((p) => p.partOfSeries).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Launch Planner</h1>
        <p className="text-[var(--color-text-muted)]">For every recommended video, here&apos;s exactly how to push it out for maximum impact</p>
      </div>

      <div className="bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/20 rounded-[10px] p-4 mb-6 text-sm text-[var(--color-blue)] flex items-start gap-3">
        <span>🚀</span>
        <span>Each launch plan includes timing, packaging, hooks, distribution strategy, and a 48-hour watch checklist.</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 stagger">
        <StatCard icon="🚀" value={String(plans.length)} label="Launch Plans Ready" bgColor="bg-[var(--color-primary)]/10" />
        <StatCard icon="📱" value={String(withShorts)} label="Need Shorts Teasers" change="Pre-launch discovery" positive bgColor="bg-[var(--color-pink)]/10" />
        <StatCard icon="🔗" value={String(seriesCandidates)} label="Series Candidates" change="Subscriber conversion" positive bgColor="bg-[var(--color-teal)]/10" />
      </div>

      {/* Plans */}
      {plans.map((plan, i) => (
        <LaunchPlanCard key={i} plan={plan} index={i} />
      ))}

      {/* Distribution Guide */}
      <section className="mt-8">
        <h3 className="text-lg font-bold mb-6">📢 General Distribution Guide</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrategyPanel
            title="🕐 Timing Strategy"
            items={[
              'Post Shorts teasers 24 hours before the main video to build anticipation',
              'Publish main videos mid-week (Tue-Thu) when your audience is most active',
              'Engage heavily in the first 2 hours — reply to every comment to boost signals',
              'Check CTR at 6 hours. If below 4%, swap the thumbnail immediately',
            ]}
          />
          <StrategyPanel
            title="📣 Distribution Channels"
            items={[
              "Reddit — Find 2-3 relevant subreddits. Add genuine value, don't just drop links",
              "Discord — Share in niche communities where you're an active, contributing member",
              'Twitter/X — Create a thread summarizing key takeaways with the video link',
              'Comments — Leave thoughtful comments on related videos from larger creators',
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function StrategyPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-pink)]/5 border border-[var(--color-primary)]/15 rounded-[14px] p-6">
      <h4 className="font-semibold mb-4">{title}</h4>
      {items.map((text, i) => (
        <div key={i} className="flex gap-3 py-3 border-b border-[var(--color-border)] last:border-0">
          <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] flex items-center justify-center text-xs font-bold shrink-0">
            {i + 1}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}
