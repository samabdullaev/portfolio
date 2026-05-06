"use client";

import { useState } from "react";
import MediaModal, { MediaModalItem } from "./MediaModal";
import { cn } from "@/lib/cn";

interface MediaGalleryProps {
  items: MediaModalItem[];
  /** Used as the modal's default title when an item has no caption of its own. */
  title?: string;
}

/**
 * Resolve a static preview-frame URL for a video.
 * - YouTube: uses the public `img.youtube.com` thumbnails
 * - Vimeo: uses vumbnail.com, a third-party proxy that resolves Vimeo's
 *   official thumbnail (Vimeo's own API requires an authed call). Cached on
 *   their CDN.
 */
function videoPreviewSrc(url: string): string | null {
  let m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/);
  if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `https://vumbnail.com/${m[1]}.jpg`;
  return null;
}

const HERO_CLASSES =
  "block w-full p-0 bg-transparent text-inherit cursor-pointer text-left rounded-2xl overflow-hidden border border-border relative transition-opacity duration-200 hover:opacity-90 [&_img]:w-full [&_img]:block";

const THUMB_BASE =
  "shrink-0 w-20 h-13 rounded-lg overflow-hidden border-none bg-transparent p-0 cursor-pointer relative box-border transition-[padding,opacity] duration-150 hover:opacity-80 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:block [&_img]:rounded-sm";

const THUMB_ACTIVE =
  "p-1 bg-bg shadow-[inset_0_0_0_2px_var(--color-text)]";

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
      <div data-testid="project-gallery" className="mb-3">
        <button
          type="button"
          className={HERO_CLASSES}
          onClick={() => setModalOpen(true)}
          aria-label={`Open ${active.caption ?? title ?? "image"} viewer`}
        >
          {active.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.src} alt={active.alt ?? title ?? ""} />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videoPreviewSrc(active.src) ?? ""} alt="" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[inherit] pointer-events-none">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" className="text-white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </>
          )}
        </button>

        {items.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  type="button"
                  key={i}
                  className={cn(THUMB_BASE, isActive && THUMB_ACTIVE)}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt={item.alt ?? ""} />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={videoPreviewSrc(item.src) ?? ""} alt="" />
                      <div
                        className={`absolute flex items-center justify-center bg-black/30 pointer-events-none ${
                          isActive ? "inset-1 rounded-sm" : "inset-0 rounded-[inherit]"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-white">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
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
