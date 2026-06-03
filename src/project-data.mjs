import { phoneCountries } from "./country-codes.mjs";
import { getTrackingConfig } from "../shared/gtm.mjs";

const asset = (name) => `/assets/raw-district/${name}`;

export const project = {
  name: "Raw District by Imtiaz",
  slug: "raw-district",
  sourcePage: "raw-district.oaklynrealty.ae",
  landingPageUrl: "https://raw-district.oaklynrealty.ae/",
  thankYouPageUrl: "https://raw-district.oaklynrealty.ae/thank-you",
  routePath: "/raw-district",
  alternateThankYouPath: "/raw-district-thank-you-page",
  assetVersion: "20260603-raw-district-media-2",
  webhookUrl: "https://hooks.zapier.com/hooks/catch/27424919/uvzwm7a/",
  whatsappWebhookUrl: "https://hooks.zapier.com/hooks/catch/27424919/4brjlen/",
  blacklistCheckUrl:
    "https://script.google.com/a/macros/oaklynrealty.ae/s/AKfycbxlrJjr1Up2ucBrAtOzkHA7gwITMLJEMAtPiAcmge1MkyIzsILTqTE7D3HK92rnuml2/exec?phone_number=%2B971501396674&email=mounir@oaklynrealty.ae&blacklisted=TRUE",
  blacklistTimeoutMs: 8000,
  tracking: getTrackingConfig(),
  brand: {
    company: "Oaklyn Realty",
    legalName: "Oaklyn Real Estate L.L.C.",
    phoneDisplay: "+971 58 583 5230",
    phoneHref: "+971585835230",
    whatsappDisplay: "+971 50 588 6769",
    whatsappHref: "+971505886769",
    email: "sales@oaklynrealty.ae",
    office: "Oxford Tower, Office 607, 6th Floor, Business Bay, Dubai, UAE",
    logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
    mainWebsite: "https://oaklynrealty.ae",
    privacyUrl: "https://oaklynrealty.ae/privacy-policy",
    termsUrl: "https://oaklynrealty.ae/terms-and-conditions",
    contactUrl: "https://oaklynrealty.ae/contact"
  },
  listing: {
    addressLocality: "Downtown Jebel Ali",
    addressRegion: "Dubai",
    addressCountry: "AE",
    developer: "Imtiaz Developments",
    regulator: "Dubai Land Department"
  },
  seo: {
    title: "Raw District by Imtiaz Dubai | Oaklyn Realty",
    description:
      "Review Raw District by Imtiaz with Oaklyn Realty. Explore project facts, gallery, location, and current launch details."
  },
  whatsappPrefill: "Hello, I would like more information about Raw District by Imtiaz.",
  hero: {
    eyebrow: "Presented by Oaklyn Realty",
    title: "Raw District by Imtiaz",
    subtitle:
      "A furnished live-work address on Sheikh Zayed Road with direct metro access, presented with clear project guidance.",
    background: asset("photos/raw-district-exterior-evening.jpg"),
    primaryCta: "Request Details",
    secondaryCta: "Request Brochure"
  },
  highlights: [
    { label: "Starting Price", value: "AED 649K" },
    { label: "Location", value: "Downtown Jebel Ali" },
    { label: "Developer", value: "Imtiaz Developments" },
    { label: "Unit Types", value: "Studio to 3BR" },
    { label: "Payment Plan", value: "20 / 30 / 50" },
    { label: "Handover", value: "Q1 2029*" }
  ],
  details: [
    { label: "Location", value: "Downtown Jebel Ali (Sheikh Zayed Road), Dubai" },
    { label: "Developer", value: "Imtiaz Developments" },
    { label: "Unit Types", value: "Studio, 1, 2, and 3-bedroom fully furnished residences" },
    { label: "Property Type", value: "Apartments, workspaces, and retail" },
    { label: "Starting Price", value: "From AED 649K, subject to developer confirmation" },
    { label: "Handover", value: "Q1 2029, subject to developer confirmation" }
  ],
  trustPoints: [
    {
      title: "Oaklyn Realty advisory",
      text: "A consultant follows up with project details, unit options, and next steps."
    },
    {
      title: "Developer confirmation",
      text: "Pricing, payment plans, inventory, and handover timelines may change."
    },
    {
      title: "No sensitive data",
      text: "The form only asks for basic enquiry details."
    }
  ],
  gallery: {
    eyebrow: "Visual Experience",
    title: "Residences, district spaces, and lifestyle views",
    text: "Selected project visuals for Raw District by Imtiaz, including exterior, amenities, residences, lifestyle, and district context.",
    items: [
      {
        eyebrow: "Exterior",
        title: "Raw District exterior",
        image: asset("photos/raw-district-exterior-evening.jpg")
      },
      {
        eyebrow: "Amenities",
        title: "Amenities and social spaces",
        image: asset("photos/01KRZC2WMRPAF9SN1239N0MPXK.jpg")
      },
      {
        eyebrow: "Residences",
        title: "Furnished interiors",
        image: asset("photos/raw-district-interior-suite.jpeg")
      },
      {
        eyebrow: "Lifestyle",
        title: "Lifestyle and tower outlook",
        image: asset("photos/01KRZC2WS1CRE6F83PKPAG3W7C.jpg")
      },
      {
        eyebrow: "District",
        title: "District and metro connectivity",
        image: asset("photos/raw-district-aerial-metro.jpg")
      }
    ]
  },
  snapshot: {
    eyebrow: "Why This Project",
    title: "A calm way to review Raw District",
    text: "",
    items: [
      {
        title: "Direct metro convenience",
        text: "Positioned around quick access to Jebel Ali Metro Station and the Sheikh Zayed Road corridor."
      },
      {
        title: "Fully furnished smart homes",
        text: "Studios to 3-bedroom homes with furnished interiors, contemporary layouts, and smart home system features."
      },
      {
        title: "Mixed-use daily environment",
        text: "Apartments, workspaces, retail, and social amenities."
      },
      {
        title: "Flexible payment structure",
        text: "Published 20/30/50 split; final instalment timing reconfirmed before reservation."
      }
    ]
  },
  about: {
    eyebrow: "About The Community",
    title: "Project information with clearer guidance",
    text:
      "Raw District by Imtiaz brings together fully furnished residences, smart home system features, workspaces, and retail in Downtown Jebel Ali on Sheikh Zayed Road. Oaklyn Realty helps you review the project facts before you request updated availability."
  },
  location: {
    eyebrow: "Location",
    title: "Downtown Jebel Ali, Dubai",
    bullets: [
      "Direct access to Sheikh Zayed Road corridor.",
      "2 minutes to Jebel Ali Metro Station.",
      "10 minutes to Expo City Dubai.",
      "20 minutes to Al Maktoum International Airport."
    ]
  },
  faq: [
    {
      question: "What is the starting price?",
      answer: "From AED 649K, subject to developer confirmation."
    },
    {
      question: "What property types are available?",
      answer: "Apartments, workspaces, and retail in a mixed-use district."
    },
    {
      question: "Is the payment plan fixed?",
      answer: "The 20/30/50 split is published; confirm with the developer before reservation."
    },
    {
      question: "Does Oaklyn guarantee returns?",
      answer: "No. Oaklyn does not guarantee ROI, rental income, or resale value."
    }
  ],
  form: {
    title: "Request Raw District Details",
    text: "Share your details and Oaklyn Realty will follow up with current availability, unit options, and payment-plan guidance.",
    splitName: false,
    labels: {
      name: "Full Name",
      phone: "Phone Number",
      email: "Email",
      project: "Preferred Unit",
      propertyType: "Inquiry Type"
    },
    phoneCountries,
    preferredProjects: ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "General Availability"],
    propertyTypes: ["Apartment", "Workspace", "Retail", "Not Sure Yet"],
    consent:
      "By submitting this form, you agree to be contacted by Oaklyn Realty regarding your property inquiry.",
    sensitiveDataNotice:
      "We do not request sensitive personal information such as passport numbers, Emirates ID, salary information, nationality, religion, or health-related data through this form.",
    blacklistBlockedMessage:
      "Thank you. Your inquiry has already been received.",
    blacklistErrorMessage:
      "Something went wrong. Please try again.",
    disclaimer:
      "All pricing, payment plans, availability, and handover dates remain subject to developer confirmation."
  },
  linkHub: {
    routePath: "/oaklyn-links",
    landingPageUrl: "https://oaklynrealty.ae/oaklyn-links/",
    seo: {
      title: "Oaklyn Realty Links",
      description:
        "Browse Oaklyn Realty pages, project links, and contact points from one clean page."
    },
    profile: {
      logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
      coverImage: asset("photos/01KRZC2W7944W0BCSM4FNRRT1N.jpg"),
      eyebrow: "Oaklyn Realty",
      handle: "@oaklynrealty",
      title: "Oaklyn Realty Links",
      subtitle:
        "Company pages, project links, and direct contact points in one cleaner mobile-first hub.",
      note: "Template preview only. Replace the placeholder cards with final links before launch."
    },
    sections: [
      {
        title: "Our Pages",
        layout: "compact",
        items: [
          {
            label: "Main Website",
            description: "Primary Oaklyn website link",
            logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
            href: "https://www.oaklynrealty.ae/"
          },
          {
            label: "About Oaklyn",
            description: "Company profile and brand page",
            logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
            href: "https://www.oaklynrealty.ae/about"
          },
          {
            label: "Contact Oaklyn",
            description: "Main contact page",
            logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
            href: "https://www.oaklynrealty.ae/contact"
          }
        ]
      },
      {
        title: "Project Pages",
        layout: "wide",
        items: [
          {
            label: "Raw District by Imtiaz",
            description: "Project landing page",
            image: asset("photos/01KRZC2W1B776Y1KJ2DHSTR0S1.jpg"),
            href: "https://raw-district.oaklynrealty.ae/"
          },
          {
            label: "Project Page 02",
            description: "Add your second featured project URL",
            icon: "bx bx-building",
            href: ""
          },
          {
            label: "Project Page 03",
            description: "Add your third featured project URL",
            icon: "bx bx-home-alt-2",
            href: ""
          }
        ]
      },
      {
        title: "Contacts",
        layout: "wide",
        items: [
          {
            label: "General Enquiries",
            description: "+971 58 583 5230",
            icon: "bx bxs-phone-call",
            href: "tel:+971585835230"
          },
          {
            label: "WhatsApp Contact",
            description: "+971 58 583 5230",
            icon: "bx bxl-whatsapp",
            href: "https://wa.me/971585835230"
          },
          {
            label: "Contact Sara",
            description: "+971 50 588 6769",
            avatarText: "S",
            href: "https://wa.me/971505886769"
          },
          {
            label: "Office Location",
            description: "Oxford Tower, 607, 6th Floor, Business Bay",
            icon: "bx bxs-map",
            href: "https://maps.app.goo.gl/9ERcbxY2ThDDv4aM6"
          }
        ]
      },
      {
        title: "CEO Contact",
        layout: "compact",
        items: [
          {
            label: "CEO Contact Page",
            description: "Executive profile or direct contact page",
            icon: "bx bx-user-voice",
            href: ""
          }
        ]
      }
    ]
  }
};

