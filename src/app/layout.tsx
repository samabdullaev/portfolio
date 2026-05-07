import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samabdullaev.com"),
  title: {
    default: "Sam Abdullaev | Frontend Software Engineer",
    template: "%s | Sam Abdullaev",
  },
  description:
    "Personal portfolio of Sam Abdullaev — Frontend Software Engineer based in the UK. Projects, blog, travel, certificates, and more.",
  authors: [{ name: "Sam Abdullaev", url: "https://samabdullaev.com" }],
  creator: "Sam Abdullaev",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://samabdullaev.com",
    siteName: "Sam Abdullaev",
    title: "Sam Abdullaev | Frontend Software Engineer",
    description:
      "Personal portfolio of Sam Abdullaev — Frontend Software Engineer based in the UK.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Abdullaev | Frontend Software Engineer",
    description:
      "Personal portfolio of Sam Abdullaev — Frontend Software Engineer based in the UK.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                if (saved) {
                  document.documentElement.setAttribute('data-theme', saved);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Skip-to-content link — hidden until keyboard-focused, lets
              screen-reader and keyboard users jump past the navbar. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1001] focus:px-4 focus:py-2 focus:bg-card focus:text-text focus:border-2 focus:border-text focus:rounded-lg focus:shadow-lg focus:outline-hidden focus:font-semibold"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
