import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { project, arabicProject } from "../src/project-data.mjs";
import { GTM_CONTAINER_ID } from "../shared/gtm.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const trimSlashes = (value = "") => String(value).replace(/^\/+|\/+$/g, "");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const requiredFiles = ["index.html", "thank-you/index.html", "styles.css", "client.js"];

const routePath = trimSlashes(project.routePath);
if (routePath) requiredFiles.push(`${routePath}/index.html`);

const alternateThankYouPath = trimSlashes(project.alternateThankYouPath);
if (alternateThankYouPath && alternateThankYouPath !== "thank-you") {
  requiredFiles.push(`${alternateThankYouPath}/index.html`);
}

const linkHubRoutePath = trimSlashes(project.linkHub?.routePath);
if (linkHubRoutePath) {
  requiredFiles.push(`${linkHubRoutePath}/index.html`);
}

const arabicRoutePath = trimSlashes(arabicProject?.routePath);
if (arabicRoutePath) {
  requiredFiles.push(`${arabicRoutePath}/index.html`);
}

const arabicThankYouPath = trimSlashes(arabicProject?.alternateThankYouPath);
if (arabicThankYouPath) {
  requiredFiles.push(`${arabicThankYouPath}/index.html`);
}

for (const file of requiredFiles) {
  await stat(path.join(distDir, file));
}

const landingFiles = ["index.html"];
if (routePath) landingFiles.push(`${routePath}/index.html`);

const thankYouFiles = ["thank-you/index.html"];
if (alternateThankYouPath && alternateThankYouPath !== "thank-you") {
  thankYouFiles.push(`${alternateThankYouPath}/index.html`);
}

const linkHubFiles = [];
if (linkHubRoutePath) {
  linkHubFiles.push(`${linkHubRoutePath}/index.html`);
}

const clientJs = await readFile(path.join(distDir, "client.js"), "utf8");

const requiredVisibleFields = [
  'name="phone"',
  'name="phone_country_code"',
  'name="email"',
  'name="preferred_project"',
  'name="property_type"',
];

const forbiddenSensitiveFields = [
  'name="passport"',
  'name="emirates_id"',
  'name="salary"',
  'name="dob"',
  'name="date_of_birth"',
  'name="nationality"',
  'name="religion"',
  'name="health"',
];

const sharedTrackingTerms = [
  "project_name",
  "project_slug",
  "source_page",
  "landing_page_url",
  "thank_you_page_url",
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "lead_success",
  "dataLayer",
  "preferred_unit",
  "inquiry_type",
];

const whatsappTrackingTerms = [
  "whatsapp_cta_click",
  "whatsapp_cta_conversion",
  "whatsapp_cta_blocked",
  "whatsapp_cta_blacklist_error",
  "checkBlacklistStatusWithSimilarPhone",
  "whatsapp_webhook_url",
];

const validateJsonLd = (html, file, minimumBlocks = 3) => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  assert(blocks.length >= minimumBlocks, `${file}: expected at least ${minimumBlocks} JSON-LD block(s)`);
  for (const [, block] of blocks) JSON.parse(block);
};

