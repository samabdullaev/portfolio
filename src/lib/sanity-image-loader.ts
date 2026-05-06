// Custom Next.js image loader. Routes by hostname:
// - cdn.sanity.io: ask Sanity's image CDN for a width-specific, format-
//   negotiated rendition via `?w=<width>&q=<quality>&auto=format&fit=max`.
//   Sanity decides whether to serve webp/avif/jpeg based on Accept headers.
// - Anything else (img.youtube.com video thumbnails, vumbnail.com Vimeo
//   proxy): return the original URL. These hosts serve fixed-size preview
//   frames and don't expose a width parameter — no Next.js proxy + no
//   remotePatterns needed because `loaderFile` opts the whole app out of
//   the /_next/image route.

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.includes("cdn.sanity.io")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 80));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    return url.toString();
  }
  return src;
}
