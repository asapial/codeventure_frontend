import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpLoading() {
  return (
    <div
      className="container mx-auto max-w-md px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="mx-auto h-8 w-48" />
      <Skeleton className="mx-auto mt-3 h-4 w-60" />
      <Skeleton className="mt-8 h-96 w-full" />
    </div>
  );
}