import React, { useState } from 'react';
import { Mail, X, AlertOctagon, Send, CheckCircle, Package, Building2 } from 'lucide-react';
import { Product, Language } from '../../types';

interface LowStockEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  onDispatchAlert?: (alertDetails: any) => void;
}

export const LowStockEmailModal: React.FC<LowStockEmailModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  onDispatchAlert
}) => {
  const [recipients, setRecipients] = useState('admin6@bendaryph.com, procurement@bendaryph.com, dr.mostafa@bendaryph.com');
  const [subject, setSubject] = useState('[URGENT] El-Bendary Delta Pharmacies - Low Stock & Replenishment Requisition');
  const [notes, setNotes] = useState('Immediate restocking requested from GSK, MSD, and Pharma Code manufacturing lines to avoid branch stockouts.');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      if (typeof onDispatchAlert === 'function') {
        onDispatchAlert({
          recipients,
          itemsCount: lowStockItems.length,
          timestamp: new Date().toLocaleTimeString()
        });
      }
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 1400);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'إرسال إشعارات النواقص وأوامر التوريد بالبريد' : 'Low Stock Alert & Procurement Requisition'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr
                  ? `تم رصد ${lowStockItems.length} صنفاً تجاوزت حد الأمان في مخازن فروع البنداري`
                  : `${lowStockItems.length} items flagged below safety replenishment buffer across 17 branches`}
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

        {/* Low Stock Items List */}
        <div className="mt-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            {isAr ? 'قائمة النواقص الحرجة المراد طلبها فوراً:' : 'Flagged Critical Inventory:'}
          </span>
          <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {isAr ? item.nameAr : item.name}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>SKU: {item.sku}</span>
                      <span>•</span>
                      <span>{item.manufacturer}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-red-600 text-white font-bold rounded text-[11px]">
                    {isAr ? `المتبقي: ${item.stock} علبة` : `Remaining: ${item.stock}`}
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    {isAr ? `الحد الأدنى: ${item.lowStockThreshold}` : `Threshold: ${item.lowStockThreshold}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Form */}
        <form onSubmit={handleSend} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'عناوين البريد الإلكتروني للمسؤولين ومسؤولي التوريد' : 'Recipient Email List'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'عنوان الرسالة (Subject)' : 'Email Subject'}
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'ملاحظات مدير المخازن وأوامر التوريد' : 'Procurement Instructions & Branch Allocation'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
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
              disabled={isSending || sentSuccess}
              className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg transition shadow-md flex items-center gap-2"
            >
              {sentSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>{isAr ? 'تم الإرسال بنجاح!' : 'Alert Dispatched!'}</span>
                </>
              ) : isSending ? (
                <span>{isAr ? 'جاري الإرسال...' : 'Sending...'}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال التنبيه الفوري' : 'Dispatch Email Alert'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
