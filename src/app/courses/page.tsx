import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  courseTopicsQuery,
  type CourseTopic,
} from "@/lib/sanity/queries/courses";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import CoursesContent from "./CoursesContent";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Courses Sam Abdullaev has studied, grouped by topic — a reference list of what to learn next.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: activeSlug } = await searchParams;

  const topics = await sanityFetch<CourseTopic[]>(courseTopicsQuery);

  const filterItems: FilterCardItem[] = topics.map((t) => ({
    id: t._id,
    name: t.title,
    slug: t.slug.current,
    count: t.courses?.length ?? 0,
    thumbnail: t.logo?.asset?.url,
  }));

  const displayedTopics = activeSlug
    ? topics.filter((t) => t.slug.current === activeSlug)
    : topics;

  return (
    <HubPage>
      <HubHeader
        title="Courses"
        subtitle="Courses I've studied, grouped by topic"
      />

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/courses"
        paramName="topic"
      />

      <CoursesContent topics={displayedTopics} filtered={!!activeSlug} />
    </HubPage>
  );
}
