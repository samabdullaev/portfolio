import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity";
import {
  yearlyReviewDetailQuery,
  yearlyReviewSlugsQuery,
  yearlyReviewYearBySlugQuery,
  type YearlyReviewDetail,
} from "@/lib/sanity/queries/reviews";
import MediaGallery from "@/components/ui/MediaGallery";
import DetailPage from "@/components/layout/DetailPage";
import DetailBack from "@/components/layout/DetailBack";
import DetailSection from "@/components/layout/DetailSection";

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: { current: string } }[]>(yearlyReviewSlugsQuery);
  return all.map((r) => ({ year: r.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const review = await sanityFetch<{ year: number } | null>(
    yearlyReviewYearBySlugQuery,
    { year },
  );
  if (!review) return {};
  return {
    title: `${review.year} Yearly Review — Sam Abdullaev`,
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const review = await sanityFetch<YearlyReviewDetail | null>(
    yearlyReviewDetailQuery,
    { year },
  );

  if (!review) notFound();

  // Thumbnail leads the gallery, followed by any extra images. Items
  // missing an asset ref are skipped — see project detail.
  const galleryImages = [
    {
      type: "image" as const,
      src: review.thumbnail.asset.url,
      caption: review.thumbnail.caption,
    },
    ...(review.gallery ?? []).flatMap((g) =>
      g.asset?.url
        ? [{ type: "image" as const, src: g.asset.url, caption: g.caption }]
        : [],
    ),
  ];

  return (
    <DetailPage>
      <DetailBack href="/reviews" label="Back to Reviews" />

      <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2 max-sm:text-2xl">
        {review.year} Yearly Review
      </h1>

      <MediaGallery items={galleryImages} title={`${review.year} Yearly Review`} />

      {review.sections.map((section) => (
        <DetailSection key={section.title} title={section.title}>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            {section.items.map((item, i) => (
              <li key={i} className="text-base leading-normal text-text">
                {item}
              </li>
            ))}
          </ul>
        </DetailSection>
      ))}
    </DetailPage>
  );
}
