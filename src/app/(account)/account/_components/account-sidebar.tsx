"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SessionUser } from "@/types/auth";

import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/shared/sign-out-button";
import { cn } from "@/lib/utils";

interface Props {
  user: Pick<SessionUser, "name" | "email" | "role">;
}

interface NavItem {
  href: string;
  label: string;
}

const NAV: NavItem[] = [
  { href: "/account", label: "Overview" },
  { href: "/account/projects", label: "Projects" },
  { href: "/account/billing", label: "Billing" },
  { href: "/account/settings", label: "Settings" },
];

export function AccountSidebar({ user }: Props) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/account") return pathname === "/account";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="space-y-6" aria-label="Account navigation">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
        <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
          {user.role}
        </p>
      </div>

      <nav>
        <ul className="space-y-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm",
                  isActive(item.href)
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      <SignOutButton className="w-full" />
    </aside>
  );
}