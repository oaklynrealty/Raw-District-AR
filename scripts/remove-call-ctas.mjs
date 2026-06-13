import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const whatsappHref =
  "https://wa.me/971505886769?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20Oaklyn%20Realty%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20Raw%20District";

const whatsappAttrs = (location) =>
  `href="${whatsappHref}" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="${location}" data-whatsapp-destination="${whatsappHref}"`;

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

function patchHtml(html) {
  if (!html.includes("Raw District")) return html;

  let next = html
    .replace(
      /<a class="border border-white\/30 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary transition-all" href="#gallery">استعراض المعرض<\/a>/g,
      `<a class="border border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary transition-all" ${whatsappAttrs("hero_whatsapp")}>واتساب</a>`,
    )
    .replace(
      /<a class="block w-full text-center border border-outline-variant\/40 text-primary py-4 rounded-xl font-bold text-md hover:bg-surface-container-low transition-all" href="#gallery">شاهد الصور<\/a>/g,
      `<a class="block w-full text-center border border-outline-variant/40 text-primary py-4 rounded-xl font-bold text-md hover:bg-surface-container-low transition-all" ${whatsappAttrs("hero_card_whatsapp")}>واتساب</a>`,
    )
    .replace(
      /<li class="flex items-center gap-2"><span class="raw-symbol text-secondary text-sm" aria-hidden="true">☎<\/span><a href="tel:\+971585835230" data-call-link data-cta-location="footer_call">\+971 58 583 5230<\/a><\/li>/g,
      `<li class="flex items-center gap-2"><span class="raw-symbol text-secondary text-sm" aria-hidden="true">✉</span><a ${whatsappAttrs("footer_whatsapp")}>واتساب</a></li>`,
    )
    .replace(
      /<a class="flex-1 bg-primary text-white flex items-center justify-center py-4 rounded-xl shadow-xl font-bold gap-2" href="tel:\+971585835230" data-call-link data-cta-location="mobile_call"><span class="raw-symbol" aria-hidden="true">☎<\/span>اتصال<\/a>/g,
      `<a class="flex-1 bg-primary text-white flex items-center justify-center py-4 rounded-xl shadow-xl font-bold gap-2" href="#contact"><span class="raw-symbol" aria-hidden="true">▤</span>النموذج</a>`,
    );

  next = next
    .replace(/<span class="raw-symbol" aria-hidden="true">☎<\/span>(?=تواصل مباشرة عبر واتساب|واتساب)/g, '<span class="raw-symbol" aria-hidden="true">✉</span>')
    .replace(/<span class="raw-symbol text-secondary text-sm" aria-hidden="true">☎<\/span>(?=<a [^>]*>واتساب<\/a>)/g, '<span class="raw-symbol text-secondary text-sm" aria-hidden="true">✉</span>');

  return next;
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changed = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchHtml(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed += 1;
  }
}

console.log(`Removed call CTAs from ${changed} HTML file(s).`);
