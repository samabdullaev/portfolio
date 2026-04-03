"use client";

import { useState, useEffect, useCallback } from "react";
import "./certificates.css";

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  image: { asset: { url: string } } | null;
  verifyUrl: string | null;
}

export default function CertificatesContent({
  certs,
}: {
  certs: Certificate[];
}) {
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

  // Group by issuer
  const issuerGroups: Record<string, Certificate[]> = {};
  for (const c of certs) {
    if (!issuerGroups[c.issuer]) issuerGroups[c.issuer] = [];
    issuerGroups[c.issuer].push(c);
  }
  const issuers = Object.keys(issuerGroups);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Certificates</h1>
      </div>

      {issuers.map((issuer) => (
        <div key={issuer} className="topic-section">
          <div className="section-header">
            <h2>{issuer}</h2>
          </div>
          <div className="card-grid always-visible">
            {issuerGroups[issuer].map((cert) => (
              <div
                key={cert._id}
                className="hub-card"
                onClick={() => openModal(cert)}
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
            ))}
          </div>
        </div>
      ))}

      {modalCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={closeModal}
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
            <img
              src={modalCert.image?.asset?.url || ""}
              alt={modalCert.title}
            />
            <div className="cert-modal-info">
              <p className="cert-modal-title">{modalCert.title}</p>
              <p className="cert-modal-date">{modalCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
