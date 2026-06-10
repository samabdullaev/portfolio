import type { SanitySlug } from "../types";

// A pipeline stage. `accentColor` is the single source of truth for the badge
// tint/text/dot and the board column accent (derived light + dark at render).
export interface ApplicationStatus {
  _id: string;
  label: string;
  slug: SanitySlug;
  accentColor: string;
  orderRank: string;
}

// The status as dereferenced through application.status — carries its own
// accent so the badge/board never needs a second lookup.
export interface ApplicationStatusRef {
  label: string;
  slug: string;
  accentColor: string;
}

export interface Application {
  _id: string;
  company: string;
  jobTitle: string;
  city: string | null;
  country: string | null;
  mode: string | null;
  jobLink: string | null;
  platform: string | null;
  hrNotes: string | null;
  personalNotes: string | null;
  lastUpdated: string; // ISO datetime
  status: ApplicationStatusRef | null;
}

// Statuses in board-column order (orderRank). Drives the board columns AND the
// filter list — even columns/filters with zero matching applications render.
export const applicationStatusesQuery = `*[_type == "applicationStatus"] | order(orderRank asc){
  _id, label, slug, accentColor, orderRank
}`;

// Applications newest-first. Status is dereferenced inline.
export const applicationsQuery = `*[_type == "application"] | order(lastUpdated desc){
  _id, company, jobTitle, city, country, mode, jobLink,
  "platform": platform->name,
  hrNotes, personalNotes, lastUpdated,
  status->{ label, "slug": slug.current, accentColor }
}`;
