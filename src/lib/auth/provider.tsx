"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SessionUser } from "@/types/auth";

interface AuthState {
  user: SessionUser | null;
  expiresAt: string | null;
}

interface AuthContextValue extends AuthState {
  /** Replace the cached session (e.g. after sign-in). */
  setSession: (state: AuthState) => void;
  /** Clear the cached session (e.g. after sign-out or 401). */
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Thin client-side auth cache. The Server Components are still the source of
 * truth — this is just so interactive shells can react to sign-in / sign-out.
 */
export function AuthProvider({
  initialState,
  children,
}: {
  initialState?: AuthState;
  children: ReactNode;
}) {
  const [state, setState] = useState<AuthState>(
    initialState ?? { user: null, expiresAt: null },
  );

  const setSession = useCallback((next: AuthState) => {
    setState(next);
  }, []);

  const clearSession = useCallback(() => {
    setState({ user: null, expiresAt: null });
  }, []);

  const value = useMemo(
    () => ({ ...state, setSession, clearSession }),
    [state, setSession, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}