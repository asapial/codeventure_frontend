import { apiFetch } from "./client";
import {
  serviceDetailSchema,
  servicesListSchema,
  type ServiceDetail,
  type ServicesList,
} from "@/types/service";

/** GET /public/services — full catalogue, edge-cached for 1h. */
export async function fetchServices(): Promise<ServicesList> {
  const result = await apiFetch("/public/services", {
    schema: servicesListSchema,
    next: { revalidate: 3600, tags: ["public:services:list"] },
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}

/** GET /public/services/:slug — single service w/ deliverables + FAQs. */
export async function fetchServiceDetail(
  slug: string,
): Promise<ServiceDetail> {
  const result = await apiFetch(`/public/services/${encodeURIComponent(slug)}`, {
    schema: serviceDetailSchema,
    next: { revalidate: 600, tags: [`public:services:${slug}`] },
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}