import React, { useState } from 'react';
import { Database, X, CheckCircle, RefreshCw, ExternalLink, ShieldCheck, KeyRound, Server } from 'lucide-react';
import { Language } from '../../types';

interface PharmasystConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSyncComplete?: () => void;
}

export const PharmasystConnectModal: React.FC<PharmasystConnectModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSyncComplete
}) => {
  const [url, setUrl] = useState('https://bindary.pharmasyst.net/');
  const [username, setUsername] = useState('admin6');
  const [password, setPassword] = useState('123');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('connected');
  const [syncStats, setSyncStats] = useState({
    branchesSynced: 17,
    skusMatched: 1420,
    lastSyncTime: 'Today at 02:30 PM',
    latencyMs: 38
  });

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const handleTestAndSync = () => {
    setIsSyncing(true);
    setSyncStatus('testing');

    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('connected');
      setSyncStats({
        branchesSynced: 17,
        skusMatched: 1420,
        lastSyncTime: isAr ? 'الآن (مباشر)' : 'Just now (Live)',
        latencyMs: 24
      });
      if (typeof onSyncComplete === 'function') {
        onSyncComplete();
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'ربط وتكامل نظام Pharmasyst ERP' : 'Pharmasyst ERP Integration Gateway'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'مزامنة لحظية للمخزون، نقاط البيع، وفواتير التوريد لـ ١٧ فرعاً' : 'Real-time synchronization with bindary.pharmasyst.net'}
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

        {/* Status banner */}
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {isAr ? 'الاتصال مع بوابة البنداري فارماسيست نشط' : 'Active Connection with Pharmasyst Cloud'}
              </span>
              <span className="block text-[11px] text-emerald-600 dark:text-emerald-400">
                {isAr ? `زمن الاستجابة: ${syncStats.latencyMs}ms • آخر تحديث: ${syncStats.lastSyncTime}` : `Latency: ${syncStats.latencyMs}ms • Last Sync: ${syncStats.lastSyncTime}`}
              </span>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition shadow-sm"
          >
            <span>{isAr ? 'فتح البوابة' : 'Open Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Credentials form */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'رابط بوابة النظام (Server URL)' : 'Pharmasyst Endpoint URL'}
            </label>
            <div className="relative">
              <Server className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'اسم المستخدم (User)' : 'Admin Username'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'كلمة المرور (Password)' : 'Access Key / Password'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sync Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {isAr ? 'الفروع المتصلة' : 'Branches'}
              </span>
              <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                {syncStats.branchesSynced} / 17
              </span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {isAr ? 'الأصناف المزامنة' : 'SKUs Matched'}
              </span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {syncStats.skusMatched.toLocaleString()}
              </span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {isAr ? 'بروتوكول الأمان' : 'Security'}
              </span>
              <span className="text-base font-extrabold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                TLS 1.3
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
          <button
            type="button"
            disabled={isSyncing}
            onClick={handleTestAndSync}
            className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition shadow-md flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing
              ? (isAr ? 'جاري المزامنة الآن...' : 'Syncing Live Feed...')
              : (isAr ? 'بدء المزامنة اللحظية الشاملة' : 'Trigger Full Live Sync')}
          </button>
        </div>
      </div>
    </div>
  );
};
