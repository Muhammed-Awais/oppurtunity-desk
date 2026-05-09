import type { Metadata } from "next";
import JobsPageClient from "./JobsPageClient";
import { JsonLd, generateCollectionPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Latest Jobs & Scholarships in Pakistan 2026",
  description:
    "Browse HEC scholarships, PPSC, FPSC, NTS government jobs, and international scholarship opportunities for students in Pakistan. Updated daily.",
  keywords: [
    "latest jobs Pakistan 2026",
    "HEC scholarships",
    "PPSC jobs",
    "FPSC jobs",
    "NTS jobs",
    "international scholarships Pakistan",
    "government jobs Pakistan",
    "scholarship opportunities",
  ],
  alternates: {
    canonical: `${SITE_URL}/jobs`,
  },
  openGraph: {
    title: "Latest Jobs & Scholarships in Pakistan 2026 | Opportunity Desk",
    description:
      "Browse HEC scholarships, PPSC, FPSC, NTS government jobs, and international scholarship opportunities.",
    url: `${SITE_URL}/jobs`,
    type: "website",
  },
};

export default function JobsPage() {
  return (
    <>
      <JsonLd
        data={generateCollectionPageSchema(
          "Latest Jobs & Scholarships in Pakistan",
          "Browse the latest scholarships, government jobs, and internship openings curated for students across Pakistan.",
          "/jobs"
        )}
      />
      <JobsPageClient />
    </>
  );
}
