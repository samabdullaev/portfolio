import type { SanityImage } from "../types";

export interface AboutPage {
  profileImage: SanityImage;
  bioParagraphs: {
    _key: string;
    summary: string;
    expandedText: string;
  }[];
  contributions: {
    _key: string;
    title: string;
    description: string;
    url: string;
    tag?: string;
    subtitle?: string;
    channelName?: string;
    channelStatus?: string;
    activities?: string[];
  }[];
  hobbies: { _key: string; emoji: string; label: string }[];
}

export interface BentoLatestPost {
  title: string;
  month: number;
  year: number;
  linkedInUrl: string;
  thumbnailUrl: string | null;
}

export interface BentoLatestArticle {
  title: string;
  date: string;
  externalUrl: string;
}

export interface AboutPageData {
  about: AboutPage | null;
  latestPosts: BentoLatestPost[];
  latestArticle: BentoLatestArticle | null;
}

// Combined query — fetches the singleton plus the live "latest"
// previews used by the bento (LinkedIn slot's recent posts panel and
// the Medium slot's article tile) in one round-trip.
export const aboutPageQuery = `{
  "about": *[_id == "aboutPage"][0]{
    profileImage{ asset->{ url } },
    bioParagraphs[]{ _key, summary, expandedText },
    contributions[]{ _key, title, description, url, tag, subtitle, channelName, channelStatus, activities },
    hobbies[]{ _key, emoji, label }
  },
  "latestPosts": *[_type == "journeyUpdate"] | order(year desc, month desc)[0...5]{
    title, month, year, linkedInUrl, "thumbnailUrl": thumbnail.asset->url
  },
  "latestArticle": *[_type == "blogArticle"] | order(date desc)[0]{
    title, date, externalUrl
  }
}`;
