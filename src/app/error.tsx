"use client";

import { useEffect } from "react";

// Root-level error boundary. Catches unhandled errors thrown anywhere in
// the route tree (server or client). Logs to console for now; wire up to
// a real reporter in Phase 14.
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
    <div
      role="alert"
      className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-20 text-center"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-text-secondary motion-safe:animate-[shake_0.6s_ease-in-out]"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>

      <div className="flex flex-col items-center gap-3 max-w-md">
        <h1 className="text-3xl font-extrabold tracking-tight max-sm:text-2xl">
          Something went wrong
        </h1>
        <p className="text-base text-text-secondary">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-card border border-border hover:bg-hover py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px max-sm:w-full"
      >
        Try again
      </button>
    </div>
  );
}
