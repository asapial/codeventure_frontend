"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/lib/auth/provider";
import type { SessionUser } from "@/types/auth";

interface Props {
  initialAuth?: { user: SessionUser | null; expiresAt: string | null };
  children: ReactNode;
}

export function ClientProviders({ initialAuth, children }: Props) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={client}>
      <AuthProvider initialState={initialAuth ?? { user: null, expiresAt: null }}>
        {children}
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
