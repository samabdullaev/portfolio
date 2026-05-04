"use client";

import { ReactNode, useCallback, useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional centered title shown in the sticky top bar. */
  title?: string;
  /** Optional trailing text shown to the left of the close button (e.g. "1 of 12"). */
  trailing?: ReactNode;
  /** Optional leading slot at the left of the top bar (e.g. a grid-view icon). */
  leading?: ReactNode;
  children: ReactNode;
}

/**
 * Airbnb photo-tour-style modal: full-viewport white surface, sticky top bar,
 * scroll-locked body. Esc closes. Enters with a quick fade-in; closes instantly.
 */
export default function Modal({
  open,
  onClose,
  title,
  trailing,
  leading,
  children,
}: ModalProps) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="modal-root" role="dialog" aria-modal="true">
      <div className="modal-bg" />
      <div className="modal-topbar">
        <div className="modal-topbar-leading">{leading}</div>
        <div className="modal-topbar-center">
          {title && <div className="modal-topbar-title">{title}</div>}
          {trailing && (
            <span className="modal-topbar-counter mobile-only">{trailing}</span>
          )}
        </div>
        <div className="modal-topbar-trailing">
          {trailing && (
            <span className="modal-topbar-counter desktop-only">{trailing}</span>
          )}
          <button
            type="button"
            className="modal-topbar-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
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
        </div>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
}
