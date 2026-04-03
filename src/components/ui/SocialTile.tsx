import type { ReactNode } from "react";

interface SocialTileProps {
  href: string;
  label: string;
  platform: "linkedin" | "github" | "medium";
  children: ReactNode;
}

export default function SocialTile({ href, label, platform, children }: SocialTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-tile ${platform}`}
      aria-label={label}
    >
      {children}
    </a>
  );
}
