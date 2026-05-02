export function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const color =
    score >= 70
      ? 'var(--color-green)'
      : score >= 50
        ? 'var(--color-orange)'
        : 'var(--color-red)';

  return (
    <div
      className="rounded-full flex items-center justify-center relative"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${score * 3.6}deg, var(--color-bg-input) 0deg)`,
      }}
    >
      <div
        className="absolute rounded-full bg-[var(--color-bg-card)]"
        style={{ inset: 3 }}
      />
      <span
        className="relative z-10 text-sm font-extrabold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}
