"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { Opportunity } from "@/lib/data";
import { cn } from "@/lib/cn";

interface Props {
  opportunity: Opportunity;
  index?: number;
  className?: string;
}

export default function OpportunityCard({
  opportunity,
  index = 0,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.32, 0.72, 0, 1] as const,
      }}
      className={cn("card-shell group h-full", className)}
    >
      <div className="card-core flex flex-col h-full">
        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col h-full">
          {/* Header with Type Badge */}
          <div className="flex items-start justify-between mb-4">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[10px] uppercase tracking-wider font-bold",
                opportunity.type === "scholarship"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              )}
            >
              {opportunity.type}
            </span>
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
              {opportunity.organization}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 leading-tight mb-3">
            {opportunity.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6 line-clamp-3">
            {opportunity.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-50 border border-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta + CTA */}
          <div className="mt-auto flex items-end justify-between gap-4 pt-5 border-t border-zinc-100">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                <MapPin size={14} weight="duotone" className="text-zinc-400" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                <Calendar size={14} weight="duotone" className="text-zinc-400" />
                <span className="text-zinc-400">Deadline:</span> {opportunity.deadline}
              </span>
            </div>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-accent group-hover:scale-110 active:scale-95 shadow-sm">
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
