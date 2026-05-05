// Shared Sanity primitive types — used across multiple query files.
// Domain-specific result types live in queries/{domain}.ts alongside
// their GROQ strings so query and shape stay in lockstep.

export interface SanityImage {
  asset: { url: string };
}

export interface SanitySlug {
  current: string;
}

// A project gallery entry is either an image (plain Sanity image) or a
// video (galleryVideo object). Discriminated by `_type` from the GROQ
// projection.
export type SanityProjectGalleryEntry =
  | { _key: string; _type: "image"; asset: { url: string }; caption?: string }
  | { _key: string; _type: "galleryVideo"; videoUrl: string; caption?: string };
