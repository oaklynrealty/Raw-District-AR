import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const templateHeadMarker = "<!-- Raw Arabic attached template head -->";

const templateHead = `${templateHeadMarker}
<script id="tailwind-config">
window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f8f9ff",
        "primary-container": "#101b31",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3f9",
        "surface-container": "#eceef3",
        "surface-container-high": "#e7e8ee",
        "surface-container-highest": "#e1e2e8",
        secondary: "#775a19",
        "secondary-container": "#fdd587",
        primary: "#000000",
        "on-primary": "#ffffff",
        "on-primary-container": "#d8e2ff",
        "on-surface": "#191c20",
        "on-surface-variant": "#45474d",
        "outline-variant": "#c5c6ce"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "section-gap-mobile": "64px",
        gutter: "24px",
        "container-max": "1280px",
        "margin-x": "32px",
        "section-gap": "120px"
      },
      fontFamily: {
        "stats-number": ["EB Garamond", "serif"],
        "headline-md": ["EB Garamond", "serif"],
        "display-lg-mobile": ["EB Garamond", "serif"],
        "headline-sm": ["EB Garamond", "serif"],
        "body-md": ["Manrope", "Arial", "sans-serif"],
        "display-lg": ["EB Garamond", "serif"],
        "body-lg": ["Manrope", "Arial", "sans-serif"],
        "label-caps": ["Manrope", "Arial", "sans-serif"]
      },
      fontSize: {
        "stats-number": ["48px", {"lineHeight": "1.0", "fontWeight": "400"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "400"}],
        "display-lg-mobile": ["40px", {"lineHeight": "1.2", "fontWeight": "500"}],
        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "0", "fontWeight": "500"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "700"}]
      }
    }
  }
};
</script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;700&family=Manrope:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
<style id="raw-ar-attached-template-css">
  .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}
  .raw-symbol{display:inline-flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-weight:800;line-height:1}
  .max-w-container-max{max-width:1280px}
  .px-margin-x{padding-left:32px;padding-right:32px}
  .py-section-gap{padding-top:120px;padding-bottom:120px}
  .gap-gutter{gap:24px}
  .font-display-lg,.font-display-lg-mobile,.font-headline-md,.font-headline-sm,.font-stats-number{font-family:"EB Garamond",serif}
  .font-body-md,.font-body-lg,.font-label-caps{font-family:Manrope,Arial,sans-serif}
  .text-display-lg{font-size:64px;line-height:1.1;font-weight:500;letter-spacing:0}
  .text-display-lg-mobile{font-size:40px;line-height:1.2;font-weight:500}
  .text-headline-md{font-size:32px;line-height:1.3;font-weight:500}
  .text-headline-sm{font-size:24px;line-height:1.4;font-weight:500}
  .text-body-md{font-size:16px;line-height:1.6}
  .text-body-lg{font-size:18px;line-height:1.6}
  .text-label-caps{font-size:12px;line-height:1;letter-spacing:.1em;font-weight:700}
  .bg-background{background:#f8f9ff!important}
  .bg-primary{background:#000!important}
  .bg-primary-container{background:#101b31!important}
  .bg-secondary{background:#775a19!important}
  .bg-surface-container{background:#eceef3!important}
  .bg-surface-container-low{background:#f2f3f9!important}
  .bg-surface-container-high{background:#e7e8ee!important}
  .bg-surface-container-highest{background:#e1e2e8!important}
  .text-primary{color:#000!important}
  .text-secondary{color:#775a19!important}
  .text-on-primary{color:#fff!important}
  .text-on-primary-container{color:#d8e2ff!important}
  .text-on-surface{color:#191c20!important}
  .text-on-surface-variant{color:#45474d!important}
  .border-outline-variant\\/10{border-color:rgba(197,198,206,.1)!important}
  .border-outline-variant\\/20{border-color:rgba(197,198,206,.2)!important}
  .border-outline-variant\\/30{border-color:rgba(197,198,206,.3)!important}
  body.raw-attached-template{background:#f8f9ff;color:#191c20;font-family:Manrope,Arial,sans-serif}
  .raw-attached-template .glass-nav{background:rgba(248,249,255,.85);backdrop-filter:blur(12px)}
  .raw-attached-template .hero-overlay{background:linear-gradient(to left,rgba(16,27,49,.9) 0%,rgba(16,27,49,.4) 100%)}
  .raw-attached-template header h1{font-size:clamp(2.35rem,4.6vw,4.25rem);line-height:1.14;max-width:min(680px,calc(100vw - 64px));overflow-wrap:break-word}
  .raw-attached-template header .max-w-2xl{max-width:680px}
  .raw-attached-template header .bg-secondary,
  .raw-attached-template #contact .bg-secondary{background:#775a19!important;color:#fff!important}
  .raw-attached-template header .border{border-color:rgba(255,255,255,.34)}
  .raw-attached-template .reveal{opacity:0;transform:translateY(30px);transition:all .8s ease-out}
  .raw-attached-template .reveal.active{opacity:1;transform:translateY(0)}
  .raw-attached-template #mobile-menu{transition:transform .3s ease-in-out;transform:translateX(100%)}
  .raw-attached-template #mobile-menu.active{transform:translateX(0)}
  .raw-attached-template .tracked-form-shell #landingLeadForm{display:grid;gap:1.25rem}
  .raw-attached-template .tracked-form-shell #landingLeadForm .field-grid{display:grid;gap:1.25rem}
  .raw-attached-template .tracked-form-shell #landingLeadForm .field{display:grid;gap:.5rem}
  .raw-attached-template .tracked-form-shell #landingLeadForm label{color:#45474d;font-family:Manrope,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;line-height:1;text-transform:uppercase}
  .raw-attached-template .tracked-form-shell #landingLeadForm input,
  .raw-attached-template .tracked-form-shell #landingLeadForm select,
  .raw-attached-template .tracked-form-shell .country-picker-trigger{width:100%;border:0;border-bottom:2px solid #e1e2e8;border-radius:0;background:transparent;color:#000;padding:.75rem 0;font-size:1rem;box-shadow:none}
  .raw-attached-template .tracked-form-shell #landingLeadForm input:focus,
  .raw-attached-template .tracked-form-shell #landingLeadForm select:focus,
  .raw-attached-template .tracked-form-shell .country-picker-trigger:focus{outline:0;border-color:#775a19;box-shadow:none}
  .raw-attached-template .tracked-form-shell .phone-input-row{display:grid;grid-template-columns:minmax(145px,190px) 1fr;align-items:end;gap:1rem}
  .raw-attached-template .tracked-form-shell .country-picker{position:relative}
  .raw-attached-template .tracked-form-shell .country-picker-current{display:flex;align-items:center;gap:.45rem;min-width:0}
  .raw-attached-template .tracked-form-shell .country-picker-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .raw-attached-template .tracked-form-shell .country-picker-panel{position:absolute;top:calc(100% + 10px);right:0;z-index:90;width:min(430px,calc(100vw - 56px));max-height:320px;overflow:hidden;border:1px solid rgba(117,90,25,.2);border-radius:14px;background:#fff;box-shadow:0 24px 58px rgba(16,27,49,.18)}
  .raw-attached-template .tracked-form-shell .country-picker-search{width:calc(100% - 24px)!important;margin:12px;border:1px solid #e1e2e8!important;border-radius:10px!important;padding:.8rem!important}
  .raw-attached-template .tracked-form-shell .country-picker-list{max-height:238px;overflow:auto}
  .raw-attached-template .tracked-form-shell .country-picker-option{display:grid;width:100%;grid-template-columns:36px 1fr auto;align-items:center;gap:.8rem;border:0;background:#fff;color:#191c20;padding:.75rem 1rem;text-align:right}
  .raw-attached-template .tracked-form-shell .country-picker-option:hover,
  .raw-attached-template .tracked-form-shell .country-picker-option[aria-selected="true"]{background:#f2f3f9}
  .raw-attached-template .tracked-form-shell .field-error,
  .raw-attached-template .tracked-form-shell .form-error{display:none;color:#ba1a1a;font-size:.85rem}
  .raw-attached-template .tracked-form-shell .field.is-invalid .field-error,
  .raw-attached-template .tracked-form-shell .form-error.is-visible{display:block}
  .raw-attached-template .tracked-form-shell .hidden-field{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
  .raw-attached-template .tracked-form-shell .btn-outer{margin-top:.5rem}
  .raw-attached-template .tracked-form-shell #landingSubmitBtn{width:100%;border:0;border-radius:.75rem;background:#775a19;color:#fff;padding:1.25rem;font-size:1.05rem;font-weight:800;box-shadow:0 18px 42px rgba(119,90,25,.18);transition:transform .18s ease,background .18s ease}
  .raw-attached-template .tracked-form-shell #landingSubmitBtn:hover{background:rgba(119,90,25,.9);transform:translateY(-1px)}
  .raw-attached-template .tracked-form-shell #landingSubmitBtn:disabled{cursor:not-allowed;opacity:.65;transform:none}
  .raw-attached-template .tracked-form-shell .disclaimer{color:rgba(69,71,77,.72);font-size:.76rem;line-height:1.7;text-align:center}
  .raw-attached-template .tracked-form-shell .form-success{display:none;margin-top:1rem;border:1px solid rgba(119,90,25,.22);border-radius:1rem;background:#f8f9ff;padding:1.2rem;text-align:center}
  .raw-attached-template .tracked-form-shell .form-success.is-visible{display:block}
  .raw-attached-template .tracked-form-shell .form-success h3{font-family:"EB Garamond",serif;font-size:1.8rem;color:#101b31}
  .raw-attached-template .whatsapp-float{position:fixed;right:24px;bottom:24px;z-index:60;display:flex;width:58px;height:58px;align-items:center;justify-content:center;border:1px solid rgba(119,90,25,.22);border-radius:999px;background:#25d366;color:#fff;box-shadow:0 18px 38px rgba(16,27,49,.22)}
  .raw-attached-template .whatsapp-float svg{width:29px;height:29px}
  .raw-attached-template .whatsapp-float:hover{transform:translateY(-2px)}
  .raw-attached-template .permit-qr-badge{position:fixed;left:18px;bottom:24px;z-index:58;display:inline-grid;grid-template-columns:52px;justify-items:center;gap:.35rem;border:1px solid rgba(201,168,76,.32);border-radius:10px;background:rgba(15,14,11,.86);color:#e6c364;padding:.42rem;box-shadow:0 16px 38px rgba(0,0,0,.28);text-decoration:none;backdrop-filter:blur(14px);pointer-events:none;user-select:none}
  .raw-attached-template .permit-qr-badge img{width:52px;height:52px;border-radius:6px;background:#fff;object-fit:cover}
  .raw-attached-template .permit-qr-badge span{max-width:64px;color:#e6c364;font-size:.58rem;font-weight:800;line-height:1.15;text-align:center}
  @media (min-width:768px){.raw-attached-template .tracked-form-shell #landingLeadForm .field-grid{grid-template-columns:1fr 1fr}.raw-attached-template .tracked-form-shell #nameField{grid-column:1/-1}.raw-attached-template .tracked-form-shell #phoneField{grid-column:1/-1}}
  @media (max-width:767px){.raw-attached-template .px-margin-x{padding-left:24px;padding-right:24px}.raw-attached-template .py-section-gap{padding-top:72px;padding-bottom:72px}.raw-attached-template header{min-height:100svh}.raw-attached-template header h1{font-size:clamp(2.45rem,12vw,3.35rem);max-width:100%;line-height:1.1}.raw-attached-template .tracked-form-shell .phone-input-row{grid-template-columns:1fr}.raw-attached-template .whatsapp-float{right:18px;bottom:90px;width:54px;height:54px}.raw-attached-template .permit-qr-badge{left:12px;bottom:90px;grid-template-columns:46px;padding:.36rem}.raw-attached-template .permit-qr-badge img{width:46px;height:46px}.raw-attached-template .permit-qr-badge span{max-width:58px;font-size:.54rem}.raw-attached-template .mobile-actions{display:flex}}
</style>`;

