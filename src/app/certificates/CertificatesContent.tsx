"use client";

import { useState } from "react";
import Image from "next/image";
import MediaModal from "@/components/ui/MediaModal";
import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";
import type {
  Certificate,
  IssuerWithCertificates,
} from "@/lib/sanity/queries/certificates";
import { formatLongDate } from "@/lib/dates";

export type { Certificate };

interface Props {
  issuers: IssuerWithCertificates[];
  mode: "all" | "filtered";
}

function CertCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: (c: Certificate) => void;
}) {
  return (
    <div
      data-testid="hub-card"
      className="group cursor-pointer"
      onClick={() => onOpen(cert)}
    >
      <div className="flex flex-col bg-card rounded-2xl p-2 overflow-hidden transition-colors duration-300">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border bg-card">
          {cert.image?.asset?.url && (
            <Image
              src={cert.image.asset.url}
              alt={cert.title}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="pt-4 px-3 pb-2 max-sm:pt-3 max-sm:px-2 max-sm:pb-1">
          <h3 className="text-base font-semibold tracking-tight line-clamp-2 max-sm:text-sm">
            {cert.verifyUrl ? (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline hover:underline-offset-2"
              >
                {cert.title}
              </a>
            ) : (
              cert.title
            )}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
            <span>{formatLongDate(cert.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesContent({ issuers, mode }: Props) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Flat list across all displayed issuers — modal navigates this in order.
  const flatCerts = issuers.flatMap((i) => i.certificates ?? []);

  const openModal = (cert: Certificate) => {
    const i = flatCerts.findIndex((c) => c._id === cert._id);
    if (i >= 0) setModalIndex(i);
  };

  const closeModal = () => setModalIndex(null);

  const items = flatCerts.map((c) => ({
    type: "image" as const,
    src: c.image?.asset?.url ?? "",
    alt: c.title,
  }));
  const activeCert = modalIndex != null ? flatCerts[modalIndex] : null;

  if (mode === "filtered") {
    const issuer = issuers[0];
    if (!issuer) return null;
    return (
      <>
        <TopicSection title={issuer.name}>
          <CardGrid filtered>
            {issuer.certificates.map((cert) => (
              <CertCard key={cert._id} cert={cert} onOpen={openModal} />
            ))}
          </CardGrid>
        </TopicSection>
        <MediaModal
          open={modalIndex != null}
          onClose={closeModal}
          items={items}
          index={modalIndex ?? 0}
          onIndexChange={setModalIndex}
          title={activeCert?.title}
        />
      </>
    );
  }

  return (
    <>
      {issuers.map((issuer) => (
        <TopicSection key={issuer._id} title={issuer.name}>
          <CardGrid>
            {issuer.certificates.map((cert) => (
              <CertCard key={cert._id} cert={cert} onOpen={openModal} />
            ))}
          </CardGrid>
        </TopicSection>
      ))}
      <MediaModal
        open={modalIndex != null}
        onClose={closeModal}
        items={items}
        index={modalIndex ?? 0}
        onIndexChange={setModalIndex}
        title={activeCert?.title}
      />
    </>
  );
}
