import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hub-page">
      <div className="hub-header">
        <h1>Page not found</h1>
        <p className="hub-subtitle">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link href="/" className="btn-secondary">
        Back to Home
      </Link>
    </section>
  );
}
