import { ContentPillar } from '@/types';

const topColors = ['var(--color-primary)', 'var(--color-green)', 'var(--color-orange)'];

export function PillarCard({ pillar }: { pillar: ContentPillar }) {
  const color = topColors[(pillar.rank - 1) % topColors.length];

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
      <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
        Pillar {pillar.rank}
      </div>
      <h4 className="text-lg font-bold mb-2">{pillar.name}</h4>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {pillar.description}
      </p>
      <div className="flex gap-6">
        <div>
          <div className="text-xs text-[var(--color-text-muted)]">Avg Views</div>
          <div className="text-lg font-bold">{pillar.avgViews.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-[var(--color-text-muted)]">Avg CTR</div>
          <div className="text-lg font-bold">{pillar.avgCTR}%</div>
        </div>
        <div>
          <div className="text-xs text-[var(--color-text-muted)]">Videos</div>
          <div className="text-lg font-bold">{pillar.videoCount}</div>
        </div>
      </div>
    </div>
  );
}
