import { apiFetch } from "./client";
import { ApiError } from "./auth";
import {
  registerSchema,
  acceptInvitationSchema,
  registerResponseSchema,
  type RegisterInput,
  type AcceptInvitationInput,
  type RegisterResponse,
} from "@/types/auth";

/** POST /auth/register — full customer signup with names + terms + optional invite/referral. */
export async function register(input: RegisterInput): Promise<RegisterResponse> {
  const parsed = registerSchema.parse(input);
  const result = await apiFetch("/auth/register", {
    method: "POST",
    body: parsed,
    schema: registerResponseSchema,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
  return result.data;
}

/** POST /auth/invitations/accept — redeem an invitation token. */
export async function acceptInvitation(input: AcceptInvitationInput): Promise<void> {
  const parsed = acceptInvitationSchema.parse(input);
  const result = await apiFetch("/auth/invitations/accept", {
    method: "POST",
    body: parsed,
    schema: undefined,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}
