"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, ReceiptText, Settings } from "lucide-react";
import type { SessionUser } from "@/types/auth";
import { SignOutButton } from "@/components/shared/sign-out-button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/projects", label: "Projects", icon: FolderKanban },
  { href: "/account/billing", label: "Billing", icon: ReceiptText },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountSidebar({ user }: { user: Pick<SessionUser, "name" | "email" | "role"> }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/account" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Account navigation">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-card shadow-[0_20px_60px_-38px_rgba(30,64,175,.45)] dark:border-blue-950">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-sm font-bold ring-1 ring-white/20">{user.name.slice(0, 2).toUpperCase()}</span>
            <div className="min-w-0"><p className="truncate text-sm font-bold">{user.name}</p><p className="truncate text-xs text-blue-100">{user.email}</p></div>
          </div>
          <p className="mt-4 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-50 ring-1 ring-white/15">{user.role}</p>
        </div>
        <nav className="overflow-x-auto p-2.5">
          <ul className="flex min-w-max gap-1 lg:block lg:min-w-0 lg:space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link href={href} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active ? "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-950/60 dark:text-blue-300" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    <Icon className="size-4" aria-hidden="true" />{label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-border/70 p-3"><SignOutButton className="w-full" /></div>
      </div>
    </aside>
  );
}
