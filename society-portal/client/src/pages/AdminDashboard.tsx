/* Editorial Utility / Night Courtyard: admin-only entry point, deliberately guards against resident payloads. */
import { DashboardShell } from "../components/portal/DashboardShell";
import type { PortalScreen } from "../components/portal/DestinationScreen";
import type { DashboardPayload } from "../lib/mockApi";

export function AdminDashboard({ data, onLogout, initialScreen }: { data: DashboardPayload; onLogout: () => void; initialScreen?: PortalScreen }) {
  if (data.role !== "admin") return null;
  return <DashboardShell data={data} onLogout={onLogout} initialScreen={initialScreen} />;
}
