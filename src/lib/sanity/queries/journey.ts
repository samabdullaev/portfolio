import type { SanitySlug } from "../types";

export interface JourneyUpdate {
  _id: string;
  title: string;
  year: number;
  linkedInUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export interface JourneyYear {
  _id: string;
  year: number;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
}

export const journeyUpdatesQuery = `*[_type == "journeyUpdate"] | order(order asc){
  _id, title, year, linkedInUrl, thumbnail{ asset->{ url } }
}`;

export const journeyYearsQuery = `*[_type == "journeyYear"] | order(orderRank asc){
  _id, year, slug, logo{ asset->{ url } }
}`;
