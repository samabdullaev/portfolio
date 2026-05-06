import type { SanityImage } from "../types";

export interface HomePageData {
  name: string;
  title: string;
  location: string;
  profileImage: SanityImage;
  socials: { _key: string; platform: string; url: string }[];
  resumeFile?: { asset: { url: string } };
  ctaLabel: string;
  ctaUrl: string;
}

export const homePageQuery = `*[_id == "homePage"][0]{
  name, title, location,
  profileImage{ asset->{ url } },
  socials[]{ _key, platform, url },
  resumeFile{ asset->{ url } },
  ctaLabel, ctaUrl
}`;
