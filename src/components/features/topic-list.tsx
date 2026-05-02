import { TopicPerformance } from '@/types';

export function TopicList({ topics, title }: { topics: TopicPerformance[]; title: string }) {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6">
      <h4 className="font-semibold mb-4">{title}</h4>
      {topics.map((t) => {
        const color =
          t.avgViews > 4000
            ? 'var(--color-green)'
            : t.avgViews > 2000
              ? 'var(--color-orange)'
              : 'var(--color-red)';
        return (
          <div
            key={t.name}
            className="flex items-center gap-4 py-3 border-b border-[var(--color-border)] last:border-0"
          >
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            <div className="flex-1">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {t.videos.length} video{t.videos.length > 1 ? 's' : ''}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold" style={{ color }}>
                {Math.round(t.avgViews).toLocaleString()}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">avg views</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
