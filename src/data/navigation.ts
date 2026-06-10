// Top-level navigation structure shared by the desktop navbar and the
// mobile drawer. Direct links render as plain anchors; dropdowns render
// as click-to-open menus on desktop and as expandable groups on mobile.

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  items: NavLink[];
}

export const directLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export const dropdowns: NavDropdown[] = [
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
      { label: "Courses", href: "/courses" },
      { label: "Certificates", href: "/certificates" },
      { label: "Applications", href: "/applications" },
    ],
  },
];
