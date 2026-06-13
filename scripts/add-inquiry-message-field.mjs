import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const cssMarker = "<!-- Raw inquiry message field styles -->";
const messageFieldHtml = `              <div class="field message-field" id="messageField">
                <label for="landing_message">رسالتك أو استفسارك</label>
                <textarea id="landing_message" name="message" rows="4" maxlength="600" placeholder="اكتب أي سؤال أو ملاحظة تريد من المستشار معرفتها"></textarea>
                <div class="field-hint">اختياري — يمكنك طلب الأسعار، المخططات، أو التوافر الحالي.</div>
              </div>
`;

const messageFieldCss = `${cssMarker}
<style id="raw-inquiry-field-css">
  .raw-attached-template .tracked-form-shell .message-field{grid-column:1/-1}
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea{width:100%;min-height:112px;resize:vertical;border:0;border-bottom:2px solid #e1e2e8;border-radius:0;background:transparent;color:#000;padding:.75rem 0;font-size:1rem;line-height:1.7;box-shadow:none}
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea:focus{outline:0;border-color:#775a19;box-shadow:none}
  .raw-attached-template .tracked-form-shell #landingLeadForm textarea::placeholder{color:rgba(69,71,77,.48)}
  .raw-attached-template .tracked-form-shell .field-hint{color:rgba(69,71,77,.64);font-size:.78rem;line-height:1.55}
</style>`;

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

async function findFiles(dir, predicate) {
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
      if (entry.isFile() && predicate(entry.name)) found.push(filePath);
    }
  }

  await walk(dir);
  return found;
}

function patchHtml(html) {
  if (!html.includes('id="landingLeadForm"') || html.includes('id="landing_message"')) return html;

  let next = html;
  if (!next.includes(cssMarker)) {
    next = next.replace("</head>", `${messageFieldCss}\n</head>`);
  }

  next = next.replace(
    `              <div class="field payload-hidden" id="projectField" hidden>`,
    `${messageFieldHtml}              <div class="field payload-hidden" id="projectField" hidden>`,
  );

  return next;
}

function patchClient(js) {
  if (!js.includes('const form = document.getElementById("landingLeadForm");')) return js;

  let next = js;
  if (!next.includes("const messageInput = document.getElementById(\"landing_message\");")) {
    next = next.replace(
      '  const leadIdInput = document.getElementById("landing_lead_id");',
      '  const leadIdInput = document.getElementById("landing_lead_id");\n  const messageInput = document.getElementById("landing_message");',
    );
  }

  if (!next.includes("const formMessage = messageInput ? messageInput.value.trim() : \"\";")) {
    next = next.replace(
      "    const formInquiry = fields.propertyType.input.value.trim();",
      '    const formInquiry = fields.propertyType.input.value.trim();\n    const formMessage = messageInput ? messageInput.value.trim() : "";',
    );
  }

  next = next.replace(
    '          message: "",\n          form_submission_key:',
    '          message: formMessage,\n          comment: formMessage,\n          inquiry_message: formMessage,\n          form_submission_key:',
  );

  return next;
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findFiles(distDir, (name) => name.endsWith(".html")))]));
let changedHtml = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchHtml(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changedHtml += 1;
  }
}

const clientFiles = [path.join(rootDir, "client.js"), path.join(distDir, "client.js")];
let changedClient = 0;

for (const filePath of clientFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchClient(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changedClient += 1;
  }
}

console.log(`Added inquiry message field to ${changedHtml} HTML file(s) and ${changedClient} client file(s).`);
