import React, { useState } from 'react';
import { Upload, X, FileSpreadsheet, Download, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Product, Language } from '../../types';

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onImportSuccess?: (newProducts: Product[]) => void;
  onImportProducts?: (newProducts: Product[]) => void;
}

export const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({
  isOpen,
  onClose,
  lang,
  onImportSuccess,
  onImportProducts
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        SKU: 'RX-PAN-500',
        Barcode: '622100998801',
        Name: 'Panadol Advance 500mg (24 Tab)',
        Name_Arabic: 'بنادول أدفانس ٥٠٠ مجم',
        Category: 'Personal Care & First Aid',
        Category_Arabic: 'العناية الشخصية والإسعافات',
        Price_EGP: 38.0,
        Stock_Quantity: 120,
        Low_Stock_Threshold: 30,
        Dosage_Form: 'Tablets',
        Manufacturer: 'Haleon Egypt',
        Prescription_Required: 'No',
        Expiry_Date: '2027-12-31',
        Batch_Number: 'PAN25-01'
      },
      {
        SKU: 'RX-KLAV-1G',
        Barcode: '622100998802',
        Name: 'Klavox 1g Amoxicillin/Clavulanate (14 Tab)',
        Name_Arabic: 'كلافوكس ١ جم أقراص',
        Category: 'Prescription Medications',
        Category_Arabic: 'أدوية روشتات',
        Price_EGP: 95.0,
        Stock_Quantity: 14,
        Low_Stock_Threshold: 20,
        Dosage_Form: 'Tablets',
        Manufacturer: 'Spimaco Misr',
        Prescription_Required: 'Yes',
        Expiry_Date: '2026-11-30',
        Batch_Number: 'KLV24-88'
      },
      {
        SKU: 'BEA-VICHY-MIN89',
        Barcode: '3337875543249',
        Name: 'Vichy Mineral 89 Hyaluronic Acid Booster 50ml',
        Name_Arabic: 'سيروم فيشي مينيرال ٨٩ المعزز للبشرة',
        Category: 'Beauty & Skincare',
        Category_Arabic: 'التجميل والعناية بالبشرة',
        Price_EGP: 890.0,
        Stock_Quantity: 8,
        Low_Stock_Threshold: 15,
        Dosage_Form: 'Serum',
        Manufacturer: 'Vichy Laboratories',
        Prescription_Required: 'No',
        Expiry_Date: '2028-05-15',
        Batch_Number: 'VIC25-102'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'El-Bendary-Pharmacies-Product-Import-Template.xlsx');
  };

  const handleFile = (file: File) => {
    setErrorMsg(null);
    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (!json || json.length === 0) {
          setErrorMsg(isAr ? 'الملف فارغ أو لا يحتوي على بيانات صالحة' : 'File is empty or contains no records');
          setIsProcessing(false);
          return;
        }

        setParsedRows(json);
        setIsProcessing(false);
      } catch (err: any) {
        setErrorMsg(isAr ? `خطأ أثناء قراءة ملف الإكسيل: ${err.message}` : `Error parsing Excel: ${err.message}`);
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleApplyImport = () => {
    if (parsedRows.length === 0) return;

    const convertedProducts: Product[] = parsedRows.map((row, idx) => {
      const stockVal = Number(row.Stock_Quantity || row.stock || row.Stock || 20);
      const threshold = Number(row.Low_Stock_Threshold || row.threshold || 15);
      const priceVal = Number(row.Price_EGP || row.price || row.Price || 100);
      const isRx = String(row.Prescription_Required || row.prescription || '').toLowerCase().includes('y');

      return {
        id: `import-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 8)}`,
        sku: String(row.SKU || `SKU-${idx + 100}`),
        barcode: String(row.Barcode || `622100${idx + 1000}`),
        name: String(row.Name || row.name || `Imported Item ${idx + 1}`),
        nameAr: String(row.Name_Arabic || row.nameAr || row.Name || `صنف مستورد ${idx + 1}`),
        category: String(row.Category || 'Prescription Medications'),
        categoryAr: String(row.Category_Arabic || 'أدوية ومستلزمات'),
        price: priceVal,
        stock: stockVal,
        lowStockThreshold: threshold,
        dosageForm: String(row.Dosage_Form || 'Unit'),
        manufacturer: String(row.Manufacturer || 'El-Bendary Supply Chain'),
        prescriptionRequired: isRx,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
        expiryDate: String(row.Expiry_Date || '2027-12-31'),
        batchNumber: String(row.Batch_Number || `BATCH-${idx + 10}`),
        branchStock: {
          'br-tanta-main': Math.ceil(stockVal * 0.35),
          'br-tanta-stadium': Math.ceil(stockVal * 0.2),
          'br-mansoura-univ': Math.ceil(stockVal * 0.2),
          'br-mahalla-shoubra': Math.ceil(stockVal * 0.1),
          'br-zagazig-quds': Math.ceil(stockVal * 0.1),
          'br-cairo-heliopolis': Math.ceil(stockVal * 0.05)
        }
      };
    });

    if (typeof onImportProducts === 'function') {
      onImportProducts(convertedProducts);
    } else if (typeof onImportSuccess === 'function') {
      onImportSuccess(convertedProducts);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'استيراد أصناف الأدوية والمخزون من ملف Excel' : 'Import Products & Inventory from Excel'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'يدعم ملفات .xlsx و .xls و .csv مع كشف تلقائي للأعمدة وحدود النواقص' : 'Supports .xlsx, .xls, .csv with auto-column mapping and low-stock thresholds'}
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

        {/* Template download & Instructions */}
        <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              {isAr ? 'هل تحتاج إلى النموذج القياسي؟' : 'Need the standard template?'}
            </span>
            {isAr
              ? 'قم بتحميل نموذج إكسيل المعتمد لصيدليات البنداري لتسهيل مطابقة الأعمدة (SKU، السعر، الرصيد، حد النواقص)'
              : 'Download the pre-formatted Excel template with standard columns (SKU, Price, Stock, Low-stock limit).'}
          </div>
          <button
            type="button"
            onClick={downloadSampleTemplate}
            className="px-3 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 transition shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4" />
            {isAr ? 'تحميل نموذج Excel' : 'Download Template'}
          </button>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center transition ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
              : parsedRows.length > 0
              ? 'border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/10'
              : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 bg-slate-50/50 dark:bg-slate-800/40'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-4">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {isAr ? 'جاري قراءة وتحليل بيانات الأصناف...' : 'Reading and validating Excel rows...'}
              </p>
            </div>
          ) : parsedRows.length > 0 ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {isAr ? `تمت قراءة ${parsedRows.length} صنفاً بنجاح من الملف` : `Successfully parsed ${parsedRows.length} products`}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{fileName}</p>
              <label className="mt-2 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer">
                {isAr ? 'رفع ملف إكسيل آخر' : 'Upload a different file'}
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div>
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {isAr ? 'اسحب ملف Excel هنا أو انقر للتصفح' : 'Drag & drop your Excel or CSV file here'}
              </p>
              <p className="text-xs text-slate-500 mt-1">.xlsx, .xls, or .csv up to 25MB</p>
              <label className="inline-block mt-3 px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg cursor-pointer transition shadow-sm">
                {isAr ? 'اختيار ملف الإكسيل' : 'Select Excel File'}
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Parsed Preview Table */}
        {parsedRows.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? 'معاينة الأصناف قبل الإضافة إلى الفروع:' : 'Data Preview (First 5 records):'}
              </span>
              <span className="text-xs text-slate-500">
                {isAr ? `إجمالي: ${parsedRows.length} صنف` : `Total: ${parsedRows.length} items`}
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-slate-600 dark:text-slate-400">
                  <tr>
                    <th className="p-2.5 font-semibold">SKU</th>
                    <th className="p-2.5 font-semibold">{isAr ? 'اسم الدواء' : 'Product Name'}</th>
                    <th className="p-2.5 font-semibold">{isAr ? 'السعر' : 'Price (EGP)'}</th>
                    <th className="p-2.5 font-semibold">{isAr ? 'الرصيد' : 'Stock'}</th>
                    <th className="p-2.5 font-semibold">{isAr ? 'حد النواقص' : 'Alert Threshold'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {parsedRows.slice(0, 5).map((row, i) => {
                    const stock = Number(row.Stock_Quantity || row.stock || row.Stock || 0);
                    const threshold = Number(row.Low_Stock_Threshold || row.threshold || 15);
                    const isLow = stock <= threshold;

                    return (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-2.5 font-mono text-slate-500">{row.SKU || `SKU-${i}`}</td>
                        <td className="p-2.5 font-medium text-slate-900 dark:text-white">
                          {row.Name || row.name || row.Name_Arabic || 'Item'}
                        </td>
                        <td className="p-2.5 font-bold text-red-600 dark:text-red-400">
                          {row.Price_EGP || row.price || 0}
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            isLow ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          }`}>
                            {stock} {isLow && (isAr ? '⚠️ نقص' : '⚠️ Low')}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-500">{threshold}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            disabled={parsedRows.length === 0}
            onClick={handleApplyImport}
            className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isAr ? `تأكيد إضافة ${parsedRows.length} صنفاً للمنظومة` : `Import ${parsedRows.length} Products`}
          </button>
        </div>
      </div>
    </div>
  );
};
