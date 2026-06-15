import TopicSection from "@/components/layout/TopicSection";
import CardGrid from "@/components/layout/CardGrid";
import type { CourseTopic } from "@/lib/sanity/queries/courses";
import { formatMonthYear } from "@/lib/dates";

interface Props {
  topics: CourseTopic[];
  // When a topic filter is active: vertical 1-col stack on mobile. Otherwise:
  // horizontal scroll-snap on mobile (mirrors the other hub pages).
  filtered: boolean;
}

export default function CoursesContent({ topics, filtered }: Props) {
  return (
    <>
      {topics.map((topic) => (
        <TopicSection key={topic._id} title={topic.title}>
          {/* Grid of compact boxes (4-col → 2-col → mobile: horizontal scroll
              when unfiltered, vertical stack when filtered) — each box IS the
              link to the course. */}
          <CardGrid filtered={filtered}>
            {(topic.courses ?? []).map((course) => {
              const meta = [
                course.provider,
                course.date ? formatMonthYear(course.date) : null,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <a
                  key={course._id}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col bg-card border border-border rounded-2xl p-5 transition-colors duration-300 hover:border-text-secondary/30 max-sm:p-4"
                >
                  <h3 className="font-medium text-text pr-6 group-hover:underline underline-offset-2 decoration-1 line-clamp-3">
                    {course.title}
                  </h3>
                  {meta && (
                    <p className="text-sm text-text-secondary mt-2">{meta}</p>
                  )}

                  {/* Corner arrow marks the box as an external link. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute top-5 right-5 size-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-sm:top-4 max-sm:right-4"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              );
            })}
          </CardGrid>
        </TopicSection>
      ))}
    </>
  );
}
