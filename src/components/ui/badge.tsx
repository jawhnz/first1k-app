import { clsx } from 'clsx';

const variants = {
  purple: 'bg-[var(--color-primary)]/10 text-[var(--color-primary-light)]',
  green: 'bg-[var(--color-green)]/10 text-[var(--color-green)]',
  red: 'bg-[var(--color-red)]/10 text-[var(--color-red)]',
  orange: 'bg-[var(--color-orange)]/10 text-[var(--color-orange)]',
  blue: 'bg-[var(--color-blue)]/10 text-[var(--color-blue)]',
  pink: 'bg-[var(--color-pink)]/10 text-[var(--color-pink)]',
  teal: 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]',
} as const;

export function Badge({
  children,
  variant = 'purple',
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
