import type { AuthVariant } from "@/components/shared/auth-shell";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthSkeletonProps {
  variant: AuthVariant;
  fieldCount?: number;
}

export function AuthSkeleton({ variant, fieldCount = 2 }: AuthSkeletonProps) {
  const heading = variant === "sign-in" ? "Welcome back" : "Create your workspace";
  const eyebrow = variant === "sign-in" ? "Client portal" : "Get started";

  return (
    <div
      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,.18),transparent_45%)]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_90%_110%,rgba(99,102,241,.15),transparent_40%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-6xl lg:grid-cols-[0.95fr_1.05fr]">
        {/* Side panel echo */}
        <aside className="relative hidden overflow-hidden bg-slate-950 px-8 py-10 text-white lg:block xl:px-10 xl:py-12">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-[26rem] rounded-full bg-indigo-500/25 blur-3xl" />
          <Skeleton className="relative size-9 rounded-xl bg-white/10" />
          <div className="relative mt-12 max-w-md space-y-4">
            <Skeleton className="h-5 w-44 rounded-full bg-white/10" />
            <Skeleton className="h-9 w-72 rounded-md bg-white/10" />
            <Skeleton className="h-9 w-60 rounded-md bg-white/10" />
            <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
          </div>
        </aside>

        {/* Form panel echo */}
        <section className="flex min-w-0 items-center justify-center px-4 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="w-full max-w-md">
            <header className="mb-7 text-center sm:text-left">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="mt-3 h-9 w-64 rounded-md" />
              <Skeleton className="mt-3 h-4 w-80 rounded-md" />
            </header>

            <div className="rounded-2xl border border-blue-100/80 bg-card p-6 shadow-[0_24px_70px_-36px_rgba(30,64,175,.45)] dark:border-blue-950 sm:p-8">
              <div className="sr-only">{`Loading ${heading} form`}</div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>
              <div className="my-5 flex items-center gap-3">
                <Skeleton className="h-px flex-1" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-px flex-1" />
              </div>
              {Array.from({ length: fieldCount }).map((_, i) => (
                <div key={i} className="space-y-2 pb-5 last:pb-0">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ))}
              <Skeleton className="mt-6 h-12 w-full rounded-xl" />
              <Skeleton className="mx-auto mt-4 h-3 w-48" />
            </div>

            <Skeleton className="mx-auto mt-8 h-3 w-40" />
          </div>
        </section>
      </div>

      <span className="sr-only">{`${eyebrow} – loading`}</span>
    </div>
  );
}
