import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import {
  yearlyReviewDetailQuery,
  yearlyReviewSlugsQuery,
  yearlyReviewYearBySlugQuery,
  type YearlyReviewDetail,
} from "@/lib/sanity/queries/reviews";
import MediaGallery from "@/components/ui/MediaGallery";
import "@/app/project-detail.css";

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

  // Thumbnail leads the gallery, followed by any extra images. Every image
  // is expected to have a caption (set in Studio).
  const galleryImages = [
    {
      type: "image" as const,
      src: review.thumbnail.asset.url,
      caption: review.thumbnail.caption,
    },
    ...(review.gallery ?? []).map((g) => ({
      type: "image" as const,
      src: g.asset.url,
      caption: g.caption,
    })),
  ];

  return (
    <main>
      <article className="project-detail">
        <Link href="/reviews" className="project-back">
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
          Back to Reviews
        </Link>

        <h1 className="project-title">{review.year} Yearly Review</h1>

        <MediaGallery items={galleryImages} title={`${review.year} Yearly Review`} />

        {review.sections.map((section) => (
          <div className="project-section" key={section.title}>
            <h2 className="project-section-title">{section.title}</h2>
            <ul className="project-features">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    </main>
  );
}
