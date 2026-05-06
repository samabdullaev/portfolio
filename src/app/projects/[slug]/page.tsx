import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  projectDetailQuery,
  projectSlugsQuery,
  projectTitleBySlugQuery,
  type ProjectDetail,
} from "@/lib/sanity/queries/projects";
import MediaGallery from "@/components/ui/MediaGallery";
import type { MediaModalItem } from "@/components/ui/MediaModal";
import DetailPage from "@/components/layout/DetailPage";
import DetailBack from "@/components/layout/DetailBack";
import DetailSection from "@/components/layout/DetailSection";

export async function generateStaticParams() {
  const projects = await sanityFetch<{ slug: { current: string } }[]>(projectSlugsQuery);
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<{ title: string } | null>(projectTitleBySlugQuery, { slug });
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} — Sam Abdullaev` };
}

const PROJECT_LINK_CLASSES =
  "inline-flex items-center gap-1.5 text-sm font-medium text-text bg-card border border-border hover:bg-hover py-2 px-4 rounded-lg transition-colors duration-200 [&_svg]:size-4";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<ProjectDetail | null>(projectDetailQuery, { slug });
  if (!project) notFound();

  // Image gallery items missing an `asset` ref (e.g. an unpublished draft
  // where the editor hasn't uploaded yet) are filtered out rather than
  // crashing the page — Sanity is a content boundary, so missing data is
  // possible. Same for galleryVideo items missing `videoUrl`.
  const galleryItems: MediaModalItem[] = [
    {
      type: "image",
      src: project.thumbnail.asset.url,
      caption: project.thumbnail.caption,
    },
    ...(project.gallery ?? []).flatMap<MediaModalItem>((g) => {
      if (g._type === "image") {
        if (!g.asset?.url) return [];
        return [{ type: "image", src: g.asset.url, caption: g.caption }];
      }
      if (!g.videoUrl) return [];
      return [{ type: "video", src: g.videoUrl, caption: g.caption }];
    }),
  ];

  return (
    <DetailPage>
      <DetailBack href="/projects" label="Back to Projects" />

      <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2 max-sm:text-2xl">
        {project.title}
      </h1>
      <p className="text-base text-text-secondary leading-normal mb-8">
        {project.description}
      </p>

      <MediaGallery items={galleryItems} title={project.title} />

      {(project.liveUrl || project.githubUrl) && (
        <DetailSection>
          <div className="flex gap-3 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={PROJECT_LINK_CLASSES}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Visit Website
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={PROJECT_LINK_CLASSES}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.742 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                View on GitHub
              </a>
            )}
          </div>
        </DetailSection>
      )}

      <DetailSection title="about">
        <div>
          <p className="text-base leading-relaxed text-text">{project.about}</p>
        </div>
      </DetailSection>

      <DetailSection title="features">
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          {project.features.map((feature) => (
            <li key={feature} className="text-base leading-normal text-text">
              {feature}
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="technology">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs font-medium text-text-secondary bg-card border border-border py-1 px-3 rounded-lg whitespace-nowrap transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </DetailSection>
    </DetailPage>
  );
}
