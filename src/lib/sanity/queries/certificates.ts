import type { SanitySlug } from "../types";

export interface Certificate {
  _id: string;
  title: string;
  date: string;
  image: { asset: { url: string } } | null;
  verifyUrl: string | null;
}

// Membership + display order both come from `certificateIssuer.certificates[]`
// (containment). The issuer doc owns its certs in the order it renders
// them; the hub iterates issuers, then each issuer's certificates.
export interface IssuerWithCertificates {
  _id: string;
  name: string;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
  certificates: Certificate[];
}

export const certificateIssuersQuery = `*[_type == "certificateIssuer"] | order(orderRank asc){
  _id, name, slug,
  logo{ asset->{ url } },
  "certificates": certificates[]->{
    _id, title, date, image{ asset->{ url } }, verifyUrl
  }
}`;
