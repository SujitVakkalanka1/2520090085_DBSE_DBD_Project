/* Editorial Utility / Night Courtyard: app-level role gate with strict conditional rendering and mock FastAPI-shaped data loading. */
import { useEffect, useState } from "react";
import { AdminDashboard } from "./pages/AdminDashboard";
import type { PortalScreen } from "./components/portal/DestinationScreen";
import { LoginLanding } from "./pages/LoginLanding";
import { ResidentDashboard } from "./pages/ResidentDashboard";
import { fetchDashboard, login, type DashboardPayload, type UserRole } from "./lib/mockApi";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialScreen, setInitialScreen] = useState<PortalScreen>("home");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryRole = params.get("role") as UserRole | null;
    const queryScreen = params.get("screen") as PortalScreen | null;
    const savedRole = window.sessionStorage.getItem("courtyard-role") as UserRole | null;
    if (queryScreen) setInitialScreen(queryScreen);
    const initialRole = queryRole === "admin" || queryRole === "resident" ? queryRole : savedRole;
    if (initialRole === "admin" || initialRole === "resident") void enterRole(initialRole);
  }, []);

  async function enterRole(role: UserRole) {
    setLoading(true);
    const session = await login(role);
    const payload = await fetchDashboard(session.role);
    window.sessionStorage.setItem("courtyard-role", session.role);
    setUserRole(session.role);
    setDashboard(payload);
    setLoading(false);
  }

  function logout() {
    window.sessionStorage.removeItem("courtyard-role");
    window.history.pushState({}, "", "/");
    setDashboard(null);
    setUserRole(null);
    setInitialScreen("home");
  }

  return (
    <>
      <Toaster position="top-right" richColors theme="dark" />
      {loading || (userRole && !dashboard) ? <LoadingScreen /> : null}
      {!loading && !userRole ? <LoginLanding onLogin={enterRole} /> : null}
      {!loading && userRole === "admin" && dashboard ? (
        <AdminDashboard data={dashboard} onLogout={logout} initialScreen={initialScreen} />
      ) : null}
      {!loading && userRole === "resident" && dashboard ? (
        <ResidentDashboard data={dashboard} onLogout={logout} initialScreen={initialScreen} />
      ) : null}
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-6 text-center text-white">
      <div className="animate-fade-up">
        <div className="mx-auto mb-6 h-12 w-12 animate-pulse rounded-[16px] bg-courtyard shadow-xl shadow-courtyard/25" />
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          Opening your Courtyard view
        </p>
      </div>
    </div>
  );
}

export default App;
