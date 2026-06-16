import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const styleId = "raw-ar-noir-color-overrides";

const fontLink = '<link id="raw-ar-noir-fonts" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800;900&family=Libre+Caslon+Text:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';

const noirCss = `<style id="${styleId}">
  /* Modern Estate Noir design system */
  .raw-attached-template{
    --raw-noir-surface:#15130f;
    --raw-noir-surface-lowest:#100e0a;
    --raw-noir-surface-low:#1d1b17;
    --raw-noir-surface-container:#221f1b;
    --raw-noir-surface-high:#2c2a25;
    --raw-noir-surface-highest:#373430;
    --raw-noir-text:#e8e1db;
    --raw-noir-muted:#d0c5b2;
    --raw-noir-outline:#99907e;
    --raw-noir-outline-variant:#4d4637;
    --raw-noir-gold:#e6c364;
    --raw-noir-gold-solid:#c9a84c;
    --raw-noir-black:#100e0a;
    --raw-noir-whatsapp:#25D366;
    --raw-noir-border-gold:rgba(201,168,76,.20);
    --raw-font-display:"Libre Caslon Text","Noto Naskh Arabic",serif;
    --raw-font-body:"Hanken Grotesk","Noto Sans Arabic",Arial,sans-serif;
  }
  body.raw-attached-template{background:var(--raw-noir-surface)!important;color:var(--raw-noir-text)!important;font-family:var(--raw-font-body)!important;font-weight:400!important;letter-spacing:0!important}
  .raw-attached-template .font-display-lg,
  .raw-attached-template .font-display-lg-mobile,
  .raw-attached-template .font-headline-md,
  .raw-attached-template .font-stats-number{font-family:var(--raw-font-display)!important;font-weight:500!important;letter-spacing:0!important}
  .raw-attached-template .font-headline-sm,
  .raw-attached-template .font-body-md,
  .raw-attached-template .font-body-lg,
  .raw-attached-template .font-label-caps,
  .raw-attached-template button,
  .raw-attached-template input,
  .raw-attached-template textarea,
  .raw-attached-template select{font-family:var(--raw-font-body)!important;letter-spacing:0!important}
  .raw-attached-template .text-display-lg{font-size:56px!important;line-height:64px!important;font-weight:500!important;letter-spacing:0!important}
  .raw-attached-template .text-display-lg-mobile{font-size:36px!important;line-height:44px!important;font-weight:500!important;letter-spacing:0!important}
  .raw-attached-template .text-headline-md{font-size:40px!important;line-height:48px!important;font-weight:500!important;letter-spacing:0!important}
  .raw-attached-template .text-headline-sm{font-size:20px!important;line-height:28px!important;font-weight:700!important;letter-spacing:0!important}
  .raw-attached-template .text-body-lg{font-size:18px!important;line-height:28px!important;letter-spacing:0!important}
  .raw-attached-template .text-body-md{font-size:16px!important;line-height:24px!important;letter-spacing:0!important}
  .raw-attached-template .text-label-caps{font-size:12px!important;line-height:16px!important;font-weight:800!important;letter-spacing:0!important}
  .raw-attached-template .bg-background{background:var(--raw-noir-surface)!important}
  .raw-attached-template .bg-primary-container{background:var(--raw-noir-surface-lowest)!important}
  .raw-attached-template .bg-surface-container-lowest{background:var(--raw-noir-surface-lowest)!important}
  .raw-attached-template .bg-surface-container-low{background:var(--raw-noir-surface-low)!important}
  .raw-attached-template .bg-surface-container{background:var(--raw-noir-surface-container)!important}
  .raw-attached-template .bg-surface-container-high{background:var(--raw-noir-surface-high)!important}
  .raw-attached-template .bg-surface-container-highest{background:var(--raw-noir-surface-highest)!important}
  .raw-attached-template .bg-white{background:var(--raw-noir-surface-low)!important;color:var(--raw-noir-text)!important}
  .raw-attached-template .bg-primary,
  .raw-attached-template .bg-secondary{background:var(--raw-noir-gold-solid)!important;color:var(--raw-noir-black)!important}
  .raw-attached-template .text-primary,
  .raw-attached-template .text-secondary{color:var(--raw-noir-gold)!important}
  .raw-attached-template .text-on-primary,
  .raw-attached-template .bg-primary.text-white,
  .raw-attached-template .bg-secondary.text-white{color:var(--raw-noir-black)!important}
  .raw-attached-template .text-on-primary-container,
  .raw-attached-template .text-on-surface-variant{color:var(--raw-noir-muted)!important}
  .raw-attached-template .text-on-surface,
  .raw-attached-template .text-white{color:var(--raw-noir-text)!important}
  .raw-attached-template .border-outline-variant\\/10{border-color:rgba(201,168,76,.10)!important}
  .raw-attached-template .border-outline-variant\\/20{border-color:rgba(201,168,76,.20)!important}
  .raw-attached-template .border-outline-variant\\/30{border-color:rgba(201,168,76,.30)!important}
  .raw-attached-template .border-white\\/10,
  .raw-attached-template .border-white\\/20,
  .raw-attached-template .border-white\\/30{border-color:rgba(201,168,76,.22)!important}
  .raw-attached-template .bg-white,
  .raw-attached-template .bg-surface-container,
  .raw-attached-template .bg-surface-container-low,
  .raw-attached-template .bg-surface-container-high,
  .raw-attached-template .bg-surface-container-highest{border-color:var(--raw-noir-border-gold)!important}
  .raw-attached-template .glass-nav{background:rgba(16,14,10,.86)!important;border-bottom:1px solid rgba(201,168,76,.14);backdrop-filter:blur(20px)!important}
  .raw-attached-template #mobile-menu{background:var(--raw-noir-surface-lowest)!important;color:var(--raw-noir-text)!important}
  .raw-attached-template .hero-overlay{background:linear-gradient(to left,rgba(16,14,10,.93) 0%,rgba(16,14,10,.6) 58%,rgba(16,14,10,.38) 100%)!important}
  .raw-attached-template header .border{border-color:rgba(201,168,76,.36)!important}
  .raw-attached-template a.bg-primary,
  .raw-attached-template a.bg-secondary,
  .raw-attached-template button.bg-primary,
  .raw-attached-template button.bg-secondary,
  .raw-attached-template #landingSubmitBtn{border-radius:4px!important}
  .raw-attached-template img,
  .raw-attached-template .aspect-video,
  .raw-attached-template [data-map-link].rounded-2xl{border-radius:8px!important}
  .raw-attached-template .tracked-form-shell,
  .raw-attached-template .bg-white.rounded-3xl,
  .raw-attached-template .bg-surface-container-high.rounded-3xl{border-radius:8px!important}
  .raw-attached-template a.bg-secondary:hover,
  .raw-attached-template button.bg-secondary:hover,
  .raw-attached-template #landingSubmitBtn:hover{background:var(--raw-noir-gold)!important;color:var(--raw-noir-black)!important}
  .raw-attached-template .tracked-form-shell #landingLeadForm label{color:var(--raw-noir-muted)!important}
  .raw-attached-template .tracked-form-shell #landingLeadForm input,
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea,
  .raw-attached-template .tracked-form-shell #landingLeadForm select,
  .raw-attached-template .tracked-form-shell .country-picker-trigger{
    background:var(--raw-noir-surface-lowest)!important;
    border:1px solid var(--raw-noir-outline-variant)!important;
    border-radius:4px!important;
    color:var(--raw-noir-text)!important;
    padding:.9rem 1rem!important;
  }
  .raw-attached-template .tracked-form-shell #landingLeadForm input::placeholder,
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea::placeholder{color:rgba(208,197,178,.68)!important}
  .raw-attached-template .tracked-form-shell #landingLeadForm input:focus,
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea:focus,
  .raw-attached-template .tracked-form-shell #landingLeadForm select:focus,
  .raw-attached-template .tracked-form-shell .country-picker-trigger:focus{border-color:var(--raw-noir-gold)!important;box-shadow:0 0 0 3px rgba(230,195,100,.14)!important}
  .raw-attached-template .tracked-form-shell .country-picker-panel{background:var(--raw-noir-surface-low)!important;border-color:rgba(201,168,76,.25)!important;box-shadow:0 24px 58px rgba(0,0,0,.42)!important}
  .raw-attached-template .tracked-form-shell .country-picker-search{background:var(--raw-noir-surface-lowest)!important;border-color:var(--raw-noir-outline-variant)!important;color:var(--raw-noir-text)!important;border-radius:4px!important}
  .raw-attached-template .tracked-form-shell .country-picker-option{background:var(--raw-noir-surface-low)!important;color:var(--raw-noir-text)!important}
  .raw-attached-template .tracked-form-shell .country-picker-option:hover,
  .raw-attached-template .tracked-form-shell .country-picker-option[aria-selected="true"]{background:var(--raw-noir-surface-high)!important}
  .raw-attached-template .country-picker.is-placeholder .country-picker-trigger,
  .raw-attached-template .country-picker.is-placeholder .country-picker-label,
  .raw-attached-template .country-picker.is-placeholder .country-picker-code{color:rgba(208,197,178,.58)!important}
  .raw-attached-template .country-picker.is-placeholder .country-picker-chevron{color:rgba(208,197,178,.68)!important}
  .raw-attached-template .tracked-form-shell #landingSubmitBtn{background:var(--raw-noir-gold-solid)!important;color:var(--raw-noir-black)!important;box-shadow:0 18px 42px rgba(201,168,76,.18)!important}
  .raw-attached-template .tracked-form-shell .disclaimer{color:rgba(208,197,178,.78)!important}
  .raw-attached-template .tracked-form-shell .form-success{background:var(--raw-noir-surface-low)!important;border-color:rgba(201,168,76,.24)!important;color:var(--raw-noir-text)!important}
  .raw-attached-template .tracked-form-shell .form-success h3{color:var(--raw-noir-gold)!important}
  .raw-attached-template .field-error,
  .raw-attached-template .form-error{color:#ffb4ab!important}
  .raw-attached-template .bg-\\[\\#25D366\\],
  .raw-attached-template .whatsapp-float{background:var(--raw-noir-whatsapp)!important;color:#fff!important}
  .raw-attached-template .bg-\\[\\#25D366\\] *,
  .raw-attached-template .whatsapp-float *,
  .raw-attached-template .bg-\\[\\#25D366\\].text-white{color:#fff!important}
  .raw-attached-template .shadow-xl,
  .raw-attached-template .shadow-2xl{box-shadow:0 24px 80px rgba(0,0,0,.34)!important}
  .raw-attached-template .shadow-sm,
  .raw-attached-template .shadow-md{box-shadow:0 16px 44px rgba(0,0,0,.22)!important}
  .raw-attached-template .brightness-0.invert{filter:none!important}
  .raw-attached-template .grayscale.brightness-0{filter:none!important;opacity:.92!important}
  @media (max-width:767px){
    .raw-attached-template .text-display-lg{font-size:36px!important;line-height:44px!important}
    .raw-attached-template .text-headline-md{font-size:30px!important;line-height:38px!important}
  }
</style>`;

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
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
      const filePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) await walk(filePath);
      if (entry.isFile() && entry.name.endsWith(".html")) found.push(filePath);
    }
  }
  await walk(dir);
  return found;
}

function upsertDesignFonts(html) {
  const existingNoirFonts = /<link id="raw-ar-noir-fonts"[\s\S]*?>/;
  const oldTemplateFonts = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=EB\+Garamond[\s\S]*?rel="stylesheet">/;
  if (existingNoirFonts.test(html)) return html.replace(existingNoirFonts, fontLink);
  if (oldTemplateFonts.test(html)) return html.replace(oldTemplateFonts, fontLink);
  return html.replace("</head>", `${fontLink}\n</head>`);
}

function upsertNoirStyle(html) {
  if (!html.includes("raw-attached-template") || !html.includes("</head>")) return html;

  const existing = new RegExp(`<style id="${styleId}">[\\s\\S]*?<\\/style>`);
  const withFonts = upsertDesignFonts(html);
  if (existing.test(withFonts)) return withFonts.replace(existing, noirCss);
  return withFonts.replace("</head>", `${noirCss}\n</head>`);
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changed = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = upsertNoirStyle(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed += 1;
  }
}

console.log(`Applied Modern Estate Noir design system to ${changed} HTML file(s).`);
