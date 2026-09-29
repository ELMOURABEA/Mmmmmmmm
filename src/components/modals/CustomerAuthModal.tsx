import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Lock,
  KeyRound,
  LogOut,
  Gift
} from 'lucide-react';
import { CustomerAccount, Language } from '../../types';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  account: CustomerAccount | null;
  onSaveAccount: (account: CustomerAccount | null) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  account,
  onSaveAccount
}) => {
  const [authMode, setAuthMode] = useState<'google_quick' | 'register_form' | 'otp_step'>('google_quick');
  const [formData, setFormData] = useState({
    name: 'Mahmoud El Mourabea',
    email: 'm.elmourabea@gmail.com',
    phone: '01200400094',
    city: 'Tanta',
    address: 'El-Galaa St., Tanta'
  });
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Handle Quick Google Sign-In
  const handleQuickGoogleSignIn = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const newAccount: CustomerAccount = {
        id: `cust-${Date.now()}`,
        name: formData.name || 'El-Bendary Customer',
        email: formData.email.endsWith('@gmail.com') ? formData.email : `${formData.email.split('@')[0]}@gmail.com`,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        phone: formData.phone || '01200400094',
        verifiedWithGmail: true,
        googleId: 'google-oauth2|verified-account',
        joinedDate: new Date().toISOString().split('T')[0],
        loyaltyPoints: 100, // Welcome bonus points
        savedAddresses: [
          {
            id: 'addr-1',
            label: lang === 'ar' ? 'المنزل (طنطا)' : 'Home (Tanta)',
            address: formData.address || 'شارع الجلاء - طنطا',
            city: formData.city || 'Tanta',
            isDefault: true
          }
        ]
      };

      onSaveAccount(newAccount);
      setIsVerifying(false);
      onClose();
    }, 600);
  };

  // Handle Form Registration Step
  const handleStartRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.toLowerCase().includes('gmail.com')) {
      setErrorMsg(lang === 'ar' ? 'يجب استخدام عنوان بريد Gmail صالح (@gmail.com)' : 'Please use a valid Gmail address (@gmail.com)');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setAuthMode('otp_step');
    setOtpCode('849210'); // Simulated OTP
  };

  const handleVerifyOtp = () => {
    if (otpCode !== '849210') {
      setErrorMsg(lang === 'ar' ? 'رمز التحقق غير صحيح، برجاء التأكد من الرمز' : 'Invalid OTP code. Please check code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const newAccount: CustomerAccount = {
        id: `cust-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        phone: formData.phone,
        verifiedWithGmail: true,
        googleId: `google-gmail|${Date.now()}`,
        joinedDate: new Date().toISOString().split('T')[0],
        loyaltyPoints: 100,
        savedAddresses: [
          {
            id: 'addr-1',
            label: lang === 'ar' ? 'المنزل' : 'Home',
            address: formData.address,
            city: formData.city,
            isDefault: true
          }
        ]
      };

      onSaveAccount(newAccount);
      setIsVerifying(false);
      onClose();
    }, 500);
  };

  const handleSignOut = () => {
    onSaveAccount(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {account 
                  ? (lang === 'ar' ? 'الملف الشخصي للعميل' : 'Customer Account Profile')
                  : (lang === 'ar' ? 'تسجيل حساب موثق بالـ Gmail' : 'Gmail-Verified Customer Account')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {account 
                  ? (lang === 'ar' ? 'بيانات الحساب وبرنامج نقاط الرعاية الصحية' : 'Manage your orders, prescriptions & points')
                  : (lang === 'ar' ? 'تسجيل فوري وآمن عبر حساب Google الرسمي' : 'Fast and secure onboarding with Google')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {account ? (
            /* Logged-in Customer View */
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <img 
                  src={account.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                  alt={account.name}
                  className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-700 shadow-sm object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{account.name}</h4>
                    {account.verifiedWithGmail && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'موثق عبر Gmail' : 'Gmail Verified'}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-red-500" />
                    <span>{account.email}</span>
                  </p>
                  {account.phone && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{account.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Loyalty & Rewards Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-200" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-100">
                      {lang === 'ar' ? 'برنامج ولاء صيدليات البنداري' : 'El-Bendary Health Loyalty Club'}
                    </span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-bold">
                    {lang === 'ar' ? 'عميل متميز' : 'VIP Member'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{account.loyaltyPoints}</span>
                  <span className="text-xs font-medium text-red-100">
                    {lang === 'ar' ? 'نقطة رعاية (تساوي ٧٦ جنيه مصري خصم)' : 'points (Value: 76 EGP discount)'}
                  </span>
                </div>
              </div>

              {/* Saved Addresses */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {lang === 'ar' ? 'عناوين التوصيل المسجلة' : 'Saved Delivery Addresses'}
                </h5>
                <div className="space-y-2">
                  {account.savedAddresses.map((addr) => (
                    <div key={addr.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white mr-1.5">{addr.label}:</span>
                          <span className="text-slate-600 dark:text-slate-400">{addr.address} ({addr.city})</span>
                        </div>
                      </div>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-bold">
                          {lang === 'ar' ? 'الافتراضي' : 'Default'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  {lang === 'ar' ? `تاريخ الانضمام: ${account.joinedDate}` : `Member since: ${account.joinedDate}`}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Auth / Register Flow */
            <div className="space-y-4">
              {/* Quick Google Sign In Button */}
              <div className="text-center space-y-3">
                <button
                  type="button"
                  onClick={handleQuickGoogleSignIn}
                  disabled={isVerifying}
                  className="w-full py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow active:scale-[0.99]"
                >
                  {/* Google Multicolor 'G' icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>
                    {isVerifying 
                      ? (lang === 'ar' ? 'جاري التحقق عبر Google...' : 'Verifying via Google...') 
                      : (lang === 'ar' ? 'المتابعة والتسجيل باستخدام Google (Gmail)' : 'Continue & Verify with Google (Gmail)')}
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200 dark:border-slate-700"></div>
                  <span className="text-xs font-semibold text-slate-400">
                    {lang === 'ar' ? 'أو أدخل بياناتك مع التحقق بالبريد' : 'or enter details with Gmail verification'}
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:border-slate-700"></div>
                </div>
              </div>

              {authMode === 'otp_step' ? (
                /* OTP Verification Step */
                <div className="space-y-4 py-2">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">
                        {lang === 'ar' 
                          ? `تم إرسال رمز التحقق إلى: ${formData.email}` 
                          : `Verification code sent to: ${formData.email}`}
                      </p>
                      <p className="text-[11px] opacity-90 mt-0.5">
                        {lang === 'ar' ? 'رمز التأكيد التجريبي الجاهز هو: 849210' : 'Demo OTP ready to fill: 849210'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ar' ? 'رمز التحقق (٦ أرقام)' : '6-Digit Verification Code'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="849210"
                        className="flex-1 py-2 px-3 text-center tracking-widest text-lg font-black bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setOtpCode('849210')}
                        className="px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200"
                      >
                        {lang === 'ar' ? 'ملء تلقائي' : 'Auto Fill'}
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || otpCode.length < 6}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isVerifying ? (lang === 'ar' ? 'جاري التأكيد...' : 'Verifying...') : (lang === 'ar' ? 'تأكيد الحساب وتفعيله' : 'Verify & Activate Account')}</span>
                  </button>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleStartRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ar' ? 'بريد Gmail المعتمد (@gmail.com)' : 'Gmail Address (@gmail.com)'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'ar' ? 'رقم الهاتف' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'ar' ? 'المدينة' : 'City'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{lang === 'ar' ? 'إرسال كود التحقق بالـ Gmail' : 'Send Gmail Verification Code'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
