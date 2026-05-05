import type {
  SanityImage,
  SanitySlug,
  SanityProjectGalleryEntry,
} from "../types";

export type ProjectCategory = "personal" | "freelance" | "hackathon";

// ===== Hub =====

export interface ProjectCard {
  title: string;
  slug: SanitySlug;
  category: ProjectCategory;
  description: string;
  thumbnail: SanityImage | null;
}

export interface ProjectCategoryCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
}

export const projectsListQuery = `*[_type == "project"] | order(order asc){
  title, slug, category, description, thumbnail{ asset->{ url } }
}`;

export const projectCategoriesQuery = `*[_type == "projectCategory"] | order(order asc){
  _id, title, slug, logo{ asset->{ url } }
}`;

// ===== Detail =====

export interface ProjectDetail {
  title: string;
  description: string;
  about: string;
  features: string[];
  techStack: string[];
  thumbnail: { asset: { url: string }; caption?: string };
  gallery: SanityProjectGalleryEntry[] | null;
  liveUrl: string | null;
  githubUrl: string | null;
}

export const projectDetailQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, description, about, features, techStack,
  thumbnail{ asset->{ url }, caption },
  gallery[]{
    _key, _type, caption,
    _type == "image" => { asset->{ url } },
    _type == "galleryVideo" => { videoUrl }
  },
  liveUrl, githubUrl
}`;

export const projectSlugsQuery = `*[_type == "project"]{ slug }`;

export const projectTitleBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{ title }`;
