import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { reviewsListQuery, type ReviewCard } from "@/lib/sanity/queries/reviews";
import HubCard from "@/components/ui/HubCard";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import CardGrid from "@/components/layout/CardGrid";

export const metadata: Metadata = {
  title: "Yearly Reviews",
  description: "Year-by-year retrospectives by Sam Abdullaev.",
};

export default async function ReviewsPage() {
  const reviews = await sanityFetch<ReviewCard[]>(reviewsListQuery);

  return (
    <HubPage>
      <HubHeader title="Yearly Reviews" subtitle="A look back at each year" />

      <CardGrid filtered>
        {reviews.map((r) => (
          <HubCard
            key={r.year}
            href={`/reviews/${r.slug.current}`}
            title={String(r.year)}
            thumbnail={r.thumbnail.asset.url}
            cta="View review"
          />
        ))}
      </CardGrid>
    </HubPage>
  );
}
