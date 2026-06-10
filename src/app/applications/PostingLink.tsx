// Merged Posting + Platform affordance: a labeled chip showing the platform
// (e.g. "LinkedIn"), linking out to the job posting. Bigger/easier to click
// than a bare icon. Used in the table cell and the board card.
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function PostingLink({
  platform,
  url,
}: {
  platform: string | null;
  url: string | null;
}) {
  if (!url) {
    return platform ? (
      <span className="text-text-secondary">{platform}</span>
    ) : (
      <span className="text-text-secondary/40" aria-hidden="true">—</span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform ?? "Job"} posting`}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border bg-hover dark:bg-border px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text"
    >
      {platform ?? "Posting"}
      <ExternalIcon />
    </a>
  );
}
