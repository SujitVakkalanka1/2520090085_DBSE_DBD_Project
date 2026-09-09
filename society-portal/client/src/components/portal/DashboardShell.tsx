/* Editorial Utility / Night Courtyard: responsive website shell with purposeful screen navigation and role-aware actions. */
import { useState } from "react";
import type { DashboardPayload, UserRole } from "../../lib/mockApi";
import { performAction } from "../../lib/mockApi";
import { DestinationScreen, type PortalScreen } from "./DestinationScreen";
import {
  Avatar,
  IconButton,
  LogoMark,
  PortalIcon,
  StatusBadge,
  type PortalIconName,
} from "./PortalPrimitives";

const roleCopy: Record<UserRole, { eyebrow: string; subtitle: string }> = {
  resident: {
    eyebrow: "Resident view",
    subtitle: "The little things that keep home running smoothly.",
  },
  admin: {
    eyebrow: "Admin view",
    subtitle: "A clear pulse on people, payments, and place.",
  },
};

export const mapCategoryToScreen = (category: string, role: UserRole): PortalScreen => {
  const norm = category.toLowerCase();
  if (norm.includes("helpdesk") || norm.includes("complaint") || norm.includes("request") || norm.includes("maintenance")) {
    return role === "admin" ? "maintenance" : "requests";
  }
  if (norm.includes("facilit") || norm.includes("amenit")) return "amenities";
  if (norm.includes("poll") || norm.includes("vote") || norm.includes("notice") || norm.includes("announcement")) {
    return "announcements";
  }
  if (norm.includes("gate") || norm.includes("visitor") || norm.includes("pass")) return "gate-pass";
  if (norm.includes("pay") || norm.includes("due") || norm.includes("receipt") || norm.includes("finance")) {
    return role === "admin" ? "receipts" : "payments";
  }
  if (norm.includes("broadcast")) return "broadcast";
  if (norm.includes("user") || norm.includes("resident") || norm.includes("people")) return "users";
  if (norm.includes("message") || norm.includes("chat")) return "messages";
  if (norm.includes("profile") || norm.includes("account") || norm.includes("setting")) return "profile";
  if (norm.includes("violation") || norm.includes("notice")) return "violations";
  return "search";
};

function SearchBar({
  onSearch,
  initialValue = "",
}: {
  onSearch: (query: string) => void;
  initialValue?: string;
}) {
  const [query, setQuery] = useState(initialValue);

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={submit}
      className="flex h-12 items-center gap-3 rounded-full border border-ink/10 bg-ink/[0.04] px-4 transition duration-200 focus-within:border-ink/30 focus-within:bg-white focus-within:shadow-md"
    >
      <PortalIcon name="search" size={17} className="text-ink/50" />
      <input
        aria-label="Search the portal"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search dues, tickets, gate passes, notices…"
        className="min-w-0 flex-1 bg-transparent font-body text-sm text-ink outline-none placeholder:text-ink/40"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search text"
          className="grid h-6 w-6 place-items-center rounded-full bg-ink/10 text-ink/70 hover:bg-ink/20"
        >
          <PortalIcon name="close" size={12} />
        </button>
      ) : null}
      <button
        type="submit"
        aria-label="Submit portal search"
        className="rounded-full bg-ink px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-courtyard transition hover:bg-black active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

