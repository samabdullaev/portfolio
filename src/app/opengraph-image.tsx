import { ImageResponse } from "next/og";

// Default OG image generated programmatically — appears on every route
// that doesn't override with its own opengraph-image. Mirrors the SA
// monogram + name + tagline on a brand-dark background.
export const alt = "Sam Abdullaev — Frontend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          color: "#f0f0f0",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: 80,
        }}
      >
        {/* SA monogram tile */}
        <div
          style={{
            width: 180,
            height: 180,
            background: "#faf8f4",
            color: "#171717",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: -4,
            marginBottom: 56,
          }}
        >
          SA
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Sam Abdullaev
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#a0a0a0",
            fontWeight: 500,
          }}
        >
          Frontend Software Engineer
        </div>
      </div>
    ),
    size,
  );
}
