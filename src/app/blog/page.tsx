import { sanityFetch } from "@/lib/sanity";
import { blogSeriesQuery, type BlogSeries } from "@/lib/sanity/queries/blog";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string }>;
}) {
  const { series: activeSlug } = await searchParams;

  const series = await sanityFetch<BlogSeries[]>(blogSeriesQuery);

  const filterItems: FilterCardItem[] = series.map((s) => ({
    id: s._id,
    name: s.shortTitle ?? s.title,
    slug: s.slug.current,
    count: s.articles?.length ?? 0,
    thumbnail: s.logo?.asset?.url,
  }));

  const visibleSeries = activeSlug
    ? series.filter((s) => s.slug.current === activeSlug)
    : series;

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Blog</h1>
        <p className="hub-subtitle">
          Articles on tech, study abroad, and software development — published
          on Medium
        </p>
      </div>

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/blog"
        paramName="series"
      />

      {visibleSeries.map((s) => (
        <div key={s._id} className="topic-section">
          <div className="section-header">
            <h2>{s.title}</h2>
          </div>
          <div
            className={
              activeSlug ? "card-grid-filtered" : "card-grid"
            }
          >
            {s.articles.map((article) => (
              <HubCard
                key={article._id}
                href={article.externalUrl}
                title={article.title}
                tag={`Part ${article.partNumber}`}
                meta={article.date}
                thumbnail={article.thumbnail?.asset?.url}
                external
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
