import React, { useState } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  ShoppingCart, 
  UserCheck, 
  PhoneCall, 
  ChevronDown, 
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  Layers,
  Building2,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { Logo } from './Logo';
import { Language, ThemeMode, TabType, UserRole, SystemNotification, CartItem, CustomerAccount } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  lang: Language;
  onToggleLang: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  notifications: SystemNotification[];
  onMarkNotificationRead: (id: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenLowStockEmail: () => void;
  onOpenPharmasystModal: () => void;
  onOpenInstaPayModal?: () => void;
  customerAccount?: CustomerAccount | null;
  onOpenCustomerAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  userRole,
  onSelectRole,
  notifications,
  onMarkNotificationRead,
  cartItems,
  onOpenCart,
  onOpenLowStockEmail,
  onOpenPharmasystModal,
  onOpenInstaPayModal,
  customerAccount,
  onOpenCustomerAuth
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';
  const unreadNotifs = notifications.filter(n => !n.read);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const tabs: Array<{ id: TabType; labelEn: string; labelAr: string; badge?: string; badgeColor?: string }> = [
    { id: 'overview', labelEn: 'Executive Matrix', labelAr: 'المنظومة المركزية' },
    { id: 'corp', labelEn: 'Landing Page', labelAr: 'صيدليات البنداري (الرئيسية)' },
    { id: 'ecommerce', labelEn: 'E-Commerce & Rx', labelAr: 'المتجر والروشتة' },
    { id: 'branch_ops', labelEn: 'Branch Ops (ERP)', labelAr: 'إدارة الفروع (ERP)', badge: 'ERP', badgeColor: 'bg-blue-600' },
    { id: 'omnichannel', labelEn: 'Customer Care (SOLA)', labelAr: 'خدمة العملاء (SOLA)', badge: '01200400094', badgeColor: 'bg-emerald-600' },
  ];

  const roleLabels: Record<UserRole, { en: string; ar: string; descEn: string; descAr: string }> = {
    super_admin: {
      en: 'Executive Board & Leadership',
      ar: 'مجلس الإدارة والإدارة العامة',
      descEn: 'Full executive control & pharmacy governance',
      descAr: 'إشراف استراتيجي وصلاحيات كاملة على المنظومة'
    },
    branch_manager: {
      en: 'admin6 (Branch Manager)',
      ar: 'admin6 (مدير الفرع - فارماسيست)',
      descEn: 'Pharmasyst ERP & branch dispensing',
      descAr: 'إدارة نقاط البيع وعمليات الفروع'
    },
    clinical_pharmacist: {
      en: 'Clinical Pharmacist',
      ar: 'صيدلي إكلينيكي مناوب',
      descEn: 'Prescription review & patient care',
      descAr: 'مراجعة واعتماد الروشتات والاستشارات'
    },
    inventory_manager: {
      en: 'Inventory Auditor',
      ar: 'مسؤول المخازن والجرد',
      descEn: 'Stock replenishment & Excel imports',
      descAr: 'متابعة النواقص، التوريد، واستيراد الإكسيل'
    },
    operations_director: {
      en: 'Operations & Cold Chain Director',
      ar: 'مدير العمليات وسلاسل التبريد',
      descEn: 'Delivery SLA, 2-8°C cold chain & multi-branch audit',
      descAr: 'متابعة التوصيل وثلاجات الحقن المجهري والبيولوجيكس'
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Top Hotline & System Status Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold">
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            <span>{isAr ? 'الخط الساخن والواتساب الموحد:' : 'Unified Hotline & WhatsApp:'}</span>
            <a href="tel:01200400094" className="text-white hover:text-red-300 underline font-mono font-bold">
              01200400094
            </a>
          </div>
          <span className="hidden md:inline text-slate-400">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Building2 className="w-3 h-3 text-emerald-400" />
            <span>{isAr ? 'صيدليات البنداري • شبكة متكاملة بالدلتا والقاهرة • خدمة دوائية ٢٤ ساعة' : 'El-Bendary Pharmacies • Comprehensive Delta & Cairo Network • 24/7 Care'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onOpenInstaPayModal && (
            <button
              onClick={onOpenInstaPayModal}
              className="text-[10px] px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold transition flex items-center gap-1"
            >
              <span>{isAr ? '💳 إنستاباي' : '💳 InstaPay'}</span>
            </button>
          )}
          <button
            onClick={onOpenPharmasystModal}
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono">Pharmasyst: admin6 (Connected)</span>
          </button>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="text-[10px] text-amber-300 font-bold">
            {isAr ? 'منظومة البنداري' : 'BPH Platform'}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onSelectTab('overview')}>
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`relative px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                    active
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-extrabold text-white rounded-full ${active ? 'bg-black/30' : tab.badgeColor || 'bg-red-500'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition border border-slate-200 dark:border-slate-700"
              >
                <Shield className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span className="hidden sm:inline max-w-[130px] truncate text-[11px]">
                  {isAr ? roleLabels[userRole].ar : roleLabels[userRole].en}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    {isAr ? 'التحكم بالصلاحيات والأدوار (RBAC)' : 'Role-Based Access Control'}
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        onSelectRole(role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition flex flex-col ${
                        userRole === role
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{isAr ? roleLabels[role].ar : roleLabels[role].en}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 font-normal">
                        {isAr ? roleLabels[role].descAr : roleLabels[role].descEn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Low-Stock Indicator */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {isAr ? 'الإشعارات وتنبيهات المخزون' : 'System & Stock Alerts'}
                    </span>
                    <button
                      onClick={onOpenLowStockEmail}
                      className="text-[11px] text-red-600 hover:underline font-bold flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {isAr ? 'إرسال بريد النواقص' : 'Dispatch Email'}
                    </button>
                  </div>

                  <div className="mt-2 max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`p-2.5 rounded-lg text-xs transition cursor-pointer border ${
                          notif.read
                            ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'
                            : notif.severity === 'critical'
                            ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-slate-800 dark:text-slate-200 font-semibold'
                            : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[11px] text-red-600 dark:text-red-400">
                            {isAr ? notif.titleAr : notif.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          {isAr ? notif.messageAr : notif.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customer Account & Gmail Auth Trigger */}
            {onOpenCustomerAuth && (
              <button
                onClick={onOpenCustomerAuth}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition border border-slate-200 dark:border-slate-700"
                title={customerAccount ? customerAccount.email : 'Gmail Customer Account'}
              >
                {customerAccount ? (
                  <>
                    <img 
                      src={customerAccount.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                      alt="" 
                      className="w-4 h-4 rounded-full object-cover" 
                    />
                    <span className="hidden md:inline max-w-[85px] truncate text-[11px] font-bold">
                      {customerAccount.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-1 rounded">
                      ✓ Gmail
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="hidden sm:inline text-[11px] font-bold">
                      {isAr ? 'حساب العميل (Gmail)' : 'Sign In (Gmail)'}
                    </span>
                  </>
                )}
              </button>
            )}

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition flex items-center gap-1 text-xs font-bold"
              title={isAr ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in slide-in-from-top-2 duration-150">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold text-center transition flex flex-col items-center justify-center gap-1 ${
                    active
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                  {tab.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-black/20 text-white rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
