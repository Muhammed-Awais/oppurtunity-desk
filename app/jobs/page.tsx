import type { Metadata } from "next";
import JobsPageClient from "./JobsPageClient";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Browse the latest scholarships, jobs, and internship openings curated for students across Pakistan.",
};

export default function JobsPage() {
  return <JobsPageClient />;
}
