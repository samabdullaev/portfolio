import type { SanitySlug } from "../types";

export interface JourneyUpdate {
  _id: string;
  title: string;
  /** Publish date in ISO format (YYYY-MM-DD) — 1st of the month AFTER the recap month. */
  date: string;
  linkedInUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export interface JourneyYear {
  _id: string;
  year: number;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
}

export const journeyUpdatesQuery = `*[_type == "journeyUpdate"] | order(date desc){
  _id, title, date, linkedInUrl, thumbnail{ asset->{ url } }
}`;

export const journeyYearsQuery = `*[_type == "journeyYear"] | order(year desc){
  _id, year, slug, logo{ asset->{ url } }
}`;
