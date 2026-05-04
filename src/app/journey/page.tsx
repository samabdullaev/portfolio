import { sanityFetch } from "@/lib/sanity";
import HubCard from "@/components/ui/HubCard";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";

interface JourneyUpdate {
  _id: string;
  title: string;
  year: number;
  linkedInUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

interface JourneyYear {
  _id: string;
  year: number;
  slug: { current: string };
  logo: { asset: { url: string } } | null;
}

export default async function JourneyPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year: activeSlug } = await searchParams;

  // Fetch updates and year filter cards in parallel via two GROQ queries.
  const [updates, journeyYears] = await Promise.all([
    sanityFetch<JourneyUpdate[]>(
      `*[_type == "journeyUpdate"] | order(order asc){
        _id, title, year, linkedInUrl, thumbnail{ asset->{ url } }
      }`,
    ),
    sanityFetch<JourneyYear[]>(
      `*[_type == "journeyYear"] | order(year desc){
        _id, year, slug, logo{ asset->{ url } }
      }`,
    ),
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
