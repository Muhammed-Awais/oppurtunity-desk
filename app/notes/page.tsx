import type { Metadata } from "next";
import NotesPageClient from "./NotesPageClient";

export const metadata: Metadata = {
  title: "Study Notes",
  description:
    "Download preparation notes for CSS, NTS, GAT, and entry tests. Comprehensive study materials for competitive exams.",
};

export default function NotesPage() {
  return <NotesPageClient />;
}
