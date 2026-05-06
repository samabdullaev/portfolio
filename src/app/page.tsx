import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { homePageQuery, type HomePageData } from "@/lib/sanity/queries/home";
import SocialTile from "@/components/ui/SocialTile";
import { SOCIAL_ICONS } from "@/data/social-icons";

export default async function Home() {
  const home = await sanityFetch<HomePageData | null>(homePageQuery);

  if (!home) return null;

  return (
    <section className="flex flex-col items-center justify-center text-center flex-1 p-6 gap-9 max-sm:p-5 max-sm:gap-6">
      {home.profileImage?.asset?.url && (
        <div data-testid="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={home.profileImage.asset.url}
            alt={home.name}
            width={180}
            height={180}
            className="size-45 rounded-full border-2 border-border bg-card object-cover max-sm:size-35"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight max-sm:text-4xl">
          {home.name}
        </h1>
        <p className="text-2xl text-text-secondary font-medium max-sm:text-lg">
          {home.title}
        </p>
        {home.location && (
          <span className="inline-flex items-center gap-1 text-base text-text-secondary mt-0.5">
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
        <div data-testid="hero-socials" className="flex items-center gap-3 mt-1">
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

      <div data-testid="hero-actions" className="flex items-center gap-3 mt-2 max-sm:flex-col max-sm:w-full">
        {home.resumeFile?.asset?.url && (
          <a
            href={home.resumeFile.asset.url}
            download
            className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-[#222] hover:bg-[#444] py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px dark:bg-[#f0f0f0] dark:text-[#171717] dark:hover:bg-[#ddd] max-sm:w-full"
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
          <Link
            href={home.ctaUrl}
            className="inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-card border border-border hover:bg-hover py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-1 max-sm:w-full"
          >
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
