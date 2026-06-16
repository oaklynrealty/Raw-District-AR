import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const required of [
  "Raw Arabic scroll lead popup",
  'id="scrollLeadPopup"',
  'id="scrollLeadPopupForm"',
  'id="popup_phone_country"',
  'id="popup_full_name"',
  'id="popup_email"',
  'id="popup_phone"',
  'id="popup_message"',
  "triggerDelay=15000",
  "window.addEventListener(\"scroll\", startTimerAfterScroll",
  "mainForm.dispatchEvent(new Event(\"submit\"",
  "By submitting this form, you agree to be contacted by our property consultants regarding your inquiry.",
]) {
  assert(html.includes(required), `Scroll popup missing ${required}`);
}

assert(
  /<input id="popup_phone_country"[^>]*type="hidden"[^>]*value=""/.test(html),
  "popup country code must be empty by default",
);
assert(
  !/<button[^>]+data-country-option[^>]+aria-selected="true"/.test(html),
  "popup must not introduce selected country options by default",
);

console.log("Scroll popup form checks passed.");
