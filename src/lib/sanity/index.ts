// Barrel — convenient re-exports so consumers can write
// `import { sanityFetch } from "@/lib/sanity"` instead of reaching
// into client/types directly.
export { sanityClient, sanityFetch } from "./client";
export type { SanityImage, SanitySlug, SanityProjectGalleryEntry } from "./types";
