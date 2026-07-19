import { apiFetch } from "./client";
import { accountSummarySchema, type AccountSummary } from "@/types/account";

/** GET /account/summary — dashboard tiles (active projects, billing, etc.). */
export async function fetchAccountSummary(): Promise<AccountSummary> {
  const result = await apiFetch("/account/summary", {
    schema: accountSummarySchema,
    forwardCookies: true,
  });
  if (!result.ok) throw new Error(result.error.error.message);
  return result.data;
}