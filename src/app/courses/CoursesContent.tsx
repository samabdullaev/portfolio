import TopicSection from "@/components/layout/TopicSection";
import type { CourseTopic } from "@/lib/sanity/queries/courses";
import { formatMonthYear } from "@/lib/dates";

interface Props {
  topics: CourseTopic[];
}

export default function CoursesContent({ topics }: Props) {
  return (
    <>
      {topics.map((topic) => (
        <TopicSection key={topic._id} title={topic.title}>
          <ul className="flex flex-col gap-3">
            {(topic.courses ?? []).map((course) => {
              const meta = [
                course.provider,
                course.date ? formatMonthYear(course.date) : null,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <li key={course._id}>
                  {/* The whole card is the link to the course. "View Course" is a
                      decorative affordance (aria-hidden) inside it — clicking
                      anywhere on the card opens the course. */}
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 bg-card border border-border rounded-2xl px-5 py-4 transition-colors duration-300 hover:border-text-secondary/30 max-sm:px-4 max-sm:py-3.5"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-text group-hover:underline underline-offset-2 decoration-1 line-clamp-2">
                        {course.title}
                      </h3>
                      {meta && (
                        <p className="text-sm text-text-secondary mt-0.5">
                          {meta}
                        </p>
                      )}
                    </div>

                    <span
                      aria-hidden="true"
                      className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-text bg-hover dark:bg-border rounded-xl py-2 px-3.5 transition-colors duration-300 group-hover:bg-border dark:group-hover:bg-hover [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5 max-sm:text-xs max-sm:px-3 max-sm:py-1.5"
                    >
                      View course
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </TopicSection>
      ))}
    </>
  );
}
