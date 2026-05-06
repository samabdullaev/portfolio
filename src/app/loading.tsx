import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

// Root-level loading boundary. Used while any route segment without its
// own loading.tsx is fetching server data. Keeps the navbar stable so
// theme + nav stay interactive during the transition.
export default function Loading() {
  return (
    <div aria-busy="true">
      <HubPage>
        <HubHeader title="Loading…" />
      </HubPage>
    </div>
  );
}