for (const file of landingFiles) {
  const html = await readFile(path.join(distDir, file), "utf8");
  assert(html.includes(project.name), `${file}: missing project name`);
  assert(html.includes(project.webhookUrl), `${file}: missing webhook URL`);
  assert(html.includes(GTM_CONTAINER_ID), `${file}: missing GTM container`);
  if (project.compliance?.permit?.value) {
    assert(html.includes(project.compliance.permit.value), `${file}: missing permit placeholder/value`);
  }

  const requiredNameFields = project.form.splitName
    ? ['name="first_name"', 'name="last_name"']
    : ['name="full_name"'];

  for (const field of [...requiredNameFields, ...requiredVisibleFields]) {
    assert(html.includes(field), `${file}: missing compliant form field ${field}`);
  }

  for (const field of forbiddenSensitiveFields) {
    assert(!html.toLowerCase().includes(field), `${file}: sensitive field should not exist ${field}`);
  }

  for (const link of [project.brand.privacyUrl, project.brand.termsUrl, project.brand.contactUrl]) {
    assert(html.includes(link), `${file}: missing legal link ${link}`);
  }

  for (const term of sharedTrackingTerms) {
    assert(html.includes(term) || clientJs.includes(term), `${file}: missing tracking term ${term}`);
  }

  assert(html.includes('data-whatsapp-cta'), `${file}: missing WhatsApp CTA entry point`);
  assert(html.includes('data-whatsapp-modal'), `${file}: missing WhatsApp modal`);
  assert(html.includes(project.brand.whatsappHref.replace(/[^\d]/g, "")), `${file}: missing WhatsApp number`);

  for (const term of whatsappTrackingTerms) {
    assert(clientJs.includes(term) || html.includes(term), `${file}: missing WhatsApp tracking term ${term}`);
  }

  validateJsonLd(html, file);
}

for (const file of thankYouFiles) {
  const html = await readFile(path.join(distDir, file), "utf8");
  assert(html.includes(project.name), `${file}: missing project name`);
  assert(html.includes(GTM_CONTAINER_ID), `${file}: missing GTM container`);
  assert(html.includes("lead_thank_you_page_view"), `${file}: missing thank-you dataLayer tracking event`);
  assert(html.includes("lead_conversion_thank_you"), `${file}: missing thank-you conversion dataLayer event`);
  assert(html.includes("event_id"), `${file}: missing thank-you event_id for conversion deduplication`);
  assert(html.includes("lead_id"), `${file}: missing thank-you lead_id`);
  validateJsonLd(html, file);
}

for (const file of linkHubFiles) {
  const html = await readFile(path.join(distDir, file), "utf8");
  assert(html.includes(project.linkHub.seo.title), `${file}: missing link hub title`);
  assert(html.includes(project.linkHub.profile.title), `${file}: missing link hub heading`);
  assert(html.includes(project.linkHub.profile.note), `${file}: missing template note`);
  assert(html.includes(GTM_CONTAINER_ID), `${file}: missing GTM container`);
  assert(html.includes("URL Pending"), `${file}: missing placeholder badge copy`);
  assert(html.includes("link-hub-card"), `${file}: missing link hub cards`);
  validateJsonLd(html, file, 2);
}

if (arabicRoutePath) {
  const arabicHtml = await readFile(path.join(distDir, `${arabicRoutePath}/index.html`), "utf8");
  assert(arabicHtml.includes('lang="ar"'), "Arabic route: missing lang=ar");
  assert(arabicHtml.includes('dir="rtl"'), "Arabic route: missing dir=rtl");
  assert(arabicHtml.includes(arabicProject.name), "Arabic route: missing Arabic project name");
  assert(!/Imtiaz/i.test(arabicHtml), "Arabic route: should not mention Imtiaz");
  assert(arabicHtml.includes(arabicProject.webhookUrl), "Arabic route: missing webhook URL");
  assert(arabicHtml.includes(GTM_CONTAINER_ID), "Arabic route: missing GTM container");
  validateJsonLd(arabicHtml, `${arabicRoutePath}/index.html`);
}

if (arabicThankYouPath) {
  const arabicThankYouHtml = await readFile(path.join(distDir, `${arabicThankYouPath}/index.html`), "utf8");
  assert(arabicThankYouHtml.includes('lang="ar"'), "Arabic thank-you: missing lang=ar");
  assert(arabicThankYouHtml.includes('dir="rtl"'), "Arabic thank-you: missing dir=rtl");
  assert(!/Imtiaz/i.test(arabicThankYouHtml), "Arabic thank-you: should not mention Imtiaz");
  assert(arabicThankYouHtml.includes("lead_conversion_thank_you"), "Arabic thank-you: missing conversion event");
  validateJsonLd(arabicThankYouHtml, `${arabicThankYouPath}/index.html`);
}

console.log(`All checks passed for ${project.name}.`);
