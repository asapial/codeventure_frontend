import Link from "next/link";
import { ArrowUpRight, Code2, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 dark:border-blue-950/70">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 rounded-lg text-lg font-bold tracking-[-0.025em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-rotate-6">
            <Code2 className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span>Code<span className="text-blue-600 dark:text-blue-400">Venture</span></span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-full px-3.5 py-2 font-medium text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <details className="group relative lg:hidden">
            <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300 [&::-webkit-details-marker]:hidden">
              <Menu className="size-4.5" aria-hidden="true" /><span className="sr-only">Open navigation</span>
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-blue-100 bg-background/95 p-2 shadow-xl shadow-blue-950/10 backdrop-blur-xl dark:border-blue-950">
              <ul>{nav.map((item) => <li key={item.href}><Link href={item.href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/50 dark:hover:text-blue-300">{item.label}</Link></li>)}</ul>
            </nav>
          </details>
          <ThemeToggle />
          <Link href="/request-quote" className={cn(buttonVariants({ size: "sm" }), "group rounded-full px-4 shadow-lg shadow-blue-600/15")}>
            <span className="hidden sm:inline">Start a project</span><span className="sm:hidden">Let&apos;s talk</span>
            <ArrowUpRight className="hidden size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
