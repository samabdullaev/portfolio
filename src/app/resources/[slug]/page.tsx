import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import {
  resourceCategoryDetailQuery,
  resourceCategorySlugsQuery,
  resourceCategoryTitleBySlugQuery,
  type ResourceCategoryDetail,
  type ResourceItem,
} from "@/lib/sanity/queries/resources";
import "@/app/project-detail.css";

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: { current: string } }[]>(resourceCategorySlugsQuery);
  return all.map((r) => ({ slug: r.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await sanityFetch<{ title: string } | null>(
    resourceCategoryTitleBySlugQuery,
    { slug },
  );
  if (!resource) return {};
  return {
    title: `${resource.title} — Resources — Sam Abdullaev`,
  };
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ResourceItemList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="resource-list">
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <span className="resource-name">{item.name}</span>
            {item.desc && (
              <span className="resource-desc">{item.desc}</span>
            )}
            <ExternalLinkIcon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await sanityFetch<ResourceCategoryDetail | null>(
    resourceCategoryDetailQuery,
    { slug },
  );

  if (!resource) notFound();

  return (
    <main>
      <article className="project-detail">
        <Link href="/resources" className="project-back">
          <svg
            width="16"
            height="16"
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
          Back to Resources
        </Link>

        <h1 className="project-title">{resource.title}</h1>

        <div className="project-gallery">
          <div className="project-gallery-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resource.thumbnail.asset.url} alt={resource.title} />
          </div>
        </div>

        {resource.sections ? (
          resource.sections.map((section) => (
            <div className="project-section" key={section.label}>
              <h2 className="project-section-title">{section.label}</h2>
              <ResourceItemList items={section.items} />
            </div>
          ))
        ) : (
          <div className="project-section">
            <h2 className="project-section-title">{resource.sectionLabel}</h2>
            <ResourceItemList items={resource.items} />
          </div>
        )}
      </article>
    </main>
  );
}
