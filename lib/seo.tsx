import React from "react";
import type { Opportunity, Note, Test } from "@/lib/data";

// ── Site Constants ────────────────────────────────────────
export const SITE_NAME = "Opportunity Desk";
export const SITE_URL = "https://www.oppurtunitydesk.live";
export const SITE_DESCRIPTION =
  "Find latest scholarships, government jobs, CSS/NTS/GAT preparation notes, MCQs, mock tests and past papers. Pakistan's #1 student opportunity platform.";

// ── JSON-LD Component ─────────────────────────────────────
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schema Generators ─────────────────────────────────────

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/jobs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      email: "mohammadawais1711@gmail.com",
      contactType: "customer support",
      areaServed: "PK",
      availableLanguage: "English",
    },
    sameAs: [],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateJobPostingSchema(opportunity: Opportunity) {
  const isScholarship = opportunity.type === "scholarship";

  return {
    "@context": "https://schema.org",
    "@type": isScholarship ? "EducationEvent" : "JobPosting",
    name: opportunity.title,
    title: opportunity.title,
    description: opportunity.description,
    ...(isScholarship
      ? {
          organizer: {
            "@type": "Organization",
            name: opportunity.organization,
          },
          eventAttendanceMode:
            "https://schema.org/OnlineEventAttendanceMode",
        }
      : {
          hiringOrganization: {
            "@type": "Organization",
            name: opportunity.organization,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: opportunity.location,
              addressCountry: "PK",
            },
          },
          datePosted: new Date().toISOString().split("T")[0],
          validThrough: opportunity.deadline || undefined,
          employmentType: "FULL_TIME",
        }),
  };
}

export function generateCourseSchema(note: Note) {
  return {
    "@context": "https://schema.org",
    "@type": note.type === "mcq" ? "Quiz" : "Course",
    name: note.title,
    description: `${note.subject} — ${note.category} study material`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(note.type === "mcq"
      ? {
          educationalLevel: "Competitive Exam Preparation",
          about: note.subject,
        }
      : {
          courseCode: note.category,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
          },
        }),
  };
}

export function generateQuizSchema(test: Test) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: test.title,
    description: `${test.subject} practice test — ${test.questionCount} MCQs, ${test.duration}, ${test.difficulty} level`,
    educationalLevel: test.difficulty,
    about: test.subject,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    numberOfQuestions: test.questionCount,
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
