import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  projectCategoriesQuery,
  type ProjectCategoryWithProjects,
} from "@/lib/sanity/queries/projects";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of personal, freelance, and hackathon projects by Sam Abdullaev.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;

  const categories = await sanityFetch<ProjectCategoryWithProjects[]>(
    projectCategoriesQuery,
  );

  const filterItems: FilterCardItem[] = categories
    .filter((c) => (c.projects?.length ?? 0) > 0)
    .map((c) => ({
      id: c._id,
      name: c.title,
      slug: c.slug.current,
      count: c.projects.length,
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
        if (!category.projects || category.projects.length === 0) return null;
        return (
          <TopicSection key={category._id} title={category.title}>
            <CardGrid filtered={!!activeSlug}>
              {category.projects.map((project) => (
                <HubCard
                  key={project.slug.current}
                  href={`/projects/${project.slug.current}`}
                  title={project.title}
                  subtitle={project.description}
                  thumbnail={project.thumbnail?.asset?.url}
                  cta="View project"
                />
              ))}
            </CardGrid>
          </TopicSection>
        );
      })}
    </HubPage>
  );
}
