import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, JsonLd, generateJobPostingSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { opportunityService } from "@/lib/services/opportunityService";
import OpportunityDetail from "./OpportunityDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const opportunity = await opportunityService.getById(id);
    if (!opportunity) {
      return { title: "Opportunity Not Found" };
    }

    const title = `${opportunity.title} — ${opportunity.type === "scholarship" ? "Scholarship" : "Job"} in ${opportunity.location || "Pakistan"}`;
    const description = opportunity.description?.slice(0, 155) + "..." || `${opportunity.title} at ${opportunity.organization}`;

    return {
      title,
      description,
      keywords: [
        opportunity.title,
        opportunity.organization,
        opportunity.type,
        opportunity.location,
        ...(opportunity.tags || []),
        "Pakistan",
      ].filter(Boolean),
      alternates: {
        canonical: `${SITE_URL}/jobs/${id}`,
      },
      openGraph: {
        title: `${title} | ${SITE_NAME}`,
        description,
        url: `${SITE_URL}/jobs/${id}`,
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
    return { title: "Opportunity | Opportunity Desk" };
  }
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch for JSON-LD (best-effort, won't block render if it fails)
  let jsonLdData = null;
  try {
    const opportunity = await opportunityService.getById(id);
    if (opportunity) {
      jsonLdData = opportunity;
    }
  } catch {}

  return (
    <>
      {jsonLdData && (
        <>
          <JsonLd data={generateJobPostingSchema(jsonLdData)} />
          <JsonLd
            data={generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Opportunities", url: "/jobs" },
              { name: jsonLdData.title, url: `/jobs/${id}` },
            ])}
          />
        </>
      )}
      <OpportunityDetail initialData={jsonLdData} />
    </>
  );
}
