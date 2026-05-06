import Link from "next/link";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export default function NotFound() {
  return (
    <HubPage>
      <HubHeader
        title="Page not found"
        subtitle="The page you're looking for doesn't exist or has been moved."
      />
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-card border border-border hover:bg-hover py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px max-sm:w-full"
      >
        Back to Home
      </Link>
    </HubPage>
  );
}
