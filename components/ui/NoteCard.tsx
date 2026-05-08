"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  FilePdf,
  ListChecks,
  DownloadSimple,
  ArrowUpRight,
  BookOpenText,
} from "@phosphor-icons/react";
import type { Note } from "@/lib/data";
import { cn } from "@/lib/cn";

const typeConfig: Record<string, { icon: typeof FileText; color: string; badge: string; cta: string }> = {
  text: {
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    cta: "Read Note",
  },
  pdf: {
    icon: FilePdf,
    color: "bg-rose-50 text-rose-600",
    badge: "bg-rose-50 text-rose-700",
    cta: "View PDF",
  },
  mcq: {
    icon: ListChecks,
    color: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-700",
    cta: "Attempt Quiz",
  },
};

interface Props {
  note: Note;
  index?: number;
  className?: string;
}

export default function NoteCard({ note, index = 0, className }: Props) {
  const noteType = note.type || "text";
  const config = typeConfig[noteType] || typeConfig.text;
  const TypeIcon = config.icon;

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
      className={cn("card-shell group", className)}
    >
      <div className="card-core p-6 md:p-8">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0", config.color)}>
            <TypeIcon size={24} weight="duotone" />
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", config.badge)}>
              {noteType}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-medium text-zinc-500 uppercase tracking-[0.12em]">
              {note.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 leading-snug mb-1.5">
          {note.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-5">{note.subject}</p>

        {/* Stats */}
        <div className="flex items-center gap-5 mb-6 text-xs text-zinc-400">
          {noteType === "mcq" && note.questions ? (
            <span className="font-mono">{note.questions.length} MCQs</span>
          ) : (
            <span className="font-mono">{note.pages} pages</span>
          )}
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="font-mono">
            {(note.downloads || 0).toLocaleString()} downloads
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <span className="text-[11px] text-zinc-400">
            Updated {note.updatedAt}
          </span>
          <Link
            href={`/notes/${note.id}`}
            className="group/btn flex items-center gap-2 rounded-full bg-zinc-900 pl-4 pr-1.5 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
          >
            {config.cta}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover/btn:bg-white/20">
              {noteType === "pdf" ? (
                <DownloadSimple size={13} weight="bold" />
              ) : (
                <ArrowUpRight size={13} weight="bold" />
              )}
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
