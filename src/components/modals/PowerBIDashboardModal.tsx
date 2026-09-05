import React, { useState } from 'react';
import { BarChart3, X, RefreshCw, TrendingUp, DollarSign, Store, Activity, Layers, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';
import { Language, Branch, Product } from '../../types';

interface PowerBIDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  branches: Branch[];
  products: Product[];
}

export const PowerBIDashboardModal: React.FC<PowerBIDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  branches,
  products
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'today' | 'month' | 'quarter' | 'year'>('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const branchRevenueData = [
    { name: isAr ? 'طنطا الرئيسي (الجيش)' : 'Tanta Flagship (El-Geish)', revenue: 1420000, target: 1300000, orders: 4890, growth: '+14.2%' },
    { name: isAr ? 'القاهرة - مصر الجديدة' : 'Cairo Heliopolis Hub', revenue: 1680000, target: 1500000, orders: 5310, growth: '+22.5%' },
    { name: isAr ? 'المنصورة - المستشفى التخصصي' : 'Mansoura University Hub', revenue: 1190000, target: 1100000, orders: 3950, growth: '+9.8%' },
    { name: isAr ? 'المحلة الكبرى (شبرا)' : 'El-Mahalla Hub', revenue: 980000, target: 950000, orders: 3200, growth: '+6.4%' },
    { name: isAr ? 'الزقازيق (القومية)' : 'Zagazig Central', revenue: 1050000, target: 1000000, orders: 3450, growth: '+11.1%' },
    { name: isAr ? 'طنطا - الاستاد' : 'Tanta Stadium Branch', revenue: 890000, target: 850000, orders: 2980, growth: '+8.3%' },
  ];

  const channelBreakdown = [
    { channel: isAr ? 'نقاط البيع بالفروع (POS)' : 'Retail In-Store (POS)', share: 58, value: '4.18M EGP', color: 'bg-red-600' },
    { channel: isAr ? 'التوريدات والمناقصات (30+ جهة)' : 'Institutional Tenders (30+)', share: 24, value: '1.72M EGP', color: 'bg-emerald-600' },
    { channel: isAr ? 'المتجر والتوصيل السريع B2C' : 'B2C E-Commerce & WhatsApp', share: 18, value: '1.30M EGP', color: 'bg-blue-600' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header with Power BI branding */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isAr ? 'لوحة تحليلات Power BI لعمليات الفروع' : 'Branch Operations Power BI Analytics'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded">
                  LIVE POWER BI EMBED
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr
                  ? 'رؤية موحدة للأداء المالي، دوران المخزون، وهوامش ربحية مصنع فارما كود لـ ١٧ فرعاً'
                  : 'Consolidated performance, inventory velocity, and Pharma Code manufacturing margins across 17 branches'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Timeframe tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setActiveTimeframe('month')}
                className={`px-3 py-1 rounded-md transition ${activeTimeframe === 'month' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-xs font-bold' : ''}`}
              >
                {isAr ? 'هذا الشهر' : 'Month'}
              </button>
              <button
                onClick={() => setActiveTimeframe('quarter')}
                className={`px-3 py-1 rounded-md transition ${activeTimeframe === 'quarter' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-xs font-bold' : ''}`}
              >
                {isAr ? 'الربع السنوي' : 'Quarter'}
              </button>
              <button
                onClick={() => setActiveTimeframe('year')}
                className={`px-3 py-1 rounded-md transition ${activeTimeframe === 'year' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-white shadow-xs font-bold' : ''}`}
              >
                {isAr ? 'السنة المالية' : 'Year'}
              </button>
            </div>

            <button
              onClick={handleRefresh}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{isAr ? 'إجمالي مبيعات الشهر' : 'Monthly Gross Revenue'}</span>
              <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
              </span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              7,210,000 EGP
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAr ? 'الهدف المالي: 6.8M EGP (تحقيق 106%)' : 'Target: 6.8M EGP (106% Met)'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{isAr ? 'هامش الربح الإجمالي (EBITDA)' : 'Consolidated Margin'}</span>
              <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                <ArrowUpRight className="w-3.5 h-3.5" /> +2.4%
              </span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              21.8%
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAr ? 'مدعوم بمنتجات فارما كود الحيوية' : 'Boosted by Pharma Code Biologics'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{isAr ? 'معدل دوران المخزون' : 'Inventory Turnover'}</span>
              <span className="text-slate-400 text-[11px] font-semibold">17 Branches</span>
            </div>
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              8.4x / Year
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAr ? 'دورة التخزين: 43 يوماً' : 'Average holding: 43 days'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{isAr ? 'الروشتات المصروفة' : 'Prescriptions Dispensed'}</span>
              <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.0%
              </span>
            </div>
            <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
              23,780 Rx
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAr ? 'بما فيها عقود التأمين والمناقصات' : 'Includes Insurance & Tenders'}
            </span>
          </div>
        </div>

        {/* Middle Charts & Distribution */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Branch Comparison Bars */}
          <div className="lg:col-span-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'أداء إيرادات الفروع الرئيسية مقابل المستهدف:' : 'Top Branches Revenue vs. Target:'}
              </h4>
              <span className="text-[11px] text-slate-500">
                {isAr ? 'تحديث لحظي من Pharmasyst' : 'Live Pharmasyst Feed'}
              </span>
            </div>

            <div className="space-y-3">
              {branchRevenueData.map((branch, idx) => {
                const percent = Math.min(100, Math.round((branch.revenue / 1800000) * 100));
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{branch.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {(branch.revenue / 1000000).toFixed(2)}M EGP
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                          {branch.growth}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue by Channel */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                {isAr ? 'توزيع الإيرادات حسب القنوات:' : 'Revenue Channels:'}
              </h4>

              <div className="space-y-3">
                {channelBreakdown.map((item, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700 dark:text-slate-300">{item.channel}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{item.share}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.share}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300">
              <span className="font-bold block mb-0.5">
                {isAr ? '💡 توصية خوارزمية التوريد:' : '💡 Replenishment Recommendation:'}
              </span>
              {isAr
                ? 'زيادة مخزون عقاقير الأورام والحقن المجهري بفرعي طنطا والمنصورة بنسبة 20% لتلبية متطلبات مناقصات الجامعات.'
                : 'Increase oncology & ICSI safety buffer at Tanta & Mansoura hubs by 20% to meet university hospital demand.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            {isAr
              ? 'تم تطوير نموذج Power BI بواسطة د. مصطفى المُرَبع لمجموعة صيدليات البنداري'
              : 'Power BI Operations Architecture by Dr.mostafa_elmourab3'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm"
          >
            {isAr ? 'إغلاق لوحة التحليلات' : 'Close Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};
