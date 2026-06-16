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
  'id="raw-ar-noir-color-overrides"',
  "#15130f",
  "#100e0a",
  "#e6c364",
  "#c9a84c",
  "#d0c5b2",
  "#25D366",
]) {
  assert(html.includes(required), `Noir color system missing ${required}`);
}

assert(html.includes("Modern Estate Noir color system"), "Noir style marker missing");
console.log("Noir color checks passed.");
