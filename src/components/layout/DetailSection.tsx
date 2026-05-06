import type { ReactNode } from "react";

interface DetailSectionProps {
  title?: string;
  children: ReactNode;
}

export default function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section data-testid="project-section" className="mb-12">
      {title && (
        <h2 className="text-sm font-semibold text-text-secondary lowercase tracking-wide mb-3">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
