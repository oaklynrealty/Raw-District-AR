import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distIndex = path.join(rootDir, "dist", "index.html");

const html = await readFile(distIndex, "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(!html.includes('href="tel:'), "dist/index.html: call CTA links should be removed");
assert(!html.includes("data-call-link"), "dist/index.html: call CTA tracking attributes should be removed");
assert(!html.includes(">اتصال</a>"), "dist/index.html: visible call CTA text should be removed");
assert(html.includes("data-whatsapp-cta"), "dist/index.html: WhatsApp CTA should remain available");
assert(html.includes('href="#contact"'), "dist/index.html: form CTA should remain available");

console.log("No call CTAs remain in generated landing page.");
