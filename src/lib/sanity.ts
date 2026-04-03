import { createClient, type QueryParams } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "p43tljnq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export async function sanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}
