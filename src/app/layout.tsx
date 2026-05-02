import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/store/provider';
import { Sidebar } from '@/components/layout/sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'First1K — AI Strategy Engine for Early-Stage YouTubers',
  description:
    'Decide what to make next, how to package it, when to publish it, and how each upload fits into a larger growth strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <StoreProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 scroll-smooth">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
