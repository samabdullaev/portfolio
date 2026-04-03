import { sanityFetch } from "@/lib/sanity";
import TopicSection from "@/components/ui/TopicSection";
import HubCard from "@/components/ui/HubCard";

interface BlogArticle {
  _id: string;
  title: string;
  partNumber: number;
  date: string;
  externalUrl: string;
}

interface BlogSeries {
  title: string;
  articles: BlogArticle[];
}

export default async function BlogPage() {
  const series = await sanityFetch<BlogSeries[]>(
    `*[_type == "blogSeries"] | order(order asc){
      title,
      articles[]->{ _id, title, partNumber, date, externalUrl }
    }`,
  );

  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Blog</h1>
        <p className="hub-subtitle">
          Articles on tech, study abroad, and software development — published
          on Medium
        </p>
      </div>

      {series.map((s) => (
        <TopicSection key={s.title} title={s.title}>
          {s.articles.map((article) => (
            <HubCard
              key={article._id}
              href={article.externalUrl}
              title={article.title}
              tag={`Part ${article.partNumber}`}
              meta={article.date}
              external
            />
          ))}
        </TopicSection>
      ))}
    </main>
  );
}
