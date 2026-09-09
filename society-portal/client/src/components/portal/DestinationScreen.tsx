/* Editorial Utility / Night Courtyard: destination screens turn every portal action into a purposeful, navigable view. */
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Building,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Headphones,
  Home,
  Info,
  KeyRound,
  LayoutGrid,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  Plus,
  QrCode,
  Receipt,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { DashboardPayload, UserRole } from "../../lib/mockApi";
import {
  ActionButton,
  Avatar,
  IconButton,
  Modal,
  PortalIcon,
  StatusBadge,
  type PortalIconName,
} from "./PortalPrimitives";

export type PortalScreen =
  | "home"
  | "search"
  | "payments"
  | "violations"
  | "requests"
  | "amenities"
  | "gate-pass"
  | "announcements"
  | "messages"
  | "profile"
  | "broadcast"
  | "users"
  | "maintenance"
  | "receipts"
  | "detail";

const screenMeta: Record<
  Exclude<PortalScreen, "home" | "detail">,
  { eyebrow: string; title: string; detail: string }
> = {
  search: {
    eyebrow: "Portal search",
    title: "Find your answer.",
    detail: "Search results are grouped by the part of building life they belong to.",
  },
  payments: {
    eyebrow: "Money & dues",
    title: "Payments, without the chase.",
    detail: "Review what is due, what is collected, and download automated digital receipts.",
  },
  violations: {
    eyebrow: "Compliance & notices",
    title: "Resolve the open loop.",
    detail: "A clear view of building notices, explanation submissions, and next steps.",
  },
  requests: {
    eyebrow: "Helpdesk & tickets",
    title: "Requests in motion.",
    detail: "Keep every small repair, lift ticket, and resident request visible and tracked.",
  },
  amenities: {
    eyebrow: "Shared facilities",
    title: "Make room for the good stuff.",
    detail: "Browse society facilities, check live slot availability, and reserve time.",
  },
  "gate-pass": {
    eyebrow: "Access & arrivals",
    title: "A smoother arrival.",
    detail: "Create a visitor pass with 6-digit PIN and QR code to keep security informed.",
  },
  announcements: {
    eyebrow: "Noticeboard",
    title: "The latest from Maple Heights.",
    detail: "Official updates, circulars, and community notices kept close at hand.",
  },
  messages: {
    eyebrow: "Community & office",
    title: "Conversations that move things forward.",
    detail: "Direct messaging thread with society office, security gate, and helpdesk.",
  },
  profile: {
    eyebrow: "Your account",
    title: "Keep your details current.",
    detail: "Your unit details, contact information, vehicles, and notification preferences.",
  },
  broadcast: {
    eyebrow: "Admin broadcast",
    title: "Say it once. Reach every home.",
    detail: "Compose and publish urgent or general circulars directly to all residents.",
  },
  users: {
    eyebrow: "People & access",
    title: "The resident directory.",
    detail: "Manage household records, owner/tenant rosters, and approve move-in requests.",
  },
  maintenance: {
    eyebrow: "Operations & logs",
    title: "Maintenance, in the open.",
    detail: "Track tickets that keep Maple Heights running and assign technicians.",
  },
  receipts: {
    eyebrow: "Admin finance",
    title: "Receipts with a paper trail.",
    detail: "Review incoming maintenance payments, reconcile dues, and approve receipts.",
  },
};

