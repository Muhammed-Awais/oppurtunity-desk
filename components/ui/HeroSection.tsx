"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  BookOpen,
  ClipboardText,
  TrendUp,
} from "@phosphor-icons/react";

const stats = [
  { label: "Live Opportunities", value: "120+", icon: Briefcase, color: "bg-emerald-50 text-emerald-600" },
  { label: "Preparation Guides", value: "48", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { label: "Mock Tests", value: "36", icon: ClipboardText, color: "bg-violet-50 text-violet-600" },
  { label: "Students Empowered", value: "15.2k", icon: TrendUp, color: "bg-amber-50 text-amber-600" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-blue-50/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-32 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* ── Left: Content ──────────────────── */}
          <motion.div
            className="md:col-span-6 lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="eyebrow mb-6 inline-flex"
            >
              Elevating Careers in Pakistan
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95] text-zinc-900 mb-6"
            >
              Your gateway
              <br />
              to premium
              <br />
              <span className="text-accent">opportunities.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-[48ch] mb-10"
            >
              Access HEC scholarships, government jobs, and expert study materials
              curated for ambitious students across Pakistan. Build your future with
              the right resources.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/jobs"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 pl-6 pr-2 py-3 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent active:scale-[0.97]"
              >
                Explore Opportunities
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </Link>
              <Link
                href="/tests"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.97]"
              >
                Master Entry Tests
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Stat Bento ──────────────── */}
          <motion.div
            className="md:col-span-6 lg:col-span-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="card-shell"
                  >
                    <div
                      className={`card-core p-5 md:p-6 flex flex-col ${
                        i === 0 ? "animate-float" : ""
                      }`}
                      style={
                        i > 0
                          ? {
                              animation: `float ${3.5 + i * 0.5}s cubic-bezier(0.37,0,0.63,1) ${
                                i * 0.4
                              }s infinite`,
                            }
                          : undefined
                      }
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mb-4`}
                      >
                        <Icon size={20} weight="duotone" />
                      </div>
                      <span className="text-2xl md:text-3xl font-semibold font-mono tracking-tight text-zinc-900">
                        {stat.value}
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
