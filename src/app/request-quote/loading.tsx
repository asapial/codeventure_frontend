import { Skeleton } from "@/components/ui/skeleton";

export default function RequestQuoteLoading() {
  return (
    <div
      className="container mx-auto max-w-3xl px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="mt-3 h-5 w-1/2" />
      <div className="mt-10 space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-11 w-40" />
      </div>
    </div>
  );
}