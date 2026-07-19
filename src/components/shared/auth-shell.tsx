import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Code2, ShieldCheck, Sparkles } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  after?: ReactNode;
}

const benefits = ["Secure client workspace", "One place for every project", "Clear progress and communication"];

export function AuthShell({ eyebrow, title, description, children, after }: AuthShellProps) {
  return (
    <div className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_10%,rgba(37,99,235,.12),transparent_35%)]" />
      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-slate-950 px-10 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-14">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-600/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-sm font-bold"><span className="grid size-9 place-items-center rounded-xl bg-blue-600"><Code2 className="size-5" aria-hidden="true" /></span><span>Code<span className="text-blue-400">Venture</span></span></span>
          </div>
          <div className="relative max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300"><Sparkles className="size-3.5" aria-hidden="true" /> Built for productive partnerships</div>
            <p className="mt-7 text-balance text-4xl font-bold leading-tight tracking-[-0.04em]">Your work. Your team. One clear view.</p>
            <p className="mt-5 leading-7 text-slate-400">Stay close to progress, decisions, deliverables, and the people moving your product forward.</p>
            <ul className="mt-9 space-y-4">
              {benefits.map((benefit) => <li key={benefit} className="flex items-center gap-3 text-sm text-slate-300"><span className="grid size-6 place-items-center rounded-full bg-blue-500/15 text-blue-300"><Check className="size-3.5" strokeWidth={3} aria-hidden="true" /></span>{benefit}</li>)}
            </ul>
          </div>
          <div className="relative flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="size-4" aria-hidden="true" /> Private, secure, and built with care</div>
        </aside>

        <section className="flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            <div className="mt-8 rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_24px_70px_-36px_rgba(30,64,175,.45)] dark:border-blue-950 sm:p-7">{children}</div>
            {after ? <div className="mt-6 text-center text-sm text-muted-foreground">{after}</div> : null}
            <div className="mt-8 text-center"><Link href="/" className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-muted-foreground transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeft className="size-3.5" aria-hidden="true" /> Back to CodeVenture</Link></div>
          </div>
        </section>
      </div>
    </div>
  );
}
