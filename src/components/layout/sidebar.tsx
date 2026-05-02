'use client';

import { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close drawer on escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--color-sidebar)] border-b border-[var(--color-border)] flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-[10px] hover:bg-[var(--color-primary)]/10 transition-colors"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-xs text-white">
            ▶
          </div>
          <span className="text-base font-extrabold tracking-tight">
            First<span className="text-[var(--color-primary-light)]">1K</span>
          </span>
        </div>
        {/* Mobile sample data toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs">
          <div className="relative">
            <input
              type="checkbox"
              checked={useSampleData}
              onChange={(e) => toggleSampleData(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-[18px] bg-[var(--color-bg-card)] rounded-full peer-checked:bg-[var(--color-primary)] transition-colors" />
            <div className="absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-[var(--color-text-muted)] rounded-full peer-checked:translate-x-3.5 peer-checked:bg-white transition-all" />
          </div>
          <span className="text-[var(--color-text-secondary)]">Sample</span>
        </label>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-[var(--color-sidebar)] border-r border-[var(--color-border)] flex flex-col h-screen overflow-hidden z-50 transition-transform duration-300',
          // Desktop: always visible, static
          'lg:relative lg:translate-x-0 lg:w-[260px] lg:min-w-[260px]',
          // Mobile: fixed drawer
          'fixed top-0 left-0 w-[280px]',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
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
          {/* Close button — mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-primary)]/10 text-[var(--color-text-muted)] transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
    </>
  );
}
