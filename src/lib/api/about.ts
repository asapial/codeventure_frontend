import { apiFetch } from "./client";
import { aboutPageSchema, type AboutPage } from "@/types/about";

/** GET /public/about — CMS-driven about page content. */
export async function fetchAboutPage(): Promise<AboutPage> {
  const result = await apiFetch("/public/about", {
    schema: aboutPageSchema,
    next: { revalidate: 3600, tags: ["public:about"] },
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}