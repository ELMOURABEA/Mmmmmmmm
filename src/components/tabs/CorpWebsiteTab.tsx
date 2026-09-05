import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Shield, 
  FileText, 
  Briefcase, 
  BookOpen, 
  CheckCircle, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  Filter, 
  Building, 
  HeartHandshake, 
  Send, 
  Sparkles,
  Award
} from 'lucide-react';
import { Branch, Language } from '../../types';

interface CorpWebsiteTabProps {
  lang: Language;
  branches: Branch[];
  onOpenRxModal: () => void;
  onNavigateToEcom: () => void;
}

export const CorpWebsiteTab: React.FC<CorpWebsiteTabProps> = ({
  lang,
  branches,
  onOpenRxModal,
  onNavigateToEcom
}) => {
  const [searchCity, setSearchCity] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [careerRole, setCareerRole] = useState('Clinical Pharmacist');

  const isAr = lang === 'ar';

  const insurancePartners = [
    { name: 'MetLife Egypt', nameAr: 'متلايف لتأمينات الحياة', network: 'Tier A+ Open Network', directBill: true },
    { name: 'AXA OneHealth', nameAr: 'أكسا للرعاية الصحية', network: 'Comprehensive Network', directBill: true },
    { name: 'Misr Insurance', nameAr: 'مصر للتأمين الحكومية', network: 'National Tenders & Syndicates', directBill: true },
    { name: 'Bupa Global', nameAr: 'بوبا العالمية للتأمين الصحي', network: 'VIP Elite Network', directBill: true },
    { name: 'NextCare Egypt', nameAr: 'نكست كير مصر', network: 'Corporate TPA Gateway', directBill: true },
    { name: 'Prime Health', nameAr: 'برايم هيلث للخدمات الطبية', network: 'Delta & Cairo Network', directBill: true },
    { name: 'Medical Syndicates', nameAr: 'نقابات الأطباء والمهندسين', network: 'Special Discount & Chronic Care', directBill: true },
    { name: 'Arab Contractors Fund', nameAr: 'صندوق المقاولون العرب', network: 'Institutional Tender Program', directBill: true },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Managing Type 2 Diabetes: Why Combination Therapies (e.g. Janumet) Improve Adherence',
      titleAr: 'علاج السكري من النوع الثاني: لماذا ترفع العلاجات المركبة (مثل جانوميت) من التزام المريض؟',
      author: 'Dr. Alaa Ezzeldin (Clinical Director)',
      authorAr: 'د. علاء عز الدين (المدير الإكلينيكي)',
      date: 'Aug 28, 2026',
      tag: 'Endocrinology',
      tagAr: 'الغدد والسكري'
    },
    {
      id: 2,
      title: 'The Evolution of ICSI & Biologics in Egypt: Pharma Code’s Technological Breakthrough',
      titleAr: 'تطور أدوية الحقن المجهري والبيولوجيكس في مصر: طفرة مصنع فارما كود الشقيق',
      author: 'Dr. Mostafa El-Mourabaa',
      authorAr: 'د. مصطفى المُرَبع',
      date: 'Aug 14, 2026',
      tag: 'Biotechnology',
      tagAr: 'التكنولوجيا الدوائية'
    },
    {
      id: 3,
      title: 'Hypertension and Seasonal Weather: Safe Monitoring Using Digital Monitors',
      titleAr: 'ضغط الدم والتغيرات الموسمية: إرشادات القياس الآمن باستخدام أجهزة الضغط الرقمية',
      author: 'Dr. Ahmed Sallam',
      authorAr: 'د. أحمد سلام',
      date: 'July 30, 2026',
      tag: 'Cardiology',
      tagAr: 'صحة القلب'
    }
  ];

  const filteredBranches = searchCity === 'all'
    ? branches
    : branches.filter(b => b.city.toLowerCase() === searchCity.toLowerCase());

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Corporate Hero with Storefront Photo & Verification */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>{isAr ? 'صيدليات البنداري - إرث يمتد منذ عام ١٩٨٠' : 'El-Bendary Pharmacies - Trusted Since 1980'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {isAr
                ? 'رعايتكم الصحية أمانتنا، أينما كنتم في الدلتا والقاهرة'
                : 'Pioneering Healthcare Excellence Across the Delta & Cairo'}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'شبكة صيدليات متكاملة بإدارة د. عبد الفتاح منتصر ود. علاء عز الدين، تقدم خدمات صرف الروشتات والاستشارات الإكلينيكية على مدار ٢٤ ساعة، مع ربط إلكتروني بكبرى شركات التأمين وتوصيل فوري لباب المنزل.'
                : 'A legacy pharmacy chain under the leadership of Dr. Abdelfattah Montasser & Dr. Alaa Ezzeldin, delivering 24/7 clinical dispensing, seamless insurance coverage, and rapid home medicine delivery.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenRxModal}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{isAr ? 'ارفع روشتتك الآن أونلاين' : 'Upload Prescription (Rx)'}</span>
              </button>

              <button
                onClick={onNavigateToEcom}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-2"
              >
                <span>{isAr ? 'تصفح كتالوج الأدوية والمستلزمات' : 'Explore Products'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="tel:01200400089"
                className="px-4 py-3 border border-slate-300 dark:border-slate-700 hover:border-red-500 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-2 font-mono"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>01200400089</span>
              </a>
            </div>

            {/* Tech Stack Banner as instructed */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'البنية التقنية للويب:' : 'Tech Architecture:'}
                </span>
                <span className="text-slate-500 font-mono">Next.js • Tailwind • Vercel • Strapi</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://bph-two.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline font-bold flex items-center gap-1"
                >
                  <span>bph-two.vercel.app</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Storefront Visual Card (Representation of real branch photo) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
                alt="El-Bendary Pharmacy Tanta Branch Storefront"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-mono text-amber-300 mb-1">
                  {isAr ? 'المقر الرئيسي - ٤٢ شارع الجيش، طنطا' : 'Flagship Store - El Geish St, Tanta'}
                </div>
                <h4 className="text-base font-bold">
                  {isAr ? 'صيدليات البنداري - إدارة د. عبد الفتاح منتصر' : 'El-Bendary Pharmacies - Dir. Dr. Abdelfattah Montasser'}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {isAr ? 'خدمة ٢٤ ساعة' : 'Open 24/7'}
                  </span>
                  <span>•</span>
                  <span>{isAr ? 'صيدلية د. علاء عز الدين' : 'Dr. Alaa Ezzeldin'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Branch Locator with Interactive Google Maps Integration */}
      <div id="branches" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'خريطة فروع صيدليات البنداري ومواعيد العمل' : 'Pharmacy Locations & Google Maps Navigation'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'تغطية واسعة في طنطا، المنصورة، المحلة الكبرى، الزقازيق، ومصر الجديدة بالقاهرة'
                : '17 branches serving the Delta region and Greater Cairo with integrated directions'}
            </p>
          </div>

          {/* City filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">{isAr ? 'جميع المدن (الـ ١٧ فرعاً)' : 'All Cities (17 Branches)'}</option>
              <option value="tanta">{isAr ? 'طنطا (المقر الرئيسي وفروعها)' : 'Tanta'}</option>
              <option value="mansoura">{isAr ? 'المنصورة' : 'Mansoura'}</option>
              <option value="el mahalla">{isAr ? 'المحلة الكبرى' : 'El Mahalla'}</option>
              <option value="zagazig">{isAr ? 'الزقازيق' : 'Zagazig'}</option>
              <option value="cairo">{isAr ? 'القاهرة' : 'Cairo'}</option>
            </select>
          </div>
        </div>

        {/* Map & List Split View */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Branches List */}
          <div className="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-red-50/80 dark:bg-red-950/40 border-red-500 shadow-sm'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                        {isAr ? branch.cityAr : branch.city}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {isAr ? branch.nameAr : branch.name}
                      </h4>
                    </div>
                    {branch.is24Hours && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold rounded-full">
                        24h
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {isAr ? branch.addressAr : branch.address}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {isAr ? branch.hoursAr : branch.hours}
                    </span>
                    <a
                      href={`tel:${branch.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono font-bold text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{branch.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Embed / Preview */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative min-h-[380px] flex flex-col">
            
            {/* Embedded Google Maps iframe with active coordinates */}
            <div className="flex-1 w-full h-full relative">
              <iframe
                title="El-Bendary Pharmacy Google Map Location"
                width="100%"
                height="100%"
                className="w-full h-full border-0 min-h-[320px]"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${selectedBranch.lat},${selectedBranch.lng}&hl=${lang}&z=15&output=embed`}
              />
            </div>

            {/* Selected Branch Details Overlay Bar */}
            <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-600 block">
                  {isAr ? 'الفرع المحدد على الخريطة' : 'Selected on Google Maps'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {isAr ? selectedBranch.nameAr : selectedBranch.name}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isAr ? `إشراف الصيدلي المسؤول: ${selectedBranch.manager}` : `Branch Manager: ${selectedBranch.manager}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.lat},${selectedBranch.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الاتجاهات عبر خرائط جوجل' : 'Google Directions'}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Insurance Directory */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Shield className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? 'دليل شبكات التأمين الصحي المعتمدة' : 'Accredited Health Insurance Directory'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'تعاقد مباشر لصرف الروشتات الشهرية والمزمنة بدون عناء، وبنسبة تحمل معتمدة فورياً'
                : 'Direct billing & automated approvals across all primary corporate & private insurers'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {insurancePartners.map((item, i) => (
            <div
              key={i}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isAr ? item.nameAr : item.name}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {item.network}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                <CheckCircle className="w-3 h-3" />
                <span>{isAr ? 'صرف إلكتروني مباشر' : 'Instant E-Approval'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Blog & Health Advice */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'المدونة الطبية وإرشادات الصيادلة' : 'Clinical Health & Pharmaceutical Blog'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'مقالات موثقة بقلم استشاريي وصيادلة صيدليات البنداري' : 'Evidence-based clinical insights & wellness protocols'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-400 transition flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-[10px] font-bold rounded-md">
                  {isAr ? post.tagAr : post.tag}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {isAr ? post.titleAr : post.title}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>{isAr ? post.authorAr : post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Careers Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-200 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>{isAr ? 'انضم لفريق البنداري الطبي' : 'Careers at El-Bendary Group'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            {isAr ? 'نبحث دوماً عن كفاءات صيدلانية وإدارية متميزة' : 'Shape the Future of Community Pharmacy with Us'}
          </h3>
          <p className="text-xs text-red-100 mt-1 max-w-xl">
            {isAr
              ? 'فرص عمل للصيادلة الإكلينيكيين، مديري الفروع، وممثلي خدمة العملاء بالدلتا والقاهرة.'
              : 'Open positions for licensed pharmacists, branch operations supervisors, and logistics runners.'}
          </p>
        </div>

        <button
          onClick={() => setCareerModalOpen(true)}
          className="px-6 py-3 bg-white hover:bg-slate-100 text-red-700 text-xs font-bold rounded-xl shadow transition shrink-0"
        >
          {isAr ? 'التقديم على الوظائف' : 'Apply for Positions'}
        </button>
      </div>

      {/* Career Application Modal */}
      {careerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            {careerSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'تم استلام طلب التوظيف بنجاح' : 'Application Received'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr ? 'سيتواصل فريق الموارد البشرية معك لإجراء المقابلة الفنية.' : 'Our HR department will contact you for an interview.'}
                </p>
                <button
                  onClick={() => { setCareerModalOpen(false); setCareerSubmitted(false); }}
                  className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg"
                >
                  {isAr ? 'تم' : 'Done'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCareerSubmitted(true);
                }}
                className="space-y-3"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'طلب انضمام لفريق صيدليات البنداري' : 'Join El-Bendary Healthcare Team'}
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الوظيفة المطلوبة' : 'Position'}
                  </label>
                  <select
                    value={careerRole}
                    onChange={(e) => setCareerRole(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Clinical Pharmacist">{isAr ? 'صيدلي إكلينيكي (طنطا / المنصورة)' : 'Clinical Pharmacist'}</option>
                    <option value="Branch Manager">{isAr ? 'مدير فرع صيدلية' : 'Branch Manager'}</option>
                    <option value="Inventory Officer">{isAr ? 'مسؤول مخازن وتوريدات' : 'Inventory Officer'}</option>
                    <option value="Delivery Runner">{isAr ? 'مندوب توصيل أدوية سريع' : 'Delivery Rider'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الاسم بالكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isAr ? 'د. أحمد محمود' : 'Dr. Ahmed Mahmoud'}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'رقم الهاتف والواتساب' : 'Phone & WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01012345678"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCareerModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg"
                  >
                    {isAr ? 'إرسال السيرة الذاتية' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
