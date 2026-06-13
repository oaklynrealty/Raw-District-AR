import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const templateCssMarker = "/* Raw District Arabic light attached template refresh */";

const templateCss = `${templateCssMarker}
body.template-raw-ar{--raw-bg:#f8f9ff;--raw-bg-deep:#f1f3f8;--raw-panel:#fff;--raw-card:#fff;--raw-line:rgba(16,27,49,.12);--raw-gold:#c9a84c;--raw-gold-deep:#a98625;--raw-ink:#191c20;--raw-muted:rgba(25,28,32,.66);--raw-on-gold:#101b31;background:var(--raw-bg);color:var(--raw-ink)}
.template-raw-ar .topbar{min-height:80px;border-bottom:1px solid rgba(16,27,49,.08);background:rgba(248,249,255,.88);box-shadow:0 18px 42px rgba(16,27,49,.08)}
.template-raw-ar .nav{min-height:80px;width:min(1280px,calc(100% - 48px))}
.template-raw-ar .brand img{width:150px;max-height:52px;filter:none}
.template-raw-ar .brand span{display:inline-flex;max-width:170px;color:rgba(16,27,49,.7);font-size:.76rem;letter-spacing:.12em;line-height:1.35}
.template-raw-ar .nav-links a{color:rgba(25,28,32,.66);font-size:.82rem;font-weight:800}
.template-raw-ar .nav-links a:first-child{border-bottom:0;padding-bottom:0}
.template-raw-ar .nav-links a:first-child,.template-raw-ar .nav-links a:hover,.template-raw-ar .nav-links a:focus-visible{color:var(--raw-gold-deep)}
.template-raw-ar .nav-actions{gap:.85rem}
.template-raw-ar .nav-phone{border-color:rgba(201,168,76,.28);background:rgba(201,168,76,.12)}
.template-raw-ar .mobile-menu-button{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid rgba(16,27,49,.12);border-radius:999px;background:rgba(255,255,255,.72);color:var(--raw-on-gold)}
.template-raw-ar .mobile-menu{inset:80px 0 auto;border-bottom:1px solid rgba(16,27,49,.1);background:rgba(248,249,255,.98)}
.template-raw-ar .mobile-menu a{border-top:1px solid rgba(16,27,49,.08);color:rgba(25,28,32,.78);letter-spacing:0;text-transform:none}
.template-raw-ar .btn{min-height:52px;border-radius:8px;padding:.95rem 1.55rem}
.template-raw-ar .btn-primary{background:var(--raw-gold);color:var(--raw-on-gold);box-shadow:0 18px 42px rgba(201,168,76,.2)}
.template-raw-ar .btn-ghost{border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.14);color:#fff}
.template-raw-ar .raw-template-page{background:var(--raw-bg)}
.template-raw-ar .raw-template-hero{min-height:760px;padding:9rem 0 4rem;align-items:center}
.template-raw-ar .hero-bg{filter:saturate(.96) contrast(1.04)}
.template-raw-ar .hero-shade{background:linear-gradient(to left,rgba(16,27,49,.94),rgba(16,27,49,.58) 56%,rgba(16,27,49,.22)),linear-gradient(to top,rgba(16,27,49,.22),transparent 48%)}
.template-raw-ar .raw-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,392px);align-items:center;gap:clamp(2rem,5vw,5rem)}
.template-raw-ar .hero-content{max-width:710px;margin:0;text-align:right!important}
.template-raw-ar .hero-content .eyebrow{display:inline-flex;border:1px solid rgba(201,168,76,.7);border-radius:4px;padding:.45rem .8rem;color:var(--raw-gold)}
.template-raw-ar h1{margin:1.4rem 0 1rem;color:#fff;font-size:clamp(2.55rem,5.7vw,4.5rem);line-height:1.15}
.template-raw-ar .hero p{margin-inline:0;color:rgba(255,255,255,.78)}
.template-raw-ar .hero .cta-row{justify-content:flex-start}
.template-raw-ar .raw-hero-advisor-card{border:1px solid rgba(255,255,255,.72);border-radius:24px;background:rgba(255,255,255,.94);box-shadow:0 28px 80px rgba(16,27,49,.26);padding:2rem;text-align:center}
.template-raw-ar .raw-hero-avatar{width:82px;height:82px;margin:0 auto 1rem;overflow:hidden;border:3px solid rgba(201,168,76,.28);border-radius:999px;box-shadow:0 14px 34px rgba(16,27,49,.18)}
.template-raw-ar .raw-hero-avatar img{width:100%;height:100%;object-fit:cover}
.template-raw-ar .raw-hero-card-kicker{color:var(--raw-gold-deep);font-size:.78rem;font-weight:800}
.template-raw-ar .raw-hero-advisor-card h2{margin:.55rem 0 .65rem;color:var(--raw-on-gold);font-size:1.55rem}
.template-raw-ar .raw-hero-advisor-card p{margin:0 0 1.1rem;color:var(--raw-muted);font-size:.94rem;line-height:1.8}
.template-raw-ar .raw-hero-advisor-card .btn{width:100%}
.template-raw-ar .raw-hero-card-trust{display:grid;gap:.45rem;margin-top:1rem;color:rgba(16,27,49,.68);font-size:.78rem;font-weight:800}
.template-raw-ar .raw-hero-card-trust span{display:inline-flex;align-items:center;justify-content:center;gap:.4rem}
.template-raw-ar .raw-hero-card-trust i{color:var(--raw-gold-deep)}
.template-raw-ar .lead-strip-section{position:relative;z-index:3;margin-top:0;border-top:0;border-bottom:0;background:var(--raw-on-gold);padding:2rem 0}
.template-raw-ar .lead-strip-panel{border-radius:0}
.template-raw-ar .lead-strip-section .field input,.template-raw-ar .lead-strip-section .country-picker-trigger{border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff}
.template-raw-ar .lead-strip-section .field input::placeholder{color:rgba(255,255,255,.4)}
.template-raw-ar .lead-strip-section .country-picker-code,.template-raw-ar .lead-strip-section .country-picker-chevron{color:var(--raw-gold)}
.template-raw-ar .lead-strip-section .disclaimer,.template-raw-ar .lead-strip-section .form-security-note{color:rgba(255,255,255,.64)}
.template-raw-ar .raw-template-page .section{padding:6.8rem 0}
.template-raw-ar .raw-template-highlights{background:var(--raw-bg)}
.template-raw-ar .section-kicker{text-align:center}
.template-raw-ar .section-title{color:var(--raw-on-gold);font-size:clamp(2rem,4vw,3.2rem)}
.template-raw-ar .faq-card,.template-raw-ar .highlight-card,.template-raw-ar .raw-value-card{border:1px solid rgba(16,27,49,.08);border-radius:8px;background:#fff;box-shadow:0 18px 42px rgba(16,27,49,.08)}
.template-raw-ar .highlight-card strong{color:var(--raw-gold-deep)}
.template-raw-ar .raw-template-story{background:var(--raw-bg-deep)}
.template-raw-ar .raw-story-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.92fr);align-items:center;gap:clamp(2rem,5vw,4rem)}
.template-raw-ar .raw-story-media{display:grid;gap:1.2rem}
.template-raw-ar .raw-story-media img:first-child{min-height:320px}
.template-raw-ar .raw-story-media img:last-child{width:72%;min-height:190px;margin-inline-start:auto}
.template-raw-ar .raw-advisor-media img,.template-raw-ar .raw-story-media img{width:100%;object-fit:cover;border-radius:12px;box-shadow:0 22px 52px rgba(16,27,49,.14)}
.template-raw-ar .raw-advisor-copy .section-kicker,.template-raw-ar .raw-story-copy .section-kicker{text-align:right}
.template-raw-ar .raw-story-points{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.4rem}
.template-raw-ar .raw-story-points span{border:1px solid rgba(201,168,76,.28);border-radius:999px;background:rgba(201,168,76,.12);color:var(--raw-on-gold);padding:.62rem .9rem;font-size:.82rem;font-weight:800}
.template-raw-ar .raw-template-gallery{background:#fff}
.template-raw-ar .raw-gallery-grid,.template-raw-ar .raw-gallery-stack{gap:1rem}
.template-raw-ar .raw-gallery-item,.template-raw-ar .raw-location-media{border-radius:12px}
.template-raw-ar .raw-gallery-item span{border-radius:999px;background:rgba(201,168,76,.92);color:var(--raw-on-gold)}
.template-raw-ar .raw-template-location{background:var(--raw-on-gold)}
.template-raw-ar .raw-template-location .location-list li,.template-raw-ar .raw-template-location .section-title{color:#fff}
.template-raw-ar .raw-template-location .eyebrow,.template-raw-ar .raw-template-location .section-copy{color:var(--raw-gold)}
.template-raw-ar .raw-location-media img{filter:saturate(.95)}
.template-raw-ar .raw-template-advisor{background:var(--raw-bg)}
.template-raw-ar .raw-advisor-panel{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:center;gap:clamp(2rem,5vw,4rem);border:1px solid rgba(16,27,49,.08);border-radius:24px;background:#fff;box-shadow:0 22px 60px rgba(16,27,49,.08);padding:clamp(1.2rem,3vw,2rem)}
.template-raw-ar .raw-advisor-media{margin:0}
.template-raw-ar .raw-advisor-media img{min-height:420px}
.template-raw-ar .raw-advisor-copy .cta-row{justify-content:flex-start}
.template-raw-ar .btn-whatsapp{background:#25d366;color:#fff}
.template-raw-ar .faq-section{max-width:none;background:var(--raw-bg-deep)}
.template-raw-ar .faq-grid{width:min(1000px,100%);margin-inline:auto}
.template-raw-ar .faq-card{background:#fff}
.template-raw-ar .faq-card strong{color:var(--raw-on-gold)}
.template-raw-ar .faq-card p{color:var(--raw-muted)}
.template-raw-ar .raw-template-trust{background:var(--raw-gold)}
.template-raw-ar footer.section{background:var(--raw-on-gold)}
.template-raw-ar .copyright,.template-raw-ar .footer-panel a,.template-raw-ar .footer-panel p{color:rgba(255,255,255,.68)}
.template-raw-ar .mobile-contact-bar{display:none}
@media (min-width:920px){.template-raw-ar .mobile-menu-button{display:none}}
@media (max-width:1100px){.template-raw-ar .raw-advisor-panel,.template-raw-ar .raw-hero-grid,.template-raw-ar .raw-story-grid{grid-template-columns:1fr}.template-raw-ar .raw-hero-advisor-card{max-width:440px;margin-inline:auto}}
@media (max-width:820px){.template-raw-ar .nav{width:min(100% - 28px,720px)}.template-raw-ar .brand span{display:none}.template-raw-ar .raw-template-hero{min-height:100svh;padding:7rem 0 2.6rem;display:flex;align-items:center}.template-raw-ar .hero-content{text-align:right!important}.template-raw-ar .hero .cta-row,.template-raw-ar .raw-advisor-copy .cta-row{align-items:stretch}.template-raw-ar .hero .btn,.template-raw-ar .raw-advisor-copy .btn{width:100%}.template-raw-ar .raw-hero-advisor-card{display:none}.template-raw-ar .lead-strip-section{padding:1.4rem 0}.template-raw-ar .lead-strip-section #landingLeadForm,.template-raw-ar .lead-strip-section .field-grid{gap:.9rem}.template-raw-ar .raw-template-page .section{padding:4.5rem 0}.template-raw-ar .raw-story-media img:last-child{width:100%;margin-inline-start:0}.template-raw-ar .raw-advisor-panel{border-radius:18px;padding:1rem}.template-raw-ar .raw-advisor-media img{min-height:280px}}
`;

