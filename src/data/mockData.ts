import { Branch, Product, PrescriptionOrder, SystemNotification, CustomerConversation } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'br-tanta-main',
    name: 'El-Bendary Tanta Flagship (El Geish)',
    nameAr: 'صيدلية البنداري - المقر الرئيسي طنطا (شارع الجيش)',
    city: 'Tanta',
    cityAr: 'طنطا',
    address: '42 El-Geish St., Next to RED Automotive & Medical Center, Tanta',
    addressAr: '٤٢ شارع الجيش، بجوار ريد للسيارات والمركز الطبي، طنطا',
    phone: '01200400089',
    hours: '24 Hours / 7 Days',
    hoursAr: '٢٤ ساعة طوال أيام الأسبوع',
    lat: 30.7865,
    lng: 31.0004,
    manager: 'Dr. Alaa Ezzeldin (د. علاء عز الدين)',
    is24Hours: true,
    status: 'active',
    staffCount: 14,
    monthlyVolume: 420000,
  },
  {
    id: 'br-tanta-stadium',
    name: 'El-Bendary Stadium Branch',
    nameAr: 'صيدلية البنداري - فرع الاستاد طنطا',
    city: 'Tanta',
    cityAr: 'طنطا',
    address: 'El-Bahr St. intersection with Stadium Rd., Tanta',
    addressAr: 'تقاطع شارع البحر مع طريق الاستاد، طنطا',
    phone: '01200400089',
    hours: '24 Hours / 7 Days',
    hoursAr: '٢٤ ساعة طوال أيام الأسبوع',
    lat: 30.7921,
    lng: 31.0112,
    manager: 'Dr. Ahmed Sallam (د. أحمد سلام)',
    is24Hours: true,
    status: 'active',
    staffCount: 10,
    monthlyVolume: 310000,
  },
  {
    id: 'br-mansoura-univ',
    name: 'El-Bendary Mansoura University',
    nameAr: 'صيدلية البنداري - فرع جامعة المنصورة',
    city: 'Mansoura',
    cityAr: 'المنصورة',
    address: 'Gihan El-Sadat St., Front of Mansoura University Specialized Medical Hospital',
    addressAr: 'شارع جيهان السادات، أمام المستشفى التخصصي، المنصورة',
    phone: '01200400089',
    hours: '24 Hours / 7 Days',
    hoursAr: '٢٤ ساعة طوال أيام الأسبوع',
    lat: 31.0425,
    lng: 31.3541,
    manager: 'Dr. Mahmoud El-Naggar (د. محمود النجار)',
    is24Hours: true,
    status: 'active',
    staffCount: 12,
    monthlyVolume: 395000,
  },
  {
    id: 'br-mahalla-shoubra',
    name: 'El-Bendary El-Mahalla Hub',
    nameAr: 'صيدلية البنداري - فرع المحلة الكبرى الرئيسي',
    city: 'El Mahalla',
    cityAr: 'المحلة الكبرى',
    address: '23 July St., Shoubra Square, El Mahalla El Kubra',
    addressAr: 'شارع ٢٣ يوليو، ميدان شبرا، المحلة الكبرى',
    phone: '01200400089',
    hours: '8:00 AM - 3:00 AM',
    hoursAr: '٨:٠٠ ص - ٣:٠٠ فجراً',
    lat: 30.9706,
    lng: 31.1669,
    manager: 'Dr. Mona Barakat (د. منى بركات)',
    is24Hours: false,
    status: 'active',
    staffCount: 9,
    monthlyVolume: 280000,
  },
  {
    id: 'br-zagazig-quds',
    name: 'El-Bendary Zagazig Central',
    nameAr: 'صيدلية البنداري - فرع الزقازيق القومية',
    city: 'Zagazig',
    cityAr: 'الزقازيق',
    address: 'El-Qawmia District, Opposite Faculty of Medicine, Zagazig',
    addressAr: 'حي القومية، أمام كلية الطب، الزقازيق',
    phone: '01200400089',
    hours: '24 Hours / 7 Days',
    hoursAr: '٢٤ ساعة طوال أيام الأسبوع',
    lat: 30.5877,
    lng: 31.5020,
    manager: 'Dr. Kareem Fouad (د. كريم فؤاد)',
    is24Hours: true,
    status: 'active',
    staffCount: 11,
    monthlyVolume: 340000,
  },
  {
    id: 'br-cairo-heliopolis',
    name: 'El-Bendary Cairo Heliopolis Hub',
    nameAr: 'صيدلية البنداري - فرع مصر الجديدة القاهرة',
    city: 'Cairo',
    cityAr: 'القاهرة',
    address: 'El-Hegaz St., Heliopolis, Cairo',
    addressAr: 'شارع الحجاز، مصر الجديدة، القاهرة',
    phone: '01200400089',
    hours: '24 Hours / 7 Days',
    hoursAr: '٢٤ ساعة طوال أيام الأسبوع',
    lat: 30.1012,
    lng: 31.3325,
    manager: 'Dr. Omar Tawfik (د. عمر توفيق)',
    is24Hours: true,
    status: 'active',
    staffCount: 15,
    monthlyVolume: 510000,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'RX-AUG-1000',
    barcode: '622100234001',
    name: 'Augmentin 1g Tablets (14 Tab)',
    nameAr: 'أوجمنتين ١ جم أقراص (١٤ قرص)',
    category: 'Prescription Medications',
    categoryAr: 'أدوية روشتات',
    price: 131.0,
    stock: 18,
    lowStockThreshold: 25, // LOW STOCK!
    dosageForm: 'Tablets',
    manufacturer: 'GSK Egypt',
    prescriptionRequired: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2027-04-30',
    batchNumber: 'AUG24089',
    branchStock: {
      'br-tanta-main': 4,
      'br-tanta-stadium': 3,
      'br-mansoura-univ': 2,
      'br-mahalla-shoubra': 5,
      'br-zagazig-quds': 2,
      'br-cairo-heliopolis': 2
    }
  },
  {
    id: 'prod-002',
    sku: 'RX-CON-5MG',
    barcode: '622100234002',
    name: 'Concor 5mg (30 Tab) Bisoprolol',
    nameAr: 'كونكور ٥ مجم (٣٠ قرص) بيسوبرولول',
    category: 'Prescription Medications',
    categoryAr: 'أدوية روشتات',
    price: 70.0,
    stock: 142,
    lowStockThreshold: 30,
    dosageForm: 'Film-coated Tablets',
    manufacturer: 'Merck Serono',
    prescriptionRequired: true,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2028-01-15',
    batchNumber: 'CON25112',
    branchStock: {
      'br-tanta-main': 35,
      'br-tanta-stadium': 28,
      'br-mansoura-univ': 24,
      'br-mahalla-shoubra': 18,
      'br-zagazig-quds': 17,
      'br-cairo-heliopolis': 20
    }
  },
  {
    id: 'prod-003',
    sku: 'RX-JAN-50-1000',
    barcode: '622100234003',
    name: 'Janumet 50/1000mg (56 Tab)',
    nameAr: 'جانوميت ٥٠/١٠٠٠ مجم (٥٦ قرص) لمرضى السكري',
    category: 'Prescription Medications',
    categoryAr: 'أدوية روشتات',
    price: 360.0,
    stock: 8,
    lowStockThreshold: 15, // CRITICAL LOW STOCK!
    dosageForm: 'Film-coated Tablets',
    manufacturer: 'MSD Egypt',
    prescriptionRequired: true,
    image: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2026-11-20',
    batchNumber: 'JAN24901',
    branchStock: {
      'br-tanta-main': 2,
      'br-tanta-stadium': 1,
      'br-mansoura-univ': 2,
      'br-mahalla-shoubra': 0,
      'br-zagazig-quds': 1,
      'br-cairo-heliopolis': 2
    }
  },
  {
    id: 'prod-004',
    sku: 'OTC-PAN-EXT',
    barcode: '622100234004',
    name: 'Panadol Extra Paracetamol 500mg + Caffeine (24 Tab)',
    nameAr: 'بنادول إكسترا أحمر (٢٤ قرص)',
    category: 'Personal Care & First Aid',
    categoryAr: 'العناية الشخصية والإسعافات',
    price: 52.0,
    stock: 260,
    lowStockThreshold: 50,
    dosageForm: 'Caplets',
    manufacturer: 'Haleon / GSK',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2027-09-10',
    batchNumber: 'PAN25044',
    branchStock: {
      'br-tanta-main': 70,
      'br-tanta-stadium': 50,
      'br-mansoura-univ': 45,
      'br-mahalla-shoubra': 30,
      'br-zagazig-quds': 35,
      'br-cairo-heliopolis': 30
    }
  },
  {
    id: 'prod-005',
    sku: 'BEA-LRP-ANT50',
    barcode: '3337875546431',
    name: 'La Roche-Posay Anthelios UVMune 400 Invisible Fluid SPF50+',
    nameAr: 'لاروش بوزيه واقي شمس أنثيليوس سائل غير مرئي SPF50+',
    category: 'Beauty & Skincare',
    categoryAr: 'التجميل والعناية بالبشرة',
    price: 780.0,
    originalPrice: 850.0,
    stock: 12,
    lowStockThreshold: 20, // LOW STOCK!
    dosageForm: 'Fluid 50ml',
    manufacturer: 'L\'Oréal Cosmetique Active',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2027-06-30',
    batchNumber: 'LRP24887',
    branchStock: {
      'br-tanta-main': 4,
      'br-tanta-stadium': 2,
      'br-mansoura-univ': 3,
      'br-mahalla-shoubra': 0,
      'br-zagazig-quds': 1,
      'br-cairo-heliopolis': 2
    }
  },
  {
    id: 'prod-006',
    sku: 'BEA-CER-MOIST',
    barcode: '3337875597181',
    name: 'CeraVe Moisturising Cream with Hyaluronic Acid (454g)',
    nameAr: 'كريم سيرافي المرطب مع حمض الهيالورونيك والسيراميدات (٤٥٤ جم)',
    category: 'Beauty & Skincare',
    categoryAr: 'التجميل والعناية بالبشرة',
    price: 690.0,
    stock: 45,
    lowStockThreshold: 15,
    dosageForm: 'Cream Tub',
    manufacturer: 'CeraVe / L\'Oréal',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2027-12-31',
    batchNumber: 'CER25001',
    branchStock: {
      'br-tanta-main': 12,
      'br-tanta-stadium': 8,
      'br-mansoura-univ': 9,
      'br-mahalla-shoubra': 4,
      'br-zagazig-quds': 4,
      'br-cairo-heliopolis': 8
    }
  },
  {
    id: 'prod-007',
    sku: 'BAB-NAN-1',
    barcode: '7613035123456',
    name: 'Nestlé NAN Optipro 1 Infant Formula (800g)',
    nameAr: 'حليب أطفال نان أوبتي برو ١ من نستله (٨٠٠ جم)',
    category: 'Mother & Baby Care',
    categoryAr: 'الأم والطفل',
    price: 495.0,
    stock: 16,
    lowStockThreshold: 20, // LOW STOCK!
    dosageForm: 'Powder Tin',
    manufacturer: 'Nestlé Nutrition',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2026-10-15',
    batchNumber: 'NAN24712',
    branchStock: {
      'br-tanta-main': 5,
      'br-tanta-stadium': 3,
      'br-mansoura-univ': 4,
      'br-mahalla-shoubra': 1,
      'br-zagazig-quds': 1,
      'br-cairo-heliopolis': 2
    }
  },
  {
    id: 'prod-008',
    sku: 'VIT-OME-PLUS',
    barcode: '6223001889012',
    name: 'Omega 3 Plus Soft Gelatin Capsules (30 Caps)',
    nameAr: 'أوميجا ٣ بلس كبسولات جيلاتينية رخوة (٣٠ كبسولة)',
    category: 'Vitamins & Nutritional Supplements',
    categoryAr: 'الفيتامينات والمكملات الغذائية',
    price: 99.0,
    stock: 85,
    lowStockThreshold: 25,
    dosageForm: 'Softgels',
    manufacturer: 'SEDICO Pharmaceuticals',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2028-02-28',
    batchNumber: 'OME25088',
    branchStock: {
      'br-tanta-main': 25,
      'br-tanta-stadium': 18,
      'br-mansoura-univ': 14,
      'br-mahalla-shoubra': 8,
      'br-zagazig-quds': 10,
      'br-cairo-heliopolis': 10
    }
  },
  {
    id: 'prod-009',
    sku: 'DEV-BEU-BM28',
    barcode: '4211125658123',
    name: 'Beurer BM 28 Upper Arm Blood Pressure Monitor',
    nameAr: 'جهاز قياس ضغط الدم من أعلى الذراع بيورير ألماني BM 28',
    category: 'Medical Devices & Diagnostics',
    categoryAr: 'الأجهزة والمستلزمات الطبية',
    price: 1850.0,
    originalPrice: 2100.0,
    stock: 6,
    lowStockThreshold: 10, // LOW STOCK!
    dosageForm: 'Digital Medical Device',
    manufacturer: 'Beurer Germany',
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2030-01-01',
    batchNumber: 'BEU2410',
    branchStock: {
      'br-tanta-main': 2,
      'br-tanta-stadium': 1,
      'br-mansoura-univ': 1,
      'br-mahalla-shoubra': 1,
      'br-zagazig-quds': 0,
      'br-cairo-heliopolis': 1
    }
  },
  {
    id: 'prod-010',
    sku: 'BIO-PC-ICSI01',
    barcode: '6224009988112',
    name: 'Pharma Code Folli-Pure 75 IU (Sister Company ICSI Biologic)',
    nameAr: 'فولي-بيور ٧٥ وحدة دولية (حقن مجهري - تصنيع فارما كود الشقيقة)',
    category: 'Prescription Medications',
    categoryAr: 'أدوية تخصصية وبيولوجية (فارما كود)',
    price: 420.0,
    stock: 40,
    lowStockThreshold: 15,
    dosageForm: 'Lyophilized Vial + Solvent',
    manufacturer: 'Pharma Code (El-Bendary Group)',
    prescriptionRequired: true,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60',
    expiryDate: '2027-08-15',
    batchNumber: 'PC-BIO-2501',
    branchStock: {
      'br-tanta-main': 12,
      'br-tanta-stadium': 8,
      'br-mansoura-univ': 8,
      'br-mahalla-shoubra': 4,
      'br-zagazig-quds': 3,
      'br-cairo-heliopolis': 5
    }
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-001',
    title: 'Low Stock Alert: Janumet 50/1000mg',
    titleAr: 'تنبيه نقص المخزون: جانوميت ٥٠/١٠٠٠ مجم',
    message: 'Stock level in Delta branches reached 8 units (Threshold: 15). Immediate purchase order recommended.',
    messageAr: 'مستوى الرصيد في فروع الدلتا وصل ٨ علب (الحد الأدنى: ١٥). يوصى بإصدار أمر شراء فوري.',
    type: 'low_stock',
    timestamp: '10 mins ago',
    read: false,
    severity: 'critical'
  },
  {
    id: 'notif-002',
    title: 'New Prescription Uploaded',
    titleAr: 'روشتة جديدة مرفوعة للتحقق',
    message: 'Patient Sarah M. uploaded Rx for Tanta Flagship branch. Pharmacist verification pending.',
    messageAr: 'المريضة سارة م. قامت برفع روشتة لفرع طنطا الرئيسي. في انتظار اعتماد الصيدلي.',
    type: 'rx_alert',
    timestamp: '25 mins ago',
    read: false,
    severity: 'info'
  },
  {
    id: 'notif-003',
    title: 'Pharmasyst ERP Sync Successful',
    titleAr: 'تمت مزامنة نظام فارماسيست بنجاح',
    message: 'Connected to bindary.pharmasyst.net with user admin6. 1,420 SKUs synchronized across 17 branches.',
    messageAr: 'تم الاتصال بنظام bindary.pharmasyst.net باسم المستخدم admin6. تمت مزامنة ١٤٢٠ صنفاً عبر ١٧ فرعاً.',
    type: 'sync_event',
    timestamp: '1 hour ago',
    read: true,
    severity: 'success'
  },
  {
    id: 'notif-004',
    title: 'Monthly EDA Audit Report Ready',
    titleAr: 'تقرير المراجعة الدورية لهيئة الدواء جاهز',
    message: 'Automated inspection audit for Narcotic & Cold-Chain registers ready for export.',
    messageAr: 'تقرير التفتيش الآلي لدفاتر الجداول وسجلات سلسلة التبريد جاهز للتصدير.',
    type: 'audit_alert',
    timestamp: '3 hours ago',
    read: true,
    severity: 'info'
  }
];

