import Link from "next/link";

// Root-level 404 boundary. Oversized 404 watermark behind the headline,
// gentle float on motion-safe viewports.
export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 gap-8 px-6 py-20 text-center overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-black leading-none tracking-tighter text-text/[0.07] select-none pointer-events-none text-[14rem] sm:text-[18rem] motion-safe:animate-[float_6s_ease-in-out_infinite]"
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight max-sm:text-2xl">
          Page not found
        </h1>
        <p className="text-base text-text-secondary max-w-sm">
          Looks like this page took a wrong turn. Let&apos;s get you back on track.
        </p>
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-card border border-border hover:bg-hover py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px max-sm:w-full"
      >
        Back to Home
      </Link>
    </div>
  );
}
