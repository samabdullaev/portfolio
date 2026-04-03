import { sanityFetch } from "@/lib/sanity";
import TopicSection from "@/components/ui/TopicSection";
import HubCard from "@/components/ui/HubCard";

interface JourneyUpdate {
  _id: string;
  title: string;
  year: number;
  linkedInUrl: string;
}

export default async function JourneyPage() {
  const updates = await sanityFetch<JourneyUpdate[]>(
    `*[_type == "journeyUpdate"] | order(order asc){
      _id, title, year, linkedInUrl
    }`,
  );

  const yearGroups: Record<number, JourneyUpdate[]> = {};
  for (const u of updates) {
    if (!yearGroups[u.year]) yearGroups[u.year] = [];
    yearGroups[u.year].push(u);
  }
  const sortedYears = Object.keys(yearGroups)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>My Journey</h1>
        <p className="hub-subtitle">
          Monthly updates on my professional growth — published on LinkedIn
        </p>
      </div>

      {sortedYears.map((year) => (
        <TopicSection key={year} title={String(year)}>
          {yearGroups[year].map((entry) => (
            <HubCard
              key={entry._id}
              href={entry.linkedInUrl}
              title={entry.title}
              external
            />
          ))}
        </TopicSection>
      ))}
    </main>
  );
}