const localImages = {
  hero: "/assets/raw-district/photos/template-exterior-master-aerial.png?v=20260610-new-ar-template",
  lifestyle: "/assets/raw-district/photos/template-skyline-metro.png?v=20260610-new-ar-template",
  night: "/assets/raw-district/photos/template-building-evening.png?v=20260610-new-ar-template",
  interior: "/assets/raw-district/photos/template-interior-living.png?v=20260610-new-ar-template",
  amenity: "/assets/raw-district/photos/template-amenity-lounge.png?v=20260610-new-ar-template",
  map: "/assets/raw-district/photos/raw-district-aerial-metro.jpg?v=20260610-new-ar-template",
  consultant: "/assets/raw-district/photos/template-interior-living.png?v=20260610-new-ar-template",
  logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png"
};

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

async function writeIfChanged(filePath, before, after) {
  if (!after || before === after) return false;
  await fs.writeFile(filePath, after);
  return true;
}

async function findHtmlFiles(dir) {
  const found = [];
  async function walk(currentDir) {
    let entries;
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") return;
      throw error;
    }
    for (const entry of entries) {
      if ([".git", "assets", "scripts", "src"].includes(entry.name)) continue;
      const filePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) await walk(filePath);
      if (entry.isFile() && entry.name.endsWith(".html")) found.push(filePath);
    }
  }
  await walk(dir);
  return found;
}

