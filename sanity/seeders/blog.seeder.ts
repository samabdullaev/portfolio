import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

const seriesData = [
  {
    title: "Concept to Launch: Build SvelteKit & Sanity Website",
    slug: "concept-to-launch-sveltekit-sanity",
    articles: [
      {title: "How I Improved My Skills and Workflow in One Project", part: 10, date: "Aug 11, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-e0f7460a79a0"},
      {title: "How I Tested and Delivered the Project to the Client", part: 9, date: "Aug 10, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-51a6b18d1c62"},
      {title: "How I Deployed the Website and Configured the Domain", part: 8, date: "Aug 9, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-fe6f345c33e7"},
      {title: "How I Integrated Telegram for Instant Alerts", part: 7, date: "Aug 8, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-96e6848a6ad8"},
      {title: "How I Integrated Sanity and Structured the CMS", part: 6, date: "Aug 7, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-c5f8dfb35369"},
      {title: "How I Used Props to Make Components Dynamic", part: 5, date: "Aug 6, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-3a74d03b10ef"},
      {title: "How I Built Reusable Components for a Modular UI", part: 4, date: "Aug 5, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-8462179a07d7"},
      {title: "How I Set Up the Repo and Development Environment", part: 3, date: "Aug 4, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-6f2369c50234"},
      {title: "How I Turned a Template into a Prototype", part: 2, date: "Aug 3, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-2bc1fe9b3540"},
      {title: "How I Planned the Project and Picked the Stack", part: 1, date: "Aug 2, 2025", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-1eeb10ef2ded"},
    ],
  },
  {
    title: "My Study Abroad Journey from UK to Canada",
    slug: "study-abroad-uk-to-canada",
    articles: [
      {title: "Life in Canada", part: 4, date: "Apr 20, 2025", url: "https://samabdullaev.medium.com/life-in-canada-df91389dd0bc"},
      {title: "Preparing for Student Life in Canada", part: 3, date: "Feb 27, 2025", url: "https://samabdullaev.medium.com/preparing-for-student-life-in-canada-c12b770c55cf"},
      {title: "How I Got My Canadian Visa", part: 2, date: "Feb 9, 2025", url: "https://samabdullaev.medium.com/how-i-got-my-canadian-visa-644e3c828937"},
      {title: "How I Applied to Study in Canada", part: 1, date: "Jul 23, 2024", url: "https://samabdullaev.medium.com/how-i-applied-to-study-in-canada-3db47c5e2afc"},
    ],
  },
  {
    title: "Professional Development Guide",
    slug: "professional-development-guide",
    articles: [
      {title: "My Hackathon Journey: Lessons Learned", part: 3, date: "Mar 4, 2024", url: "https://samabdullaev.medium.com/my-hackathon-journey-lessons-learned-8501b5a362ce"},
      {title: "Your Ultimate LinkedIn Guide", part: 2, date: "Mar 1, 2024", url: "https://samabdullaev.medium.com/your-ultimate-linkedin-guide-09c8167ce528"},
      {title: "My Coding Journey: Online Learning Platforms That I Use", part: 1, date: "Nov 20, 2023", url: "https://samabdullaev.medium.com/my-coding-journey-online-learning-platforms-that-i-use-f6c15501a94"},
    ],
  },
  {
    title: "Studying in the UK: A Comprehensive Guide",
    slug: "studying-in-the-uk",
    articles: [
      {title: "My UK Student Accommodation Journey", part: 6, date: "Jan 28, 2024", url: "https://samabdullaev.medium.com/my-uk-student-accommodation-journey-8a8817a9a49f"},
      {title: "My First Academic Year in the UK", part: 5, date: "Dec 8, 2023", url: "https://samabdullaev.medium.com/my-first-academic-year-in-the-uk-3ff026beb3e6"},
      {title: "My First Year Abroad in the UK", part: 4, date: "Oct 27, 2023", url: "https://samabdullaev.medium.com/my-first-year-abroad-in-the-uk-15dc475748f1"},
      {title: "UK Post-Arrival Essentials and Tips", part: 3, date: "Oct 23, 2023", url: "https://samabdullaev.medium.com/uk-post-arrival-essentials-and-tips-11e1e9c6854c"},
      {title: "UK VISA Application Procedure and Pre-Arrival Tips", part: 2, date: "Oct 20, 2023", url: "https://samabdullaev.medium.com/uk-visa-application-procedure-and-pre-arrival-tips-6de31ddc1219"},
      {title: "Guide to Become an International Student in the UK", part: 1, date: "Feb 8, 2023", url: "https://samabdullaev.medium.com/guide-to-become-an-international-student-in-the-uk-b903ec53a790"},
    ],
  },
]

registerSeeder({
  name: 'blog',
  async up(client: SanityClient) {
    for (const [si, series] of seriesData.entries()) {
      const articleIds: string[] = []
      for (const [ai, article] of series.articles.entries()) {
        const id = `blog-article-${si}-${ai}`
        await client.createOrReplace({
          _id: id,
          _type: 'blogArticle',
          title: article.title,
          partNumber: article.part,
          date: article.date,
          externalUrl: article.url,
        })
        articleIds.push(id)
      }
      await client.createOrReplace({
        _id: `blog-series-${si}`,
        _type: 'blogSeries',
        title: series.title,
        slug: {_type: 'slug', current: series.slug},
        articles: articleIds.map(id => ({_key: key(), _type: 'reference', _ref: id})),
        order: si + 1,
      })
      console.log(`     Created series: ${series.title} (${articleIds.length} articles)`)
    }
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type in ["blogArticle", "blogSeries"]]'})
  },
})
