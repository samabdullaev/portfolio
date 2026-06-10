"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  color?: string; // optional dot (e.g. status accent)
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: DropdownOption[];
  onChange: (v: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  // The menu is positioned `fixed` (anchored to the trigger) so it escapes any
  // overflow-scroll ancestor — e.g. the horizontally-scrolling filter row.
  // Triggers on the right half of the screen anchor by `right` so the menu
  // grows leftward and never gets clipped off the screen edge.
  const [coords, setCoords] = useState<{
    top: number;
    left: number | null;
    right: number | null;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (r) {
      const anchorRight = (r.left + r.right) / 2 > window.innerWidth / 2;
      setCoords({
        top: r.bottom + 6,
        left: anchorRight ? null : r.left,
        right: anchorRight ? window.innerWidth - r.right : null,
        width: r.width,
      });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Page scroll / resize would misalign a fixed menu — close it.
    const onReflow = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onReflow);
    window.addEventListener("resize", onReflow);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onReflow);
      window.removeEventListener("resize", onReflow);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value) ?? null;
  const active = value !== null;

  const itemCls = (isSelected: boolean) =>
    `flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-hover dark:hover:bg-border hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 ${
      isSelected ? "bg-hover dark:bg-border font-medium text-text" : "text-text-secondary"
    }`;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-card py-2 pl-3 pr-2.5 text-sm transition-colors duration-200 hover:bg-hover dark:hover:bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/35 ${
          active ? "border-text-secondary font-medium text-text" : "border-border text-text-secondary"
        }`}
      >
        {selected?.color && (
          <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
        )}
        {selected ? selected.label : label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 text-text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && coords && (
        <div
          style={{
            position: "fixed",
            top: coords.top,
            minWidth: coords.width,
            maxWidth: "calc(100vw - 16px)",
            ...(coords.left != null ? { left: coords.left } : { right: coords.right ?? 0 }),
          }}
          className="z-50 max-h-64 overflow-auto rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
            className={itemCls(value === null)}
          >
            {label}
          </button>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={itemCls(o.value === value)}
            >
              {o.color && (
                <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: o.color }} />
              )}
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
