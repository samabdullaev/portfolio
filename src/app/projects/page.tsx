import { sanityFetch } from "@/lib/sanity";
import {
  projectsListQuery,
  projectCategoriesQuery,
  type ProjectCard,
  type ProjectCategoryCard,
} from "@/lib/sanity/queries/projects";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;

  const [projects, categories] = await Promise.all([
    sanityFetch<ProjectCard[]>(projectsListQuery),
    sanityFetch<ProjectCategoryCard[]>(projectCategoriesQuery),
  ]);

  const groups: Record<string, ProjectCard[]> = {};
  for (const p of projects) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }

  const filterItems: FilterCardItem[] = categories
    .filter((c) => (groups[c.slug.current]?.length ?? 0) > 0)
    .map((c) => ({
      id: c._id,
      name: c.title,
      slug: c.slug.current,
      count: groups[c.slug.current]?.length ?? 0,
      thumbnail: c.logo?.asset?.url,
    }));

  const visibleCategories = activeSlug
    ? categories.filter((c) => c.slug.current === activeSlug)
    : categories;

  return (
    <HubPage>
      <HubHeader
        title="Projects"
        subtitle="A collection of personal, freelance, and hackathon projects"
      />

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
          <TopicSection key={category._id} title={category.title}>
            <CardGrid filtered={!!activeSlug}>
              {items.map((project) => (
                <HubCard
                  key={project.slug.current}
                  href={`/projects/${project.slug.current}`}
                  title={project.title}
                  subtitle={project.description}
                  thumbnail={project.thumbnail?.asset?.url}
                />
              ))}
            </CardGrid>
          </TopicSection>
        );
      })}
    </HubPage>
  );
}
