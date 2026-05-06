"use client";

import { useEffect } from "react";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

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
    <div role="alert">
      <HubPage>
        <HubHeader
          title="Something went wrong"
          subtitle={error.message || "An unexpected error occurred while loading this page."}
        />
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-card border border-border hover:bg-hover py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px max-sm:w-full"
        >
          Try again
        </button>
      </HubPage>
    </div>
  );
}
