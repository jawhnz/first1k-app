import { GrowthBlocker } from '@/types';
import { Card } from '@/components/ui/card';

const severityColors: Record<string, string> = {
  high: 'var(--color-red)',
  medium: 'var(--color-orange)',
  low: 'var(--color-blue)',
};

export function BlockerCard({ blocker }: { blocker: GrowthBlocker }) {
  const color = severityColors[blocker.severity] || 'var(--color-orange)';

  return (
    <Card className="!border-l-[3px]" style={{ borderLeftColor: color } as React.CSSProperties}>
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg"
          style={{ background: `${color}20`, color }}
        >
          ⚠
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
            Biggest Growth Blocker
          </div>
          <div className="text-lg font-bold">{blocker.type}</div>
        </div>
      </div>
      <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">{blocker.description}</p>
      <div className="bg-[var(--color-bg-input)] rounded-[10px] p-4 mb-3">
        <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
          📊 Evidence
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{blocker.evidence}</p>
      </div>
      <div className="bg-[var(--color-bg-input)] rounded-[10px] p-4 border-l-[3px] border-[var(--color-green)]">
        <div className="text-xs font-semibold text-[var(--color-green)] uppercase tracking-wide mb-2">
          ✅ Recommended Fix
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{blocker.fix}</p>
      </div>
    </Card>
  );
}
