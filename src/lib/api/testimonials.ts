import { apiFetch } from "./client";
import { testimonialSummarySchema, type TestimonialSummary } from "@/types/home";
import { z } from "zod";

export const testimonialsListSchema = z.array(testimonialSummarySchema);

export async function fetchFeaturedTestimonials(): Promise<
  Awaited<ReturnType<typeof apiFetch<TestimonialSummary[]>>>
> {
  return apiFetch<TestimonialSummary[]>("/public/testimonials", {
    schema: testimonialsListSchema,
    next: { revalidate: 600, tags: ["public:testimonials:featured"] },
  });
}
