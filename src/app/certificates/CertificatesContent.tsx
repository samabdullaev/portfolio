"use client";

import { useState } from "react";
import MediaModal from "@/components/ui/MediaModal";
import type { Certificate } from "@/lib/sanity/queries/certificates";
import "./certificates.css";

export type { Certificate };

interface Props {
  certs: Certificate[];
  mode: "all" | "filtered";
  filteredHeading?: string;
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
      className="hub-card"
      onClick={() => onOpen(cert)}
      style={{ cursor: "pointer" }}
    >
      <div className="hub-card-inner">
        <div className="hub-card-thumb">
          <div
            className="hub-card-thumb-img"
            style={{
              backgroundImage: cert.image?.asset?.url
                ? `url(${cert.image.asset.url})`
                : undefined,
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="hub-card-content">
          <h3>
            {cert.verifyUrl ? (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {cert.title}
              </a>
            ) : (
              cert.title
            )}
          </h3>
          <div className="hub-card-meta">
            <span>{cert.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesContent({ certs, mode, filteredHeading }: Props) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = (cert: Certificate) => {
    const i = certs.findIndex((c) => c._id === cert._id);
    if (i >= 0) setModalIndex(i);
  };

  const closeModal = () => setModalIndex(null);

  const items = certs.map((c) => ({
    type: "image" as const,
    src: c.image?.asset?.url ?? "",
    alt: c.title,
  }));
  const activeCert = modalIndex != null ? certs[modalIndex] : null;

  // Filtered mode — single section, 1-column on mobile, normal grid on desktop
  if (mode === "filtered") {
    return (
      <>
        <div className="topic-section">
          {filteredHeading && (
            <div className="section-header">
              <h2>{filteredHeading}</h2>
            </div>
          )}
          <div className="card-grid-filtered">
            {certs.map((cert) => (
              <CertCard key={cert._id} cert={cert} onOpen={openModal} />
            ))}
          </div>
        </div>
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

  // All mode — group by issuer (preserves existing per-section horizontal scroll on mobile)
  const issuerGroups: { name: string; slug: string; certs: Certificate[] }[] = [];
  for (const c of certs) {
    let group = issuerGroups.find((g) => g.slug === c.issuerSlug);
    if (!group) {
      group = { name: c.issuerName, slug: c.issuerSlug, certs: [] };
      issuerGroups.push(group);
    }
    group.certs.push(c);
  }

  return (
    <>
      {issuerGroups.map((group) => (
        <div key={group.slug} className="topic-section">
          <div className="section-header">
            <h2>{group.name}</h2>
          </div>
          <div className="card-grid always-visible">
            {group.certs.map((cert) => (
              <CertCard key={cert._id} cert={cert} onOpen={openModal} />
            ))}
          </div>
        </div>
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
