"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import OpportunityCard from "@/components/ui/OpportunityCard";
import NoteCard from "@/components/ui/NoteCard";
import TestCard from "@/components/ui/TestCard";
import StaggerReveal from "@/components/ui/StaggerReveal";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Opportunity, Note, Test } from "@/lib/data";
import { opportunityService } from "@/lib/services/opportunityService";
import { noteService } from "@/lib/services/noteService";
import { testService } from "@/lib/services/testService";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function HomePageClient() {
  const [featuredOpps, setFeaturedOpps] = useState<Opportunity[]>([]);
  const [featuredNotes, setFeaturedNotes] = useState<Note[]>([]);
  const [featuredTests, setFeaturedTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [opps, notes, tests] = await Promise.all([
          opportunityService.getAll(),
          noteService.getAll(),
          testService.getAll()
        ]);
        setFeaturedOpps(opps.slice(0, 3));
        setFeaturedNotes(notes.slice(0, 4));
        setFeaturedTests(tests.slice(0, 4));
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <HeroSection />

      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <StaggerReveal>
            <SectionHeading
              eyebrow="Career Openings"
              title="HEC Scholarships & Prime Jobs"
              subtitle="Hand-picked vacancies from top Pakistani organizations and international universities. Updated daily to keep you ahead."
            />
          </StaggerReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              featuredOpps.map((opp, i) => (
                <OpportunityCard key={opp.id} opportunity={opp} index={i} />
              ))
            )}
          </div>

          <StaggerReveal delay={0.3} className="mt-10 flex justify-center">
            <Link
              href="/jobs"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.97]"
            >
              View all opportunities
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </StaggerReveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-zinc-50/60">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <StaggerReveal>
            <SectionHeading
              eyebrow="Academic Vault"
              title="Preparation Guides & Notes"
              subtitle="Comprehensive study materials for CSS, PPSC, FPSC, and MDCAT entry test preparation. Download and study at your own pace."
            />
          </StaggerReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              featuredNotes.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} />
              ))
            )}
          </div>

          <StaggerReveal delay={0.3} className="mt-10 flex justify-center">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 active:scale-[0.97]"
            >
              Browse all notes
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </StaggerReveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <StaggerReveal>
            <SectionHeading
              eyebrow="Exam Mastery"
              title="CSS, NTS & Entry Test Mockups"
              subtitle="Timed quizzes modeled after actual Pakistani exam patterns. Track your performance and identify areas to improve."
            />
          </StaggerReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              featuredTests.map((test, i) => (
                <TestCard key={test.id} test={test} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner remains the same */}
    </>
  );
}
