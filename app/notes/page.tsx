import type { Metadata } from "next";
import NotesPageClient from "./NotesPageClient";
import { JsonLd, generateCollectionPageSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Study Notes — CSS, NTS, GAT & Entry Test Preparation",
  description:
    "Download free preparation notes, past papers, MCQs, and study guides for CSS, NTS, GAT, MDCAT and competitive exams in Pakistan. Updated regularly.",
  keywords: [
    "CSS notes PDF",
    "NTS preparation notes",
    "GAT preparation material",
    "MDCAT study notes",
    "past papers Pakistan",
    "competitive exam notes",
    "PPSC preparation",
    "study material Pakistan",
    "free notes download",
  ],
  alternates: {
    canonical: `${SITE_URL}/notes`,
  },
  openGraph: {
    title: "Study Notes — CSS, NTS, GAT & Entry Test Preparation | Opportunity Desk",
    description:
      "Download free preparation notes, past papers, and study guides for competitive exams in Pakistan.",
    url: `${SITE_URL}/notes`,
    type: "website",
  },
};

export default function NotesPage() {
  return (
    <>
      <JsonLd
        data={generateCollectionPageSchema(
          "Study Notes & Preparation Material",
          "Comprehensive study materials for CSS, PPSC, FPSC, and MDCAT entry test preparation.",
          "/notes"
        )}
      />
      <NotesPageClient />
    </>
  );
}
