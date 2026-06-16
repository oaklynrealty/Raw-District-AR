import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const html = await readFile(path.join(rootDir, "dist", "index.html"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const required of [
  'id="raw-ar-motion-css"',
  'id="raw-ar-motion-js"',
  "raw-motion-ready",
  "motion-cta",
  "motion-image",
  "IntersectionObserver",
  "prefers-reduced-motion",
  "rawWhatsappPulse",
]) {
  assert(html.includes(required), `Motion layer missing ${required}`);
}

console.log("Page animation checks passed.");
