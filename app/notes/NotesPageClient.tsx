"use client";

import { useState, useMemo, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import NoteCard from "@/components/ui/NoteCard";
import EmptyState from "@/components/ui/EmptyState";
import StaggerReveal from "@/components/ui/StaggerReveal";
import { Note } from "@/lib/data";
import { noteService } from "@/lib/services/noteService";
import { cn } from "@/lib/cn";
import { MagnifyingGlass, ArrowsDownUp, Book } from "@phosphor-icons/react";
import SkeletonCard from "@/components/ui/SkeletonCard";

const sortOptions = [
  { label: "Most Popular", value: "downloads" },
  { label: "Recently Updated", value: "newest" },
  { label: "Title (A-Z)", value: "title" },
] as const;
type SortOption = (typeof sortOptions)[number]["value"];

export default function NotesPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<SortOption>("downloads");
  const [realNotes, setRealNotes] = useState<Note[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await noteService.getAll();
        setRealNotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(realNotes.map((n) => n.category)));
    return ["All", ...cats];
  }, [realNotes]);

  const filteredAndSorted = useMemo(() => {
    let result = [...realNotes];

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((n) => n.category === activeCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.subject.toLowerCase().includes(query)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (activeSort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (activeSort === "downloads") {
        return b.downloads - a.downloads;
      }
      // newest first (default)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [activeCategory, searchQuery, activeSort, realNotes]);

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <StaggerReveal>
          <SectionHeading
            eyebrow="Academic Vault"
            title="Expert Preparation Guides"
            subtitle="Comprehensive study materials for CSS, PPSC, FPSC, and MDCAT exams. Download and master your subjects at your own pace."
          >
            <div className="mt-10 flex flex-col gap-6">
              {/* Top Controls: Search and Sort */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <MagnifyingGlass
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by title or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/5"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative min-w-[160px]">
                    <ArrowsDownUp
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                      size={16}
                    />
                    <select
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value as SortOption)}
                      className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white pl-10 pr-10 py-3.5 text-sm outline-none transition-all focus:border-accent hover:bg-zinc-50 cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Controls: Categories */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 ml-1">Exam Category</span>
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
                        activeCategory === cat
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionHeading>
        </StaggerReveal>

        <div className="mt-12">
          {fetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <EmptyState
              title="No study material found"
              description="We couldn't find any notes matching your search or filter. Try a different search term."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSorted.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
