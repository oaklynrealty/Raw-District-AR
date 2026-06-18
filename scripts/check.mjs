import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GTM_CONTAINER_ID } from "../shared/gtm.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const seo = {
  projectName: "Raw District by IMTIAZ",
  canonical: "https://raw-district-ae.oaklynrealty.ae/",
  thankYouUrl: "https://raw-district-ae.oaklynrealty.ae/thank-you",
  title: "Raw District IMTIAZ دبي | شقق من ٦٤٩ ألف درهم في جبل علي",
  description:
    "تفاصيل Raw District by IMTIAZ في وسط جبل علي من ٦٤٩،٠٠٠ درهم — شقق مفروشة ومترو مباشر. اطلب التفاصيل الآن.",
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const readDist = (file) => readFile(path.join(distDir, file), "utf8");

const requiredFiles = [
  "index.html",
  "thank-you/index.html",
  "styles.css",
  "client.js",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
];

for (const file of requiredFiles) {
  await stat(path.join(distDir, file));
}

const landingHtml = await readDist("index.html");
const thankYouHtml = await readDist("thank-you/index.html");
const clientJs = await readDist("client.js");
const stylesCss = await readDist("styles.css");
const sitemapXml = await readDist("sitemap.xml");
const robotsTxt = await readDist("robots.txt");
const llmsTxt = await readDist("llms.txt");

