import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const client = await readFile("dist/client.js", "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(
  /<input id="landing_phone_country"[^>]*name="phone_country_code"[^>]*type="hidden"[^>]*value=""/.test(html),
  "country-code hidden input must be empty by default",
);
assert(html.includes('<span class="country-picker-label" data-country-picker-label>+971</span>'), "visible placeholder must be +971");
assert(!html.includes('class="country-picker-option is-selected"'), "no country option should be selected by default");
assert(!/<button[^>]+data-country-option[^>]+aria-selected="true"/.test(html), "no country option should be aria-selected by default");
assert(client.includes('countryPicker.classList.remove("is-placeholder")'), "country picker placeholder class must clear on real selection");
assert(client.includes('label.textContent = "+971"'), "country picker reset must restore +971 placeholder");

console.log("Country-code placeholder checks passed.");
