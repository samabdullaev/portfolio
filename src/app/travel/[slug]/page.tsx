import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import {
  travelDestinationDetailQuery,
  travelDestinationSlugsQuery,
  travelDestinationTitleBySlugQuery,
  type TravelDestinationDetail,
} from "@/lib/sanity/queries/travel";
import MediaGallery from "@/components/ui/MediaGallery";
import "@/app/project-detail.css";

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: { current: string } }[]>(travelDestinationSlugsQuery);
  return all.map((d) => ({ slug: d.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = await sanityFetch<{ title: string } | null>(
    travelDestinationTitleBySlugQuery,
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
  const dest = await sanityFetch<TravelDestinationDetail | null>(
    travelDestinationDetailQuery,
    { slug },
  );

  if (!dest) notFound();

  const galleryImages = [
    {
      type: "image" as const,
      src: dest.thumbnail.asset.url,
      caption: dest.thumbnail.caption,
    },
    ...(dest.gallery ?? []).map((g) => ({
      type: "image" as const,
      src: g.asset.url,
      caption: g.caption,
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

        <MediaGallery items={galleryImages} title={dest.title} />

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
