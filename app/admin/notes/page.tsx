"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  TrashSimple,
  MagnifyingGlass,
  PlusCircle,
  FileText,
  FilePdf,
  ListChecks,
} from "@phosphor-icons/react";
import { type Note } from "@/lib/data";
import { noteService } from "@/lib/services/noteService";
import { cn } from "@/lib/cn";

const typeIcons: Record<string, typeof FileText> = {
  text: FileText,
  pdf: FilePdf,
  mcq: ListChecks,
};

const typeColors: Record<string, string> = {
  text: "bg-blue-50 text-blue-600",
  pdf: "bg-rose-50 text-rose-600",
  mcq: "bg-violet-50 text-violet-600",
};

const typeBadgeColors: Record<string, string> = {
  text: "bg-blue-50 text-blue-700",
  pdf: "bg-rose-50 text-rose-700",
  mcq: "bg-violet-50 text-violet-700",
};

export default function AdminNotesPage() {
  const [items, setItems] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await noteService.getAll();
        setItems(data);
      } catch (err) {
        console.error("Error loading notes:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = search.trim()
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.subject.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  const handleDelete = async (id: string) => {
    try {
      await noteService.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-[1000px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
            Manage Notes
          </h1>
          <p className="text-sm text-zinc-400">
            {items.length} total notes shared
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
              <MagnifyingGlass size={16} weight="regular" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
            />
          </div>

          {/* Create Button */}
          <Link
            href="/admin/notes/create"
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97] whitespace-nowrap"
          >
            <PlusCircle size={18} weight="bold" />
            Create Note
          </Link>
        </div>
      </div>

      {/* List */}
      <motion.div
        className="card-shell"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
      >
        <div className="card-core divide-y divide-zinc-100">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-accent animate-spin" />
              <p className="text-sm text-zinc-400">Loading notes...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-zinc-400">
                {items.length === 0
                  ? "No notes shared yet. Create your first note."
                  : "No notes matching your search."}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((item) => {
                const noteType = item.type || "text";
                const TypeIcon = typeIcons[noteType] || FileText;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-4 p-5 md:p-6">
                      {/* Type Icon */}
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                          typeColors[noteType] || "bg-zinc-50 text-zinc-500"
                        )}
                      >
                        <TypeIcon size={20} weight="duotone" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-zinc-900 leading-snug truncate">
                              {item.title}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-0.5">
                              {item.subject} — {item.category}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] flex-shrink-0",
                              typeBadgeColors[noteType] || "bg-zinc-100 text-zinc-600"
                            )}
                          >
                            {noteType}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {item.downloads?.toLocaleString() || 0} downloads
                          </span>
                          {item.type === "mcq" && item.questions && (
                            <span className="text-[11px] text-zinc-400 font-mono">
                              {item.questions.length} questions
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => setDeleteTarget(item.id)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 active:scale-[0.93]"
                          aria-label={`Delete ${item.title}`}
                        >
                          <TrashSimple size={16} weight="regular" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
              className="card-shell max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-core p-6 md:p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mx-auto mb-4">
                  <TrashSimple size={24} weight="duotone" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                  Delete Note?
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  This action cannot be undone. The note will be permanently
                  removed.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-50 active:scale-[0.97]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteTarget)}
                    className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-rose-600 active:scale-[0.97]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
