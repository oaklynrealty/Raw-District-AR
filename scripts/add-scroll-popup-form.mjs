import { readFile, writeFile } from "node:fs/promises";

const htmlTargets = ["index.html", "dist/index.html"];
const clientTargets = ["client.js", "dist/client.js"];

const marker = "<!-- Raw Arabic scroll lead popup -->";

function extractLeadCountryPicker(html) {
  const start = html.indexOf('<div class="country-picker is-placeholder" data-country-picker="lead">');
  if (start < 0) {
    throw new Error("Lead country picker was not found.");
  }

  const end = html.indexOf("</div>\n                  <input id=\"landing_phone\"", start);
  if (end < 0) {
    throw new Error("Could not find end of lead country picker.");
  }

  return html
    .slice(start, end + "</div>".length)
    .replace('data-country-picker="lead"', 'data-country-picker="popup"')
    .replace('id="landing_phone_country"', 'id="popup_phone_country"')
    .replace(' name="phone_country_code"', "")
    .replace(/landing_phone_country_search/g, "popup_phone_country_search");
}

function renderPopup(countryPickerMarkup) {
  return `${marker}
<div class="scroll-lead-popup" id="scrollLeadPopup" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="scrollLeadPopupTitle">
  <div class="scroll-lead-popup__backdrop" data-scroll-popup-close></div>
  <div class="scroll-lead-popup__panel" role="document">
    <button class="scroll-lead-popup__close" type="button" aria-label="إغلاق" data-scroll-popup-close>×</button>
    <div class="scroll-lead-popup__eyebrow">Raw District by IMTIAZ</div>
    <h2 id="scrollLeadPopupTitle">احصل على التفاصيل والأسعار</h2>
    <p class="scroll-lead-popup__copy">اترك بياناتك وسيتواصل معك مستشار Oaklyn Realty بأحدث التوافر وخطة الدفع.</p>
    <form id="scrollLeadPopupForm" class="scroll-lead-popup__form" novalidate>
      <label class="scroll-lead-popup__field">
        <span>الاسم الكامل</span>
        <input id="popup_full_name" type="text" autocomplete="name" required>
      </label>
      <label class="scroll-lead-popup__field">
        <span>البريد الإلكتروني</span>
        <input id="popup_email" type="email" autocomplete="email" placeholder="email@example.com" required>
      </label>
      <div class="scroll-lead-popup__field">
        <span>مفتاح الدولة</span>
        ${countryPickerMarkup}
      </div>
      <label class="scroll-lead-popup__field">
        <span>رقم الهاتف</span>
        <input id="popup_phone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="50 123 4567" required>
      </label>
      <label class="scroll-lead-popup__field scroll-lead-popup__field--full">
        <span>رسالتك أو استفسارك</span>
        <textarea id="popup_message" rows="3" maxlength="600" placeholder="اكتب أي سؤال أو ملاحظة تريد من المستشار معرفتها"></textarea>
      </label>
      <p class="scroll-lead-popup__error" id="scrollLeadPopupError" hidden>يرجى اختيار مفتاح الدولة وإدخال بيانات صحيحة.</p>
      <button class="scroll-lead-popup__submit" type="submit">إرسال الطلب</button>
      <p class="scroll-lead-popup__disclaimer">By submitting this form, you agree to be contacted by our property consultants regarding your inquiry.</p>
    </form>
  </div>
</div>`;
}

