import "./about.css";
import { sanityFetch } from "@/lib/sanity";
import { aboutPageQuery, type AboutPageData } from "@/lib/sanity/queries/about";
import ExpandText from "@/components/ui/ExpandText";
import ContributionsBentoCreative from "@/components/sections/ContributionsBentoCreative";
import HobbiesList from "@/components/sections/HobbiesList";

// Re-fetch the page (and its `latestPosts` / `latestArticle` sub-queries)
// at most once per hour so newly-published journey updates and Medium
// articles surface in the bento without a redeploy.
export const revalidate = 3600;

export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData>(aboutPageQuery);

  const { about, latestPosts, latestArticle } = data;
  if (!about) return null;

  return (
    <section className="hub-page">
      <div className="hub-header">
        <h1>About</h1>
        <p className="hub-subtitle">A bit more about me, what I do, and what I enjoy</p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">About</h2>
        <div className="about-row">
          {about.profileImage?.asset?.url && (
            <div className="about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.profileImage.asset.url}
                alt="Sam Abdullaev"
                width={380}
                height={380}
              />
            </div>
          )}
          <div className="about-text">
            {about.bioParagraphs?.map((p) => (
              <ExpandText key={p._key} summary={p.summary} expanded={p.expandedText} />
            ))}
          </div>
        </div>
      </div>

      {about.contributions?.length > 0 && (
        <div className="about-section">
          <h2 className="about-section-title">Contributions</h2>
          <ContributionsBentoCreative
            items={about.contributions}
            latestPosts={latestPosts}
            latestArticle={latestArticle}
          />
        </div>
      )}

      {about.hobbies?.length > 0 && (
        <div className="about-section">
          <h2 className="about-section-title">Hobbies & Activities</h2>
          <HobbiesList items={about.hobbies} />
        </div>
      )}
    </section>
  );
}
