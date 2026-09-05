import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  HeartPulse, 
  PieChart, 
  FileText, 
  Download, 
  CheckCircle2, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Users, 
  ExternalLink,
  Calendar,
  Send,
  Award
} from 'lucide-react';
import { FINANCIAL_PROJECTIONS, FUNDING_PILLARS } from '../../data/mockData';
import { Language } from '../../types';

interface InvestmentTabProps {
  lang: Language;
  onOpenAuditModal: () => void;
}

export const InvestmentTab: React.FC<InvestmentTabProps> = ({ lang, onOpenAuditModal }) => {
  const isAr = lang === 'ar';

  const [investmentAmount, setInvestmentAmount] = useState<number>(8);
  const [preMoneyValuation, setPreMoneyValuation] = useState<number>(24);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Valuation math
  const postMoneyValuation = preMoneyValuation + investmentAmount;
  const equityStake = ((investmentAmount / postMoneyValuation) * 100).toFixed(1);
  const projectedYear5Rev = 35.0; // €35M
  const projectedExitVal = projectedYear5Rev * 3.5; // €122.5M
  const investorExitReturn = (projectedExitVal * (parseFloat(equityStake) / 100)).toFixed(1);
  const multipleOnInvestedCapital = (parseFloat(investorExitReturn) / investmentAmount).toFixed(1);

  const dueDiligenceItems = [
    {
      title: isAr ? 'القوائم المالية المدققة للسنوات الثلاث السابقة' : 'Audited 3-Year Historical Financial Statements',
      stamp: 'Certified by KPMG Egypt',
      icon: FileText,
      locked: false
    },
    {
      title: isAr ? 'رخصة التصنيع الدوائي ومطابقة GMP لمصنع فارما كود' : 'Pharma Code Specialty Manufacturing EDA & GMP License',
      stamp: 'Egyptian Drug Authority (EDA)',
      icon: HeartPulse,
      locked: false
    },
    {
      title: isAr ? 'عقود التوريد والمناقصات الحكومية (٣٠+ جهة رسمية)' : '30+ Institutional Government Tender Award Contracts',
      stamp: 'Unified Egyptian Procurement Authority (UPA)',
      icon: Award,
      locked: false
    },
    {
      title: isAr ? 'براءة الاختراع والملكية الفكرية لمنصة SOLA وبنداري' : 'IP & Software Ownership: SOLA & Unified Core',
      stamp: 'Registered Software IP',
      icon: Lock,
      locked: false
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Investment Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 shadow-2xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-full">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{isAr ? 'جولة تمويل استراتيجية: ٨ ملايين دولار أمريكي' : 'Series A Strategic Growth Round: $8,000,000 USD'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            {isAr
              ? 'التحول إلى مجموعة صيدلانية متكاملة رأسياً (Vertical Integration)'
              : 'Building Egypt’s Premier Vertically Integrated Healthcare Powerhouse'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {isAr
              ? 'تجمع صيدليات البنداري بين ٤٦ عاماً من الثقة في قطاع التجزئة (١٧ فرعاً)، والتصنيع الدوائي التخصصي (مصنع فارما كود للأورام والحقن المجهري)، والتجارة الإلكترونية عبر منصة SOLA الرقمية. نستهدف التوسع من ٤.٢ مليون يورو إلى ٣٥ مليون يورو إيرادات سنوية بحلول ٢٠٣٠.'
              : 'Unifying 46 years of retail community leadership (17 branches), captive manufacturing through Pharma Code (Oncology & ICSI biologics), and digital commerce via the SOLA platform. Scaling audited €4.2M revenues to €35M by 2030.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'حجز جلسة تدقيق استثماري (Pitch Meeting)' : 'Schedule Investor Due Diligence'}</span>
            </button>

            <button
              onClick={onOpenAuditModal}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'تحميل التقرير المحاسبي المدقق' : 'Download Audit Financials'}</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Summary Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'توسيع شبكة الفروع' : 'Retail Expansion'}</span>
            <span className="text-lg sm:text-xl font-black text-white">$4.0M</span>
            <span className="text-[10px] text-slate-400 block">{isAr ? 'من ١٧ إلى ٣٠ فرعاً' : '17 → 30 branches'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'مصنع فارما كود' : 'Pharma Code'}</span>
            <span className="text-lg sm:text-xl font-black text-amber-400">$2.0M</span>
            <span className="text-[10px] text-slate-400 block">{isAr ? 'خطوط إنتاج بيولوجية' : 'Biologics & ICSI'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'المنصة الرقمية SOLA' : 'Digital Ecosystem'}</span>
            <span className="text-lg sm:text-xl font-black text-blue-400">$1.5M</span>
            <span className="text-[10px] text-slate-400 block">{isAr ? 'المخازن والتطبيقات' : 'Micro-fulfillment'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'رأس المال العامل' : 'Working Capital'}</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400">$0.5M</span>
            <span className="text-[10px] text-slate-400 block">{isAr ? 'المناقصات والتوريد' : 'Institutional tenders'}</span>
          </div>
        </div>
      </div>

      {/* Financial Projections Model (€4.2M to €35M) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'النموذج المالي والتوقعات الخمسية (Financial Projections)' : '5-Year Group Financial Projections (€M)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'مسار النمو من قاعدة الأساس ٤.٢ مليون يورو حتى ٣٥ مليون يورو بدعم هوامش تصنيع فارما كود'
                : 'Accelerating from €4.2M baseline to €35M with high-margin Pharma Code captive manufacturing'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
              {isAr ? 'هامش ربح إجمالي يصل لـ 28.5%' : 'EBITDA Margin up to 28.5%'}
            </span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">{isAr ? 'السنة المالية' : 'Year'}</th>
                <th className="py-3 px-3">{isAr ? 'إيرادات الفروع (Retail)' : 'Retail Branches'}</th>
                <th className="py-3 px-3">{isAr ? 'التجارة الإلكترونية (B2C)' : 'E-Commerce / SOLA'}</th>
                <th className="py-3 px-3">{isAr ? 'مصنع فارما كود (Manufacturing)' : 'Pharma Code'}</th>
                <th className="py-3 px-3 font-bold text-slate-900 dark:text-white">{isAr ? 'إجمالي إيراد المجموعة' : 'Total Group Rev'}</th>
                <th className="py-3 px-3 font-bold text-emerald-600">{isAr ? 'الأرباح التشغيلية EBITDA' : 'EBITDA'}</th>
                <th className="py-3 px-3 text-right">{isAr ? 'هامش الربح' : 'Margin %'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {FINANCIAL_PROJECTIONS.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-sans font-bold text-slate-900 dark:text-white">
                    {row.year}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {row.retailRev}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {row.ecomRev}
                  </td>
                  <td className="py-3 px-3 text-amber-600 font-bold">
                    {row.pharmaCodeRev}
                  </td>
                  <td className="py-3 px-3 font-black text-slate-900 dark:text-white">
                    {row.totalRev}
                  </td>
                  <td className="py-3 px-3 font-black text-emerald-600 dark:text-emerald-400">
                    {row.ebitda}
                  </td>
                  <td className="py-3 px-3 text-right font-sans font-bold text-slate-700 dark:text-slate-300">
                    {row.margin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Valuation & Return Calculator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isAr ? 'حاسبة التقييم والعائد الاستثماري التفاعلية' : 'Interactive Valuation & Investor Return Model'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'اختبر سيناريوهات حجم الاستثمار ونسبة الملكية المتوقعة ومضاعف التخارج بعد ٥ سنوات'
              : 'Calculate equity stake, post-money valuation, and projected 5-year exit return'}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sliders Input */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isAr ? 'حجم الاستثمار المستهدف (Investment Amount)' : 'Investment Amount ($M)'}</span>
                <span className="font-mono text-amber-600 text-sm">${investmentAmount}.0M</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$4.0M</span>
                <span>$8.0M (Base Case)</span>
                <span>$12.0M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isAr ? 'تقييم الشركة قبل الاستثمار (Pre-Money Valuation)' : 'Pre-Money Valuation ($M)'}</span>
                <span className="font-mono text-blue-600 text-sm">${preMoneyValuation}.0M</span>
              </div>
              <input
                type="range"
                min="18"
                max="36"
                step="1"
                value={preMoneyValuation}
                onChange={(e) => setPreMoneyValuation(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$18M</span>
                <span>$24M (Targeted)</span>
                <span>$36M</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white block mb-1">
                {isAr ? 'آلية استخدام السيولة:' : 'Strategic Capital Efficiency:'}
              </strong>
              {isAr
                ? 'يتم توجيه ٥٠٪ للتوسع الجغرافي للفروع لتوليد تدفق نقدي فوري، و٢٥٪ لمصنع فارما كود لتحقيق هوامش ربح تصنيعية تفوق ٤٠٪، و٢٥٪ للتكنولوجيا ورأس المال العامل.'
                : '50% deployed to retail footprint for immediate cash generation, 25% to Pharma Code for >40% gross manufacturing margins, 25% to digital tech & working capital.'}
            </div>
          </div>

          {/* Outputs Card */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                {isAr ? 'مخرجات النموذج الاستثماري' : 'Investment Scenario Summary'}
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'التقييم بعد الاستثمار' : 'Post-Money Valuation'}</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">${postMoneyValuation}.0M</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'الحصة التقديرية' : 'Equity Acquired'}</span>
                  <span className="text-lg font-black text-amber-500 font-mono">{equityStake}%</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'القيمة المتوقعة بالتخارج (Y5)' : 'Projected Exit Value'}</span>
                  <span className="text-lg font-black text-emerald-500 font-mono">€{investorExitReturn}M</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'مضاعف رأس المال (MOIC)' : 'Multiple on Capital'}</span>
                  <span className="text-lg font-black text-blue-500 font-mono">{multipleOnInvestedCapital}x</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-3 bg-slate-900 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-slate-900 dark:hover:text-white text-xs font-bold rounded-xl transition shadow"
              >
                {isAr ? 'طلب مناقشة نموذج التقييم مع مجلس الإدارة' : 'Discuss Valuation Terms with Executive Board'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Due Diligence Data Room */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'غرفة بيانات التدقيق الاستثماري (Due Diligence Data Room)' : 'Due Diligence Virtual Data Room'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr ? 'الوثائق القانونية، شهادات هيئة الدواء، والسجلات المحاسبية الرسمية' : 'Audited tax declarations, EDA manufacturing permits, and institutional contracts'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dueDiligenceItems.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={i}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-blue-600 shadow-xs">
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {item.stamp}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenAuditModal}
                  className="p-2 text-slate-400 hover:text-blue-600 transition"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership & Executive Board with requested attribution */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'الإدارة التنفيذية والشركاء المؤسسون' : 'Executive Leadership & Co-Founders'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'خبرات دوائية وتكنولوجية ممتدة على مدار أكثر من أربعة عقود'
              : 'Decades of combined clinical, operational, and digital healthcare expertise'}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 text-red-600 font-bold text-lg flex items-center justify-center mx-auto border-2 border-red-500">
              AM
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'د. عبد الفتاح منتصر' : 'Dr. Abdelfattah Montasser'}
            </h4>
            <span className="text-[11px] text-red-600 font-bold block">
              {isAr ? 'المؤسس ورئيس مجلس الإدارة' : 'Co-Founder & Chairman'}
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isAr
                ? 'مؤسس صيدليات البنداري عام ١٩٨٠، قاد المجموعة لبناء شبكة الفروع وتوريد كبرى المناقصات الحكومية.'
                : 'Founded El-Bendary in 1980, leading institutional procurement and retail network growth.'}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold text-lg flex items-center justify-center mx-auto border-2 border-emerald-500">
              AE
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'د. علاء عز الدين' : 'Dr. Alaa Ezzeldin'}
            </h4>
            <span className="text-[11px] text-emerald-600 font-bold block">
              {isAr ? 'الشريك المؤسس والمدير الإكلينيكي' : 'Co-Founder & Chief Clinical Officer'}
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isAr
                ? 'إشراف على بروتوكولات الصرف الدوائي الإكلينيكي، شبكات التأمين، وسلاسل توريد مصنع فارما كود.'
                : 'Oversees clinical dispensing standards, insurer relations, and Pharma Code manufacturing.'}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold text-lg flex items-center justify-center mx-auto border-2 border-blue-500">
              MM
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Dr. Mostafa El-Mourabaa
            </h4>
            <span className="text-[11px] text-blue-600 font-bold block">
              Chief Technology & Platform Officer
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isAr
                ? 'مهندس البنية التحتية لمنظومة SOLA وربط Pharmasyst والمخازن الذكية.'
                : 'Architected the unified digital ecosystem, SOLA omni-channel, and ERP synchronization.'}
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                design and develop by Dr.mostafa_elmourab3
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Due Diligence Pitch Meeting Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            {inquirySubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'تم حجز طلب التدقيق الاستثماري' : 'Pitch Request Received'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr
                    ? 'سيقوم مكتب رئيس مجلس الإدارة بإرسال ميثاق السرية (NDA) وتحديد الموعد.'
                    : 'The Executive Office will provide the bilateral NDA and confirm meeting coordinates.'}
                </p>
                <button
                  onClick={() => { setInquiryModalOpen(false); setInquirySubmitted(false); }}
                  className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySubmitted(true);
                }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isAr ? 'طلب جلسة تدقيق استثماري (Due Diligence Session)' : 'Request Executive Due Diligence'}
                  </h3>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الصندوق الاستثماري أو المستثمر' : 'Fund / Investor Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cairo Capital / Mena Health Fund"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'البريد الإلكتروني المؤسسي' : 'Institutional Email'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@fund.com"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'مبلغ التخصيص المستهدف' : 'Target Ticket Size'}
                  </label>
                  <select
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option>$1,000,000 - $2,000,000 USD</option>
                    <option>$4,000,000 - $8,000,000 USD (Lead)</option>
                    <option>Strategic Pharmaceutical Alliance</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg"
                  >
                    {isAr ? 'تأكيد الطلب' : 'Request Pitch Access'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