export const INITIAL_PRESCRIPTIONS: PrescriptionOrder[] = [
  {
    id: 'rx-2026-901',
    patientName: 'Sarah Mostafa (سارة مصطفى)',
    patientPhone: '01099238471',
    date: 'Today, 02:45 PM',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60',
    status: 'pending_review',
    branchId: 'br-tanta-main',
    doctorName: 'Prof. Dr. Hazem Abdel-Fattah (Internal Medicine & Endocrinology)',
    extractedDrugs: [
      {
        name: 'Janumet 50/1000mg',
        dosage: '1 tablet twice daily with meals',
        frequency: 'Morning & Evening',
        availableInBranch: true
      },
      {
        name: 'Concor 5mg',
        dosage: '1 tablet once daily morning',
        frequency: 'Every 24 hrs',
        availableInBranch: true
      }
    ],
    pharmacistNotes: 'Confirmed patient history with chronic hypertension & diabetes. Requested 1 month refill.',
    totalAmount: 430.0
  },
  {
    id: 'rx-2026-899',
    patientName: 'Tarek El-Ghandour (طارق الغندور)',
    patientPhone: '01223940192',
    date: 'Today, 11:15 AM',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=60',
    status: 'verified',
    branchId: 'br-mansoura-univ',
    doctorName: 'Dr. Tamer Nabil (Chest & Pulmonology)',
    extractedDrugs: [
      {
        name: 'Augmentin 1g Tablets',
        dosage: '1 tablet every 12 hours after meals for 7 days',
        frequency: 'Bid',
        availableInBranch: true
      },
      {
        name: 'Panadol Extra',
        dosage: '1 tablet when necessary for pain/fever',
        frequency: 'PRN',
        availableInBranch: true
      }
    ],
    pharmacistNotes: 'Pharmacist approved. Packed and dispatched via express courier to Mansoura University district.',
    totalAmount: 183.0
  }
];

