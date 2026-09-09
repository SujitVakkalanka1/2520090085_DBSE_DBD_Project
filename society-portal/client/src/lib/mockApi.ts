/* Editorial Utility / Night Courtyard: role-isolated mock contracts with Courtyard Lime actions. */

export type UserRole = "resident" | "admin";

export type Highlight = {
  label: string;
  value: string;
  meta: string;
  tone: "lime" | "ink";
};

export type Announcement = {
  eyebrow: string;
  title: string;
  body: string;
  timestamp: string;
  cta: string;
};

export type QuickAction = {
  label: string;
  detail: string;
  icon: string;
};

export type DashboardPayload = {
  role: UserRole;
  name: string;
  initials: string;
  residency: string;
  unit: string;
  highlights: Highlight[];
  categories: string[];
  activeCategory: string;
  announcement: Announcement;
  quickActions: QuickAction[];
  sidePanel: {
    eyebrow: string;
    title: string;
    detail: string;
    image: string;
  };
};

export type Session = {
  role: UserRole;
  name: string;
  token: string;
};

const residentDashboard: DashboardPayload = {
  role: "resident",
  name: "Sujit",
  initials: "SK",
  residency: "Maple Heights Society",
  unit: "Tower B · Flat 704",
  highlights: [
    { label: "Monthly dues", value: "₹4,850", meta: "Due 10 Sep", tone: "lime" },
    { label: "Open violation", value: "01", meta: "Parking bay B-21", tone: "lime" },
  ],
  categories: ["Helpdesk", "Facilities", "Polls", "Visitor gate-pass"],
  activeCategory: "Helpdesk",
  announcement: {
    eyebrow: "Notice · Residents",
    title: "Water tank cleaning this Saturday",
    body: "The overhead tanks will be serviced from 10:00 AM. Please plan water usage accordingly.",
    timestamp: "12 min ago",
    cta: "Read more",
  },
  quickActions: [
    { label: "Pay maintenance", detail: "Due this month", icon: "wallet" },
    { label: "Raise a complaint", detail: "Need a hand?", icon: "headset" },
    { label: "Book an amenity", detail: "Reserve a space", icon: "calendar" },
    { label: "Create gate pass", detail: "Share access", icon: "key" },
  ],
  sidePanel: {
    eyebrow: "Your building",
    title: "One tap closer to a quieter evening.",
    detail: "Everything from dues to visitor access, in one calm view.",
    image: "/manus-storage/courtyard-lobby_54feed1b.jpg",
  },
};

const adminDashboard: DashboardPayload = {
  role: "admin",
  name: "Sujit",
  initials: "SK",
  residency: "Maple Heights Society",
  unit: "Admin console · 248 homes",
  highlights: [
    { label: "Total collected dues", value: "₹9.42L", meta: "82% this cycle", tone: "lime" },
    { label: "Pending violations", value: "07", meta: "3 need review", tone: "lime" },
  ],
  categories: ["Helpdesk", "Facilities", "Polls", "Payments"],
  activeCategory: "Helpdesk",
  announcement: {
    eyebrow: "Broadcast · Admin",
    title: "Quarterly maintenance review is ready",
    body: "Your summary has been compiled. Broadcast the next update or open the full operations log.",
    timestamp: "Updated 28 min ago",
    cta: "Open review",
  },
  quickActions: [
    { label: "Broadcast announcement", detail: "Reach every home", icon: "megaphone" },
    { label: "Manage users", detail: "248 active residents", icon: "users" },
    { label: "View maintenance logs", detail: "12 open requests", icon: "clipboard" },
    { label: "Review payments", detail: "19 pending receipts", icon: "receipt" },
  ],
  sidePanel: {
    eyebrow: "Operations pulse",
    title: "The building, at a glance.",
    detail: "Keep the next action visible, without losing the human context.",
    image: "/manus-storage/courtyard-night_29ed9577.jpg",
  },
};

const wait = (milliseconds = 240) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function login(role: UserRole): Promise<Session> {
  // Mirrors POST /api/auth/login in the FastAPI contract.
  await wait(320);
  return { role, name: role === "admin" ? "Sujit" : "Sujit", token: `mock-${role}-session` };
}

export async function fetchDashboard(role: UserRole): Promise<DashboardPayload> {
  // Mirrors GET /api/dashboard/{role} in the FastAPI contract.
  await wait(220);
  return structuredClone(role === "admin" ? adminDashboard : residentDashboard);
}

export async function performAction(role: UserRole, action: string): Promise<{ message: string }> {
  // Mirrors POST /api/actions in the FastAPI contract.
  await wait(180);
  const prefix = role === "admin" ? "Admin action" : "Resident action";
  return { message: `${prefix}: ${action}` };
}
