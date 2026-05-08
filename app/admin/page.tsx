"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  BookOpen,
  ClipboardText,
  TrendUp,
  ArrowUpRight,
  Clock,
} from "@phosphor-icons/react";
import Link from "next/link";
import { opportunityService } from "@/lib/services/opportunityService";
import { noteService } from "@/lib/services/noteService";
import { testService } from "@/lib/services/testService";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
  },
};

export default function AdminDashboardPage() {
  const [oppCount, setOppCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentItems, setRecentItems] = useState<{ action: string; detail: string; time: string }[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [opps, notes, tests] = await Promise.all([
          opportunityService.getAll(),
          noteService.getAll(),
          testService.getAll(),
        ]);
        setOppCount(opps.length);
        setNoteCount(notes.length);
        setTestCount(tests.length);

        // Build recent activity from latest items
        const recent: { action: string; detail: string; time: string }[] = [];
        opps.slice(0, 2).forEach((opp) => {
          recent.push({
            action: opp.type === "scholarship" ? "Posted scholarship" : "Posted job",
            detail: opp.title,
            time: opp.deadline || "Recently",
          });
        });
        notes.slice(0, 2).forEach((note) => {
          recent.push({
            action: `Shared ${note.type || "text"} note`,
            detail: note.title,
            time: note.updatedAt || "Recently",
          });
        });
        tests.slice(0, 1).forEach((test) => {
          recent.push({
            action: "Created test",
            detail: test.title,
            time: "Recently",
          });
        });
        setRecentItems(recent);
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statsData = [
    {
      label: "Total Opportunities",
      value: oppCount.toString(),
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Study Notes",
      value: noteCount.toString(),
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Practice Tests",
      value: testCount.toString(),
      icon: ClipboardText,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1200px]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-zinc-400">
          Welcome back. Here is an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card-shell">
              <div className="card-core p-5 md:p-6">
                <div className="h-10 w-10 rounded-xl skeleton mb-4" />
                <div className="h-7 w-16 skeleton mb-2" />
                <div className="h-4 w-28 skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants} className="card-shell">
                <div className="card-core p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                      <Icon size={20} weight="duotone" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold font-mono tracking-tight text-zinc-900 mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-4 card-shell"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <div className="card-core p-6 md:p-8">
            <h2 className="text-base font-semibold text-zinc-900 mb-5">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/post"
                className="group flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:bg-emerald-50 hover:text-accent active:scale-[0.98]"
              >
                <span className="flex items-center gap-3">
                  <Briefcase size={18} weight="regular" />
                  Post Opportunity
                </span>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-zinc-400 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/admin/notes/create"
                className="group flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
              >
                <span className="flex items-center gap-3">
                  <BookOpen size={18} weight="regular" />
                  Share Notes
                </span>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-zinc-400 transition-all duration-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/admin/jobs"
                className="group flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:bg-violet-50 hover:text-violet-600 active:scale-[0.98]"
              >
                <span className="flex items-center gap-3">
                  <ClipboardText size={18} weight="regular" />
                  Manage Content
                </span>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-zinc-400 transition-all duration-300 group-hover:text-violet-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-8 card-shell"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <div className="card-core p-6 md:p-8">
            <h2 className="text-base font-semibold text-zinc-900 mb-5">
              Recent Activity
            </h2>
            {recentItems.length === 0 && !loading ? (
              <div className="py-8 text-center">
                <p className="text-sm text-zinc-400">
                  No activity yet. Start by posting an opportunity or sharing notes.
                </p>
              </div>
            ) : (
              <div className="space-y-0 divide-y divide-zinc-100">
                {recentItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 flex-shrink-0 mt-0.5">
                      <Clock size={14} weight="regular" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-800 leading-snug">
                        {item.action}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5 truncate">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-[11px] text-zinc-400 flex-shrink-0 mt-0.5">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
