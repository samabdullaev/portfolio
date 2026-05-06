import type { ReactNode } from "react";

export default function HubPage({ children }: { children: ReactNode }) {
  return (
    <section className="max-w-[1440px] w-full mx-auto pt-8 px-12 pb-20 max-sm:pt-6 max-sm:px-4 max-sm:pb-15">
      {children}
    </section>
  );
}
