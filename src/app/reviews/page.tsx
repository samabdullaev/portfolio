import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { reviewsListQuery, type ReviewCard } from "@/lib/sanity/queries/reviews";

export default async function ReviewsPage() {
  const reviews = await sanityFetch<ReviewCard[]>(reviewsListQuery);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Yearly Reviews</h1>
        <p className="hub-subtitle">A look back at each year</p>
      </div>

      <div className="card-grid-filtered">
        {reviews.map((r) => (
          <div className="hub-card" key={r.year}>
            <Link href={`/reviews/${r.slug.current}`}>
              <div className="hub-card-inner">
                <div className="hub-card-thumb">
                  <div
                    className="hub-card-thumb-img"
                    style={{
                      backgroundImage: `url(${r.thumbnail.asset.url})`,
                    }}
                  />
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
