import type { ReactNode } from "react";

interface CardGridProps {
  // When true: vertical 1-column on mobile (used when a filter chip narrows
  // the grid to a single section). When false: horizontal scroll-snap on
  // mobile (used as the default hub-page layout — multiple sections each
  // scrolling independently).
  filtered?: boolean;
  children: ReactNode;
}

const BASE = "grid grid-cols-4 gap-5 max-md:grid-cols-2 max-md:gap-4";
const FILTERED_MOBILE = "max-sm:grid-cols-1";
const HORIZONTAL_SCROLL_MOBILE = [
  "max-sm:flex max-sm:flex-nowrap max-sm:gap-3 max-sm:pb-1",
  "max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory",
  "max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden",
  "max-sm:[&>*]:flex-[0_0_80%] max-sm:[&>*]:min-w-0 max-sm:[&>*]:snap-start",
].join(" ");

export default function CardGrid({ filtered = false, children }: CardGridProps) {
  const marker = filtered ? "card-grid-filtered" : "card-grid";
  const mobile = filtered ? FILTERED_MOBILE : HORIZONTAL_SCROLL_MOBILE;
  return <div className={`${marker} ${BASE} ${mobile}`}>{children}</div>;
}
