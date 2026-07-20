import type { ZodType } from "zod";

/**
 * Standardized API error envelope, matching the backend contract:
 *   { error: { code, message, fieldErrors?, requestId } }
 */
export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    requestId?: string;
  };
};

export type ApiResult<T> =
  | { ok: true; status: number; data: T; requestId?: string }
  | { ok: false; status: number; error: ApiErrorBody; raw?: unknown; requestId?: string };

const BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000"
).replace(/\/$/, "");

type ApiFetchOptions<T> = {
  schema?: ZodType<T>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Next.js cache options (server-only). */
  next?: { revalidate?: number | false; tags?: string[] };
  /** Forward cookies on the server. */
  forwardCookies?: boolean;
};

/**
 * Typed fetch wrapper. Never throws for expected business states (4xx);
 * only throws for transport errors so React error boundaries catch them.
 */
export async function apiFetch<T>(
  path: string,
  opts: ApiFetchOptions<T> = {},
): Promise<ApiResult<T>> {
  const url = `${BASE}/api/v1${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(opts.body ? { "Content-Type": "application/json" } : {}),
    ...opts.headers,
  };

  if (opts.forwardCookies && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const jar = await cookies();
    const cookieHeader = jar
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    if (cookieHeader) headers.Cookie = cookieHeader;
  }

  // Cross-origin (localhost:3000 → localhost:5000) requires
  // `credentials: "include"` so the browser accepts `Set-Cookie` from the
  // backend. Without this the auth flow silently breaks: login/register
  // return 200 but the session cookies are dropped, so the next request
  // reports "no session" and the user is bounced back to /sign-in.
  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
      credentials: "include",
      ...(opts.next ? { next: opts.next } : {}),
    });
  } catch (err) {
    // Transport-level failure — surface to error boundary.
    throw new ApiTransportError(
      err instanceof Error ? err.message : "Network error",
      url,
    );
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload: unknown = isJson ? await res.json() : await res.text();
  const requestId = res.headers.get("x-request-id") ?? undefined;

  if (!res.ok) {
    const errorBody =
      isJson && payload && typeof payload === "object" && "error" in payload
        ? (payload as ApiErrorBody)
        : {
            error: {
              code: "UNKNOWN",
              message: res.statusText || "Request failed",
              requestId,
            },
          };
    return {
      ok: false,
      status: res.status,
      error: errorBody,
      raw: payload,
      requestId,
    };
  }

  const data =
    isJson &&
    payload !== null &&
    typeof payload === "object" &&
    "success" in payload &&
    (payload as { success?: unknown }).success === true &&
    "data" in payload
      ? (payload as { data: unknown }).data
      : payload;

  if (opts.schema) {
    const parsed = opts.schema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        status: 200,
        error: {
          error: {
            code: "SCHEMA_MISMATCH",
            message: "API response did not match expected schema",
            requestId,
          },
        },
        raw: data,
        requestId,
      };
    }
    return { ok: true, status: res.status, data: parsed.data, requestId };
  }

  return { ok: true, status: res.status, data: data as T, requestId };
}

export class ApiTransportError extends Error {
  constructor(message: string, public readonly url: string) {
    super(message);
    this.name = "ApiTransportError";
  }
}

/**
 * Lightweight typed error so callers can render `body.fieldErrors` from
 * forms. Exposed from the shared client because every domain fetcher needs it.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: {
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
      requestId?: string;
    },
  ) {
    super(body.message);
    this.name = "ApiError";
  }

  /**
   * Short, single-line suffix suitable for pasting into a support ticket,
   * an analytics breadcrumb, or a copy-to-clipboard toast action.
   * Returns an empty string when the server didn't echo a request id.
   */
  get traceId(): string {
    return this.body.requestId ? `ref ${this.body.requestId}` : "";
  }
}

/**
 * Render an `ApiError` into a Sonner toast description.
 *
 *   toast.error(formatApiErrorMessage(err))
 *
 * Keeps the message concise, surfaces field-level validation errors when the
 * server provided them, and appends the request id so users can quote it
 * to support without having to open DevTools.
 */
export function formatApiErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    const fieldHint = formatFieldErrors(err.body.fieldErrors);
    const trace = err.traceId;
    return [err.body.message, fieldHint, trace].filter(Boolean).join(" ");
  }
  if (err instanceof ApiTransportError) {
    return "We couldn’t reach the server. Check your connection and try again.";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}

function formatFieldErrors(
  fieldErrors: Record<string, string[]> | undefined,
): string {
  if (!fieldErrors) return "";
  const lines: string[] = [];
  for (const [field, msgs] of Object.entries(fieldErrors)) {
    if (Array.isArray(msgs) && msgs.length > 0) {
      lines.push(`${field}: ${msgs.join(", ")}`);
    }
  }
  return lines.join("; ");
}
