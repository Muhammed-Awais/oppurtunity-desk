import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import OpportunityCard from "@/components/ui/OpportunityCard";
import NoteCard from "@/components/ui/NoteCard";
import TestCard from "@/components/ui/TestCard";
import StaggerReveal from "@/components/ui/StaggerReveal";
import { opportunities, notes, tests } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
  const featuredOpps = opportunities.filter((o) => o.featured).slice(0, 4);
  const featuredNotes = notes.slice(0, 4);
  const featuredTests = tests.slice(0, 4);

  return (
    <>
      {/* ═══ Hero ═══════════════════════════════ */}
      <HeroSection />

      {/* ═══ Latest Opportunities ═══════════════ */}
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
            {featuredOpps.slice(0, 3).map((opp, i) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                index={i}
              />
            ))}
          </div>

          {/* View all link */}
          <StaggerReveal delay={0.3} className="mt-10 flex justify-center">
            <Link
              href="/jobs"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.97]"
            >
              View all opportunities
              <ArrowUpRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══ Study Notes ═══════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-50/60">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <StaggerReveal>
            <SectionHeading
              eyebrow="Academic Vault"
              title="Preparation Guides & Notes"
              subtitle="Comprehensive study materials for CSS, NTS, GAT, and MDCAT entry test preparation. Download and study at your own pace."
            />
          </StaggerReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredNotes.map((note, i) => (
              <NoteCard key={note.id} note={note} index={i} />
            ))}
          </div>

          <StaggerReveal delay={0.3} className="mt-10 flex justify-center">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 active:scale-[0.97]"
            >
              Browse all notes
              <ArrowUpRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══ Practice Tests ════════════════════ */}
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
            {featuredTests.map((test, i) => (
              <TestCard key={test.id} test={test} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <StaggerReveal>
            <div className="card-shell">
              <div className="card-core relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 to-transparent" />

                <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
                      Your future is
                      <br />
                      waiting for you.
                    </h2>
                    <p className="text-sm md:text-base text-zinc-400 max-w-[48ch] leading-relaxed">
                      Join thousands of Pakistani students who use Opportunity Desk to
                      find their dream scholarships and secure their careers.
                    </p>
                  </div>
                  <Link
                    href="/jobs"
                    className="group inline-flex items-center gap-2 rounded-full bg-white pl-6 pr-2 py-3 text-sm font-medium text-zinc-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-emerald-50 active:scale-[0.97] flex-shrink-0"
                  >
                    Get Started
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:bg-accent group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                      <ArrowUpRight size={15} weight="bold" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
