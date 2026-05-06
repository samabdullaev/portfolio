import Link from "next/link";
import Image from "next/image";
import "./FilterCardRow.css";

export interface FilterCardItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  thumbnail?: string;
}

interface FilterCardRowProps {
  items: FilterCardItem[];
  activeSlug: string | null;
  basePath: string; // e.g. "/certificates"
  paramName: string; // e.g. "issuer"
}

export default function FilterCardRow({
  items,
  activeSlug,
  basePath,
  paramName,
}: FilterCardRowProps) {
  return (
    <div
      className="filter-card-row"
      role="tablist"
      aria-label="Filter"
      // Always size cards as if there were at least 9 columns. With fewer items,
      // cards stay at the natural 1/9-of-row width and leave empty space on the
      // right instead of stretching to fill the row.
      style={{ "--filter-count": Math.max(items.length, 9) } as React.CSSProperties}
    >
      {items.map((item) => {
        const isActive = activeSlug === item.slug;
        // Clicking the active card returns to the unfiltered view (toggle off).
        const href = isActive ? basePath : `${basePath}?${paramName}=${item.slug}`;
        return (
          <Link
            key={item.id}
            href={href}
            className={`filter-card${isActive ? " active" : ""}`}
            role="tab"
            aria-selected={isActive}
          >
            <div className="filter-card-logo">
              {item.thumbnail && (
                <Image src={item.thumbnail} alt="" width={153} height={146} />
              )}
            </div>
            <div className="filter-card-name">{item.name}</div>
            <div className="filter-card-count">
              {item.count} {item.count === 1 ? "item" : "items"}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