export const INITIAL_CONVERSATIONS: CustomerConversation[] = [
  {
    id: 'conv-wa-01',
    customerName: 'Eng. Amr Radwan (المهندس عمرو رضوان)',
    customerPhone: '+20 100 541 2309',
    channel: 'whatsapp',
    lastMessage: 'السلام عليكم، هل حقن الفولي بيور متوفرة في فرع طنطا المحطة؟ وممكن التوصيل؟',
    timestamp: '03:12 PM',
    unreadCount: 1,
    status: 'open',
    assignedAgent: 'Dr. Mahmoud (Pharmacist)',
    activeTypingAgent: 'Dr. Alaa Ezzeldin (منع التضارب: يقوم بكتابة الرد حالياً)',
    tags: ['WhatsApp Cloud API', 'ICSI / Pharma Code', 'Tanta Branch'],
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        channel: 'whatsapp',
        text: 'السلام عليكم يا دكتور',
        timestamp: '03:10 PM'
      },
      {
        id: 'm2',
        sender: 'bot',
        channel: 'whatsapp',
        text: 'أهلاً بك في صيدليات البنداري منذ ١٩٨٠! تم استلام رسالتك وتوجيهها للصيدلي المناوب.',
        timestamp: '03:10 PM'
      },
      {
        id: 'm3',
        sender: 'customer',
        channel: 'whatsapp',
        text: 'هل حقن الفولي بيور ٧٥ وحدة متوفرة في فرع طنطا وممكن توصيل؟',
        timestamp: '03:12 PM'
      }
    ],
    internalNotes: [
      'العميل مسجل في برنامج رعاية الحقن المجهري، تم حجز علبتين في ثلاجة حفظ الأدوية الحيوية بفرع طنطا.'
    ]
  },
  {
    id: 'conv-wa-02',
    customerName: 'Dr. Noha Salem (د. نهى سالم)',
    customerPhone: '+20 112 884 9102',
    channel: 'whatsapp',
    lastMessage: 'أرسلت صورة الروشتة لتأمين أكسا، برجاء فحص نسبة التحمل',
    timestamp: '02:50 PM',
    unreadCount: 0,
    status: 'pending',
    assignedAgent: 'Dr. Ahmed Sallam',
    tags: ['Insurance AXA', 'Rx Check', 'Delivery'],
    messages: [
      {
        id: 'm4',
        sender: 'customer',
        channel: 'whatsapp',
        text: 'أرسلت صورة الروشتة لتأمين أكسا، برجاء فحص نسبة التحمل',
        timestamp: '02:50 PM',
        hasAttachment: true,
        attachmentType: 'prescription'
      },
      {
        id: 'm5',
        sender: 'agent',
        agentName: 'Dr. Ahmed Sallam',
        channel: 'whatsapp',
        text: 'أهلاً بحضرتك يا دكتورة، تمت الموافقة بنسبة تحمل ١٠٪ وجاري تحضير الأدوية للتوصيل.',
        timestamp: '02:58 PM'
      }
    ],
    internalNotes: [
      'رقم بطاقة التأمين: AXA-EG-998124، تمت الموافقة الطبية عبر بوابة أكسا الإلكترونية.'
    ]
  }
];

