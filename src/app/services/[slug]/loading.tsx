import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailLoading() {
  return (
    <div
      className="container mx-auto max-w-4xl px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-6 h-12 w-3/4" />
      <Skeleton className="mt-3 h-6 w-1/2" />
      <Skeleton className="mt-10 h-32 w-full" />
      <Skeleton className="mt-6 h-64 w-full" />
    </div>
  );
}