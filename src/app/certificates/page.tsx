import { sanityFetch } from "@/lib/sanity";
import {
  certificateIssuersQuery,
  certificatesQuery,
  type Certificate,
  type IssuerWithCount,
} from "@/lib/sanity/queries/certificates";
import FilterCardRow, { FilterCardItem } from "@/components/ui/FilterCardRow";
import CertificatesContent from "./CertificatesContent";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export default async function CertificatesPage({
  searchParams,
}: {
  searchParams: Promise<{ issuer?: string }>;
}) {
  const { issuer: activeSlug } = await searchParams;

  const issuers = await sanityFetch<IssuerWithCount[]>(certificateIssuersQuery);

  const certs = await sanityFetch<Certificate[]>(
    certificatesQuery(Boolean(activeSlug)),
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
    <HubPage>
      <HubHeader
        title="Certificates"
        subtitle="Certifications, hackathon awards, and course completions"
      />

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
    </HubPage>
  );
}