const heroCardHtml = `
        <aside class="raw-hero-advisor-card" aria-label="طلب تفاصيل Raw District">
          <div class="raw-hero-avatar">
            <img src="/assets/raw-district/photos/template-interior-living.png?v=20260610-new-ar-template" alt="طلب تفاصيل Raw District" loading="eager" decoding="async">
          </div>
          <span class="raw-hero-card-kicker">طلب المعلومات</span>
          <h2>طلب تفاصيل Raw District</h2>
          <p>أدخل بياناتك الأساسية وسيتواصل معك فريق <span class="brand-inline">Oaklyn Realty</span> بآخر المتاح وخيارات الوحدات.</p>
          <a class="btn btn-primary" href="#contact">احصل على الأسعار ومخططات الطوابق</a>
          <div class="raw-hero-card-trust">
            <span><i class="ti ti-certificate" aria-hidden="true"></i>مسجل في RERA</span>
            <span><i class="ti ti-building-bank" aria-hidden="true"></i>مرخص من DED</span>
            <span><i class="ti ti-lock" aria-hidden="true"></i>بياناتك محمية</span>
          </div>
        </aside>`;

const storyHtml = `
    <section class="section raw-template-story">
      <div class="shell raw-story-grid">
        <div class="raw-story-media">
          <img src="/assets/raw-district/photos/template-skyline-metro.png?v=20260610-new-ar-template" alt="موقع Raw District" loading="eager" decoding="async">
          <img src="/assets/raw-district/photos/template-building-evening.png?v=20260610-new-ar-template" alt="معرض Raw District" loading="lazy" decoding="async">
        </div>
        <div class="raw-story-copy">
          <span class="eyebrow">نبذة عن المشروع</span>
          <h2 class="section-title">معلومات المشروع بإرشاد أوضح</h2>
          <p class="section-copy">Raw District by IMTIAZ يجمع بين المساكن المفروشة بالكامل، ميزات المنزل الذكي، أماكن العمل والتجزئة في وسط جبل علي على شارع الشيخ زايد. <span class="brand-inline">Oaklyn Realty</span> تساعدك على مراجعة تفاصيل المشروع قبل طلب آخر المتاح.</p>
          <div class="raw-story-points">
            <span>ملاءمة مترو مباشر</span>
            <span>منازل ذكية مفروشة بالكامل</span>
            <span>بيئة متعددة الاستخدامات</span>
          </div>
        </div>
      </div>
    </section>`;

