import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, JsonLd, generateCourseSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { noteService } from "@/lib/services/noteService";
import NoteDetail from "./NoteDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await noteService.getById(id);
    if (!note) {
      return { title: "Note Not Found" };
    }

    const typeLabel = note.type === "mcq" ? "MCQs" : note.type === "pdf" ? "PDF Notes" : "Study Notes";
    const title = `${note.title} — ${typeLabel} for ${note.category}`;
    const description = note.type === "mcq"
      ? `Practice ${note.questions?.length || 0} MCQs on ${note.subject} for ${note.category} preparation. Free online quiz with instant results.`
      : `${note.subject} ${typeLabel.toLowerCase()} for ${note.category} exam preparation. Download free study material on Opportunity Desk.`;

    return {
      title,
      description,
      keywords: [
        note.title,
        note.subject,
        note.category,
        `${note.category} notes`,
        `${note.subject} MCQs`,
        `${note.category} preparation`,
        "study notes Pakistan",
        "free notes download",
      ],
      alternates: {
        canonical: `${SITE_URL}/notes/${id}`,
      },
      openGraph: {
        title: `${title} | ${SITE_NAME}`,
        description,
        url: `${SITE_URL}/notes/${id}`,
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
    return { title: "Study Notes | Opportunity Desk" };
  }
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let jsonLdData = null;
  try {
    const note = await noteService.getById(id);
    if (note) {
      jsonLdData = note;
    }
  } catch {}

  return (
    <>
      {jsonLdData && (
        <>
          <JsonLd data={generateCourseSchema(jsonLdData)} />
          <JsonLd
            data={generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Study Notes", url: "/notes" },
              { name: jsonLdData.title, url: `/notes/${id}` },
            ])}
          />
        </>
      )}
      <NoteDetail />
    </>
  );
}
