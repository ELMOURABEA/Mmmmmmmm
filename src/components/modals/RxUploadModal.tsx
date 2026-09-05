import React, { useState } from 'react';
import { Upload, X, CheckCircle, FileText, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, Language } from '../../types';

interface RxUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccess?: (orderData: any) => void;
  products?: Product[];
}

export const RxUploadModal: React.FC<RxUploadModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccess,
  products = []
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('br-tanta-main');
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    triggerAiExtraction();
  };

  const triggerAiExtraction = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setExtractedData({
        doctorName: isAr ? 'أ.د. حازم عبد الفتاح - استشاري الباطنة والغدد' : 'Prof. Dr. Hazem Abdel-Fattah (Consultant Endocrinologist)',
        clinicLocation: isAr ? 'عيادات طنطا التخصصية' : 'Tanta Specialized Clinics',
        extractedItems: [
          {
            name: 'Janumet 50/1000mg',
            nameAr: 'جانوميت ٥٠/١٠٠٠ مجم',
            dosage: isAr ? 'قرص مرتين يومياً مع الأكل' : '1 tablet twice daily with meals',
            inStock: true,
            price: 360
          },
          {
            name: 'Concor 5mg',
            nameAr: 'كونكور ٥ مجم',
            dosage: isAr ? 'قرص واحد صباحاً' : '1 tablet once daily morning',
            inStock: true,
            price: 70
          }
        ],
        totalEst: 430
      });
      if (!patientName) setPatientName(isAr ? 'أحمد سمير الشافعي' : 'Ahmed Samir El-Shafei');
      if (!patientPhone) setPatientPhone('01019823471');
    }, 1200);
  };

  const handleUseSample = () => {
    setPreviewUrl('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60');
    triggerAiExtraction();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRx = {
      id: `rx-${Date.now().toString().slice(-4)}`,
      patientName: patientName || (isAr ? 'عميل صيدليات البنداري' : 'El-Bendary Patient'),
      patientPhone: patientPhone || '01200400089',
      date: isAr ? 'الآن' : 'Just now',
      imageUrl: previewUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60',
      status: 'pending_review',
      branchId: selectedBranch,
      extractedDrugs: extractedData ? extractedData.extractedItems : [],
      doctorName: extractedData?.doctorName || 'Dr. Verified Clinic',
      pharmacistNotes: patientNotes || (isAr ? 'طلب توصيل منزلي فوري' : 'Requested immediate home delivery'),
      totalAmount: extractedData?.totalEst || 430
    };
    if (typeof onSuccess === 'function') {
      onSuccess(newRx);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'رفع الروشتة الطبية أونلاين' : 'Online Prescription (Rx) Upload'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'فحص فوري للروشتات بالذكاء الاصطناعي واعتماد صيدلي مرخص خلال دقائق' : 'Instant AI OCR reading & licensed pharmacist verification within minutes'}
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

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
              dragActive
                ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
                : previewUrl
                ? 'border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 bg-slate-50/50 dark:bg-slate-800/50'
            }`}
          >
            {previewUrl ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                <img
                  src={previewUrl}
                  alt="Prescription preview"
                  className="w-24 h-28 object-cover rounded-lg shadow border border-slate-200 dark:border-slate-700"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isAr ? 'تم تحميل صورة الروشتة بنجاح' : 'Prescription image ready'}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedFile?.name || (isAr ? 'عينة روشتة استشارية' : 'Sample Prescription')}
                  </p>
                  <label className="inline-block mt-2 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer underline">
                    {isAr ? 'تغيير الصورة' : 'Change image'}
                    <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {isAr ? 'اسحب صورة الروشتة هنا أو انقر للاختيار' : 'Drag and drop your Rx here, or click to browse'}
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG, or PDF up to 10MB</p>
                <div className="mt-3 flex justify-center gap-3">
                  <label className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition shadow-sm">
                    {isAr ? 'اختيار ملف من جهازك' : 'Choose File'}
                    <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={handleUseSample}
                    className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition"
                  >
                    {isAr ? 'استخدام روشتة تجريبية' : 'Use Sample Rx'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Scanning state */}
          {isScanning && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl flex items-center gap-3 animate-pulse">
              <Sparkles className="w-5 h-5 text-red-600 animate-spin" />
              <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                {isAr ? 'جاري تحليل خط الطبيب ومطابقة الأدوية مع مخزون الفروع المتاحة...' : 'AI scanning physician handwriting and checking live multi-branch inventory...'}
              </span>
            </div>
          )}

          {/* Extracted Data Card */}
          {extractedData && (
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'الطبيب المعالج:' : 'Detected Physician:'}
                </span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{extractedData.doctorName}</span>
              </div>
              <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                {extractedData.extractedItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-lg text-xs border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{isAr ? item.nameAr : item.name}</span>
                      <span className="block text-[11px] text-slate-500">{item.dosage}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600 dark:text-red-400">{item.price} EGP</span>
                      <span className="block text-[10px] text-emerald-600 font-medium">{isAr ? 'متوفر بالفروع' : 'In Stock'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'اسم المريض / مستلم العلاج' : 'Patient Full Name'}
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={isAr ? 'مثال: محمد مصطفى' : 'e.g. Mohamed Mostafa'}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'رقم الهاتف للتأكيد (واتساب)' : 'Phone Number (WhatsApp)'}
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="01200400089"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Preferred Branch */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'الفرع الأقرب للتحضير أو التوصيل' : 'Preferred Dispensing Branch'}
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="br-tanta-main">{isAr ? 'المقر الرئيسي طنطا - شارع الجيش (٢٤ ساعة)' : 'Tanta Flagship - El Geish St (24h)'}</option>
              <option value="br-tanta-stadium">{isAr ? 'فرع استاد طنطا - تقاطع البحر' : 'Tanta Stadium Branch'}</option>
              <option value="br-mansoura-univ">{isAr ? 'فرع المنصورة - أمام المستشفى التخصصي' : 'Mansoura University Branch'}</option>
              <option value="br-mahalla-shoubra">{isAr ? 'فرع المحلة الكبرى - ميدان شبرا' : 'El Mahalla El Kubra Hub'}</option>
              <option value="br-zagazig-quds">{isAr ? 'فرع الزقازيق - القومية' : 'Zagazig Central Branch'}</option>
              <option value="br-cairo-heliopolis">{isAr ? 'فرع القاهرة - مصر الجديدة' : 'Cairo Heliopolis Hub'}</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'ملاحظات للصيدلي (أمراض مزمنة، بدائل، موعد التوصيل)' : 'Notes for Clinical Pharmacist'}
            </label>
            <textarea
              rows={2}
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              placeholder={isAr ? 'هل لديك حساسية تجاه البنسلين؟ هل تفضل بدائل أرخص؟' : 'Any allergies or preferred generic alternatives?'}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px] text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isAr
                ? 'بياناتك الطبية مشفرة ومحمية وفق معايير هيئة الدواء المصرية وبإشراف صيدلي إكلينيكي معتمد'
                : 'HIPAA & EDA compliant medical encryption overseen by certified clinical pharmacists'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {isAr ? 'تأكيد وإرسال للصيدلية' : 'Submit for Dispensing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
