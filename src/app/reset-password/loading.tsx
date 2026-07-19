import { Skeleton } from "@/components/ui/skeleton";

export default function ResetPasswordLoading() {
  return (
    <div
      className="container mx-auto max-w-md px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="mx-auto h-8 w-56" />
      <Skeleton className="mx-auto mt-3 h-4 w-64" />
      <Skeleton className="mt-8 h-72 w-full" />
    </div>
  );
}