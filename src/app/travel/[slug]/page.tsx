import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import Gallery from "@/components/ui/Gallery";
import "@/app/project-detail.css";

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "travelDestination"]{ slug }`,
  );
  return all.map((d) => ({ slug: d.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = await sanityFetch<{ title: string } | null>(
    `*[_type == "travelDestination" && slug.current == $slug][0]{ title }`,
    { slug },
  );
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
  const dest = await sanityFetch<{
    title: string;
    flag: string;
    thumbnail: { asset: { url: string } };
    gallery: { _key: string; asset: { url: string } }[] | null;
    overview: { citiesVisited: string[]; accommodation: string[] } | null;
    placesToTravel: { _key: string; city: string; places: string[] }[] | null;
    personalTips: string[] | null;
    sections: { _key: string; title: string; items: string[] }[] | null;
  } | null>(
    `*[_type == "travelDestination" && slug.current == $slug][0]{
      title, flag,
      thumbnail{ asset->{ url } },
      gallery[]{ _key, asset->{ url } },
      overview, placesToTravel[]{ _key, city, places },
      personalTips, sections[]{ _key, title, items }
    }`,
    { slug },
  );

  if (!dest) notFound();

  const galleryImages = [
    { type: "image" as const, src: dest.thumbnail.asset.url },
    ...(dest.gallery ?? []).map((g) => ({
      type: "image" as const,
      src: g.asset.url,
    })),
  ];

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

        <Gallery items={galleryImages} title={dest.title} />

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
