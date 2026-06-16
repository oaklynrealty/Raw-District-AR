import { readFile, writeFile } from "node:fs/promises";

const targetFiles = ["client.js", "dist/client.js"];

const phoneFraudBlock = `  const PHONE_MOBILE_PREFIX_RULES_BY_DIAL_CODE = {
    "+20": /^1[0125]\\d{8}$/,
    "+33": /^[67]\\d{8}$/,
    "+34": /^[67]\\d{8}$/,
    "+44": /^7\\d{9}$/,
    "+63": /^9\\d{9}$/,
    "+81": /^[789]0\\d{8}$/,
    "+90": /^5\\d{9}$/,
    "+91": /^[6-9]\\d{9}$/,
    "+92": /^3\\d{9}$/,
    "+93": /^7\\d{8}$/,
    "+212": /^[67]\\d{8}$/,
    "+213": /^[567]\\d{8}$/,
    "+216": /^[2459]\\d{7}$/,
    "+234": /^[789]\\d{9}$/,
    "+254": /^[17]\\d{8}$/,
    "+356": /^[79]\\d{7}$/,
    "+357": /^9\\d{7}$/,
    "+880": /^1\\d{9}$/,
    "+961": /^(3\\d{6}|[78]\\d{7})$/,
    "+962": /^7[789]\\d{6}$/,
    "+963": /^9\\d{8}$/,
    "+964": /^7\\d{9}$/,
    "+965": /^[569]\\d{7}$/,
    "+966": /^5\\d{8}$/,
    "+967": /^7\\d{8}$/,
    "+968": /^[79]\\d{7}$/,
    "+970": /^5[69]\\d{7}$/,
    "+971": /^5[024568]\\d{7}$/,
    "+972": /^5\\d{8}$/,
    "+973": /^[36]\\d{7}$/,
    "+974": /^[3567]\\d{7}$/,
    "+975": /^[17]\\d{6,7}$/,
    "+976": /^[89]\\d{7}$/,
    "+977": /^9[78]\\d{8}$/,
    "+994": /^(50|51|55|70|77|99)\\d{7}$/,
    "+995": /^5\\d{8}$/,
    "+996": /^[2579]\\d{8}$/,
    "+998": /^[389]\\d{8}$/
  };

  const NANP_LOCAL_DIAL_CODES = new Set([
    "+1242",
    "+1246",
    "+1264",
    "+1268",
    "+1284",
    "+1340",
    "+1345",
    "+1441",
    "+1473",
    "+1649",
    "+1664",
    "+1670",
    "+1671",
    "+1684",
    "+1721",
    "+1758",
    "+1767",
    "+1784",
    "+1787",
    "+1809",
    "+1868",
    "+1869",
    "+1876"
  ]);

  function hasLowDigitVariety(value) {
    const digits = String(value || "").replace(/\\D/g, "");
    if (digits.length < 7) return false;
    return new Set(digits.split("")).size <= 2;
  }

  function hasLongRepeatedDigitRun(value) {
    return /(\\d)\\1{4,}/.test(String(value || ""));
  }

  function hasLikelyDummyPhone(value) {
    const digits = String(value || "").replace(/\\D/g, "").replace(/^0+/, "");
    if (!digits) return true;
    if (/^(?:123456789|987654321|12345678|87654321|1234567|7654321|123456|654321)$/.test(digits)) return true;
    if (/(?:012345|123456|234567|345678|456789|987654|876543|765432|654321|543210)/.test(digits)) return true;
    if (/^(?:10){4,}|^(?:01){4,}|^(?:12){4,}|^(?:21){4,}/.test(digits)) return true;
    return false;
  }

  function passesMobilePrefixRules(countryCode, nationalNumber) {
    const digits = String(nationalNumber || "").replace(/\\D/g, "");
    if (countryCode === "+1") {
      return /^[2-9]\\d{2}[2-9]\\d{6}$/.test(digits);
    }

    if (NANP_LOCAL_DIAL_CODES.has(countryCode)) {
      return /^[2-9]\\d{6}$/.test(digits);
    }

    const rule = PHONE_MOBILE_PREFIX_RULES_BY_DIAL_CODE[countryCode];
    return !rule || rule.test(digits);
  }

  function passesPhoneSpamChecks(countryCode, nationalNumber, localInput) {
    const digits = String(nationalNumber || "").replace(/\\D/g, "");
    const rawLocalDigits = String(localInput || "").replace(/\\D/g, "");
    const countryDigits = String(countryCode || "").replace(/\\D/g, "");

    if (!digits || digits.length < 6 || digits.length > 14) return false;
    if (countryDigits && rawLocalDigits.startsWith(countryDigits)) return false;
    if (hasRepeatedDigits(digits) || hasLowDigitVariety(digits) || hasLongRepeatedDigitRun(digits)) return false;
    if (isSequentialDigits(digits) || hasRepeatingDigitPattern(digits) || hasLikelyDummyPhone(digits)) return false;
    if (!passesMobilePrefixRules(countryCode, digits)) return false;

    return true;
  }
`;

const marker = "  function buildValidatedPhoneNumber(localValue, countryCode, allowedDialCodes) {";
const callMarker = `    if (!passesCountryPhoneRules(normalizedCountryCode, nationalNumber)) {
      return { valid: false };
    }

`;
const spamCheck = `    if (!passesPhoneSpamChecks(normalizedCountryCode, nationalNumber, normalizedLocalInput)) {
      return { valid: false };
    }

`;

function patch(content, filePath) {
  if (!content.includes(marker)) {
    throw new Error(`${filePath}: buildValidatedPhoneNumber was not found`);
  }

  let output = content.replace(/replace\(\/D\/g, ""\)/g, 'replace(/\\D/g, "")');

  if (!output.includes("PHONE_MOBILE_PREFIX_RULES_BY_DIAL_CODE")) {
    output = output.replace(marker, `${phoneFraudBlock}\n${marker}`);
  }

  if (!output.includes("passesPhoneSpamChecks(normalizedCountryCode, nationalNumber, normalizedLocalInput)")) {
    if (!output.includes(callMarker)) {
      throw new Error(`${filePath}: country phone rules call was not found`);
    }
    output = output.replace(callMarker, `${callMarker}${spamCheck}`);
  }

  return output;
}

let checked = 0;
let changed = 0;

for (const filePath of targetFiles) {
  let content;
  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }

  checked += 1;
  const next = patch(content, filePath);
  if (next !== content) {
    await writeFile(filePath, next);
    changed += 1;
  }
}

if (!checked) throw new Error("No generated client files were found to harden phone validation.");

console.log(`Hardened phone validation in ${checked} generated client file(s). Changed ${changed}.`);