function matchFirst(html, pattern, fallback = "") {
  const match = html.match(pattern);
  return match ? match[0] : fallback;
}

function extractTrackedForm(html) {
  const form = matchFirst(html, /<form id="landingLeadForm"[\s\S]*?<\/form>/);
  if (!form) throw new Error("Could not find tracked lead form.");

  return form
    .replace(/<form id="landingLeadForm"([^>]*)>/, '<form id="landingLeadForm" class="tracked-lead-form" $1>')
    .replace(/<button id="landingSubmitBtn"[^>]*>[\s\S]*?<\/button>/, '<button id="landingSubmitBtn" type="submit">تحدث مع كاميلا للحصول على الأسعار</button>')
    .replace(/<p class="disclaimer form-security-note">[\s\S]*?<\/p>/, '<p class="disclaimer form-security-note">بياناتك تستخدم فقط للرد على استفسارك العقاري.</p>')
    .replace(/<p class="disclaimer">[\s\S]*?<\/p>/, '<p class="disclaimer">By submitting this form, you agree to be contacted by our property consultants regarding your inquiry.</p>');
}

function extractSuccess(html) {
  const success = matchFirst(html, /<div id="landingSuccess"[\s\S]*?<\/div>\s*<\/div>/);
  if (!success) {
    return `<div id="landingSuccess" class="form-success"><h3>شكراً لك</h3><p class="section-copy">تم استلام طلبك. سيتواصل معك فريق Oaklyn Realty بخصوص Raw District.</p></div>`;
  }
  return success.replace(/<\/div>\s*$/, "");
}

function enhanceHead(head) {
  if (head.includes(templateHeadMarker)) return head;
  return head.replace("</head>", `${templateHead}\n</head>`);
}

function renderTrackedContact(form, success) {
  return `<div class="tracked-form-shell">
${form}
${success}
</div>`;
}

function withIconFallback(markup) {
  const icons = {
    menu: "☰",
    close: "×",
    payments: "$",
    trending_up: "↗",
    shield_with_house: "✓",
    flight_takeoff: "✈",
    verified: "✓",
    psychology: "◎",
    diamond: "◇",
    location_on: "⌖",
    directions_subway: "M",
    apartment: "▦",
    flight: "✈",
    explore: "⌖",
    format_quote: "”",
    chat: "☎",
    expand_more: "⌄",
    verified_user: "✓",
    analytics: "↗",
    home_work: "▦",
    call: "☎",
    mail: "@"
  };

  return markup.replace(/<span class="material-symbols-outlined([^"]*)">([^<]+)<\/span>/g, (_match, classes, name) => {
    const icon = icons[String(name || "").trim()] || "";
    return `<span class="raw-symbol${classes}" aria-hidden="true">${icon}</span>`;
  });
}