const jsonLdBlocks = [...landingHtml.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
assert(jsonLdBlocks.length >= 5, "index.html: expected project JSON-LD blocks");
for (const [, block] of jsonLdBlocks) JSON.parse(block);

const canonicalTags = landingHtml.match(/<link rel="canonical"/g) || [];
assert(canonicalTags.length === 1, "index.html: expected exactly one canonical tag");
assert(
  landingHtml.includes(`<link rel="canonical" href="${seo.canonical}">`),
  "index.html: canonical must point to Arabic domain root",
);

const hreflangMatches = [...landingHtml.matchAll(/hreflang="([^"]+)"/g)].map((match) => match[1]);
assert(
  JSON.stringify(hreflangMatches) === JSON.stringify(["ar-AE", "en-AE", "x-default"]),
  "index.html: hreflang set must be ar-AE, en-AE, x-default only",
);

assert(landingHtml.includes('lang="ar"'), "index.html: missing Arabic lang");
assert(landingHtml.includes('dir="rtl"'), "index.html: missing RTL direction");
assert(landingHtml.includes('name="robots" content="index, follow"'), "index.html: missing index/follow robots tag");
assert(landingHtml.includes(seo.title), "index.html: missing Arabic SEO title");
assert(landingHtml.includes(seo.description), "index.html: missing Arabic SEO description");
assert(landingHtml.includes('property="og:url" content="https://raw-district-ae.oaklynrealty.ae/"'), "index.html: wrong OG URL");
assert(
  landingHtml.includes('property="og:image" content="https://raw-district-ae.oaklynrealty.ae/assets/raw-district/photos/template-exterior-master-aerial.png'),
  "index.html: OG image must use Arabic domain",
);
assert(landingHtml.includes('"@type": "RealEstateListing"'), "index.html: missing RealEstateListing schema");
assert(landingHtml.includes('"@type": "Product"'), "index.html: missing Product schema");
assert(landingHtml.includes('"@type": "FAQPage"'), "index.html: missing FAQ schema");
assert(landingHtml.includes(GTM_CONTAINER_ID), "index.html: missing GTM");
assert(landingHtml.includes("permit-qr-badge"), "index.html: missing fixed permit QR badge");
assert(landingHtml.includes("permit-qr.jpeg?v=20260618-permit-qr"), "index.html: missing cache-busted permit QR image");
assert(stylesCss.includes(".template-raw-ar .permit-qr-badge"), "styles.css: missing fixed permit QR badge styles");

const imageTags = [...landingHtml.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
for (const term of [
  'event: "lead_success"',
  'conversion_action: "form_submission"',
  "lead_email",
  "lead_phone",
  "lead_first_name",
  "lead_last_name",
  "meta_advanced_matching",
  "form_submission_confirmed"
]) {
  assert(clientJs.includes(term), `client.js: missing confirmed Lead advanced matching term ${term}`);
}

const genericConversionPushes = clientJs.match(/event:\s*"conversion"/g) || [];
assert(genericConversionPushes.length === 0, "client.js: generic conversion event should not be used for ad-platform conversions");

assert(imageTags.every((tag) => /\balt=/.test(tag)), "index.html: every image must have alt text");
assert(!/(?:href|src)="http:\/\//.test(landingHtml), "index.html: mixed-content URL found");
assert(!landingHtml.includes("raw-district.oaklynrealty.ae/assets"), "index.html: asset URLs must not use English domain");
assert(!landingHtml.includes("/index.html"), "index.html: should not point users or scripts to /index.html");
assert(!landingHtml.includes("index-en"), "index.html: should not reference old English file");
assert(!landingHtml.includes("__oaklyn-lang"), "index.html: should not reference hidden language routes");
assert(!landingHtml.includes("oaklyn-links"), "index.html: should not reference link hub route");

for (const term of [
  "project_name",
  "project_slug",
  "source_page",
  "landing_page_url",
  "thank_you_page_url",
  "dataLayer",
  "lead_success",
  "lead_thank_you_page_view",
  "whatsapp_cta_click",
  "whatsapp_cta_conversion",
]) {
  assert(landingHtml.includes(term) || clientJs.includes(term) || thankYouHtml.includes(term), `tracking: missing ${term}`);
}

for (const field of ['name="full_name"', 'name="phone"', 'name="phone_country_code"', 'name="email"']) {
  assert(landingHtml.includes(field), `index.html: missing form field ${field}`);
}

assert(clientJs.includes("validateWebhookLeadPayload"), "client.js: missing final required lead payload validator before Zapier");
assert(clientJs.includes("lead_webhook_blocked_empty_payload"), "client.js: missing blocked empty-payload tracking event");
assert(clientJs.includes("Blocked empty lead payload"), "client.js: missing empty lead webhook blocker");

for (const field of [
  'name="passport"',
  'name="emirates_id"',
  'name="salary"',
  'name="dob"',
  'name="date_of_birth"',
  'name="nationality"',
  'name="religion"',
  'name="health"',
]) {
  assert(!landingHtml.toLowerCase().includes(field), `index.html: sensitive field should not exist ${field}`);
}

assert(thankYouHtml.includes('name="robots" content="noindex, nofollow"'), "thank-you: must remain noindex");
assert(thankYouHtml.includes(`href="${seo.thankYouUrl}"`), "thank-you: canonical should be slashless");
assert(!thankYouHtml.includes('"@type": "RealEstateListing"'), "thank-you: should not include listing schema");
assert(thankYouHtml.includes("lead_thank_you_page_view"), "thank-you: missing analytics page-view event");
assert(!thankYouHtml.includes("lead_conversion_thank_you"), "thank-you: must not fire form conversion without CRM webhook success");

assert(robotsTxt.includes("Sitemap: https://raw-district-ae.oaklynrealty.ae/sitemap.xml"), "robots.txt: missing sitemap reference");
assert(sitemapXml.includes("<loc>https://raw-district-ae.oaklynrealty.ae/</loc>"), "sitemap.xml: missing Arabic canonical URL");
assert(sitemapXml.includes('hreflang="ar-AE"'), "sitemap.xml: missing Arabic hreflang");
assert(sitemapXml.includes('hreflang="en-AE"'), "sitemap.xml: missing English hreflang");
assert(llmsTxt.includes("Raw District by IMTIAZ"), "llms.txt: missing project name");

console.log(`All checks passed for ${seo.projectName} Arabic SEO build.`);
