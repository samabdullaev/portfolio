import { sanityFetch } from "@/lib/sanity";
import { SanityProject, SanityImage, SanitySlug } from "@/lib/sanity-types";
import HubCard from "@/components/ui/HubCard";

interface ProjectCard {
  title: string;
  slug: SanitySlug;
  category: SanityProject["category"];
  description: string;
  thumbnail: SanityImage | null;
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<ProjectCard[]>(
    `*[_type == "project"] | order(order asc){
      title, slug, category, description, thumbnail{ asset->{ url } }
    }`,
  );

  const personal = projects.filter((p) => p.category === "personal");
  const freelance = projects.filter((p) => p.category === "freelance");
  const hackathon = projects.filter((p) => p.category === "hackathon");

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Projects</h1>
        <p className="hub-subtitle">
          A collection of personal, freelance, and hackathon projects
        </p>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Personal</h2>
        </div>
        <div className="card-grid always-visible">
          {personal.map((project) => (
            <HubCard
              key={project.slug.current}
              href={`/projects/${project.slug.current}`}
              title={project.title}
              subtitle={project.description}
              thumbnail={project.thumbnail?.asset?.url}
            />
          ))}
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Freelance</h2>
        </div>
        <div className="card-grid always-visible">
          {freelance.map((project) => (
            <HubCard
              key={project.slug.current}
              href={`/projects/${project.slug.current}`}
              title={project.title}
              subtitle={project.description}
              thumbnail={project.thumbnail?.asset?.url}
            />
          ))}
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Hackathon</h2>
        </div>
        <div className="card-grid always-visible">
          {hackathon.map((project) => (
            <HubCard
              key={project.slug.current}
              href={`/projects/${project.slug.current}`}
              title={project.title}
              subtitle={project.description}
              thumbnail={project.thumbnail?.asset?.url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
