import { notFound } from "next/navigation";
import Link from "next/link";
import travel from "@/data/travel.json";
import "@/app/project-detail.css";

interface TravelSection {
  title: string;
  items: string[];
}

interface PlaceEntry {
  city: string;
  places: string[];
}

interface TravelOverview {
  citiesVisited: string[];
  accommodation: string[];
}

interface TravelDestination {
  slug: string;
  title: string;
  flag: string;
  image: string;
  overview: TravelOverview | null;
  placesToTravel: PlaceEntry[] | null;
  personalTips: string[] | null;
  sections?: TravelSection[];
}

export function generateStaticParams() {
  return (travel as TravelDestination[]).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = (travel as TravelDestination[]).find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.title} — Travel — Sam Abdullaev`,
  };
}

export default async function TravelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = (travel as TravelDestination[]).find((d) => d.slug === slug);

  if (!dest) notFound();

  return (
    <main>
      <article className="project-detail">
        <Link href="/travel" className="project-back">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Travel
        </Link>

        <h1 className="project-title">
          {dest.title} {dest.flag}
        </h1>

        <div className="project-gallery">
          <div className="project-gallery-main">
            <img src={dest.image} alt={dest.title} />
          </div>
        </div>

        {/* travel-tips: has sections array instead of structured overview */}
        {dest.sections ? (
          dest.sections.map((section) => (
            <div className="project-section" key={section.title}>
              <h2 className="project-section-title">{section.title}</h2>
              <ul className="project-features">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            {/* Overview: cities visited + accommodation */}
            {dest.overview && (
              <div className="project-section">
                <h2 className="project-section-title">overview</h2>
                <ul className="project-features">
                  <li>
                    Cities visited:{" "}
                    {dest.overview.citiesVisited.join(", ")}
                  </li>
                  <li>
                    Accommodation references:{" "}
                    {dest.overview.accommodation.join(", ")}
                  </li>
                </ul>
              </div>
            )}

            {/* Places to travel: city headings + place bullets */}
            {dest.placesToTravel && dest.placesToTravel.length > 0 && (
              <div className="project-section">
                <h2 className="project-section-title">places to travel</h2>
                <div className="travel-notes">
                  {dest.placesToTravel.map((entry, i) => (
                    <div key={i}>
                      <h3
                        className="travel-city"
                        style={i === 0 ? { marginTop: 0 } : undefined}
                      >
                        {entry.city}
                      </h3>
                      <ul className="project-features">
                        {entry.places.map((place, j) => (
                          <li key={j}>{place}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal tips */}
            {dest.personalTips && dest.personalTips.length > 0 && (
              <div className="project-section">
                <h2 className="project-section-title">personal tips</h2>
                <ul className="project-features">
                  {dest.personalTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </article>
    </main>
  );
}
