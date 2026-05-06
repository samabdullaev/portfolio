import { sanityFetch } from "@/lib/sanity";
import { reviewsListQuery, type ReviewCard } from "@/lib/sanity/queries/reviews";
import HubCard from "@/components/ui/HubCard";

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
          <HubCard
            key={r.year}
            href={`/reviews/${r.slug.current}`}
            title={String(r.year)}
            thumbnail={r.thumbnail.asset.url}
          />
        ))}
      </div>
    </main>
  );
}
