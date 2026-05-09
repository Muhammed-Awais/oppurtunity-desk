import type { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SITE_URL = "https://www.oppurtunitydesk.live";

async function getCollectionIds(collectionName: string): Promise<string[]> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error(`Error fetching ${collectionName} for sitemap:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tests`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic routes — fetch all document IDs from Firestore
  const [opportunityIds, noteIds, testIds] = await Promise.all([
    getCollectionIds("opportunities"),
    getCollectionIds("notes"),
    getCollectionIds("tests"),
  ]);

  const opportunityRoutes: MetadataRoute.Sitemap = opportunityIds.map(
    (id) => ({
      url: `${SITE_URL}/jobs/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const noteRoutes: MetadataRoute.Sitemap = noteIds.map((id) => ({
    url: `${SITE_URL}/notes/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const testRoutes: MetadataRoute.Sitemap = testIds.map((id) => ({
    url: `${SITE_URL}/tests/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...opportunityRoutes,
    ...noteRoutes,
    ...testRoutes,
  ];
}
