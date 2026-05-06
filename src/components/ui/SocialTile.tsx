import type { ReactNode } from "react";

interface SocialTileProps {
  href: string;
  label: string;
  platform: "linkedin" | "github" | "medium";
  children: ReactNode;
}

const PLATFORM_CLASSES: Record<SocialTileProps["platform"], string> = {
  linkedin:
    "text-[#0A66C2] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:shadow-[0_0_16px_rgba(10,102,194,0.2)] dark:hover:bg-[#1e2a3a] dark:hover:border-[#1e4a7a] dark:hover:shadow-[0_0_16px_rgba(10,102,194,0.3)]",
  github:
    "text-text hover:bg-hover hover:border-text-secondary hover:shadow-[0_0_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]",
  medium:
    "text-text hover:bg-hover hover:border-text-secondary hover:shadow-[0_0_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]",
};

const BASE_CLASSES = [
  "social-tile",
  "relative flex items-center justify-center",
  "size-15 rounded-2xl",
  "border border-border bg-card",
  "transition-[transform,box-shadow,background-color] duration-200",
  "hover:-translate-y-1",
  "[&_svg]:size-6 [&_svg]:transition-transform [&_svg]:duration-200",
  "hover:[&_svg]:scale-110",
  "after:content-[attr(aria-label)]",
  "after:absolute after:-bottom-7 after:left-1/2 after:-translate-x-1/2",
  "after:text-xs after:font-medium after:text-text-secondary",
  "after:whitespace-nowrap after:pointer-events-none",
  "after:opacity-0 after:transition-opacity after:duration-200",
  "hover:after:opacity-100",
].join(" ");

export default function SocialTile({ href, label, platform, children }: SocialTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${BASE_CLASSES} ${PLATFORM_CLASSES[platform]}`}
    >
      {children}
    </a>
  );
}