function renderBody(form, success, noscript) {
  const contactForm = renderTrackedContact(form, success);
  return withIconFallback(`${noscript}
<!-- Top Navigation Bar -->
<nav class="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10">
  <div class="max-w-container-max mx-auto px-margin-x py-4 flex justify-between items-center">
    <div class="flex items-center gap-8">
      <a class="flex items-center" href="#">
        <img alt="Oaklyn Realty Logo" class="h-10 md:h-12 w-auto object-contain" src="${localImages.logo}">
      </a>
      <div class="hidden md:flex gap-6 items-center">
        <a class="font-body-md text-body-md tracking-wider text-on-surface-variant hover:text-secondary transition-colors" href="#overview">نظرة عامة</a>
        <a class="font-body-md text-body-md tracking-wider text-on-surface-variant hover:text-secondary transition-colors" href="#gallery">المعرض</a>
        <a class="font-body-md text-body-md tracking-wider text-on-surface-variant hover:text-secondary transition-colors" href="#location">الموقع</a>
        <a class="font-body-md text-body-md tracking-wider text-on-surface-variant hover:text-secondary transition-colors" href="#contact">تواصل</a>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <a class="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps text-label-caps hover:scale-105 active:scale-95 transition-all" href="#contact">طلب التفاصيل</a>
      <button class="md:hidden text-primary p-2" id="menu-toggle" type="button" aria-label="القائمة">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  </div>
</nav>
<!-- Mobile Navigation Overlay -->
<div class="fixed inset-0 z-[60] bg-white flex flex-col md:hidden" id="mobile-menu">
  <div class="flex justify-between items-center p-6 border-b">
    <img alt="Oaklyn Realty Logo" class="h-10" src="${localImages.logo}">
    <button class="text-primary p-2" id="menu-close" type="button" aria-label="إغلاق القائمة">
      <span class="material-symbols-outlined text-3xl">close</span>
    </button>
  </div>
  <div class="flex flex-col gap-8 p-8 items-center text-center mt-12">
    <a class="font-headline-sm text-primary" href="#overview">نظرة عامة</a>
    <a class="font-headline-sm text-primary" href="#gallery">المعرض</a>
    <a class="font-headline-sm text-primary" href="#location">الموقع</a>
    <a class="font-headline-sm text-primary" href="#contact">تواصل</a>
    <a class="w-full bg-secondary text-white py-4 rounded-xl font-bold" href="#contact">طلب التفاصيل</a>
  </div>
</div>
<!-- Hero Section -->
<header class="relative h-screen min-h-[750px] flex items-center overflow-hidden">
  <div class="absolute inset-0 z-0">
    <img alt="Raw District by IMTIAZ" class="w-full h-full object-cover" src="${localImages.hero}">
    <div class="absolute inset-0 hero-overlay"></div>
  </div>
  <div class="relative z-10 max-w-container-max mx-auto px-margin-x w-full flex flex-col md:flex-row items-center justify-between gap-12">
    <div class="max-w-2xl text-white">
      <span class="inline-block px-4 py-1 border border-secondary text-secondary font-label-caps text-label-caps mb-6">RAW DISTRICT BY IMTIAZ</span>
      <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight mb-6">عنوان سكني وعملي متكامل على شارع الشيخ زايد</h1>
      <p class="font-body-lg text-body-lg text-on-primary-container max-w-lg mb-8">مع وصول مباشر للمترو في قلب جبل علي، نقدم لك تجربة معيشية مفروشة بالكامل تجمع بين التصميم العصري والاستخدام اليومي العملي.</p>
      <div class="flex flex-wrap gap-4">
        <a class="bg-secondary text-white px-8 py-4 rounded-lg font-bold transition-all hover:bg-secondary/90" href="#contact">طلب الكتيب</a>
        <a class="border border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary transition-all" href="#gallery">استعراض المعرض</a>
      </div>
    </div>
    <div class="hidden lg:block w-96 bg-white p-8 rounded-3xl shadow-2xl border border-outline-variant/20">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-secondary/20 shadow-md">
            <img alt="Property Consultant" class="w-full h-full object-cover" src="${localImages.consultant}">
          </div>
        </div>
        <h2 class="font-headline-sm text-headline-sm text-primary mb-2">ابدأ استثمارك اليوم</h2>
        <p class="text-on-surface-variant text-sm">سيتواصل معك فريقنا لتوضيح الأسعار والتوافر</p>
        <p class="text-secondary font-bold text-xs mt-1">استشارة عقارية</p>
      </div>
      <div class="space-y-3">
        <a class="block w-full text-center bg-secondary text-white py-4 rounded-xl font-bold text-md hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]" href="#contact">احصل على الأسعار</a>
        <a class="block w-full text-center border border-outline-variant/40 text-primary py-4 rounded-xl font-bold text-md hover:bg-surface-container-low transition-all" href="#gallery">شاهد الصور</a>
      </div>
    </div>
  </div>
</header>
<!-- Quick Lead Capture Strip -->
<div class="relative z-30 bg-primary-container py-8 border-y border-white/10">
  <div class="max-w-container-max mx-auto px-margin-x">
    <div class="flex flex-col lg:flex-row items-center gap-6">
      <p class="text-white font-bold whitespace-nowrap text-lg">طلب عروض فورية:</p>
      <div class="w-full lg:flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white/70">الاسم الكامل</div>
      <div class="w-full lg:flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white/70">البريد الإلكتروني</div>
      <div class="w-full lg:flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white/70">رقم واتساب</div>
      <a class="w-full lg:w-auto bg-secondary text-white px-10 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors whitespace-nowrap text-center" href="#contact">إرسال الطلب</a>
    </div>
  </div>
</div>
<!-- Facts Strip -->
<section class="bg-surface-container-low py-12 relative z-20 mx-4 md:mx-auto max-w-container-max rounded-2xl shadow-xl mt-12" id="overview">
  <div class="px-margin-x grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">سعر البداية</p><p class="font-stats-number text-headline-sm text-secondary">٦٤٩،٠٠٠ درهم</p></div>
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">الموقع</p><p class="font-headline-sm text-headline-sm">وسط جبل علي</p></div>
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">المطور</p><p class="font-headline-sm text-headline-sm">IMTIAZ</p></div>
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">أنواع الوحدات</p><p class="font-headline-sm text-headline-sm">استوديو - ٣ غرف</p></div>
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">خطة الدفع</p><p class="font-headline-sm text-headline-sm">٢٠ / ٣٠ / ٥٠</p></div>
    <div class="reveal active"><p class="font-label-caps text-label-caps text-on-surface-variant mb-2">التسليم</p><p class="font-headline-sm text-headline-sm">Q1 2029</p></div>
  </div>
</section>
<!-- Why Dubai Section -->
<section class="py-section-gap max-w-container-max mx-auto px-margin-x overflow-hidden">
  <div class="grid lg:grid-cols-2 gap-20 items-center">
    <div class="reveal relative">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8"><img alt="Dubai property investment" class="w-full h-80 object-cover rounded-2xl shadow-lg" src="${localImages.lifestyle}"></div>
        <div class="col-span-4 self-end"><img alt="Raw District evening view" class="w-full h-48 object-cover rounded-2xl shadow-lg" src="${localImages.night}"></div>
      </div>
      <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-outline-variant/20 max-w-[220px]">
        <p class="font-stats-number text-secondary text-4xl">محتمل</p>
        <p class="text-sm font-bold">عائد إيجاري حسب السوق والتوافر</p>
      </div>
    </div>
    <div class="reveal">
      <h2 class="font-display-lg text-display-lg-mobile md:text-headline-md mb-8">لماذا الاستثمار في دبي؟</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="bg-surface-container p-6 rounded-2xl"><span class="material-symbols-outlined text-secondary text-4xl mb-4">payments</span><h4 class="font-bold text-xl mb-2">٠٪ ضريبة دخل</h4><p class="text-on-surface-variant text-sm">بيئة ضريبية واضحة تساعد المستثمر على التخطيط لعوائده.</p></div>
        <div class="bg-surface-container p-6 rounded-2xl"><span class="material-symbols-outlined text-secondary text-4xl mb-4">trending_up</span><h4 class="font-bold text-xl mb-2">طلب مستمر</h4><p class="text-on-surface-variant text-sm">سوق عالمي مدعوم بالسياحة والأعمال والنمو السكاني.</p></div>
        <div class="bg-surface-container p-6 rounded-2xl"><span class="material-symbols-outlined text-secondary text-4xl mb-4">shield_with_house</span><h4 class="font-bold text-xl mb-2">أمان وتنظيم</h4><p class="text-on-surface-variant text-sm">قوانين واضحة وبيئة منظمة للمستثمرين المحليين والدوليين.</p></div>
        <div class="bg-surface-container p-6 rounded-2xl"><span class="material-symbols-outlined text-secondary text-4xl mb-4">flight_takeoff</span><h4 class="font-bold text-xl mb-2">مركز عالمي</h4><p class="text-on-surface-variant text-sm">سهولة الوصول إلى دبي من الأسواق الرئيسية حول العالم.</p></div>
      </div>
    </div>
  </div>
</section>
<!-- Boutique Philosophy -->
<section class="py-24 bg-surface-container-highest">
  <div class="max-w-container-max mx-auto px-margin-x text-center">
    <div class="reveal mb-16">
      <img alt="Oaklyn Realty" class="h-16 mx-auto mb-8 opacity-80 grayscale brightness-0" src="${localImages.logo}">
      <h2 class="font-headline-md text-headline-md mb-6">فلسفة الاستشارة العقارية الراقية</h2>
      <p class="font-body-lg text-on-surface-variant max-w-3xl mx-auto">في Oaklyn Realty، نؤمن بأن كل عميل يستحق تجربة مخصصة بعيدة عن البيع التقليدي. نحن مستشاروك في مراجعة التفاصيل، التوافر، وخيارات الدفع قبل اتخاذ القرار.</p>
    </div>
    <div class="grid md:grid-cols-3 gap-12">
      <div class="reveal"><div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-secondary"><span class="material-symbols-outlined text-3xl">verified</span></div><h4 class="font-bold mb-3">شفافية واضحة</h4><p class="text-on-surface-variant text-sm">نقدم الأرقام والتفاصيل المتاحة بوضوح حتى يكون قرارك مبنياً على معلومات.</p></div>
      <div class="reveal"><div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-secondary"><span class="material-symbols-outlined text-3xl">psychology</span></div><h4 class="font-bold mb-3">خبرة بالسوق</h4><p class="text-on-surface-variant text-sm">نساعدك على مقارنة المشروع بالموقع، الطلب، والخطط المناسبة.</p></div>
      <div class="reveal"><div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-secondary"><span class="material-symbols-outlined text-3xl">diamond</span></div><h4 class="font-bold mb-3">خدمة مخصصة</h4><p class="text-on-surface-variant text-sm">تواصل مباشر للحصول على الأسعار، المخططات، والتوافر المحدث.</p></div>
    </div>
  </div>
</section>
<!-- Luxury Gallery -->
<section class="py-section-gap max-w-container-max mx-auto px-margin-x" id="gallery">
  <div class="text-center mb-16 reveal">
    <h2 class="font-headline-md text-headline-md mb-4">المساكن والمساحات الحيوية</h2>
    <p class="font-body-lg text-on-surface-variant max-w-2xl mx-auto">صور مختارة لـ Raw District تشمل الواجهة الخارجية، المرافق، والمساكن المصممة وفق معايير عملية وراقية.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
    <div class="reveal aspect-video overflow-hidden rounded-xl group relative"><img alt="External Architecture" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${localImages.hero}"><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8"><p class="text-white font-headline-sm">الواجهة المعمارية</p></div></div>
    <div class="reveal aspect-video overflow-hidden rounded-xl group relative"><img alt="Smart Interiors" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${localImages.interior}"><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8"><p class="text-white font-headline-sm">المساكن الذكية</p></div></div>
    <div class="reveal aspect-video overflow-hidden rounded-xl group relative"><img alt="Luxury Amenities" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${localImages.amenity}"><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8"><p class="text-white font-headline-sm">المرافق</p></div></div>
    <div class="reveal aspect-video overflow-hidden rounded-xl group relative"><img alt="Evening Ambiance" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${localImages.night}"><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8"><p class="text-white font-headline-sm">نمط الحياة</p></div></div>
  </div>
</section>
<!-- Location & Access -->
<section class="bg-primary-container text-white py-section-gap" id="location">
  <div class="max-w-container-max mx-auto px-margin-x grid lg:grid-cols-2 gap-16 items-center">
    <div class="reveal">
      <h2 class="font-headline-md text-headline-md mb-8">وسط جبل علي، دبي</h2>
      <div class="space-y-6">
        <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary text-2xl">location_on</span><div><p class="font-bold text-lg">وصول مباشر لممر شارع الشيخ زايد</p><p class="text-on-primary-container">اتصال سلس بكافة وجهات دبي الحيوية.</p></div></div>
        <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary text-2xl">directions_subway</span><div><p class="font-bold text-lg">دقيقتان إلى محطة مترو جبل علي</p><p class="text-on-primary-container">سهولة التنقل للموظفين والمقيمين.</p></div></div>
        <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary text-2xl">apartment</span><div><p class="font-bold text-lg">١٠ دقائق إلى مدينة إكسبو دبي</p><p class="text-on-primary-container">القرب من أكبر مركز للابتكار والفعاليات العالمية.</p></div></div>
        <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary text-2xl">flight</span><div><p class="font-bold text-lg">٢٠ دقيقة إلى مطار آل مكتوم الدولي</p><p class="text-on-primary-container">موقع متصل بمستقبل دبي اللوجستي والسفر الدولي.</p></div></div>
      </div>
    </div>
    <div class="reveal relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
      <div class="absolute inset-0 bg-secondary/10 z-10"></div>
      <img alt="Strategic location map" class="w-full h-full object-cover" src="${localImages.map}">
      <div class="absolute bottom-6 right-6 z-20 bg-white p-4 rounded-xl text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white"><span class="material-symbols-outlined">explore</span></div>
        <div><p class="font-bold">الموقع المثالي</p><p class="text-xs opacity-70">استثمار للمستقبل</p></div>
      </div>
    </div>
  </div>
</section>
<!-- Consultant Profile Section -->
<section class="py-section-gap max-w-container-max mx-auto px-margin-x">
  <div class="bg-surface-container-high rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 reveal">
    <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0"><img alt="Property Consultant" class="w-full h-full object-cover" src="${localImages.consultant}"></div>
    <div class="flex-grow">
      <span class="material-symbols-outlined text-secondary text-5xl mb-4">format_quote</span>
      <h3 class="font-headline-md text-headline-md mb-4">"نحن نساعدك على قراءة فرصة Raw District بهدوء: السعر، الموقع، الخطة، والتوافر الحالي قبل اتخاذ القرار."</h3>
      <p class="text-on-surface-variant mb-8">مستشار عقاري معتمد لدى Oaklyn Realty</p>
      <a class="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform" href="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="consultant_whatsapp" data-whatsapp-destination="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District"><span class="material-symbols-outlined">chat</span>تواصل مباشرة عبر واتساب</a>
    </div>
  </div>
</section>
<!-- FAQ Section -->
<section class="py-section-gap bg-background">
  <div class="max-w-3xl mx-auto px-margin-x">
    <div class="text-center mb-16 reveal"><h2 class="font-headline-md text-headline-md mb-4">الأسئلة الشائعة</h2><p class="text-on-surface-variant">كل ما تحتاج معرفته عن مشروع Raw District</p></div>
    <div class="space-y-4">
      ${[
        ["ما هي خطة الدفع المتاحة للمشروع؟", "الخطة المنشورة هي ٢٠٪ دفعة مقدمة، ٣٠٪ خلال فترة البناء، و٥٠٪ عند التسليم. يرجى تأكيد التفاصيل مع المستشار قبل الحجز."],
        ["هل الشقق مفروشة؟", "نعم، الوحدات في Raw District مصممة كمساكن مفروشة بالكامل مع ميزات عملية للمعيشة اليومية والاستثمار."],
        ["ما هي المرافق التي يوفرها المشروع؟", "يضم المشروع مسابح، نادي رياضي، صالات لاونج، مناطق عمل مشتركة، ومساحات خضراء، إلى جانب قربه من المترو."],
        ["هل توفر Oaklyn Realty خدمات التأجير وإعادة البيع؟", "نعم. يمكن لفريق Oaklyn Realty مساعدتك في التأجير أو إعادة البيع عند الحاجة، حسب ظروف السوق والتوافر."]
      ].map(([question, answer]) => `<div class="reveal bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm"><button class="w-full px-6 py-5 flex justify-between items-center text-right font-bold text-lg hover:bg-surface-container-lowest transition-colors faq-btn" type="button"><span>${question}</span><span class="material-symbols-outlined text-secondary transition-transform">expand_more</span></button><div class="faq-content max-h-0 overflow-hidden transition-all duration-300"><div class="px-6 pb-5 text-on-surface-variant">${answer}</div></div></div>`).join("\n      ")}
    </div>
  </div>
</section>
<!-- Lead Form -->
<section class="py-section-gap relative overflow-hidden" id="contact">
  <div class="absolute inset-0 z-0"><img alt="Raw District interiors" class="w-full h-full object-cover opacity-5" src="${localImages.interior}"></div>
  <div class="relative z-10 max-w-5xl mx-auto px-margin-x reveal active">
    <div class="bg-white rounded-3xl shadow-2xl border border-outline-variant/20 overflow-visible">
      <div class="grid lg:grid-cols-5">
        <div class="lg:col-span-2 bg-primary-container p-8 text-white">
          <div class="flex justify-center lg:justify-start mb-8"><div class="w-24 h-24 rounded-full overflow-hidden border-2 border-secondary/20 shadow-md"><img alt="Consultant" class="w-full h-full object-cover" src="${localImages.consultant}"></div></div>
          <h3 class="font-headline-sm mb-6">احجز استشارتك المجانية</h3>
          <div class="space-y-6">
            <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary">verified_user</span><p class="text-sm text-on-primary-container">معلومات موثقة ومباشرة من المطور.</p></div>
            <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary">analytics</span><p class="text-sm text-on-primary-container">مراجعة مالية واضحة للعائد المحتمل حسب السوق.</p></div>
            <div class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary">home_work</span><p class="text-sm text-on-primary-container">مخططات الطوابق والوحدات المتوفرة.</p></div>
          </div>
          <div class="mt-12 flex gap-4 flex-wrap">
            <span class="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px]">RERA: ٥٩٢١٠</span>
            <span class="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px]">DED: ١٥٨٩٥٩٣</span>
          </div>
        </div>
        <div class="lg:col-span-3 p-8 md:p-12">
          <div class="text-center lg:text-right mb-10">
            <h2 class="font-headline-md text-headline-md mb-2">ابدأ استثمارك اليوم</h2>
            <p class="text-on-surface-variant">أدخل بياناتك وسيتواصل معك فريقنا بأحدث الأسعار والتوافر</p>
          </div>
          ${contactForm}
        </div>
      </div>
    </div>
  </div>
</section>
<!-- Footer -->
<footer class="bg-primary-container text-white pt-section-gap pb-12">
  <div class="max-w-container-max mx-auto px-margin-x">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
      <div class="md:col-span-2">
        <img alt="Oaklyn Logo" class="h-12 mb-8 brightness-0 invert" src="${localImages.logo}">
        <p class="font-body-md text-on-primary-container max-w-md mb-8">Oaklyn Realty شركة استشارات عقارية متخصصة في دبي تساعد العملاء على اتخاذ قرارات عقارية ذكية تدعم أسلوب الحياة وأهداف الاستثمار طويل المدى.</p>
        <div class="flex gap-4 flex-wrap"><span class="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-on-primary-container">مسجل في RERA</span><span class="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-on-primary-container">مرخص من DED</span></div>
      </div>
      <div>
        <h4 class="font-bold mb-6">تواصل معنا</h4>
        <ul class="space-y-4 text-on-primary-container">
          <li class="flex items-start gap-2"><span class="material-symbols-outlined text-secondary text-sm">location_on</span>برج أوكسفورد، مكتب ٦٠٧، الخليج التجاري، دبي</li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-sm">call</span><a href="tel:+971585835230" data-call-link data-cta-location="footer_call">+971 58 583 5230</a></li>
          <li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-sm">mail</span><a href="mailto:sales@oaklynrealty.ae">sales@oaklynrealty.ae</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-6">روابط سريعة</h4>
        <ul class="space-y-4 text-on-primary-container">
          <li><a class="hover:text-secondary transition-colors" href="https://www.oaklynrealty.ae/about">عن Oaklyn</a></li>
          <li><a class="hover:text-secondary transition-colors" href="https://oaklynrealty.ae/privacy-policy">سياسة الخصوصية</a></li>
          <li><a class="hover:text-secondary transition-colors" href="https://oaklynrealty.ae/terms-and-conditions">الشروط والأحكام</a></li>
        </ul>
      </div>
    </div>
    <div class="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-on-primary-container/70">
      <p>© ٢٠٢٦ Oaklyn Realty. جميع الحقوق محفوظة.</p>
      <div class="flex items-center gap-8"><span>رخصة DED: ١٥٨٩٥٩٣</span><span>ORN RERA: ٥٩٢١٠</span></div>
    </div>
  </div>
</footer>
<div class="md:hidden fixed bottom-6 left-6 right-6 z-40 flex gap-4 mobile-actions">
  <a class="flex-1 bg-[#25D366] text-white flex items-center justify-center py-4 rounded-xl shadow-xl font-bold gap-2" href="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="mobile_contact_bar" data-whatsapp-destination="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District"><span class="material-symbols-outlined">chat</span>واتساب</a>
  <a class="flex-1 bg-primary text-white flex items-center justify-center py-4 rounded-xl shadow-xl font-bold gap-2" href="tel:+971585835230" data-call-link data-cta-location="mobile_call"><span class="material-symbols-outlined">call</span>اتصال</a>
</div>
<a class="whatsapp-float hidden md:flex" href="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="floating_icon" data-whatsapp-destination="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District" aria-label="واتساب">
  <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M19.11 17.23c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.63-.67 1.86-1.31.23-.64.23-1.2.16-1.31-.07-.12-.25-.19-.53-.33ZM16.02 4a11.93 11.93 0 0 0-10.2 18.13L4 28l6.03-1.58A11.96 11.96 0 1 0 16.02 4Zm0 21.86c-1.86 0-3.58-.55-5.03-1.49l-.36-.22-3.58.94.96-3.49-.23-.36a9.86 9.86 0 1 1 8.24 4.62Z"/></svg>
</a>
<div class="permit-qr-badge" role="img" aria-label="عرض رمز تصريح المشروع" data-permit-qr-badge>
  <img src="/assets/raw-district/permit-qr.jpeg?v=20260618-permit-qr" alt="رمز تصريح المشروع" loading="lazy" decoding="async">
  <span>رمز تصريح المشروع</span>
</div>
<script>
function reveal(){document.querySelectorAll(".reveal").forEach(function(el){if(el.getBoundingClientRect().top < window.innerHeight - 150){el.classList.add("active")}})}
window.addEventListener("scroll", reveal); reveal();
window.addEventListener("scroll", function(){var nav=document.querySelector("nav"); if(!nav)return; if(window.scrollY>50){nav.classList.add("shadow-lg")}else{nav.classList.remove("shadow-lg")}});
var menuToggle=document.getElementById("menu-toggle");
var menuClose=document.getElementById("menu-close");
var mobileMenu=document.getElementById("mobile-menu");
if(menuToggle&&menuClose&&mobileMenu){
  menuToggle.addEventListener("click",function(){mobileMenu.classList.add("active");document.body.style.overflow="hidden"});
  menuClose.addEventListener("click",function(){mobileMenu.classList.remove("active");document.body.style.overflow=""});
  mobileMenu.querySelectorAll("a").forEach(function(link){link.addEventListener("click",function(){mobileMenu.classList.remove("active");document.body.style.overflow=""})});
}
document.querySelectorAll(".faq-btn").forEach(function(btn){btn.addEventListener("click",function(){var content=btn.nextElementSibling;var icon=btn.querySelector(".material-symbols-outlined");document.querySelectorAll(".faq-content").forEach(function(other){if(other!==content){other.style.maxHeight="0";var otherIcon=other.previousElementSibling.querySelector(".material-symbols-outlined");if(otherIcon)otherIcon.style.transform="rotate(0deg)"}});if(content.style.maxHeight&&content.style.maxHeight!=="0px"){content.style.maxHeight="0";if(icon)icon.style.transform="rotate(0deg)"}else{content.style.maxHeight=content.scrollHeight+"px";if(icon)icon.style.transform="rotate(180deg)"}})});
</script>`);
}

