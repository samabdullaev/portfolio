import Image from "next/image";
import { monthNumber } from "@/lib/constants";

interface ContributionItem {
  _key: string;
  title: string;
  description: string;
  url: string;
  tag?: string;
  subtitle?: string;
  channelName?: string;
  channelStatus?: string;
  activities?: string[];
}

interface LatestPost {
  title: string;
  month: number;
  year: number;
  linkedInUrl: string;
  thumbnailUrl: string | null;
}

interface LatestArticle {
  title: string;
  date: string;
  externalUrl: string;
}

interface Props {
  items: ContributionItem[];
  latestPosts?: LatestPost[];
  latestArticle?: LatestArticle | null;
}

const SLOTS = ["a", "b", "c", "d", "e", "f"] as const;

export default function ContributionsBentoCreative({ items, latestPosts, latestArticle }: Props) {
  return (
    <div className="bento-creative-grid">
      {items.slice(0, SLOTS.length).map((item, i) => {
        const slot = SLOTS[i];
        return (
          <a
            key={item._key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`bento-${slot}`}
            className={`bento-c bento-c-${slot}`}
          >
            {renderSlotContent(slot, item, { latestPosts, latestArticle })}
            <svg className="bento-c-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        );
      })}
    </div>
  );
}

function renderSlotContent(
  slot: string,
  item: ContributionItem,
  ctx: { latestPosts?: LatestPost[]; latestArticle?: LatestArticle | null },
) {
  switch (slot) {
    case "a":
      return <FeatureHero item={item} latestPosts={ctx.latestPosts} />;
    case "b":
      return <CommunityCard item={item} />;
    case "c":
      return <ContributionGraphCard item={item} />;
    case "d":
      return <QuoteCard item={item} />;
    case "e":
      return <ArticlePreviewCard item={item} latestArticle={ctx.latestArticle} />;
    case "f":
      return <CodeBracketsCard item={item} />;
    default:
      return null;
  }
}

function FeatureHero({ item, latestPosts }: { item: ContributionItem; latestPosts?: LatestPost[] }) {
  const posts = (latestPosts ?? []).slice(0, 5);
  return (
    <>
      <span className="bento-c-tag">{item.tag ?? "SOCIAL"}</span>
      <div className="bento-c-hero-layout">
        <div className="bento-c-content">
          <h3 className="bento-c-hero-title">Monthly journey<br />on LinkedIn.</h3>
          <p className="bento-c-hero-desc">{item.description}</p>
        </div>
        <div className="bento-c-post-list" aria-hidden="true">
          <div className="bento-c-post-list-header">
            <span className="bento-c-post-list-label">Recent posts</span>
            <span className="bento-c-post-list-live">
              <span className="bento-c-live-dot" />
              Live
            </span>
          </div>
          {posts.map((post, i) => (
            <div
              key={`${post.year}-${post.month}`}
              className={`bento-c-post-row bento-c-post-row-${i + 1}`}
            >
              {post.thumbnailUrl ? (
                <Image
                  src={post.thumbnailUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="bento-c-post-row-image"
                />
              ) : (
                <span className="bento-c-post-row-image bento-c-post-row-image-placeholder" />
              )}
              <div className="bento-c-post-row-content">
                <span className="bento-c-post-row-title">{post.title}</span>
                <span className="bento-c-post-row-date">Month {monthNumber(post.year, post.month)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CommunityCard({ item }: { item: ContributionItem }) {
  const activities = item.activities ?? ["Events", "Training", "Projects"];
  return (
    <>
      <span className="bento-c-tag">{item.tag ?? "COMMUNITY"}</span>
      <div className="bento-c-avatars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`bento-c-avatar bento-c-avatar-${n}`}>
            <PersonIcon />
          </span>
        ))}
      </div>
      <div className="bento-c-activities" aria-hidden="true">
        {activities.map((label, i) => (
          <span key={label} className={`bento-c-activity bento-c-activity-${i + 1}`}>
            <span className="bento-c-activity-dot" />
            {label}
          </span>
        ))}
      </div>
      <div className="bento-c-content">
        <h3 className="bento-c-title">{item.title}</h3>
        <p className="bento-c-desc">{item.description}</p>
      </div>
      {(item.channelName || item.channelStatus) && (
        <div className="bento-c-channel-preview" aria-hidden="true">
          <span className="bento-c-channel-avatar">
            <TelegramIcon />
          </span>
          <div className="bento-c-channel-meta">
            {item.channelName && (
              <span className="bento-c-channel-name">{item.channelName}</span>
            )}
            {item.channelStatus && (
              <span className="bento-c-channel-status">
                <span className="bento-c-live-dot" />
                {item.channelStatus}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5v.5H5v-.5z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function ContributionGraphCard({ item }: { item: ContributionItem }) {
  const cells = Array.from({ length: 35 }, (_, i) => {
    const intensity = (i * 7 + 13) % 4;
    return <span key={i} className={`bento-c-cell bento-c-cell-${intensity}`} />;
  });
  return (
    <>
      <span className="bento-c-tag">{item.tag ?? "CODE"}</span>
      <div className="bento-c-graph" aria-hidden="true">{cells}</div>
      <div className="bento-c-content">
        <h3 className="bento-c-title">{item.title}</h3>
      </div>
    </>
  );
}

function QuoteCard({ item }: { item: ContributionItem }) {
  return (
    <>
      <span className="bento-c-tag">{item.tag ?? "WRITING"}</span>
      <span className="bento-c-quote-mark" aria-hidden="true">”</span>
      <div className="bento-c-content">
        <h3 className="bento-c-title">{item.title}</h3>
        {item.subtitle && <p className="bento-c-desc-mini">{item.subtitle}</p>}
      </div>
    </>
  );
}

function ArticlePreviewCard({
  item,
  latestArticle,
}: {
  item: ContributionItem;
  latestArticle?: LatestArticle | null;
}) {
  return (
    <>
      <div className="bento-c-article-content">
        <div className="bento-c-article-meta">
          <span className="bento-c-avatar-mini" aria-hidden="true" />
          <span className="bento-c-tag-inline">{item.tag ?? "WRITING"}</span>
        </div>
        <h3 className="bento-c-article-title">{item.title}</h3>
        <p className="bento-c-desc">{item.description}</p>
        <span className="bento-c-cta">Read more →</span>
      </div>
      {latestArticle && (
        <div className="bento-c-mini-article" aria-hidden="true">
          <div className="bento-c-mini-thumb" />
          <p className="bento-c-mini-article-title">{latestArticle.title}</p>
          <span className="bento-c-mini-article-date">{latestArticle.date}</span>
        </div>
      )}
    </>
  );
}

function CodeBracketsCard({ item }: { item: ContributionItem }) {
  return (
    <>
      <span className="bento-c-tag">{item.tag ?? "PRACTICE"}</span>
      <span className="bento-c-brackets" aria-hidden="true">{`{ }`}</span>
      <div className="bento-c-content">
        <h3 className="bento-c-title">{item.title}</h3>
      </div>
    </>
  );
}
