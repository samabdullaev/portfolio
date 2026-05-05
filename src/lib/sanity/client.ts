import { createClient, type QueryParams } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local (see .env.example).",
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export async function sanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}
