export type UserRole = 'resident' | 'admin';

export interface UserProfile {
  role: UserRole;
  name: string;
  initials: string;
  residency: string;
  unit: string;
  email: string;
  phone: string;
}

export interface HighlightItem {
  id: string;
  label: string;
  value: string;
  meta: string;
  tone: 'lime' | 'dark' | 'alert';
  actionType?: 'pay' | 'violations' | 'tickets' | 'finances';
}

export interface AnnouncementItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  timestamp: string;
  cta: string;
  priority?: 'normal' | 'urgent';
  date?: string;
  author?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  detail: string;
  icon: string;
  actionKey: string;
}

export interface ComplaintTicket {
  id: string;
  title: string;
  category: 'Plumbing' | 'Electrical' | 'Parking' | 'Lift / Common Area' | 'Security' | 'Other';
  status: 'Pending' | 'In Progress' | 'Resolved';
  unit: string;
  submittedBy: string;
  date: string;
  urgency: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface GatePass {
  id: string;
  visitorName: string;
  visitorPhone: string;
  purpose: 'Guest' | 'Delivery' | 'Cab' | 'Service Provider';
  unit: string;
  validDate: string;
  validTime: string;
  passCode: string;
  status: 'Active' | 'Used' | 'Expired';
}

export interface AmenityBooking {
  id: string;
  amenityName: 'Clubhouse Banquet' | 'Tennis Court' | 'Swimming Pool' | 'BBQ Gazebo' | 'Conference Room';
  date: string;
  timeSlot: string;
  unit: string;
  bookedBy: string;
  status: 'Confirmed' | 'Pending';
  amount: string;
}

export interface PaymentRecord {
  id: string;
  billMonth: string;
  amount: string;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  breakdown: {
    maintenance: string;
    sinkingFund: string;
    waterCharges: string;
    parkingCharges: string;
  };
}
