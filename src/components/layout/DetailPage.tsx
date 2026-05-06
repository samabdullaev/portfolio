import type { ReactNode } from "react";

export default function DetailPage({ children }: { children: ReactNode }) {
  return (
    <article className="project-detail w-full max-w-[640px] mx-auto pt-12 px-6 pb-20 max-sm:pt-6 max-sm:px-4 max-sm:pb-15">
      {children}
    </article>
  );
}
