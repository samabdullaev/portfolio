"use client";

import {
  PointerEvent as ReactPointerEvent,
  UIEvent as ReactUIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "./Modal";
import "./MediaModal.css";

export interface MediaModalItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

interface MediaModalProps {
  open: boolean;
  onClose: () => void;
  items: MediaModalItem[];
  index: number;
  onIndexChange: (i: number) => void;
  /** Centered top-bar title (e.g. cert title or section name). */
  title?: string;
}

/** Convert a YouTube/Vimeo watch URL to an embeddable URL with autoplay. */
function toEmbedUrl(url: string): string {
  let m = url.match(/youtu\.be\/([\w-]+)(?:\?.*?(?:t=)?(\d+))?/);
  if (m) {
    return `https://www.youtube.com/embed/${m[1]}?autoplay=1${m[2] ? `&start=${m[2]}` : ""}`;
  }
  m = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (m) {
    const tMatch = url.match(/[?&]t=(\d+)/);
    return `https://www.youtube.com/embed/${m[1]}?autoplay=1${tMatch ? `&start=${tMatch[1]}` : ""}`;
  }
  if (url.includes("youtube.com/embed/")) return url;
  m = url.match(/vimeo\.com\/(\d+)(?:#t=(\d+))?/);
  if (m) {
    return `https://player.vimeo.com/video/${m[1]}?autoplay=1${m[2] ? `#t=${m[2]}s` : ""}`;
  }
  return url;
}

const SLOT_GAP_PX = 28;

const isMobileViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 600px)").matches;

/** Compose the desktop track translate (mobile uses native scroll instead). */
function trackTranslate(i: number) {
  return `translate3d(calc(${-i * 100}% - ${i * SLOT_GAP_PX}px), 0, 0)`;
}

export default function MediaModal({
  open,
  onClose,
  items,
  index,
  onIndexChange,
  title,
}: MediaModalProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Press state for nav buttons / keyboard — drives the shrink animation.
  const [pressed, setPressed] = useState<"prev" | "next" | null>(null);
  const [animating, setAnimating] = useState(false);
  // Marks scroll updates we made programmatically so the onScroll handler
  // doesn't loop them back into onIndexChange.
  const programmaticScroll = useRef(false);

  // Sync the rendered position to `index` whenever it changes.
  // On mobile the user owns the scroll position — never fight them by
  // programmatically scrolling here. (Initial position is handled below.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobileViewport()) return;
    const track = trackRef.current;
    if (!track) return;
    setAnimating(true);
    track.style.transform = trackTranslate(index);
  }, [index]);

  // Initial position when modal opens — jump to current index without animating.
  useEffect(() => {
    if (!open) return;
    const mobile = isMobileViewport();
    if (mobile) {
      const stage = stageRef.current;
      if (!stage) return;
      const slotWidth = stage.clientWidth;
      programmaticScroll.current = true;
      stage.scrollLeft = index * (slotWidth + SLOT_GAP_PX);
      window.setTimeout(() => {
        programmaticScroll.current = false;
      }, 100);
    }
    // Desktop: useEffect-on-index above already handles it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [items.length, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    onIndexChange((index + 1) % items.length);
  }, [items.length, index, onIndexChange]);

  // Keyboard nav simulates a quick click: shrink for ~200ms, then release+go.
  // Buttons follow the user's actual hold time via onPointerDown / onPointerUp.
  const keyboardNav = useCallback(
    (dir: "prev" | "next") => {
      setPressed(dir);
      window.setTimeout(() => {
        setPressed(null);
        if (dir === "prev") goPrev();
        else goNext();
      }, 200);
    },
    [goPrev, goNext],
  );

  // Keyboard nav — desktop only.
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined" || isMobileViewport()) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft") keyboardNav("prev");
      if (e.key === "ArrowRight") keyboardNav("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, keyboardNav]);

  // Mobile scroll → index sync. Native scroll-snap drives the visual
  // movement; we just observe scrollLeft to keep React state aligned.
  // Throttled to once per animation frame so React re-renders don't pile
  // up on every scroll event (which was causing visible jank).
  const scrollFrame = useRef<number | null>(null);
  const onScroll = useCallback(
    (e: ReactUIEvent<HTMLDivElement>) => {
      if (programmaticScroll.current) return;
      if (scrollFrame.current != null) return;
      const stage = e.currentTarget;
      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = null;
        const slotWidth = stage.clientWidth;
        if (slotWidth === 0) return;
        const newIndex = Math.round(
          stage.scrollLeft / (slotWidth + SLOT_GAP_PX),
        );
        if (newIndex >= 0 && newIndex < items.length && newIndex !== index) {
          onIndexChange(newIndex);
        }
      });
    },
    [items.length, index, onIndexChange],
  );

  // Desktop iframe guard: don't try to set pointer capture on touch input —
  // mobile uses native scroll instead.
  const onStagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "IFRAME") {
      // Don't start any drag on iframe content.
      return;
    }
  };

  if (!open || items.length === 0) return null;

  const counter = items.length > 1 ? `${index + 1} of ${items.length}` : undefined;

  return (
    <Modal open={open} onClose={onClose} title={title} trailing={counter}>
      <div
        ref={stageRef}
        className={`media-modal-stage${pressed ? ` pressed-${pressed}` : ""}`}
        onScroll={onScroll}
        onPointerDown={onStagePointerDown}
      >
        <div
          ref={trackRef}
          className={`media-modal-track${animating ? " is-animating" : ""}`}
          style={{ transform: trackTranslate(index) }}
          onTransitionEnd={() => setAnimating(false)}
        >
          {items.map((it, i) => (
            <div className="media-modal-slot" key={i}>
              <div className="media-modal-frame">
                {it.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.src}
                    alt={it.alt ?? title ?? ""}
                    draggable={false}
                    loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                  />
                ) : i === index ? (
                  <iframe
                    src={toEmbedUrl(it.src)}
                    title={title ?? "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="media-modal-video-placeholder" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="media-modal-nav prev desktop-only-flex"
            onPointerDown={() => setPressed("prev")}
            onPointerUp={() => setPressed(null)}
            onPointerLeave={() => setPressed(null)}
            onClick={goPrev}
            aria-label="Previous"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="media-modal-nav next desktop-only-flex"
            onPointerDown={() => setPressed("next")}
            onPointerUp={() => setPressed(null)}
            onPointerLeave={() => setPressed(null)}
            onClick={goNext}
            aria-label="Next"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </Modal>
  );
}
