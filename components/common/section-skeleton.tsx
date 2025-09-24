export function SectionSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
      <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-muted/70" />
    </div>
  );
}
