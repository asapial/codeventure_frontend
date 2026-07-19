import { Skeleton } from "@/components/ui/skeleton";

export default function ForgotPasswordLoading() {
  return (
    <div
      className="container mx-auto max-w-md px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="mx-auto h-8 w-56" />
      <Skeleton className="mx-auto mt-3 h-4 w-64" />
      <Skeleton className="mt-8 h-44 w-full" />
    </div>
  );
}