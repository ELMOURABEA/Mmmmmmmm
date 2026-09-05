import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  ShieldAlert, 
  Users, 
  Phone, 
  Instagram, 
  Facebook, 
  CheckCheck, 
  Clock, 
  Tag, 
  FileText, 
  Sparkles, 
  Paperclip, 
  AlertCircle, 
  Building2, 
  Settings,
  HelpCircle,
  Repeat,
  Truck,
  UserCheck
} from 'lucide-react';
import { Language } from '../../types';

interface OmniChannelTabProps {
  lang: Language;
  onOpenRxModal: () => void;
}

interface ChatConversation {
  id: string;
  customerName: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'web';
  phone: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  assignedAgent?: string;
  isCollisionWarning?: boolean;
  viewingAgent?: string;
  status: 'open' | 'pending' | 'resolved';
  tags: string[];
  messages: Array<{
    id: string;
    sender: 'customer' | 'agent' | 'bot' | 'internal_note';
    senderName?: string;
    text: string;
    time: string;
  }>;
}

export const OmniChannelTab: React.FC<OmniChannelTabProps> = ({ lang, onOpenRxModal }) => {
  const isAr = lang === 'ar';

  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 'c-1',
      customerName: 'Haj Mahmoud El-Sayed',
      channel: 'whatsapp',
      phone: '+20 100 892 4112',
      lastMessage: 'محتاج أصرف روشتة جانوميت وكونكور شهرية لفرع طنطا شارع الجيش',
      time: '10:42 AM',
      unreadCount: 1,
      assignedAgent: 'Dr. Mostafa El-Mourabaa',
      isCollisionWarning: true,
      viewingAgent: 'Dr. Sara (Pharmacist)',
      status: 'open',
      tags: ['Prescription', 'Chronic Care', 'Tanta Main'],
      messages: [
        {
          id: 'm-1',
          sender: 'customer',
          text: 'السلام عليكم ورحمة الله، محتاج أصرف روشتة شهرية لوالدتي',
          time: '10:40 AM'
        },
        {
          id: 'm-2',
          sender: 'bot',
          senderName: 'SOLA AI Health Assistant',
          text: 'وعليكم السلام يا فندم! أهلاً بك في صيدليات البنداري. يمكنك إرسال صورة الروشتة هنا وسيقوم الصيدلي بمطابقتها وتأكيد الصرف فوراً.',
          time: '10:40 AM'
        },
        {
          id: 'm-3',
          sender: 'customer',
          text: 'محتاج أصرف روشتة جانوميت وكونكور شهرية لفرع طنطا شارع الجيش',
          time: '10:42 AM'
        },
        {
          id: 'm-4',
          sender: 'internal_note',
          senderName: 'Dr. Sara (Internal Note)',
          text: 'الأدوية متوفرة في مخزن فرع الجيش، جاري حجز علبة جانوميت 50/1000 وعلبة كونكور 5 ملجم في نظام Pharmasyst.',
          time: '10:43 AM'
        }
      ]
    },
    {
      id: 'c-2',
      customerName: 'Eng. Karim Nabil',
      channel: 'messenger',
      phone: 'Facebook Messenger',
      lastMessage: 'هل تقبلون بطاقة تأمين أكسا OneHealth لصرف أدوية الوالد؟',
      time: '09:15 AM',
      unreadCount: 0,
      assignedAgent: 'Dr. Alaa Ezzeldin',
      status: 'open',
      tags: ['Insurance AXA', 'Mansoura Branch'],
      messages: [
        {
          id: 'm-20',
          sender: 'customer',
          text: 'هل تقبلون بطاقة تأمين أكسا OneHealth لصرف أدوية الوالد؟',
          time: '09:15 AM'
        },
        {
          id: 'm-21',
          sender: 'agent',
          senderName: 'Dr. Alaa Ezzeldin',
          text: 'أهلاً بك يا بشمهندس كريم. نعم، صيدليات البنداري معتمدة رسمياً لدى شبكة أكسا OneHealth بالكامل بالدلتا والقاهرة بدون نسبة تحمل إضافية.',
          time: '09:18 AM'
        }
      ]
    },
    {
      id: 'c-3',
      customerName: 'Dr. Mona Rashad',
      channel: 'instagram',
      phone: '@mona_rashad',
      lastMessage: 'هل متوفر حقن بيولوجية (Pharma Code) للأورام عندكم؟',
      time: 'Yesterday',
      unreadCount: 0,
      assignedAgent: 'Dr. Mostafa',
      status: 'resolved',
      tags: ['Pharma Code', 'Biologics'],
      messages: [
        {
          id: 'm-30',
          sender: 'customer',
          text: 'هل متوفر حقن بيولوجية (Pharma Code) للأورام عندكم؟',
          time: 'Yesterday 04:20 PM'
        },
        {
          id: 'm-31',
          sender: 'agent',
          senderName: 'Dr. Mostafa',
          text: 'أهلاً دكتورة منى، نعم نوفرها بحفظ مبرد ٢-٨ درجات مئوية مع شهادة التحليل الرسمية الصادرة من مصنع فارما كود الشقيق.',
          time: 'Yesterday 04:25 PM'
        }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState<string>('c-1');
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<'inbox' | 'white_label' | 'bots'>('inbox');

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: isInternalNote ? ('internal_note' as const) : ('agent' as const),
      senderName: isInternalNote ? 'Internal Staff Note' : 'Dr. Mostafa (Staff)',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: replyText,
          unreadCount: 0
        };
      }
      return conv;
    }));

    setReplyText('');
  };

  const chatbotFlows = [
    {
      id: 'bot-1',
      name: isAr ? 'بوت صرف ومطابقة الروشتات' : 'Prescription Processing Bot',
      icon: FileText,
      desc: isAr ? 'استقبال صورة الروشتة وتحديد الأدوية بالذكاء الاصطناعي' : 'OCR handwriting scan & drug-drug interaction gate',
      trigger: isAr ? 'إرسال صورة روشتة أو كتابة كلمة روشتة' : 'Photo upload / Rx intent',
      stat: '94% Accuracy'
    },
    {
      id: 'bot-2',
      name: isAr ? 'بوت تكرار أدوية الأمراض المزمنة' : 'Chronic Medicine Auto-Refill Bot',
      icon: Repeat,
      desc: isAr ? 'تنبيه المرضى شهرياً وتجهيز طلبية السكر والضغط تلقائياً' : 'Monthly automated WhatsApp refill alert & one-click reorder',
      trigger: isAr ? 'موعد التكرار الشهري المسجل' : '30-day cron schedule',
      stat: '88% Retention'
    },
    {
      id: 'bot-3',
      name: isAr ? 'بوت التحقق من التأمين الصحي' : 'Insurance Eligibility Verification Bot',
      icon: UserCheck,
      desc: isAr ? 'التحقق من رقم بطاقة أكسا أو متلايف وتأكيد الصرف' : 'Instant TPA policy lookup & copay calculation',
      trigger: isAr ? 'كتابة اسم شركة التأمين' : 'Keywords: AXA, MetLife, Syndicate',
      stat: '< 15s Approval'
    },
    {
      id: 'bot-4',
      name: isAr ? 'بوت دليل الفروع والمناوبات' : 'Branch Locator & Working Hours Bot',
      icon: Building2,
      desc: isAr ? 'إرسال موقع أقرب صيدلية بنداري بالـ GPS حسب موقع العميل' : 'GPS location matching to nearest of 17 branches',
      trigger: isAr ? 'مشاركة الموقع الحي (Live Location)' : 'Location payload sent',
      stat: '100% Automated'
    },
    {
      id: 'bot-5',
      name: isAr ? 'بوت استشارة الصيدلي الإكلينيكي' : 'Pharmacist Direct Consultation Bot',
      icon: Sparkles,
      desc: isAr ? 'توجيه الأسئلة الطبية الحساسة للصيدلي المناوب فورياً' : 'Smart triage & escalation to licensed duty pharmacist',
      trigger: isAr ? 'الأسئلة المتعلقة بالجرعات أو الآثار الجانبية' : 'Clinical keyword triggers',
      stat: 'Zero Collision'
    },
    {
      id: 'bot-6',
      name: isAr ? 'بوت تتبع الدليفري والطيار' : 'Delivery Tracking & Driver ETA Bot',
      icon: Truck,
      desc: isAr ? 'مشاركة خط سير مندوب التوصيل ووقت الوصول المتوقع' : 'Live courier GPS status and arrival ETA updates',
      trigger: isAr ? 'تأكيد خروج الطلب من الصيدلية' : 'POS order dispatched status',
      stat: '< 45 min Delivery'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top SOLA Brand Header & Docker Guide Ribbon */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SOLA White-Labeled Chatwoot Engine • WhatsApp Cloud API</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'منظومة خدمة العملاء الموحدة (SOLA Omni-Channel)' : 'SOLA Unified Omnichannel Helpdesk'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              {isAr
                ? 'حل مشكلة تكدس طلبات الروشتات على رقم واتساب واحد: صندوق بريد موحد يربط واتساب وفيسبوك وإنستجرام، مع ميزة منع التضارب بين الصيادلة، والملاحظات الداخلية، و٦ روبوتات ذكية.'
                : 'Eliminating the bottleneck of a single WhatsApp number: unified inbox aggregating WhatsApp, Messenger, and Instagram with collision detection, internal team notes, and 6 specialized bots.'}
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTabSub('inbox')}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
                activeTabSub === 'inbox' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'صندوق الرسائل الحي' : 'Unified Inbox'}
            </button>
            <button
              onClick={() => setActiveTabSub('bots')}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
                activeTabSub === 'bots' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'الروبوتات الـ ٦' : '6 Chatbot Flows'}
            </button>
            <button
              onClick={() => setActiveTabSub('white_label')}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
                activeTabSub === 'white_label' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'دليل الـ White-Label' : 'Docker & Branding'}
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: UNIFIED INBOX SIMULATOR */}
      {activeTabSub === 'inbox' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* Left Column: Conversations List */}
          <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'المحادثات الواردة' : 'Live Inbound Queues'}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                3 Active Channels
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeChat.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChatId(conv.id)}
                    className={`p-4 transition cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-l-4 border-emerald-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {conv.channel === 'whatsapp' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                        {conv.channel === 'messenger' && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                        {conv.channel === 'instagram' && <span className="w-2 h-2 rounded-full bg-pink-500" />}
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {conv.customerName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{conv.time}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        {conv.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {conv.isCollisionWarning && (
                        <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{isAr ? 'صيدلي آخر يتابع' : 'Viewing'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Conversation Workspace */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/30">
            
            {/* Chat Header with Collision Detection Alert */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeChat.customerName}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{activeChat.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span>{isAr ? `مسؤول الرد: ${activeChat.assignedAgent}` : `Assigned: ${activeChat.assignedAgent}`}</span>
                </div>
              </div>

              {/* Collision Alert Banner */}
              {activeChat.isCollisionWarning && (
                <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-xl text-xs flex items-center gap-1.5 animate-pulse">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>
                    {isAr
                      ? `تنبيه تضارب: الصيدلية ${activeChat.viewingAgent} تشاهد هذه المحادثة الآن!`
                      : `Collision Alert: ${activeChat.viewingAgent} is currently viewing!`}
                  </span>
                </div>
              )}
            </div>

            {/* Messages History */}
            <div className="p-4 sm:p-6 space-y-3 flex-1 overflow-y-auto">
              {activeChat.messages.map((msg) => {
                if (msg.sender === 'internal_note') {
                  return (
                    <div
                      key={msg.id}
                      className="p-3 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-900 dark:text-amber-200 my-2"
                    >
                      <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-amber-600" />
                          <span>{msg.senderName}</span>
                        </span>
                        <span className="text-[10px] text-amber-600">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  );
                }

                const isCustomer = msg.sender === 'customer';
                const isBot = msg.sender === 'bot';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-0.5 px-1">
                      {isBot ? msg.senderName : isCustomer ? activeChat.customerName : msg.senderName} • {msg.time}
                    </div>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                        isCustomer
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xs'
                          : isBot
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 shadow-xs'
                          : 'bg-emerald-600 text-white shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Composer with Internal Note Switcher */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setIsInternalNote(false)}
                  className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                    !isInternalNote
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {isAr ? 'رد رسمي للعميل (WhatsApp)' : 'Reply to Customer'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsInternalNote(true)}
                  className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                    isInternalNote
                      ? 'bg-amber-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {isAr ? 'ملاحظة داخلية للصيادلة (@Mention)' : 'Private Internal Note'}
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    isInternalNote
                      ? (isAr ? 'اكتب ملاحظة داخلية للفريق الطبي... (لن يراها المريض)' : 'Add a private note visible only to staff...')
                      : (isAr ? 'اكتب رسالتك للمريض عبر الواتساب...' : 'Type WhatsApp reply to patient...')
                  }
                  className={`flex-1 px-4 py-2.5 text-xs rounded-xl border focus:outline-none transition ${
                    isInternalNote
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                  }`}
                />

                <button
                  type="submit"
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs text-white transition flex items-center gap-1.5 shadow ${
                    isInternalNote ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال' : 'Send'}</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: 6 CHATBOT FLOWS */}
      {activeTabSub === 'bots' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'خريطة روبوتات المحادثة الآلية الستة (The 6 Automated Chatbots)' : 'The 6 Autonomous Pharmacy Chatbot Flows'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'تعمل على مدار ٢٤ ساعة لفلترة الطلبات، تخفيف الضغط عن الصيادلة، وتحويل الحالات المعقدة فقط للإنسان'
                : '24/7 automated flows resolving 80% of routine interactions before reaching duty pharmacists'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chatbotFlows.map((bot) => {
              const BotIcon = bot.icon;
              return (
                <div
                  key={bot.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                        <BotIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {bot.stat}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {bot.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {bot.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 block">{isAr ? 'شرط التفعيل:' : 'Trigger:'}</span>
                    <span>{bot.trigger}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: DOCKER & WHITE-LABELING INSTRUCTIONS ACCORDING TO USER PROMPT */}
      {activeTabSub === 'white_label' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'دليل إعداد وتخصيص هوية SOLA لـ Chatwoot (White-Labeling Guide)' : 'Chatwoot to SOLA White-Labeling Implementation Blueprint'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'مرجع فني لتطبيق المتغيرات البيئية أو إعادة بناء حاويات Docker لتظهر المنصة باسم SOLA بالكامل'
                : 'Step-by-step production Docker variables and full code white-labeling instructions'}
            </p>
          </div>

          {/* Quick Method 1: Environment Variables */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
              {isAr ? 'الطريقة الأولى: التعديل السريع بدون إعادة بناء السورس كود (Fast .env)' : 'Method 1: Fast White-Labeling via .env Variables'}
            </span>
            <pre className="p-3 bg-slate-950 text-slate-200 text-[11px] font-mono rounded-xl overflow-x-auto">
{`# .env configuration for SOLA
INSTALLATION_NAME=SOLA
BRAND_NAME=SOLA
LOGO_URL=https://chat.sola.com/brand/logo.png
FAVICON_URL=https://chat.sola.com/brand/favicon.ico
WIDGET_BRAND_URL=https://bendaryph.com
DISABLE_CHATWOOT_EVENTS=true
CW_API_ONLY=false`}
            </pre>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'تنفيذ الأمر لإعادة التشغيل: docker compose down && docker compose up -d'
                : 'Restart containers: docker compose down && docker compose up -d'}
            </p>
          </div>

          {/* Method 2: Full Source Code Branding */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
              {isAr ? 'الطريقة الثانية: التعديل الكامل للكود المصدري (Full Source Rebranding)' : 'Method 2: Full Source Rebranding & Docker Build'}
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <p>• <strong>Assets:</strong> Replace images in <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">app/javascript/dashboard/assets/images/</code> with SOLA logo.</p>
              <p>• <strong>Theme Colors:</strong> Update primary brand hex codes in <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">tailwind.config.js</code> to El-Bendary Crimson (#D32F2F) and SOLA Emerald (#15803D).</p>
              <p>• <strong>Locales:</strong> Replace Chatwoot mentions in <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">config/locales/en.yml</code> and <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">ar.yml</code>.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
