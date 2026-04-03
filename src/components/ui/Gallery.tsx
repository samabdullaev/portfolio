"use client";

import { useState, useCallback } from "react";
import VideoModal from "./VideoModal";

interface GalleryItem {
  type: "image" | "video" | "gradient";
  src: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title: string;
  gradientLabel?: string;
}

export default function Gallery({ items, title, gradientLabel }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleThumbClick = useCallback((index: number) => {
    const item = items[index];
    if (item.type === "video") {
      setVideoUrl(item.src);
      setVideoOpen(true);
    } else {
      setActiveIndex(index);
    }
  }, [items]);

  const activeItem = items[activeIndex];

  // Extract YouTube video ID for thumbnail
  const getVideoThumb = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^?&]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    return null;
  };

  return (
    <>
      <div className="project-gallery">
        <div className="project-gallery-main">
          {activeItem.type === "image" && (
            <img src={activeItem.src} alt={title} />
          )}
          {activeItem.type === "gradient" && (
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "12px",
                background: activeItem.src,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              {gradientLabel}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="project-gallery-thumbs">
            {items.map((item, i) => (
              <div
                key={i}
                className={`project-gallery-thumb${i === activeIndex ? " active" : ""}${item.type === "video" ? " video-thumb" : ""}`}
                onClick={() => handleThumbClick(i)}
              >
                {item.type === "image" && <img src={item.src} alt="" />}
                {item.type === "gradient" && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      background: item.src,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {gradientLabel}
                  </div>
                )}
                {item.type === "video" && (
                  <>
                    {getVideoThumb(item.src) ? (
                      <img src={getVideoThumb(item.src)!} alt="" />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#333", borderRadius: "8px" }} />
                    )}
                    <div className="play-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={videoUrl} />
    </>
  );
}
