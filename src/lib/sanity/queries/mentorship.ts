export interface MentorshipArticle {
  _id: string;
  title: string;
  task: string;
  date: string;
  externalUrl: string;
  thumbnail: { asset: { url: string } } | null;
}

export const mentorshipArticlesQuery = `*[_type == "mentorshipArticle"] | order(order asc){
  _id, title, task, date, externalUrl, thumbnail{ asset->{ url } }
}`;
