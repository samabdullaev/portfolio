"use client";

import { useState } from "react";
import MediaModal, { MediaModalItem } from "./MediaModal";

interface MediaGalleryProps {
  items: MediaModalItem[];
  /** Used as the modal's default title when an item has no caption of its own. */
  title?: string;
}

/** Extract a YouTube preview thumbnail for a given embed URL. */
function youTubeThumb(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

/**
 * Inline hero image + thumbnail strip with two interaction modes:
 *  - clicking a thumbnail swaps the inline hero (no modal) — quick browse
 *  - clicking the hero opens `<MediaModal>` at the current index — full-screen
 *
 * The modal's index is kept in sync with the inline hero, so navigating
 * inside the modal updates which thumb is active when the user closes it.
 */
export default function MediaGallery({ items, title }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (items.length === 0) return null;

  const active = items[activeIndex] ?? items[0];

  return (
    <>
      <div className="project-gallery">
        <button
          type="button"
          className="project-gallery-main"
          onClick={() => setModalOpen(true)}
          aria-label={`Open ${active.caption ?? title ?? "image"} viewer`}
        >
          {active.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.src} alt={active.alt ?? title ?? ""} />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={youTubeThumb(active.src) ?? ""} alt="" />
              <div className="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </>
          )}
        </button>

        {items.length > 1 && (
          <div className="project-gallery-thumbs">
            {items.map((item, i) => (
              <button
                type="button"
                key={i}
                className={`project-gallery-thumb${i === activeIndex ? " active" : ""}${item.type === "video" ? " video-thumb" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show image ${i + 1}`}
              >
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.src} alt={item.alt ?? ""} />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={youTubeThumb(item.src) ?? ""} alt="" />
                    <div className="play-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                        height="20"
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <MediaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        items={items}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        title={title}
      />
    </>
  );
}
