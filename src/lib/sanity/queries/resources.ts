import type { SanityImage, SanitySlug } from "../types";

// ===== Hub =====

export interface ResourceItem {
  _key: string;
  name: string;
  desc: string | null;
  url: string;
}

export interface ResourceSection {
  _key: string;
  label: string;
  items: ResourceItem[];
}

// Single external resource (e.g. PostSpark, TickTick) — links out, no
// detail page.
export interface Resource {
  _id: string;
  _type: "resource";
  title: string;
  slug: SanitySlug;
  subtitle: string | null;
  thumbnail: SanityImage;
  externalUrl: string;
}

// Curated category with its own /resources/{slug} detail page.
export interface ResourceCategory {
  _id: string;
  _type: "resourceCategory";
  title: string;
  slug: SanitySlug;
  subtitle: string | null;
  thumbnail: SanityImage;
  sections: ResourceSection[];
}

// A topic-card item is either a Resource (links external) or a
// ResourceCategory (links internal). Discriminated by `_type`.
export type ResourceTopicItem = Resource | ResourceCategory;

export interface ResourceTopic {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: SanityImage | null;
  items: ResourceTopicItem[];
}

export const resourceTopicsQuery = `*[_type == "resourceTopic"] | order(orderRank asc){
  _id, title, slug,
  logo{ asset->{ url } },
  "items": items[]->{
    _id, _type, title, slug, subtitle,
    thumbnail{ asset->{ url } },
    externalUrl
  }
}`;

// ===== Detail (resourceCategory only) =====

export interface ResourceCategoryDetail {
  title: string;
  thumbnail: SanityImage;
  sections: ResourceSection[];
}

export const resourceCategoryDetailQuery = `*[_type == "resourceCategory" && slug.current == $slug][0]{
  title,
  thumbnail{ asset->{ url } },
  sections[]{ _key, label, items[]{ _key, name, desc, url } }
}`;

export const resourceCategorySlugsQuery = `*[_type == "resourceCategory"]{ slug }`;

export const resourceCategoryTitleBySlugQuery = `*[_type == "resourceCategory" && slug.current == $slug][0]{ title }`;
