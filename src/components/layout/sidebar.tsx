'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useStore } from '@/store/provider';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: '📊' },
  { href: '/channel-dna', label: 'Channel DNA', icon: '🧬' },
  { href: '/upload-data', label: 'Upload Data', icon: '📤' },
  { href: '/blueprint', label: 'Breakout Blueprint', icon: '🎯', badge: 'Hero' },
  { href: '/first20', label: 'First 20 Videos', icon: '🗺️' },
  { href: '/postmortems', label: 'Postmortems', icon: '🔍' },
  { href: '/launch-planner', label: 'Launch Planner', icon: '🚀' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { useSampleData, toggleSampleData } = useStore();

  return (
    <aside className="w-[260px] min-w-[260px] bg-[var(--color-sidebar)] border-r border-[var(--color-border)] flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-[10px] flex items-center justify-center text-base text-white shadow-[0_0_20px_rgba(108,92,231,0.15)]">
            ▶
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            First<span className="text-[var(--color-primary-light)]">1K</span>
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[1.5px] mt-1 block">
          Strategy Engine
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 py-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-4 px-4 py-2.5 rounded-[10px] text-sm font-medium mb-0.5 transition-all duration-150 select-none',
                active
                  ? 'bg-[var(--color-primary)]/14 text-[var(--color-primary-light)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/8 hover:text-[var(--color-text)]'
              )}
            >
              <span className="text-lg w-5 text-center shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 px-6 border-t border-[var(--color-border)]">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <div className="relative">
            <input
              type="checkbox"
              checked={useSampleData}
              onChange={(e) => toggleSampleData(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[var(--color-bg-card)] rounded-full peer-checked:bg-[var(--color-primary)] transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-[var(--color-text-muted)] rounded-full peer-checked:translate-x-4 peer-checked:bg-white transition-all" />
          </div>
          <span className="text-[var(--color-text-secondary)]">Sample Data</span>
        </label>
        <div className="text-[10px] text-[var(--color-text-muted)] text-center mt-2">
          MVP v1.0
        </div>
      </div>
    </aside>
  );
}
