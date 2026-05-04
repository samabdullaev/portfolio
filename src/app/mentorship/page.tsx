import { sanityFetch } from "@/lib/sanity";
import HubCard from "@/components/ui/HubCard";

interface MentorshipArticle {
  _id: string;
  title: string;
  task: string;
  date: string;
  externalUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export default async function MentorshipPage() {
  const articles = await sanityFetch<MentorshipArticle[]>(
    `*[_type == "mentorshipArticle"] | order(order asc){
      _id, title, task, date, externalUrl, thumbnail{ asset->{ url } }
    }`,
  );

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
