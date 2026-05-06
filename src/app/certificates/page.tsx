import { sanityFetch } from "@/lib/sanity";
import {
  certificateIssuersQuery,
  type IssuerWithCertificates,
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

  const issuers = await sanityFetch<IssuerWithCertificates[]>(
    certificateIssuersQuery,
  );

  const filterItems: FilterCardItem[] = issuers.map((i) => ({
    id: i._id,
    name: i.name,
    slug: i.slug.current,
    count: i.certificates?.length ?? 0,
    thumbnail: i.logo?.asset?.url,
  }));

  const displayedIssuers = activeSlug
    ? issuers.filter((i) => i.slug.current === activeSlug)
    : issuers;

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
        issuers={displayedIssuers}
        mode={activeSlug ? "filtered" : "all"}
      />
    </HubPage>
  );
}
