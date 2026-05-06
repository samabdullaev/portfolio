import { sanityFetch } from "@/lib/sanity";
import {
  journeyUpdatesQuery,
  journeyYearsQuery,
  type JourneyUpdate,
  type JourneyYear,
} from "@/lib/sanity/queries/journey";
import { recapYear } from "@/lib/constants";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";

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

  // Group by recap year (publish date is 1st of next month — January
  // publish belongs to the previous year's bucket).
  const yearGroups: Record<number, JourneyUpdate[]> = {};
  for (const u of updates) {
    const y = recapYear(u.date);
    if (!yearGroups[y]) yearGroups[y] = [];
    yearGroups[y].push(u);
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
          <CardGrid filtered={!!activeSlug}>
            {yearGroups[year].map((entry) => (
              <HubCard
                key={entry._id}
                href={entry.linkedInUrl}
                title={entry.title}
                thumbnail={entry.thumbnail?.asset?.url}
                external
              />
            ))}
          </CardGrid>
        </TopicSection>
      ))}
    </HubPage>
  );
}
