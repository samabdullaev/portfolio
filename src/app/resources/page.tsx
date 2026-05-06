import { sanityFetch } from "@/lib/sanity";
import {
  resourceTopicsQuery,
  type ResourceTopic,
} from "@/lib/sanity/queries/resources";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: activeSlug } = await searchParams;

  const topics = await sanityFetch<ResourceTopic[]>(resourceTopicsQuery);

  const filterItems: FilterCardItem[] = topics.map((t) => ({
    id: t._id,
    name: t.title,
    slug: t.slug.current,
    count: t.items?.length ?? 0,
    thumbnail: t.logo?.asset?.url,
  }));

  const visibleTopics = activeSlug
    ? topics.filter((t) => t.slug.current === activeSlug)
    : topics;

  return (
    <HubPage>
      <HubHeader
        title="Resources"
        subtitle="Tools, platforms, and libraries I use and recommend"
      />

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/resources"
        paramName="topic"
      />

      {visibleTopics.map((topic) => (
        <TopicSection key={topic._id} title={topic.title}>
          <CardGrid filtered={!!activeSlug}>
            {topic.items.map((item) => {
              const isExternal = item._type === "resource";
              const href = isExternal
                ? item.externalUrl
                : `/resources/${item.slug.current}`;
              return (
                <HubCard
                  key={item._id}
                  href={href}
                  title={item.title}
                  subtitle={item.subtitle ?? undefined}
                  thumbnail={item.thumbnail?.asset?.url}
                  external={isExternal}
                />
              );
            })}
          </CardGrid>
        </TopicSection>
      ))}
    </HubPage>
  );
}
