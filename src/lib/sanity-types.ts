// Shared Sanity types — single source of truth

export interface SanityImage {
  asset: { url: string };
}

export interface SanitySlug {
  current: string;
}

export interface SanityGalleryItem {
  _key: string;
  type: "image" | "video";
  image?: SanityImage;
  videoUrl?: string;
}

// Home Page
export interface SanityHomePage {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  profileImage: SanityImage;
  socials: { _key: string; platform: string; url: string }[];
  resumeFile?: { asset: { url: string } };
  ctaLabel: string;
  ctaUrl: string;
}

// About Page
export interface SanityAboutPage {
  profileImage: SanityImage;
  bioParagraphs: {
    _key: string;
    summary: string;
    expandedText: string;
  }[];
  contributions: {
    _key: string;
    emoji: string;
    title: string;
    description: string;
    url: string;
  }[];
  hobbies: { _key: string; emoji: string; label: string }[];
}

// Project
export interface SanityProject {
  title: string;
  slug: SanitySlug;
  category: "personal" | "freelance" | "hackathon";
  description: string;
  about: string;
  features: string[];
  techStack: string[];
  gallery: SanityGalleryItem[];
  thumbnail: SanityImage;
  liveUrl: string | null;
  githubUrl: string | null;
  order: number;
}

// Blog
export interface SanityBlogArticle {
  _id: string;
  title: string;
  partNumber: number;
  date: string;
  externalUrl: string;
  thumbnail: SanityImage;
}

export interface SanityBlogSeries {
  title: string;
  slug: SanitySlug;
  articles: SanityBlogArticle[];
  order: number;
}

// Resource
export interface SanityResourceItem {
  _key: string;
  name: string;
  desc: string | null;
  url: string;
}

export interface SanityResourceSection {
  _key: string;
  label: string;
  items: SanityResourceItem[];
}

export interface SanityResourceCategory {
  title: string;
  slug: SanitySlug;
  sectionLabel: string;
  gradientFrom: string;
  gradientTo: string;
  items: SanityResourceItem[];
  sections: SanityResourceSection[] | null;
  order: number;
}

// Certificate
export interface SanityCertificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  image: SanityImage;
  verifyUrl: string | null;
  order: number;
}

// Travel
export interface SanityTravelDestination {
  title: string;
  slug: SanitySlug;
  flag: string;
  thumbnail: SanityImage;
  overview: {
    citiesVisited: string[];
    accommodation: string[];
  } | null;
  placesToTravel:
    | { _key: string; city: string; places: string[] }[]
    | null;
  personalTips: string[] | null;
  sections:
    | { _key: string; title: string; items: string[] }[]
    | null;
  order: number;
}

// Yearly Review
export interface SanityYearlyReview {
  year: number;
  slug: SanitySlug;
  gradientFrom: string;
  gradientTo: string;
  sections: { _key: string; title: string; items: string[] }[];
}

// Journey Update
export interface SanityJourneyUpdate {
  _id: string;
  title: string;
  month: number;
  year: number;
  thumbnail: SanityImage;
  linkedInUrl: string;
  order: number;
}

// Mentorship
export interface SanityMentorshipArticle {
  _id: string;
  title: string;
  task: string;
  date: string;
  thumbnail: SanityImage;
  externalUrl: string;
  order: number;
}
