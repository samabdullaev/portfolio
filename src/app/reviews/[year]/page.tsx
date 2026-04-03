import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import Gallery from "@/components/ui/Gallery";
import "@/app/project-detail.css";

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "yearlyReview"]{ slug }`,
  );
  return all.map((r) => ({ year: r.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const review = await sanityFetch<{ year: number } | null>(
    `*[_type == "yearlyReview" && slug.current == $year][0]{ year }`,
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
  const review = await sanityFetch<{
    year: number;
    gradientFrom: string;
    gradientTo: string;
    sections: { _key: string; title: string; items: string[] }[];
  } | null>(
    `*[_type == "yearlyReview" && slug.current == $year][0]{
      year, gradientFrom, gradientTo,
      sections[]{ _key, title, items }
    }`,
    { year },
  );

  if (!review) notFound();

  const gradientValue = `linear-gradient(135deg, ${review.gradientFrom}, ${review.gradientTo})`;

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
