import { VideoIdea } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ScoreRing } from '@/components/ui/score-ring';

export function VideoIdeaCard({ idea, index }: { idea: VideoIdea; index: number }) {
  const s = idea.scores;
  return (
    <div
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 transition-all duration-250 hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(229,57,53,0.15)] animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-[var(--color-primary-light)]">
          IDEA #{index + 1}
        </span>
        <ScoreRing score={s.overall} />
      </div>
      <h4 className="font-bold mb-2">{idea.title}</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="purple">{idea.format || 'Long-form'}</Badge>
        <Badge variant="blue">
          {idea.targetAngle
            ? idea.targetAngle.length > 40
              ? idea.targetAngle.slice(0, 40) + '…'
              : idea.targetAngle
            : 'General'}
        </Badge>
      </div>
      {idea.titleDirection && (
        <p className="text-xs text-[var(--color-text-muted)] mb-2">
          <strong>Title direction:</strong> {idea.titleDirection}
        </p>
      )}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-3 border-t border-[var(--color-border)]">
        {idea.reason}
      </p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { v: s.audienceFit, l: 'Audience' },
          { v: s.breakoutPotential, l: 'Breakout' },
          { v: s.channelAlignment, l: 'Alignment' },
        ].map((d) => (
          <div key={d.l} className="text-center py-1">
            <div className="text-lg font-extrabold text-[var(--color-primary-light)]">{d.v}</div>
            <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">
              {d.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
