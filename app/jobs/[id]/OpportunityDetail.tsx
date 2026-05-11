"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Briefcase, BuildingOffice, WhatsappLogo } from "@phosphor-icons/react";
import { opportunityService } from "@/lib/services/opportunityService";
import type { Opportunity } from "@/lib/data";

export default function OpportunityDetail() {
  const params = useParams();
  const id = params.id as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await opportunityService.getById(id);
        if (data) {
          setOpportunity(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading opportunity:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32 bg-zinc-50 min-h-screen">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-accent animate-spin" />
          <p className="text-sm text-zinc-400">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32 bg-zinc-50 min-h-screen">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4">
            Opportunity not found
          </h1>
          <p className="text-zinc-500 mb-8">
            The opportunity you are looking for does not exist.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
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

        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
          className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden"
        >
          {/* Cover Image */}
          {opportunity.image && (
            <div className="relative w-full aspect-[2/1] bg-zinc-100">
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
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
            {opportunity.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-50 border border-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-100/50 text-center flex flex-col items-center">
            <p className="text-base font-medium text-zinc-900 mb-2">
              Follow Our WhatsApp Channel for Regular Updates
            </p>
            <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
              Get the latest jobs, scholarships, and study materials delivered directly to your phone.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VbCBDvnGE56i6lhLQe3z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-medium px-8 py-3.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsappLogo size={20} weight="fill" />
              Join WhatsApp Channel
            </a>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
