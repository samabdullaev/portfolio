import type {
  SanityImage,
  SanitySlug,
  SanityProjectGalleryEntry,
} from "../types";

// ===== Hub =====

export interface ProjectCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  description: string;
  thumbnail: SanityImage | null;
}

// Membership + display order both come from `projectCategory.projects[]`
// (containment). The category doc owns its projects in the order it
// renders them; reordering happens via D&D in Studio.
export interface ProjectCategoryWithProjects {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
  projects: ProjectCard[];
}

export const projectCategoriesQuery = `*[_type == "projectCategory"] | order(orderRank asc){
  _id, title, slug,
  logo{ asset->{ url } },
  "projects": projects[]->{
    _id, title, slug, description, thumbnail{ asset->{ url } }
  }
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
