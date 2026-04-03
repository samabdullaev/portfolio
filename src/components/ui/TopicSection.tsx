"use client";

import React, { useState } from "react";

interface TopicSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function TopicSection({ title, children }: TopicSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const count = React.Children.count(children);
  const showDesktop = count > 4;
  const showMobile = count > 3;
  const label = expanded ? "Show less" : "Show all";

  return (
    <div className="topic-section">
      <div className="section-header">
        <h2>{title}</h2>
        {showDesktop && (
          <button
            className="show-all-btn"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {label}
          </button>
        )}
      </div>
      <div className={`card-grid${expanded ? " expanded" : ""}`}>
        {children}
      </div>
      {showMobile && (
        <button
          className="show-all-btn-mobile"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {label}
        </button>
      )}
    </div>
  );
}
