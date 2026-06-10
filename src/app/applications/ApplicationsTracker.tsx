"use client";

import { useMemo, useState } from "react";
import type {
  Application,
  ApplicationStatus,
} from "@/lib/sanity/queries/applications";
import { formatMonthYear } from "@/lib/dates";
import ApplicationsToolbar from "./ApplicationsToolbar";
import ApplicationsTable, { type Sort, type SortKey } from "./ApplicationsTable";
import ApplicationsBoard from "./ApplicationsBoard";
import { toCSV, toJSON, downloadFile } from "./exportApplications";
import type { DropdownOption } from "./Dropdown";
import type { View } from "./ViewSwitcher";

const DEFAULT_SORT: Sort = { key: "lastUpdated", dir: "desc" };

const locationOf = (a: Application) =>
  [a.city, a.country].filter(Boolean).join(" · ");

// distinct, sorted string options
const distinctOptions = (values: (string | null)[]): DropdownOption[] =>
  [...new Set(values.filter(Boolean) as string[])]
    .sort()
    .map((v) => ({ value: v, label: v }));

export default function ApplicationsTracker({
  applications,
  statuses,
}: {
  applications: Application[];
  statuses: ApplicationStatus[];
}) {
  const [view, setView] = useState<View>("table");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  // Status options follow the pipeline order, with their accent dot.
  const statusOptions: DropdownOption[] = useMemo(
    () => statuses.map((s) => ({ value: s.slug.current, label: s.label, color: s.accentColor })),
    [statuses],
  );
  // slug → pipeline position, for sorting the Status column by stage.
  const statusOrder = useMemo(
    () => new Map(statuses.map((s, i) => [s.slug.current, i])),
    [statuses],
  );
  // Modes in pipeline-agnostic but sensible order.
  const modeOptions: DropdownOption[] = useMemo(() => {
    const order = ["Onsite", "Hybrid", "Remote"];
    const present = new Set(applications.map((a) => a.mode).filter(Boolean));
    return order.filter((m) => present.has(m)).map((m) => ({ value: m, label: m }));
  }, [applications]);
  const platformOptions = useMemo(() => distinctOptions(applications.map((a) => a.platform)), [applications]);
  const locationOptions = useMemo(() => distinctOptions(applications.map(locationOf)), [applications]);
  const monthOptions: DropdownOption[] = useMemo(() => {
    const set = [...new Set(applications.map((a) => a.lastUpdated.slice(0, 7)))];
    return set.sort().reverse().map((m) => ({ value: m, label: formatMonthYear(m) }));
  }, [applications]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = applications.filter((a) => {
      if (statusFilter && a.status?.slug !== statusFilter) return false;
      if (mode && a.mode !== mode) return false;
      if (platform && a.platform !== platform) return false;
      if (location && locationOf(a) !== location) return false;
      if (month && a.lastUpdated.slice(0, 7) !== month) return false;
      if (q && !`${a.company} ${a.jobTitle}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const dir = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sort.key) {
        case "jobTitle":
          return a.jobTitle.localeCompare(b.jobTitle) * dir;
        case "company":
          return a.company.localeCompare(b.company) * dir;
        case "status": {
          const ai = statusOrder.get(a.status?.slug ?? "") ?? 99;
          const bi = statusOrder.get(b.status?.slug ?? "") ?? 99;
          return (ai - bi) * dir;
        }
        case "location":
          return locationOf(a).localeCompare(locationOf(b)) * dir;
        case "mode":
          return (a.mode ?? "").localeCompare(b.mode ?? "") * dir;
        case "platform":
          return (a.platform ?? "").localeCompare(b.platform ?? "") * dir;
        case "lastUpdated":
        default:
          return a.lastUpdated.localeCompare(b.lastUpdated) * dir;
      }
    });
  }, [applications, statusFilter, mode, platform, location, month, query, sort, statusOrder]);

  const anyFilter =
    statusFilter !== null ||
    mode !== null ||
    platform !== null ||
    location !== null ||
    month !== null ||
    query.trim() !== "";

  const clearAll = () => {
    setStatusFilter(null);
    setMode(null);
    setPlatform(null);
    setLocation(null);
    setMonth(null);
    setQuery("");
  };

  const handleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "lastUpdated" ? "desc" : "asc" },
    );
  };

  const exportName = (ext: string) =>
    `applications-${new Date().toISOString().slice(0, 10)}.${ext}`;

  return (
    <>
      <ApplicationsToolbar
        query={query}
        onQueryChange={setQuery}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        modeOptions={modeOptions}
        mode={mode}
        onModeChange={setMode}
        platformOptions={platformOptions}
        platform={platform}
        onPlatformChange={setPlatform}
        locationOptions={locationOptions}
        location={location}
        onLocationChange={setLocation}
        monthOptions={monthOptions}
        month={month}
        onMonthChange={setMonth}
        view={view}
        onViewChange={setView}
        onExportCsv={() => downloadFile(exportName("csv"), toCSV(rows), "text/csv;charset=utf-8")}
        onExportJson={() => downloadFile(exportName("json"), toJSON(rows), "application/json")}
        total={applications.length}
        shown={rows.length}
        anyFilter={anyFilter}
        onClear={clearAll}
      />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-text-secondary">
            {anyFilter ? "No applications match your filters." : "No applications yet."}
          </p>
          {anyFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 inline-flex cursor-pointer items-center rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-semibold text-text transition-colors hover:bg-hover dark:hover:bg-border"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : view === "table" ? (
        <ApplicationsTable applications={rows} sort={sort} onSort={handleSort} />
      ) : (
        <ApplicationsBoard applications={rows} statuses={statuses} />
      )}
    </>
  );
}
