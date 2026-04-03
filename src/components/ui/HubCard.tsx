import Link from "next/link";

interface HubCardProps {
  href: string;
  title: string;
  subtitle?: string;
  thumbnail?: string; // image path
  meta?: string; // e.g. "Part 1 · Aug 2, 2025"
  tag?: string; // e.g. "Task 1"
  external?: boolean; // opens in new tab
}

export default function HubCard({
  href,
  title,
  subtitle,
  thumbnail,
  meta,
  tag,
  external,
}: HubCardProps) {
  const inner = (
    <div className="hub-card-inner">
      {thumbnail && (
        <div className="hub-card-thumb">
          <div
            className="hub-card-thumb-img"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        </div>
      )}
      <div className="hub-card-content">
        <h3>{title}</h3>
        {subtitle && <p className="hub-card-subtitle">{subtitle}</p>}
        {(meta || tag) && (
          <div className="hub-card-meta">
            {tag && <span className="hub-card-tag">{tag}</span>}
            {meta && <span>{meta}</span>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="hub-card">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href}>
          {inner}
        </Link>
      )}
    </div>
  );
}
