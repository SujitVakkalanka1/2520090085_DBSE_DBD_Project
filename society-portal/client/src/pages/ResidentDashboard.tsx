/* Editorial Utility / Night Courtyard: resident-only entry point, deliberately guards against admin payloads. */
import { DashboardShell } from "../components/portal/DashboardShell";
import type { PortalScreen } from "../components/portal/DestinationScreen";
import type { DashboardPayload } from "../lib/mockApi";

export function ResidentDashboard({ data, onLogout, initialScreen }: { data: DashboardPayload; onLogout: () => void; initialScreen?: PortalScreen }) {
  if (data.role !== "resident") return null;
  return <DashboardShell data={data} onLogout={onLogout} initialScreen={initialScreen} />;
}
