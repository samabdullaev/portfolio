import type { SanitySlug } from "../types";

export interface Certificate {
  _id: string;
  title: string;
  date: string;
  image: { asset: { url: string } } | null;
  verifyUrl: string | null;
  issuerName: string;
  issuerSlug: string;
}

export interface IssuerWithCount {
  _id: string;
  name: string;
  slug: SanitySlug;
  logo: { asset: { url: string } } | null;
  count: number;
}

// Issuer filter cards — each carries a derived `count` of certificates
// referencing it, used to label the FilterCardRow chips.
export const certificateIssuersQuery = `*[_type == "certificateIssuer"] | order(order asc){
  _id, name, slug,
  logo{ asset->{ url } },
  "count": count(*[_type=="certificate" && references(^._id)])
}`;

// Certificates list — optionally filtered by issuer slug. The caller
// passes `{ slug }` only when an issuer is active so the filter is
// applied server-side rather than in the browser.
export function certificatesQuery(filteredByIssuer: boolean) {
  return `*[_type == "certificate"${filteredByIssuer ? ` && issuer->slug.current == $slug` : ""}] | order(order asc){
    _id, title, date, image{ asset->{ url } }, verifyUrl,
    "issuerName": issuer->name,
    "issuerSlug": issuer->slug.current
  }`;
}
