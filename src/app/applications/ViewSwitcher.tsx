export type View = "table" | "board";

const TableIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18" />
  </svg>
);

const BoardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="3" y="4" width="5.5" height="16" rx="1.5" />
    <rect x="9.25" y="4" width="5.5" height="10" rx="1.5" />
    <rect x="15.5" y="4" width="5.5" height="13" rx="1.5" />
  </svg>
);

export default function ViewSwitcher({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  const base =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 [&_svg]:size-4";
  const active = "bg-card text-text shadow-sm";
  const inactive = "text-text-secondary hover:text-text hover:bg-card/50";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full bg-hover dark:bg-border p-1"
      role="tablist"
      aria-label="View"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === "table"}
        onClick={() => onChange("table")}
        className={`${base} ${view === "table" ? active : inactive}`}
      >
        <TableIcon />
        Table
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "board"}
        onClick={() => onChange("board")}
        className={`${base} ${view === "board" ? active : inactive}`}
      >
        <BoardIcon />
        Board
      </button>
    </div>
  );
}
