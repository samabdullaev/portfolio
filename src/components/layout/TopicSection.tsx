import type { ReactNode } from "react";

interface TopicSectionProps {
  title?: string;
  children: ReactNode;
}

export default function TopicSection({ title, children }: TopicSectionProps) {
  return (
    <section data-testid="topic-section" className="mb-16 max-sm:mb-10">
      {title && (
        <div className="mb-5">
          <h2 className="text-2xl font-semibold tracking-tight leading-tight max-md:text-xl max-sm:text-lg">
            {title}
          </h2>
        </div>
      )}
      {children}
    </section>
  );
}
