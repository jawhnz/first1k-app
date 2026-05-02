'use client';

import { useState } from 'react';
import { Postmortem } from '@/types';
import { Badge } from '@/components/ui/badge';

export function PostmortemCard({ pm }: { pm: Postmortem }) {
  const [open, setOpen] = useState(false);
  const icon = pm.performanceTier === 'failed' ? '🔴' : pm.performanceTier === 'weak' ? '🟠' : '🟡';

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-[var(--color-bg-card-hover)] transition-colors"
      >
        <div className="w-12 h-12 rounded-[10px] bg-[var(--color-red)]/10 flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold mb-1 truncate">{pm.video.title}</div>
          <div className="text-sm text-[var(--color-red)] font-medium">{pm.primaryDiagnosis.type}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="red">{pm.video.views.toLocaleString()} views</Badge>
            <Badge variant="orange">{pm.viewsVsAverage}% of avg</Badge>
            <Badge variant="purple">{pm.primaryDiagnosis.confidence} confidence</Badge>
          </div>
        </div>
        <span
          className="text-[var(--color-text-muted)] transition-transform duration-200 mt-1"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[var(--color-border)] pt-4 animate-fade-in">
          {pm.diagnoses.map((d, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <h4 className="text-[var(--color-red)] font-semibold mb-3">{d.type}</h4>
              <FixBox label="📊 Evidence" color="var(--color-text-muted)" text={d.evidence} />
              <FixBox label="🎨 Packaging Fix" color="var(--color-green)" text={d.packagingFix} border />
              <FixBox label="📝 Content Fix" color="var(--color-blue)" text={d.contentFix} border />
              <FixBox label="💡 Better Follow-Up" color="var(--color-primary-light)" text={d.followUpIdea} border />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FixBox({
  label,
  color,
  text,
  border,
}: {
  label: string;
  color: string;
  text: string;
  border?: boolean;
}) {
  return (
    <div
      className="bg-[var(--color-bg-input)] rounded-[10px] p-4 mb-3"
      style={border ? { borderLeft: `3px solid ${color}` } : undefined}
    >
      <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>
        {label}
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
    </div>
  );
}
