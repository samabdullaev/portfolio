"use client";

import { useEffect } from "react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({ open, onClose, videoUrl }: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const src = videoUrl.includes("?")
    ? `${videoUrl}&autoplay=1&playsinline=1`
    : `${videoUrl}?autoplay=1&playsinline=1`;

  return (
    <div className="video-modal-overlay active" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <iframe
          src={src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: "12px" }}
        />
      </div>
    </div>
  );
}
