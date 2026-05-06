export interface MentorshipArticle {
  _id: string;
  title: string;
  task: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  externalUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export const mentorshipArticlesQuery = `*[_type == "mentorshipArticle"] | order(date desc){
  _id, title, task, date, externalUrl, thumbnail{ asset->{ url } }
}`;
