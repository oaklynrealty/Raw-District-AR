import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const thankYouUrl = "https://raw-district-ae.oaklynrealty.ae/thank-you";
const imageUrl =
  "https://raw-district-ae.oaklynrealty.ae/assets/raw-district/photos/template-exterior-master-aerial.png?v=20260610-new-ar-template";
const title = "شكراً لك | Raw District by IMTIAZ | Oaklyn Realty";
const description = "تم استلام استفسارك العقاري لدى Oaklyn Realty.";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const fixThankYou = (html) =>
  html
    .replace(/<html lang="[^"]+" dir="[^"]+">/, '<html lang="ar" dir="rtl">')
    .replace(
      /<script>\s*\(function \(\) \{\s*try \{\s*var params = new URLSearchParams\(window\.location\.search\);[\s\S]*?window\.location\.replace\(target\.pathname \+ target\.search \+ window\.location\.hash\);\s*\} catch \(error\) \{\}\s*\}\)\(\);\s*<\/script>\s*/g,
      "",
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${thankYouUrl}">`)
    .replace(/<meta property="og:locale" content="[^"]*">/, '<meta property="og:locale" content="ar_AE">')
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${thankYouUrl}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${imageUrl}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(description)}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${imageUrl}">`)
    .replace(/<link rel="stylesheet" href="\/styles\.css\?v=[^"]*">/, '<link rel="stylesheet" href="/styles.css?v=20260610-new-ar-template">')
    .replace(/<span class="eyebrow">[\s\S]*?<\/span>/, '<span class="eyebrow">تم استلام الطلب</span>')
    .replace(/<h1>[\s\S]*?<\/h1>/, '<h1>شكراً لك. سيتواصل معك مستشارنا العقاري قريباً.</h1>')
    .replace(
      /<p class="section-copy">[\s\S]*?<\/p>/,
      '<p class="section-copy"><span class="brand-inline">Oaklyn Realty</span> استلمت طلبك بخصوص Raw District. نحن لا نطلب بيانات شخصية حساسة عبر هذا النموذج.</p>',
    )
    .replace(/(<div class="cta-row">\s*<a class="btn btn-primary" href="[^"]*">)[\s\S]*?(<\/a>)/, "$1العودة إلى المشروع$2")
    .replace(/(<a class="btn btn-ghost" href="[^"]*">)[\s\S]*?(<\/a>\s*<\/div>)/, "$1التواصل مع Oaklyn$2")
    .replace(/"source_page":\s*"raw-district\.oaklynrealty\.ae"/g, '"source_page": "raw-district-ae.oaklynrealty.ae"')
    .replace(/"landing_page_url":\s*"https:\/\/raw-district\.oaklynrealty\.ae\/"/g, '"landing_page_url": "https://raw-district-ae.oaklynrealty.ae/"')
    .replace(/"thank_you_page_url":\s*"https:\/\/raw-district(?:-ae)?\.oaklynrealty\.ae\/thank-you\/?"/g, `"thank_you_page_url": "${thankYouUrl}"`)
    .replace(/thank_you_page_url:\s*"https:\/\/raw-district(?:-ae)?\.oaklynrealty\.ae\/thank-you\/?"/g, `thank_you_page_url: "${thankYouUrl}"`);

for (const target of [path.join(rootDir, "thank-you/index.html"), path.join(distDir, "thank-you/index.html")]) {
  try {
    await writeFile(target, fixThankYou(await readFile(target, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

console.log("Fixed Raw District Arabic thank-you page.");
