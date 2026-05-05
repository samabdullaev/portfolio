import type { SanitySlug } from "../types";

export interface BlogArticle {
  _id: string;
  title: string;
  partNumber: number;
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

export const blogSeriesQuery = `*[_type == "blogSeries"] | order(order asc){
  _id, title, shortTitle, slug,
  logo{ asset->{ url } },
  articles[]->{ _id, title, partNumber, date, externalUrl, thumbnail{ asset->{ url } } }
}`;
