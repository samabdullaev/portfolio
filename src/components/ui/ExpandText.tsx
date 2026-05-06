"use client";

import { useState } from "react";

interface ExpandTextProps {
  summary: string;
  expanded: string;
}

export default function ExpandText({ summary, expanded }: ExpandTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <p>
      {summary}
      {!isExpanded && (
        <button
          className="expand-btn relative -top-px ml-1 inline-flex items-center gap-0.5 align-middle cursor-pointer border border-border bg-hover hover:bg-border text-xs font-medium text-text-secondary hover:text-text py-px px-1.5 rounded-md transition-colors duration-150"
          onClick={() => setIsExpanded(true)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </button>
      )}
      {isExpanded && <span className="expand-content">{expanded}</span>}
    </p>
  );
}
