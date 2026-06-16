import { readFile, writeFile } from "node:fs/promises";

const htmlTargets = ["index.html", "dist/index.html"];
const clientTargets = ["client.js", "dist/client.js"];

function patchHtml(source) {
  return source
    .replace(/<div class="country-picker" data-country-picker="/g, '<div class="country-picker is-placeholder" data-country-picker="')
    .replace(/(<input id="landing_phone_country"[^>]*type="hidden"[^>]*value=")[^"]*(")/g, "$1$2")
    .replace(/(<span class="country-picker-flag" data-country-picker-flag>)[\s\S]*?(<\/span>)/g, "$1$2")
    .replace(/(<span class="country-picker-label" data-country-picker-label>)[\s\S]*?(<\/span>)/g, "$1+971$2")
    .replace(/(<span class="country-picker-code" data-country-picker-code>)[\s\S]*?(<\/span>)/g, "$1$2")
    .replace(/class="country-picker-option is-selected"/g, 'class="country-picker-option"')
    .replace(/aria-selected="true"/g, 'aria-selected="false"');
}

function patchClient(source, filePath) {
  let output = source;

  const selectionMarker = `      countryInput.value = nextCode;
      if (countryPickerFlag) countryPickerFlag.textContent = nextFlag;`;
  const selectionReplacement = `      countryInput.value = nextCode;
      countryPicker.classList.remove("is-placeholder");
      if (countryPickerFlag) countryPickerFlag.textContent = nextFlag;`;

  if (!output.includes('countryPicker.classList.remove("is-placeholder")')) {
    if (!output.includes(selectionMarker)) {
      throw new Error(`${filePath}: could not find country selection marker`);
    }
    output = output.replace(selectionMarker, selectionReplacement);
  }

  const syncFunction = `  function syncCountryPickerByInput(input, countryCode) {
    if (!input) return;
    const normalizedCode = normalizeDialCode(countryCode || "");
    input.value = normalizedCode;
    const picker = input.closest("[data-country-picker]");
    const controller = picker ? countryPickerControllers.get(picker) : null;
    if (controller && typeof controller.selectByCode === "function") {
      controller.selectByCode(normalizedCode);
    }
  }
`;

  const syncReplacement = `  function syncCountryPickerByInput(input, countryCode) {
    if (!input) return;
    const normalizedCode = normalizeDialCode(countryCode || "");
    input.value = normalizedCode;
    const picker = input.closest("[data-country-picker]");

    if (!normalizedCode) {
      if (picker) {
        picker.classList.add("is-placeholder");
        const flag = picker.querySelector("[data-country-picker-flag]");
        const label = picker.querySelector("[data-country-picker-label]");
        const code = picker.querySelector("[data-country-picker-code]");
        const options = Array.from(picker.querySelectorAll("[data-country-option]"));
        if (flag) flag.textContent = "";
        if (label) label.textContent = "+971";
        if (code) code.textContent = "";
        options.forEach(function (option) {
          option.classList.remove("is-selected");
          option.setAttribute("aria-selected", "false");
        });
      }
      return;
    }

    const controller = picker ? countryPickerControllers.get(picker) : null;
    if (controller && typeof controller.selectByCode === "function") {
      controller.selectByCode(normalizedCode);
    }
  }
`;

  if (!output.includes('label.textContent = "+971"')) {
    if (!output.includes(syncFunction)) {
      throw new Error(`${filePath}: could not find country picker sync function`);
    }
    output = output.replace(syncFunction, syncReplacement);
  }

  return output;
}

async function patchFile(filePath, patcher) {
  let content;
  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }

  const next = patcher(content, filePath);
  if (next !== content) {
    await writeFile(filePath, next);
    return true;
  }
  return false;
}

let changed = 0;

for (const filePath of htmlTargets) {
  if (await patchFile(filePath, patchHtml)) changed += 1;
}

for (const filePath of clientTargets) {
  if (await patchFile(filePath, patchClient)) changed += 1;
}

console.log(`Applied non-selected +971 country-code placeholder to ${changed} file(s).`);
