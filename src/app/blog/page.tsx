import { sanityFetch } from "@/lib/sanity";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

interface BlogArticle {
  _id: string;
  title: string;
  partNumber: number;
  date: string;
  externalUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

interface BlogSeries {
  _id: string;
  title: string;
  shortTitle: string | null;
  slug: { current: string };
  logo: { asset: { url: string } } | null;
  articles: BlogArticle[];
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string }>;
}) {
  const { series: activeSlug } = await searchParams;

  const series = await sanityFetch<BlogSeries[]>(
    `*[_type == "blogSeries"] | order(order asc){
      _id, title, shortTitle, slug,
      logo{ asset->{ url } },
      articles[]->{ _id, title, partNumber, date, externalUrl, thumbnail{ asset->{ url } } }
    }`,
  );

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
              activeSlug ? "card-grid-filtered" : "card-grid always-visible"
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
