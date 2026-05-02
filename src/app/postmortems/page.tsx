'use client';

import Link from 'next/link';
import { useStore } from '@/store/provider';
import { analyzeAllPostmortems } from '@/engine/postmortem';
import { PostmortemCard } from '@/components/features/postmortem-card';
import { StatCard } from '@/components/ui/card';
import { FailureType } from '@/types';

export default function PostmortemsPage() {
  const { channelDNA, videos } = useStore();

  if (!channelDNA || !videos.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <div className="text-5xl mb-4 opacity-30">🔍</div>
          <h3 className="font-semibold text-[var(--color-text-secondary)] mb-2">No Data to Analyze</h3>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6">Add your video data and Channel DNA to get failure postmortems.</p>
          <Link href="/upload-data" className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm">Upload Data</Link>
        </div>
      </div>
    );
  }

  const postmortems = analyzeAllPostmortems(videos, channelDNA);
  const avgViews = Math.round(videos.reduce((s, v) => s + v.views, 0) / videos.length);

  if (!postmortems.length) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">Video Postmortems</h1>
          <p className="text-[var(--color-text-muted)]">Diagnose why videos underperformed and get actionable fixes</p>
        </div>
        <div className="bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 rounded-[10px] p-4 text-sm text-[var(--color-green)] flex items-start gap-3">
          <span>🎉</span>
          <span>No significantly underperforming videos detected. All your content is performing at or above average!</span>
        </div>
      </div>
    );
  }

  // Count diagnosis types
  const typeCounts: Record<string, number> = {};
  postmortems.forEach((pm) => pm.diagnoses.forEach((d) => { typeCounts[d.type] = (typeCounts[d.type] || 0) + 1; }));
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const hasPersonalTrap = postmortems.some((pm) => pm.diagnoses.some((d) => d.type === FailureType.TOO_BROAD || d.type === FailureType.BAD_TIMING));
  const hasPackaging = postmortems.some((pm) => pm.diagnoses.some((d) => d.type === FailureType.TITLE_THUMB_MISMATCH || d.type === FailureType.POOR_PACKAGING));
  const hasAudience = postmortems.some((pm) => pm.diagnoses.some((d) => d.type === FailureType.WRONG_AUDIENCE));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Video Postmortems</h1>
        <p className="text-[var(--color-text-muted)]">Diagnose why videos underperformed and get actionable fixes</p>
      </div>

      <div className="bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 rounded-[10px] p-4 mb-6 text-sm text-[var(--color-orange)] flex items-start gap-3">
        <span>📊</span>
        <span>Found {postmortems.length} underperforming video{postmortems.length > 1 ? 's' : ''} (below 60% of your {avgViews.toLocaleString()} average views).</span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8 stagger">
        {topTypes.map(([type, count]) => (
          <StatCard key={type} icon="⚠" value={String(count)} label={type} bgColor="bg-[var(--color-red)]/10" />
        ))}
      </div>

      {/* Postmortem Cards */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Detailed Postmortems</h3>
        {postmortems.map((pm, i) => <PostmortemCard key={i} pm={pm} />)}
      </div>

      {/* Pattern Analysis */}
      <div className="bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-pink)]/5 border border-[var(--color-primary)]/15 rounded-[14px] p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">🔍 What the failures tell us</h4>
        {hasPersonalTrap && (
          <PatternItem color="var(--color-red)" text="Personal Content Trap: Multiple videos failed because they're creator-focused rather than topic-focused. At your subscriber count, every video needs to answer a question or solve a problem." />
        )}
        {hasPackaging && (
          <PatternItem color="var(--color-orange)" text="Packaging Gap: Some videos have decent content but poor titles/thumbnails. Your best-performing videos use curiosity hooks and specific numbers — apply that pattern consistently." />
        )}
        {hasAudience && (
          <PatternItem color="var(--color-blue)" text="Audience Confusion: Off-niche content is confusing the algorithm about who your audience is. Stick to your core pillars for the next 10 uploads." />
        )}
        <PatternItem color="var(--color-primary-light)" text="Key takeaway: The gap between your best and worst videos isn't content quality — it's topic selection and packaging. Focus on proven topics with curiosity-driven titles." icon="→" />
      </div>
    </div>
  );
}

function PatternItem({ color, text, icon = '!' }: { color: string; text: string; icon?: string }) {
  return (
    <div className="flex gap-3 py-3 border-b border-[var(--color-border)] last:border-0">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: text.replace(/^([^:]+:)/, '<strong class="text-[var(--color-text)]">$1</strong>') }} />
    </div>
  );
}
