"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  PlusCircle,
  TrashSimple,
  FileText,
  FilePdf,
  ListChecks,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { noteService } from "@/lib/services/noteService";
import type { Question } from "@/lib/data";

const noteTypes = [
  { value: "text", label: "Text Note", icon: FileText, desc: "Share written content or study material" },
  { value: "pdf", label: "PDF Link", icon: FilePdf, desc: "Share a link to a PDF document" },
  { value: "mcq", label: "MCQ Quiz", icon: ListChecks, desc: "Create multiple choice questions" },
] as const;

type NoteType = (typeof noteTypes)[number]["value"];

export default function AdminCreateNotePage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<NoteType>("text");
  const [content, setContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // MCQ question management
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `q${Date.now()}`,
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number | string[]) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!title.trim() || !subject.trim() || !category.trim()) {
      setError("Please fill in title, subject, and category.");
      setLoading(false);
      return;
    }

    if (type === "text" && !content.trim()) {
      setError("Please enter the note content.");
      setLoading(false);
      return;
    }

    if (type === "pdf" && !pdfUrl.trim()) {
      setError("Please enter the PDF URL.");
      setLoading(false);
      return;
    }

    if (type === "mcq") {
      if (questions.length === 0) {
        setError("Please add at least one question.");
        setLoading(false);
        return;
      }
      const invalid = questions.find(
        (q) => !q.text.trim() || q.options.some((o) => !o.trim())
      );
      if (invalid) {
        setError("All questions must have text and all four options filled.");
        setLoading(false);
        return;
      }
    }

    try {
      const now = new Date();
      const noteData: any = {
        title,
        subject,
        category,
        type,
        pages: type === "text" ? Math.max(1, Math.ceil(content.length / 3000)) : type === "mcq" ? questions.length : 0,
        downloads: 0,
        updatedAt: now.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };

      if (type === "text") noteData.content = content;
      if (type === "pdf") noteData.pdfUrl = pdfUrl;
      if (type === "mcq") noteData.questions = questions;

      await noteService.add(noteData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setSubject("");
    setCategory("");
    setType("text");
    setContent("");
    setPdfUrl("");
    setQuestions([]);
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-10 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
          className="card-shell"
        >
          <div className="card-core p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-accent mx-auto mb-6"
            >
              <CheckCircle size={32} weight="fill" />
            </motion.div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
              Note Shared Successfully
            </h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-[36ch] mx-auto">
              Your {type === "mcq" ? "MCQ quiz" : type === "pdf" ? "PDF resource" : "text note"} has been published and is now available to students.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
            >
              Share Another Note
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[800px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
          Share Notes
        </h1>
        <p className="text-sm text-zinc-400">
          Create and share study material with students — text notes, PDF links, or MCQ quizzes.
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
        className="card-shell"
      >
        <div className="card-core p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Note Type Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-zinc-700">
                Note Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {noteTypes.map((nt) => {
                  const Icon = nt.icon;
                  return (
                    <button
                      key={nt.value}
                      type="button"
                      onClick={() => setType(nt.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-300 active:scale-[0.97]",
                        type === nt.value
                          ? "border-accent bg-emerald-50/50 text-accent"
                          : "border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50"
                      )}
                    >
                      <Icon size={24} weight={type === nt.value ? "duotone" : "regular"} />
                      <span className="text-sm font-semibold">{nt.label}</span>
                      <span className="text-[11px] text-zinc-400 text-center leading-tight">{nt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="note-title" className="block text-sm font-medium text-zinc-700">
                Title
              </label>
              <input
                id="note-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete CSS & NTS Guide"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
              />
            </div>

            {/* Subject + Category row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="note-subject" className="block text-sm font-medium text-zinc-700">
                  Subject
                </label>
                <input
                  id="note-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. General Knowledge"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="note-category" className="block text-sm font-medium text-zinc-700">
                  Category
                </label>
                <input
                  id="note-category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. CSS/PMS, GAT/NTS, Entry Test"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
                />
              </div>
            </div>

            {/* Conditional Content Fields */}
            {type === "text" && (
              <div className="space-y-2">
                <label htmlFor="note-content" className="block text-sm font-medium text-zinc-700">
                  Content
                </label>
                <textarea
                  id="note-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note content here. You can include detailed explanations, formulas, key points, etc..."
                  required
                  rows={12}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10 resize-none font-mono leading-relaxed"
                />
                <p className="text-[11px] text-zinc-400">
                  {content.length} characters · ~{Math.max(1, Math.ceil(content.length / 3000))} pages
                </p>
              </div>
            )}

            {type === "pdf" && (
              <div className="space-y-2">
                <label htmlFor="note-pdf" className="block text-sm font-medium text-zinc-700">
                  PDF URL
                </label>
                <input
                  id="note-pdf"
                  type="url"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/...  or any direct PDF link"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
                />
                <p className="text-[11px] text-zinc-400">
                  Paste a link to a PDF hosted on Google Drive, Dropbox, or any other service
                </p>
              </div>
            )}

            {type === "mcq" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-zinc-700">
                    Questions ({questions.length})
                  </label>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent/20 active:scale-[0.97]"
                  >
                    <PlusCircle size={14} weight="bold" />
                    Add Question
                  </button>
                </div>

                {questions.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-zinc-200 py-10 text-center">
                    <ListChecks size={32} className="text-zinc-300 mx-auto mb-3" weight="duotone" />
                    <p className="text-sm text-zinc-400">No questions added yet.</p>
                    <p className="text-xs text-zinc-400 mt-1">Click &ldquo;Add Question&rdquo; to start building your quiz.</p>
                  </div>
                )}

                {questions.map((q, qIndex) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-600 flex-shrink-0 mt-1">
                        {qIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                        placeholder="Enter your question..."
                        className="flex-1 rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10"
                      />
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 active:scale-[0.93] flex-shrink-0 mt-0.5"
                        aria-label="Remove question"
                      >
                        <TrashSimple size={16} weight="regular" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-10">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="relative">
                          <button
                            type="button"
                            onClick={() => updateQuestion(qIndex, "correctIndex", optIdx)}
                            className={cn(
                              "absolute left-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300",
                              q.correctIndex === optIdx
                                ? "border-accent bg-accent text-white"
                                : "border-zinc-300 hover:border-accent"
                            )}
                            aria-label={`Mark option ${String.fromCharCode(65 + optIdx)} as correct`}
                          >
                            {q.correctIndex === optIdx && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => updateOption(qIndex, optIdx, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-400 pl-10">
                      Click the circle to mark the correct answer
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-rose-500 bg-rose-50 rounded-xl px-4 py-3 border border-rose-200/50"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !title.trim() || !subject.trim() || !category.trim()}
                className={cn(
                  "group w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent active:scale-[0.98]",
                  (loading || !title.trim() || !subject.trim() || !category.trim()) &&
                    "opacity-60 cursor-not-allowed hover:bg-zinc-900"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  <>
                    Share Note
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
