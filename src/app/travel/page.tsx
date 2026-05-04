import { sanityFetch } from "@/lib/sanity";
import { SanitySlug, SanityImage } from "@/lib/sanity-types";
import HubCard from "@/components/ui/HubCard";

interface TravelCard {
  title: string;
  slug: SanitySlug;
  flag: string;
  thumbnail: SanityImage | null;
}

export default async function TravelPage() {
  const destinations = await sanityFetch<TravelCard[]>(
    `*[_type == "travelDestination"] | order(order asc){
      title, slug, flag, thumbnail{ asset->{ url } }
    }`,
  );

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Travel</h1>
        <p className="hub-subtitle">Countries and places I&apos;ve explored</p>
      </div>

      <div className="card-grid-filtered">
        {destinations.map((d) => (
          <HubCard
            key={d.slug.current}
            href={`/travel/${d.slug.current}`}
            title={`${d.title}${d.flag ? ` ${d.flag}` : ""}`}
            thumbnail={d.thumbnail?.asset?.url}
          />
        ))}
      </div>
    </main>
  );
}
