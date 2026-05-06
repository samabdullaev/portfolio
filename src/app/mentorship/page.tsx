import { sanityFetch } from "@/lib/sanity";
import {
  mentorshipArticlesQuery,
  type MentorshipArticle,
} from "@/lib/sanity/queries/mentorship";
import HubCard from "@/components/ui/HubCard";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export default async function MentorshipPage() {
  const articles = await sanityFetch<MentorshipArticle[]>(mentorshipArticlesQuery);

  return (
    <HubPage>
      <HubHeader
        title="Mentorship"
        subtitle="Guidance articles from university to career — published on Publink"
      />

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
    </HubPage>
  );
}