const advisorHtml = `
    <section class="section raw-template-advisor">
      <div class="shell raw-advisor-panel">
        <figure class="raw-advisor-media">
          <img src="/assets/raw-district/photos/template-amenity-lounge.png?v=20260610-new-ar-template" alt="Oaklyn Realty" loading="lazy" decoding="async">
        </figure>
        <div class="raw-advisor-copy">
          <span class="eyebrow">Oaklyn Realty</span>
          <h2 class="section-title">طلب تفاصيل Raw District</h2>
          <p class="section-copy">أدخل بياناتك الأساسية وسيتواصل معك فريق <span class="brand-inline">Oaklyn Realty</span> بآخر المتاح وخيارات الوحدات.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#contact">طلب التفاصيل</a>
            <a class="btn btn-whatsapp" href="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="advisor_whatsapp" data-whatsapp-destination="https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District"><i class="ti ti-brand-whatsapp" aria-hidden="true"></i><span>تواصل عبر واتساب</span></a>
          </div>
        </div>
      </div>
    </section>`;

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
      if (entry.isDirectory()) {
        await walk(filePath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        found.push(filePath);
      }
    }
  }

  await walk(dir);
  return found;
}

function patchNav(html) {
  if (!html.includes('class="topbar raw-template-nav"')) return html;
  let next = html;
  next = next.replace(/        <a class="raw-nav-whatsapp"[\s\S]*?<\/a>\n/g, "");

  if (!next.includes("data-mobile-menu-button")) {
    next = next.replace(
      /      <\/div>\n    <\/div>\n  <\/header>/,
      `      </div>
      <button class="mobile-menu-button" type="button" aria-label="القائمة" aria-expanded="false" data-mobile-menu-button><i class="ti ti-menu-2" aria-hidden="true"></i></button>
    </div>
    <nav class="mobile-menu" aria-label="تنقل الجوال" data-mobile-menu>
      <a href="#overview">نظرة عامة</a>
      <a href="#gallery">المعرض</a>
      <a href="#location">الموقع</a>
      <a href="#contact">تواصل</a>
    </nav>
  </header>`,
    );
  }

  return next;
}

