import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { homePageQuery, type HomePageData } from "@/lib/sanity/queries/home";
import SocialTile from "@/components/ui/SocialTile";
import { SOCIAL_ICONS } from "@/data/social-icons";

export default async function Home() {
  const home = await sanityFetch<HomePageData | null>(homePageQuery);

  if (!home) return null;

  return (
    <section className="hero">
      {home.profileImage?.asset?.url && (
        <div className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={home.profileImage.asset.url}
            alt={home.name}
            width={180}
            height={180}
          />
        </div>
      )}

      <div className="hero-text">
        <h1 className="hero-name">{home.name}</h1>
        <p className="hero-title">{home.title}</p>
        {home.location && (
          <span className="hero-location">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {home.location}
          </span>
        )}
      </div>

      {home.socials?.length > 0 && (
        <div className="hero-socials">
          {home.socials.map((s) => {
            const platform = s.platform.toLowerCase();
            return (
              <SocialTile
                key={s._key}
                href={s.url}
                label={s.platform}
                platform={platform as "linkedin" | "github" | "medium"}
              >
                {SOCIAL_ICONS[platform] ?? null}
              </SocialTile>
            );
          })}
        </div>
      )}

      <div className="hero-actions">
        {home.resumeFile?.asset?.url && (
          <a
            href={home.resumeFile.asset.url}
            download
            className="btn-resume"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        )}

        {home.ctaLabel && home.ctaUrl && (
          <Link href={home.ctaUrl} className="btn-secondary">
            {home.ctaLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}
