import { CheckCircle2, Gauge, MessagesSquare, UsersRound } from "lucide-react";
import { PageContainer } from "@/components/shared/layout/page-container";
import { ScrollReveal, Stagger } from "@/components/shared/motion";

const promises = [
  { icon: UsersRound, title: "Senior people, hands-on", text: "The people in the room are the people doing the work." },
  { icon: MessagesSquare, title: "Clarity every week", text: "You see working progress, open questions, and the next decision." },
  { icon: Gauge, title: "Built beyond launch", text: "Performance, security, and ownership are part of the build." },
];

export function StudioSection() {
  return (
    <section className="border-b bg-background">
      <PageContainer
        size="5xl"
        className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20"
      >
        <ScrollReveal direction="left" className="relative">
          <div className="absolute -inset-8 -z-10 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 p-7 shadow-[0_30px_90px_-45px_rgba(30,64,175,.45)] dark:border-blue-950 dark:from-blue-950/30 dark:via-slate-950 dark:to-cyan-950/20 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              The CodeVenture standard
            </p>
            <p className="mt-6 text-balance text-2xl font-bold leading-snug tracking-[-0.025em] sm:text-3xl">
              &ldquo;Great software is not just technically correct. It feels obvious, earns trust, and
              creates momentum.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-blue-100 pt-6 dark:border-blue-900/60">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">
                CV
              </span>
              <div>
                <p className="text-sm font-bold">CodeVenture team</p>
                <p className="text-xs text-muted-foreground">Your product partner</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal direction="right">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Why CodeVenture
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Small enough to care. Experienced enough to deliver.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
              We work like a focused product team, not a production line. That means fewer handoffs,
              stronger context, and a better product at the end.
            </p>
          </ScrollReveal>

          <Stagger className="mt-9 space-y-6" stagger={0.08}>
            {promises.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-900">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </Stagger>

          <ScrollReveal delay={0.15} className="mt-9 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="size-4" aria-hidden="true" /> Built for long-term partnership,
            not dependency
          </ScrollReveal>
        </div>
      </PageContainer>
    </section>
  );
}
