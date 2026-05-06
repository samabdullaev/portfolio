import Link from "next/link";

interface DetailBackProps {
  href: string;
  label: string;
}

export default function DetailBack({ href, label }: DetailBackProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text mb-8 transition-colors duration-200 [&_svg]:size-4"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </Link>
  );
}
