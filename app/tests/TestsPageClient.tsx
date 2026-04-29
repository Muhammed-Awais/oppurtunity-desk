"use client";

import { useState, useMemo, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import TestCard from "@/components/ui/TestCard";
import EmptyState from "@/components/ui/EmptyState";
import StaggerReveal from "@/components/ui/StaggerReveal";
import { Test } from "@/lib/data";
import { testService } from "@/lib/services/testService";
import { MagnifyingGlass } from "@phosphor-icons/react";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function TestsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [realTests, setRealTests] = useState<Test[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await testService.getAll();
        setRealTests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, []);

  const filteredTests = useMemo(() => {
    if (!searchQuery.trim()) return realTests;
    const query = searchQuery.toLowerCase();
    return realTests.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query)
    );
  }, [searchQuery, realTests]);

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <StaggerReveal>
          <SectionHeading
            eyebrow="Exam Mastery"
            title="CSS, NTS & Entry Test Mockups"
            subtitle="Timed MCQ quizzes modeled after actual Pakistani exam patterns. Attempt, score, and identify areas to improve."
          >
            <div className="mt-10 max-w-2xl">
              <div className="relative">
                <MagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search tests by subject or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/5"
                />
              </div>
            </div>
          </SectionHeading>
        </StaggerReveal>

        <div className="mt-12">
          {fetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredTests.length === 0 ? (
            <EmptyState
              title="No tests found"
              description="We couldn't find any practice tests matching your search. Try a different term."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTests.map((test, i) => (
                <TestCard key={test.id} test={test} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
