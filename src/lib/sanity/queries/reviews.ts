import type { SanityImage, SanitySlug } from "../types";

// ===== Hub =====

export interface ReviewCard {
  year: number;
  slug: SanitySlug;
  thumbnail: SanityImage;
}

export const reviewsListQuery = `*[_type == "yearlyReview"] | order(year desc){
  year, slug, thumbnail{ asset->{ url } }
}`;

// ===== Detail =====

export interface YearlyReviewDetail {
  year: number;
  thumbnail: { asset: { url: string }; caption?: string };
  gallery: { _key: string; caption?: string; asset: { url: string } }[] | null;
  sections: { _key: string; title: string; items: string[] }[];
}

export const yearlyReviewDetailQuery = `*[_type == "yearlyReview" && slug.current == $year][0]{
  year,
  thumbnail{ asset->{ url }, caption },
  gallery[]{ _key, caption, asset->{ url } },
  sections[]{ _key, title, items }
}`;

export const yearlyReviewSlugsQuery = `*[_type == "yearlyReview"]{ slug }`;

export const yearlyReviewYearBySlugQuery = `*[_type == "yearlyReview" && slug.current == $year][0]{ year }`;
