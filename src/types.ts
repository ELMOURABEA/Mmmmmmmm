export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type TabType = 
  | 'overview' 
  | 'corp' 
  | 'ecommerce' 
  | 'branch_ops' 
  | 'omnichannel';

export type UserRole = 
  | 'super_admin'       // Executive Board & General Leadership (مجلس الإدارة والإدارة العامة)
  | 'branch_manager'     // admin6 (Pharmasyst ERP, inventory, staff, POS)
  | 'clinical_pharmacist'// Rx verification, patient consultation, dispensing
  | 'inventory_manager'  // Stock audits, PO creation, low stock management
  | 'operations_director'; // Multi-branch audit, cold chain oversight, delivery SLA

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  price: number;
  originalPrice?: number;
  stock: number;
  lowStockThreshold: number;
  dosageForm: string;
  manufacturer: string;
  prescriptionRequired: boolean;
  image: string;
  expiryDate: string;
  batchNumber: string;
  branchStock: {
    [branchId: string]: number;
  };
}

export interface Branch {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  phone: string;
  secondaryPhones?: string[];
  landmark?: string;
  landmarkAr?: string;
  googleMapUrl?: string;
  hours: string;
  hoursAr: string;
  lat: number;
  lng: number;
  manager: string;
  is24Hours: boolean;
  status: 'active' | 'renovating' | 'planned';
  staffCount: number;
  monthlyVolume: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerNameAr: string;
  avatarUrl?: string;
  branchId: string;
  branchName: string;
  branchNameAr: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  commentAr: string;
  category: 'delivery' | 'service' | 'cold_chain' | 'cosmetics' | 'prescription';
  verifiedPatient: boolean;
  helpfulCount: number;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  verifiedWithGmail: boolean;
  googleId?: string;
  joinedDate: string;
  loyaltyPoints: number;
  savedAddresses: Array<{
    id: string;
    label: string;
    address: string;
    city: string;
    isDefault: boolean;
  }>;
}

export interface PrescriptionOrder {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  imageUrl: string;
  status: 'pending_review' | 'verified' | 'dispensed' | 'rejected';
  branchId: string;
  doctorName?: string;
  extractedDrugs: Array<{
    name: string;
    dosage: string;
    frequency: string;
    matchedProduct?: Product;
    availableInBranch: boolean;
  }>;
  pharmacistNotes?: string;
  totalAmount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedBranchId?: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'low_stock' | 'rx_alert' | 'sync_event' | 'audit_alert' | 'tender_update';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  severity?: 'critical' | 'warning' | 'info' | 'success';
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'bot' | 'agent';
  agentName?: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'tiktok' | 'web' | 'phone';
  text: string;
  timestamp: string;
  hasAttachment?: boolean;
  attachmentType?: 'prescription' | 'image' | 'audio';
  attachmentUrl?: string;
  isInternalNote?: boolean;
}

export interface CustomerConversation {
  id: string;
  customerName: string;
  customerPhone: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'tiktok' | 'web';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'open' | 'pending' | 'resolved';
  assignedAgent?: string;
  activeTypingAgent?: string; // Collision detection alert
  tags: string[];
  messages: ChatMessage[];
  internalNotes: string[];
}

