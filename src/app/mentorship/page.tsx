import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  mentorshipArticlesQuery,
  type MentorshipArticle,
} from "@/lib/sanity/queries/mentorship";
import { formatLongDate } from "@/lib/dates";
import HubCard from "@/components/ui/HubCard";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";
import CardGrid from "@/components/layout/CardGrid";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "Guidance articles from university to career by Sam Abdullaev — published on Publink.",
};

export default async function MentorshipPage() {
  const articles = await sanityFetch<MentorshipArticle[]>(mentorshipArticlesQuery);

  return (
    <HubPage>
      <HubHeader
        title="Mentorship"
        subtitle="Guidance articles from university to career — published on Publink"
      />

      <CardGrid filtered>
        {articles.map((a) => (
          <HubCard
            key={a._id}
            href={a.externalUrl}
            title={a.title}
            tag={a.task}
            meta={formatLongDate(a.date)}
            thumbnail={a.thumbnail?.asset?.url}
            external
            cta="Read on Publink"
          />
        ))}
      </CardGrid>
    </HubPage>
  );
}
