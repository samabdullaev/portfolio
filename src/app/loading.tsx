// Root-level loading boundary. Shown while any route segment without
// its own loading.tsx is fetching server data. Centered SA monogram +
// staggered three-dot pulse. Animations gated on prefers-reduced-motion.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-20"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="motion-safe:animate-pulse"
      >
        <rect
          className="fill-[#171717] dark:fill-[#faf8f4]"
          width="64"
          height="64"
          rx="14"
        />
        <text
          className="fill-[#faf8f4] dark:fill-[#171717]"
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontSize="30"
          letterSpacing="-1.2"
        >
          SA
        </text>
      </svg>

      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="block size-1.5 rounded-full bg-text-secondary motion-safe:animate-[loading-dot_1.4s_ease-in-out_infinite]" />
        <span className="block size-1.5 rounded-full bg-text-secondary motion-safe:animate-[loading-dot_1.4s_ease-in-out_infinite] [animation-delay:0.2s]" />
        <span className="block size-1.5 rounded-full bg-text-secondary motion-safe:animate-[loading-dot_1.4s_ease-in-out_infinite] [animation-delay:0.4s]" />
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
