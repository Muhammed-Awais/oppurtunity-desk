import type { Metadata } from "next";
import TestsPageClient from "./TestsPageClient";

export const metadata: Metadata = {
  title: "CSS, NTS & Entry Test Mockups | Opportunity Desk",
  description:
    "Take MCQ-based practice tests for CSS, NTS, GAT, and MDCAT preparation. Timed quizzes with instant scoring and performance tracking.",
};

export default function TestsPage() {
  return <TestsPageClient />;
}
