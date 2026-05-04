"use client";

import { useState, useEffect, useCallback } from "react";
import "./certificates.css";

export interface Certificate {
  _id: string;
  title: string;
  date: string;
  image: { asset: { url: string } } | null;
  verifyUrl: string | null;
  issuerName: string;
  issuerSlug: string;
}

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
              backgroundImage: cert.image?.asset?.url ? `url(${cert.image.asset.url})` : undefined,
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
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

  const closeModal = useCallback(() => {
    setModalCert(null);
    document.body.style.overflow = "";
  }, []);

  const openModal = (cert: Certificate) => {
    setModalCert(cert);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!modalCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalCert, closeModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
        <CertModal cert={modalCert} onClose={closeModal} />
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
      <CertModal cert={modalCert} onClose={closeModal} />
    </>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  if (!cert) return null;
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="cert-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cert.image?.asset?.url || ""} alt={cert.title} />
        <div className="cert-modal-info">
          <p className="cert-modal-title">{cert.title}</p>
          <p className="cert-modal-date">{cert.date}</p>
        </div>
      </div>
    </div>
  );
}
