import type { ReactNode } from "react";

interface HubHeaderProps {
  title: string;
  subtitle?: ReactNode;
}

export default function HubHeader({ title, subtitle }: HubHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-1.5 max-sm:text-2xl">
        {title}
      </h1>
      {subtitle && <p className="text-base text-text-secondary">{subtitle}</p>}
    </div>
  );
}
