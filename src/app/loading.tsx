import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16" aria-busy="true" aria-live="polite">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="mt-4 h-6 w-1/2" />
      <div className="mt-8 flex gap-3">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-40" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    </div>
  );
}
