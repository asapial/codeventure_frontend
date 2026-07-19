import { apiFetch, type ApiResult } from "./client";
import {
  serviceDetailSchema,
  servicesListSchema,
  type ServiceDetail,
  type ServicesList,
} from "@/types/service";

/** GET /public/services — full catalogue, edge-cached for 1h. */
export async function fetchServices(): Promise<ApiResult<ServicesList>> {
  return apiFetch("/public/services", {
    schema: servicesListSchema,
    next: { revalidate: 3600, tags: ["public:services:list"] },
  });
}

/** GET /public/services/:slug — single service w/ deliverables + FAQs. */
export async function fetchServiceDetail(
  slug: string,
): Promise<ApiResult<ServiceDetail>> {
  return apiFetch(`/public/services/${encodeURIComponent(slug)}`, {
    schema: serviceDetailSchema,
    next: { revalidate: 600, tags: [`public:services:${slug}`] },
  });
}
