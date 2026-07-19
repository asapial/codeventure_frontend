import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  // `happy-dom` only attaches `localStorage` when the spec actually needs the
  // DOM. Pure-schema / pure-mock specs skip that, so guard against `undefined`.
  try {
    localStorage?.clear?.();
    sessionStorage?.clear?.();
  } catch {
    // ignore — some environments don't expose a storage at all
  }
  vi.restoreAllMocks();
});

// Stub next/navigation once for the whole suite — individual specs can still
// override with `vi.mock("next/navigation", …)` for finer control.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn(), push: vi.fn() }),
  redirect: vi.fn(),
}));
