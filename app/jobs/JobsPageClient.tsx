"use client";

import { useState, useMemo } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import OpportunityCard from "@/components/ui/OpportunityCard";
import EmptyState from "@/components/ui/EmptyState";
import StaggerReveal from "@/components/ui/StaggerReveal";
import { opportunities } from "@/lib/data";
import { cn } from "@/lib/cn";
import { MagnifyingGlass, ArrowsDownUp, MapPin } from "@phosphor-icons/react";

const filters = ["All", "Jobs", "Scholarships"] as const;
type Filter = (typeof filters)[number];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Deadline (Soonest)", value: "deadline" },
  { label: "Title (A-Z)", value: "title" },
] as const;
type SortOption = (typeof sortOptions)[number]["value"];

export default function JobsPageClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<SortOption>("newest");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const locations = useMemo(() => {
    const locs = Array.from(new Set(opportunities.map((o) => o.location)));
    return ["All", ...locs];
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...opportunities];

    // Filter by Type
    if (activeFilter !== "All") {
      result = result.filter(
        (o) => o.type === activeFilter.toLowerCase().slice(0, -1)
      );
    }

    // Filter by Location
    if (selectedLocation !== "All") {
      result = result.filter((o) => o.location === selectedLocation);
    }

    // Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(query) ||
          o.organization.toLowerCase().includes(query) ||
          o.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (activeSort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (activeSort === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      // newest first (default)
      return b.id.localeCompare(a.id);
    });

    return result;
  }, [activeFilter, searchQuery, activeSort, selectedLocation]);

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <StaggerReveal>
          <SectionHeading
            eyebrow="Career Launchpad"
            title="Find Your Next Opportunity"
            subtitle="Discover HEC-verified scholarships and premium job openings across Pakistan. Filter and search to find your perfect match."
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
                    placeholder="Search by title, organization, or keyword..."
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

              {/* Bottom Controls: Filters */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 ml-1">Category</span>
                  <div className="flex items-center gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
                          activeFilter === filter
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 ml-1">Location</span>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="appearance-none rounded-full border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm font-medium outline-none transition-all hover:bg-zinc-50 focus:border-accent cursor-pointer"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </SectionHeading>
        </StaggerReveal>

        <div className="mt-12">
          {filteredAndSorted.length === 0 ? (
            <EmptyState
              title="No opportunities found"
              description="We couldn't find anything matching your search criteria. Try adjusting your filters or search terms."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((opp, i) => (
                <div key={opp.id}>
                  <OpportunityCard opportunity={opp} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
