import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Building, Sparkles, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { Language, TabType } from '../types';

interface FooterProps {
  lang: Language;
  onSelectTab: (tab: TabType) => void;
  onOpenRxModal: () => void;
  onOpenPharmasystModal: () => void;
  onOpenInstaPayModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectTab,
  onOpenRxModal,
  onOpenPharmasystModal,
  onOpenInstaPayModal
}) => {
  const isAr = lang === 'ar';
  const instaPayUrl = 'https://ipn.eg/S/haithamelbendary/instapay/0xKgNF';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Heritage column */}
          <div className="space-y-4">
            <Logo size="lg" showSubtitle={true} dark={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'مجموعة صيدليات البنداري تأسست عام ١٩٨٠. أكثر من ٤٦ عاماً من الريادة في خدمة صحة الأسرة المصرية عبر ١٥ فرعاً مجهزاً بالدلتا والقاهرة وتوريد كبرى المناقصات الحكومية والمؤسسية.'
                : 'Founded in 1980, El-Bendary Pharmacies Group has served Egyptian healthcare for over 46 years across 15 certified branches and 30+ institutional tenders.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'مرخصة رسمياً من هيئة الدواء المصرية (EDA)' : 'Licensed by Egyptian Drug Authority (EDA)'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'المنظومات والخدمات' : 'Platforms & Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('overview')}
                  className="hover:text-red-400 transition"
                >
                  {isAr ? '• الهيكل العام والمنظومات' : '• Executive Architecture'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('corp')}
                  className="hover:text-red-400 transition"
                >
                  {isAr ? '• الرئيسية ودليل الفروع' : '• Landing Page & Branches'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ecommerce')}
                  className="hover:text-red-400 transition"
                >
                  {isAr ? '• كتالوج الأدوية ورفع الروشتة' : '• Product Catalog & Rx Upload'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('branch_ops')}
                  className="hover:text-red-400 transition"
                >
                  {isAr ? '• إدارة العمليات والمخازن (ERP)' : '• Branch Ops & Inventory ERP'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('omnichannel')}
                  className="hover:text-red-400 transition"
                >
                  {isAr ? '• خدمة العملاء الموحدة (SOLA)' : '• Omni-Channel Center (SOLA)'}
                </button>
              </li>
              <li>
                {onOpenInstaPayModal ? (
                  <button
                    onClick={onOpenInstaPayModal}
                    className="hover:text-purple-300 transition text-purple-400 font-semibold flex items-center gap-1"
                  >
                    <span>{isAr ? '• الدفع الإلكتروني عبر إنستاباي' : '• InstaPay QR Payment'}</span>
                  </button>
                ) : (
                  <a
                    href={instaPayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-300 transition text-purple-400 font-semibold flex items-center gap-1"
                  >
                    <span>{isAr ? '• رابط الدفع إنستاباي' : '• InstaPay Payment Link'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Sister Companies & Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'الشركات الشقيقة والتحالفات' : 'Group Sister Companies'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <span className="font-bold text-white block">
                  Pharma Code (فارما كود)
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {isAr ? 'تصنيع أدوية الأورام، الحقن المجهري (ICSI)، والأدوية الحيوية' : 'Specialty manufacturing: Biologics, Oncology & ICSI medications'}
                </span>
              </li>
              <li className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <span className="font-bold text-white block flex items-center justify-between">
                  <span>bendaryph.com</span>
                  <ExternalLink className="w-3 h-3 text-red-400" />
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {isAr ? 'المنصة الرقمية لتوصيل الأدوية B2C بالدلتا والقاهرة' : 'Official B2C Medicine Delivery Platform'}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Hotline */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'التواصل والإدارة العامة' : 'Corporate HQ & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'المقر الرئيسي: ٤٢ شارع الجيش، بجوار ريد للسيارات والمركز الطبي، طنطا، الغربية، مصر'
                    : 'HQ: 42 El-Geish St., Next to RED Automotive & Medical Center, Tanta, Egypt'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:01200400094" className="hover:text-white font-mono font-bold">
                  01200400094
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:ceo@bendaryph.com" className="hover:text-white font-mono">
                  ceo@bendaryph.com
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenPharmasystModal}
                  className="w-full py-2 px-3 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center justify-center gap-2 transition"
                >
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pharmasyst ERP Gateway (admin6)</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Developer Attribution & Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} El-Bendary Pharmacies Group (صيدليات البنداري). All Rights Reserved.
          </div>

          {/* Prominent Designer & Developer Badge */}
          <div className="px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 flex items-center gap-2 text-slate-200 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-[11px] font-bold text-white font-mono tracking-wide">
              design and develop by Dr.mostafa_elmourab3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
