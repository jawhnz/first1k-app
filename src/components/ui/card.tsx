import { clsx } from 'clsx';

export function Card({
  children,
  className,
  hover = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={clsx(
        'bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[14px] p-6 transition-all duration-250',
        hover && 'hover:border-[var(--color-border-light)] hover:shadow-lg',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function StatCard({
  icon,
  value,
  label,
  change,
  positive,
  bgColor = 'bg-[var(--color-primary)]/10',
}: {
  icon: string;
  value: string;
  label: string;
  change?: string;
  positive?: boolean;
  bgColor?: string;
}) {
  return (
    <Card className="hover:-translate-y-0.5">
      <div className={clsx('w-11 h-11 rounded-[10px] flex items-center justify-center text-xl mb-4', bgColor)}>
        {icon}
      </div>
      <div className="text-2xl font-extrabold mb-1">{value}</div>
      <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
      {change && (
        <div
          className={clsx(
            'text-xs font-semibold mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md',
            positive
              ? 'text-[var(--color-green)] bg-[var(--color-green)]/10'
              : 'text-[var(--color-red)] bg-[var(--color-red)]/10'
          )}
        >
          {change}
        </div>
      )}
    </Card>
  );
}
