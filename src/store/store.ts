'use client';

import { ChannelDNA, VideoEntry } from '@/types';
import { SAMPLE_CHANNEL_DNA } from '@/data/sample-creator';
import { SAMPLE_VIDEOS } from '@/data/sample-videos';

// We'll use a simple React state approach instead of zustand since we don't want extra deps.
// Actually let's just use React context. But first let me check — we already have the data.
// Let's use a simple context-based store.

export interface AppState {
  channelDNA: ChannelDNA | null;
  videos: VideoEntry[];
  useSampleData: boolean;
}

export const DEFAULT_STATE: AppState = {
  channelDNA: SAMPLE_CHANNEL_DNA,
  videos: SAMPLE_VIDEOS,
  useSampleData: true,
};

export function getInitialState(): AppState {
  if (typeof window === 'undefined') return DEFAULT_STATE;

  try {
    const saved = localStorage.getItem('first1k_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.useSampleData === false) {
        const userDNA = localStorage.getItem('first1k_user_dna');
        const userVideos = localStorage.getItem('first1k_user_videos');
        return {
          useSampleData: false,
          channelDNA: userDNA ? JSON.parse(userDNA) : null,
          videos: userVideos ? JSON.parse(userVideos) : [],
        };
      }
    }
  } catch {
    // ignore
  }

  return DEFAULT_STATE;
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      'first1k_state',
      JSON.stringify({ useSampleData: state.useSampleData })
    );
    if (!state.useSampleData) {
      if (state.channelDNA) {
        localStorage.setItem('first1k_user_dna', JSON.stringify(state.channelDNA));
      }
      if (state.videos.length) {
        localStorage.setItem('first1k_user_videos', JSON.stringify(state.videos));
      }
    }
  } catch {
    // ignore
  }
}
