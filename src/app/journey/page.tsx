import { sanityFetch } from "@/lib/sanity";
import {
  journeyUpdatesQuery,
  journeyYearsQuery,
  type JourneyUpdate,
  type JourneyYear,
} from "@/lib/sanity/queries/journey";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";

export default async function JourneyPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year: activeSlug } = await searchParams;

  const [updates, journeyYears] = await Promise.all([
    sanityFetch<JourneyUpdate[]>(journeyUpdatesQuery),
    sanityFetch<JourneyYear[]>(journeyYearsQuery),
  ]);

  const yearGroups: Record<number, JourneyUpdate[]> = {};
  for (const u of updates) {
    if (!yearGroups[u.year]) yearGroups[u.year] = [];
    yearGroups[u.year].push(u);
  }

  const filterItems: FilterCardItem[] = journeyYears
    .filter((y) => (yearGroups[y.year]?.length ?? 0) > 0)
    .map((y) => ({
      id: y._id,
      name: String(y.year),
      slug: y.slug.current,
      count: yearGroups[y.year]?.length ?? 0,
      thumbnail: y.logo?.asset?.url,
    }));

  const visibleYears = activeSlug
    ? journeyYears
        .filter((y) => y.slug.current === activeSlug)
        .map((y) => y.year)
        .filter((y) => yearGroups[y]?.length)
    : journeyYears.map((y) => y.year).filter((y) => yearGroups[y]?.length);

  return (
    <HubPage>
      <HubHeader
        title="My Journey"
        subtitle="Monthly updates on my professional growth — published on LinkedIn"
      />

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/journey"
        paramName="year"
      />

      {visibleYears.map((year) => (
        <TopicSection key={year} title={String(year)}>
          <div
            className={
              activeSlug ? "card-grid-filtered" : "card-grid"
            }
          >
            {yearGroups[year].map((entry) => (
              <HubCard
                key={entry._id}
                href={entry.linkedInUrl}
                title={entry.title}
                thumbnail={entry.thumbnail?.asset?.url}
                external
              />
            ))}
          </div>
        </TopicSection>
      ))}
    </HubPage>
  );
}
