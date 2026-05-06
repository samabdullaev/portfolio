import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { blogSeriesQuery, type BlogSeries } from "@/lib/sanity/queries/blog";
import { formatLongDate } from "@/lib/dates";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on tech, study abroad, and software development by Sam Abdullaev — published on Medium.",
};

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
    <HubPage>
      <HubHeader
        title="Blog"
        subtitle="Articles on tech, study abroad, and software development — published on Medium"
      />

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/blog"
        paramName="series"
      />

      {visibleSeries.map((s) => (
        <TopicSection key={s._id} title={s.title}>
          <CardGrid filtered={!!activeSlug}>
            {s.articles.map((article, i) => (
              <HubCard
                key={article._id}
                href={article.externalUrl}
                title={article.title}
                tag={`Part ${i + 1}`}
                meta={formatLongDate(article.date)}
                thumbnail={article.thumbnail?.asset?.url}
                external
              />
            ))}
          </CardGrid>
        </TopicSection>
      ))}
    </HubPage>
  );
}
