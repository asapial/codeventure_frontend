import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomeNotFound() {
  return (
    <div className="hero-grid relative isolate flex min-h-[65svh] items-center overflow-hidden border-b">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-50 via-background to-cyan-50/40 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/10" />
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20"><Compass className="size-6" aria-hidden="true" /></div>
        <p className="mt-6 font-mono text-sm font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400">404 / OFF COURSE</p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-6xl">This page took a different route.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">The link may be outdated, or the page may have moved. Let’s get you back to familiar ground.</p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full")}><ArrowLeft aria-hidden="true" /> Back to home</Link>
      </div>
    </div>
  );
}
