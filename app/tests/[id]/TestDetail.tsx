"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TakeTestClient from "./TakeTestClient";
import type { Test, Question } from "@/lib/data";
import { testService } from "@/lib/services/testService";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export default function TestDetail({ initialData }: { initialData?: Test | null }) {
  const params = useParams();
  const id = params.id as string;

  const [test, setTest] = useState<Test | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initialData && id) {
      const loadTest = async () => {
        try {
          const data = await testService.getById(id);
          if (data) {
            setTest(data);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error("Error loading test:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      loadTest();
    }
  }, [id, initialData]);

  if (loading) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto px-4 md:px-8 flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-accent animate-spin" />
          <p className="text-sm text-zinc-400">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4">
            Test not found
          </h1>
          <p className="text-zinc-500 mb-8">
            The test you are looking for does not exist.
          </p>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to Tests
          </Link>
        </div>
      </div>
    );
  }

  const questions: Question[] = test.questions || [];

  if (questions.length === 0) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4">
            {test.title}
          </h1>
          <p className="text-zinc-500 mb-8">
            No questions have been added to this test yet. Check back later.
          </p>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to Tests
          </Link>
        </div>
      </div>
    );
  }

  return <TakeTestClient test={test} questions={questions} />;
}
