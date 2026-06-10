import type {
  Application,
  ApplicationStatus,
} from "@/lib/sanity/queries/applications";
import { formatLongDate } from "@/lib/dates";
import { accentStyle } from "./statusColor";
import PostingLink from "./PostingLink";

function BoardCard({ app }: { app: Application }) {
  const location = [app.city, app.country].filter(Boolean).join(" · ");
  return (
    <div className="rounded-xl border border-border bg-card dark:bg-hover p-3.5 shadow-sm transition-colors">
      <h3 className="font-medium text-text leading-snug">{app.jobTitle}</h3>
      <p className="mt-0.5 text-sm text-text-secondary">
        {app.company}
        {location && ` · ${location}`}
      </p>
      {app.mode && (
        <div className="mt-2">
          <span className="inline-flex rounded-full bg-hover dark:bg-border px-2 py-0.5 text-xs font-medium text-text-secondary">
            {app.mode}
          </span>
        </div>
      )}
      {/* posting link left-aligned (consistent across cards), date right */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <PostingLink platform={app.platform} url={app.jobLink} />
        <span className="shrink-0 text-xs text-text-secondary tabular-nums">
          {formatLongDate(app.lastUpdated)}
        </span>
      </div>
    </div>
  );
}

export default function ApplicationsBoard({
  applications,
  statuses,
}: {
  applications: Application[];
  statuses: ApplicationStatus[];
}) {
  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:thin]">
      {statuses.map((status) => {
        const cards = applications.filter(
          (a) => a.status?.slug === status.slug.current,
        );
        return (
          <section
            key={status._id}
            className="flex h-[70vh] snap-start shrink-0 w-[300px] max-sm:w-[82%] flex-col rounded-2xl border border-border bg-hover dark:bg-card p-3"
          >
            <div className="mb-3 flex shrink-0 items-center gap-2 px-1">
              <span className="size-2 rounded-full" style={accentStyle(status.accentColor)} />
              <h2 className="text-sm font-semibold text-text">{status.label}</h2>
              <span className="rounded-full bg-card dark:bg-border px-2 py-0.5 text-xs font-medium text-text-secondary tabular-nums">
                {cards.length}
              </span>
            </div>
            <div
              className={`flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5 [scrollbar-width:thin] ${
                cards.length === 0 ? "justify-center" : ""
              }`}
            >
              {cards.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-xs text-text-secondary">
                  No applications
                </p>
              ) : (
                cards.map((app) => <BoardCard key={app._id} app={app} />)
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
