import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import Gallery from "@/components/ui/Gallery";
import "@/app/project-detail.css";

export async function generateStaticParams() {
  const projects = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`,
  );
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<{ title: string } | null>(
    `*[_type == "project" && slug.current == $slug][0]{ title }`,
    { slug },
  );
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} — Sam Abdullaev` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<{
    title: string;
    description: string;
    about: string;
    features: string[];
    techStack: string[];
    gallery: { _key: string; type: string; image?: { asset: { url: string } }; videoUrl?: string }[];
    liveUrl: string | null;
    githubUrl: string | null;
  } | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      title, description, about, features, techStack,
      gallery[]{ _key, type, image{ asset->{ url } }, videoUrl },
      liveUrl, githubUrl
    }`,
    { slug },
  );
  if (!project) notFound();

  const galleryItems = (project.gallery || []).map((g) => ({
    type: g.type as "image" | "video",
    src: g.type === "image" ? (g.image?.asset?.url || "") : (g.videoUrl || ""),
  }));

  return (
    <main>
      <article className="project-detail">
        <Link href="/projects" className="project-back">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Projects
        </Link>

        <h1 className="project-title">{project.title}</h1>
        <p className="project-description">{project.description}</p>

        <Gallery items={galleryItems} title={project.title} />

        {(project.liveUrl || project.githubUrl) && (
          <div className="project-section">
            <div className="project-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
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
                  className="project-link"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.742 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        )}

        <div className="project-section">
          <h2 className="project-section-title">about</h2>
          <div className="project-about">
            <p>{project.about}</p>
          </div>
        </div>

        <div className="project-section">
          <h2 className="project-section-title">features</h2>
          <ul className="project-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="project-section">
          <h2 className="project-section-title">technology</h2>
          <div className="project-tech">
            {project.techStack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