function moveFormAfterHero(html) {
  const formMatch = html.match(/\n    <section class="lead-strip-section" id="contact"[\s\S]*?\n    <\/section>/);
  if (!formMatch) return html;

  let next = html.replace(formMatch[0], "");
  const formSection = formMatch[0].replace('class="lead-strip-section"', 'class="lead-strip-section raw-template-contact-strip"');

  if (!next.includes("raw-hero-grid")) {
    next = next.replace(
      /      <div class="shell hero-content">([\s\S]*?)      <\/div>\n    <\/section>/,
      (_match, heroContent) => `      <div class="shell raw-hero-grid">
        <div class="hero-content">${heroContent}        </div>
${heroCardHtml}
      </div>
    </section>`,
    );
    next = next.replace(
      /<a class="btn btn-ghost" href="#contact"><span>طلب الكتيب<\/span><i class="ti ti-download" aria-hidden="true"><\/i><\/a>/,
      '<a class="btn btn-ghost" href="#gallery"><span>المعرض</span><i class="ti ti-photo" aria-hidden="true"></i></a>',
    );
  }

  if (!next.includes("raw-template-contact-strip")) {
    next = next.replace(
      /    <\/section>\n\n    <section class="section quick-highlights raw-template-highlights"/,
      `    </section>
${formSection}

    <section class="section quick-highlights raw-template-highlights"`,
    );
  }

  return next;
}

