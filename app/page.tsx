import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Opportunity Desk — Scholarships, Jobs & Test Prep in Pakistan",
  description:
    "Discover latest scholarships, government jobs, CSS/NTS/PPSC preparation notes, MCQs, mock tests and past papers. Pakistan's complete student opportunity platform.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
