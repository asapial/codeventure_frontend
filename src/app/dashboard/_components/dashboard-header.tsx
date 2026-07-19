"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

import { DashboardSidebar } from "./dashboard-sidebar";
import type { SessionUser } from "@/types/auth";

interface DashboardHeaderProps {
  user: Pick<SessionUser, "id" | "name" | "email" | "role" | "avatarUrl">;
}

/**
 * Mobile / off-canvas header for the dashboard area.
 *
 * On desktop the shadcn Sidebar sits inline in the layout. On mobile it
 * collapses into a Sheet triggered by the menu button. This header is the
 * trigger and also carries the page-title slot.
 */
export function DashboardHeader({ user }: DashboardHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-blue-100/70 bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:hidden dark:border-blue-950/60">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Open navigation"
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[18rem] gap-0 p-0"
          aria-describedby={undefined}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard navigation</SheetTitle>
            <SheetDescription>
              Switch between dashboard sections.
            </SheetDescription>
          </SheetHeader>
          {/* Render the sidebar inside the mobile sheet. The Sidebar primitive
              uses `useIsMobile()` internally to pick the drawer vs. inline
              presentation, so we wrap a thin shim that forces the mobile
              variant. */}
          <MobileSidebarShim user={user} />
        </SheetContent>
      </Sheet>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Dashboard</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
      {isMobile ? null : null}
    </div>
  );
}

/**
 * Thin wrapper that renders the dashboard sidebar inside the mobile sheet.
 * shadcn's Sidebar already supports being mounted inside a Sheet via the
 * collapsible prop, so we just reuse the same component.
 */
function MobileSidebarShim({ user }: DashboardHeaderProps) {
  return <DashboardSidebar user={user} />;
}