const popupCss = `<style id="scroll-lead-popup-css">
  .scroll-lead-popup[hidden]{display:none!important}
  .scroll-lead-popup{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:18px;font-family:"Hanken Grotesk","Noto Sans Arabic",Arial,sans-serif}
  .scroll-lead-popup__backdrop{position:absolute;inset:0;background:rgba(16,14,10,.72);backdrop-filter:blur(10px)}
  .scroll-lead-popup__panel{position:relative;z-index:1;width:min(620px,100%);max-height:min(88vh,760px);overflow:auto;border:1px solid rgba(201,168,76,.28);border-radius:8px;background:#15130f;color:#e8e1db;box-shadow:0 34px 110px rgba(0,0,0,.52);padding:28px}
  .scroll-lead-popup__close{position:absolute;top:14px;left:14px;width:38px;height:38px;border:1px solid rgba(201,168,76,.24);border-radius:999px;background:#100e0a;color:#e8e1db;font-size:26px;line-height:1;cursor:pointer}
  .scroll-lead-popup__eyebrow{margin-bottom:10px;color:#e6c364;font-size:12px;font-weight:800;letter-spacing:0;text-transform:uppercase}
  .scroll-lead-popup h2{margin:0 0 10px;font-family:"Libre Caslon Text","Noto Naskh Arabic",serif;font-size:clamp(2rem,5vw,3rem);line-height:1.1;color:#fff;letter-spacing:0}
  .scroll-lead-popup__copy{margin:0 0 22px;color:#d0c5b2;line-height:1.7}
  .scroll-lead-popup__form{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .scroll-lead-popup__field{display:grid;gap:8px}
  .scroll-lead-popup__field--full{grid-column:1/-1}
  .scroll-lead-popup__field > span{color:#d0c5b2;font-size:12px;font-weight:800;letter-spacing:0;text-transform:uppercase}
  .scroll-lead-popup input,
  .scroll-lead-popup textarea,
  .scroll-lead-popup .country-picker-trigger{width:100%;border:1px solid #4d4637;border-radius:4px;background:#100e0a;color:#e8e1db;padding:.9rem 1rem;font-size:1rem;box-shadow:none}
  .scroll-lead-popup textarea{resize:vertical;line-height:1.6}
  .scroll-lead-popup input:focus,
  .scroll-lead-popup textarea:focus,
  .scroll-lead-popup .country-picker-trigger:focus{outline:0;border-color:#e6c364;box-shadow:0 0 0 3px rgba(230,195,100,.14)}
  .scroll-lead-popup .country-picker{position:relative}
  .scroll-lead-popup .country-picker-current{display:flex;align-items:center;gap:.45rem;min-width:0}
  .scroll-lead-popup .country-picker.is-placeholder .country-picker-trigger,
  .scroll-lead-popup .country-picker.is-placeholder .country-picker-label,
  .scroll-lead-popup .country-picker.is-placeholder .country-picker-code{color:rgba(208,197,178,.58)!important}
  .scroll-lead-popup .country-picker-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .scroll-lead-popup .country-picker-panel{position:absolute;top:calc(100% + 8px);right:0;z-index:4;width:min(430px,calc(100vw - 54px));max-height:300px;overflow:hidden;border:1px solid rgba(201,168,76,.25);border-radius:8px;background:#1d1b17;box-shadow:0 24px 58px rgba(0,0,0,.42)}
  .scroll-lead-popup .country-picker-search{width:calc(100% - 24px)!important;margin:12px;border-color:#4d4637!important;border-radius:4px!important}
  .scroll-lead-popup .country-picker-list{max-height:222px;overflow:auto}
  .scroll-lead-popup .country-picker-option{display:grid;width:100%;grid-template-columns:36px 1fr auto;align-items:center;gap:.8rem;border:0;background:#1d1b17;color:#e8e1db;padding:.75rem 1rem;text-align:right}
  .scroll-lead-popup .country-picker-option:hover,
  .scroll-lead-popup .country-picker-option[aria-selected="true"]{background:#2c2a25}
  .scroll-lead-popup__error{grid-column:1/-1;margin:0;color:#ffb4ab;font-size:.9rem}
  .scroll-lead-popup__submit{grid-column:1/-1;border:0;border-radius:4px;background:#c9a84c;color:#100e0a;padding:1rem 1.25rem;font-weight:900;cursor:pointer;transition:transform .18s ease,background .18s ease}
  .scroll-lead-popup__submit:hover{background:#e6c364;transform:translateY(-1px)}
  .scroll-lead-popup__disclaimer{grid-column:1/-1;margin:0;color:rgba(208,197,178,.74);font-size:.76rem;line-height:1.7;text-align:center}
  .scroll-lead-popup.is-visible .scroll-lead-popup__panel{animation:scrollLeadPopupIn .36s cubic-bezier(.22,1,.36,1) both}
  @keyframes scrollLeadPopupIn{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
  @media (max-width:640px){.scroll-lead-popup{align-items:end;padding:10px}.scroll-lead-popup__panel{max-height:88vh;padding:22px;border-radius:8px 8px 0 0}.scroll-lead-popup__form{grid-template-columns:1fr}.scroll-lead-popup__field--full{grid-column:auto}}
  @media (prefers-reduced-motion:reduce){.scroll-lead-popup.is-visible .scroll-lead-popup__panel{animation:none!important}}
</style>`;

