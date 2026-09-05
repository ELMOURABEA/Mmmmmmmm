import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  lang: Language;
  onOpenRxModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  onOpenRxModal
}) => {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 250 ? 0 : 25;
  const total = subtotal + (cartItems.length > 0 ? deliveryFee : 0);
  const hasRxItem = cartItems.some(item => item.product.prescriptionRequired);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'سلة المشتريات الدوائية' : 'Pharmaceutical Cart'}
            </h3>
            <span className="text-xs text-slate-400">({cartItems.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {orderCompleted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'تم تأكيد طلبك بنجاح!' : 'Order Confirmed!'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                {isAr
                  ? 'رقم الطلب: #BPH-8910. تم إرسال تفاصيل التوصيل إلى فرع طنطا شارع الجيش وسيصلك مندوبنا خلال ٤٥ دقيقة.'
                  : 'Order #BPH-8910 assigned to nearest branch. Expected door delivery in < 45 minutes.'}
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderCompleted(false);
                  onClose();
                }}
                className="mt-4 px-5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow"
              >
                {isAr ? 'العودة للمتجر' : 'Back to Store'}
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-xs">{isAr ? 'سلة المشتريات فارغة حالياً' : 'Your cart is currently empty'}</p>
            </div>
          ) : (
            <>
              {hasRxItem && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-800 dark:text-red-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {isAr ? 'تتضمن السلة أدوية تستوجب روشتة طبية' : 'Prescription Required for some items'}
                    </span>
                    <button
                      onClick={onOpenRxModal}
                      className="text-red-600 dark:text-red-400 font-bold underline text-[11px] mt-0.5 block"
                    >
                      {isAr ? 'ارفع صورة الروشتة الآن لاعتمادها' : 'Upload prescription copy here'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {isAr ? item.product.nameAr : item.product.name}
                      </h5>
                      <span className="text-[11px] text-red-600 font-bold block">
                        {item.product.price} EGP
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-5 text-center text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-slate-400 hover:text-red-600 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout */}
        {!orderCompleted && cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
            <form onSubmit={handleCheckout} className="space-y-2">
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder={isAr ? 'رقم الهاتف للتوصيل (01xxxxxxxxx)' : 'Delivery Phone Number'}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder={isAr ? 'عنوان التوصيل بالتفصيل (المدينة، الشارع، العمارة)' : 'Full Delivery Address'}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />

              <div className="space-y-1 text-xs pt-1 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono">{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? 'رسوم التوصيل السريع:' : 'Delivery Fee:'}</span>
                  <span className="font-mono text-emerald-600">
                    {deliveryFee === 0 ? (isAr ? 'مجاني (أكثر من ٢٥٠ ج)' : 'FREE') : `${deliveryFee} EGP`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>{isAr ? 'الإجمالي النهائي:' : 'Total Payable:'}</span>
                  <span className="font-mono text-red-600 text-sm">{total.toFixed(2)} EGP</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
              >
                <span>{isAr ? 'تأكيد الطلب والتوصيل الفوري' : 'Confirm Order & Deliver'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
