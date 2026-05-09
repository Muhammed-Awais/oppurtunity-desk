"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  FilePdf,
  ListChecks,
  DownloadSimple,
  CheckCircle,
  XCircle,
  Trophy,
  ArrowCounterClockwise,
  House,
} from "@phosphor-icons/react";
import { noteService } from "@/lib/services/noteService";
import type { Note, Question } from "@/lib/data";
import { cn } from "@/lib/cn";

export default function NoteDetail() {
  const params = useParams();
  const id = params.id as string;

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await noteService.getById(id);
        if (data) {
          setNote(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading note:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadNote();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-accent animate-spin" />
          <p className="text-sm text-zinc-400">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4">
            Note not found
          </h1>
          <p className="text-zinc-500 mb-8">
            The note you are looking for does not exist.
          </p>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  const noteType = note.type || "text";

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Back link */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-all duration-300 mb-6"
        >
          <ArrowLeft size={14} weight="bold" />
          Back to notes
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={cn(
              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
              noteType === "text" ? "bg-blue-50 text-blue-700" :
              noteType === "pdf" ? "bg-rose-50 text-rose-700" :
              "bg-violet-50 text-violet-700"
            )}>
              {noteType}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-medium text-zinc-500 uppercase tracking-[0.12em]">
              {note.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            {note.title}
          </h1>
          <p className="text-sm text-zinc-500">
            {note.subject} · Updated {note.updatedAt}
          </p>
        </motion.div>

        {/* Content by type */}
        {noteType === "text" && <TextNoteContent content={note.content || ""} />}
        {noteType === "pdf" && <PdfNoteContent pdfUrl={note.pdfUrl || ""} noteId={note.id} />}
        {noteType === "mcq" && <McqNoteContent questions={note.questions || []} title={note.title} />}
      </div>
    </div>
  );
}

/* ── Text Note Renderer ──────────────────── */
function TextNoteContent({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
      className="card-shell"
    >
      <div className="card-core p-6 md:p-10">
        <div className="prose prose-zinc max-w-none">
          {content.split("\n").map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-zinc-700 mb-4 last:mb-0">
              {paragraph || <br />}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── PDF Note Renderer ───────────────────── */
function PdfNoteContent({ pdfUrl, noteId }: { pdfUrl: string; noteId: string }) {
  const handleDownload = async () => {
    try {
      await noteService.incrementDownloads(noteId);
    } catch {}
    window.open(pdfUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
      className="card-shell"
    >
      <div className="card-core p-8 md:p-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-500 mx-auto mb-6">
          <FilePdf size={40} weight="duotone" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">
          PDF Document
        </h2>
        <p className="text-sm text-zinc-400 mb-8 max-w-[40ch] mx-auto">
          This study material is available as a PDF. Click below to open or download it.
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
        >
          <DownloadSimple size={18} weight="bold" />
          Open PDF
        </button>
        <p className="text-[11px] text-zinc-400 mt-4 break-all max-w-md mx-auto">
          {pdfUrl}
        </p>
      </div>
    </motion.div>
  );
}

/* ── MCQ Quiz Renderer ───────────────────── */
function McqNoteContent({ questions, title }: { questions: Question[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (submitted) return;
      setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    },
    [question, submitted]
  );

  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
  }, [currentIndex, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleSubmit = useCallback(() => setSubmitted(true), []);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
  }, []);

  const score = submitted
    ? questions.reduce((acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0), 0)
    : 0;
  const scorePercent = submitted ? Math.round((score / totalQuestions) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="card-shell">
        <div className="card-core p-8 text-center">
          <p className="text-sm text-zinc-400">No questions available for this quiz.</p>
        </div>
      </div>
    );
  }

  /* ── Results ─────────────────────── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
        className="card-shell"
      >
        <div className="card-core p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-500 mx-auto mb-8"
          >
            <Trophy size={40} weight="duotone" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Quiz Complete
          </h2>
          <p className="text-sm text-zinc-500 mb-8">{title}</p>

          {/* Score Circle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
            className="flex flex-col items-center mb-10"
          >
            <div className="relative flex items-center justify-center w-36 h-36 mb-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="62" fill="none" stroke="#f4f4f5" strokeWidth="8" />
                <motion.circle
                  cx="72" cy="72" r="62" fill="none"
                  stroke={scorePercent >= 60 ? "#059669" : "#ef4444"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 62}
                  initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 62 * (1 - scorePercent / 100) }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
                />
              </svg>
              <span className="text-3xl font-semibold font-mono text-zinc-900">{scorePercent}%</span>
            </div>
            <p className="text-sm text-zinc-500">
              You answered <span className="font-semibold text-zinc-800">{score}</span> out of{" "}
              <span className="font-semibold text-zinc-800">{totalQuestions}</span> questions correctly
            </p>
          </motion.div>

          {/* Question Review */}
          <div className="space-y-3 mb-10 text-left">
            {questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: [0.32, 0.72, 0, 1] as const }}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl p-4 border",
                    isCorrect ? "bg-emerald-50/50 border-emerald-200/50" : "bg-rose-50/50 border-rose-200/50"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle size={20} weight="fill" className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={20} weight="fill" className="text-rose-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-800 leading-snug">{q.text}</p>
                    {!isCorrect && (
                      <p className="text-xs text-emerald-600 mt-1">Correct: {q.options[q.correctIndex]}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
            >
              <ArrowCounterClockwise size={16} weight="bold" />
              Retry Quiz
            </button>
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-50 active:scale-[0.97]"
            >
              <House size={16} weight="regular" />
              All Notes
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── Quiz In Progress ──────────── */
  return (
    <>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-400">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-mono text-zinc-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] as const }}
          className="card-shell mb-8"
        >
          <div className="card-core p-6 md:p-8">
            <p className="text-base md:text-lg font-medium text-zinc-900 leading-relaxed mb-6">
              {question.text}
            </p>
            <div className="space-y-3">
              {question.options.map((option, optIdx) => {
                const isSelected = answers[question.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(optIdx)}
                    className={cn(
                      "w-full flex items-center gap-4 rounded-2xl border p-4 text-left text-sm transition-all duration-300 active:scale-[0.98]",
                      isSelected
                        ? "border-accent/30 bg-emerald-50/60 text-zinc-900"
                        : "border-zinc-100 bg-white text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-300",
                        isSelected ? "bg-accent text-white" : "bg-zinc-100 text-zinc-500"
                      )}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
            currentIndex === 0 ? "text-zinc-300 cursor-not-allowed" : "text-zinc-600 hover:bg-zinc-100"
          )}
        >
          <ArrowLeft size={15} weight="bold" />
          Previous
        </button>

        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < totalQuestions}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
              Object.keys(answers).length < totalQuestions
                ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-accent text-white hover:bg-accent-dark"
            )}
          >
            Submit Quiz
            <CheckCircle size={16} weight="bold" />
          </button>
        ) : (
          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-zinc-800 active:scale-[0.97]"
          >
            Next
            <ArrowRight size={15} weight="bold" />
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              i === currentIndex
                ? "bg-accent scale-125"
                : answers[q.id] !== undefined
                ? "bg-zinc-400"
                : "bg-zinc-200"
            )}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
