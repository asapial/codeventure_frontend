import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="mt-3 h-5 w-1/2" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full" />
        ))}
      </div>
    </div>
  );
}
