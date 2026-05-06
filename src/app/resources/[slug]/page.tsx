import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity";
import {
  resourceCategoryDetailQuery,
  resourceCategorySlugsQuery,
  resourceCategoryTitleBySlugQuery,
  type ResourceCategoryDetail,
  type ResourceItem,
} from "@/lib/sanity/queries/resources";
import DetailPage from "@/components/layout/DetailPage";
import DetailBack from "@/components/layout/DetailBack";
import DetailSection from "@/components/layout/DetailSection";

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
    <ul className="list-none p-0 flex flex-col">
      {items.map((item) => (
        <li
          key={item.url}
          className="border-b border-border first:border-t"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3.5 px-1 text-base text-text rounded-sm transition-[background-color,padding] duration-150 hover:bg-hover hover:px-2.5 hover:-mx-1.5 hover:rounded-lg max-sm:py-3 max-sm:text-sm [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-text-secondary [&_svg]:ml-auto"
          >
            <span className="font-medium">{item.name}</span>
            {item.desc && (
              <span className="text-xs text-text-secondary shrink-0 max-sm:hidden before:content-['—'] before:mr-1.5">
                {item.desc}
              </span>
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
    <DetailPage>
      <DetailBack href="/resources" label="Back to Resources" />

      <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2 max-sm:text-2xl">
        {resource.title}
      </h1>

      <div data-testid="project-gallery" className="mb-3">
        <div className="w-full rounded-2xl overflow-hidden border border-border relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resource.thumbnail.asset.url} alt={resource.title} className="w-full block" />
        </div>
      </div>

      {resource.sections ? (
        resource.sections.map((section) => (
          <DetailSection key={section.label} title={section.label}>
            <ResourceItemList items={section.items} />
          </DetailSection>
        ))
      ) : (
        <DetailSection title={resource.sectionLabel ?? undefined}>
          <ResourceItemList items={resource.items} />
        </DetailSection>
      )}
    </DetailPage>
  );
}
