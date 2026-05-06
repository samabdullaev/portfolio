"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/components/ui/ThemeProvider";
import { directLinks, dropdowns } from "@/data/navigation";
import { cn } from "@/lib/cn";

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

function LogoIcon() {
  return (
    <svg
      className="block shrink-0 max-md:size-10"
      width="32"
      height="32"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect className="fill-[#171717] dark:fill-[#faf8f4]" width="64" height="64" rx="14" />
      <text
        className="fill-[#faf8f4] dark:fill-[#171717]"
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-1.2"
      >
        SA
      </text>
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
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
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

const NAV_LINK_CLASSES =
  "text-sm font-medium text-text-secondary hover:text-text hover:bg-hover px-3.5 py-2 rounded-full cursor-pointer transition-colors duration-200";

const NAV_LINK_ACTIVE = "text-text bg-hover font-semibold";

const DROPDOWN_TOGGLE_CLASSES = `${NAV_LINK_CLASSES} inline-flex items-center gap-1 bg-transparent border-none font-sans`;

const DRAWER_TRANSITION =
  "transition-[opacity,transform,visibility] duration-300 ease-[var(--navbar-ease)]";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  // Close drawer + desktop dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  // Close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isDropdownActive = (items: { href: string }[]) =>
    items.some((item) => isActive(item.href));

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="sticky top-0 z-[1000] h-18 bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--navbar-border)] transition-[background-color,border-color] duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full grid grid-cols-[1fr_auto_1fr] items-center gap-6 max-md:px-5 max-md:grid-cols-[auto_1fr_auto] max-md:gap-3 max-sm:px-4">
          <Link
            href="/"
            aria-label="Sam Abdullaev — Home"
            className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-text justify-self-start transition-opacity duration-200 hover:opacity-70"
          >
            <LogoIcon />
            <span className="max-md:hidden">Sam Abdullaev</span>
          </Link>

          <ul className="flex items-center gap-1 justify-self-center max-md:hidden">
            {directLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(NAV_LINK_CLASSES, isActive(link.href) && NAV_LINK_ACTIVE)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {dropdowns.map((dropdown) => {
              const isOpen = openDropdown === dropdown.label;
              const hasActiveChild = isDropdownActive(dropdown.items);

              const dropdownId = `nav-dropdown-${dropdown.label.toLowerCase()}`;
              return (
                <li key={dropdown.label} className="relative">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={dropdownId}
                    aria-haspopup="menu"
                    className={cn(
                      DROPDOWN_TOGGLE_CLASSES,
                      "[&_svg]:size-3 [&_svg]:transition-transform [&_svg]:duration-200",
                      hasActiveChild && NAV_LINK_ACTIVE,
                      isOpen && "[&_svg]:rotate-180",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(isOpen ? null : dropdown.label);
                    }}
                  >
                    {dropdown.label}
                    <ChevronDown />
                  </button>
                  <ul
                    id={dropdownId}
                    role="menu"
                    className={cn(
                      "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl p-1.5 min-w-45 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-[opacity,visibility] duration-150",
                      isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                    )}
                  >
                    {dropdown.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block text-sm font-medium text-text-secondary hover:text-text hover:bg-hover px-3 py-2 rounded-lg whitespace-nowrap",
                            isActive(item.href) && "text-text bg-hover font-semibold",
                          )}
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

          <div className="flex items-center gap-2 justify-self-end">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="size-10 border border-border rounded-full bg-transparent cursor-pointer flex items-center justify-center text-text shrink-0 transition-[background-color,border-color,color] duration-200 hover:bg-hover"
            >
              {theme === "dark" ? (
                <SunIcon width={20} height={20} aria-hidden />
              ) : (
                <MoonIcon width={20} height={20} aria-hidden />
              )}
            </button>
            <button
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
              className="hidden size-10 items-center justify-center bg-text text-bg border-none rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-85 max-md:inline-flex"
            >
              <HamburgerIcon open={drawerOpen} />
            </button>
          </div>
        </div>
      </nav>

      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/30 z-[998] transition-opacity duration-250",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "hidden fixed top-20 inset-x-3 bg-card border border-border rounded-[20px] z-[999] p-3 max-h-[calc(100dvh-96px)] overflow-y-auto shadow-[var(--navbar-shadow)] flex-col gap-1.5 max-md:flex",
          DRAWER_TRANSITION,
          drawerOpen
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 -translate-y-3 invisible pointer-events-none",
        )}
      >
        <nav aria-label="Main pages" className="flex flex-col gap-1.5">
          {directLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3.5 bg-hover rounded-xl text-[15px] font-semibold text-text transition-colors duration-200 hover:bg-border",
                  active && "bg-border font-bold",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {dropdowns.map((dropdown) => (
            <div key={dropdown.label} className="flex flex-col gap-1.5 mt-2">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-text-secondary px-2 pt-1 pb-0.5">
                {dropdown.label}
              </div>
              {dropdown.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                  "flex items-center px-4 py-3.5 bg-hover rounded-xl text-[15px] font-semibold text-text transition-colors duration-200 hover:bg-border",
                  active && "bg-border font-bold",
                )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
