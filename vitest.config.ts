import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "src/app/**/loading.tsx",
        "src/app/**/error.tsx",
        ".next/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // `server-only` is a Next.js guard that throws when bundled into the
      // client. In test runs we don't have it installed, so alias it to an
      // empty module so specs that import session helpers can resolve.
      "server-only": path.resolve(__dirname, "./vitest.empty.ts"),
    },
  },
});
