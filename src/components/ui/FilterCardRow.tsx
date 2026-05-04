import Link from "next/link";
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
      style={{ "--filter-count": items.length } as React.CSSProperties}
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
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.thumbnail} alt="" />
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
