import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { SanitySlug } from "@/lib/sanity-types";

interface ReviewCard {
  year: number;
  slug: SanitySlug;
  gradientFrom: string;
  gradientTo: string;
}

export default async function ReviewsPage() {
  const reviews = await sanityFetch<ReviewCard[]>(
    `*[_type == "yearlyReview"] | order(year desc){
      year, slug, gradientFrom, gradientTo
    }`,
  );

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Yearly Reviews</h1>
        <p className="hub-subtitle">A look back at each year</p>
      </div>

      <div className="card-grid always-visible">
        {reviews.map((r) => (
          <div className="hub-card" key={r.year}>
            <Link href={`/reviews/${r.slug.current}`}>
              <div className="hub-card-inner">
                <div className="hub-card-thumb">
                  <div
                    className="hub-card-thumb-img"
                    style={{
                      background: `linear-gradient(135deg, ${r.gradientFrom}, ${r.gradientTo})`,
                    }}
                  />
                  <div className="hub-card-year">{r.year}</div>
                </div>
                <div className="hub-card-content">
                  <h3>{r.year}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
