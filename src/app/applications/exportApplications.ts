import type { Application } from "@/lib/sanity/queries/applications";

// Export columns, in order. Each resolves an application to a flat string.
const COLUMNS: { key: string; header: string; get: (a: Application) => string }[] = [
  { key: "company", header: "Company", get: (a) => a.company },
  { key: "jobTitle", header: "Job Title", get: (a) => a.jobTitle },
  { key: "city", header: "City", get: (a) => a.city ?? "" },
  { key: "country", header: "Country", get: (a) => a.country ?? "" },
  { key: "status", header: "Status", get: (a) => a.status?.label ?? "" },
  { key: "platform", header: "Platform", get: (a) => a.platform ?? "" },
  { key: "jobLink", header: "Job Link", get: (a) => a.jobLink ?? "" },
  { key: "hrNotes", header: "HR Notes", get: (a) => a.hrNotes ?? "" },
  { key: "personalNotes", header: "Personal Notes", get: (a) => a.personalNotes ?? "" },
  { key: "lastUpdated", header: "Last Updated", get: (a) => a.lastUpdated },
];

// Quote every cell and escape embedded quotes — safe against commas/newlines.
function csvCell(v: string): string {
  return `"${v.replace(/"/g, '""')}"`;
}

export function toCSV(apps: Application[]): string {
  const header = COLUMNS.map((c) => csvCell(c.header)).join(",");
  const rows = apps.map((a) => COLUMNS.map((c) => csvCell(c.get(a))).join(","));
  return [header, ...rows].join("\r\n");
}

export function toJSON(apps: Application[]): string {
  const flat = apps.map((a) =>
    Object.fromEntries(COLUMNS.map((c) => [c.key, c.get(a)])),
  );
  return JSON.stringify(flat, null, 2);
}

export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
