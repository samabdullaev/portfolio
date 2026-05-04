import { sanityFetch } from "@/lib/sanity";
import { SanityResourceTopic } from "@/lib/sanity-types";
import HubCard from "@/components/ui/HubCard";

export default async function ResourcesPage() {
  const topics = await sanityFetch<SanityResourceTopic[]>(
    `*[_type == "resourceTopic"] | order(order asc){
      _id, title, order,
      "items": items[]->{
        _id, _type, title, slug, subtitle,
        thumbnail{ asset->{ url } },
        externalUrl
      }
    }`,
  );

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Resources</h1>
        <p className="hub-subtitle">Tools, platforms, and libraries I use and recommend</p>
      </div>

      {topics.map((topic) => (
        <div className="topic-section" key={topic._id}>
          <div className="section-header">
            <h2>{topic.title}</h2>
          </div>
          <div className="card-grid always-visible">
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
