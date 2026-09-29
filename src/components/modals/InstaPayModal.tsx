import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, ShieldCheck, Wallet, Smartphone, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface InstaPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const InstaPayModal: React.FC<InstaPayModalProps> = ({ isOpen, onClose, lang }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const instaPayUrl = 'https://ipn.eg/S/haithamelbendary/instapay/0xKgNF';
  const hotlinePhone = '01200400094';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(instaPayUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(hotlinePhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-200 dark:border-purple-900/50 animate-in fade-in zoom-in-95 duration-200"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 rtl:left-auto rtl:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 mb-3">
            <QrCode className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 uppercase tracking-wide">
              InstaPay • إنستاباي الرسمي
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {isAr ? 'حساب موثق' : 'Verified IPN'}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'الدفع الإلكتروني عبر إنستاباي والمحافظ' : 'Digital Wallet & InstaPay Payment'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr 
              ? 'صيدليات البنداري - الحساب الرقمي المعتمد لشبكة المدفوعات اللحظية IPN' 
              : 'El-Bendary Pharmacies - Official IPN Verified Digital Account'}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-slate-800/80 dark:to-purple-950/30 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/40 text-center mb-5 flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-purple-500/30 inline-block mb-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=2&data=${encodeURIComponent(instaPayUrl)}`}
              alt="InstaPay El-Bendary Pharmacies Official QR Code"
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {isAr ? 'امسح الرمز بكاميرا الموبايل أو تطبيق إنستاباي' : 'Scan this QR code with InstaPay or mobile camera'}
          </p>

          {/* Direct Link Banner */}
          <div className="w-full mt-3 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800/60 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-hidden text-left rtl:text-right">
              <span className="text-purple-600 font-bold shrink-0">🔗 الرابط:</span>
              <a 
                href={instaPayUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-700 dark:text-purple-400 font-mono text-[11px] truncate hover:underline font-bold"
              >
                {instaPayUrl}
              </a>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1 transition shadow-xs"
              title="نسخ الرابط"
            >
              {copiedLink ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-2 mb-6">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {isAr ? 'رقم المحفظة والواتساب الموحد' : 'Unified Wallet & WhatsApp Number'}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {hotlinePhone}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
              title="نسخ الرقم"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {isAr ? 'المحافظ المقبولة' : 'Accepted Wallets'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                  InstaPay • Vodafone Cash • Orange Money • Etisalat Cash • WE Pay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={instaPayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition"
          >
            <span>{isAr ? '🔗 فتح رابط إنستاباي المباشر' : '🔗 Open InstaPay Directly'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://wa.me/201200400094?text=${encodeURIComponent(
              isAr 
                ? 'السلام عليكم، قمت بإتمام التحويل عبر إنستاباي لصيدليات البنداري، وأرفق إيصال الدفع.' 
                : 'Hello, I completed payment via InstaPay for El-Bendary Pharmacies, attaching the receipt.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
          >
            <span>{isAr ? 'إرسال الإيصال بالواتساب' : 'Send Receipt via WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
