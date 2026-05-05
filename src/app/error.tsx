"use client";

import { useEffect } from "react";

// Root-level error boundary. Catches unhandled errors thrown anywhere
// in the route tree (server or client). Logs to console for now; will
// wire up to a real reporter in Phase 14.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="hub-page" role="alert">
      <div className="hub-header">
        <h1>Something went wrong</h1>
        <p className="hub-subtitle">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
      </div>
      <button type="button" onClick={() => reset()} className="btn-secondary">
        Try again
      </button>
    </section>
  );
}
