export function ProgressBar({
  value,
  max,
  color = 'var(--color-primary)',
  height = 6,
}: {
  value: number;
  max: number;
  color?: string;
  height?: number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div
      className="bg-[var(--color-bg-input)] rounded-full overflow-hidden"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export function MetricBar({
  label,
  value,
  max,
  color,
  suffix = '',
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {value}
          {suffix}
        </span>
      </div>
      <ProgressBar value={value} max={max} color={color} />
    </div>
  );
}
