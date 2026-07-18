import { apiFetch } from "./client";
import { homePageSchema, type HomePage } from "@/types/home";

/**
 * Fetch the landing-page payload. Server-only call (uses Next.js cache).
 * Server Components call this directly; Client Components use `homeKeys`
 * through TanStack Query.
 */
export async function fetchHomePage(): Promise<
  Awaited<ReturnType<typeof apiFetch<HomePage>>>
> {
  return apiFetch<HomePage>("/public/home", {
    schema: homePageSchema,
    next: { revalidate: 300, tags: ["public:home"] },
  });
}
