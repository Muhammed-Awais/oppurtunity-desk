import type { Metadata } from "next";
import TakeTestClient from "./TakeTestClient";
import { tests, quizQuestions } from "@/lib/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const test = tests.find((t) => t.id === id);
  return {
    title: test ? test.title : "Take Test",
    description: test
      ? `Practice ${test.questionCount} MCQs in ${test.subject}. Timed quiz with instant scoring.`
      : "Take a practice test on Opportunity Desk.",
  };
}

export function generateStaticParams() {
  return tests.map((t) => ({ id: t.id }));
}

export default async function TakeTestPage({ params }: PageProps) {
  const { id } = await params;
  const test = tests.find((t) => t.id === id);
  const questions = quizQuestions[id] ?? [];

  if (!test) {
    return (
      <div className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4">
            Test not found
          </h1>
          <p className="text-zinc-500">
            The test you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <TakeTestClient test={test} questions={questions} />;
}