export const FINANCIAL_PROJECTIONS = [
  { 
    year: '2025 (Audited)', 
    revenue: '€4.2M ($4.5M)', 
    branches: 17, 
    ecomShare: '8%', 
    ebitda: '€0.69M', 
    tenders: '30+ Active',
    retailRev: '€3.4M',
    ecomRev: '€0.3M',
    pharmaCodeRev: '€0.5M',
    totalRev: '€4.2M',
    margin: '16.5%'
  },
  { 
    year: '2026 (Phase 1)', 
    revenue: '$12.0M (€11.1M)', 
    branches: 22, 
    ecomShare: '18%', 
    ebitda: '€2.02M', 
    tenders: '42 Active',
    retailRev: '€6.8M',
    ecomRev: '€2.0M',
    pharmaCodeRev: '€2.3M',
    totalRev: '€11.1M',
    margin: '18.2%'
  },
  { 
    year: '2027 (Phase 2)', 
    revenue: '$24.5M (€22.7M)', 
    branches: 30, 
    ecomShare: '28%', 
    ebitda: '€4.77M', 
    tenders: '55 Active',
    retailRev: '€11.5M',
    ecomRev: '€6.3M',
    pharmaCodeRev: '€4.9M',
    totalRev: '€22.7M',
    margin: '21.0%'
  },
  { 
    year: '2028 (Phase 3)', 
    revenue: '$38.0M (€35.2M)', 
    branches: 45, 
    ecomShare: '36%', 
    ebitda: '€8.24M', 
    tenders: '70 Active',
    retailRev: '€16.2M',
    ecomRev: '€10.8M',
    pharmaCodeRev: '€8.2M',
    totalRev: '€35.2M',
    margin: '23.4%'
  },
  { 
    year: '2029-30 (Phase 4)', 
    revenue: '$52.0M (€48.1M)', 
    branches: 60, 
    ecomShare: '45%', 
    ebitda: '€12.4M', 
    tenders: '90+ Active',
    retailRev: '€21.0M',
    ecomRev: '€15.2M',
    pharmaCodeRev: '€11.9M',
    totalRev: '€48.1M',
    margin: '25.8%'
  }
];

