import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import {
  applicationStatusesQuery,
  applicationsQuery,
  type Application,
  type ApplicationStatus,
} from "@/lib/sanity/queries/applications";
import ApplicationsTracker from "./ApplicationsTracker";
import HubPage from "@/components/layout/HubPage";
import HubHeader from "@/components/layout/HubHeader";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "A job-application tracker — roles Sam Abdullaev has applied to, by stage. Table and board views with sort, filter, and export.",
};

export default async function ApplicationsPage() {
  const [statuses, applications] = await Promise.all([
    sanityFetch<ApplicationStatus[]>(applicationStatusesQuery),
    sanityFetch<Application[]>(applicationsQuery),
  ]);

  return (
    <HubPage>
      <HubHeader
        title="Applications"
        subtitle="Roles I've applied to — tracked by stage"
      />
      <ApplicationsTracker applications={applications} statuses={statuses} />
    </HubPage>
  );
}
