"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Timer,
  Lightning,
  Users,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { Test } from "@/lib/data";
import { cn } from "@/lib/cn";

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200/60",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200/60",
};

interface Props {
  test: Test;
  index?: number;
  className?: string;
}

export default function TestCard({ test, index = 0, className }: Props) {
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
      <div className="card-core p-6 md:p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 flex-shrink-0">
            <Lightning size={24} weight="duotone" />
          </div>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
              difficultyColors[test.difficulty]
            )}
          >
            {test.difficulty}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 leading-snug mb-1.5">
          {test.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-5">{test.subject}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center rounded-xl bg-zinc-50 py-3 px-2">
            <span className="text-sm font-semibold font-mono text-zinc-800">
              {test.questionCount}
            </span>
            <span className="text-[10px] text-zinc-400 mt-0.5">MCQs</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-zinc-50 py-3 px-2">
            <span className="text-sm font-semibold font-mono text-zinc-800">
              {test.duration}
            </span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Duration</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-zinc-50 py-3 px-2">
            <span className="text-sm font-semibold font-mono text-zinc-800">
              {(test.attempts / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Attempts</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/tests/${test.id}`}
          className="mt-auto group/btn flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
        >
          Start Test
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-[1px] group-hover/btn:bg-white/20">
            <ArrowUpRight size={13} weight="bold" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
