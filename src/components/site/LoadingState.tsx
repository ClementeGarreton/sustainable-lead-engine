export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-shimmer rounded-2xl border border-border bg-card/60" />
      ))}
    </div>
  );
}
