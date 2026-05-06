import type { SanitySlug } from "../types";

export interface BlogArticle {
  _id: string;
  title: string;
  date: string;
  externalUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export interface BlogSeries {
  _id: string;
  title: string;
  shortTitle: string | null;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
  articles: BlogArticle[];
}

// `Part N` labels are derived from each article's index inside
// `blogSeries.articles[]` — the parent's array IS the ordering, so a
// dedicated partNumber field would just duplicate that information.
export const blogSeriesQuery = `*[_type == "blogSeries"] | order(orderRank asc){
  _id, title, shortTitle, slug,
  logo{ asset->{ url } },
  articles[]->{ _id, title, date, externalUrl, thumbnail{ asset->{ url } } }
}`;
