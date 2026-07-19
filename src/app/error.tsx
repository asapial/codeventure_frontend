"use client";
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Route error:", error); }, [error]);
  return (
    <div className="flex min-h-[60svh] items-center px-4 py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-card p-8 text-center shadow-xl shadow-red-950/5 dark:border-red-950 sm:p-10">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"><AlertTriangle className="size-5" aria-hidden="true" /></div>
        <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em]">Something interrupted the flow</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">We couldn’t load this page. Your information is safe, and you can try again.</p>
        {error.digest ? <p className="mt-3 font-mono text-[10px] text-muted-foreground">Reference: {error.digest}</p> : null}
        <Button type="button" className="mt-7" onClick={reset}><RotateCcw aria-hidden="true" /> Try again</Button>
      </div>
    </div>
  );
}
