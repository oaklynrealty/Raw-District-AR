import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const mapUrl = "https://maps.app.goo.gl/LhSZ6TmMTV4LnBrq7";

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

function addMapCta(html) {
  if (html.includes('data-cta-location="location_map"')) return html;

  const locationListEnd = `      </div>
    </div>
    <div class="reveal relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">`;

  const locationListReplacement = `      </div>
      <a class="inline-flex items-center justify-center gap-3 mt-10 bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all" href="${mapUrl}" target="_blank" rel="noopener" data-map-link data-cta-location="location_map">
        <span class="raw-symbol" aria-hidden="true">⌖</span>
        افتح الموقع على الخريطة
      </a>
    </div>
    <a class="reveal relative h-[450px] rounded-2xl overflow-hidden shadow-2xl block group" href="${mapUrl}" target="_blank" rel="noopener" data-map-link data-cta-location="location_map_image" aria-label="افتح موقع Raw District على الخريطة">`;

  let next = html.replace(locationListEnd, locationListReplacement);

  next = next
    .replace(
      '<img alt="Strategic location map" class="w-full h-full object-cover" src="/assets/raw-district/photos/raw-district-aerial-metro.jpg?v=20260610-new-ar-template">',
      '<img alt="خريطة موقع Raw District في وسط جبل علي" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/raw-district/photos/raw-district-aerial-metro.jpg?v=20260610-new-ar-template">',
    )
    .replace(
      '<div class="absolute bottom-6 right-6 z-20 bg-white p-4 rounded-xl text-primary flex items-center gap-3">',
      '<div class="absolute bottom-6 right-6 z-20 bg-white p-4 rounded-xl text-primary flex items-center gap-3 shadow-xl">',
    )
    .replace(
      '<div><p class="font-bold">الموقع المثالي</p><p class="text-xs opacity-70">استثمار للمستقبل</p></div>',
      '<div><p class="font-bold">افتح الموقع</p><p class="text-xs opacity-70">على Google Maps</p></div>',
    )
    .replace(
      `      </div>
    </div>
  </div>
</section>
<!-- Consultant Profile Section -->`,
      `      </div>
    </a>
  </div>
</section>
<!-- Consultant Profile Section -->`,
    );

  return next;
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changed = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before || !before.includes("Raw District")) continue;
  const after = addMapCta(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed += 1;
  }
}

console.log(`Added Raw District location map links to ${changed} HTML file(s).`);
