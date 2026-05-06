import Link from "next/link";

interface HubCardProps {
  href: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  meta?: string;
  tag?: string;
  external?: boolean;
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
    <div className="flex flex-col bg-card rounded-2xl p-2 overflow-hidden transition-colors duration-300">
      {thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border bg-card">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        </div>
      )}
      <div className="pt-4 px-3 pb-2 max-sm:pt-3 max-sm:px-2 max-sm:pb-1">
        <h3 className="text-base font-semibold tracking-tight line-clamp-2 max-sm:text-sm">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
            {subtitle}
          </p>
        )}
        {(meta || tag) && (
          <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
            {tag && (
              <span className="text-xs font-semibold text-text-secondary bg-hover dark:bg-border py-0.5 px-2 rounded-full whitespace-nowrap">
                {tag}
              </span>
            )}
            {meta && <span>{meta}</span>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div data-testid="hub-card">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className="group block">
          {inner}
        </Link>
      )}
    </div>
  );
}
