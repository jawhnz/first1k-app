'use client';

import { useState } from 'react';
import { useStore } from '@/store/provider';
import { VideoEntry, ContentFormat, VideoCategory } from '@/types';
import { getVideoPerformanceTier, getPerformanceBadgeColor } from '@/data/sample-videos';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { clsx } from 'clsx';

type Tab = 'videos' | 'add' | 'csv';

export default function UploadDataPage() {
  const { videos, useSampleData, addVideo, setVideos, toggleSampleData } = useStore();
  const [tab, setTab] = useState<Tab>('videos');

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Upload Data</h1>
        <p className="text-[var(--color-text-muted)]">
          Add your video performance data — manually or via CSV upload
        </p>
      </div>

      {useSampleData && (
        <div className="bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/20 rounded-[10px] p-4 mb-6 text-sm text-[var(--color-blue)] flex items-start gap-3">
          <span>📊</span>
          <span>
            You&apos;re viewing sample data from &quot;TechCraft with Alex.&quot; Toggle off Sample
            Data in the sidebar to enter your own data.
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--color-bg-input)] p-1 rounded-[10px] mb-6 w-fit">
        {([
          ['videos', `Video Library (${videos.length})`],
          ['add', 'Add Video'],
          ['csv', 'CSV Upload'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={clsx(
              'px-5 py-2 rounded-md text-sm font-medium transition-all',
              tab === key
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'videos' && <VideoList videos={videos} />}
      {tab === 'add' && <AddVideoForm onAdd={(v) => { addVideo(v); setTab('videos'); }} />}
      {tab === 'csv' && (
        <CsvUpload
          onImport={(vids) => { setVideos(vids); setTab('videos'); }}
          onLoadSample={() => { toggleSampleData(true); setTab('videos'); }}
        />
      )}
    </div>
  );
}

function VideoList({ videos }: { videos: VideoEntry[] }) {
  if (!videos.length) {
    return (
      <div className="text-center py-16 text-[var(--color-text-muted)]">
        <div className="text-5xl mb-4 opacity-30">📹</div>
        <h3 className="text-[var(--color-text-secondary)] font-semibold mb-2">No Videos Yet</h3>
        <p className="max-w-md mx-auto">Add your first video manually or upload a CSV file.</p>
      </div>
    );
  }

  return (
    <Card className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Title', 'Topic', 'Format', 'Published', 'Views', 'CTR', 'Avg Duration', 'Performance'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide border-b border-[var(--color-border)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {videos.map((v) => {
            const tier = getVideoPerformanceTier(v);
            return (
              <tr key={v.id} className="hover:bg-[var(--color-bg-card-hover)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium max-w-[250px] truncate">{v.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{v.topic}</td>
                <td className="px-4 py-3"><Badge variant="purple">{v.format}</Badge></td>
                <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{v.publishDate}</td>
                <td className="px-4 py-3 text-sm font-semibold">{v.views.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{v.ctr}%</td>
                <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                  {Math.floor(v.avgViewDuration / 60)}:{(v.avgViewDuration % 60).toString().padStart(2, '0')}
                </td>
                <td className="px-4 py-3">
                  <span className={clsx('inline-flex px-2.5 py-1 rounded-md text-xs font-semibold', getPerformanceBadgeColor(tier))}>
                    {tier}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

function AddVideoForm({ onAdd }: { onAdd: (v: Omit<VideoEntry, 'id'>) => void }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const video: Omit<VideoEntry, 'id'> = {
      title: fd.get('title') as string,
      topic: fd.get('topic') as string,
      format: (fd.get('format') as string) || ContentFormat.LONG_FORM,
      publishDate: fd.get('publishDate') as string,
      impressions: Number(fd.get('impressions')) || 0,
      ctr: Number(fd.get('ctr')) || 0,
      avgViewDuration: Number(fd.get('avgViewDuration')) || 0,
      views: Number(fd.get('views')) || 0,
      likes: Number(fd.get('likes')) || 0,
      comments: Number(fd.get('comments')) || 0,
      retentionNotes: fd.get('retentionNotes') as string,
      aiSummary: fd.get('aiSummary') as string,
      category: (fd.get('category') as string) || VideoCategory.EVERGREEN,
    };
    if (!video.title) return alert('Please enter a video title');
    onAdd(video);
  }

  const inputCls = "w-full bg-[var(--color-bg-input)] border border-[var(--color-border-light)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] transition-all";

  return (
    <Card>
      <h3 className="font-bold text-lg mb-4">Add Video Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Title</label><input name="title" className={inputCls} placeholder="e.g., Budget Gaming PC Under $500" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Topic</label><input name="topic" className={inputCls} placeholder="e.g., PC Building" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Format</label><select name="format" className={inputCls + ' appearance-none'}>{Object.values(ContentFormat).map(f => <option key={f} value={f}>{f}</option>)}</select></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Publish Date</label><input name="publishDate" type="date" className={inputCls} /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Category</label><select name="category" className={inputCls + ' appearance-none'}>{Object.values(VideoCategory).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Impressions</label><input name="impressions" type="number" className={inputCls} placeholder="0" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">CTR (%)</label><input name="ctr" type="number" step="0.1" className={inputCls} placeholder="0.0" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Views</label><input name="views" type="number" className={inputCls} placeholder="0" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Avg Duration (sec)</label><input name="avgViewDuration" type="number" className={inputCls} placeholder="0" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Likes</label><input name="likes" type="number" className={inputCls} placeholder="0" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Comments</label><input name="comments" type="number" className={inputCls} placeholder="0" /></div>
        </div>
        <div className="mb-4"><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">Retention Notes</label><textarea name="retentionNotes" rows={2} className={inputCls + ' resize-y'} placeholder="Where do viewers drop off?" /></div>
        <div className="mb-4"><label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">AI Summary / Notes</label><textarea name="aiSummary" rows={2} className={inputCls + ' resize-y'} placeholder="Additional notes" /></div>
        <button type="submit" className="px-6 py-2.5 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold text-sm shadow-[0_2px_8px_rgba(108,92,231,0.3)] hover:-translate-y-0.5 transition-all">
          Add Video
        </button>
      </form>
    </Card>
  );
}

function CsvUpload({ onImport, onLoadSample }: { onImport: (v: VideoEntry[]) => void; onLoadSample: () => void }) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const csv = ev.target?.result as string;
        const lines = csv.split('\n').filter((l) => l.trim());
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        const videos: VideoEntry[] = [];
        for (let i = 1; i < lines.length; i++) {
          const vals = lines[i].split(',').map((v) => v.trim());
          const obj: Record<string, string | number> = {};
          headers.forEach((h, idx) => { obj[h] = vals[idx] || ''; });
          videos.push({
            id: 'v' + Date.now() + i,
            title: String(obj.title || ''),
            topic: String(obj.topic || ''),
            format: String(obj.format || ContentFormat.LONG_FORM),
            publishDate: String(obj.publishdate || obj.publishDate || ''),
            impressions: Number(obj.impressions) || 0,
            ctr: Number(obj.ctr) || 0,
            avgViewDuration: Number(obj.avgviewduration || obj.avgViewDuration) || 0,
            views: Number(obj.views) || 0,
            likes: Number(obj.likes) || 0,
            comments: Number(obj.comments) || 0,
            retentionNotes: String(obj.retentionnotes || obj.retentionNotes || ''),
            aiSummary: String(obj.aisummary || obj.aiSummary || ''),
            category: String(obj.category || VideoCategory.EVERGREEN),
          });
        }
        onImport(videos);
        alert(`Successfully imported ${videos.length} videos!`);
      } catch {
        alert('Error parsing CSV. Please check the format.');
      }
    };
    reader.readAsText(file);
  }

  return (
    <Card>
      <h3 className="font-bold text-lg mb-4">CSV Upload</h3>
      <p className="text-[var(--color-text-secondary)] mb-4">Upload a CSV file with your video metrics. Expected columns:</p>
      <div className="bg-[var(--color-bg-input)] rounded-[10px] p-4 mb-6 font-mono text-sm text-[var(--color-text-secondary)] overflow-x-auto">
        title, topic, format, publishDate, impressions, ctr, avgViewDuration, views, likes, comments, retentionNotes
      </div>
      <label className="block border-2 border-dashed border-[var(--color-border-light)] rounded-[14px] p-12 text-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all">
        <div className="text-5xl mb-4 opacity-40">📄</div>
        <h3 className="font-semibold text-[var(--color-text-secondary)]">Drop your CSV file here</h3>
        <p className="text-sm text-[var(--color-text-muted)]">or click to browse</p>
        <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
      </label>
      <div className="h-px bg-[var(--color-border)] my-6" />
      <h4 className="font-semibold mb-2">Or load sample data</h4>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">Don&apos;t have data yet? Load our sample dataset from a realistic early-stage tech channel.</p>
      <button onClick={onLoadSample} className="px-5 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-[10px] text-sm font-semibold hover:border-[var(--color-primary)] transition-all">
        Load Sample Dataset
      </button>
    </Card>
  );
}