function patchSections(html) {
  let next = html;
  if (!next.includes("raw-template-story")) {
    next = next.replace(
      /    <section class="section raw-template-gallery" id="gallery">/,
      `${storyHtml}

    <section class="section raw-template-gallery" id="gallery">`,
    );
  }
  if (!next.includes("raw-template-advisor")) {
    next = next.replace(
      /    <section class="section faq-section">/,
      `${advisorHtml}

    <section class="section faq-section">`,
    );
  }
  return next;
}

function patchArabicDomain(html) {
  return html
    .replace(/"source_page":\s*"raw-district\.oaklynrealty\.ae"/g, '"source_page": "raw-district-ae.oaklynrealty.ae"')
    .replace(/"landing_page_url":\s*"https:\/\/raw-district\.oaklynrealty\.ae\/"/g, '"landing_page_url": "https://raw-district-ae.oaklynrealty.ae/"')
    .replace(/"thank_you_page_url":\s*"https:\/\/raw-district\.oaklynrealty\.ae\/thank-you\/?"/g, '"thank_you_page_url": "https://raw-district-ae.oaklynrealty.ae/thank-you/"');
}

function patchHtml(html) {
  if (!html.includes("template-raw-ar")) return html;
  let next = html;
  next = patchNav(next);
  next = moveFormAfterHero(next);
  next = patchSections(next);
  next = patchArabicDomain(next);
  return next;
}

async function patchCss(filePath) {
  const before = await readIfExists(filePath);
  if (!before || before.includes(templateCssMarker)) return false;
  return writeIfChanged(filePath, before, `${before.trimEnd()}\n\n${templateCss}\n`);
}

const htmlFiles = [...new Set([...(await findHtmlFiles(rootDir)), ...(await findHtmlFiles(distDir))])];
let changedHtml = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  const after = patchHtml(before);
  if (await writeIfChanged(filePath, before, after)) changedHtml += 1;
}

let changedCss = 0;
for (const filePath of [path.join(rootDir, "styles.css"), path.join(distDir, "styles.css")]) {
  if (await patchCss(filePath)) changedCss += 1;
}

console.log(`Applied attached Raw Arabic template refresh to ${changedHtml} HTML file(s) and ${changedCss} CSS file(s).`);
