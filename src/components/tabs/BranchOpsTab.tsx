import React, { useState } from 'react';
import { 
  Building2, 
  Activity, 
  Layers, 
  FileSpreadsheet, 
  Mail, 
  FileCheck, 
  AlertTriangle, 
  Thermometer, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  RefreshCw, 
  Clock, 
  Download, 
  BarChart3, 
  Database,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  PackageCheck,
  MapPin,
  List
} from 'lucide-react';
import { Branch, Product, Language, UserRole } from '../../types';
import { BranchMap } from '../BranchMap';

interface BranchOpsTabProps {
  lang: Language;
  branches: Branch[];
  products: Product[];
  userRole: UserRole;
  onOpenPowerBI: () => void;
  onOpenPharmasystModal: () => void;
  onOpenLowStockEmail: () => void;
  onOpenAuditModal: () => void;
  onOpenExcelModal: () => void;
}

export const BranchOpsTab: React.FC<BranchOpsTabProps> = ({
  lang,
  branches,
  products,
  userRole,
  onOpenPowerBI,
  onOpenPharmasystModal,
  onOpenLowStockEmail,
  onOpenAuditModal,
  onOpenExcelModal
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState('b-tanta-main');
  const [isSyncing, setIsSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');

  const isAr = lang === 'ar';

  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);

  const handleSyncERP = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top ERP Integration Ribbon */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400">
                Pharmasyst ERP Gateway • bindary.pharmasyst.net
              </span>
              <span className="px-2 py-0.5 bg-blue-600/40 text-blue-300 text-[10px] font-mono rounded">
                User: admin6
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'غرفة عمليات إدارة الفروع والمخازن المركزية' : 'Branch Operations & Multi-Store ERP Command'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'مراقبة حية وشاملة لـ ١٧ فرعاً، مطابقة المخزون اللحظي عبر خادم Pharmasyst، رصد النواقص، سجل الأدوية المخدرة، ومراقبة حرارة سلاسل التبريد (IoT).'
                : 'Enterprise real-time management for all 17 retail branches: live Pharmasyst ERP synchronization, low-stock triggers, EDA-compliant narcotics logs, and IoT cold-chain tracking.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={onOpenPowerBI}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{isAr ? 'لوحة تحليلات Power BI المباشرة' : 'Full Power BI Dashboard'}</span>
            </button>

            <button
              onClick={handleSyncERP}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? (isAr ? 'جارِ المزامنة...' : 'Syncing...') : (isAr ? 'مزامنة Pharmasyst' : 'Sync ERP')}</span>
            </button>

            <button
              onClick={onOpenPharmasystModal}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
              title="Pharmasyst Credentials"
            >
              <Database className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Real-time sync metadata badges */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span>{isAr ? 'حالة السيرفر:' : 'Server Health:'} <strong className="text-emerald-400">99.98% Uptime</strong></span>
            <span>•</span>
            <span>{isAr ? 'زمن الاستجابة:' : 'Ping:'} <strong className="text-white font-mono">24ms</strong></span>
            <span>•</span>
            <span>{isAr ? 'سجل الفواتير الضريبية:' : 'E-Invoice ETA:'} <strong className="text-emerald-400">Synced</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'آخر مزامنة آلية: منذ دقيقة واحدة' : 'Last auto-sync: 1 min ago'}</span>
          </div>
        </div>
      </div>

      {/* 4 Operations Tools Launchpad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tool 1: Power BI */}
        <div
          onClick={onOpenPowerBI}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
              Power BI
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition">
            {isAr ? 'تحليلات المبيعات ونقاط البيع' : 'Power BI Sales & POS Analytics'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'مؤشرات الأداء المالي، متوسط السلة، ومعدل دوران المخزون' : 'Financial KPIs, basket size & inventory velocity'}
          </p>
        </div>

        {/* Tool 2: Low-Stock Dispatch */}
        <div
          onClick={onOpenLowStockEmail}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-500 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 border border-red-200 dark:border-red-800">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
              {lowStockItems.length} {isAr ? 'نواقص' : 'Low'}
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition">
            {isAr ? 'إرسال بريد النواقص للتوريد' : 'Dispatch Low Stock Email'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'أوامر توريد فورية للشركات الموزعة والمصانع الشقيقة' : 'Instant PO dispatch to distributors & Pharma Code'}
          </p>
        </div>

        {/* Tool 3: Excel Batch Import */}
        <div
          onClick={onOpenExcelModal}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              .xlsx / .csv
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
            {isAr ? 'استيراد الأدوية بالإكسيل' : 'Excel Batch Product Import'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'تحديث الأسعار وتوليد الباركود وتحديث الأرصدة' : 'Sync pricing, barcoding, and master catalogs'}
          </p>
        </div>

        {/* Tool 4: Monthly Audit & CSV */}
        <div
          onClick={onOpenAuditModal}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 border border-purple-200 dark:border-purple-800">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded-full">
              CSV Export
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition">
            {isAr ? 'تقرير الجرد والتدقيق المالي' : 'Monthly Audit & Reconciliation'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'مطابقة نقاط البيع وتصدير كشف رسمي مدقق' : 'Financial reconciliation & downloadable CSV export'}
          </p>
        </div>

      </div>

      {/* Branches Live Operations & GIS Map */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'شبكة الفروع: المزامنة، نقاط البيع والخريطة الجغرافية' : 'Branch Network: POS Sync & GIS Operations'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'متابعة حية لمبيعات الفروع ومواقعها الجغرافية وصيدلي الوردية وحالة الربط بسيرفر Pharmasyst'
                : 'Real-time sales, GIS locations, active duty pharmacist, and local database sync across all branches'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-red-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{isAr ? 'جدول المبيعات' : 'POS Table'}</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-700 text-red-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? 'الخريطة التفاعلية' : 'GIS Map'}</span>
              </button>
            </div>

            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-full">
              {branches.length} / {branches.length} Online
            </span>
          </div>
        </div>

        {viewMode === 'map' ? (
          <div className="mt-6">
            <BranchMap
              branches={branches}
              lang={lang}
              height="h-[550px]"
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">{isAr ? 'الفرع والموقع' : 'Branch & Location'}</th>
                  <th className="py-3 px-3">{isAr ? 'الصيدلي المدير' : 'Duty Manager'}</th>
                  <th className="py-3 px-3">{isAr ? 'مبيعات اليوم' : "Today's Sales"}</th>
                  <th className="py-3 px-3">{isAr ? 'عدد الروشتات' : 'Rx Dispensed'}</th>
                  <th className="py-3 px-3">{isAr ? 'حالة السيرفر' : 'ERP Status'}</th>
                  <th className="py-3 px-3 text-right">{isAr ? 'الإجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {branches.map((branch) => {
                  const isSelected = selectedBranchId === branch.id;
                  return (
                    <tr
                      key={branch.id}
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer ${
                        isSelected ? 'bg-red-50/50 dark:bg-red-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <span>{isAr ? branch.nameAr : branch.name}</span>
                            <span className="text-[10px] text-slate-400 block">{branch.city}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {branch.manager}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        {branch.todaySales}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono">
                        {branch.rxDispensedToday}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {branch.erpSyncStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPowerBI();
                          }}
                          className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto"
                        >
                          <span>{isAr ? 'فحص' : 'Inspect'}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Critical Low Stock & Narcotics Registers in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Low Stock Items with Reorder Button */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'قائمة النواقص الحرجة (Low Stock Monitor)' : 'Low Stock & Depletion Thresholds'}
                </h3>
              </div>
              <button
                onClick={onOpenLowStockEmail}
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isAr ? 'طلب توريد' : 'Reorder PO'}</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {lowStockItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {isAr ? item.nameAr : item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      SKU: {item.sku} • {item.manufacturer}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-red-600 dark:text-red-400 block font-mono">
                      {item.stock} {isAr ? 'علبة' : 'units'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isAr ? `الحد: ${item.lowStockThreshold}` : `Buffer: ${item.lowStockThreshold}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>{isAr ? 'إجمالي الأصناف تحت الحد الأدنى: ٧' : 'Total Items Below Buffer: 7'}</span>
            <span className="text-red-600 font-bold">{isAr ? 'تنبيهات تلقائية مفعلة' : 'Auto-Alerts Active'}</span>
          </div>
        </div>

        {/* Right: Cold-Chain IoT & Narcotics Ledger */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'حساسات IoT لسلاسل التبريد وسجل الجداول' : 'Cold-Chain IoT & Controlled Narcotics'}
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md">
                EDA Compliant
              </span>
            </div>

            {/* IoT Refrigeration Monitor */}
            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {isAr ? 'مبردات أدوية الأورام والحقن المجهري (Tanta Central Hub)' : 'Tanta Central Hub Biologics Fridge'}
                  </span>
                  <span className="font-mono font-bold text-blue-600 text-xs">4.2 °C (Safe: 2-8°C)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full w-[45%]" />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {isAr ? 'حساس IoT رقم #FR-09 • الرطوبة: 45% • متصل بسيرفر الشركة' : 'Sensor #FR-09 • Humidity 45% • Backup Generator Armed'}
                </span>
              </div>

              {/* Controlled Narcotics Ledger */}
              <div className="p-3.5 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                    <span>{isAr ? 'دفتر أدوية الجدول (Narcotics Register)' : 'Narcotics & Controlled Drugs Ledger'}</span>
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold">
                    Serial #EDA-2026-981
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  {isAr
                    ? 'تسجيل رقمي إلزامي للرقم القومي للطبيب، كود المريض، والكمية المنصرفة مع توقيع الصيدلي المدير فورياً.'
                    : 'Mandatory cryptographic recording of patient National ID, physician EDA license, and physical dispensing pharmacist seal.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>{isAr ? 'آخر فحص تفتيش صيدلي: أغسطس ٢٠٢٦' : 'Last EDA Regulatory Inspection: Pass'}</span>
            <span className="text-emerald-600 font-bold">{isAr ? 'مطابق ١٠٠٪' : '100% Compliant'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