function patchHtml(html) {
  if (!html.includes("Raw District") || !html.includes("landingLeadForm")) return html;
  const head = enhanceHead(matchFirst(html, /<head>[\s\S]*?<\/head>/));
  const noscript = matchFirst(html, /<noscript><iframe[\s\S]*?<\/iframe><\/noscript>\s*/);
  const clientScript = matchFirst(html, /<script src="\/client\.js[^"]*" defer><\/script>/, '<script src="/client.js?v=20260610-new-ar-template" defer></script>');
  const form = extractTrackedForm(html);
  const success = extractSuccess(html);

  return `<!DOCTYPE html>
<html class="scroll-smooth" dir="rtl" lang="ar">${head}
<body class="bg-background text-on-surface font-body-md overflow-x-hidden is-rtl template-raw-ar raw-attached-template">
${renderBody(form, success, noscript)}
${clientScript}
</body>
</html>`;
}

function patchConfigUrls(html) {
  return html
    .replace(/"source_page":\s*"[^"]*"/g, '"source_page": "raw-district-ae.oaklynrealty.ae"')
    .replace(/"landing_page_url":\s*"[^"]*"/g, '"landing_page_url": "https://raw-district-ae.oaklynrealty.ae/"')
    .replace(/"thank_you_page_url":\s*"[^"]*"/g, '"thank_you_page_url": "https://raw-district-ae.oaklynrealty.ae/thank-you/"');
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changedHtml = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchConfigUrls(patchHtml(before));
  if (await writeIfChanged(filePath, before, after)) changedHtml += 1;
}

console.log(`Applied exact attached Raw Arabic template to ${changedHtml} HTML file(s).`);
