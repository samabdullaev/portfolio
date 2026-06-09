import type { SanitySlug } from "../types";

export interface Course {
  _id: string;
  title: string;
  provider: string | null;
  url: string;
  date: string | null;
}

// Topic membership + display order both come from `courseTopic.courses[]`
// (containment) — mirrors certificateIssuer/certificate. The hub iterates
// topics, then each topic's courses in array order.
export interface CourseTopic {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
  courses: Course[];
}

export const courseTopicsQuery = `*[_type == "courseTopic"] | order(orderRank asc){
  _id, title, slug,
  logo{ asset->{ url } },
  "courses": courses[]->{
    _id, title, provider, url, date
  }
}`;
