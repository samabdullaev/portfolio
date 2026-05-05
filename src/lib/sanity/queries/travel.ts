import type { SanityImage, SanitySlug } from "../types";

// ===== Hub =====

export interface TravelCard {
  title: string;
  slug: SanitySlug;
  flag: string;
  thumbnail: SanityImage | null;
}

export const travelDestinationsQuery = `*[_type == "travelDestination"] | order(order asc){
  title, slug, flag, thumbnail{ asset->{ url } }
}`;

// ===== Detail =====

export interface TravelDestinationDetail {
  title: string;
  flag: string;
  thumbnail: { asset: { url: string }; caption?: string };
  gallery: { _key: string; caption?: string; asset: { url: string } }[] | null;
  overview: { citiesVisited: string[]; accommodation: string[] } | null;
  placesToTravel: { _key: string; city: string; places: string[] }[] | null;
  personalTips: string[] | null;
  sections: { _key: string; title: string; items: string[] }[] | null;
}

export const travelDestinationDetailQuery = `*[_type == "travelDestination" && slug.current == $slug][0]{
  title, flag,
  thumbnail{ asset->{ url }, caption },
  gallery[]{ _key, caption, asset->{ url } },
  overview, placesToTravel[]{ _key, city, places },
  personalTips, sections[]{ _key, title, items }
}`;

export const travelDestinationSlugsQuery = `*[_type == "travelDestination"]{ slug }`;

export const travelDestinationTitleBySlugQuery = `*[_type == "travelDestination" && slug.current == $slug][0]{ title }`;