export function DestinationScreen({
  role,
  screen,
  data,
  initialSearchQuery = "",
  onBack,
  onNavigate,
  onLogout,
}: {
  role: UserRole;
  screen: PortalScreen;
  data: DashboardPayload;
  initialSearchQuery?: string;
  onBack: () => void;
  onNavigate: (screen: PortalScreen, query?: string) => void;
  onLogout: () => void;
}) {
  if (screen === "home") return null;
  const meta =
    screenMeta[screen as Exclude<PortalScreen, "home" | "detail">] ?? {
      eyebrow: "Portal",
      title: "A closer look.",
      detail: "Your selected building action is ready.",
    };
  const isAdmin = role === "admin";

  return (
    <main className="min-h-screen bg-ink px-5 pb-32 pt-5 text-white sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-[1160px]">
        {/* Top bar with back navigation and profile */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to overview"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:border-white/25 hover:bg-white/[0.12] active:scale-95"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              <span>Overview</span>
            </button>
            <StatusBadge tone={isAdmin ? "courtyard" : "emerald"}>
              {isAdmin ? "Admin Console" : "Resident Workspace"}
            </StatusBadge>
          </div>

          <div className="flex items-center gap-2">
            <IconButton
              label="Search portal"
              name="search"
              dark
              onClick={() => onNavigate("search")}
            />
            <IconButton
              label="Announcements"
              name="bell"
              dark
              onClick={() => onNavigate("announcements")}
            />
            <button
              type="button"
              onClick={() => onNavigate("profile")}
              className="ml-1 rounded-full ring-2 ring-transparent transition hover:ring-courtyard active:scale-95"
              aria-label="Open profile"
            >
              <Avatar initials={data.initials} size="sm" />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-8 max-w-3xl">
          <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-courtyard">
            {meta.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.06em] text-white">
            {meta.title}
          </h1>
          <p className="mt-3.5 max-w-[50ch] font-body text-sm leading-relaxed text-white/55 sm:text-base">
            {meta.detail}
          </p>
        </div>

        {/* Dynamic Screen Component */}
        <div className="mt-10">
          {screen === "search" ? (
            <SearchResults role={role} initialQuery={initialSearchQuery} onNavigate={onNavigate} />
          ) : null}
          {screen === "payments" || screen === "receipts" ? (
            <PaymentScreen role={role} data={data} onNavigate={onNavigate} />
          ) : null}
          {screen === "violations" ? (
            <ViolationsScreen role={role} onNavigate={onNavigate} />
          ) : null}
          {screen === "requests" || screen === "maintenance" ? (
            <RequestsScreen role={role} onNavigate={onNavigate} />
          ) : null}
          {screen === "amenities" ? <AmenitiesScreen onNavigate={onNavigate} /> : null}
          {screen === "gate-pass" ? <GatePassScreen onNavigate={onNavigate} /> : null}
          {screen === "announcements" ? (
            <AnnouncementsScreen data={data} role={role} onNavigate={onNavigate} />
          ) : null}
          {screen === "messages" ? <MessagesScreen onNavigate={onNavigate} /> : null}
          {screen === "profile" ? (
            <ProfileScreen data={data} onNavigate={onNavigate} onLogout={onLogout} />
          ) : null}
          {screen === "broadcast" ? <BroadcastScreen onNavigate={onNavigate} /> : null}
          {screen === "users" ? <UsersScreen onNavigate={onNavigate} /> : null}
          {screen === "detail" ? <DetailScreen role={role} onNavigate={onNavigate} /> : null}
        </div>
      </div>
    </main>
  );
}

/* =========================================================================
   1. SEARCH SCREEN
   ========================================================================= */
function SearchResults({
  role,
  initialQuery = "",
  onNavigate,
}: {
  role: UserRole;
  initialQuery?: string;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<string>("all");

  const allItems: {
    icon: PortalIconName;
    title: string;
    detail: string;
    category: "finance" | "helpdesk" | "access" | "community" | "directory";
    screen: PortalScreen;
  }[] =
    role === "admin"
      ? [
          { icon: "wallet", title: "Review payments & reconciliation", detail: "19 pending dues verification items", category: "finance", screen: "receipts" },
          { icon: "users", title: "Resident Directory", detail: "248 active households & pending move-ins", category: "directory", screen: "users" },
          { icon: "clipboard", title: "Maintenance & Operations Log", detail: "12 open tickets for lifts, lights, and water", category: "helpdesk", screen: "maintenance" },
          { icon: "megaphone", title: "Broadcast Announcement", detail: "Publish society notices to all towers", category: "community", screen: "broadcast" },
          { icon: "violation", title: "Violations & Compliance", detail: "7 pending parking and renovation notices", category: "helpdesk", screen: "violations" },
          { icon: "calendar", title: "Amenity Bookings Manager", detail: "Review community hall & rooftop lounge slots", category: "access", screen: "amenities" },
          { icon: "message", title: "Community Helpdesk Chats", detail: "Direct replies with residents", category: "community", screen: "messages" },
        ]
      : [
          { icon: "wallet", title: "Pay Monthly Dues (₹4,850)", detail: "Due by 10 September · Tower B / Flat 704", category: "finance", screen: "payments" },
          { icon: "key", title: "Create Visitor Gate Pass", detail: "Generate 6-digit PIN and QR for guests & cabs", category: "access", screen: "gate-pass" },
          { icon: "calendar", title: "Book Society Amenity", detail: "Reserve Rooftop lounge, Tennis court, Pool", category: "access", screen: "amenities" },
          { icon: "headset", title: "Raise Maintenance Complaint", detail: "Report plumbing, electrical, or lift issues", category: "helpdesk", screen: "requests" },
          { icon: "violation", title: "Parking Notice (B-21)", detail: "1 open violation notice · Submit appeal", category: "helpdesk", screen: "violations" },
          { icon: "megaphone", title: "Society Noticeboard", detail: "Water tank cleaning notice & circulars", category: "community", screen: "announcements" },
          { icon: "message", title: "Contact Society Office", detail: "Chat directly with management team", category: "community", screen: "messages" },
          { icon: "profile", title: "Account & Unit Settings", detail: "Manage emergency contacts and vehicles", category: "directory", screen: "profile" },
        ];

  const filtered = allItems.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.detail.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-3xl space-y-6">
      {/* Live Search Input */}
      <div className="flex h-13 items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 shadow-lg focus-within:border-courtyard/50 focus-within:bg-white/[0.09]">
        <PortalIcon name="search" size={19} className="text-courtyard" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to filter actions, dues, gate passes, tickets…"
          className="min-w-0 flex-1 bg-transparent font-body text-sm text-white outline-none placeholder:text-white/40"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20"
          >
            <X size={13} />
          </button>
        ) : null}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All Items" },
          { id: "finance", label: "Payments & Dues" },
          { id: "helpdesk", label: "Helpdesk & Tickets" },
          { id: "access", label: "Access & Amenities" },
          { id: "community", label: "Notices & Messages" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.1em] transition duration-200 active:scale-95 ${
              filter === tab.id
                ? "bg-courtyard text-ink shadow-md shadow-courtyard/20"
                : "border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
        Showing {filtered.length} matching result{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Results List */}
      <div className="grid gap-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onNavigate(item.screen)}
              className="group flex w-full items-center gap-4 rounded-[22px] border border-white/[0.09] bg-white/[0.045] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-courtyard/50 hover:bg-white/[0.08] active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.08] text-courtyard transition group-hover:bg-courtyard group-hover:text-ink">
                <PortalIcon name={item.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block font-display text-sm font-bold text-white">
                  {item.title}
                </strong>
                <small className="mt-1 block font-body text-xs text-white/50">{item.detail}</small>
              </span>
              <span className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-courtyard">
                <span>Open</span>
                <ChevronRight size={14} />
              </span>
            </button>
          ))
        ) : (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 text-center">
            <p className="font-display text-base font-bold text-white">No matching tools found</p>
            <p className="mt-1 text-xs text-white/40">Try searching for "dues", "pass", or "ticket"</p>
            <ActionButton onClick={() => { setQuery(""); setFilter("all"); }} variant="ghost" className="mt-4">
              Reset search
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   2. PAYMENTS & RECEIPTS SCREEN
   ========================================================================= */
function PaymentScreen({
  role,
  data,
  onNavigate,
}: {
  role: UserRole;
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const isAdmin = role === "admin";
  const [paid, setPaid] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [adminReceipts, setAdminReceipts] = useState([
    { id: "RCP-901", unit: "Tower A · 302", resident: "Aarav Sharma", amount: "₹4,850", date: "Today, 11:20 AM", status: "Pending" },
    { id: "RCP-902", unit: "Tower B · 104", resident: "Neha Kulkarni", amount: "₹4,850", date: "Yesterday", status: "Verified" },
    { id: "RCP-903", unit: "Tower B · 505", resident: "Vikram Mehta", amount: "₹5,200", date: "1 Sep", status: "Pending" },
    { id: "RCP-904", unit: "Tower A · 801", resident: "Priya Nair", amount: "₹4,850", date: "31 Aug", status: "Verified" },
  ]);

  const handlePay = () => {
    setShowPayModal(false);
    setPaid(true);
    toast.success("Payment of ₹4,850 confirmed! Receipt #RCP-88294 issued.");
  };

  const verifyReceipt = (id: string) => {
    setAdminReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "Verified" ? "Pending" : "Verified" } : r))
    );
    toast.success(`Receipt ${id} status updated.`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Summary Grid */}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Main Card */}
        <div className="flex flex-col justify-between rounded-[28px] bg-courtyard p-6 text-ink sm:p-8 shadow-xl">
          <div>
            <div className="flex items-start justify-between">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink/70">
                {isAdmin ? "Total Collection Cycle (Aug-Sep)" : "Outstanding Society Dues"}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-courtyard">
                <CircleDollarSign size={20} />
              </span>
            </div>

            <p className="mt-8 font-display text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-none tracking-[-0.08em]">
              {isAdmin ? "₹9.42L" : paid ? "₹0.00" : "₹4,850"}
            </p>

            <p className="mt-3 font-body text-sm font-medium text-ink/70">
              {isAdmin
                ? "82% of monthly target collected · 19 receipts pending reconciliation"
                : paid
                ? "All dues settled for September 2026. Thank you!"
                : "Due on 10 September 2026 · Tower B / Flat 704"}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {isAdmin ? (
              <ActionButton
                onClick={() => toast.info("Exporting financial reconciliation report...")}
                variant="dark"
              >
                <Download size={15} /> Export Ledger CSV
              </ActionButton>
            ) : paid ? (
              <ActionButton
                onClick={() => setShowStatementModal(true)}
                variant="dark"
              >
                <CheckCircle2 size={15} /> View Settled Receipt
              </ActionButton>
            ) : (
              <ActionButton
                onClick={() => setShowPayModal(true)}
                variant="dark"
              >
                <CreditCard size={15} /> Pay Dues Securely (₹4,850)
              </ActionButton>
            )}

            <button
              type="button"
              onClick={() => setShowStatementModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-ink/10 active:scale-95"
            >
              <FileText size={14} /> Itemized Breakdown
            </button>
          </div>
        </div>

        {/* Right Side Options */}
        <div className="space-y-3.5">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-courtyard">
              {isAdmin ? "Collection Pulse" : "Monthly Breakdown"}
            </h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-white/70">
                <span>Base Maintenance & Power</span>
                <span className="font-bold text-white">{isAdmin ? "₹6.80L" : "₹3,200"}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-white/70">
                <span>Sinking & Capital Reserve Fund</span>
                <span className="font-bold text-white">{isAdmin ? "₹1.40L" : "₹850"}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2 text-white/70">
                <span>Water & Common Area Charges</span>
                <span className="font-bold text-white">{isAdmin ? "₹82,000" : "₹500"}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Designated Covered Parking</span>
                <span className="font-bold text-white">{isAdmin ? "₹40,000" : "₹300"}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowStatementModal(true)}
            className="group flex w-full items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-courtyard">
                <FileText size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">Download Statement PDF</p>
                <p className="text-xs text-white/40">Official stamped receipt for tax / record</p>
              </div>
            </div>
            <Download size={16} className="text-courtyard transition group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Admin Receipts Reconciliation Table or Resident Transaction History */}
      <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">
            {isAdmin ? "Recent Receipts for Verification" : "Past Payment History"}
          </h3>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
            {isAdmin ? "4 entries" : "Last 3 months"}
          </span>
        </div>

        {isAdmin ? (
          <div className="divide-y divide-white/[0.08]">
            {adminReceipts.map((rec) => (
              <div key={rec.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 font-display text-xs font-bold text-courtyard">
                    {rec.unit.split(" · ")[1]}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{rec.resident}</p>
                    <p className="text-xs text-white/45">{rec.unit} · {rec.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-display text-base font-bold text-white">{rec.amount}</span>
                  <StatusBadge tone={rec.status === "Verified" ? "emerald" : "amber"}>
                    {rec.status}
                  </StatusBadge>
                  <ActionButton
                    onClick={() => verifyReceipt(rec.id)}
                    variant={rec.status === "Verified" ? "ghost" : "lime"}
                    className="h-9 px-3.5 text-[10px]"
                  >
                    {rec.status === "Verified" ? "Reopen" : "Verify Receipt"}
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {[
              { id: "RCP-88294", month: "September 2026", amount: "₹4,850", status: paid ? "Paid (Today)" : "Pending", date: paid ? "Today" : "Due 10 Sep" },
              { id: "RCP-87112", month: "August 2026", amount: "₹4,850", status: "Paid", date: "10 Aug 2026" },
              { id: "RCP-85940", month: "July 2026", amount: "₹4,850", status: "Paid", date: "09 Jul 2026" },
            ].map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-courtyard">
                    <Receipt size={16} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{entry.month}</p>
                    <p className="text-xs text-white/45">{entry.id} · {entry.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-white">{entry.amount}</span>
                  <StatusBadge tone={entry.status.includes("Paid") ? "emerald" : "amber"}>
                    {entry.status}
                  </StatusBadge>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success(`Downloaded Receipt ${entry.id}`);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white"
                    aria-label={`Download ${entry.id}`}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pay Modal */}
      {showPayModal ? (
        <Modal
          title="Settle September Dues"
          body="Complete direct payment for Maple Heights Flat 704. Instant digital receipt will be generated."
          onClose={() => setShowPayModal(false)}
          confirmLabel="Pay ₹4,850 Now"
          onConfirm={handlePay}
        >
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-white/5 p-4 text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/50">Amount Due</p>
              <p className="mt-1 font-display text-3xl font-bold text-courtyard">₹4,850</p>
            </div>

            <p className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
              Select Payment Method
            </p>

            <div className="grid gap-2">
              {[
                { id: "upi", label: "Instant UPI (GPay / PhonePe / Paytm)", icon: "sparkles" },
                { id: "card", label: "Credit / Debit Card", icon: "credit-card" },
                { id: "netbanking", label: "Net Banking (HDFC / ICICI / SBI)", icon: "building" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                    paymentMethod === m.id
                      ? "border-courtyard bg-courtyard/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <PortalIcon name={m.icon as any} size={16} className="text-courtyard" />
                    <span className="font-display text-xs font-bold">{m.label}</span>
                  </div>
                  {paymentMethod === m.id ? <Check size={16} className="text-courtyard" /> : null}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      ) : null}

      {/* Statement Breakdown Modal */}
      {showStatementModal ? (
        <Modal
          title="Maple Heights Society Statement"
          body="Official account ledger for Flat 704 · Tower B · Resident Sujit."
          onClose={() => setShowStatementModal(false)}
          confirmLabel="Download PDF Copy"
          onConfirm={() => {
            setShowStatementModal(false);
            toast.success("Statement downloaded successfully!");
          }}
        >
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs space-y-3">
            <div className="flex justify-between font-bold text-courtyard pb-2 border-b border-white/10">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Monthly Maintenance (1,600 sq ft)</span>
              <span>₹3,200</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Sinking & Reserve Allocation</span>
              <span>₹850</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Water Meter Billing</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Slot Parking Bay B-21</span>
              <span>₹300</span>
            </div>
            <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
              <span>Total Invoice Amount</span>
              <span className="text-courtyard">₹4,850</span>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   3. VIOLATIONS SCREEN
   ========================================================================= */
function ViolationsScreen({
  role,
  onNavigate,
}: {
  role: UserRole;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const isAdmin = role === "admin";
  const [resolved, setResolved] = useState(false);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealText, setAppealText] = useState("");

  const submitAppeal = () => {
    setShowAppealModal(false);
    toast.success("Appeal submitted to Managing Committee for review.");
  };

  const resolveNotice = () => {
    setResolved(true);
    toast.success("Parking notice resolved and cleared.");
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Notice Banner */}
      <div
        className={`rounded-[26px] border p-6 ${
          resolved
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
            : "border-amber-400/30 bg-amber-400/[0.08] text-amber-100"
        }`}
      >
        <div className="flex items-start gap-4">
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
              resolved ? "bg-emerald-400 text-ink" : "bg-amber-400 text-ink"
            }`}
          >
            {resolved ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-white">
              {resolved
                ? "All Compliance Clear"
                : isAdmin
                ? "7 Active Society Violations Pending"
                : "Active Notice: Parking Bay B-21"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed opacity-80">
              {resolved
                ? "There are no open violation notices on record for your flat."
                : isAdmin
                ? "3 parking violations, 2 noise complaints, and 2 unapproved renovation notices."
                : "Vehicle parked outside designated bay lines on 31 Aug. Fine waiver can be requested."}
            </p>
          </div>
        </div>
      </div>

      {!resolved && !isAdmin ? (
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-courtyard">
                Notice Reference: #VIO-409
              </p>
              <h4 className="mt-1 font-display text-lg font-bold text-white">
                Vehicle Parking Alignment (Bay B-21)
              </h4>
            </div>
            <StatusBadge tone="amber">Pending Resolution</StatusBadge>
          </div>

          <p className="text-xs text-white/60 leading-relaxed">
            Reported by security staff on 31 August at 8:40 PM. Please ensure your vehicle is parked
            within the marked boundary lines or provide an explanation.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <ActionButton onClick={() => setShowAppealModal(true)} variant="lime">
              <Send size={15} /> Submit Response / Appeal
            </ActionButton>
            <ActionButton onClick={resolveNotice} variant="ghost">
              <Check size={15} /> Confirm Re-aligned & Close
            </ActionButton>
          </div>
        </div>
      ) : null}

      {/* Admin Violation Manager Table */}
      {isAdmin ? (
        <div className="space-y-3">
          {[
            { id: "VIO-409", unit: "Tower B · 704", type: "Parking Bay Misalignment", date: "31 Aug", status: "Active" },
            { id: "VIO-410", unit: "Tower A · 1201", type: "Unapproved Drilling Hours", date: "01 Sep", status: "Under Review" },
            { id: "VIO-411", unit: "Tower A · 405", type: "Pet in Clubhouse Pool Area", date: "01 Sep", status: "Active" },
          ].map((v) => (
            <div
              key={v.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
            >
              <div>
                <p className="font-display text-xs font-bold text-white">{v.type}</p>
                <p className="text-xs text-white/45">{v.unit} · {v.id} · {v.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge tone="amber">{v.status}</StatusBadge>
                <ActionButton
                  onClick={() => toast.success(`Warning notice sent to ${v.unit}`)}
                  variant="ghost"
                  className="h-9 px-3 text-[10px]"
                >
                  Send Reminder
                </ActionButton>
                <ActionButton
                  onClick={() => toast.success(`Violation ${v.id} marked as resolved.`)}
                  variant="lime"
                  className="h-9 px-3 text-[10px]"
                >
                  Resolve
                </ActionButton>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {showAppealModal ? (
        <Modal
          title="Submit Violation Appeal"
          body="Explain the situation regarding parking bay B-21 to the Maple Heights Managing Committee."
          onClose={() => setShowAppealModal(false)}
          confirmLabel="Send Explanation"
          onConfirm={submitAppeal}
        >
          <div className="mt-4 space-y-3">
            <textarea
              value={appealText}
              onChange={(e) => setAppealText(e.target.value)}
              placeholder="e.g. My car was temporarily positioned to unload heavy groceries. It has now been parked inside the lines."
              rows={4}
              className="w-full rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-xs text-white outline-none focus:border-courtyard"
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   4. REQUESTS & MAINTENANCE SCREEN
   ========================================================================= */
function RequestsScreen({
  role,
  onNavigate,
}: {
  role: UserRole;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const isAdmin = role === "admin";
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [category, setCategory] = useState("Plumbing");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([
    { id: "TKT-1042", title: "Lift B-2 Slow Door Sensor", status: "In Progress", category: "Elevator", date: "Today", tech: "Ramesh (Otis)" },
    { id: "TKT-1038", title: "Corridor Light Fixture Replacement", status: "Assigned", category: "Electrical", date: "Yesterday", tech: "Sunil Electric" },
    { id: "TKT-1025", title: "Water Pressure Booster Valve", status: "Resolved", category: "Plumbing", date: "28 Aug", tech: "City Plumbing" },
  ]);

  const handleCreateTicket = () => {
    if (!description.trim()) {
      toast.error("Please enter ticket details.");
      return;
    }
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${category}: ${description.slice(0, 32)}…`,
      status: "Assigned",
      category,
      date: "Just now",
      tech: "Assigning staff…",
    };
    setTickets([newTkt, ...tickets]);
    setShowNewTicketModal(false);
    setDescription("");
    toast.success(`Request ${newTkt.id} created and dispatched!`);
  };

  const toggleStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Resolved" ? "In Progress" : "Resolved" }
          : t
      )
    );
    toast.success(`Ticket ${id} status updated.`);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {isAdmin ? "Society Maintenance Work Orders" : "My Active Helpdesk Requests"}
          </h3>
          <p className="text-xs text-white/50">{tickets.length} total tickets on record</p>
        </div>
        <ActionButton onClick={() => setShowNewTicketModal(true)} variant="lime">
          <Plus size={16} /> New Request
        </ActionButton>
      </div>

      {/* Tickets List */}
      <div className="grid gap-3.5">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-courtyard">
                  <PortalIcon
                    name={
                      t.category === "Plumbing"
                        ? "activity"
                        : t.category === "Electrical"
                        ? "sparkles"
                        : "clipboard"
                    }
                    size={18}
                  />
                </span>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.1em] text-courtyard">
                    {t.category} · {t.id}
                  </p>
                  <h4 className="mt-0.5 font-display text-base font-bold text-white">{t.title}</h4>
                  <p className="mt-1 text-xs text-white/45">
                    Assigned: {t.tech} · Logged: {t.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge
                  tone={
                    t.status === "Resolved"
                      ? "emerald"
                      : t.status === "In Progress"
                      ? "courtyard"
                      : "amber"
                  }
                >
                  {t.status}
                </StatusBadge>
                {isAdmin ? (
                  <ActionButton
                    onClick={() => toggleStatus(t.id)}
                    variant={t.status === "Resolved" ? "ghost" : "subtle"}
                    className="h-8 px-3 text-[10px]"
                  >
                    {t.status === "Resolved" ? "Reopen" : "Mark Done"}
                  </ActionButton>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewTicketModal ? (
        <Modal
          title="Raise Maintenance Ticket"
          body="Our on-site facility technician will be assigned within 30 minutes."
          onClose={() => setShowNewTicketModal(false)}
          confirmLabel="Dispatch Ticket"
          onConfirm={handleCreateTicket}
        >
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                Issue Category
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Plumbing", "Electrical", "Elevator", "Carpentry", "Civil / Wall", "Common Area"].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-xl border p-2.5 font-display text-xs font-bold transition ${
                        category === cat
                          ? "border-courtyard bg-courtyard text-ink"
                          : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                Priority
              </label>
              <div className="mt-2 flex gap-2">
                {["Normal", "High", "Urgent"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 rounded-xl border p-2 font-display text-xs font-bold transition ${
                      priority === p
                        ? "border-courtyard bg-courtyard text-ink"
                        : "border-white/10 bg-white/[0.04] text-white/70"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                Description & Location
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Master bathroom tap dripping constantly, Tower B flat 704"
                rows={3}
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] p-3 text-xs text-white outline-none focus:border-courtyard"
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   5. AMENITIES BOOKING SCREEN
   ========================================================================= */
function AmenitiesScreen({
  onNavigate,
}: {
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState("Evening (6:00 PM - 9:00 PM)");
  const [guestCount, setGuestCount] = useState("4");
  const [bookings, setBookings] = useState([
    { id: "AMN-110", name: "Rooftop Stargazing Deck", slot: "This Saturday · 6:00 PM", status: "Confirmed" },
  ]);

  const amenities = [
    { name: "Rooftop Lounge & Terrace", capacity: "30 Guests", timing: "6:00 AM - 11:00 PM", desc: "Panoramic view of the city with lounge seating & lighting.", icon: "calendar" },
    { name: "Grand Community Hall", capacity: "120 Guests", timing: "9:00 AM - 10:00 PM", desc: "Equipped with sound system, pantry, and dining space.", icon: "building" },
    { name: "Heated Swimming Pool", capacity: "15 Swimmers", timing: "6:00 AM - 9:00 PM", desc: "Temperature controlled lap pool with shower lockers.", icon: "activity" },
    { name: "Synthetic Tennis Court", capacity: "4 Players", timing: "6:00 AM - 8:00 PM", desc: "Professional turf with floodlights for evening games.", icon: "sparkles" },
    { name: "Clubhouse Gymnasium", capacity: "20 Users", timing: "24 / 7 Access", desc: "Full cardio suite, free weights, and stretching mats.", icon: "activity" },
  ];

  const handleConfirmBooking = () => {
    if (!selectedAmenity) return;
    const newBooking = {
      id: `AMN-${Math.floor(100 + Math.random() * 900)}`,
      name: selectedAmenity,
      slot: `Saturday · ${timeSlot}`,
      status: "Confirmed",
    };
    setBookings([newBooking, ...bookings]);
    setSelectedAmenity(null);
    toast.success(`Booking for ${selectedAmenity} confirmed! Code: ${newBooking.id}`);
  };

  return (
    <div className="space-y-8">
      {/* Active Reservations */}
      {bookings.length > 0 ? (
        <div className="rounded-[26px] border border-courtyard/30 bg-courtyard/[0.08] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-courtyard text-ink">
                <Check size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">Your Upcoming Reservation</p>
                <p className="text-xs text-white/60">{bookings[0].name} · {bookings[0].slot}</p>
              </div>
            </div>
            <StatusBadge tone="emerald">{bookings[0].status}</StatusBadge>
          </div>
        </div>
      ) : null}

      {/* Facilities Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {amenities.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-courtyard/40 hover:bg-white/[0.07]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-courtyard">
                  <PortalIcon name={item.icon as any} size={18} />
                </span>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-white/60">
                  {item.capacity}
                </span>
              </div>

              <h4 className="mt-4 font-display text-base font-bold text-white">{item.name}</h4>
              <p className="mt-1 font-body text-xs text-white/50 leading-relaxed">{item.desc}</p>
              <p className="mt-3 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-courtyard">
                Hours: {item.timing}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4">
              <ActionButton
                onClick={() => setSelectedAmenity(item.name)}
                variant="lime"
                className="w-full"
              >
                Reserve Facility
              </ActionButton>
            </div>
          </div>
        ))}
      </div>

      {selectedAmenity ? (
        <Modal
          title={`Reserve ${selectedAmenity}`}
          body="Select your preferred time slot and guest count. Free of charge for Maple Heights residents."
          onClose={() => setSelectedAmenity(null)}
          confirmLabel="Confirm Slot"
          onConfirm={handleConfirmBooking}
        >
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                Select Time Slot
              </label>
              <div className="mt-2 grid gap-2">
                {[
                  "Morning (7:00 AM - 10:00 AM)",
                  "Afternoon (1:00 PM - 4:00 PM)",
                  "Evening (6:00 PM - 9:00 PM)",
                  "Night (9:00 PM - 11:00 PM)",
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`rounded-xl border p-2.5 text-left font-display text-xs font-bold transition ${
                      timeSlot === slot
                        ? "border-courtyard bg-courtyard text-ink"
                        : "border-white/10 bg-white/[0.04] text-white/70"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 font-body text-sm text-white outline-none focus:border-courtyard"
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   6. GATE PASS SCREEN
   ========================================================================= */
function GatePassScreen({
  onNavigate,
}: {
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [purpose, setPurpose] = useState("Guest");
  const [activePasses, setActivePasses] = useState([
    { id: "GP-8492", name: "Asha Rao", phone: "+91 98450 11234", code: "849 201", purpose: "Guest", time: "Today, 7:30 PM", valid: true },
  ]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      toast.error("Please provide a visitor name.");
      return;
    }
    const pin = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    const pass = {
      id: `GP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: visitorName,
      phone: visitorPhone || "Not specified",
      code: pin,
      purpose,
      time: "Today, Immediate",
      valid: true,
    };
    setActivePasses([pass, ...activePasses]);
    setVisitorName("");
    setVisitorPhone("");
    toast.success(`Gate Pass created! PIN: ${pin}`);
  };

  const revokePass = (id: string) => {
    setActivePasses((prev) => prev.filter((p) => p.id !== id));
    toast.info("Gate pass revoked.");
  };

  const copyCode = (code: string) => {
    void navigator.clipboard?.writeText(code);
    toast.success(`Copied PIN ${code} to clipboard!`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Form Card */}
      <form
        onSubmit={handleGenerate}
        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 space-y-5"
      >
        <div>
          <h3 className="font-display text-xl font-bold text-white">Create Quick Visitor Pass</h3>
          <p className="mt-1 text-xs text-white/50">
            Pass PIN will be logged at the main security gate for instantaneous vehicle clearance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
              Visitor Name *
            </span>
            <input
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 font-body text-sm text-white outline-none focus:border-courtyard"
            />
          </label>

          <label className="block">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
              Phone (Optional)
            </span>
            <input
              value={visitorPhone}
              onChange={(e) => setVisitorPhone(e.target.value)}
              placeholder="e.g. 98450 12345"
              className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 font-body text-sm text-white outline-none focus:border-courtyard"
            />
          </label>
        </div>

        <div>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
            Visit Purpose
          </span>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {["Guest", "Food / Parcel", "Cab Arrival", "Service Pro"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(p)}
                className={`rounded-xl border p-2.5 font-display text-[11px] font-bold transition ${
                  purpose === p
                    ? "border-courtyard bg-courtyard text-ink"
                    : "border-white/10 bg-white/[0.03] text-white/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <ActionButton type="submit" variant="lime" className="w-full">
          <KeyRound size={16} /> Generate 6-Digit Gate Code
        </ActionButton>
      </form>

      {/* Active Passes List */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-white">Active Gate Approvals</h3>

        {activePasses.map((pass) => (
          <div
            key={pass.id}
            className="rounded-[24px] border border-courtyard/30 bg-courtyard/[0.06] p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-courtyard">
                  {pass.purpose} · {pass.time}
                </p>
                <h4 className="mt-1 font-display text-lg font-bold text-white">{pass.name}</h4>
              </div>
              <StatusBadge tone="courtyard">Valid Pass</StatusBadge>
            </div>

            {/* PIN Card */}
            <div className="flex items-center justify-between rounded-2xl bg-black/40 p-4 border border-white/10">
              <div>
                <p className="font-display text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                  Security Gate 6-Digit PIN
                </p>
                <p className="font-display text-2xl font-bold tracking-widest text-courtyard">
                  {pass.code}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyCode(pass.code)}
                  aria-label="Copy gate pass PIN"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-courtyard hover:text-ink transition"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("WhatsApp share link copied!");
                  }}
                  aria-label="Share gate pass"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-courtyard hover:text-ink transition"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40">Expires in 6 hours</span>
              <button
                type="button"
                onClick={() => revokePass(pass.id)}
                className="font-display text-[10px] font-bold uppercase tracking-[0.1em] text-red-400 hover:underline"
              >
                Revoke Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   7. ANNOUNCEMENTS SCREEN
   ========================================================================= */
function AnnouncementsScreen({
  data,
  role,
  onNavigate,
}: {
  data: DashboardPayload;
  role: UserRole;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);
  const notices = [
    {
      id: "ANN-101",
      tag: "Maintenance",
      title: data.announcement.title,
      body: data.announcement.body,
      timestamp: data.announcement.timestamp,
      author: "Estate Management Office",
    },
    {
      id: "ANN-102",
      tag: "Community Event",
      title: "Annual Ganesh Chaturthi & Autumn Cultural Fest",
      body: "Cultural committee invites performances and stall registrations for the upcoming clubhouse gathering this September 18th.",
      timestamp: "2 days ago",
      author: "Cultural Committee",
    },
    {
      id: "ANN-103",
      tag: "Security Circular",
      title: "Visitor Vehicle Tagging & EV Charging Protocol",
      body: "All EV owners using basement charging bays are requested to register their RFID tags with the main security kiosk.",
      timestamp: "5 days ago",
      author: "Chief Security Officer",
    },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {role === "admin" ? (
        <div className="flex justify-end">
          <ActionButton onClick={() => onNavigate("broadcast")} variant="lime">
            <Megaphone size={16} /> Compose New Broadcast
          </ActionButton>
        </div>
      ) : null}

      <div className="grid gap-4">
        {notices.map((n) => (
          <article
            key={n.id}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-courtyard/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between gap-4">
              <StatusBadge tone="courtyard">{n.tag}</StatusBadge>
              <span className="font-body text-xs text-white/40">{n.timestamp}</span>
            </div>

            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
              {n.title}
            </h3>

            <p className="mt-2.5 font-body text-sm leading-relaxed text-white/60">{n.body}</p>

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
                Posted by: {n.author}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNotice(n)}
                className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-courtyard hover:underline"
              >
                Read Full Circular →
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedNotice ? (
        <Modal
          title={selectedNotice.title}
          body={selectedNotice.body}
          onClose={() => setSelectedNotice(null)}
          confirmLabel="Acknowledge Notice"
          onConfirm={() => {
            setSelectedNotice(null);
            toast.success("Notice acknowledged.");
          }}
        >
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            <p>Circular ID: {selectedNotice.id}</p>
            <p className="mt-1">Authorized by: {selectedNotice.author}</p>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   8. MESSAGES SCREEN
   ========================================================================= */
function MessagesScreen({
  onNavigate,
}: {
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [activeChannel, setActiveChannel] = useState("Society Office");
  const [msgInput, setMsgInput] = useState("");
  const [threads, setThreads] = useState<Record<string, { sender: string; text: string; time: string; isMe: boolean }[]>>({
    "Society Office": [
      { sender: "Admin Desk", text: "Hello Sujit, your maintenance receipt for August was verified.", time: "10:30 AM", isMe: false },
      { sender: "Sujit", text: "Thank you! When is the water tank cleaning scheduled?", time: "10:35 AM", isMe: true },
      { sender: "Admin Desk", text: "Saturday morning 10:00 AM to 1:00 PM. Notice has been published on the board.", time: "10:40 AM", isMe: false },
    ],
    "Security Gate": [
      { sender: "Main Gate Kiosk", text: "Cab driver with OTP 849 201 has entered basement Tower B.", time: "Yesterday", isMe: false },
    ],
    "Helpdesk Desk": [
      { sender: "Technician Ramesh", text: "Lift door alignment in Tower B is completed and tested.", time: "2 days ago", isMe: false },
    ],
  });

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!msgInput.trim()) return;
    const newMsg = { sender: "Sujit", text: msgInput, time: "Just now", isMe: true };
    setThreads((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));
    setMsgInput("");
    toast.success("Message sent!");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Channel Switcher */}
      <div className="space-y-2">
        {Object.keys(threads).map((channel) => (
          <button
            key={channel}
            type="button"
            onClick={() => setActiveChannel(channel)}
            className={`flex w-full items-center justify-between rounded-2xl p-4 text-left font-display text-sm font-bold transition ${
              activeChannel === channel
                ? "bg-courtyard text-ink shadow-lg shadow-courtyard/20"
                : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
            }`}
          >
            <span>{channel}</span>
            <span className="text-[10px] opacity-75">{threads[channel].length} msgs</span>
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] p-6 min-h-[420px]">
        {/* Header */}
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-courtyard animate-pulse" />
            <h4 className="font-display text-sm font-bold text-white">{activeChannel}</h4>
          </div>
          <span className="text-xs text-white/40">Encrypted Resident Channel</span>
        </div>

        {/* Message Feed */}
        <div className="my-4 space-y-3 overflow-y-auto max-h-[300px] pr-2">
          {threads[activeChannel]?.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${
                  msg.isMe
                    ? "bg-courtyard text-ink font-medium rounded-tr-sm"
                    : "bg-white/10 text-white rounded-tl-sm"
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <span className="mt-1 text-[9px] text-white/40">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex gap-2 py-2 overflow-x-auto">
          {["Please check", "Thank you!", "Acknowledged", "Urgent request"].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setMsgInput(chip);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/60 hover:bg-white/15"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="mt-2 flex gap-2">
          <input
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            placeholder={`Message ${activeChannel}…`}
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-4 font-body text-xs text-white outline-none focus:border-courtyard"
          />
          <ActionButton type="submit" variant="lime" className="h-10 px-4">
            <Send size={15} />
          </ActionButton>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   9. PROFILE & SETTINGS SCREEN
   ========================================================================= */
function ProfileScreen({
  data,
  onNavigate,
  onLogout,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
  onLogout: () => void;
}) {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [phone, setPhone] = useState("+91 98450 77123");
  const [email, setEmail] = useState("sujit.kulkarni@mapleheights.com");

  return (
    <div className="max-w-3xl space-y-6">
      {/* Resident Identity Card */}
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <Avatar initials={data.initials} size="lg" />
          <div>
            <h3 className="font-display text-2xl font-bold text-white">{data.name}</h3>
            <p className="font-body text-xs text-courtyard">{data.unit}</p>
            <p className="text-xs text-white/50">{data.residency}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <ActionButton onClick={() => setShowEditModal(true)} variant="subtle">
            <Edit3 size={15} /> Edit Contact
          </ActionButton>
          <ActionButton onClick={onLogout} variant="danger">
            Sign Out
          </ActionButton>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 space-y-2.5 text-xs">
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-courtyard">
            Household & Vehicles
          </h4>
          <div className="flex justify-between text-white/70">
            <span>Primary Phone</span>
            <span className="font-bold text-white">{phone}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Email</span>
            <span className="font-bold text-white">{email}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Registered Vehicle</span>
            <span className="font-bold text-white">KA-01-MJ-8829 (SUV)</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Parking Bay</span>
            <span className="font-bold text-white">Bay B-21 (Basement 1)</span>
          </div>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 space-y-3 text-xs">
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-courtyard">
            Notification Preferences
          </h4>

          <div className="flex items-center justify-between">
            <span className="text-white/80">WhatsApp Gate Arrival Passes</span>
            <button
              type="button"
              onClick={() => {
                setWhatsappAlerts(!whatsappAlerts);
                toast.success("Preference updated.");
              }}
              className={`h-6 w-11 rounded-full p-1 transition ${
                whatsappAlerts ? "bg-courtyard" : "bg-white/20"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-ink transition-transform ${
                  whatsappAlerts ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/80">SMS Urgent Security Alerts</span>
            <button
              type="button"
              onClick={() => {
                setSmsAlerts(!smsAlerts);
                toast.success("Preference updated.");
              }}
              className={`h-6 w-11 rounded-full p-1 transition ${
                smsAlerts ? "bg-courtyard" : "bg-white/20"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-ink transition-transform ${
                  smsAlerts ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/80">Email Invoices & Dues Receipts</span>
            <button
              type="button"
              onClick={() => {
                setEmailReceipts(!emailReceipts);
                toast.success("Preference updated.");
              }}
              className={`h-6 w-11 rounded-full p-1 transition ${
                emailReceipts ? "bg-courtyard" : "bg-white/20"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-ink transition-transform ${
                  emailReceipts ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        <h4 className="font-display text-sm font-bold text-white">Emergency Society Hotline</h4>
        <div className="mt-3 flex flex-wrap gap-3">
          <ActionButton
            onClick={() => toast.success("Calling Security Gate Kiosk (Intercom 101)...")}
            variant="ghost"
          >
            <Phone size={14} /> Security Gate (101)
          </ActionButton>
          <ActionButton
            onClick={() => toast.success("Calling Management Office (Intercom 001)...")}
            variant="ghost"
          >
            <Building size={14} /> Facility Office (001)
          </ActionButton>
        </div>
      </div>

      {showEditModal ? (
        <Modal
          title="Update Resident Contact"
          body="Change your active contact details for verification and visitor logs."
          onClose={() => setShowEditModal(false)}
          confirmLabel="Save Details"
          onConfirm={() => {
            setShowEditModal(false);
            toast.success("Contact details updated.");
          }}
        >
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs text-white/60">Phone Number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-xs text-white outline-none focus:border-courtyard"
              />
            </label>
            <label className="block">
              <span className="text-xs text-white/60">Email Address</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-xs text-white outline-none focus:border-courtyard"
              />
            </label>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   10. BROADCAST SCREEN (ADMIN)
   ========================================================================= */
function BroadcastScreen({
  onNavigate,
}: {
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All Towers (248 Homes)");
  const [sendSms, setSendSms] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in both title and announcement body.");
      return;
    }
    toast.success(`Broadcast published to ${audience}!`);
    onNavigate("announcements");
  };

  return (
    <form
      onSubmit={handlePublish}
      className="max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 space-y-5"
    >
      <div>
        <h3 className="font-display text-xl font-bold text-white">Compose Society Broadcast</h3>
        <p className="mt-1 text-xs text-white/50">
          This notice will be posted to the live Noticeboard and pushed to resident devices.
        </p>
      </div>

      <label className="block">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
          Announcement Title *
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Scheduled Power Maintenance on Thursday"
          className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 font-body text-sm text-white outline-none focus:border-courtyard"
        />
      </label>

      <div>
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
          Target Audience
        </span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["All Towers (248 Homes)", "Tower A Only", "Tower B Only"].map((aud) => (
            <button
              key={aud}
              type="button"
              onClick={() => setAudience(aud)}
              className={`rounded-xl border p-2.5 font-display text-xs font-bold transition ${
                audience === aud
                  ? "border-courtyard bg-courtyard text-ink"
                  : "border-white/10 bg-white/[0.03] text-white/70"
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
          Announcement Message *
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write clear, concise instructions for residents…"
          rows={4}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.05] p-4 font-body text-sm text-white outline-none focus:border-courtyard"
        />
      </label>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
          <input
            type="checkbox"
            checked={sendSms}
            onChange={(e) => setSendSms(e.target.checked)}
            className="rounded accent-lime-400"
          />
          <span>Also dispatch urgent SMS broadcast</span>
        </label>

        <ActionButton type="submit" variant="lime">
          <Megaphone size={16} /> Publish Broadcast
        </ActionButton>
      </div>
    </form>
  );
}

/* =========================================================================
   11. USERS & DIRECTORY SCREEN (ADMIN)
   ========================================================================= */
function UsersScreen({
  onNavigate,
}: {
  onNavigate: (screen: PortalScreen) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [residents, setResidents] = useState([
    { id: "RES-101", name: "Sujit Kulkarni", flat: "Tower B · 704", type: "Owner", phone: "+91 98450 77123", status: "Active" },
    { id: "RES-102", name: "Aarav Sharma", flat: "Tower A · 302", type: "Tenant", phone: "+91 98450 22334", status: "Active" },
    { id: "RES-103", name: "Neha Kulkarni", flat: "Tower B · 104", type: "Owner", phone: "+91 98450 55667", status: "Active" },
    { id: "RES-104", name: "Rohit Deshmukh", flat: "Tower A · 901", type: "Move-In", phone: "+91 98450 99881", status: "Pending Approval" },
  ]);

  const approveResident = (id: string) => {
    setResidents((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Active" } : r))
    );
    toast.success("Resident move-in approved!");
  };

  const filtered = residents.filter(
    (r) =>
      r.name.toLowerCase().includes(userQuery.toLowerCase()) ||
      r.flat.toLowerCase().includes(userQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl space-y-6">
      {/* Metrics Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] bg-courtyard p-6 text-ink">
        <div>
          <p className="font-display text-4xl font-bold tracking-tight">248</p>
          <p className="mt-1 font-body text-xs font-bold text-ink/70">
            Active Verified Households · Maple Heights
          </p>
        </div>
        <ActionButton onClick={() => setShowAddModal(true)} variant="dark">
          <Plus size={16} /> Add Resident Record
        </ActionButton>
      </div>

      {/* Search Filter */}
      <div className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4">
        <Search size={16} className="text-courtyard" />
        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Filter by resident name or flat number…"
          className="min-w-0 flex-1 bg-transparent font-body text-xs text-white outline-none placeholder:text-white/40"
        />
      </div>

      {/* Directory Table */}
      <div className="divide-y divide-white/[0.08] rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
        {filtered.map((res) => (
          <div key={res.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5 px-2">
            <div className="flex items-center gap-3">
              <Avatar initials={res.name.split(" ").map((n) => n[0]).join("")} size="sm" />
              <div>
                <p className="font-display text-sm font-bold text-white">{res.name}</p>
                <p className="text-xs text-white/45">{res.flat} · {res.type} · {res.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge tone={res.status === "Active" ? "emerald" : "amber"}>
                {res.status}
              </StatusBadge>
              {res.status === "Pending Approval" ? (
                <ActionButton
                  onClick={() => approveResident(res.id)}
                  variant="lime"
                  className="h-8 px-3 text-[10px]"
                >
                  Approve Move-In
                </ActionButton>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {showAddModal ? (
        <Modal
          title="Add Resident Household"
          body="Create a new resident directory record and generate onboarding credentials."
          onClose={() => setShowAddModal(false)}
          confirmLabel="Create Resident"
          onConfirm={() => {
            setShowAddModal(false);
            toast.success("New resident record added.");
          }}
        >
          <div className="mt-4 space-y-3">
            <input
              placeholder="Full Name"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-xs text-white outline-none focus:border-courtyard"
            />
            <input
              placeholder="Unit / Flat No (e.g. Tower B - 802)"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-xs text-white outline-none focus:border-courtyard"
            />
            <input
              placeholder="Contact Phone Number"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-xs text-white outline-none focus:border-courtyard"
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* =========================================================================
   12. DETAIL / SUCCESS ACTION SCREEN
   ========================================================================= */
function DetailScreen({
  role,
  onNavigate,
}: {
  role: UserRole;
  onNavigate: (screen: PortalScreen) => void;
}) {
  return (
    <div className="max-w-2xl rounded-[28px] border border-courtyard/30 bg-courtyard/[0.08] p-7 sm:p-9 space-y-6">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-courtyard text-ink shadow-lg shadow-courtyard/25">
          <CheckCircle2 size={24} />
        </span>
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white">
            {role === "admin" ? "Operation Executed Successfully" : "Request Completed & Logged"}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-white/60">
            Your action has been reconciled and recorded in the Maple Heights operations ledger.
            You can return to the main dashboard or continue managing portal items.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <ActionButton onClick={() => onNavigate("home")} variant="lime">
          <Home size={15} /> Return to Dashboard
        </ActionButton>
        <ActionButton onClick={() => onNavigate("messages")} variant="ghost">
          <MessageCircle size={15} /> Contact Society Office
        </ActionButton>
      </div>
    </div>
  );
}
