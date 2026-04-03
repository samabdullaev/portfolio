"use client";

import React, { useState, useEffect } from "react";

interface CardGridProps {
  children: React.ReactNode;
  initialCount?: number; // default 4
}

export default function CardGrid({ children, initialCount = 4 }: CardGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [mobileInitialCount, setMobileInitialCount] = useState(initialCount);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setMobileInitialCount(3);
      } else {
        setMobileInitialCount(initialCount);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialCount]);

  const allChildren = React.Children.toArray(children);
  const totalCount = allChildren.length;
  const visibleCount = expanded ? totalCount : mobileInitialCount;
  const visibleChildren = allChildren.slice(0, visibleCount);

  return (
    <div className="card-grid-wrapper">
      <div className="card-grid">
        {visibleChildren}
      </div>
      {totalCount > mobileInitialCount && (
        <button
          className="show-all-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show all"}
        </button>
      )}
    </div>
  );
}