export const FUNDING_PILLARS = [
  {
    id: 1,
    title: 'Network Expansion',
    titleAr: 'التوسع في شبكة الفروع',
    amount: '$4.0M',
    percentage: 50,
    color: '#D32F2F', // Brand crimson
    description: 'Grow from 17 to 30 branches primarily via acquisition of established high-volume pharmacies in the Delta region and Greater Cairo.',
    descriptionAr: 'زيادة الفروع من ١٧ إلى ٣٠ فرعاً بالاستحواذ على صيدليات قائمة ذات تدفق مالي وقاعدة عملاء جاهزة بالدلتا والقاهرة.'
  },
  {
    id: 2,
    title: 'Pharma Code Manufacturing',
    titleAr: 'توسعة مصنع فارما كود الشقيق',
    amount: '$2.0M',
    percentage: 25,
    color: '#15803D', // Emerald medical green
    description: 'Scale sister company manufacturing Biologics, Oncology, and ICSI (microinjection) medications, securing a captive retail supply channel.',
    descriptionAr: 'توسعة خطوط تصنيع الأدوية البيولوجية، وأدوية الأورام، والحقن المجهري لتوفير سلاسل إمداد حصرية ومضمونة للمجموعة.'
  },
  {
    id: 3,
    title: 'Systems, ERP & Logistics',
    titleAr: 'أنظمة ERP واللوجستيات الرقمية',
    amount: '$1.5M',
    percentage: 18.75,
    color: '#2563EB', // Enterprise blue
    description: 'Group-wide ERP (Odoo & Pharmasyst unified sync), automated replenishment, and B2C delivery app build-out on bendaryph.com.',
    descriptionAr: 'توحيد المنظومة السحابية (Odoo & Pharmasyst) وتطوير تطبيق توصيل الأدوية B2C على منصة bendaryph.com بالدلتا ثم القاهرة.'
  },
  {
    id: 4,
    title: 'Brand & Performance Marketing',
    titleAr: 'التسويق ونمو العلامة التجارية',
    amount: '$0.5M',
    percentage: 6.25,
    color: '#D97706', // Warm amber
    description: 'Brand awareness, healthcare practitioner engagement, digital acquisition for online delivery, and launch campaigns.',
    descriptionAr: 'حملات التسويق الرقمي وتطبيقات الهواتف، والتواصل مع الأطباء والمراكز الطبية لتعزيز مبيعات الفروع والمصنع.'
  }
];
