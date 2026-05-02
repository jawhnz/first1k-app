'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ChannelDNA, VideoEntry } from '@/types';
import { SAMPLE_CHANNEL_DNA } from '@/data/sample-creator';
import { SAMPLE_VIDEOS } from '@/data/sample-videos';
import { AppState, DEFAULT_STATE, getInitialState, saveState } from './store';

interface StoreContextValue extends AppState {
  setChannelDNA: (dna: ChannelDNA) => void;
  addVideo: (video: Omit<VideoEntry, 'id'>) => void;
  setVideos: (videos: VideoEntry[]) => void;
  toggleSampleData: (enabled: boolean) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setState(getInitialState());
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const setChannelDNA = useCallback((dna: ChannelDNA) => {
    setState((s) => ({ ...s, channelDNA: dna }));
  }, []);

  const addVideo = useCallback((video: Omit<VideoEntry, 'id'>) => {
    const entry: VideoEntry = { ...video, id: 'v' + Date.now() };
    setState((s) => ({ ...s, videos: [...s.videos, entry] }));
  }, []);

  const setVideos = useCallback((videos: VideoEntry[]) => {
    setState((s) => ({ ...s, videos }));
  }, []);

  const toggleSampleData = useCallback((enabled: boolean) => {
    if (enabled) {
      setState((s) => ({
        ...s,
        useSampleData: true,
        channelDNA: SAMPLE_CHANNEL_DNA,
        videos: SAMPLE_VIDEOS,
      }));
    } else {
      // Load user data if available
      let userDNA: ChannelDNA | null = null;
      let userVideos: VideoEntry[] = [];
      try {
        const d = localStorage.getItem('first1k_user_dna');
        const v = localStorage.getItem('first1k_user_videos');
        if (d) userDNA = JSON.parse(d);
        if (v) userVideos = JSON.parse(v);
      } catch {
        // ignore
      }
      setState((s) => ({
        ...s,
        useSampleData: false,
        channelDNA: userDNA,
        videos: userVideos,
      }));
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{ ...state, setChannelDNA, addVideo, setVideos, toggleSampleData }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
