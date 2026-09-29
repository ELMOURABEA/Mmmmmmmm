import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  Language, 
  ThemeMode, 
  UserRole, 
  Product, 
  Branch, 
  SystemNotification, 
  CartItem,
  CustomerAccount,
  CustomerReview
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_BRANCHES, 
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS,
  DEFAULT_CUSTOMER_ACCOUNT
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab';
import { CorpWebsiteTab } from './components/tabs/CorpWebsiteTab';
import { ECommerceTab } from './components/tabs/ECommerceTab';
import { BranchOpsTab } from './components/tabs/BranchOpsTab';
import { OmniChannelTab } from './components/tabs/OmniChannelTab';

// Modals
import { RxUploadModal } from './components/modals/RxUploadModal';
import { ExcelUploadModal } from './components/modals/ExcelUploadModal';
import { PharmasystConnectModal } from './components/modals/PharmasystConnectModal';
import { LowStockEmailModal } from './components/modals/LowStockEmailModal';
import { AuditReportModal } from './components/modals/AuditReportModal';
import { PowerBIDashboardModal } from './components/modals/PowerBIDashboardModal';
import { InstaPayModal } from './components/modals/InstaPayModal';
import { CustomerAuthModal } from './components/modals/CustomerAuthModal';

export default function App() {
  // Navigation & Preferences State
  const [currentTab, setCurrentTab] = useState<TabType>('corp');
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [userRole, setUserRole] = useState<UserRole>('super_admin');

  // Core Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [customerAccount, setCustomerAccount] = useState<CustomerAccount | null>(DEFAULT_CUSTOMER_ACCOUNT);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]);

  // Modal Visibility States
  const [rxModalOpen, setRxModalOpen] = useState(false);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [pharmasystModalOpen, setPharmasystModalOpen] = useState(false);
  const [lowStockEmailModalOpen, setLowStockEmailModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [powerBIModalOpen, setPowerBIModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [instaPayModalOpen, setInstaPayModalOpen] = useState(false);
  const [customerAuthModalOpen, setCustomerAuthModalOpen] = useState(false);

  // Sync theme with DOM document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Excel bulk upload handler
  const handleProductsImported = (newProducts: Product[]) => {
    let addedCount = 0;
    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const existingBarcodes = new Set(prev.map((p) => p.barcode).filter(Boolean));
      const uniqueNew = newProducts.filter(
        (p) => !existingIds.has(p.id) && (!p.barcode || !existingBarcodes.has(p.barcode))
      );
      addedCount = uniqueNew.length;
      if (uniqueNew.length === 0) return prev;
      return [...uniqueNew, ...prev];
    });

    // Add success notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: 'Excel Catalog Sync Completed',
      titleAr: 'تم استيراد شيت الإكسيل وتحديث الأصناف',
      message: `Successfully synchronized ${newProducts.length} pharmaceutical items into ERP database.`,
      messageAr: `تم تحديث ${newProducts.length} صنفاً في قاعدة بيانات السيرفر بنجاح.`,
      type: 'sync_event',
      timestamp: 'Just now',
      read: false,
      severity: 'info'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handlePrescriptionUploaded = (orderData: any) => {
    const newNotif: SystemNotification = {
      id: `notif-rx-${Date.now()}`,
      title: 'Prescription Queued for Pharmacist Review',
      titleAr: 'تم استلام روشتة جديدة وقيد التدقيق الصيدلي',
      message: `Prescription #${orderData.id} for ${orderData.patientName} assigned to branch clinical team.`,
      messageAr: `تم استلام الروشتة رقم #${orderData.id} للمريض ${orderData.patientName} وتوجيهها للصيدلي.`,
      type: 'rx_alert',
      timestamp: 'Just now',
      read: false,
      severity: 'warning'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleLowStockAlertDispatched = (alertDetails: any) => {
    const newNotif: SystemNotification = {
      id: `notif-stock-${Date.now()}`,
      title: 'Low Stock Replenishment PO Dispatched',
      titleAr: 'تم إرسال أمر توريد النواقص لشركات التوزيع والمصنع',
      message: `Replenishment order for ${alertDetails.itemsCount} low stock SKUs sent to suppliers.`,
      messageAr: `تم إرسال طلب إعادة توريد لـ ${alertDetails.itemsCount} صنفاً عاجلاً للمصنع والموردين.`,
      type: 'low_stock',
      timestamp: 'Just now',
      read: false,
      severity: 'critical'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handlePharmasystSyncComplete = () => {
    const newNotif: SystemNotification = {
      id: `notif-sync-${Date.now()}`,
      title: 'Pharmasyst Cloud ERP Synced (bindary.pharmasyst.net)',
      titleAr: 'تمت مزامنة بيانات فارماسيست السحابية بنجاح',
      message: '17 branches and 1,420 SKUs live updated with 24ms latency.',
      messageAr: 'تم تحديث أرصدة ومبيعات ١٧ فرعاً بنجاح وسرعة استجابة ٢٤ مللي ثانية.',
      type: 'sync_event',
      timestamp: 'Just now',
      read: false,
      severity: 'success'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleAddReview = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
    const newNotif: SystemNotification = {
      id: `notif-rev-${Date.now()}`,
      title: 'New Verified Patient Review',
      titleAr: 'تم تسجيل تقييم عميل جديد موثق',
      message: `${newReview.customerName} rated ${newReview.branchName} with ${newReview.rating} stars.`,
      messageAr: `قام العميل ${newReview.customerNameAr || newReview.customerName} بتقييم فرع ${newReview.branchNameAr || newReview.branchName} بـ ${newReview.rating} نجوم.`,
      type: 'sync_event',
      timestamp: 'Just now',
      read: false,
      severity: 'info'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className={`min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 ${
        lang === 'ar' ? 'font-tajawal' : 'font-jakarta'
      }`}
    >
      {/* Top Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        userRole={userRole}
        onSelectRole={setUserRole}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        cartItems={cartItems}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenLowStockEmail={() => setLowStockEmailModalOpen(true)}
        onOpenPharmasystModal={() => setPharmasystModalOpen(true)}
        onOpenInstaPayModal={() => setInstaPayModalOpen(true)}
        customerAccount={customerAccount}
        onOpenCustomerAuth={() => setCustomerAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'overview' && (
          <OverviewTab
            lang={lang}
            onSelectTab={setCurrentTab}
            onOpenPowerBI={() => setPowerBIModalOpen(true)}
            onOpenPharmasystModal={() => setPharmasystModalOpen(true)}
            onOpenInstaPayModal={() => setInstaPayModalOpen(true)}
          />
        )}

        {currentTab === 'corp' && (
          <CorpWebsiteTab
            lang={lang}
            branches={branches}
            reviews={reviews}
            onAddReview={handleAddReview}
            onOpenRxModal={() => setRxModalOpen(true)}
            onNavigateToEcom={() => setCurrentTab('ecommerce')}
            onOpenInstaPayModal={() => setInstaPayModalOpen(true)}
            customerAccount={customerAccount}
            onOpenCustomerAuth={() => setCustomerAuthModalOpen(true)}
          />
        )}

        {currentTab === 'ecommerce' && (
          <ECommerceTab
            lang={lang}
            products={products}
            onAddToCart={handleAddToCart}
            onOpenRxModal={() => setRxModalOpen(true)}
            onOpenExcelModal={() => setExcelModalOpen(true)}
            cartProductIds={cartItems.map((item) => item.product.id)}
          />
        )}

        {currentTab === 'branch_ops' && (
          <BranchOpsTab
            lang={lang}
            branches={branches}
            products={products}
            userRole={userRole}
            onOpenPowerBI={() => setPowerBIModalOpen(true)}
            onOpenPharmasystModal={() => setPharmasystModalOpen(true)}
            onOpenLowStockEmail={() => setLowStockEmailModalOpen(true)}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onOpenExcelModal={() => setExcelModalOpen(true)}
          />
        )}

        {currentTab === 'omnichannel' && (
          <OmniChannelTab
            lang={lang}
            onOpenRxModal={() => setRxModalOpen(true)}
          />
        )}
      </main>

      {/* Corporate & Attribution Footer */}
      <Footer
        lang={lang}
        onSelectTab={setCurrentTab}
        onOpenRxModal={() => setRxModalOpen(true)}
        onOpenPharmasystModal={() => setPharmasystModalOpen(true)}
        onOpenInstaPayModal={() => setInstaPayModalOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        lang={lang}
        onOpenRxModal={() => {
          setCartDrawerOpen(false);
          setRxModalOpen(true);
        }}
      />

      {/* Interactive Feature Modals */}
      <RxUploadModal
        isOpen={rxModalOpen}
        onClose={() => setRxModalOpen(false)}
        lang={lang}
        onSuccess={handlePrescriptionUploaded}
        products={products}
      />

      <ExcelUploadModal
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
        onImportProducts={handleProductsImported}
        lang={lang}
      />

      <PharmasystConnectModal
        isOpen={pharmasystModalOpen}
        onClose={() => setPharmasystModalOpen(false)}
        lang={lang}
        onSyncComplete={handlePharmasystSyncComplete}
      />

      <LowStockEmailModal
        isOpen={lowStockEmailModalOpen}
        onClose={() => setLowStockEmailModalOpen(false)}
        products={products}
        lang={lang}
        onDispatchAlert={handleLowStockAlertDispatched}
      />

      <AuditReportModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        branches={branches}
        products={products}
        lang={lang}
      />

      <PowerBIDashboardModal
        isOpen={powerBIModalOpen}
        onClose={() => setPowerBIModalOpen(false)}
        branches={branches}
        products={products}
        lang={lang}
      />

      <InstaPayModal
        isOpen={instaPayModalOpen}
        onClose={() => setInstaPayModalOpen(false)}
        lang={lang}
      />

      <CustomerAuthModal
        isOpen={customerAuthModalOpen}
        onClose={() => setCustomerAuthModalOpen(false)}
        lang={lang}
        account={customerAccount}
        onSaveAccount={setCustomerAccount}
      />
    </div>
  );
}
