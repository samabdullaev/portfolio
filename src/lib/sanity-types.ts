// Shared Sanity types — single source of truth

export interface SanityImage {
  asset: { url: string };
}

export interface SanitySlug {
  current: string;
}

// A project gallery entry is either an image (plain Sanity image) or a video (galleryVideo object).
// Discriminated by `_type` from the GROQ projection.
export type SanityProjectGalleryEntry =
  | { _key: string; _type: "image"; asset: { url: string } }
  | { _key: string; _type: "galleryVideo"; videoUrl: string; label?: string };

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

// Project Category (filter card)
export interface SanityProjectCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: SanityImage;
  order: number;
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
  thumbnail: SanityImage;
  gallery: SanityProjectGalleryEntry[] | null;
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

// Single external resource (e.g. PostSpark, TickTick)
export interface SanityResource {
  _id: string;
  _type: "resource";
  title: string;
  slug: SanitySlug;
  subtitle: string | null;
  thumbnail: SanityImage;
  externalUrl: string;
}

// Curated category with a detail page (e.g. Interview Prep, Newsletters)
export interface SanityResourceCategory {
  _id: string;
  _type: "resourceCategory";
  title: string;
  slug: SanitySlug;
  subtitle: string | null;
  thumbnail: SanityImage;
  sectionLabel: string | null;
  items: SanityResourceItem[];
  sections: SanityResourceSection[] | null;
}

// A topic-card item is either a Resource or a ResourceCategory (discriminated by _type)
export type SanityResourceTopicItem = SanityResource | SanityResourceCategory;

export interface SanityResourceTopic {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: SanityImage | null;
  order: number;
  items: SanityResourceTopicItem[];
}

// Certificate Issuer (filter card)
export interface SanityCertificateIssuer {
  _id: string;
  name: string;
  slug: SanitySlug;
  logo: SanityImage;
  order: number;
}

// Certificate
export interface SanityCertificate {
  _id: string;
  title: string;
  issuer: SanityCertificateIssuer | { name: string; slug: SanitySlug }; // dereferenced via issuer->{...}
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
  thumbnail: SanityImage & { caption?: string };
  gallery: (SanityImage & { _key: string; caption?: string })[] | null;
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
  thumbnail: SanityImage & { caption?: string };
  gallery: (SanityImage & { _key: string; caption?: string })[] | null;
  sections: { _key: string; title: string; items: string[] }[];
}

// Journey Year (filter card)
export interface SanityJourneyYear {
  _id: string;
  year: number;
  slug: SanitySlug;
  logo: SanityImage;
  order: number;
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
