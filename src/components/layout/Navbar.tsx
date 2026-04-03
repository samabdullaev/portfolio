"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const directLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

const dropdowns = [
  {
    label: "Writing",
    items: [
      { label: "Journey", href: "/journey" },
      { label: "Blog", href: "/blog" },
      { label: "Mentorship", href: "/mentorship" },
    ],
  },
  {
    label: "Life",
    items: [
      { label: "Travel", href: "/travel" },
      { label: "Yearly Reviews", href: "/reviews" },
    ],
  },
  {
    label: "Learning",
    items: [
      { label: "Resources", href: "/resources" },
      { label: "Certificates", href: "/certificates" },
    ],
  },
];

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isDropdownActive = (items: { href: string }[]) =>
    items.some((item) => isActive(item.href));

  return (
    <nav
      ref={navRef}
      className="navbar"
    >
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          Sam Abdullaev
        </Link>

        <ul className="navbar-links">
          {directLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(link.href) ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {dropdowns.map((dropdown) => {
            const isOpen = openDropdown === dropdown.label;
            const hasActiveChild = isDropdownActive(dropdown.items);

            return (
              <li
                key={dropdown.label}
                className={`navbar-dropdown${isOpen ? " open" : ""}`}
              >
                <button
                  className={`navbar-dropdown-toggle${hasActiveChild ? " active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(isOpen ? null : dropdown.label);
                  }}
                >
                  {dropdown.label}
                  <ChevronDown />
                </button>
                <ul className="navbar-dropdown-menu">
                  {dropdown.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={isActive(item.href) ? "active" : ""}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
