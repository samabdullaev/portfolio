// Root-level loading boundary. Used while any route segment without its
// own loading.tsx is fetching server data. Keeps the navbar stable so
// theme + nav stay interactive during the transition.
export default function Loading() {
  return (
    <section className="hub-page" aria-busy="true">
      <div className="hub-header">
        <h1 className="hub-loading">Loading…</h1>
      </div>
    </section>
  );
}
