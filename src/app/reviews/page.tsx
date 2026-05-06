import { sanityFetch } from "@/lib/sanity";
import { reviewsListQuery, type ReviewCard } from "@/lib/sanity/queries/reviews";
import HubCard from "@/components/ui/HubCard";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export default async function ReviewsPage() {
  const reviews = await sanityFetch<ReviewCard[]>(reviewsListQuery);

  return (
    <HubPage>
      <HubHeader title="Yearly Reviews" subtitle="A look back at each year" />

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
    </HubPage>
  );
}
