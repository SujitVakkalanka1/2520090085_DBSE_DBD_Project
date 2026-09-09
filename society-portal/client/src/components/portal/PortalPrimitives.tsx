/* Editorial Utility / Night Courtyard: reusable tactile primitives, Courtyard Lime accents, Space Grotesk + DM Sans. */
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Building,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
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

export type PortalIconName =
  | "wallet"
  | "headset"
  | "calendar"
  | "key"
  | "megaphone"
  | "users"
  | "clipboard"
  | "receipt"
  | "grid"
  | "activity"
  | "message"
  | "profile"
  | "bell"
  | "search"
  | "close"
  | "arrow"
  | "arrow-left"
  | "violation"
  | "file"
  | "home"
  | "settings"
  | "check"
  | "check-circle"
  | "plus"
  | "send"
  | "clock"
  | "download"
  | "share"
  | "trash"
  | "edit"
  | "phone"
  | "mail"
  | "qr"
  | "filter"
  | "sparkles"
  | "credit-card"
  | "building"
  | "car"
  | "info"
  | "lock"
  | "refresh"
  | "copy"
  | "external";

const iconMap = {
  wallet: WalletCards,
  headset: Headphones,
  calendar: CalendarDays,
  key: KeyRound,
  megaphone: Megaphone,
  users: UsersRound,
  clipboard: ClipboardList,
  receipt: Receipt,
  grid: LayoutGrid,
  activity: ShieldAlert,
  message: MessageCircle,
  profile: UserRound,
  bell: Bell,
  search: Search,
  close: X,
  arrow: ArrowUpRight,
  "arrow-left": ArrowLeft,
  violation: ShieldAlert,
  file: FileText,
  home: LayoutGrid,
  settings: Settings2,
  check: Check,
  "check-circle": CheckCircle2,
  plus: Plus,
  send: Send,
  clock: Clock,
  download: Download,
  share: Share2,
  trash: Trash2,
  edit: Edit3,
  phone: Phone,
  mail: Mail,
  qr: QrCode,
  filter: Filter,
  sparkles: Sparkles,
  "credit-card": CreditCard,
  building: Building,
  car: Car,
  info: Info,
  lock: Lock,
  refresh: RefreshCw,
  copy: Copy,
  external: ExternalLink,
};

export function PortalIcon({
  name,
  size = 18,
  strokeWidth = 1.8,
  className = "",
}: {
  name: PortalIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = iconMap[name] || LayoutGrid;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

export function LogoMark({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-[14px] transition-transform duration-200 group-hover:scale-105 ${
        dark ? "bg-ink shadow-sm" : "bg-courtyard shadow-lg shadow-courtyard/20"
      }`}
      style={{ width: size, height: size }}
      aria-label="Courtyard logo"
    >
      <span className="relative block" style={{ width: size * 0.5, height: size * 0.5 }}>
        <span className={`absolute left-0 top-0 h-[42%] w-[42%] rounded-[3.5px] ${dark ? "bg-courtyard" : "bg-ink"}`} />
        <span className={`absolute right-0 top-0 h-[42%] w-[42%] rounded-[3.5px] ${dark ? "bg-courtyard" : "bg-ink"}`} />
        <span className={`absolute bottom-0 left-0 h-[42%] w-[42%] rounded-[3.5px] ${dark ? "bg-courtyard" : "bg-ink"}`} />
        <span className={`absolute bottom-0 right-0 h-[42%] w-[42%] rounded-[3.5px] ${dark ? "bg-courtyard" : "bg-ink"}`} />
      </span>
    </span>
  );
}

export function Avatar({ initials, size = "md", className = "" }: { initials: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "h-9 w-9 text-[11px]", md: "h-11 w-11 text-xs", lg: "h-16 w-16 text-base" };
  return (
    <span
      className={`inline-grid place-items-center rounded-full border border-ink/10 bg-[#e7e3dc] font-display font-bold tracking-tight text-ink shadow-inner ${sizes[size]} ${className}`}
    >
      {initials}
    </span>
  );
}

export function IconButton({
  label,
  name,
  onClick,
  dark = false,
  className = "",
}: {
  label: string;
  name: PortalIconName;
  onClick: () => void;
  dark?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-200 active:scale-95 ${
        dark
          ? "border border-white/10 bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.12]"
          : "border border-ink/10 bg-ink/[0.04] text-ink hover:border-ink/20 hover:bg-ink/[0.08]"
      } ${className}`}
    >
      <PortalIcon name={name} size={17} />
    </button>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "lime",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "lime" | "ghost" | "dark" | "danger" | "subtle";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const variants = {
    lime: "bg-courtyard text-ink hover:-translate-y-0.5 hover:bg-[#d8ff42] shadow-lg shadow-courtyard/15",
    ghost: "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.1]",
    dark: "bg-ink text-white hover:-translate-y-0.5 hover:bg-[#222222] border border-white/10",
    danger: "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25",
    subtle: "bg-white/[0.08] text-white/90 hover:bg-white/[0.14] border border-white/10",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.1em] transition duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({
  children,
  dark = true,
  tone = "courtyard",
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  tone?: "courtyard" | "amber" | "blue" | "neutral" | "emerald";
  className?: string;
}) {
  const dotColors = {
    courtyard: "bg-courtyard",
    amber: "bg-amber-400",
    blue: "bg-sky-400",
    emerald: "bg-emerald-400",
    neutral: dark ? "bg-white/40" : "bg-ink/40",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] ${
        dark ? "bg-white/10 text-white/75 border border-white/10" : "bg-ink/[0.06] text-ink/70 border border-ink/10"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColors[tone]}`} />
      {children}
    </span>
  );
}

export function Modal({
  title,
  body,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  closeLabel = "Close",
  maxWidth = "max-w-md",
}: {
  title: string;
  body?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  closeLabel?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-[28px] border border-white/15 bg-[#181818] p-6 sm:p-7 text-white shadow-2xl shadow-black/60 animate-modal-in`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-courtyard">
              Courtyard Portal
            </p>
            <h2 id="portal-modal-title" className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
              {title}
            </h2>
          </div>
          <IconButton label="Close modal" name="close" dark onClick={onClose} />
        </div>

        {body ? <p className="font-body text-sm leading-relaxed text-white/70">{body}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionButton onClick={onClose} variant="ghost" className="flex-1">
            {closeLabel}
          </ActionButton>
          {onConfirm ? (
            <ActionButton onClick={onConfirm} variant="lime" className="flex-1">
              <Check size={15} /> {confirmLabel}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}
