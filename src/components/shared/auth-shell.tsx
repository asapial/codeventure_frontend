import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FadeIn } from "@/components/shared/motion";

export type AuthVariant =
  | "sign-in"
  | "sign-up"
  | "forgot"
  | "reset"
  | "verify"
  | "two-factor";

interface AuthShellProps {
  variant: AuthVariant;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  after?: ReactNode;
}

const signInBenefits = [
  "Pick up exactly where you left off",
  "Real-time conversations with your delivery team",
  "Clear status on every deliverable",
];

const signUpBenefits = [
  "A private workspace for your projects",
  "Secure client portal from day one",
  "Friendly humans, not ticket queues",
];

const forgotBenefits = [
  "Secure, single-use reset link",
  "We never store your old password",
  "Back to work in under two minutes",
];

const resetBenefits = [
  "Encrypted in transit and at rest",
  "Choose something memorable but unique",
  "Sign in immediately after saving",
];

const verifyBenefits = [
  "Six-digit code delivered in seconds",
  "Or click the secure link in your inbox",
  "Protects every project in your portal",
];

const twoFactorBenefits = [
  "A second layer beyond your password",
  "Email OTP or recovery codes",
  "We sign you in only on verified devices",
];

const stats = [
  { label: "Client NPS", value: "+72" },
  { label: "On-time launches", value: "98%" },
  { label: "Avg. response", value: "< 2h" },
];

const benefitsByVariant: Record<AuthVariant, string[]> = {
  "sign-in": signInBenefits,
  "sign-up": signUpBenefits,
  forgot: forgotBenefits,
  reset: resetBenefits,
  verify: verifyBenefits,
  "two-factor": twoFactorBenefits,
};

const ctaByVariant: Record<
  AuthVariant,
  { label: string; href: string; icon: typeof Briefcase }
> = {
  "sign-in": {
    label: "Browse our work instead",
    href: "/portfolio",
    icon: Briefcase,
  },
  "sign-up": {
    label: "See the playbook",
    href: "/#process",
    icon: MessagesSquare,
  },
  forgot: {
    label: "Browse our work instead",
    href: "/portfolio",
    icon: Briefcase,
  },
  reset: {
    label: "See the playbook",
    href: "/#process",
    icon: MessagesSquare,
  },
  verify: {
    label: "Browse our work instead",
    href: "/portfolio",
    icon: Briefcase,
  },
  "two-factor": {
    label: "Browse our work instead",
    href: "/portfolio",
    icon: Briefcase,
  },
};

const headlineByVariant: Record<AuthVariant, string> = {
  "sign-in": "Pick up right where you left off.",
  "sign-up": "Your next project deserves a clear home.",
  forgot: "We've got you — let's get you back in.",
  reset: "Set a fresh password and you're good to go.",
  verify: "Almost there — confirm your inbox.",
  "two-factor": "One more step keeps your work safe.",
};

const introByVariant: Record<AuthVariant, string> = {
  "sign-in":
    "Sign in to manage projects, billing, and the conversations that move your product forward.",
  "sign-up":
    "Spin up a private, secure client workspace in under a minute and invite your team right after.",
  forgot:
    "Enter the email tied to your account and we'll send a secure link to choose a new password.",
  reset:
    "Pick something strong, unique, and easy for you to remember — we'll handle the rest.",
  verify:
    "Enter the six-digit code we sent to confirm the address and unlock your client portal.",
  "two-factor":
    "Confirm with the code we sent to your email or one of your recovery codes.",
};

export function AuthShell({
  variant,
  eyebrow,
  title,
  description,
  children,
  after,
}: AuthShellProps) {
  const benefits = benefitsByVariant[variant];
  const cta = ctaByVariant[variant];
  const headline = headlineByVariant[variant];
  const intro = introByVariant[variant];

  return (
    <div className="auth-shell relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-background">
      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,.18),transparent_45%)]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_90%_110%,rgba(99,102,241,.15),transparent_40%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-5xl lg:grid-cols-[0.92fr_1.08fr]">
        {/* Side panel */}
        <aside className="relative hidden overflow-hidden bg-slate-950 px-8 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-10 xl:py-12">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-[26rem] rounded-full bg-indigo-500/25 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 focus-visible:rounded-md">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-600">
                <Code2 className="size-5" aria-hidden="true" />
              </span>
              <span>
                Code<span className="text-blue-400">Venture</span>
              </span>
            </Link>
          </div>

          <FadeIn trigger="mount" className="relative max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Built for productive partnerships
            </div>
            <p className="mt-7 text-balance text-4xl font-bold leading-tight tracking-[-0.04em]">
              {headline}
            </p>
            <p className="mt-5 leading-7 text-slate-400">
              {intro}
            </p>

            <ul className="mt-9 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-blue-500/15 text-blue-300">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={cta.href}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
            >
              <cta.icon className="size-3.5" aria-hidden="true" />
              {cta.label}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
          </FadeIn>

          <div className="relative flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Private, secure, and built with care
          </div>
        </aside>

        {/* Form panel */}
        <section className="flex min-w-0 items-center justify-center px-4 py-10 sm:px-8 sm:py-12 lg:px-10">
          <FadeIn trigger="mount" className="w-full max-w-md">
            <header className="mb-7 text-center sm:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                <span className="size-1.5 rounded-full bg-blue-500" />
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </header>

            <div className="rounded-2xl border border-blue-100/80 bg-card p-6 shadow-[0_24px_70px_-36px_rgba(30,64,175,.45)] dark:border-blue-950 sm:p-8">
              {children}
            </div>

            {after ? (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {after}
              </div>
            ) : null}

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-muted-foreground transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Back to CodeVenture
              </Link>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
