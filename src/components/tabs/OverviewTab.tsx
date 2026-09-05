import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Workflow, 
  DollarSign, 
  ExternalLink,
  Store,
  MessageSquare,
  Package,
  HeartPulse
} from 'lucide-react';
import { Language, TabType } from '../../types';
import { FUNDING_PILLARS, FINANCIAL_PROJECTIONS } from '../../data/mockData';

interface OverviewTabProps {
  lang: Language;
  onSelectTab: (tab: TabType) => void;
  onOpenPowerBI: () => void;
  onOpenPharmasystModal: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  lang,
  onSelectTab,
  onOpenPowerBI,
  onOpenPharmasystModal
}) => {
  const isAr = lang === 'ar';

  const systemsMatrix = [
    {
      id: 'sys-corp',
      name: isAr ? 'موقع الشركة والبوابة الرقمية' : 'Corporate Website & Public Portal',
      desc: isAr ? 'دليل الـ ١٧ فرعاً، شبكة شركات التأمين، والمقالات الطبية' : 'Branch locator, insurance directory & health blog',
      status: 'live',
      statusText: isAr ? 'يعمل بنجاح (Live)' : 'Live & Active',
      targetTab: 'corp' as TabType,
      tech: 'Next.js • Tailwind • Vercel • Strapi',
      icon: Store,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
    },
    {
      id: 'sys-ecom',
      name: isAr ? 'المتجر الإلكتروني وتوصيل الروشتات B2C' : 'B2C E-Commerce & Rx Delivery Engine',
      desc: isAr ? 'رفع الروشتة بالذكاء الاصطناعي، كتالوج المنتجات، وتوصيل الدلتا والقاهرة' : 'AI prescription scanner, catalog & Delta/Cairo delivery',
      status: 'live',
      statusText: isAr ? 'يعمل بنجاح (Live)' : 'Live & Active',
      targetTab: 'ecommerce' as TabType,
      tech: 'bendaryph.com • React • Google Play App',
      icon: Package,
      color: 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800'
    },
    {
      id: 'sys-branch',
      name: isAr ? 'إدارة العمليات والمخازن (Pharmasyst + Odoo ERP)' : 'Branch Operations ERP & POS',
      desc: isAr ? 'مزامنة لحظية للمخزون، نقاط البيع، تتبع النواقص، والجرد الشهري' : 'Multi-branch stock sync, POS, low-stock alerts & audit',
      status: 'live',
      statusText: isAr ? 'متصل (Pharmasyst: admin6)' : 'Live (Pharmasyst admin6)',
      targetTab: 'branch_ops' as TabType,
      tech: 'Pharmasyst Cloud • Odoo 17 • Power BI',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
    },
    {
      id: 'sys-omni',
      name: isAr ? 'مركز خدمة العملاء الموحد (SOLA / Chatwoot)' : 'Omni-Channel Customer Center (SOLA)',
      desc: isAr ? 'توحيد واتساب الرسمي، فيسبوك، إنستجرام، وروبوتات المحادثة الـ ٦' : 'WhatsApp Cloud API, Meta channels, collision detection',
      status: 'live',
      statusText: isAr ? 'يعمل بنجاح (Live Beta)' : 'Live Beta',
      targetTab: 'omnichannel' as TabType,
      tech: 'Meta Cloud API • Chatwoot Engine • Socket.io',
      icon: MessageSquare,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'sys-pharma',
      name: isAr ? 'مصنع فارما كود للأدوية التخصصية' : 'Pharma Code Specialty Manufacturing',
      desc: isAr ? 'تصنيع أدوية الأورام، الحقن المجهري (ICSI)، والأدوية الحيوية' : 'Sister company: Biologics, Oncology & ICSI medications',
      status: 'scaling',
      statusText: isAr ? 'قيد التوسع ($2.0M)' : 'Scaling ($2.0M)',
      targetTab: 'investment' as TabType,
      tech: 'GMP Certified • Captive Supply Chain',
      icon: HeartPulse,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white p-6 sm:p-10 shadow-2xl border border-slate-700/50">
        
        {/* Ambient decorative elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'منصة البنداري المتكاملة • ٤٦ عاماً من الريادة الدوائية' : 'Unified El-Bendary Ecosystem • 46 Years of Heritage'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {isAr
              ? 'المنظومة الرقمية الشاملة لمجموعة صيدليات البنداري'
              : 'El-Bendary Pharmacies Group Unified Enterprise Platform'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'دمج متكامل لـ ٥ منظومات حيوية: إدارة شبكة الفروع الـ ١٧ بالدلتا والقاهرة، التجارة الإلكترونية، نظام فارماسيست ERP، خدمة العملاء SOLA عبر واتساب الرسمي، ومصنع فارما كود للأدوية التخصصية.'
              : 'End-to-end integration across all 5 systems: 17 operating retail branches, B2C e-commerce & Rx delivery, Pharmasyst ERP, omni-channel customer service, and specialty pharmaceutical manufacturing.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-700/60">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {isAr ? 'تاريخ التأسيس' : 'Founded'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white">1980</span>
              <span className="text-[10px] text-red-400 block">{isAr ? '٤٦ عاماً متواصلة' : '46 Years Trust'}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {isAr ? 'شبكة الفروع' : 'Current Footprint'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">17 {isAr ? 'فرع' : 'Branches'}</span>
              <span className="text-[10px] text-slate-300 block">{isAr ? 'مستهدف: ٣٠ فرعاً' : 'Target: 30'}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {isAr ? 'المناقصات الحكومية' : 'Tender Contracts'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-400">30+ {isAr ? 'عقد' : 'Tenders'}</span>
              <span className="text-[10px] text-slate-300 block">{isAr ? 'استقرار مالي مؤسسي' : 'Institutional Procurement'}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {isAr ? 'إيرادات سابقة مدققة' : 'Audited Revenue'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">€4.2M</span>
              <span className="text-[10px] text-slate-300 block">{isAr ? 'تدقيق محاسبي رسمي' : 'Audited / Stamped'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Architecture Flow Diagram */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'مخطط تدفق البنية المعمارية للمنظومة (Architecture Flow)' : 'Platform Architecture Flow Diagram'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'كيف تتكامل نقاط البيع، المخازن، المصنع، والمحادثات اللحظية عبر محور موحد'
                : 'How retail, ERP, e-commerce, and manufacturing operate in unified real-time synchronization'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPowerBI}
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isAr ? 'لوحة تحليلات Power BI' : 'Live Power BI'}</span>
            </button>
            <button
              onClick={onOpenPharmasystModal}
              className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'بوابة Pharmasyst (admin6)' : 'Pharmasyst API'}</span>
            </button>
          </div>
        </div>

        {/* Visual Architecture Diagram Graphic */}
        <div className="mt-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            
            {/* Left: Omnichannel & Customers */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'قنوات العملاء الموحدة (SOLA)' : 'Customer Channels (SOLA)'}</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>WhatsApp Cloud API (+20 01200400089)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Meta Messenger & Instagram Direct</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>bendaryph.com Web & Android App</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>AI Rx Extraction & Collision Detection</span>
                </li>
              </ul>
            </div>

            {/* Middle: Central Core ERP & Pharmasyst */}
            <div className="p-4 bg-gradient-to-b from-red-500/10 to-transparent dark:from-red-950/30 dark:to-transparent rounded-xl border-2 border-red-500/40 shadow-sm space-y-3 relative">
              <div className="flex items-center justify-between text-red-600 dark:text-red-400 font-bold text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{isAr ? 'المحور السحابي المركزي (Unified Core)' : 'Unified Central ERP Core'}</span>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] bg-red-600 text-white rounded font-mono">admin6</span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                  bindary.pharmasyst.net
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isAr
                    ? 'المزامنة الفورية للمخزون، نقاط البيع، سجلات الأدوية التخصصية، ومطابقة الفواتير الضريبية الإلكترونية.'
                    : 'Real-time multi-branch inventory ledger, POS replication, low-stock threshold triggers, and audit registers.'}
                </p>
              </div>
            </div>

            {/* Right: Operational Branches & Manufacturing */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                <Building2 className="w-4 h-4" />
                <span>{isAr ? 'العمليات والتصنيع الشقيق' : 'Retail & Manufacturing'}</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>17 Branches (Tanta, Mansoura, Cairo...)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Pharma Code (Biologics & ICSI)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>30+ Institutional Government Tenders</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Cold-Chain IoT & Narcotics Register</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{isAr ? 'تكامل كامل عبر API مشفر وآمن' : 'Encrypted REST & WebSocket Real-time Sync'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{isAr ? 'زمن الاستجابة التبادلي: أقل من 50ms' : 'Average Latency < 50ms'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Systems Status Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? 'المنظومات الخمس المتكاملة (All 5 Systems)' : 'The 5 Core Systems Overview'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'انقر على أي منظومة للانتقال للوحة التحكم الخاصة بها فوراً' : 'Click any card to launch its dedicated interactive workspace'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemsMatrix.map((sys) => {
            const IconComponent = sys.icon;
            return (
              <div
                key={sys.id}
                onClick={() => onSelectTab(sys.targetTab)}
                className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${sys.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {sys.statusText}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                    {sys.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {sys.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">{sys.tech}</span>
                  <span className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition">
                    <span>{isAr ? 'فتح' : 'View'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* $8M Funding Pillars with Proportional Bars */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'توزيع جولة الاستثمار: ٨ ملايين دولار عبر ٤ محاور' : 'The $8M Raise Across Four Strategic Pillars'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'استخدام الأموال للتحول إلى مجموعة دوائية متكاملة رأسياً (Retail + Manufacturing + E-Commerce)'
                : 'Targeted capital allocation driving the shift to a vertically integrated pharmaceutical group'}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('investment')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>{isAr ? 'عرض الملف الاستثماري الكامل' : 'Open Pitch Deck Room'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Proportional Stacked Bar */}
        <div className="mt-6">
          <div className="w-full h-5 rounded-xl overflow-hidden flex bg-slate-100 dark:bg-slate-800 shadow-inner">
            {FUNDING_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                style={{ width: `${pillar.percentage}%`, backgroundColor: pillar.color }}
                className="h-full relative group transition-all duration-300 hover:opacity-90"
                title={`${pillar.title}: ${pillar.amount} (${pillar.percentage}%)`}
              />
            ))}
          </div>

          {/* Pillars Cards Breakdown */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUNDING_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pillar.color }}
                    />
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {pillar.amount}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {isAr ? pillar.titleAr : pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {isAr ? pillar.descriptionAr : pillar.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{isAr ? 'نسبة التخصيص:' : 'Allocation:'}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{pillar.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
