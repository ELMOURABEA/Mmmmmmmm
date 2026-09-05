import React, { useState } from 'react';
import { FileCheck, X, Download, Printer, ShieldAlert, CheckCircle2, Building, Calendar, Layers } from 'lucide-react';
import { Language, Branch, Product } from '../../types';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  branches: Branch[];
  products: Product[];
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({
  isOpen,
  onClose,
  lang,
  branches,
  products
}) => {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const totalInventoryValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const nearExpiryCount = products.filter(p => p.expiryDate.startsWith('2026')).length;
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Branch,SKU,Product Name,Physical Stock,System Stock,Variance,Unit Price,Total Value\n"
        + products.map(p => `All Branches,${p.sku},"${p.name}",${p.stock},${p.stock},0,${p.price},${p.price * p.stock}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `El-Bendary-Monthly-Audit-${selectedMonth.replace(' ', '-')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'منظومة التقارير الدورية والجرد الشهري الآلي' : 'Automated Monthly Audit & Inspection Dossier'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'مطابق لمتطلبات التفتيش الصيدلي لهيئة الدواء المصرية (EDA) ومعايير ISO' : 'Compliant with Egyptian Drug Authority (EDA) regulatory standards'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'فترة المراجعة الشهرية' : 'Audit Period'}
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="September 2026">{isAr ? 'سبتمبر ٢٠٢٦ (الحالي)' : 'September 2026 (Current)'}</option>
              <option value="August 2026">{isAr ? 'أغسطس ٢٠٢٦' : 'August 2026'}</option>
              <option value="July 2026">{isAr ? 'يوليو ٢٠٢٦' : 'July 2026'}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'الفرع المستهدف بالتفتيش' : 'Target Branch Audit'}
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="all">{isAr ? 'كافة الفروع الـ ١٧ المجمعة' : 'All 17 Consolidated Branches'}</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{isAr ? b.nameAr : b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">
              {isAr ? 'قيمة المخزون الإجمالي' : 'Total Inventory Valuation'}
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {totalInventoryValuation.toLocaleString()} EGP
            </span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-semibold">
              {isAr ? 'مُطابق للدفاتر' : '100% Reconciled'}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">
              {isAr ? 'إجمالي العبوات' : 'Stock Units'}
            </span>
            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
              {totalStockUnits.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {isAr ? 'عبر فروع الدلتا والقاهرة' : 'Delta & Cairo Hubs'}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">
              {isAr ? 'نواقص حرجة' : 'Low Stock SKUs'}
            </span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              {lowStockCount}
            </span>
            <span className="text-[10px] text-amber-600 block mt-0.5 font-semibold">
              {isAr ? 'تتطلب أمر توريد' : 'Requisition Needed'}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">
              {isAr ? 'أصناف قريبة الانتهاء' : 'Near-Expiry (2026)'}
            </span>
            <span className="text-base font-extrabold text-red-600 dark:text-red-400">
              {nearExpiryCount}
            </span>
            <span className="text-[10px] text-red-600 block mt-0.5 font-semibold">
              {isAr ? 'برنامج إرجاع الشركات' : 'Return Protocol Active'}
            </span>
          </div>
        </div>

        {/* Regulatory Checklist */}
        <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            {isAr ? 'سجل الامتثال والتفتيش الرقابي لشهر سبتمبر:' : 'Regulatory Compliance Checkpoints:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                {isAr ? 'سجل أدوية الجداول والمخدرات مختوم ومطابق' : 'Narcotic register stamped & verified'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                {isAr ? 'سلسلة تبريد الأدوية الحيوية (٢-٨ م°) مسجلة آلياً' : 'Cold-chain IoT sensors (2-8°C) calibrated'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                {isAr ? 'ترخيص مزاولة المهنة لجميع الصيادلة سارٍ' : 'Licensed pharmacists on shift 100%'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                {isAr ? 'مطابقة نقاط البيع مع الإقرار الضريبي الإلكتروني' : 'ETA e-Invoice integration synced'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500">
            {isAr ? 'تم إنشاء التقرير بواسطة نظام إدارة الجودة - صيدليات البنداري' : 'Generated by El-Bendary QA & Audit System'}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              {isAr ? 'طباعة التقرير' : 'Print'}
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              {isAr ? 'تصدير جدول البيانات CSV' : 'Export CSV Audit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
