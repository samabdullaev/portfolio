import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  travelDestinationsQuery,
  type TravelCard,
} from "@/lib/sanity/queries/travel";
import HubCard from "@/components/ui/HubCard";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import CardGrid from "@/components/layout/CardGrid";

export const metadata: Metadata = {
  title: "Travel",
  description: "Countries and places Sam Abdullaev has explored.",
};

export default async function TravelPage() {
  const destinations = await sanityFetch<TravelCard[]>(travelDestinationsQuery);

  return (
    <HubPage>
      <HubHeader title="Travel" subtitle="Countries and places I&apos;ve explored" />

      <CardGrid filtered>
        {destinations.map((d) => (
          <HubCard
            key={d.slug.current}
            href={`/travel/${d.slug.current}`}
            title={`${d.title}${d.flag ? ` ${d.flag}` : ""}`}
            thumbnail={d.thumbnail?.asset?.url}
            cta="View destination"
          />
        ))}
      </CardGrid>
    </HubPage>
  );
}
