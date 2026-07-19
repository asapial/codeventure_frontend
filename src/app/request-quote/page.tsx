import type { Metadata } from "next";
import { quoteServices } from "@/content/quote-services";
import { RequestQuoteView } from "./_components/request-quote-view";

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
  const { email, hint } = await searchParams;

  return (
    <RequestQuoteView
      services={quoteServices.services}
      prefill={{ email: email ?? "", hint: hint ?? "" }}
    />
  );
}