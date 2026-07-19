"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@/components/shared/sign-out-button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types/auth";

import {
  dashboardNavByRole,
  type DashboardRole,
} from "./dashboard-nav-config";

interface DashboardSidebarProps {
  user: Pick<SessionUser, "id" | "name" | "email" | "role" | "avatarUrl">;
}

/**
 * Role-aware shell sidebar.
 *
 * Pulls the nav for `user.role` from `dashboard-nav-config.ts` and renders it
 * inside the shadcn `Sidebar` primitive. The gradient header card is reused
 * from the prior `/account` design so the visual language stays continuous.
 */
export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const role: DashboardRole = user.role;
  const groups = dashboardNavByRole[role];

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="border-r border-blue-100/80 dark:border-blue-950/60"
    >
      {/* Brand + user card — same gradient treatment as the old /account sidebar. */}
      <SidebarHeader>
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-card shadow-[0_20px_60px_-38px_rgba(30,64,175,.45)] dark:border-blue-950">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-sm font-bold ring-1 ring-white/20">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-blue-100">{user.email}</p>
              </div>
            </div>
            <p className="mt-3 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-50 ring-1 ring-white/15">
              {role}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.description ?? item.label}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "transition-all",
                            active &&
                              "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-950/60 dark:text-blue-300",
                          )}
                        >
                          <Icon className="size-4" aria-hidden="true" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {/* Optional: future badges for new inquiries / pending reviews */}
                      {item.href === "/dashboard/inquiries" ? (
                        <SidebarMenuBadge>—</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/70 p-3">
        <div className="flex items-center gap-3 px-1 pb-2">
          <UserAvatar
            name={user.name}
            avatarUrl={user.avatarUrl ?? null}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">{user.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {roleLabel(role)}
            </p>
          </div>
        </div>
        <SignOutButton variant="outline" className="w-full" />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

function roleLabel(role: DashboardRole): string {
  switch (role) {
    case "owner":
      return "Workspace owner";
    case "admin":
      return "Platform administrator";
    case "editor":
      return "Editor";
    case "viewer":
      return "Viewer";
  }
}