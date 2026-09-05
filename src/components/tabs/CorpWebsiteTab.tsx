import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  ExternalLink, 
  ChevronRight, 
  Building, 
  Award,
  QrCode,
  Wallet,
  Copy,
  Check,
  Truck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Thermometer,
  HeartHandshake,
  UserCheck,
  Shield,
  Star,
  Users
} from 'lucide-react';
import { Branch, CustomerReview, CustomerAccount, Language } from '../../types';
import { BranchMap } from '../BranchMap';
import { ReviewsSection } from '../ReviewsSection';
import { Logo } from '../Logo';

interface CorpWebsiteTabProps {
  lang: Language;
  branches: Branch[];
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
  onOpenRxModal: () => void;
  onNavigateToEcom: () => void;
  onOpenInstaPayModal?: () => void;
  customerAccount?: CustomerAccount | null;
  onOpenCustomerAuth?: () => void;
}

export const CorpWebsiteTab: React.FC<CorpWebsiteTabProps> = ({
  lang,
  branches,
  reviews,
  onAddReview,
  onOpenRxModal,
  onNavigateToEcom,
  onOpenInstaPayModal,
  customerAccount,
  onOpenCustomerAuth
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const isAr = lang === 'ar';
  const instaPayUrl = 'https://ipn.eg/S/haithamelbendary/instapay/0xKgNF';
  const hotlinePhone = '01200400094';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(instaPayUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const insurancePartners = [
    { name: 'MetLife Egypt', nameAr: 'متلايف لتأمينات الحياة', network: 'Tier A+ Open Network', directBill: true },
    { name: 'AXA OneHealth', nameAr: 'أكسا للرعاية الصحية', network: 'Comprehensive Network', directBill: true },
    { name: 'Misr Insurance', nameAr: 'مصر للتأمين الحكومية', network: 'National Tenders & Syndicates', directBill: true },
    { name: 'Bupa Global', nameAr: 'بوبا العالمية للتأمين الصحي', network: 'VIP Elite Network', directBill: true },
    { name: 'NextCare Egypt', nameAr: 'نكست كير مصر', network: 'Corporate TPA Gateway', directBill: true },
    { name: 'Prime Health', nameAr: 'برايم هيلث للخدمات الطبية', network: 'Delta & Cairo Network', directBill: true },
    { name: 'Medical Syndicates', nameAr: 'نقابات الأطباء والمهندسين والصيادلة', network: 'Special Discount & Chronic Care', directBill: true },
    { name: 'Arab Contractors Fund', nameAr: 'صندوق المقاولون العرب', network: 'Institutional Tender Program', directBill: true },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Top Emergency & Hotline Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <span className="font-bold">
            {isAr 
              ? 'الخط الساخن الموحد للطلبات، الاستشارات الصيدلانية وخدمة التوصيل على مدار ٢٤ ساعة:' 
              : 'Unified 24/7 Hotline for Orders, Clinical Rx & Home Delivery:'}
          </span>
          <a 
            href={`tel:${hotlinePhone}`} 
            className="font-mono text-sm font-black bg-white/20 hover:bg-white text-white hover:text-red-700 px-3 py-1 rounded-lg transition"
          >
            {hotlinePhone}
          </a>
        </div>

        <div className="flex items-center gap-2">
          {onOpenInstaPayModal && (
            <button
              onClick={onOpenInstaPayModal}
              className="px-3 py-1 bg-white text-purple-700 hover:bg-purple-50 font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{isAr ? 'الدفع إنستاباي' : 'InstaPay'}</span>
            </button>
          )}

          <a
            href={`https://wa.me/201200400094?text=${encodeURIComponent(
              isAr ? 'السلام عليكم صيدليات البنداري، أود الاستفسار وعمل طلب جديد.' : 'Hello El-Bendary Pharmacies, I would like to place an order.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'محادثة واتساب' : 'WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* Welcoming Corporate Hero Section */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-100/90 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-xs font-bold rounded-full border border-red-200 dark:border-red-900">
              <Award className="w-4 h-4 text-red-600" />
              <span>
                {isAr 
                  ? 'صيدليات البنداري • ٤٦ عاماً من الريادة الدوائية (تأسست عام ١٩٨٠)' 
                  : 'El-Bendary Pharmacies • 46 Years of Pharmaceutical Excellence (Since 1980)'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {isAr
                ? 'رعايتكم الصحية أمانتنا.. صرح دوائي متكامل يغطي الدلتا والقاهرة'
                : 'Your Health Is Our Trust: Premier Pharmaceutical Network Across Delta & Cairo'}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'مرحباً بكم في صيدليات البنداري، كبرى سلاسل الصيدليات المعتمدة في وسط الدلتا والقاهرة. نقدم رعاية صيدلانية إكلينيكية متخصصة، صرف دقيق لروشتات التأمين الطبي والنقابات، أحدث ثلاجات حفظ أدوية الحقن المجهري والبيولوجيكس في سلاسل تبريد مراقبة رقمياً، مع أسرع أسطول توصيل منزلي عبر الرقم الموحد 01200400094.'
                : 'Welcome to El-Bendary Pharmacies, the premier certified pharmacy chain serving the Delta and Greater Cairo. We deliver clinical dispensing, direct insurance billing, 2-8°C cold-chain biologics care, and rapid door-to-door delivery via hotline 01200400094.'}
            </p>

            {/* Quick Action CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/201200400094?text=${encodeURIComponent(
                  isAr ? 'السلام عليكم، أود طلب علاج وتوصيل فوري من صيدليات البنداري.' : 'Hello, I want to order medications for delivery.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'اطلب بالواتساب: 01200400094' : 'WhatsApp: 01200400094'}</span>
              </a>

              <button
                onClick={onOpenRxModal}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{isAr ? 'ارفع روشتتك الطبية أونلاين' : 'Upload Prescription (Rx)'}</span>
              </button>

              {onOpenInstaPayModal && (
                <button
                  onClick={onOpenInstaPayModal}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isAr ? 'الدفع إنستاباي (QR Code)' : 'Pay via InstaPay'}</span>
                </button>
              )}

              <button
                onClick={onNavigateToEcom}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-2"
              >
                <span>{isAr ? 'الكتالوج الدوائي والتجميلي' : 'Catalog'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Strategic Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="block text-red-600 font-bold text-xl font-mono">15+</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{isAr ? 'فرعاً معتمداً' : 'Branches'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="block text-emerald-600 font-bold text-xl font-mono">24/7</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{isAr ? 'خدمة وصيدلي مناوب' : '24/7 Service'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="block text-blue-600 font-bold text-xl font-mono">2-8°C</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{isAr ? 'سلاسل تبريد ذكية' : 'Cold Chain'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="block text-purple-600 font-bold text-xl font-mono">IPN</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{isAr ? 'إنستاباي ومحافظ' : 'InstaPay / Wallets'}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card with Authentic Logo & Storefront Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
                alt="El-Bendary Pharmacy Flagship Storefront"
                className="w-full h-[420px] object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md">
                    <Logo size="sm" showSubtitle={false} />
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/90 text-white font-bold text-[11px] rounded-lg shadow">
                    {isAr ? 'فرع الجلاء النموذجي' : 'Flagship Branch'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'طنطا • تقاطع شارع الجلاء وسعيد' : 'Tanta • El-Galaa & Saeed St.'}</span>
                  </div>
                  <h4 className="text-lg font-black tracking-tight">
                    {isAr ? 'إدارة صيدليات البنداري' : 'El-Bendary Pharmacies General Directorate'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr 
                      ? 'خط التوصيل والطلبات الموحد: 01200400094 • توفير فوري لكافة الأدوية الناقصة وبدائلها الآمنة' 
                      : 'Unified Hotline: 01200400094 • Complete stock of chronic, IVF, and rare specialty medicines'}
                  </p>
                  <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {isAr ? 'خدمة ٢٤ ساعة يومياً' : '24/7 Every Day'}
                    </span>
                    <span>•</span>
                    <span className="text-purple-300 font-bold">
                      {isAr ? 'دعم إنستاباي والمحافظ' : 'InstaPay Accepted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Gmail Customer Account Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center p-2.5 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">
                  {customerAccount 
                    ? (isAr ? `أهلاً بك، ${customerAccount.name}` : `Welcome back, ${customerAccount.name}`)
                    : (isAr ? 'انضم إلى برنامج ولاء عملاء صيدليات البنداري' : 'Join El-Bendary Verified Health Club')}
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  {isAr ? 'موثق عبر Gmail' : 'Gmail Verified'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {customerAccount 
                  ? (isAr ? `رصيد نقاطك الحالي: ${customerAccount.loyaltyPoints} نقطة • استمتع بخصومات حصرية وتوصيل سريع` : `Your balance: ${customerAccount.loyaltyPoints} points • Enjoy exclusive discounts & priority delivery`)
                  : (isAr ? 'سجل حسابك الآن ببريدك الإلكتروني (Gmail) واحصل فوراً على ١٠٠ نقطة رعاية ترحيبية وتتبع دائم لروشتاتك.' : 'Register now with your Gmail to get 100 welcome reward points and live Rx tracking.')}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCustomerAuth}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 shrink-0"
          >
            <UserCheck className="w-4 h-4" />
            <span>{customerAccount ? (isAr ? 'عرض ملفي الشخصي' : 'View My Profile') : (isAr ? 'تسجيل الدخول بالـ Gmail' : 'Register / Sign In')}</span>
          </button>
        </div>
      </div>

      {/* Official InstaPay & Digital Wallets Showcase Section */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-bold rounded-full">
              <QrCode className="w-3.5 h-3.5 text-pink-300" />
              <span>{isAr ? 'الدفع الإلكتروني المعتمد - إنستاباي والمحافظ الذكية' : 'Official Digital Payment: InstaPay & Wallets'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              {isAr
                ? 'ادفع قيمة أدويتك وطلباتك فوراً عبر إنستاباي أو المحفظة الإلكترونية'
                : 'Instant Cashless Payment via InstaPay or Mobile Wallets'}
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-2xl">
              {isAr
                ? 'لتسهيل عملية الدفع لعملائنا الكرام، وفرت صيدليات البنداري رابطاً ورمز QR موثقاً للدفع السريع عبر شبكة المدفوعات اللحظية (InstaPay IPN) وكافة المحافظ الإلكترونية (فودافون كاش، أورانج كاش، اتصالات كاش، وي باي).'
                : 'For the convenience of our patients, El-Bendary Pharmacies provides official direct InstaPay IPN and Mobile Wallet payments with instant order dispatch.'}
            </p>

            {/* Clickable Link Box */}
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] text-purple-300 font-bold block">
                    {isAr ? '🔗 رابط إنستاباي الرسمي المباشر:' : '🔗 Official Direct InstaPay Link:'}
                  </span>
                  <a
                    href={instaPayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs sm:text-sm text-white hover:text-pink-300 underline font-bold break-all flex items-center gap-1.5"
                  >
                    <span>{instaPayUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy Link')}</span>
                  </button>

                  <a
                    href={instaPayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                  >
                    <span>{isAr ? 'ادفع الآن' : 'Pay Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-purple-200">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'الحساب المعتمد:' : 'Verified Account:'}</span>
                  <span className="font-bold text-white font-mono">El-Bendary Pharmacies IPN</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'المحفظة / واتساب:' : 'Wallet / WhatsApp:'}</span>
                  <span className="font-mono font-bold text-white">{hotlinePhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-3xl shadow-2xl text-slate-900 text-center max-w-xs w-full">
              <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wide mb-1.5">
                Scan with InstaPay App
              </div>
              <div className="p-2 border-2 border-purple-200 rounded-2xl inline-block bg-purple-50/50">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=2&data=${encodeURIComponent(instaPayUrl)}`}
                  alt="InstaPay Official QR Code"
                  className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-slate-800">
                {isAr ? 'رمز الدفع اللحظي المعتمد' : 'Verified QR Payment'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                01200400094 | elbendary@instapay
              </div>
              {onOpenInstaPayModal && (
                <button
                  onClick={onOpenInstaPayModal}
                  className="mt-3 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {isAr ? 'عرض تفاصيل الدفع والتحويل' : 'Open Payment Guide'}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Core Services Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {isAr ? 'خدمات صيدليات البنداري المتكاملة' : 'Our Comprehensive Pharmacy Services'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isAr 
              ? 'معايير رعاية طبية متقدمة تغطي كافة احتياجاتك العلاجية مع التوصيل الفوري'
              : 'Precision clinical care designed to satisfy all therapeutic and wellness needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Prescription & Insurance */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/70 text-red-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'صرف الروشتات والتأمين الطبي' : 'Prescription & Insurance Dispensing'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'تعاقدات مباشرة مع كبرى شركات التأمين (متلايف، أكسا، نكست كير، مصر للتأمين) مع موافقة فورية وصرف دقيق للأدوية والبدائل الآمنة.'
                : 'Direct billing with top healthcare insurers (MetLife, AXA, NextCare, Misr Insurance) with instant approvals and patient safety checks.'}
            </p>
            <button
              onClick={onOpenRxModal}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <span>{isAr ? 'ارفع روشتتك الآن' : 'Upload Your Rx'}</span>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          {/* Card 2: Biologics & Cold Chain */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'أدوية الحقن المجهري والبيولوجيكس' : 'Biologics & Fertility Cold Chain'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'حفظ مضمون في ثلاجات تبريد ذكية مضبوطة بين ٢ إلى ٨ درجات مئوية لحفظ هرمونات وأدوية الحقن المجهري وأدوية الأورام بأمان تام.'
                : 'Guaranteed 2-8°C IoT temperature-monitored cold storage for IVF, fertility hormones, and oncology biologic products.'}
            </p>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
              {isAr ? 'مراقبة إلكترونية ٢٤/٧' : '24/7 Monitored'}
            </span>
          </div>

          {/* Card 3: 24/7 Door Delivery */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'توصيل منزلي سريع على مدار ٢٤ ساعة' : '24/7 Rapid Door Delivery'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'أسطول توصيل متخصص يغطي طنطا، المنصورة، المحلة، الزقازيق والقاهرة في أقل من ٤٥ دقيقة مع حقائب عزل حراري للأدوية الحساسة.'
                : 'Dedicated dispatch covering Tanta, Mansoura, Mahalla, Zagazig and Cairo in under 45 minutes with insulated medical carriers.'}
            </p>
            <a
              href={`tel:${hotlinePhone}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
            >
              <span>{hotlinePhone}</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Interactive Map of Branches (Outstanding User Request) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'خريطة فروع صيدليات البنداري' : 'Interactive Pharmacy Branch Network'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr 
                ? 'استكشف مواقع وأرقام هواتف فروعنا الـ ١٥ في طنطا، المحلة، المنصورة، الزقازيق والقاهرة' 
                : 'Explore locations and direct phone lines for our 15 branches in Tanta, Delta, and Cairo'}
            </p>
          </div>
          <a
            href={`tel:${hotlinePhone}`}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isAr ? 'الطلب المركزي: 01200400094' : 'Central Dispatch: 01200400094'}</span>
          </a>
        </div>

        <BranchMap 
          branches={branches}
          lang={lang}
          onOrderToBranch={(branch) => onOpenRxModal()}
          height="h-[620px]"
        />
      </div>

      {/* Customer Reviews & Testimonials Section (Outstanding User Request) */}
      <ReviewsSection
        lang={lang}
        reviews={reviews}
        branches={branches}
        onAddReview={onAddReview}
      />

      {/* Insurance & Tenders Partners Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{isAr ? 'شركاء التأمين الطبي والنقابات المعتمدة' : 'Accredited Medical Insurance & Syndicate Partners'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'ربط مباشر بالمطالبات الإلكترونية لضمان سرعة الصرف بدون تعقيد إداري'
                : 'Direct digital claim processing for rapid medication dispensing and zero hassle'}
            </p>
          </div>
          <button
            onClick={onOpenRxModal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            {isAr ? 'فحص بطاقة التأمين والروشتة' : 'Check Insurance Coverage'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {insurancePartners.map((ins, i) => (
            <div
              key={i}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 text-center hover:border-emerald-500 transition group"
            >
              <Building className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mx-auto mb-2 transition" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? ins.nameAr : ins.name}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                {isAr ? 'ربط إلكتروني مباشر' : 'Direct e-Billing'}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
