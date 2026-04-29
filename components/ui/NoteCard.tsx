"use client";

import { motion } from "framer-motion";
import {
  FileText,
  DownloadSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { Note } from "@/lib/data";
import { cn } from "@/lib/cn";

interface Props {
  note: Note;
  index?: number;
  className?: string;
}

export default function NoteCard({ note, index = 0, className }: Props) {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-accent flex-shrink-0">
            <FileText size={24} weight="duotone" />
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-medium text-zinc-500 uppercase tracking-[0.12em]">
            {note.category}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 leading-snug mb-1.5">
          {note.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-5">{note.subject}</p>

        {/* Stats */}
        <div className="flex items-center gap-5 mb-6 text-xs text-zinc-400">
          <span className="font-mono">{note.pages} pages</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="font-mono">
            {note.downloads.toLocaleString()} downloads
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <span className="text-[11px] text-zinc-400">
            Updated {note.updatedAt}
          </span>
          <button className="group/btn flex items-center gap-2 rounded-full bg-zinc-900 pl-4 pr-1.5 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]">
            Download
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover/btn:bg-white/20">
              <DownloadSimple size={13} weight="bold" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
