import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, JsonLd, generateQuizSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { testService } from "@/lib/services/testService";
import TestDetail from "./TestDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const test = await testService.getById(id);
    if (!test) {
      return { title: "Test Not Found" };
    }

    const title = `${test.title} — ${test.questionCount} MCQs | ${test.difficulty} Level`;
    const description = `Take the ${test.title} practice test — ${test.questionCount} MCQs, ${test.duration}, ${test.difficulty} difficulty. Free online mock test for ${test.subject} preparation.`;

    return {
      title,
      description,
      keywords: [
        test.title,
        test.subject,
        `${test.subject} MCQs`,
        `${test.subject} mock test`,
        "online MCQ test",
        "practice test Pakistan",
        "free mock test",
      ],
      alternates: {
        canonical: `${SITE_URL}/tests/${id}`,
      },
      openGraph: {
        title: `${title} | ${SITE_NAME}`,
        description,
        url: `${SITE_URL}/tests/${id}`,
        type: "article",
        siteName: SITE_NAME,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return { title: "Practice Test | Opportunity Desk" };
  }
}

export default async function TakeTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let jsonLdData = null;
  try {
    const test = await testService.getById(id);
    if (test) {
      jsonLdData = test;
    }
  } catch {}

  return (
    <>
      {jsonLdData && (
        <>
          <JsonLd data={generateQuizSchema(jsonLdData)} />
          <JsonLd
            data={generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Practice Tests", url: "/tests" },
              { name: jsonLdData.title, url: `/tests/${id}` },
            ])}
          />
        </>
      )}
      <TestDetail initialData={jsonLdData} />
    </>
  );
}
