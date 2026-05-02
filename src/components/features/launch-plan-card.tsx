import { LaunchPlan } from '@/types';
import { Badge } from '@/components/ui/badge';

export function LaunchPlanCard({ plan, index }: { plan: LaunchPlan; index: number }) {
  return (
    <div
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 mb-6 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs font-semibold text-[var(--color-primary-light)]">
            LAUNCH PLAN #{index + 1}
          </div>
          <h3 className="text-lg font-bold mt-1">{plan.videoTitle}</h3>
        </div>
        <div className="flex gap-2">
          {plan.shortsTeaser && <Badge variant="pink">Shorts Teaser</Badge>}
          {plan.partOfSeries && <Badge variant="teal">Series Candidate</Badge>}
        </div>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Field label="🕐 Best Publish Time" value={plan.bestTiming} />
        <Field label="📝 Title Approach" value={plan.titleApproach} />
        <Field label="🎨 Thumbnail Concept" value={plan.thumbnailConcept} />
        <Field label="🎬 Hook (First 30s)" value={plan.hookFirst30s} pre />
        {plan.shortsTeaser && <Field label="📱 Shorts Teaser" value={plan.shortsTeaserIdea} />}
        <Field label="🔄 Sequel Opportunity" value={plan.sequelOpportunity} />
      </div>

      {/* Checklist */}
      <div className="border-t border-[var(--color-border)] pt-4 mt-4">
        <h4 className="font-semibold mb-3">📋 48-Hour Watch Checklist</h4>
        {plan.watchChecklist48h.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 text-sm text-[var(--color-text-secondary)]">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, pre }: { label: string; value: string; pre?: boolean }) {
  return (
    <div className="bg-[var(--color-bg-input)] rounded-[10px] p-4">
      <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className={`text-sm text-[var(--color-text)] leading-relaxed ${pre ? 'whitespace-pre-line' : ''}`}>
        {value}
      </div>
    </div>
  );
}
