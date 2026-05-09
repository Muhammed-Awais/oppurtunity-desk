import { opportunityService } from "@/lib/services/opportunityService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Briefcase, BuildingOffice } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const opportunity = await opportunityService.getById(resolvedParams.id);
  if (!opportunity) {
    return { title: "Opportunity Not Found" };
  }
  return {
    title: opportunity.title,
    description: opportunity.description.slice(0, 160) + "...",
  };
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const opportunity = await opportunityService.getById(resolvedParams.id);

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32 bg-zinc-50 min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <Link 
          href="/jobs" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} weight="bold" className="transition-transform group-hover:-translate-x-1" />
          Back to opportunities
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-3 mb-6">
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-wider font-bold ${
              opportunity.type === "scholarship"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}>
              {opportunity.type}
            </span>
            <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-1">
              <BuildingOffice size={16} weight="duotone" />
              {opportunity.organization}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight mb-6">
            {opportunity.title}
          </h1>

          <div className="flex flex-wrap gap-6 py-6 border-y border-zinc-100 mb-8">
            <div className="flex items-center gap-2 text-zinc-600">
              <MapPin size={20} weight="duotone" className="text-zinc-400" />
              <span className="font-medium">{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Calendar size={20} weight="duotone" className="text-zinc-400" />
              <span className="font-medium">Deadline: {opportunity.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Briefcase size={20} weight="duotone" className="text-zinc-400" />
              <span className="font-medium capitalize">{opportunity.type}</span>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">About this Opportunity</h2>
            <div className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
              {opportunity.description}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-50 border border-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500 mb-4">To apply for this opportunity, please check the official organization website.</p>
            <button className="rounded-full bg-accent hover:bg-emerald-600 text-white font-medium px-8 py-3.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              Apply Now (External link)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