function Header({
  data,
  onNavigate,
  onLogout,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen, query?: string) => void;
  onLogout: () => void;
}) {
  return (
    <header className="border-b border-ink/5 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-5 sm:px-8 lg:px-12 lg:pb-10 lg:pt-8">
        {/* Top bar with brand and user controls */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="group flex items-center gap-3 text-left transition"
          >
            <LogoMark size={38} />
            <div>
              <span className="block font-display text-[12px] font-bold uppercase tracking-[0.16em] text-ink">
                Courtyard
              </span>
              <span className="hidden font-body text-[10px] text-ink/40 sm:block">
                Maple Heights Society
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <IconButton
              label="Open search"
              name="search"
              onClick={() => onNavigate("search")}
            />
            <IconButton
              label="Open messages"
              name="message"
              onClick={() => onNavigate("messages")}
            />
            <IconButton
              label="Open announcements"
              name="bell"
              onClick={() => onNavigate("announcements")}
            />
            <button
              type="button"
              onClick={() => onNavigate("profile")}
              className="ml-1 rounded-full ring-2 ring-transparent transition hover:ring-courtyard active:scale-95"
              aria-label="Open profile & account settings"
            >
              <Avatar initials={data.initials} size="sm" />
            </button>
          </div>
        </div>

        {/* Hero Banner Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
                <span className="h-1.5 w-1.5 rounded-full bg-courtyard" />
                <span>{roleCopy[data.role].eyebrow}</span>
                <span>·</span>
                <span className="text-ink/80">{data.unit}</span>
              </div>

              <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.07em] text-ink">
                Hello, {data.name}
                <span className="text-courtyard">.</span>
              </h1>

              <p className="mt-3 max-w-[34rem] font-body text-sm leading-relaxed text-ink/60">
                {data.residency} <span className="mx-1 text-ink/25">/</span> {roleCopy[data.role].subtitle}
              </p>
            </div>

            <div className="mt-7 max-w-xl">
              <SearchBar onSearch={(query) => onNavigate("search", query)} />
            </div>
          </div>

          {/* Symmetrical Highlight Metric Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {data.highlights.map((highlight, index) => (
              <HighlightWidget
                key={highlight.label}
                {...highlight}
                index={index}
                role={data.role}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function HighlightWidget({
  label,
  value,
  meta,
  index,
  role,
  onNavigate,
}: {
  label: string;
  value: string;
  meta: string;
  index: number;
  role: UserRole;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const isViolation = label.toLowerCase().includes("violation");
  const targetScreen = isViolation ? "violations" : role === "admin" ? "receipts" : "payments";

  return (
    <button
      type="button"
      onClick={() => onNavigate(targetScreen)}
      className="group flex min-h-[170px] flex-col justify-between rounded-[26px] bg-courtyard p-5 text-left transition duration-200 hover:-translate-y-1 hover:bg-[#d8ff42] hover:shadow-xl hover:shadow-courtyard/20 active:scale-[0.98] sm:min-h-[185px] sm:p-6"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="max-w-[14ch] font-display text-[10px] font-bold uppercase leading-[1.35] tracking-[0.14em] text-ink/70">
          {label}
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-courtyard transition duration-200 group-hover:rotate-45">
          <PortalIcon name="arrow" size={17} />
        </span>
      </div>

      <div>
        <p className="font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-bold leading-none tracking-[-0.08em] text-ink">
          {value}
        </p>
        <p className="mt-2 font-body text-xs font-medium text-ink/65">{meta}</p>
      </div>
    </button>
  );
}

function CategoryChips({
  data,
  onNavigate,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-2 py-1">
        {data.categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onNavigate(mapCategoryToScreen(category, data.role))}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-white/70 transition duration-200 hover:border-courtyard/40 hover:bg-white/[0.1] hover:text-white active:scale-95"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/30 group-hover:bg-courtyard" />
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnnouncementCard({
  data,
  onNavigate,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
}) {
  return (
    <article className="relative isolate overflow-hidden rounded-[26px] border border-white/10 bg-[#1e1e1e] p-6 shadow-xl sm:p-7">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#2a2a2a] via-[#1e1e1e] to-[#121212]" />
      
      <div className="flex items-start justify-between gap-4">
        <StatusBadge tone="courtyard">{data.announcement.eyebrow}</StatusBadge>
        <span className="font-body text-xs text-white/40">{data.announcement.timestamp}</span>
      </div>

      <h3 className="mt-6 max-w-[20ch] font-display text-[clamp(1.4rem,2.8vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.05em] text-white">
        {data.announcement.title}
      </h3>

      <p className="mt-3.5 max-w-[48ch] font-body text-sm leading-relaxed text-white/60">
        {data.announcement.body}
      </p>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onNavigate("announcements")}
          className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-courtyard transition hover:gap-3 hover:text-[#d8ff42]"
        >
          {data.announcement.cta} <PortalIcon name="arrow" size={15} />
        </button>
      </div>
    </article>
  );
}

function QuickActions({
  data,
  onNavigate,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
            Shortcuts
          </p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.05em] text-white">
            Quick actions
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("search")}
          className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-courtyard transition hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
        {data.quickActions.map((action, index) => (
          <QuickActionCard
            key={action.label}
            {...action}
            index={index}
            onNavigate={onNavigate}
            role={data.role}
          />
        ))}
      </div>
    </section>
  );
}

function QuickActionCard({
  label,
  detail,
  icon,
  onNavigate,
  role,
}: {
  label: string;
  detail: string;
  icon: string;
  index: number;
  onNavigate: (screen: PortalScreen) => void;
  role: UserRole;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(mapCategoryToScreen(label, role))}
      className="group flex min-h-[142px] flex-col justify-between rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-courtyard/45 hover:bg-white/[0.08] active:scale-[0.98] sm:min-h-[150px] sm:p-5"
    >
      <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/[0.08] text-courtyard transition duration-200 group-hover:scale-105 group-hover:bg-courtyard group-hover:text-ink">
        <PortalIcon name={icon as PortalIconName} size={18} />
      </span>

      <div>
        <p className="font-display text-sm font-bold leading-tight text-white">{label}</p>
        <p className="mt-1 font-body text-xs text-white/40">{detail}</p>
      </div>
    </button>
  );
}

function BuildingCard({
  data,
  onNavigate,
}: {
  data: DashboardPayload;
  onNavigate: (screen: PortalScreen) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(data.role === "admin" ? "maintenance" : "amenities")}
      className="group relative isolate flex min-h-[250px] w-full flex-col justify-end overflow-hidden rounded-[26px] border border-white/10 bg-[#1e1e1e] p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-courtyard/40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#252525]" />

      <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-courtyard">
        {data.sidePanel.eyebrow}
      </p>
      <h3 className="max-w-[16ch] font-display text-2xl font-bold leading-tight tracking-[-0.05em] text-white">
        {data.sidePanel.title}
      </h3>
      <p className="mt-2.5 max-w-[32ch] font-body text-xs leading-relaxed text-white/60">
        {data.sidePanel.detail}
      </p>
    </button>
  );
}

function BottomNav({
  role,
  active,
  onNavigate,
}: {
  role: UserRole;
  active: PortalScreen;
  onNavigate: (screen: PortalScreen) => void;
}) {
  const items: { label: string; icon: PortalIconName; screen: PortalScreen }[] =
    role === "admin"
      ? [
          { label: "Overview", icon: "grid", screen: "home" },
          { label: "Operations", icon: "activity", screen: "maintenance" },
          { label: "Broadcast", icon: "megaphone", screen: "broadcast" },
          { label: "Messages", icon: "message", screen: "messages" },
          { label: "Profile", icon: "profile", screen: "profile" },
        ]
      : [
          { label: "Home", icon: "grid", screen: "home" },
          { label: "Requests", icon: "activity", screen: "requests" },
          { label: "Pay", icon: "wallet", screen: "payments" },
          { label: "Messages", icon: "message", screen: "messages" },
          { label: "Profile", icon: "profile", screen: "profile" },
        ];

  return (
    <nav
      aria-label={`${role} bottom navigation dock`}
      className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 items-center justify-between gap-1.5 rounded-full border border-white/15 bg-[#121212]/92 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl ring-1 ring-white/5 sm:bottom-6 sm:gap-2.5 sm:p-2.5"
    >
      {items.map((item) => {
        const isSelected = active === item.screen;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.screen)}
            className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-full py-2 px-1.5 font-display text-[9.5px] font-bold uppercase tracking-[0.08em] transition-all duration-200 active:scale-95 sm:py-2.5 sm:px-3 sm:text-[10px] ${
              isSelected
                ? "bg-courtyard text-ink shadow-[0_4px_18px_rgba(204,255,0,0.35)] ring-1 ring-courtyard/50"
                : "text-white/50 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <PortalIcon
              name={item.icon}
              size={17}
              className={`transition-transform duration-200 ${
                isSelected ? "scale-105" : "group-hover:scale-110"
              }`}
            />
            <span className="truncate max-w-full text-center">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function DashboardShell({
  data,
  onLogout,
  initialScreen = "home",
}: {
  data: DashboardPayload;
  onLogout: () => void;
  initialScreen?: PortalScreen;
}) {
  const [screen, setScreen] = useState<PortalScreen>(initialScreen);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onNavigate = async (next: PortalScreen, query?: string) => {
    if (query !== undefined) setSearchQuery(query);
    if (next !== "home") await performAction(data.role, next);
    setScreen(next);
    window.history.pushState(
      {},
      "",
      next === "home" ? `/?role=${data.role}` : `/?role=${data.role}&screen=${next}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (screen !== "home") {
    return (
      <>
        <DestinationScreen
          role={data.role}
          screen={screen}
          data={data}
          initialSearchQuery={searchQuery}
          onBack={() => void onNavigate("home")}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        <BottomNav role={data.role} active={screen} onNavigate={onNavigate} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      <Header data={data} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="mx-auto max-w-[1440px] bg-ink px-5 pb-32 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pb-32 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          {/* Main Feed Column */}
          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-courtyard">
                  Browse your building
                </p>
                <h2 className="font-display text-2xl font-bold tracking-[-0.05em] text-white">
                  Stay in the loop.
                </h2>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-white/10 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white/50 transition hover:border-courtyard/50 hover:text-courtyard active:scale-95"
              >
                Sign out
              </button>
            </div>

            <CategoryChips data={data} onNavigate={onNavigate} />

            <section className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                    Noticeboard
                  </p>
                  <h2 className="font-display text-2xl font-bold tracking-[-0.05em] text-white">
                    Announcements
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("announcements")}
                  className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-courtyard transition hover:text-white"
                >
                  Archive
                </button>
              </div>
              <AnnouncementCard data={data} onNavigate={onNavigate} />
            </section>

            <div className="mt-10">
              <QuickActions data={data} onNavigate={onNavigate} />
            </div>
          </div>

          {/* Right Aside Column */}
          <aside className="space-y-4 lg:pt-14">
            <BuildingCard data={data} onNavigate={onNavigate} />

            <button
              type="button"
              onClick={() => onNavigate(data.role === "admin" ? "maintenance" : "requests")}
              className="group w-full rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-5 text-left transition hover:border-courtyard/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <StatusBadge tone="courtyard">Today's Priority</StatusBadge>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-white/70 transition group-hover:bg-courtyard group-hover:text-ink">
                  <PortalIcon name="arrow" size={14} />
                </span>
              </div>
              <p className="mt-5 font-display text-lg font-bold leading-snug tracking-[-0.04em] text-white">
                {data.role === "admin"
                  ? "12 requests need a calm next step."
                  : "2 small items are waiting on you."}
              </p>
              <p className="mt-2 font-body text-xs leading-relaxed text-white/45">
                {data.role === "admin"
                  ? "Open maintenance logs to review technician assignments."
                  : "Your dues and gate-pass tools are one tap away."}
              </p>
            </button>
          </aside>
        </div>
      </main>

      <BottomNav role={data.role} active="home" onNavigate={onNavigate} />
    </div>
  );
}
