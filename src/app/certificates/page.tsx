import { sanityFetch } from "@/lib/sanity";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import CertificatesContent, { Certificate } from "./CertificatesContent";

interface IssuerWithCount {
  _id: string;
  name: string;
  slug: { current: string };
  logo: { asset: { url: string } } | null;
  count: number;
}

export default async function CertificatesPage({
  searchParams,
}: {
  searchParams: Promise<{ issuer?: string }>;
}) {
  const { issuer: activeSlug } = await searchParams;

  // 1. All issuers with their cert counts (for the filter row)
  const issuers = await sanityFetch<IssuerWithCount[]>(
    `*[_type == "certificateIssuer"] | order(order asc){
      _id, name, slug,
      logo{ asset->{ url } },
      "count": count(*[_type=="certificate" && references(^._id)])
    }`,
  );

  // 2. Certificates — filtered server-side if an issuer is selected
  const certs = await sanityFetch<Certificate[]>(
    `*[_type == "certificate"${activeSlug ? ` && issuer->slug.current == $slug` : ""}] | order(order asc){
      _id, title, date, image{ asset->{ url } }, verifyUrl,
      "issuerName": issuer->name,
      "issuerSlug": issuer->slug.current
    }`,
    activeSlug ? { slug: activeSlug } : undefined,
  );

  const filterItems: FilterCardItem[] = issuers.map((i) => ({
    id: i._id,
    name: i.name,
    slug: i.slug.current,
    count: i.count,
    thumbnail: i.logo?.asset?.url,
  }));

  const activeIssuer = activeSlug ? issuers.find((i) => i.slug.current === activeSlug) : null;

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Certificates</h1>
        <p className="hub-subtitle">
          Certifications, hackathon awards, and course completions
        </p>
      </div>

      <FilterCardRow
        items={filterItems}
        activeSlug={activeSlug ?? null}
        basePath="/certificates"
        paramName="issuer"
      />

      <CertificatesContent
        certs={certs}
        mode={activeSlug ? "filtered" : "all"}
        filteredHeading={activeIssuer?.name}
      />
    </main>
  );
}
