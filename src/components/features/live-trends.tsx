'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChannelDNA, ContentPillar } from '@/types';

interface LiveTrend {
  trend: string;
  impact: string;
  recommendation: string;
  source?: string;
  date?: string;
}

export function LiveTrends({
  channelDNA,
  pillars,
}: {
  channelDNA: ChannelDNA;
  pillars: ContentPillar[];
}) {
  const [trends, setTrends] = useState<LiveTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  async function fetchTrends() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: channelDNA.niche,
          pillars: pillars.map((p) => p.name),
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch trends');

      const data = await res.json();
      setTrends(data.trends || []);
      setFetched(true);
    } catch (e) {
      setError('Could not fetch live trends. The analysis below is based on your channel data.');
      setFetched(true);
    } finally {
      setLoading(false);
    }
  }

  // Auto-fetch on mount
  useEffect(() => {
    if (!fetched && channelDNA.niche) {
      fetchTrends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelDNA.niche]);

  if (!fetched && !loading) {
    return (
      <div className="text-center py-8">
        <button
          onClick={fetchTrends}
          className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm shadow-[0_2px_8px_rgba(229,57,53,0.3)] hover:-translate-y-0.5 transition-all"
        >
          🔍 Search for Live Trends in {channelDNA.niche}
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 animate-pulse"
          >
            <div className="h-4 bg-[var(--color-bg-input)] rounded w-3/4 mb-3" />
            <div className="h-3 bg-[var(--color-bg-input)] rounded w-1/2 mb-4" />
            <div className="h-px bg-[var(--color-border)] mb-3" />
            <div className="h-3 bg-[var(--color-bg-input)] rounded w-full mb-2" />
            <div className="h-3 bg-[var(--color-bg-input)] rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error || trends.length === 0) {
    return (
      <div className="bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 rounded-[10px] p-4 text-sm text-[var(--color-orange)] flex items-start gap-3">
        <span>⚠️</span>
        <div>
          <span>{error || 'No live trends found for your niche right now.'}</span>
          <button
            onClick={fetchTrends}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 stagger">
        {trends.map((t, i) => (
          <Card key={i}>
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base mt-0.5">🌐</span>
              <div className="text-sm font-semibold leading-snug">{t.trend}</div>
            </div>
            <div className="text-xs text-[var(--color-orange)] mb-3">{t.impact}</div>
            <div className="text-sm text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
              <strong className="text-[var(--color-green)]">→</strong> {t.recommendation}
            </div>
            {t.source && (
              <a
                href={t.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors truncate max-w-full"
              >
                Source ↗
              </a>
            )}
          </Card>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={fetchTrends}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
        >
          🔄 Refresh trends
        </button>
        <span className="text-xs text-[var(--color-text-muted)]">
          Searched for: &quot;{channelDNA.niche}&quot;
        </span>
      </div>
    </div>
  );
}
