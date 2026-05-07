import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity";
import {
  travelDestinationDetailQuery,
  travelDestinationSlugsQuery,
  travelDestinationTitleBySlugQuery,
  type TravelDestinationDetail,
} from "@/lib/sanity/queries/travel";
import MediaGallery from "@/components/ui/MediaGallery";
import DetailPage from "@/components/layout/DetailPage";
import DetailBack from "@/components/layout/DetailBack";
import DetailSection from "@/components/layout/DetailSection";

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
    // Root layout's title template appends "| Sam Abdullaev".
    title: `${dest.title} | Travel`,
  };
}

const FEATURES_LIST_CLASSES = "list-disc pl-5 flex flex-col gap-1.5";
const FEATURES_ITEM_CLASSES = "text-base leading-normal text-text";

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

  // Gallery items missing an asset ref are skipped — see project detail.
  const galleryImages = [
    {
      type: "image" as const,
      src: dest.thumbnail.asset.url,
      caption: dest.thumbnail.caption,
    },
    ...(dest.gallery ?? []).flatMap((g) =>
      g.asset?.url
        ? [{ type: "image" as const, src: g.asset.url, caption: g.caption }]
        : [],
    ),
  ];

  return (
    <DetailPage>
      <DetailBack href="/travel" label="Back to Travel" />

      <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2 max-sm:text-2xl">
        {dest.title} {dest.flag}
      </h1>

      <MediaGallery items={galleryImages} title={dest.title} />

      {/* travel-tips: has sections array instead of structured overview */}
      {dest.sections ? (
        dest.sections.map((section) => (
          <DetailSection key={section.title} title={section.title}>
            <ul className={FEATURES_LIST_CLASSES}>
              {section.items.map((item, i) => (
                <li key={i} className={FEATURES_ITEM_CLASSES}>
                  {item}
                </li>
              ))}
            </ul>
          </DetailSection>
        ))
      ) : (
        <>
          {dest.overview && (
            <DetailSection title="overview">
              <ul className={FEATURES_LIST_CLASSES}>
                <li className={FEATURES_ITEM_CLASSES}>
                  Cities visited: {dest.overview.citiesVisited.join(", ")}
                </li>
                <li className={FEATURES_ITEM_CLASSES}>
                  Accommodation references: {dest.overview.accommodation.join(", ")}
                </li>
              </ul>
            </DetailSection>
          )}

          {dest.placesToTravel && dest.placesToTravel.length > 0 && (
            <DetailSection title="places to travel">
              <div className="text-base leading-relaxed">
                {dest.placesToTravel.map((entry, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold mt-6 mb-2 first:mt-0">
                      {entry.city}
                    </h3>
                    <ul className={FEATURES_LIST_CLASSES}>
                      {entry.places.map((place, j) => (
                        <li key={j} className={FEATURES_ITEM_CLASSES}>
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {dest.personalTips && dest.personalTips.length > 0 && (
            <DetailSection title="personal tips">
              <ul className={FEATURES_LIST_CLASSES}>
                {dest.personalTips.map((tip, i) => (
                  <li key={i} className={FEATURES_ITEM_CLASSES}>
                    {tip}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}
        </>
      )}
    </DetailPage>
  );
}
