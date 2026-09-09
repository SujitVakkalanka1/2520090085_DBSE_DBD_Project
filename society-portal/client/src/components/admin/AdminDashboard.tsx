import React, { useState } from 'react';
import {
  Search,
  Bell,
  Megaphone,
  Users,
  ClipboardList,
  Receipt,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LogOut,
  SlidersHorizontal,
  Building,
  DollarSign,
  Download,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { BottomNavDock, AdminTab } from '../navigation/BottomNavDock';
import {
  adminProfile,
  adminHighlights,
  adminAnnouncements,
  adminQuickActions,
  initialTickets,
} from '../../data/mockData';
import { ComplaintTicket, AnnouncementItem } from '../../types/portal';
import { BroadcastModal } from '../modals/BroadcastModal';
import { NoticeDetailModal } from '../modals/NoticeDetailModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<AnnouncementItem | null>(null);

  // Tickets management state
  const [tickets, setTickets] = useState<ComplaintTicket[]>(initialTickets);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(adminAnnouncements);

  const handleStatusChange = (ticketId: string, newStatus: ComplaintTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const handleBroadcastAdded = (newNotice: AnnouncementItem) => {
    setAnnouncements((prev) => [newNotice, ...prev]);
  };

  const residentDirectory = [
    { unit: 'A-101', name: 'Dr. Vikram Mehra', phone: '+91 98201 11223', status: 'Dues Cleared' },
    { unit: 'A-204', name: 'Pooja Agarwal', phone: '+91 98202 22334', status: 'Dues Cleared' },
    { unit: 'B-704', name: 'Sujit Kumar', phone: '+91 98765 43210', status: 'Dues Cleared' },
    { unit: 'B-705', name: 'Amitabh Sen', phone: '+91 98203 33445', status: 'Due (₹4,850)' },
    { unit: 'C-302', name: 'Kavita Nair', phone: '+91 98204 44556', status: 'Dues Cleared' },
    { unit: 'C-901', name: 'Rohit Deshmukh', phone: '+91 98205 55667', status: 'Due (₹9,700)' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white pb-32 selection:bg-[#CCFF00] selection:text-black">
      {/* TOP ADMIN HEADER */}
      <header className="w-full bg-[#fbfbfb] text-zinc-900 border-b border-zinc-200/80 px-4 sm:px-8 py-5 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Admin Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#18191f] text-[#CCFF00] flex items-center justify-center font-display font-black text-sm shadow-md">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-zinc-900 text-[#CCFF00] px-2 py-0.5 rounded-full">
                  Admin Console
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {adminProfile.residency}
                </span>
              </div>
              <h1 className="font-display text-xl font-bold text-zinc-950 leading-tight">
                Society Operations Desk
              </h1>
              <span className="text-xs text-zinc-600">{adminProfile.unit}</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBroadcastModalOpen(true)}
              className="py-2 px-3.5 rounded-full bg-[#CCFF00] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-[#bceb00] transition-colors"
            >
              <Megaphone size={14} />
              <span>Broadcast Notice</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="py-2 px-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN ADMIN CANVAS */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        {/* ==================== TAB: OVERVIEW ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stat 1: Total Dues Collected */}
              <div
                onClick={() => setActiveTab('finances')}
                className="p-6 sm:p-7 rounded-3xl bg-[#CCFF00] text-black cursor-pointer hover:-translate-y-1 transition-all shadow-lg shadow-[#CCFF00]/20 flex flex-col justify-between min-h-[160px] group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest text-black/80 font-mono">
                    TOTAL DUES RECONCILED
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={18} strokeWidth={2.4} />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                    ₹9.42L
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-bold text-black/70">82% collection efficiency</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-black text-[#CCFF00]">
                      Active Cycle
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Pending Violations */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#16171d] border border-white/10 text-white flex flex-col justify-between min-h-[160px]">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 font-mono">
                    PENDING VIOLATIONS
                  </span>
                  <div className="p-2 rounded-full bg-white/5 text-amber-400">
                    <AlertTriangle size={18} />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    07
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-400">
                    <span>3 parking flags · 2 noise notices · 2 renovation queries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-zinc-200">
                  Management Tools
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {adminQuickActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => {
                      if (action.actionKey === 'broadcast') setIsBroadcastModalOpen(true);
                      if (action.actionKey === 'manage-residents') setActiveTab('settings');
                      if (action.actionKey === 'tickets') setActiveTab('tickets');
                      if (action.actionKey === 'finances') setActiveTab('finances');
                    }}
                    className="p-5 rounded-2xl bg-[#16171d] border border-white/10 hover:border-[#CCFF00]/50 hover:bg-[#1a1b22] text-left transition-all duration-200 group flex flex-col justify-between min-h-[130px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] text-[#CCFF00] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {action.icon === 'megaphone' && <Megaphone size={20} />}
                      {action.icon === 'users' && <Users size={20} />}
                      {action.icon === 'clipboard' && <ClipboardList size={20} />}
                      {action.icon === 'receipt' && <Receipt size={20} />}
                    </div>

                    <div className="mt-3">
                      <span className="font-display text-sm font-bold text-white block group-hover:text-[#CCFF00] transition-colors">
                        {action.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5 line-clamp-1">
                        {action.detail}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Broadcast Banner */}
            {announcements.length > 0 && (
              <div
                onClick={() => setSelectedNotice(announcements[0])}
                className="p-5 sm:p-6 rounded-3xl bg-[#16171d] border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#CCFF00] font-mono">
                    {announcements[0].eyebrow}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {announcements[0].timestamp}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-1">
                  {announcements[0].title}
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  {announcements[0].body}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB: TICKETS ==================== */}
        {activeTab === 'tickets' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">Society Maintenance Log</h2>
                <p className="text-xs text-zinc-400">Manage and resolve complaints submitted by residents</p>
              </div>
            </div>

            <div className="space-y-3">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-[#16171d] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#CCFF00] font-bold">{t.id}</span>
                      <span className="text-zinc-400 text-xs font-semibold">· {t.unit}</span>
                      <span className="text-zinc-500 text-xs">· {t.submittedBy}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-white">{t.title}</h4>
                    <p className="text-xs text-zinc-400">{t.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChange(t.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase bg-[#0d0e11] border focus:outline-none ${
                        t.status === 'Resolved'
                          ? 'border-emerald-500 text-emerald-400'
                          : t.status === 'In Progress'
                          ? 'border-sky-500 text-sky-400'
                          : 'border-amber-500 text-amber-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: FINANCES ==================== */}
        {activeTab === 'finances' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">Dues & Ledger Reconciliation</h2>
                <p className="text-xs text-zinc-400">Track collections across 248 units for September 2026</p>
              </div>
              <button
                type="button"
                onClick={() => alert('Exporting full society ledger to CSV...')}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white"
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-[#16171d] border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px]">
                    <th className="pb-3">Unit</th>
                    <th className="pb-3">Resident</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Dues Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {residentDirectory.map((r) => (
                    <tr key={r.unit} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-white">{r.unit}</td>
                      <td className="py-3.5 text-zinc-300">{r.name}</td>
                      <td className="py-3.5 font-mono text-zinc-400">{r.phone}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            r.status === 'Dues Cleared'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Sending payment reminder SMS to ${r.name} (${r.unit})`)}
                          className="text-[11px] text-[#CCFF00] hover:underline font-bold"
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB: BROADCASTS ==================== */}
        {activeTab === 'broadcasts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">Broadcast Dispatch Center</h2>
                <p className="text-xs text-zinc-400">Publish notices to resident dashboards and gate screens</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-[#CCFF00] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#CCFF00]/20"
              >
                <Plus size={16} />
                <span>New Broadcast</span>
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setSelectedNotice(ann)}
                  className="p-5 rounded-2xl bg-[#16171d] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold font-mono uppercase px-2 py-0.5 rounded bg-[#CCFF00]/20 text-[#CCFF00]">
                      {ann.eyebrow}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{ann.timestamp}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-1.5">{ann.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">{ann.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: MANAGEMENT / SETTINGS ==================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold">Resident Unit Registry</h2>
              <p className="text-xs text-zinc-400">Manage owner and tenant records across Towers A, B, and C</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#16171d] border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-zinc-400 block mb-1">Tower A</span>
                  <span className="font-display text-2xl font-bold text-white">84 Units</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">100% Occupancy</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-zinc-400 block mb-1">Tower B</span>
                  <span className="font-display text-2xl font-bold text-white">84 Units</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">98% Occupancy</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-zinc-400 block mb-1">Tower C</span>
                  <span className="font-display text-2xl font-bold text-white">80 Units</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">95% Occupancy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING BOTTOM NAVIGATION DOCK */}
      <BottomNavDock
        role="admin"
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as AdminTab)}
      />

      {/* MODALS */}
      <BroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        onBroadcast={handleBroadcastAdded}
      />

      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
};
