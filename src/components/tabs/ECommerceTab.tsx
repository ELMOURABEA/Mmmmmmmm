import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  FileSpreadsheet, 
  ShoppingCart, 
  Plus, 
  Check, 
  FileText, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Truck, 
  Smartphone, 
  MessageCircle, 
  Layers,
  Building,
  Clock,
  Eye
} from 'lucide-react';
import { Product, Language } from '../../types';

interface ECommerceTabProps {
  lang: Language;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenRxModal: () => void;
  onOpenExcelModal: () => void;
  cartProductIds: string[];
}

export const ECommerceTab: React.FC<ECommerceTabProps> = ({
  lang,
  products,
  onAddToCart,
  onOpenRxModal,
  onOpenExcelModal,
  cartProductIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRxOnly, setFilterRxOnly] = useState(false);
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);

  const isAr = lang === 'ar';

  const categories = [
    { id: 'All', name: 'All Categories', nameAr: 'كافة الأقسام' },
    { id: 'Prescription Medications', name: 'Prescription Medications', nameAr: 'أدوية روشتات (Rx)' },
    { id: 'Beauty & Skincare', name: 'Beauty & Skincare', nameAr: 'التجميل والعناية بالبشرة' },
    { id: 'Mother & Baby Care', name: 'Mother & Baby Care', nameAr: 'الأم والطفل' },
    { id: 'Vitamins & Nutritional Supplements', name: 'Vitamins & Supplements', nameAr: 'الفيتامينات والمكملات' },
    { id: 'Medical Devices & Diagnostics', name: 'Medical Devices', nameAr: 'الأجهزة والمستلزمات الطبية' },
    { id: 'Personal Care & First Aid', name: 'Personal Care & First Aid', nameAr: 'العناية الشخصية والإسعافات' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameAr.includes(searchQuery) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRx = !filterRxOnly || p.prescriptionRequired;
    const matchesLowStock = !filterLowStockOnly || p.stock <= p.lowStockThreshold;

    return matchesCategory && matchesSearch && matchesRx && matchesLowStock;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Rx Upload & Excel Import CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Prescription Upload Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 text-white p-6 shadow-md flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-red-200 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'خدمة الذكاء الاصطناعي والصيدلي الإكلينيكي' : 'AI Rx Scanner & Pharmacist Dispensing'}</span>
            </div>
            <h3 className="text-xl font-black">
              {isAr ? 'ارفع صورة الروشتة لتحضيرها فوراً' : 'Upload Your Prescription (Rx)'}
            </h3>
            <p className="text-xs text-red-100 mt-1 leading-relaxed">
              {isAr
                ? 'فحص فوري لخط الطبيب بالذكاء الاصطناعي، مطابقة الأدوية مع مخزون فروع طنطا والقاهرة، واعتماد الصيدلي المناوب.'
                : 'Instant handwriting OCR scanner, multi-branch stock verification, and rapid door-to-door delivery.'}
            </p>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRxModal}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-red-700 text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isAr ? 'رفع الروشتة الطبية الآن' : 'Upload Prescription Now'}</span>
            </button>

            <a
              href="https://wa.me/201200400089?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B5%D8%B1%D9%81%20%D8%B1%D9%88%D8%B4%D8%AA%D8%A9%20%D8%B7%D8%A8%D9%8A%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'صرف عبر الواتساب' : 'WhatsApp Order'}</span>
            </a>
          </div>
        </div>

        {/* Excel Sheet Inventory Upload Card */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 shadow-md border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isAr ? 'أدوات مديري المخازن والتوريد' : 'Supply Chain & Inventory Tools'}</span>
            </div>
            <h3 className="text-xl font-black">
              {isAr ? 'استيراد أصناف الأدوية من ملف Excel' : 'Import Products via Excel (.xlsx)'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {isAr
                ? 'إمكانية رفع شيت إكسيل لكتالوج الأدوية لتحديث المخزون والأسعار وحدود النواقص تلقائياً عبر فروع البنداري.'
                : 'Batch upload Excel sheets to synchronize master catalog items, price updates, and automated low-stock buffers.'}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenExcelModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isAr ? 'رفع ملف Excel للأصناف' : 'Upload Products Excel'}</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {isAr ? 'يدعم .xlsx و .csv بنموذج قياسي جاهز' : 'Supports .xlsx & .csv with template'}
            </span>
          </div>
        </div>

      </div>

      {/* Product Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث باسم الدواء، المادة الفعالة، أو كود SKU...' : 'Search drug name, generic or SKU...'}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setFilterRxOnly(!filterRxOnly)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1.5 ${
                filterRxOnly
                  ? 'bg-red-50 dark:bg-red-950/50 border-red-500 text-red-600 dark:text-red-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAr ? 'أدوية روشتة فقط (Rx)' : 'Rx Required'}</span>
            </button>

            <button
              onClick={() => setFilterLowStockOnly(!filterLowStockOnly)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1.5 ${
                filterLowStockOnly
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isAr ? 'الأصناف الناقصة فقط' : 'Low Stock Only'}</span>
            </button>
          </div>
        </div>

        {/* Categories Tab Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isAr ? cat.nameAr : cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product, idx) => {
          const isLowStock = product.stock <= product.lowStockThreshold;
          const inCart = cartProductIds.includes(product.id);

          return (
            <div
              key={`${product.id}-${idx}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.prescriptionRequired && (
                      <span className="px-2 py-0.5 bg-red-600/90 text-white text-[10px] font-bold rounded-md shadow-xs">
                        {isAr ? 'روشتة طبية' : 'Rx Required'}
                      </span>
                    )}
                    {product.category.includes('Pharma Code') && (
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md shadow-xs">
                        {isAr ? 'مصنع فارما كود' : 'Pharma Code'}
                      </span>
                    )}
                  </div>

                  {/* Stock indicator badge */}
                  <div className="absolute bottom-2 right-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md shadow-xs ${
                      isLowStock
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {isAr ? `${product.stock} علبة` : `${product.stock} in stock`}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block">{product.sku}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {isAr ? product.nameAr : product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{product.manufacturer}</p>
                </div>
              </div>

              {/* Price & Cart Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black text-red-600 dark:text-red-400">
                    {product.price} EGP
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through block">
                      {product.originalPrice} EGP
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm ${
                    inCart
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isAr ? 'في السلة' : 'Added'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إضافة' : 'Add'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Order Journey Flow Diagram */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isAr ? 'مسار رحلة الطلب وصرف الدواء (Order Journey Flow)' : 'Full Order & Prescription Journey Flow'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'كيف يتم فحص الروشتة وتوجيهها للصيدلية وتوصيلها للمريض خلال أقل من ٦٠ دقيقة'
              : 'End-to-end verified pharmaceutical order workflow from upload to door delivery'}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center mb-2">1</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{isAr ? 'طلب الدواء أو رفع الروشتة' : '1. Rx Upload / Order'}</h4>
            <p className="text-[11px] text-slate-500 mt-1">{isAr ? 'عبر الموقع، تطبيق الموبايل، أو واتساب' : 'Via bendaryph.com, Google Play App, or WhatsApp'}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center mb-2">2</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{isAr ? 'اعتماد الصيدلي الإكلينيكي' : '2. Pharmacist Verification'}</h4>
            <p className="text-[11px] text-slate-500 mt-1">{isAr ? 'فحص الجرعات، التداخلات الدوائية، وموافقة التأمين' : 'Dosage validation, drug-drug checks, & insurance gate'}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center mb-2">3</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{isAr ? 'مزامنة نظام Pharmasyst' : '3. ERP Stock Allocation'}</h4>
            <p className="text-[11px] text-slate-500 mt-1">{isAr ? 'خصم الرصيد تلقائياً من أقرب فرع في الدلتا' : 'Instant allocation from nearest branch inventory'}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center mb-2">4</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{isAr ? 'تجهيز وحفظ الأدوية' : '4. Dispense & Cold-Chain'}</h4>
            <p className="text-[11px] text-slate-500 mt-1">{isAr ? 'تغليف آمن مع حفظ الأدوية الحيوية في مبردات' : 'Tamper-evident pack with IoT temperature controls'}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center mb-2">5</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{isAr ? 'توصيل فوري واستلام' : '5. Rapid Delivery'}</h4>
            <p className="text-[11px] text-slate-500 mt-1">{isAr ? 'توصيل سريع مع إمكانية الدفع كاش أو فيزا' : 'Door delivery < 60 mins with POS card or cash'}</p>
          </div>

        </div>
      </div>

    </div>
  );
};
