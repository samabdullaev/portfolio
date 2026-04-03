import { notFound } from "next/navigation";
import Link from "next/link";
import reviews from "@/data/reviews.json";
import Gallery from "@/components/ui/Gallery";
import "@/app/project-detail.css";

interface ReviewSection {
  title: string;
  items: string[];
}

interface Review {
  slug: string;
  year: number;
  gradient: string[];
  sections: ReviewSection[];
}

export function generateStaticParams() {
  return (reviews as Review[]).map((r) => ({ year: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const review = (reviews as Review[]).find((r) => r.slug === year);
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
  const review = (reviews as Review[]).find((r) => r.slug === year);

  if (!review) notFound();

  const gradientValue = `linear-gradient(135deg, ${review.gradient[0]}, ${review.gradient[1]})`;

  const galleryItems = [
    { type: "gradient" as const, src: gradientValue },
    { type: "gradient" as const, src: gradientValue },
    { type: "gradient" as const, src: gradientValue },
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

        <Gallery
          items={galleryItems}
          title={String(review.year)}
          gradientLabel={String(review.year)}
        />

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
