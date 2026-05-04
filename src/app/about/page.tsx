import "./about.css";
import { sanityFetch } from "@/lib/sanity";
import { SanityAboutPage } from "@/lib/sanity-types";
import ExpandText from "@/components/ui/ExpandText";
import ContributionsGrid from "@/components/sections/ContributionsGrid";
import HobbiesList from "@/components/sections/HobbiesList";

export default async function AboutPage() {
  const about = await sanityFetch<SanityAboutPage | null>(
    `*[_id == "aboutPage"][0]{
      profileImage{ asset->{ url } },
      bioParagraphs[]{ _key, summary, expandedText },
      contributions[]{ _key, emoji, title, description, url },
      hobbies[]{ _key, emoji, label }
    }`,
  );

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
          <ContributionsGrid items={about.contributions} />
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
