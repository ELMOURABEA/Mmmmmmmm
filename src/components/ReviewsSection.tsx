import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  Plus, 
  Filter, 
  Award, 
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';
import { Branch, CustomerReview, Language } from '../types';

interface ReviewsSectionProps {
  lang: Language;
  reviews: CustomerReview[];
  branches: Branch[];
  onAddReview: (review: CustomerReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  lang,
  reviews,
  branches,
  onAddReview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  // Form state
  const [formName, setFormName] = useState('');
  const [formBranchId, setFormBranchId] = useState(branches[0]?.id || '');
  const [formRating, setFormRating] = useState(5);
  const [formCategory, setFormCategory] = useState<CustomerReview['category']>('prescription');
  const [formComment, setFormComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter reviews
  const filteredReviews = reviews.filter(
    (rev) => selectedCategory === 'all' || rev.category === selectedCategory
  );

  const handleLike = (id: string) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    const selectedBranch = branches.find(b => b.id === formBranchId) || branches[0];

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: formName || (lang === 'ar' ? 'عميل صيدليات البنداري' : 'El-Bendary Customer'),
      customerNameAr: formName || 'عميل صيدليات البنداري',
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      branchNameAr: selectedBranch.nameAr,
      rating: formRating,
      date: new Date().toISOString().split('T')[0],
      comment: formComment,
      commentAr: formComment,
      category: formCategory,
      verifiedPatient: true,
      helpfulCount: 1
    };

    onAddReview(newReview);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsAddingReview(false);
      setFormComment('');
      setFormName('');
    }, 1200);
  };

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'جميع التقييمات' : 'All Reviews' },
    { id: 'prescription', label: lang === 'ar' ? 'توصيل الروشتات' : 'Rx Delivery' },
    { id: 'cold_chain', label: lang === 'ar' ? 'سلاسل التبريد والأنسولين' : 'Cold-Chain Care' },
    { id: 'cosmetics', label: lang === 'ar' ? 'مستحضرات التجميل' : 'Dermocosmetics' },
    { id: 'service', label: lang === 'ar' ? 'الاستشارات الصيدلانية' : 'Clinical Service' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 my-10">
      {/* Header & Overall Metric */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'آراء وتجارب عملاء صيدليات البنداري' : 'Patient & Customer Testimonials'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {lang === 'ar' ? 'ثقة أكثر من ٤٥٠ ألف مريض وأسرة' : 'Trusted by Over 450,000 Patients'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {lang === 'ar' 
              ? 'تقييمات حقيقية وموثقة من رواد فروعنا في طنطا، الدلتا والقاهرة لخدمات صرف الأدوية وتوصيل الروشتات' 
              : 'Verified reviews from our pharmacy patrons across Tanta, Delta, and Cairo'}
          </p>
        </div>

        {/* Rating Score Card */}
        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">4.9</span>
            <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
              {lang === 'ar' ? 'من ٥.٠ نجوم' : 'out of 5.0'}
            </span>
          </div>

          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700"></div>

          <div className="flex flex-col justify-center">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? '٤,٨٥٠+ تقييم موثق' : '4,850+ Verified Reviews'}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '٩٨.٤٪ نسبة رضا العملاء' : '98.4% Customer Satisfaction'}</span>
            </span>
            <button
              onClick={() => setIsAddingReview(!isAddingReview)}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'أضف تقييمك الآن' : 'Add Your Review'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Review Form Expandable */}
      {isAddingReview && (
        <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-md">
          {formSubmitted ? (
            <div className="py-6 text-center text-emerald-600 font-bold flex flex-col items-center gap-2">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
              <p>{lang === 'ar' ? 'شكراً لك! تم تسجيل ونشر تقييمك بنجاح.' : 'Thank you! Your review has been recorded.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>{lang === 'ar' ? 'مشاركة تجربتك مع صيدليات البنداري' : 'Share Your Experience with El-Bendary'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الاسم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'مثال: محمد السيد' : 'e.g. Mohamed El-Sayed'}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الفرع الذي تعاملت معه' : 'Branch Visited'}
                  </label>
                  <select
                    value={formBranchId}
                    onChange={(e) => setFormBranchId(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>
                        {lang === 'ar' ? b.nameAr : b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'التقييم' : 'Rating'}
                  </label>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none"
                      >
                        <Star className={`w-5 h-5 ${star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-2">
                      {formRating} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'ملاحظاتك وتقييمك للخدمة' : 'Your Review Comment'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder={lang === 'ar' ? 'اكتب رأيك حول سرعة التوصيل، جودة الأدوية، وحسن تعامل الصيادلة...' : 'Share feedback on delivery speed, medicine availability, and service...'}
                  className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingReview(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {lang === 'ar' ? 'نشر التقييم' : 'Post Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {filteredReviews.map((rev) => {
          const isLiked = likedReviews[rev.id];
          const currentLikes = rev.helpfulCount + (isLiked ? 1 : 0);

          return (
            <div
              key={rev.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                {/* User & Rating Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={rev.customerName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{lang === 'ar' ? rev.customerNameAr : rev.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'مريض / عميل موثق' : 'Verified Patient'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Branch attribution */}
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded-md mb-2.5">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>{lang === 'ar' ? rev.branchNameAr : rev.branchName}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">
                  "{lang === 'ar' ? rev.commentAr : rev.comment}"
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-200/70 dark:border-slate-700/70 text-xs text-slate-400">
                <span>{rev.date}</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold py-1 px-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-slate-500'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-red-600' : ''}`} />
                  <span>{currentLikes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
