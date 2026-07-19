import type { PublicLegalDocument } from "@/types/legal";

export const acceptableUse: PublicLegalDocument = {
  slug: "acceptable-use",
  type: "acceptable-use",
  title: "Acceptable Use Policy",
  status: "PUBLISHED",
  version: 1,
  publishedAt: "2026-06-01T00:00:00.000Z",
  effectiveAt: "2026-06-01T00:00:00.000Z",
  requiresReconsent: false,
  body: `# Acceptable Use Policy

_Last updated: 1 June 2026_

## 1. Scope

This Acceptable Use Policy applies to your use of CodeVenture's public marketing site, engagement workspaces, and any deliverables we hand over during a project.

## 2. You may not use our services to

- Break the law or help anyone else break the law.
- Infringe anyone's intellectual property, privacy, or other rights.
- Distribute malware, spam, or unsolicited messages.
- Attack, probe, or otherwise interfere with our infrastructure.
- Attempt to access data that does not belong to you.

## 3. You must

- Use only the access you have been given.
- Report any security issues you find to security@codeventure.example.
- Respect the rights of other users and customers.

## 4. Enforcement

We may suspend or terminate access for anyone who violates this policy, and we may involve the relevant authorities where appropriate.

## 5. Contact

For any questions about this Acceptable Use Policy, email legal@codeventure.example.
`,
};
