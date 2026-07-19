import type { PublicLegalDocument } from "@/types/legal";

export const dataProcessingAgreement: PublicLegalDocument = {
  slug: "data-processing-agreement",
  type: "data-processing-agreement",
  title: "Data Processing Agreement",
  status: "PUBLISHED",
  version: 1,
  publishedAt: "2026-06-01T00:00:00.000Z",
  effectiveAt: "2026-06-01T00:00:00.000Z",
  requiresReconsent: false,
  body: `# Data Processing Agreement

_Last updated: 1 June 2026_

## 1. Purpose

This Data Processing Agreement (the "DPA") forms part of the written agreement between CodeVenture and each of our customers (the "Agreement"). It applies when CodeVenture processes personal data on behalf of the customer during an engagement.

## 2. Roles

The customer is the controller. CodeVenture is the processor.

## 3. Processing

CodeVenture will process personal data only on the documented instructions of the customer, including with regard to transfers of personal data, unless required to do so by applicable law.

## 4. Subprocessors

The customer agrees that CodeVenture may engage subprocessors to help deliver the engagement. A current list of subprocessors is available on request.

## 5. Security

CodeVenture will implement appropriate technical and organisational measures to protect personal data against unauthorised or unlawful processing and against accidental loss, destruction, or damage.

## 6. Data subject rights

CodeVenture will assist the customer in fulfilling its obligation to respond to data subject requests, taking into account the nature of the processing.

## 7. Incidents

CodeVenture will notify the customer without undue delay after becoming aware of a personal data breach affecting the customer's data.

## 8. Return or deletion

At the end of the engagement, CodeVenture will, at the customer's choice, return or delete the personal data we hold on the customer's behalf.

## 9. Contact

For any questions about this DPA, email legal@codeventure.example.
`,
};
