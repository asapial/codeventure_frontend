import { ArrowDownRight, Braces, Compass, Rocket, Shapes } from "lucide-react";
import { PageContainer } from "@/components/shared/layout/page-container";
import { ScrollReveal, Stagger } from "@/components/shared/motion";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Discover",
    description: "We align on the business problem, users, constraints, and the smallest valuable path forward.",
  },
  {
    number: "02",
    icon: Shapes,
    title: "Design",
    description: "We turn strategy into clear journeys and a polished interface you can see, test, and shape early.",
  },
  {
    number: "03",
    icon: Braces,
    title: "Build",
    description: "Senior engineers ship in visible increments with quality, performance, and maintainability built in.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Evolve",
    description: "After launch, we measure what matters and keep improving the product as your business grows.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden border-b bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.3),transparent_38%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <PageContainer size="5xl" className="relative py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">How we work</p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Momentum without the chaos.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-7 text-slate-400">
              A focused process that keeps strategy close to execution, decisions visible, and your team
              involved at the right moments.
            </p>
          </ScrollReveal>
          <Stagger
            className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
            stagger={0.09}
          >
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="group relative bg-slate-950/90 p-6 transition-colors hover:bg-blue-950/35 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-400">{number}</span>
                  <Icon
                    className="size-5 text-slate-500 transition-colors group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-10 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                <ArrowDownRight
                  className="mt-7 size-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </div>
            ))}
          </Stagger>
        </div>
      </PageContainer>
    </section>
  );
}
