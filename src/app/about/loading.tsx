import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div
      className="container mx-auto max-w-4xl px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="mt-3 h-5 w-1/2" />
      <Skeleton className="mt-12 h-24 w-full" />
      <Skeleton className="mt-6 h-64 w-full" />
    </div>
  );
}