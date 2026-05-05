import { sanityFetch } from "@/lib/sanity";
import {
  mentorshipArticlesQuery,
  type MentorshipArticle,
} from "@/lib/sanity/queries/mentorship";
import HubCard from "@/components/ui/HubCard";

export default async function MentorshipPage() {
  const articles = await sanityFetch<MentorshipArticle[]>(mentorshipArticlesQuery);

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Mentorship</h1>
        <p className="hub-subtitle">
          Guidance articles from university to career — published on Publink
        </p>
      </div>

      <div className="card-grid-filtered">
        {articles.map((a) => (
          <HubCard
            key={a._id}
            href={a.externalUrl}
            title={a.title}
            tag={a.task}
            meta={a.date}
            thumbnail={a.thumbnail?.asset?.url}
            external
          />
        ))}
      </div>
    </main>
  );
}
