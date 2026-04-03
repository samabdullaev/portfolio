import CardGrid from "@/components/ui/CardGrid";
import HubCard from "@/components/ui/HubCard";

const series1 = {
  title: "Concept to Launch: Build SvelteKit & Sanity Website",
  articles: [
    {
      title: "How I Improved My Skills and Workflow in One Project",
      meta: "Part 10 · Aug 11, 2025",
      thumbnail: "/assets/blog/part10.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-e0f7460a79a0",
    },
    {
      title: "How I Tested and Delivered the Project to the Client",
      meta: "Part 9 · Aug 10, 2025",
      thumbnail: "/assets/blog/part09.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-51a6b18d1c62",
    },
    {
      title: "How I Deployed the Website and Configured the Domain",
      meta: "Part 8 · Aug 9, 2025",
      thumbnail: "/assets/blog/part08.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-fe6f345c33e7",
    },
    {
      title: "How I Integrated Telegram for Instant Alerts",
      meta: "Part 7 · Aug 8, 2025",
      thumbnail: "/assets/blog/part07.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-96e6848a6ad8",
    },
    {
      title: "How I Integrated Sanity and Structured the CMS",
      meta: "Part 6 · Aug 7, 2025",
      thumbnail: "/assets/blog/part06.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-c5f8dfb35369",
    },
    {
      title: "How I Used Props to Make Components Dynamic",
      meta: "Part 5 · Aug 6, 2025",
      thumbnail: "/assets/blog/part05.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-3a74d03b10ef",
    },
    {
      title: "How I Built Reusable Components for a Modular UI",
      meta: "Part 4 · Aug 5, 2025",
      thumbnail: "/assets/blog/part04.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-8462179a07d7",
    },
    {
      title: "How I Set Up the Repo and Development Environment",
      meta: "Part 3 · Aug 4, 2025",
      thumbnail: "/assets/blog/part03.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-6f2369c50234",
    },
    {
      title: "How I Turned a Template into a Prototype",
      meta: "Part 2 · Aug 3, 2025",
      thumbnail: "/assets/blog/part02.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-2bc1fe9b3540",
    },
    {
      title: "How I Planned the Project and Picked the Stack",
      meta: "Part 1 · Aug 2, 2025",
      thumbnail: "/assets/blog/part01.png",
      href: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-1eeb10ef2ded",
    },
  ],
};

const series2 = {
  title: "My Study Abroad Journey from UK to Canada",
  articles: [
    {
      title: "Life in Canada",
      meta: "Part 4 · Apr 20, 2025",
      thumbnail: "/assets/blog/life-in-canada.png",
      href: "https://samabdullaev.medium.com/life-in-canada-df91389dd0bc",
    },
    {
      title: "Preparing for Student Life in Canada",
      meta: "Part 3 · Feb 27, 2025",
      thumbnail: "/assets/blog/preparing-canada.png",
      href: "https://samabdullaev.medium.com/preparing-for-student-life-in-canada-c12b770c55cf",
    },
    {
      title: "How I Got My Canadian Visa",
      meta: "Part 2 · Feb 9, 2025",
      thumbnail: "/assets/blog/canadian-visa.png",
      href: "https://samabdullaev.medium.com/how-i-got-my-canadian-visa-644e3c828937",
    },
    {
      title: "How I Applied to Study in Canada",
      meta: "Part 1 · Jul 23, 2024",
      thumbnail: "/assets/blog/applied-canada.png",
      href: "https://samabdullaev.medium.com/how-i-applied-to-study-in-canada-3db47c5e2afc",
    },
  ],
};

const series3 = {
  title: "Professional Development Guide",
  articles: [
    {
      title: "My Hackathon Journey: Lessons Learned",
      meta: "Part 3 · Mar 4, 2024",
      thumbnail: "/assets/blog/hackathon.png",
      href: "https://samabdullaev.medium.com/my-hackathon-journey-lessons-learned-8501b5a362ce",
    },
    {
      title: "Your Ultimate LinkedIn Guide",
      meta: "Part 2 · Mar 1, 2024",
      thumbnail: "/assets/blog/linkedin-guide.png",
      href: "https://samabdullaev.medium.com/your-ultimate-linkedin-guide-09c8167ce528",
    },
    {
      title: "My Coding Journey: Online Learning Platforms That I Use",
      meta: "Part 1 · Nov 20, 2023",
      thumbnail: "/assets/blog/coding-journey.png",
      href: "https://samabdullaev.medium.com/my-coding-journey-online-learning-platforms-that-i-use-f6c15501a94",
    },
  ],
};

const series4 = {
  title: "Studying in the UK: A Comprehensive Guide",
  articles: [
    {
      title: "My UK Student Accommodation Journey",
      meta: "Part 6 · Jan 28, 2024",
      thumbnail: "/assets/blog/accommodation.png",
      href: "https://samabdullaev.medium.com/my-uk-student-accommodation-journey-8a8817a9a49f",
    },
    {
      title: "My First Academic Year in the UK",
      meta: "Part 5 · Dec 8, 2023",
      thumbnail: "/assets/blog/academic-year.jpeg",
      href: "https://samabdullaev.medium.com/my-first-academic-year-in-the-uk-3ff026beb3e6",
    },
    {
      title: "My First Year Abroad in the UK",
      meta: "Part 4 · Oct 27, 2023",
      thumbnail: "/assets/blog/first-year.jpg",
      href: "https://samabdullaev.medium.com/my-first-year-abroad-in-the-uk-15dc475748f1",
    },
    {
      title: "UK Post-Arrival Essentials and Tips",
      meta: "Part 3 · Oct 23, 2023",
      thumbnail: "/assets/blog/post-arrival.png",
      href: "https://samabdullaev.medium.com/uk-post-arrival-essentials-and-tips-11e1e9c6854c",
    },
    {
      title: "UK VISA Application Procedure and Pre-Arrival Tips",
      meta: "Part 2 · Oct 20, 2023",
      thumbnail: "/assets/blog/visa-tips.png",
      href: "https://samabdullaev.medium.com/uk-visa-application-procedure-and-pre-arrival-tips-6de31ddc1219",
    },
    {
      title: "Guide to Become an International Student in the UK",
      meta: "Part 1 · Feb 8, 2023",
      thumbnail: "/assets/blog/international-student.png",
      href: "https://samabdullaev.medium.com/guide-to-become-an-international-student-in-the-uk-b903ec53a790",
    },
  ],
};

const allSeries = [series1, series2, series3, series4];

export default function BlogPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Blog</h1>
        <p className="hub-subtitle">
          Articles on tech, study abroad, and software development — published
          on Medium
        </p>
      </div>

      {allSeries.map((series) => (
        <div key={series.title} className="topic-section">
          <div className="section-header">
            <h2>{series.title}</h2>
          </div>
          <CardGrid>
            {series.articles.map((article) => (
              <HubCard
                key={article.href}
                href={article.href}
                title={article.title}
                meta={article.meta}
                thumbnail={article.thumbnail}
                external
              />
            ))}
          </CardGrid>
        </div>
      ))}
    </main>
  );
}
