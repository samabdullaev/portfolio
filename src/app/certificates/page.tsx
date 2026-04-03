import { sanityFetch } from "@/lib/sanity";
import CertificatesContent from "./CertificatesContent";

export default async function CertificatesPage() {
  const certs = await sanityFetch<
    {
      _id: string;
      title: string;
      issuer: string;
      date: string;
      image: { asset: { url: string } } | null;
      verifyUrl: string | null;
    }[]
  >(
    `*[_type == "certificate"] | order(order asc){
      _id, title, issuer, date, image{ asset->{ url } }, verifyUrl
    }`,
  );

  return <CertificatesContent certs={certs} />;
}
