import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const consultantImage = "/assets/raw-district/photos/camila-consultant.jpg?v=20260613-consultant";
const genericSubmitText = "تحدث مع مستشار Oaklyn للحصول على الأسعار";

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
      if ([".git", "assets", "scripts", "src"].includes(entry.name)) continue;
      const filePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) await walk(filePath);
      if (entry.isFile() && entry.name.endsWith(".html")) found.push(filePath);
    }
  }

  await walk(dir);
  return found;
}

function patchConsultantImages(html) {
  let next = html;

  next = next.replace(
    /(<img alt="Property Consultant" class="w-full h-full object-cover" src=")[^"]+(")/g,
    `$1${consultantImage}$2`,
  );

  next = next.replace(
    /(<img alt="Consultant" class="w-full h-full object-cover" src=")[^"]+(")/g,
    `$1${consultantImage}$2`,
  );

  next = next.replace(
    /(<button id="landingSubmitBtn"[^>]*>)[\s\S]*?(<\/button>)/g,
    `$1${genericSubmitText}$2`,
  );

  return next;
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changed = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchConsultantImages(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed += 1;
  }
}

console.log(`Applied consultant photo to ${changed} HTML file(s).`);
