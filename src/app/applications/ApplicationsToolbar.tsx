import ViewSwitcher, { type View } from "./ViewSwitcher";
import Dropdown, { type DropdownOption } from "./Dropdown";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </svg>
);

const exportBtn =
  "inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-text bg-card border border-border rounded-xl py-2 px-3.5 transition-colors duration-200 hover:bg-hover dark:hover:bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 active:scale-[0.98] [&_svg]:size-4";

export default function ApplicationsToolbar({
  query,
  onQueryChange,
  statusOptions,
  statusFilter,
  onStatusFilterChange,
  modeOptions,
  mode,
  onModeChange,
  platformOptions,
  platform,
  onPlatformChange,
  locationOptions,
  location,
  onLocationChange,
  monthOptions,
  month,
  onMonthChange,
  view,
  onViewChange,
  onExportCsv,
  onExportJson,
  total,
  shown,
  anyFilter,
  onClear,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  statusOptions: DropdownOption[];
  statusFilter: string | null;
  onStatusFilterChange: (slug: string | null) => void;
  modeOptions: DropdownOption[];
  mode: string | null;
  onModeChange: (v: string | null) => void;
  platformOptions: DropdownOption[];
  platform: string | null;
  onPlatformChange: (v: string | null) => void;
  locationOptions: DropdownOption[];
  location: string | null;
  onLocationChange: (v: string | null) => void;
  monthOptions: DropdownOption[];
  month: string | null;
  onMonthChange: (v: string | null) => void;
  view: View;
  onViewChange: (v: View) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  total: number;
  shown: number;
  anyFilter: boolean;
  onClear: () => void;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Row 1: search + view switcher + exports */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[220px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search company or role…"
            aria-label="Search applications"
            className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2 text-sm text-text placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:border-text-secondary"
          />
        </div>

        <ViewSwitcher view={view} onChange={onViewChange} />

        <div className="flex items-center gap-2">
          <button type="button" onClick={onExportCsv} className={exportBtn}>
            CSV
            <DownloadIcon />
          </button>
          <button type="button" onClick={onExportJson} className={exportBtn}>
            JSON
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Filters + result count / clear. Mobile: stacked (dropdowns in a
          horizontal-scroll row, then the count below). Desktop: one row —
          dropdowns left, count + clear pushed to the right (uses the space).
          Dropdown menus are positioned `fixed`, so they escape the scroll box. */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:min-w-0 lg:flex-1">
          <Dropdown label="Month" value={month} options={monthOptions} onChange={onMonthChange} />
          <Dropdown label="Status" value={statusFilter} options={statusOptions} onChange={onStatusFilterChange} />
          <Dropdown label="Location" value={location} options={locationOptions} onChange={onLocationChange} />
          <Dropdown label="Mode" value={mode} options={modeOptions} onChange={onModeChange} />
          <Dropdown label="Platform" value={platform} options={platformOptions} onChange={onPlatformChange} />
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm">
          <span className="text-text-secondary tabular-nums">
            {anyFilter ? `${shown} of ${total}` : `${total} applications`}
          </span>
          {anyFilter && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-medium text-text transition-colors duration-200 hover:bg-hover dark:hover:bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 [&_svg]:size-3.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
