'use client';

import { useState } from 'react';
import { useStore } from '@/store/provider';
import { ChannelDNA, ExperienceLevel, ContentType, ToneStyle, ContentFormat } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function ChannelDnaPage() {
  const { channelDNA, setChannelDNA } = useStore();
  const [editing, setEditing] = useState(!channelDNA);

  if (editing || !channelDNA) {
    return <DnaForm initial={channelDNA} onSave={(d) => { setChannelDNA(d); setEditing(false); }} onCancel={channelDNA ? () => setEditing(false) : undefined} />;
  }

  return <DnaProfile dna={channelDNA} onEdit={() => setEditing(true)} />;
}

function DnaProfile({ dna, onEdit }: { dna: ChannelDNA; onEdit: () => void }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Channel DNA</h1>
        <p className="text-[var(--color-text-muted)]">
          Your persistent channel identity — all recommendations are built on this profile
        </p>
      </div>

      {/* Profile Card */}
      <Card className="!rounded-[20px] !p-6 sm:!p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-[14px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-pink)] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white shrink-0">
            {dna.channelName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold truncate">{dna.channelName}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-muted)] mt-1">
              <span>📺 {dna.niche}</span>
              <span>🎯 {dna.experienceLevel}</span>
              <span>📅 {dna.uploadFrequency}</span>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="self-start sm:self-center shrink-0 px-5 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-[10px] text-sm font-semibold hover:border-[var(--color-primary)] transition-all"
          >
            Edit DNA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DnaField label="Target Audience" value={dna.targetAudience} />
          <DnaField label="Tone & Style" value={dna.toneStyle} />
          <DnaField
            label="Format Focus"
            value={dna.formatFocus === 'both' ? 'Shorts + Long-form' : dna.formatFocus === 'shorts' ? 'Shorts' : 'Long-form'}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <h4 className="font-semibold mb-4">🎯 Content Goals</h4>
          <ul className="space-y-0">
            {dna.contentGoals.map((g, i) => (
              <li key={i} className="flex items-center gap-2 py-2 border-b border-[var(--color-border)] last:border-0 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-green)]">✓</span> {g}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 className="font-semibold mb-4">💪 Strengths</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {dna.strengths.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-md text-xs text-[var(--color-text-secondary)]">{s}</span>
            ))}
          </div>
          {dna.constraints.length > 0 && (
            <>
              <div className="text-sm font-semibold text-[var(--color-text-muted)] mb-2">Constraints</div>
              <div className="flex flex-wrap gap-2">
                {dna.constraints.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--color-bg-input)] border border-[var(--color-red)]/30 rounded-md text-xs text-[var(--color-red)]">{c}</span>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold mb-4">🎬 Content Types</h4>
          <div className="flex flex-wrap gap-2">
            {dna.contentTypes.map((t, i) => <Badge key={i} variant="purple">{t}</Badge>)}
          </div>
        </Card>
        <Card>
          <h4 className="font-semibold mb-4">📐 Preferred Formats</h4>
          <div className="flex flex-wrap gap-2">
            {dna.preferredFormats.map((f, i) => <Badge key={i} variant="blue">{f}</Badge>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DnaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-[var(--color-bg-input)] rounded-[10px]">
      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">{label}</div>
      <div className="text-sm font-medium">{value || '—'}</div>
    </div>
  );
}

// ===== FORM =====

function DnaForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: ChannelDNA | null;
  onSave: (dna: ChannelDNA) => void;
  onCancel?: () => void;
}) {
  const d = initial;
  const [contentTypes, setContentTypes] = useState<string[]>(d?.contentTypes || []);
  const [formats, setFormats] = useState<string[]>(d?.preferredFormats || []);
  const [formatFocus, setFormatFocus] = useState<string>(d?.formatFocus || 'both');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dna: ChannelDNA = {
      channelName: fd.get('channelName') as string,
      niche: fd.get('niche') as string,
      targetAudience: fd.get('targetAudience') as string,
      experienceLevel: fd.get('experienceLevel') as string,
      contentGoals: (fd.get('contentGoals') as string).split('\n').filter((l) => l.trim()),
      contentTypes,
      toneStyle: fd.get('toneStyle') as string,
      preferredFormats: formats,
      strengths: (fd.get('strengths') as string).split('\n').filter((l) => l.trim()),
      constraints: (fd.get('constraints') as string).split('\n').filter((l) => l.trim()),
      uploadFrequency: fd.get('uploadFrequency') as string,
      formatFocus: formatFocus as ChannelDNA['formatFocus'],
    };
    onSave(dna);
  }

  function toggleChip(value: string, list: string[], setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">{d ? 'Edit' : 'Build'} Your Channel DNA</h1>
        <p className="text-[var(--color-text-muted)]">
          This profile powers every recommendation in First1K. Be specific.
        </p>
      </div>

      <div className="bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/20 rounded-[10px] p-4 mb-6 text-sm text-[var(--color-blue)] flex items-start gap-3">
        <span>💡</span>
        <span>Your Channel DNA is the foundation of all recommendations. Take a few minutes to fill this out thoughtfully.</span>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h3 className="font-bold text-lg mb-4">Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FormField name="channelName" label="Channel Name" defaultValue={d?.channelName} placeholder="e.g., TechCraft with Alex" />
            <FormField name="niche" label="Niche" defaultValue={d?.niche} placeholder="e.g., Tech Reviews & PC Building" />
          </div>
          <FormField name="targetAudience" label="Target Audience" defaultValue={d?.targetAudience} placeholder="Describe your ideal viewer" textarea />
          <FormSelect name="experienceLevel" label="Experience Level" options={Object.values(ExperienceLevel)} defaultValue={d?.experienceLevel} />
        </Card>

        <Card className="mb-6">
          <h3 className="font-bold text-lg mb-4">Content Identity</h3>
          <div className="mb-4">
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">Content Types</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(ContentType).map((ct) => (
                <button key={ct} type="button" onClick={() => toggleChip(ct, contentTypes, setContentTypes)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${contentTypes.includes(ct) ? 'bg-[var(--color-primary)]/14 border-[var(--color-primary)] text-[var(--color-primary-light)]' : 'bg-[var(--color-bg-input)] border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'}`}>
                  {ct}
                </button>
              ))}
            </div>
          </div>
          <FormSelect name="toneStyle" label="Tone & Style" options={Object.values(ToneStyle)} defaultValue={d?.toneStyle} />
          <div className="mb-4">
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">Preferred Formats</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(ContentFormat).map((f) => (
                <button key={f} type="button" onClick={() => toggleChip(f, formats, setFormats)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${formats.includes(f) ? 'bg-[var(--color-primary)]/14 border-[var(--color-primary)] text-[var(--color-primary-light)]' : 'bg-[var(--color-bg-input)] border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">Format Focus</label>
            <div className="flex gap-2">
              {['shorts', 'longform', 'both'].map((v) => (
                <button key={v} type="button" onClick={() => setFormatFocus(v)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${formatFocus === v ? 'bg-[var(--color-primary)]/14 border-[var(--color-primary)] text-[var(--color-primary-light)]' : 'bg-[var(--color-bg-input)] border-[var(--color-border-light)] text-[var(--color-text-secondary)]'}`}>
                  {v === 'shorts' ? 'Shorts Only' : v === 'longform' ? 'Long-form Only' : 'Both'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="font-bold text-lg mb-4">Goals & Constraints</h3>
          <FormField name="contentGoals" label="Content Goals (one per line)" defaultValue={d?.contentGoals?.join('\n')} placeholder="e.g., Reach 1,000 subscribers in 6 months" textarea />
          <FormField name="strengths" label="Your Strengths (one per line)" defaultValue={d?.strengths?.join('\n')} placeholder="e.g., Deep technical knowledge" textarea />
          <FormField name="constraints" label="Your Constraints (one per line)" defaultValue={d?.constraints?.join('\n')} placeholder="e.g., Limited budget" textarea />
          <FormSelect name="uploadFrequency" label="Upload Frequency" options={['1 video per week', '1-2 videos per week', '2-3 videos per week', '3+ videos per week', 'Irregular']} defaultValue={d?.uploadFrequency} />
        </Card>

        <div className="flex gap-3">
          <button type="submit" className="px-7 py-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[10px] font-semibold shadow-[0_2px_8px_rgba(229,57,53,0.3)] hover:-translate-y-0.5 transition-all">
            Save Channel DNA
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-7 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors font-semibold">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function FormField({ name, label, defaultValue, placeholder, textarea }: { name: string; label: string; defaultValue?: string; placeholder?: string; textarea?: boolean }) {
  const cls = "w-full bg-[var(--color-bg-input)] border border-[var(--color-border-light)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(229,57,53,0.08)] transition-all";
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">{label}</label>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} placeholder={placeholder} rows={3} className={cls + ' resize-y min-h-[80px]'} />
      ) : (
        <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

function FormSelect({ name, label, options, defaultValue }: { name: string; label: string; options: string[]; defaultValue?: string }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 block">{label}</label>
      <select name={name} defaultValue={defaultValue} className="w-full bg-[var(--color-bg-input)] border border-[var(--color-border-light)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] transition-all appearance-none">
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