const popupJs = `<script id="scroll-lead-popup-js">
(function(){
  function ready(fn){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",fn,{once:true});}else{fn();}}
  ready(function(){
    var popup=document.getElementById("scrollLeadPopup");
    var popupForm=document.getElementById("scrollLeadPopupForm");
    var mainForm=document.getElementById("landingLeadForm");
    if(!popup || !popupForm || !mainForm) return;

    var storageKey="rawDistrictScrollPopupDismissed";
    var shownKey="rawDistrictScrollPopupShown";
    var triggerDelay=15000;
    var timer=null;
    var hasStarted=false;

    function field(id){return document.getElementById(id);}
    function getValue(id){var el=field(id);return el ? String(el.value || "").trim() : "";}
    function setValue(id,value){var el=field(id);if(el) el.value=value;}
    function showError(message){var error=field("scrollLeadPopupError");if(!error) return;error.textContent=message;error.hidden=false;}
    function clearError(){var error=field("scrollLeadPopupError");if(error) error.hidden=true;}

    function openPopup(){
      if(sessionStorage.getItem(storageKey)==="1" || sessionStorage.getItem(shownKey)==="1") return;
      var success=document.getElementById("landingSuccess");
      if(success && success.classList.contains("is-visible")) return;
      sessionStorage.setItem(shownKey,"1");
      popup.hidden=false;
      popup.setAttribute("aria-hidden","false");
      requestAnimationFrame(function(){popup.classList.add("is-visible");});
      var firstInput=field("popup_full_name");
      if(firstInput) window.setTimeout(function(){firstInput.focus();},120);
    }

    function closePopup(){
      popup.classList.remove("is-visible");
      popup.setAttribute("aria-hidden","true");
      window.setTimeout(function(){popup.hidden=true;},220);
      sessionStorage.setItem(storageKey,"1");
    }

    function startTimerAfterScroll(){
      if(hasStarted || sessionStorage.getItem(storageKey)==="1" || sessionStorage.getItem(shownKey)==="1") return;
      if(window.scrollY < 40) return;
      hasStarted=true;
      timer=window.setTimeout(openPopup,triggerDelay);
      window.removeEventListener("scroll", startTimerAfterScroll);
    }

    popup.querySelectorAll("[data-scroll-popup-close]").forEach(function(button){
      button.addEventListener("click", closePopup);
    });
    document.addEventListener("keydown", function(event){
      if(event.key==="Escape" && !popup.hidden) closePopup();
    });

    popupForm.addEventListener("submit", function(event){
      event.preventDefault();
      clearError();

      var name=getValue("popup_full_name");
      var email=getValue("popup_email");
      var phone=getValue("popup_phone");
      var countryCode=getValue("popup_phone_country");
      var message=getValue("popup_message");

      if(name.length < 2 || !email || !phone || !countryCode){
        showError("يرجى اختيار مفتاح الدولة وإدخال الاسم والبريد ورقم الهاتف.");
        return;
      }

      setValue("landing_full_name",name);
      setValue("landing_email",email);
      setValue("landing_phone",phone);
      setValue("landing_phone_country",countryCode);
      setValue("landing_message",message);
      setValue("landing_preferred_project","استفسار عام");
      setValue("landing_property_type","شراء للسكن");

      var submitted=false;
      try {
        submitted=mainForm.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
      } catch (error) {
        showError("تعذر إرسال الطلب. يرجى استخدام النموذج في أسفل الصفحة.");
        return;
      }

      window.setTimeout(function(){
        var success=document.getElementById("landingSuccess");
        var formError=document.getElementById("landingFormError");
        if(success && success.classList.contains("is-visible")){
          sessionStorage.setItem(storageKey,"1");
          closePopup();
          return;
        }
        if(formError && formError.classList.contains("is-visible") && formError.textContent){
          showError(formError.textContent);
        } else if(!submitted) {
          showError("يرجى مراجعة بياناتك والمحاولة مرة أخرى.");
        }
      },120);
    });

    window.addEventListener("scroll", startTimerAfterScroll,{passive:true});
    startTimerAfterScroll();
    if(timer) window.addEventListener("beforeunload", function(){window.clearTimeout(timer);});
  });
})();
</script>`;

function patchHtml(source) {
  if (!source.includes("landingLeadForm") || source.includes(marker)) return source;
  const countryPicker = extractLeadCountryPicker(source);
  const popup = renderPopup(countryPicker);
  let output = source;
  output = output.replace("</head>", `${popupCss}\n</head>`);
  output = output.replace("</body>", `${popup}\n${popupJs}\n</body>`);
  return output;
}

function patchClient(source) {
  return source;
}

async function patchFile(filePath, patcher) {
  let content;
  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
  const next = patcher(content);
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

console.log(`Added 15-second scroll lead popup to ${changed} file(s).`);
