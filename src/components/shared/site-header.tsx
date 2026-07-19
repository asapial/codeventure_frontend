import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  FileText,
  Layers,
  LogIn,
  Menu,
  Sparkles,
  Workflow,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth/session";
import { ThemeToggle } from "./theme-toggle";
import { PageContainer } from "./layout/page-container";
import { UserMenu } from "./user-menu";
import { UserAvatar } from "./user-avatar";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const nav: NavItem[] = [
  { label: "Work", href: "/portfolio", icon: Briefcase },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Process", href: "/#process", icon: Workflow },
  { label: "About", href: "/about", icon: Sparkles },
  { label: "Start a project", href: "/request-quote", icon: FileText },
];

export async function SiteHeader() {
  const session = await getSession();
  const user = session?.user ?? null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 dark:border-blue-950/70">
      <PageContainer className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg text-lg font-bold tracking-[-0.025em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-rotate-6">
            <Code2 className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span>
            Code<span className="text-blue-600 dark:text-blue-400">Venture</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-full px-3 py-2 font-medium text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5">
          {/* Mobile sheet */}
          <details className="group relative xl:hidden">
            <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300 [&::-webkit-details-marker]:hidden">
              <Menu className="size-4.5" aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 top-12 max-h-[80svh] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-blue-100 bg-background/95 p-2 shadow-xl shadow-blue-950/10 backdrop-blur-xl dark:border-blue-950"
            >
              <ul className="grid gap-0.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                    >
                      <item.icon
                        className="size-4 opacity-70"
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mx-1 my-2 h-px bg-border" />

              {/* Mobile auth actions */}
              {user ? (
                <div className="grid gap-1 px-1 pb-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 rounded-xl bg-blue-50/60 px-3 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60"
                  >
                    <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="xs" />
                    <span className="min-w-0 truncate">{user.name}</span>
                  </Link>
                  <Link
                    href="/request-quote"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "group rounded-full shadow-lg shadow-blue-600/15",
                    )}
                  >
                    <span>Start a project</span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-1.5 px-1 pb-1">
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-background/80 px-3 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-blue-950 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                  >
                    <LogIn className="size-3.5" aria-hidden="true" />
                    Enter the studio
                  </Link>
                  <Link
                    href="/sign-up"
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-3 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Launch workspace
                  </Link>
                </div>
              )}
            </nav>
          </details>

          <ThemeToggle />

          {/* Desktop auth affordances */}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="hidden items-center gap-1 xl:flex">
              <Link
                href="/sign-in"
                aria-label="Sign in to your account"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "rounded-full px-3 font-semibold text-muted-foreground",
                )}
              >
                <LogIn className="size-3.5" aria-hidden="true" />
                Enter the studio
              </Link>
              <Link
                href="/sign-up"
                aria-label="Create a new account"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "group rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-blue-600/40",
                )}
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                Launch workspace
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}

        </div>
      </PageContainer>
    </header>
  );
}
