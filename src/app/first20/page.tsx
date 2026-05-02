'use client';

import Link from 'next/link';
import { useStore } from '@/store/provider';
import { generateFirst20 } from '@/engine/first20';
import { Badge } from '@/components/ui/badge';
import { VideoCategory } from '@/types';

const categoryBadge: Record<string, 'green' | 'blue' | 'orange' | 'pink' | 'purple'> = {
  [VideoCategory.EVERGREEN]: 'green',
  [VideoCategory.AUTHORITY]: 'blue',
  [VideoCategory.BREAKOUT]: 'orange',
  [VideoCategory.CONVERSION]: 'pink',
  [VideoCategory.TRENDING]: 'purple',
};

export default function First20Page() {
  const { channelDNA } = useStore();

  if (!channelDNA) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <div className="text-5xl mb-4 opacity-30">🗺️</div>
          <h3 className="font-semibold text-[var(--color-text-secondary)] mb-2">Channel DNA Required</h3>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6">Set up your Channel DNA first to generate your First 20 Videos roadmap.</p>
          <Link href="/channel-dna" className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm">Build Channel DNA</Link>
        </div>
      </div>
    );
  }

  const phases = generateFirst20(channelDNA);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">First 20 Videos Planner</h1>
        <p className="text-[var(--color-text-muted)]">A sequenced roadmap designed for your niche, audience, and goals</p>
      </div>

      <div className="bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/20 rounded-[10px] p-4 mb-6 text-sm text-[var(--color-blue)] flex items-start gap-3">
        <span>🗺️</span>
        <span>This roadmap is sequenced intentionally. Each video builds on the previous ones. The order matters.</span>
      </div>

      {/* Progress Bar */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-semibold">Roadmap Progress</span>
          <span className="text-sm text-[var(--color-text-muted)]">20 videos planned</span>
        </div>
        <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
          {phases.map((p) => (
            <div key={p.name} className="opacity-70" style={{ flex: p.videos.length, background: p.color }} />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {phases.map((p) => (
            <span key={p.name} className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Phases */}
      {phases.map((phase, pi) => (
        <div key={phase.name} className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold"
              style={{ background: `${phase.color}20`, color: phase.color }}
            >
              {pi + 1}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {phase.name}{' '}
                <span className="font-normal text-sm text-[var(--color-text-muted)]">— Videos {phase.videoRange}</span>
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{phase.description}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
            {phase.videos.map((video) => (
              <div key={video.number} className="relative mb-6">
                <div
                  className="absolute -left-8 top-1 w-4 h-4 rounded-full border-[3px] bg-[var(--color-bg)]"
                  style={{ borderColor: phase.color }}
                />
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[10px] p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-bold mb-1" style={{ color: phase.color }}>
                        VIDEO #{video.number}
                      </div>
                      <div className="font-bold">{video.idea}</div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <Badge variant={categoryBadge[video.category] || 'purple'}>{video.category}</Badge>
                      <Badge variant="purple">{video.format}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    <strong>Purpose:</strong> {video.purpose}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[var(--color-bg-input)] rounded-[10px] p-3">
                      <div className="text-xs font-semibold text-[var(--color-blue)] uppercase tracking-wide mb-1">🎨 Packaging Angle</div>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{video.packagingAngle}</p>
                    </div>
                    <div className="bg-[var(--color-bg-input)] rounded-[10px] p-3">
                      <div className="text-xs font-semibold text-[var(--color-green)] uppercase tracking-wide mb-1">📍 Why This Order</div>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{video.orderReason}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
