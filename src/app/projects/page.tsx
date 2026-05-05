import { sanityFetch } from "@/lib/sanity";
import {
  projectsListQuery,
  projectCategoriesQuery,
  type ProjectCard,
  type ProjectCategoryCard,
} from "@/lib/sanity/queries/projects";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;

  // Fetch projects + categories in parallel.
  const [projects, categories] = await Promise.all([
    sanityFetch<ProjectCard[]>(projectsListQuery),
    sanityFetch<ProjectCategoryCard[]>(projectCategoriesQuery),
  ]);

  // Group projects by category slug
  const groups: Record<string, ProjectCard[]> = {};
  for (const p of projects) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }

  // Filter row — skip categories with no projects
  const filterItems: FilterCardItem[] = categories
    .filter((c) => (groups[c.slug.current]?.length ?? 0) > 0)
    .map((c) => ({
      id: c._id,
      name: c.title,
      slug: c.slug.current,
      count: groups[c.slug.current]?.length ?? 0,
      thumbnail: c.logo?.asset?.url,
    }));

  // Visible category sections
  const visibleCategories = activeSlug
    ? categories.filter((c) => c.slug.current === activeSlug)
    : categories;

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Projects</h1>
        <p className="hub-subtitle">
          A collection of personal, freelance, and hackathon projects
        </p>
      </div>

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/projects"
        paramName="category"
      />

      {visibleCategories.map((category) => {
        const items = groups[category.slug.current] ?? [];
        if (items.length === 0) return null;
        return (
          <div className="topic-section" key={category._id}>
            <div className="section-header">
              <h2>{category.title}</h2>
            </div>
            <div
              className={
                activeSlug ? "card-grid-filtered" : "card-grid always-visible"
              }
            >
              {items.map((project) => (
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
        );
      })}
    </main>
  );
}
