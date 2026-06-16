import { readFile } from "node:fs/promises";

const clientJs = await readFile("dist/client.js", "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const required of [
  "PHONE_LENGTH_RULES_BY_DIAL_CODE",
  "PHONE_MOBILE_PREFIX_RULES_BY_DIAL_CODE",
  "passesPhoneSpamChecks(normalizedCountryCode, nationalNumber, normalizedLocalInput)",
  '"+93": /^7\\d{8}$/',
  '"+971": /^5[024568]\\d{7}$/',
  "hasLikelyDummyPhone",
  "hasLowDigitVariety",
  "hasLongRepeatedDigitRun",
  "rawLocalDigits.startsWith(countryDigits)",
]) {
  assert(clientJs.includes(required), `Phone validation missing ${required}`);
}

assert(!clientJs.includes("replace(/D/g"), "Phone validation still contains replace(/D/g)");

const lengthRules = {
  "+1": [10],
  "+20": [10],
  "+33": [9],
  "+34": [9],
  "+44": [10],
  "+63": [10],
  "+81": [10],
  "+90": [10],
  "+91": [10],
  "+92": [10],
  "+93": [9],
  "+212": [9],
  "+213": [8, 9],
  "+216": [8],
  "+234": [10],
  "+254": [9],
  "+356": [8],
  "+357": [8],
  "+880": [10],
  "+961": [7, 8],
  "+962": [8, 9],
  "+963": [9],
  "+964": [10],
  "+965": [8],
  "+966": [9],
  "+967": [9],
  "+968": [8],
  "+970": [9],
  "+971": [9],
  "+972": [9],
  "+973": [8],
  "+974": [8],
  "+975": [7, 8],
  "+976": [8],
  "+977": [10],
  "+994": [9],
  "+995": [9],
  "+996": [9],
  "+998": [9],
};

const mobileRules = {
  "+20": /^1[0125]\d{8}$/,
  "+33": /^[67]\d{8}$/,
  "+34": /^[67]\d{8}$/,
  "+44": /^7\d{9}$/,
  "+63": /^9\d{9}$/,
  "+81": /^[789]0\d{8}$/,
  "+90": /^5\d{9}$/,
  "+91": /^[6-9]\d{9}$/,
  "+92": /^3\d{9}$/,
  "+93": /^7\d{8}$/,
  "+212": /^[67]\d{8}$/,
  "+213": /^[567]\d{8}$/,
  "+216": /^[2459]\d{7}$/,
  "+234": /^[789]\d{9}$/,
  "+254": /^[17]\d{8}$/,
  "+356": /^[79]\d{7}$/,
  "+357": /^9\d{7}$/,
  "+880": /^1\d{9}$/,
  "+961": /^(3\d{6}|[78]\d{7})$/,
  "+962": /^7[789]\d{6}$/,
  "+963": /^9\d{8}$/,
  "+964": /^7\d{9}$/,
  "+965": /^[569]\d{7}$/,
  "+966": /^5\d{8}$/,
  "+967": /^7\d{8}$/,
  "+968": /^[79]\d{7}$/,
  "+970": /^5[69]\d{7}$/,
  "+971": /^5[024568]\d{7}$/,
  "+972": /^5\d{8}$/,
  "+973": /^[36]\d{7}$/,
  "+974": /^[3567]\d{7}$/,
  "+975": /^[17]\d{6,7}$/,
  "+976": /^[89]\d{7}$/,
  "+977": /^9[78]\d{8}$/,
  "+994": /^(50|51|55|70|77|99)\d{7}$/,
  "+995": /^5\d{8}$/,
  "+996": /^[2579]\d{8}$/,
  "+998": /^[389]\d{8}$/,
};

function isSequentialDigits(value) {
  const digits = String(value || "");
  if (digits.length < 6) return false;
  let ascendingRun = 1;
  let descendingRun = 1;
  for (let index = 1; index < digits.length; index += 1) {
    const previous = Number(digits.charAt(index - 1));
    const current = Number(digits.charAt(index));
    ascendingRun = current === previous + 1 ? ascendingRun + 1 : 1;
    descendingRun = current === previous - 1 ? descendingRun + 1 : 1;
    if (ascendingRun >= 6 || descendingRun >= 6) return true;
  }
  return false;
}

function isValidPhone(countryCode, localValue) {
  const localDigits = String(localValue || "").replace(/\D/g, "");
  const nationalNumber = localDigits.charAt(0) === "0" ? localDigits.slice(1) : localDigits;
  const allowedLengths = lengthRules[countryCode];
  const countryDigits = countryCode.replace(/\D/g, "");

  if (!nationalNumber || nationalNumber.length < 6 || nationalNumber.length > 14) return false;
  if (allowedLengths && !allowedLengths.includes(nationalNumber.length)) return false;
  if (countryDigits && localDigits.startsWith(countryDigits)) return false;
  if (/^(\d)\1+$/.test(nationalNumber)) return false;
  if (/(\d)\1{4,}/.test(nationalNumber)) return false;
  if (new Set(nationalNumber.split("")).size <= 2 && nationalNumber.length >= 7) return false;
  if (isSequentialDigits(nationalNumber)) return false;
  if (/(?:012345|123456|234567|345678|456789|987654|876543|765432|654321|543210)/.test(nationalNumber)) return false;
  const rule = mobileRules[countryCode];
  return !rule || rule.test(nationalNumber);
}

const invalidSamples = [
  ["+93", "12345678910"],
  ["+93", "123456789"],
  ["+971", "123456789"],
  ["+971", "971505835230"],
  ["+971", "555555555"],
  ["+971", "501234567"],
  ["+966", "123456789"],
  ["+1", "1111111111"],
  ["+44", "1234567890"],
];

for (const [countryCode, localValue] of invalidSamples) {
  assert(!isValidPhone(countryCode, localValue), `Expected invalid phone to fail: ${countryCode} ${localValue}`);
}

const validSamples = [
  ["+971", "585835230"],
  ["+966", "551728394"],
  ["+93", "707834921"],
  ["+44", "7719283645"],
  ["+91", "9817326045"],
];

for (const [countryCode, localValue] of validSamples) {
  assert(isValidPhone(countryCode, localValue), `Expected valid phone to pass: ${countryCode} ${localValue}`);
}

console.log("Phone validation checks passed.");
