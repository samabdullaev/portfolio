import type { Application } from "@/lib/sanity/queries/applications";
import { formatLongDate } from "@/lib/dates";
import { statusBadgeStyle, accentStyle } from "./statusColor";
import PostingLink from "./PostingLink";

export type SortKey =
  | "jobTitle"
  | "company"
  | "status"
  | "location"
  | "mode"
  | "platform"
  | "lastUpdated";
export interface Sort {
  key: SortKey;
  dir: "asc" | "desc";
}

function StatusBadge({ status }: { status: Application["status"] }) {
  if (!status) return <span className="text-text-secondary/40">—</span>;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap"
      style={statusBadgeStyle(status.accentColor)}
    >
      <span className="size-1.5 rounded-full" style={accentStyle(status.accentColor)} />
      {status.label}
    </span>
  );
}

function SortHeader({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: Sort;
  onSort: (k: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  return (
    <th className="sticky top-0 xl:top-18 z-10 bg-card border-b border-border shadow-[0_6px_6px_-6px_rgba(0,0,0,0.12)] px-3 py-3 text-left text-xs font-semibold text-text-secondary whitespace-nowrap">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`group inline-flex cursor-pointer items-center gap-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 ${active ? "text-text" : "hover:text-text"}`}
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-3 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
        >
          {active && sort.dir === "asc" ? <path d="m6 15 6-6 6 6" /> : <path d="m6 9 6 6 6-6" />}
        </svg>
      </button>
    </th>
  );
}

export default function ApplicationsTable({
  applications,
  sort,
  onSort,
}: {
  applications: Application[];
  sort: Sort;
  onSort: (k: SortKey) => void;
}) {
  const th = "sticky top-0 xl:top-18 z-10 bg-card border-b border-border shadow-[0_6px_6px_-6px_rgba(0,0,0,0.12)] px-3 py-3 text-left text-xs font-semibold text-text-secondary whitespace-nowrap";
  const td = "px-3 py-3 align-top";

  return (
    // Mobile/tablet: a bounded scroll box (max-h) so the header sticks to the
    // box top during internal scroll. xl: drop the box so the whole page scrolls
    // and the header pins below the navbar (top-18). Rounded corners on the
    // first/last header cells so the top matches the wrapper's rounded bottom.
    <div className="overflow-auto max-h-[70vh] xl:overflow-visible xl:max-h-none rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[1000px] border-collapse text-[13px]">
        <thead>
          <tr className="[&>th:first-child]:rounded-tl-2xl [&>th:last-child]:rounded-tr-2xl">
            <th className={`${th} w-10`}>#</th>
            <SortHeader label="Role" sortKey="jobTitle" sort={sort} onSort={onSort} />
            <SortHeader label="Company" sortKey="company" sort={sort} onSort={onSort} />
            <SortHeader label="Status" sortKey="status" sort={sort} onSort={onSort} />
            <SortHeader label="Location" sortKey="location" sort={sort} onSort={onSort} />
            <SortHeader label="Mode" sortKey="mode" sort={sort} onSort={onSort} />
            <SortHeader label="Platform" sortKey="platform" sort={sort} onSort={onSort} />
            <th className={th}>HR Notes</th>
            <th className={th}>Personal Notes</th>
            <SortHeader label="Updated" sortKey="lastUpdated" sort={sort} onSort={onSort} />
          </tr>
        </thead>
        <tbody>
          {applications.map((a, i) => {
            const location = [a.city, a.country].filter(Boolean).join(" · ");
            return (
              <tr
                key={a._id}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-hover/40 dark:hover:bg-border/30"
              >
                <td className={`${td} text-text-secondary tabular-nums`}>{i + 1}</td>
                <td className={`${td} font-medium text-text`}>{a.jobTitle}</td>
                <td className={`${td} text-text`}>{a.company}</td>
                <td className={td}><StatusBadge status={a.status} /></td>
                <td className={`${td} whitespace-nowrap text-text-secondary`}>{location || "—"}</td>
                <td className={td}>
                  {a.mode ? (
                    <span className="inline-flex rounded-full bg-hover dark:bg-border px-2 py-0.5 text-xs font-medium text-text-secondary whitespace-nowrap">
                      {a.mode}
                    </span>
                  ) : (
                    <span className="text-text-secondary/40">—</span>
                  )}
                </td>
                <td className={td}><PostingLink platform={a.platform} url={a.jobLink} /></td>
                <td className={`${td} min-w-[120px] max-w-[150px] text-text-secondary`}>{a.hrNotes || "—"}</td>
                <td className={`${td} min-w-[120px] max-w-[150px] text-text-secondary`}>{a.personalNotes || "—"}</td>
                <td className={`${td} whitespace-nowrap text-text-secondary tabular-nums`}>{formatLongDate(a.lastUpdated)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
