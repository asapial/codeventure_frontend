import type { Metadata } from "next";
import { fetchQuoteServices } from "@/lib/api/quote";
import { RequestQuoteView } from "./_components/request-quote-view";
import { RequestQuoteFallback } from "./_components/request-quote-fallback";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us about your project and we will send back a tailored proposal within two business days.",
  alternates: { canonical: "/request-quote" },
  openGraph: {
    title: "Request a quote — CodeVenture",
    description:
      "Tell us about your project and we will send back a tailored proposal within two business days.",
    url: "/request-quote",
    type: "website",
  },
  robots: { index: true, follow: true },
};

interface PageProps {
  searchParams: Promise<{
    email?: string;
    hint?: string;
  }>;
}

export default async function RequestQuotePage({ searchParams }: PageProps) {
  const [{ email, hint }, servicesResult] = await Promise.all([
    searchParams,
    fetchQuoteServices(),
  ]);

  return (
    <>
      {servicesResult.ok ? (
        <RequestQuoteView
          services={servicesResult.data.services}
          prefill={{ email: email ?? "", hint: hint ?? "" }}
        />
      ) : (
        <RequestQuoteFallback
          status={servicesResult.status}
          message={servicesResult.error.error.message}
        />
      )}
    </>
  );
}