export const arabicProject = {
  ...project,
  homeHref: "/raw-district-ar/",
  name: "Raw District",
  slug: "raw-district-ar",
  sourcePage: "raw-district-ar.oaklynrealty.ae",
  landingPageUrl: "https://raw-district.oaklynrealty.ae/raw-district-ar/",
  thankYouPageUrl: "https://raw-district.oaklynrealty.ae/raw-district-ar-thank-you/",
  routePath: "/raw-district-ar",
  alternateThankYouPath: "/raw-district-ar-thank-you",
  seo: {
    title: "Raw District دبي | Oaklyn Realty",
    description:
      "اطلع على تفاصيل Raw District في داون تاون جبل علي مع Oaklyn Realty، بما يشمل الأسعار الحالية وخطة الدفع والموقع."
  },
  locale: {
    lang: "ar",
    dir: "rtl"
  },
  showMobileMenu: false,
  whatsappProgressMinMs: 2400,
  listing: {
    addressLocality: "Downtown Jebel Ali",
    addressRegion: "Dubai",
    addressCountry: "AE",
    regulator: "Dubai Land Department"
  },
  whatsappPrefill: "مرحباً، أود الحصول على مزيد من المعلومات عن مشروع Raw District.",
  hero: {
    eyebrow: "تقدمه Oaklyn Realty",
    title: "Raw District",
    subtitle:
      "عنوان سكني متكامل على شارع الشيخ زايد مع وصول مباشر إلى المترو ومساحات مصممة لحياة المدينة والعمل اليومي.",
    background: asset("photos/raw-district-exterior-evening.jpg"),
    primaryCta: "اطلب التفاصيل",
    secondaryCta: "اطلب البروشور"
  },
  highlights: [
    { label: "السعر الابتدائي", value: "من 649 ألف درهم" },
    { label: "الموقع", value: "داون تاون جبل علي" },
    { label: "أنواع الوحدات", value: "استوديو إلى 3 غرف" },
    { label: "خطة الدفع", value: "20 / 30 / 50" },
    { label: "التسليم", value: "الربع الأول 2029*" },
    { label: "التجهيز", value: "مفروشة بالكامل" }
  ],
  unitCardsSection: {
    eyebrow: "الأنواع والمساحات",
    title: "خيارات الوحدات",
    labels: {
      size: "المساحة",
      price: "السعر",
      pricePerSqft: "سعر القدم²"
    },
    note: "سعر القدم المربعة محسوب على السعر الابتدائي الظاهر، وقد يختلف حسب نوع الوحدة والموقع داخل المشروع.",
    items: [
      {
        title: "استوديو",
        size: "377 - 610 قدم²",
        price: "من 649,000 درهم",
        pricePerSqft: "حوالي 1,721 درهم/قدم²"
      },
      {
        title: "غرفة نوم واحدة",
        size: "614 - 721 قدم²",
        price: "من 889,000 درهم",
        pricePerSqft: "حوالي 1,448 درهم/قدم²"
      },
      {
        title: "غرفتا نوم",
        size: "1,055 - 1,399 قدم²",
        price: "من 1,480,000 درهم",
        pricePerSqft: "حوالي 1,403 درهم/قدم²"
      },
      {
        title: "3 غرف نوم",
        size: "1,399 قدم²",
        price: "من 1,950,000 درهم",
        pricePerSqft: "حوالي 1,394 درهم/قدم²"
      }
    ]
  },
  details: [
    { label: "الموقع", value: "داون تاون جبل علي، شارع الشيخ زايد، دبي" },
    { label: "أنواع الوحدات", value: "استوديو، غرفة نوم واحدة، غرفتان، وثلاث غرف نوم" },
    { label: "نوع المشروع", value: "شقق، مساحات عمل، ومساحات تجزئة" },
    { label: "السعر الابتدائي", value: "ابتداءً من 649 ألف درهم، ويخضع لتأكيد الجهة المطورة" },
    { label: "موعد التسليم", value: "الربع الأول 2029، ويخضع لتأكيد الجهة المطورة" },
    { label: "أسلوب المعيشة", value: "سكن حضري متكامل مع مرافق يومية وخدمات متنوعة" }
  ],
  trustPoints: [
    {
      title: "متابعة مباشرة من Oaklyn Realty",
      text: "يتواصل معك أحد المستشارين لمشاركة تفاصيل المشروع وخيارات الوحدات والخطوات التالية."
    },
    {
      title: "تأكيد الأسعار والتوافر",
      text: "الأسعار وخطط الدفع والمخزون ومواعيد التسليم قد تتغير وتخضع للتأكيد قبل الحجز."
    },
    {
      title: "بيانات أساسية فقط",
      text: "النموذج يطلب بيانات تواصل أساسية فقط دون أي معلومات شخصية حساسة."
    }
  ],
  gallery: {
    eyebrow: "المعرض",
    title: "صور للمشروع والمساحات الداخلية ونمط الحياة",
    text: "مجموعة صور توضيحية تساعدك على مراجعة الواجهات، المرافق، المساحات الداخلية، والمشهد العام للمشروع.",
    items: [
      {
        eyebrow: "الواجهة",
        title: "واجهة المشروع",
        image: asset("photos/raw-district-exterior-evening.jpg")
      },
      {
        eyebrow: "المرافق",
        title: "مرافق ومساحات اجتماعية",
        image: asset("photos/01KRZC2WMRPAF9SN1239N0MPXK.jpg")
      },
      {
        eyebrow: "الداخلية",
        title: "مساحات داخلية مفروشة",
        image: asset("photos/raw-district-interior-suite.jpeg")
      },
      {
        eyebrow: "نمط الحياة",
        title: "إطلالات ومساحات خارجية",
        image: asset("photos/01KRZC2WS1CRE6F83PKPAG3W7C.jpg")
      },
      {
        eyebrow: "المشروع",
        title: "المشروع والاتصال المباشر بالمترو",
        image: asset("photos/raw-district-aerial-metro.jpg")
      }
    ]
  },
  snapshot: {
    eyebrow: "لماذا Raw District",
    title: "عوامل تدعم قرار الشراء",
    text: "",
    items: [
      {
        title: "وصول مباشر إلى المترو",
        text: "موقع قريب من محطة مترو جبل علي مع اتصال سريع بممر شارع الشيخ زايد."
      },
      {
        title: "وحدات مفروشة بالكامل",
        text: "تصاميم عملية ووحدات جاهزة للاستخدام اليومي مع تشطيبات معاصرة."
      },
      {
        title: "نظام منزل ذكي",
        text: "مزايا ذكية تدعم أسلوب المعيشة اليومي وتمنح تجربة سكنية أكثر مرونة."
      },
      {
        title: "بيئة متكاملة للعمل والحياة",
        text: "شقق ومساحات عمل وتجزئة ومرافق اجتماعية ضمن وجهة واحدة."
      }
    ]
  },
  about: {
    eyebrow: "عن المشروع",
    title: "معلومات أوضح عن Raw District",
    text:
      "يجمع Raw District بين الوحدات السكنية المفروشة بالكامل، ومزايا المنزل الذكي، ومساحات العمل، والتجزئة في داون تاون جبل علي على شارع الشيخ زايد. تساعدك Oaklyn Realty على مراجعة تفاصيل المشروع والتوافر الحالي قبل اتخاذ الخطوة التالية."
  },
  location: {
    eyebrow: "الموقع",
    title: "داون تاون جبل علي، دبي",
    bullets: [
      "وصول مباشر إلى ممر شارع الشيخ زايد.",
      "دقيقتان إلى محطة مترو جبل علي.",
      "10 دقائق إلى إكسبو سيتي دبي.",
      "20 دقيقة إلى مطار آل مكتوم الدولي."
    ]
  },
  aboutUsSection: {
    eyebrow: "من نحن",
    title: "تعرف على Oaklyn Realty",
    text:
      "Oaklyn Realty شركة وساطة عقارية في دبي تساعد المشترين والمستثمرين على مراجعة المشاريع والخيارات الحالية وخطوات التملك بوضوح.",
    ctaLabel: "اعرف المزيد عن Oaklyn Realty",
    href: "https://www.oaklynrealty.ae/about"
  },
  faq: [
    {
      question: "ما هو السعر الابتدائي؟",
      answer: "يبدأ من 649 ألف درهم، ويخضع لتأكيد الجهة المطورة."
    },
    {
      question: "ما أنواع العقارات المتاحة؟",
      answer: "شقق ومساحات عمل ومساحات تجزئة ضمن مشروع متعدد الاستخدامات."
    },
    {
      question: "هل خطة الدفع نهائية؟",
      answer: "خطة 20/30/50 المعلنة قابلة للتأكيد النهائي عند الحجز."
    }
  ],
  form: {
    ...project.form,
    title: "اطلب تفاصيل Raw District",
    text: "شارك بياناتك وسيتواصل معك فريق Oaklyn Realty لتوضيح الأسعار الحالية وتوافر الوحدات وخطة الدفع.",
    labels: {
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      project: "الوحدة المفضلة",
      propertyType: "نوع الاستفسار"
    },
    preferredProjects: ["استوديو", "غرفة نوم واحدة", "غرفتا نوم", "ثلاث غرف نوم", "التوافر العام"],
    propertyTypes: ["شقة", "مساحة عمل", "تجزئة", "لست متأكداً بعد"],
    consent:
      "من خلال إرسال هذا النموذج، فإنك توافق على تواصل مستشاري Oaklyn Realty معك بخصوص استفسارك العقاري.",
    sensitiveDataNotice:
      "نحن لا نطلب معلومات شخصية حساسة مثل رقم الجواز أو الهوية الإماراتية أو الراتب أو الجنسية أو الحالة الصحية عبر هذا النموذج.",
    blacklistBlockedMessage:
      "شكراً لك. تم استلام استفسارك مسبقاً.",
    blacklistErrorMessage:
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    disclaimer:
      "جميع الأسعار وخطط الدفع والتوافر ومواعيد التسليم تخضع لتأكيد الجهة المطورة.",
    successText:
      "تم استلام طلبك. سيتواصل معك فريق Oaklyn Realty بخصوص Raw District.",
    thankYouText:
      "استلمت Oaklyn Realty طلبك بخصوص Raw District. نحن لا نطلب بيانات شخصية حساسة عبر هذا النموذج."
  },
  uiText: {
    nav_overview: "نظرة عامة",
    nav_gallery: "المعرض",
    nav_location: "الموقع",
    nav_contact: "تواصل",
    nav_website: "موقع أوكلِن",
    nav_request_details: "اطلب التفاصيل",
    mobile_menu_label: "القائمة",
    quick_highlights_eyebrow: "ملخص سريع",
    quick_highlights_title: "حقائق المشروع باختصار",
    request_information_eyebrow: "طلب المعلومات",
    basic_enquiry_only: "بيانات تواصل أساسية فقط",
    subject_to_confirmation: "الأسعار والتفاصيل تخضع للتأكيد",
    no_guaranteed_returns: "لا توجد أي وعود بعوائد استثمارية",
    form_phone_placeholder: "50 123 4567",
    form_phone_error: "يرجى إدخال رقم هاتف دولي صحيح.",
    form_email_error: "يرجى إدخال بريد إلكتروني صحيح.",
    form_select_error: "يرجى اختيار أحد الخيارات.",
    form_submit: "اطلب معلومات المشروع",
    form_submit_error: "تعذر إرسال الطلب حالياً. حاول مرة أخرى أو تواصل مع Oaklyn Realty مباشرة.",
    form_success_title: "شكراً لك",
    blocked_success_title: "شكراً لك",
    faq_eyebrow: "الأسئلة الشائعة",
    faq_title: "إجابات سريعة",
    trust_eyebrow: "الثقة والامتثال",
    trust_title: "آلية تواصل واضحة ومتوافقة",
    footer_about_text:
      "Oaklyn Realty شركة وساطة عقارية في دبي تساعدك على مراجعة تفاصيل المشروع والتوافر وخطوات المتابعة بوضوح.",
    footer_contact_heading: "التواصل",
    footer_legal_heading: "روابط مهمة",
    footer_contact_link: "اتصل بنا",
    footer_privacy_link: "سياسة الخصوصية",
    footer_terms_link: "الشروط والأحكام",
    whatsapp_floating_label: "واتساب",
    whatsapp_close: "إغلاق",
    whatsapp_eyebrow: "تحقق سريع",
    whatsapp_title: "تابع إلى واتساب",
    whatsapp_copy: "أدخل رقمك للتحقق السريع قبل فتح واتساب.",
    whatsapp_country_code: "مفتاح الدولة",
    whatsapp_phone: "رقم واتساب",
    whatsapp_phone_placeholder: "50 123 4567",
    whatsapp_phone_error: "يرجى إدخال رقم صحيح للمتابعة.",
    whatsapp_note: "نستخدم هذه الخطوة للتحقق السريع من رقمك قبل فتح واتساب.",
    whatsapp_error: "تعذر المتابعة إلى واتساب الآن. حاول مرة أخرى.",
    whatsapp_continue: "المتابعة إلى واتساب",
    whatsapp_progress_button_label: "يرجى الانتظار...",
    whatsapp_progress_waiting_label: "سيتم فتح واتساب خلال لحظات...",
    whatsapp_progress_step_1: "جارٍ تجهيز طلبك...",
    whatsapp_progress_step_2: "جارٍ التحقق من البيانات...",
    whatsapp_progress_step_3: "نحافظ على مكانك أثناء تجهيز التحويل إلى واتساب...",
    cancel: "إلغاء",
    gallery_prev: "الصورة السابقة",
    gallery_next: "الصورة التالية",
    phone_search_sr_label: "ابحث عن الدولة أو المفتاح",
    phone_search_placeholder: "اكتب اسم الدولة أو المفتاح",
    phone_search_empty: "لا توجد دولة مطابقة.",
    validation_name: "يرجى إدخال الاسم الكامل.",
    validation_first_name: "يرجى إدخال الاسم الأول.",
    validation_last_name: "يرجى إدخال اسم العائلة.",
    thank_you_meta_title_prefix: "شكراً لك",
    thank_you_meta_description: "تم استلام استفسارك العقاري لدى Oaklyn Realty.",
    thank_you_eyebrow: "تم استلام الطلب",
    thank_you_title: "شكراً لك. سيتواصل معك مستشارنا العقاري قريباً.",
    back_to_project: "العودة إلى المشروع",
    contact_oaklyn: "التواصل مع أوكلِن",
    mobile_call: "اتصال",
    mobile_whatsapp: "واتساب"
  }
};
