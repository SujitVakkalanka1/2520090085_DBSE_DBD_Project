/* Editorial Utility / Night Courtyard: role selection and password authentication landing surface. */
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { UserRole } from "../lib/mockApi";
import { ActionButton, Avatar, LogoMark, Modal, PortalIcon, StatusBadge } from "../components/portal/PortalPrimitives";

export function LoginLanding({ onLogin }: { onLogin: (role: UserRole) => Promise<void> }) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("resident");
  const [identifier, setIdentifier] = useState("Tower B · Flat 704");
  const [password, setPassword] = useState("resident704");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modal, setModal] = useState<{
    title: string;
    body?: string;
    type?: "about" | "how-it-works" | "privacy" | "tag" | "forgot-password";
    data?: any;
  } | null>(null);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === "resident") {
      setIdentifier("Tower B · Flat 704");
      setPassword("resident704");
    } else {
      setIdentifier("admin@courtyard.org");
      setPassword("admin2026");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Please enter your access password or passcode.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await onLogin(selectedRole);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    handleRoleChange(role);
    setIsSubmitting(true);
    try {
      await onLogin(role);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-ink text-white">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        {/* Left Editorial Section (Paper / White) - Full Bleed to Left Edge */}
        <section className="relative flex min-h-full flex-col justify-between overflow-hidden bg-white px-6 py-8 text-ink sm:px-10 sm:py-12 lg:px-12 xl:px-20 lg:py-12">
          <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-courtyard/40 blur-3xl" />
          
          <div className="mx-auto flex h-full w-full max-w-xl flex-col justify-between lg:mr-0 lg:max-w-lg xl:max-w-xl">
            {/* Brand Header */}
            <div className="relative flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setModal({
                    title: "About Courtyard",
                    body: "Courtyard is an editorial-grade residential operations platform for modern residential communities. Built for Maple Heights with instant role isolation, quiet UX, and full offline-first mock architecture.",
                    type: "about",
                  })
                }
                className="group flex items-center gap-3 text-left transition"
              >
                <LogoMark size={42} />
                <div>
                  <span className="block font-display text-[12px] font-bold uppercase tracking-[0.2em] text-ink">
                    Courtyard
                  </span>
                  <span className="block font-body text-[10px] text-ink/40">Society Living System</span>
                </div>
              </button>
              <span className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">
                Maple Heights · 2026
              </span>
            </div>

            {/* Hero Content */}
            <div className="relative my-auto py-10 lg:py-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-courtyard" />
                Society operations, made lighter
              </div>

              <h1 className="font-display text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.07em] text-ink">
                Home has a{" "}
                <span className="relative inline-block text-ink">
                  rhythm
                  <span className="absolute -bottom-1 left-0 h-3 w-full -rotate-1 rounded-sm bg-courtyard/90 -z-10" />
                </span>
                .
              </h1>

              <p className="mt-6 max-w-[34ch] font-body text-base leading-relaxed text-ink/65 sm:text-lg">
                One clear place for the dues, requests, visitors, and decisions that keep your building moving.
              </p>

              {/* Quick Feature Badges (Interactive) */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {[
                  { label: "Direct Payments", icon: "wallet", desc: "Pay dues with zero friction, instant reconciliation, and digital receipts." },
                  { label: "Helpdesk & Requests", icon: "headset", desc: "Track lift repairs, electrical complaints, and maintenance tickets in real-time." },
                  { label: "Visitor Gate-Pass", icon: "key", desc: "Generate 6-digit PIN and QR codes for seamless guest and delivery arrival." },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() =>
                      setModal({
                        title: chip.label,
                        body: chip.desc,
                        type: "tag",
                      })
                    }
                    className="group inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-ink/70 shadow-sm transition hover:border-ink/30 hover:bg-ink/[0.04] hover:text-ink active:scale-95"
                  >
                    <PortalIcon name={chip.icon as any} size={13} className="text-ink/60 group-hover:text-ink" />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Bar */}
            <div className="relative flex items-center justify-between border-t border-ink/10 pt-5">
              <span className="font-body text-xs text-ink/50">Quiet tools for everyday living.</span>
              <button
                type="button"
                onClick={() =>
                  setModal({
                    title: "How Courtyard Works",
                    type: "how-it-works",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-ink/5 hover:gap-3"
              >
                How it works <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Right Gateway Section (Obsidian / Night) - Full Bleed to Right Edge */}
        <section className="relative isolate flex min-h-full flex-col justify-between overflow-hidden bg-[#141414] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-20 lg:py-12">
          {/* Subtle Ambient Graphic */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(204,255,0,0.09),transparent_65%)]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />

          <div className="mx-auto flex h-full w-full max-w-xl flex-col justify-between lg:ml-0 lg:max-w-lg xl:max-w-xl">

          {/* Top Privacy Header */}
          <div className="relative mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-courtyard">
                Secure Portal Gateway
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Sign in to your space
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setModal({
                  title: "Role Isolation & Privacy",
                  body: "Resident and Admin workspaces operate on strictly isolated scopes. Residents only see their unit's dues, violations, and personal tickets. Admins get aggregated health metrics, reconciliation logs, and society-wide broadcast tools.",
                  type: "privacy",
                })
              }
              aria-label="Learn about role privacy"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-courtyard transition hover:scale-105 hover:border-courtyard hover:bg-courtyard hover:text-ink active:scale-95"
            >
              <ShieldCheck size={18} />
            </button>
          </div>

          {/* Login Credentials & Password Form Card */}
          <div className="my-auto py-2">
            <div className="rounded-[28px] border border-white/10 bg-[#1c1c1c]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-7">
              {/* Role Toggle Selector */}
              <div className="mb-6 flex rounded-full border border-white/10 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => handleRoleChange("resident")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                    selectedRole === "resident"
                      ? "bg-courtyard text-ink shadow-md shadow-courtyard/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <UserRound size={14} />
                  <span>Resident Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("admin")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                    selectedRole === "admin"
                      ? "bg-courtyard text-ink shadow-md shadow-courtyard/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Building size={14} />
                  <span>Admin Console</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Identifier field */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                    <span>{selectedRole === "resident" ? "Flat / Unit ID" : "Administrator ID / Email"}</span>
                    <span className="font-body text-[10px] lowercase text-white/40">
                      {selectedRole === "resident" ? "e.g. Tower B · Flat 704" : "e.g. admin@courtyard.org"}
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-3.5 text-white/40">
                      {selectedRole === "resident" ? <Building size={16} /> : <Mail size={16} />}
                    </span>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={selectedRole === "resident" ? "Tower B · Flat 704" : "admin@courtyard.org"}
                      className="w-full rounded-[16px] border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 font-body text-sm text-white placeholder:text-white/30 transition focus:border-courtyard focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-courtyard"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                      Password / Security Key
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setModal({
                          title: "Forgot Credentials?",
                          body: "For Maple Heights security compliance, resident passcodes can be retrieved via registered WhatsApp phone or generated at the central clubhouse estate desk.",
                          type: "forgot-password",
                        })
                      }
                      className="font-display text-[10px] font-bold uppercase tracking-[0.1em] text-courtyard transition hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-3.5 text-white/40">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Enter access password…"
                      className="w-full rounded-[16px] border border-white/10 bg-white/[0.04] py-3 pl-10 pr-11 font-body text-sm text-white placeholder:text-white/30 transition focus:border-courtyard focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-courtyard"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 text-white/40 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error message if any */}
                {errorMessage ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">
                    {errorMessage}
                  </div>
                ) : null}

                {/* Quick Auto-fill Presets */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-white/60">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/10 text-courtyard accent-courtyard focus:ring-courtyard"
                    />
                    <span>Remember terminal</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                      Demo preset:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedRole === "resident") {
                          setPassword("resident704");
                        } else {
                          setPassword("admin2026");
                        }
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-display text-[9px] font-bold text-courtyard transition hover:bg-white/10"
                    >
                      {selectedRole === "resident" ? "resident704" : "admin2026"}
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-[18px] bg-courtyard py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-lg shadow-courtyard/25 transition duration-200 hover:bg-[#d8ff42] hover:shadow-xl hover:shadow-courtyard/35 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                      <span>Authenticating…</span>
                    </>
                  ) : (
                    <>
                      <span>Enter {selectedRole === "resident" ? "Resident Portal" : "Admin Console"}</span>
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Banner */}
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-4 text-center font-body text-[11px] text-white/40">
                <ShieldCheck size={13} className="text-courtyard" />
                <span>256-bit Mock Encrypted · Role Isolated Sessions</span>
              </div>
            </div>
          </div>

          {/* Bottom 1-Click Fast Pass Section */}
          <div className="relative mt-2">
            <p className="mb-2.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              Instant One-Tap Demo Access
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void handleQuickLogin("resident")}
                disabled={isSubmitting}
                className="group flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] p-3.5 text-left transition hover:border-courtyard/50 hover:bg-white/[0.08] active:scale-95 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-courtyard group-hover:bg-courtyard group-hover:text-ink transition">
                    <UserRound size={17} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold text-white">Flat 704 Resident</p>
                    <p className="text-[10px] text-white/45">Instant Demo Login</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-white/40 group-hover:text-courtyard transition" />
              </button>

              <button
                type="button"
                onClick={() => void handleQuickLogin("admin")}
                disabled={isSubmitting}
                className="group flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] p-3.5 text-left transition hover:border-courtyard/50 hover:bg-white/[0.08] active:scale-95 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-courtyard text-ink group-hover:scale-105 transition">
                    <Building size={17} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold text-white">Admin Management</p>
                    <p className="text-[10px] text-white/45">Instant Demo Login</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-white/40 group-hover:text-courtyard transition" />
              </button>
            </div>
          </div>
          </div>
        </section>
      </div>

      {/* Interactive Modal */}
      {modal ? (
        <Modal
          title={modal.title}
          body={modal.body}
          onClose={() => setModal(null)}
          confirmLabel={modal.type === "how-it-works" ? "Try Resident Demo" : "Got it"}
          onConfirm={() => {
            if (modal.type === "how-it-works") {
              setModal(null);
              void handleQuickLogin("resident");
            } else {
              setModal(null);
            }
          }}
        >
          {modal.type === "how-it-works" ? (
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-courtyard text-ink font-bold text-xs">
                  1
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Direct Dues & Instant Receipts</h4>
                  <p className="mt-0.5 text-xs text-white/60">
                    Settle maintenance via UPI or Card and get instant automated receipts.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-courtyard text-ink font-bold text-xs">
                  2
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Full Operations Transparency</h4>
                  <p className="mt-0.5 text-xs text-white/60">
                    Raise repairs, follow status updates, and book building facilities with zero phone calls.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-courtyard text-ink font-bold text-xs">
                  3
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Secure Visitor Gate Passes</h4>
                  <p className="mt-0.5 text-xs text-white/60">
                    Generate instant 6-digit access codes and share arrival QR passes directly via WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
}
