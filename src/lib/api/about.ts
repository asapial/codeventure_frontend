import { apiFetch, type ApiResult } from "./client";
import { aboutPageSchema, type AboutPage } from "@/types/about";

/** GET /public/about — CMS-driven about page content. */
export async function fetchAboutPage(): Promise<ApiResult<AboutPage>> {
  return apiFetch("/public/about", {
    schema: aboutPageSchema,
    next: { revalidate: 3600, tags: ["public:about"] },
  });
}
