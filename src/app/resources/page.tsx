import { sanityFetch } from "@/lib/sanity";
import { SanityResourceTopic } from "@/lib/sanity-types";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: activeSlug } = await searchParams;

  const topics = await sanityFetch<SanityResourceTopic[]>(
    `*[_type == "resourceTopic"] | order(order asc){
      _id, title, slug, order,
      logo{ asset->{ url } },
      "items": items[]->{
        _id, _type, title, slug, subtitle,
        thumbnail{ asset->{ url } },
        externalUrl
      }
    }`,
  );

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
    <main className="hub-page">
      <div className="hub-header">
        <h1>Resources</h1>
        <p className="hub-subtitle">Tools, platforms, and libraries I use and recommend</p>
      </div>

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/resources"
        paramName="topic"
      />

      {visibleTopics.map((topic) => (
        <div className="topic-section" key={topic._id}>
          <div className="section-header">
            <h2>{topic.title}</h2>
          </div>
          <div
            className={
              activeSlug ? "card-grid-filtered" : "card-grid always-visible"
            }
          >
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
          </div>
        </div>
      ))}
    </main>
  );
}
