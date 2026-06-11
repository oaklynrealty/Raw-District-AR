import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const directHandleWhatsApp = `  function handleWhatsApp(event) {
    if (event && event.__oaklynWhatsAppTracked) return;
    if (event) event.__oaklynWhatsAppTracked = true;

    const target = event && event.currentTarget ? event.currentTarget : null;
    const destinationUrl =
      target && target.dataset
        ? String(target.dataset.whatsappDestination || target.getAttribute("href") || verifiedWhatsAppUrl)
        : verifiedWhatsAppUrl;
    const leadId = createLeadId();
    const trackingPayload = Object.assign(
      {
        lead_id: leadId,
        event_id: leadId,
        blacklist_status: "not_checked",
        verification_status: "skipped"
      },
      buildWhatsAppTrackingPayload(target)
    );

    pushDataLayerEvent(
      Object.assign(
        {
          event: "whatsapp_cta_click"
        },
        trackingPayload
      )
    );

    pushDataLayerEvent(
      Object.assign(
        {
          event: "whatsapp_cta_conversion",
          conversion_type: "whatsapp"
        },
        trackingPayload
      )
    );

    if (!event && destinationUrl) {
      window.open(destinationUrl, "_blank");
    }
  }
`;

const patchClient = (html) => {
  const pattern = /  function handleWhatsApp\(event\) \{[\s\S]*?\n  \}\n\n  function handleCall/;
  if (!pattern.test(html)) {
    throw new Error("Could not find handleWhatsApp block to patch.");
  }
  return html.replace(pattern, `${directHandleWhatsApp}\n  function handleCall`);
};

const patchHtml = (html) =>
  html.replace(
    /\n  <div class="whatsapp-modal" data-whatsapp-modal[\s\S]*?\n    <\/section>\n  <\/div>/g,
    "",
  );

const patchFile = async (target, patcher) => {
  try {
    await writeFile(target, patcher(await readFile(target, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
};

for (const target of [path.join(rootDir, "client.js"), path.join(distDir, "client.js")]) {
  await patchFile(target, patchClient);
}

for (const target of [path.join(rootDir, "index.html"), path.join(distDir, "index.html")]) {
  await patchFile(target, patchHtml);
}

console.log("Applied direct WhatsApp CTA behavior.");
