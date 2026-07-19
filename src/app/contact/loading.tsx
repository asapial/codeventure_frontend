import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12" aria-busy="true">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="mt-3 h-5 w-1/3" />
      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
