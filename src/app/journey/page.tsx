import { sanityFetch } from "@/lib/sanity";
import {
  journeyUpdatesQuery,
  journeyYearsQuery,
  type JourneyUpdate,
  type JourneyYear,
} from "@/lib/sanity/queries/journey";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

export default async function JourneyPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year: activeSlug } = await searchParams;

  // Fetch updates and year filter cards in parallel via two GROQ queries.
  const [updates, journeyYears] = await Promise.all([
    sanityFetch<JourneyUpdate[]>(journeyUpdatesQuery),
    sanityFetch<JourneyYear[]>(journeyYearsQuery),
  ]);

  // Group updates by year
  const yearGroups: Record<number, JourneyUpdate[]> = {};
  for (const u of updates) {
    if (!yearGroups[u.year]) yearGroups[u.year] = [];
    yearGroups[u.year].push(u);
  }

  // Filter row uses journeyYear documents (with logos editable in Studio).
  // Skip any years that have no updates yet.
  const filterItems: FilterCardItem[] = journeyYears
    .filter((y) => (yearGroups[y.year]?.length ?? 0) > 0)
    .map((y) => ({
      id: y._id,
      name: String(y.year),
      slug: y.slug.current,
      count: yearGroups[y.year]?.length ?? 0,
      thumbnail: y.logo?.asset?.url,
    }));

  // Visible year sections
  const visibleYears = activeSlug
    ? journeyYears
        .filter((y) => y.slug.current === activeSlug)
        .map((y) => y.year)
        .filter((y) => yearGroups[y]?.length)
    : journeyYears.map((y) => y.year).filter((y) => yearGroups[y]?.length);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>My Journey</h1>
        <p className="hub-subtitle">
          Monthly updates on my professional growth — published on LinkedIn
        </p>
      </div>

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/journey"
        paramName="year"
      />

      {visibleYears.map((year) => (
        <div className="topic-section" key={year}>
          <div className="section-header">
            <h2>{year}</h2>
          </div>
          <div
            className={
              activeSlug ? "card-grid-filtered" : "card-grid always-visible"
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
        </div>
      ))}
    </main>
  );
}
