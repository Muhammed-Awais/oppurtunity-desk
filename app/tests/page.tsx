import type { Metadata } from "next";
import TestsPageClient from "./TestsPageClient";
import { JsonLd, generateCollectionPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Mock Tests & MCQs — CSS, NTS, GAT Online Practice",
  description:
    "Take free MCQ-based practice tests for CSS, NTS, GAT, MDCAT and PPSC preparation. Timed quizzes with instant scoring and performance tracking.",
  keywords: [
    "CSS mock test online",
    "NTS MCQs online",
    "GAT practice test",
    "MDCAT MCQs",
    "online mock test Pakistan",
    "PPSC test preparation",
    "free MCQ test",
    "competitive exam practice",
    "quiz preparation Pakistan",
  ],
  alternates: {
    canonical: `${SITE_URL}/tests`,
  },
  openGraph: {
    title: "Free Mock Tests & MCQs — CSS, NTS, GAT Practice | Opportunity Desk",
    description:
      "Take free MCQ-based practice tests for CSS, NTS, GAT, and MDCAT. Timed quizzes with instant scoring.",
    url: `${SITE_URL}/tests`,
    type: "website",
  },
};

export default function TestsPage() {
  return (
    <>
      <JsonLd
        data={generateCollectionPageSchema(
          "Free Mock Tests & MCQs",
          "MCQ-based practice tests for CSS, NTS, GAT, and MDCAT preparation with instant scoring.",
          "/tests"
        )}
      />
      <TestsPageClient />
    </>
  );
}
