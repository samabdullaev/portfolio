import Link from "next/link";
import Image from "next/image";

interface HubCardProps {
  href: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  meta?: string;
  tag?: string;
  external?: boolean;
  cta?: string;
}

export default function HubCard({
  href,
  title,
  subtitle,
  thumbnail,
  meta,
  tag,
  external,
  cta,
}: HubCardProps) {
  const inner = (
    <div className="flex flex-col bg-card rounded-2xl p-2 overflow-hidden transition-colors duration-300">
      {thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
        {cta && (
          /* Decorative button-like affordance; aria-hidden so the card link
             isn't re-announced. Screen readers fold the cta text into the
             link's accessible name. Filled surface (not a border) reuses the
             same token pairing as the tag pill so it's visible in both themes. */
          <span
            aria-hidden="true"
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-text bg-hover dark:bg-border rounded-2xl py-2.5 px-4 transition-all duration-300 group-hover:bg-border dark:group-hover:bg-hover active:scale-[0.98] group-focus-visible:ring-2 group-focus-visible:ring-text group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-card [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5 max-sm:py-2 max-sm:text-xs max-sm:[&_svg]:size-3.5"
          >
            {cta}
            {external ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </span>
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
