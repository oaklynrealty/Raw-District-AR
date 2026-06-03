import { cp, mkdir, rm, writeFile, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { project as landingProject, arabicProject } from "../src/project-data.mjs";
import { renderGtmBody, renderGtmHead } from "../shared/gtm.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

let project = landingProject;
let company = project.brand;

const defaultUiText = {
  nav_overview: "Overview",
  nav_gallery: "Gallery",
  nav_location: "Location",
  nav_contact: "Contact",
  nav_website: "Oaklyn Website",
  nav_request_details: "Request Details",
  mobile_menu_label: "Menu",
  quick_highlights_eyebrow: "Quick Investment Highlights",
  quick_highlights_title: "Project facts at a glance",
  request_information_eyebrow: "Request Information",
  basic_enquiry_only: "Basic enquiry details only",
  subject_to_confirmation: "Subject to developer confirmation",
  no_guaranteed_returns: "No guaranteed investment returns",
  form_phone_placeholder: "050 123 4567",
  form_phone_error: "Please enter a valid international phone number.",
  form_email_error: "Please enter a valid email address.",
  form_select_error: "Please select an option.",
  form_submit: "Request Project Information",
  form_submit_error: "We could not submit your enquiry. Please try again or contact Oaklyn Realty directly.",
  form_success_title: "Thank you",
  blocked_success_title: "Thank you",
  form_success_copy_prefix: "Your enquiry has been received. Oaklyn Realty will contact you regarding",
  faq_eyebrow: "FAQ",
  faq_title: "Quick answers",
  trust_eyebrow: "Trust & Compliance",
  trust_title: "Clear, compliant enquiry process",
  footer_about_text:
    "Oaklyn Realty is a Dubai real estate brokerage helping you review project details, availability, and enquiry next steps with clear communication.",
  footer_contact_heading: "Contact",
  footer_legal_heading: "Legal",
  footer_contact_link: "Contact",
  footer_privacy_link: "Privacy Policy",
  footer_terms_link: "Terms & Conditions",
  footer_copyright:
    "Oaklyn Real Estate L.L.C. — DED Licence 1589593 · RERA ORN 59210. Regulated by Dubai DET and Dubai Land Department.",
  whatsapp_floating_label: "Chat on WhatsApp",
  whatsapp_close: "Close",
  whatsapp_eyebrow: "Quick Verification",
  whatsapp_title: "Continue to WhatsApp",
  whatsapp_copy: "Enter your number for a quick verification before we open WhatsApp.",
  whatsapp_country_code: "Country Code",
  whatsapp_phone: "WhatsApp Number",
  whatsapp_phone_placeholder: "50 123 4567",
  whatsapp_phone_error: "Please enter a valid phone number to continue.",
  whatsapp_note: "We use this step to filter duplicate and blocked numbers before WhatsApp opens.",
  whatsapp_error: "We could not continue to WhatsApp right now. Please try again.",
  whatsapp_continue: "Continue to WhatsApp",
  whatsapp_progress_button_label: "Please wait...",
  whatsapp_progress_waiting_label: "Opening WhatsApp shortly...",
  whatsapp_progress_step_1: "Preparing your request...",
  whatsapp_progress_step_2: "Verifying your details...",
  whatsapp_progress_step_3: "Keeping your place while we connect you...",
  cancel: "Cancel",
  gallery_prev: "Previous gallery image",
  gallery_next: "Next gallery image",
  phone_search_sr_label: "Search country or code",
  phone_search_placeholder: "Type exact code or country",
  phone_search_empty: "No country found.",
  validation_name: "Please enter your name.",
  validation_first_name: "Please enter your first name.",
  validation_last_name: "Please enter your last name.",
  thank_you_meta_title_prefix: "Thank You",
  thank_you_meta_description: "Your Oaklyn Realty property enquiry has been received.",
  thank_you_eyebrow: "Enquiry Received",
  thank_you_title: "Thank you. Our property consultant will contact you shortly.",
  thank_you_copy_prefix:
    "Oaklyn Realty has received your enquiry for",
  thank_you_copy_suffix: "We will not ask for sensitive personal information through this form.",
  back_to_project: "Back to Project",
  contact_oaklyn: "Contact Oaklyn",
  mobile_call: "Call",
  mobile_whatsapp: "WhatsApp"
};

const setProject = (nextProject) => {
  project = nextProject;
  company = project.brand;
};

const t = (key, fallback) => {
  if (project?.uiText && Object.prototype.hasOwnProperty.call(project.uiText, key)) {
    return project.uiText[key];
  }
  if (fallback !== undefined) return fallback;
  return defaultUiText[key] || "";
};

const getLocaleLang = () => project.locale?.lang || "en";
const getLocaleDir = () => project.locale?.dir || "ltr";
const getBodyClass = (...classes) =>
  [getLocaleDir() === "rtl" ? "is-rtl" : "", ...classes].filter(Boolean).join(" ");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderBrandText = (value = "") =>
  escapeHtml(value).replaceAll(
    "Oaklyn Realty",
    '<span class="brand-inline">Oaklyn Realty</span>',
  );

const json = (data) => JSON.stringify(data, null, 2).replaceAll("</script", "<\\/script");
const renderJsonLd = (data) => `<script type="application/ld+json">\n${json(data)}\n</script>`;
const trimSlashes = (value = "") => String(value).replace(/^\/+|\/+$/g, "");
const digitsOnly = (value = "") => String(value).replace(/[^\d]/g, "");
const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const withAssetVersion = (value = "") => {
  const stringValue = String(value || "");
  if (!stringValue.startsWith("/assets/")) return stringValue;
  return `${stringValue}${stringValue.includes("?") ? "&" : "?"}v=${encodeURIComponent(project.assetVersion)}`;
};

const getWhatsAppHref = () => {
  const phone = digitsOnly(company.whatsappHref || company.phoneHref);
  const message = project.whatsappPrefill || `Hello, I would like more information about ${project.name}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

const getClientConfig = () => ({
  project_name: project.name,
  project_slug: project.slug,
  source_page: project.sourcePage,
  landing_page_url: project.landingPageUrl,
  thank_you_page_url: project.thankYouPageUrl,
  webhook_url: project.webhookUrl,
  whatsapp_webhook_url: project.whatsappWebhookUrl || "",
  blacklist_check_url: project.blacklistCheckUrl || "",
  blacklist_timeout_ms: Number(project.blacklistTimeoutMs) || 8000,
  blacklist_block_message: project.form.blacklistBlockedMessage || "Thank you. Your inquiry has already been received.",
  blacklist_block_title: t("blocked_success_title", "Thank you"),
  blacklist_error_message: project.form.blacklistErrorMessage || "Something went wrong. Please try again.",
  whatsapp_progress_button_label: t("whatsapp_progress_button_label"),
  whatsapp_progress_waiting_label: t("whatsapp_progress_waiting_label"),
  whatsapp_progress_steps: [
    t("whatsapp_progress_step_1"),
    t("whatsapp_progress_step_2"),
    t("whatsapp_progress_step_3")
  ],
  whatsapp_progress_min_ms: Number(project.whatsappProgressMinMs) || 2200,
  split_name: Boolean(project.form.splitName),
});

const renderWhatsAppLink = ({ className = "", label = "WhatsApp", location = "default", iconOnly = false } = {}) =>
  `<a class="${escapeHtml(className)}" href="${escapeHtml(getWhatsAppHref())}" target="_blank" rel="noopener" data-whatsapp-cta data-cta-location="${escapeHtml(location)}" data-whatsapp-destination="${escapeHtml(getWhatsAppHref())}"${iconOnly ? ` aria-label="${escapeHtml(label)}"` : ""}>${
    iconOnly
      ? `<i class="bx bxl-whatsapp" aria-hidden="true"></i>`
      : escapeHtml(label)
  }</a>`;

const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://oaklynrealty.ae/#organization",
  name: company.legalName,
  alternateName: company.company,
  url: company.mainWebsite,
  logo: company.logo,
  image: company.logo,
  telephone: company.phoneHref,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.office,
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  identifier: [
    { "@type": "PropertyValue", propertyID: "DED Licence", value: "1589593" },
    { "@type": "PropertyValue", propertyID: "RERA ORN", value: "59210" },
  ],
});

const getWebpageSchema = ({ canonical, title, description }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: canonical,
  name: title,
  description,
  inLanguage: getLocaleLang(),
  about: { "@id": "https://oaklynrealty.ae/#organization" },
  publisher: { "@id": "https://oaklynrealty.ae/#organization" },
});

const getListingSchema = (canonical) => {
  const listing = project.listing || {};
  const permit = project.compliance?.permit;
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: canonical,
    name: project.name,
    description: project.seo.description,
    brokerage: { "@id": "https://oaklynrealty.ae/#organization" },
    broker: { "@id": "https://oaklynrealty.ae/#organization" },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.addressLocality || "Dubai",
      addressRegion: listing.addressRegion || listing.addressLocality || "Dubai",
      addressCountry: listing.addressCountry || "AE",
    },
    regulator: {
      "@type": "GovernmentOrganization",
      name: listing.regulator || "Dubai Land Department",
    },
  };

  if (listing.developer) {
    schema.developer = {
      "@type": "Organization",
      name: listing.developer,
    };
  }

  if (permit?.value) {
    schema.identifier = [
      {
        "@type": "PropertyValue",
        propertyID: permit.propertyID || "Advertising Permit",
        value: permit.value,
      },
    ];
  }

  return schema;
};

const renderHead = ({ title, description, canonical, noindex = false, includeListingSchema = true }) => `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${noindex ? '<meta name="robots" content="noindex, nofollow">' : ""}
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
  ${renderGtmHead(project.tracking, escapeHtml)}
  ${renderJsonLd(getOrganizationSchema())}
  ${renderJsonLd(getWebpageSchema({ canonical, title, description }))}
  ${includeListingSchema ? renderJsonLd(getListingSchema(canonical)) : ""}
  <link rel="stylesheet" href="/styles.css?v=${escapeHtml(project.assetVersion)}">`;

const renderNav = () => `
  <header class="topbar">
    <div class="shell nav">
      <a class="brand" href="${escapeHtml(project.homeHref || "/")}" aria-label="${escapeHtml(company.company)} ${escapeHtml(project.name)} landing page">
        <img src="${escapeHtml(company.logo)}" alt="${escapeHtml(company.company)}">
        <span>${escapeHtml(project.name)}</span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a href="#overview">${escapeHtml(t("nav_overview"))}</a>
        <a href="#gallery">${escapeHtml(t("nav_gallery"))}</a>
        <a href="#location">${escapeHtml(t("nav_location"))}</a>
        <a href="#contact">${escapeHtml(t("nav_contact"))}</a>
        <a href="${escapeHtml(company.mainWebsite)}">${escapeHtml(t("nav_website"))}</a>
      </nav>
      <div class="nav-actions">
        <a class="nav-phone" href="tel:${escapeHtml(company.phoneHref)}">${escapeHtml(company.phoneDisplay)}</a>
        <a class="btn btn-primary" href="#contact">${escapeHtml(t("nav_request_details"))}</a>
      </div>
      ${project.showMobileMenu === false ? "" : `<button class="mobile-menu-button" type="button" aria-label="${escapeHtml(t("mobile_menu_label"))}" aria-expanded="false" data-mobile-menu-button>${escapeHtml(t("mobile_menu_label"))}</button>`}
    </div>
    ${project.showMobileMenu === false ? "" : `<nav class="mobile-menu" aria-label="Mobile navigation" data-mobile-menu>
      <a href="#overview">${escapeHtml(t("nav_overview"))}</a>
      <a href="#gallery">${escapeHtml(t("nav_gallery"))}</a>
      <a href="#location">${escapeHtml(t("nav_location"))}</a>
      <a href="#contact">${escapeHtml(t("nav_contact"))}</a>
      <a href="${escapeHtml(company.mainWebsite)}">${escapeHtml(t("nav_website"))}</a>
    </nav>`}
  </header>`;

const renderFooter = () => `
  <footer class="section">
    <div class="shell footer-panel">
      <div class="footer-grid">
        <div>
          <strong>${escapeHtml(company.company)}</strong>
          <p>${renderBrandText(t("footer_about_text"))}</p>
        </div>
        <div>
          <strong>${escapeHtml(t("footer_contact_heading"))}</strong>
          <p>${escapeHtml(company.office)}</p>
          <p><a href="tel:${escapeHtml(company.phoneHref)}">${escapeHtml(company.phoneDisplay)}</a><br>${renderWhatsAppLink({ label: company.whatsappDisplay || company.phoneDisplay, location: "footer_contact" })}<br><a href="mailto:${escapeHtml(company.email)}">${escapeHtml(company.email)}</a></p>
        </div>
        <div>
          <strong>${escapeHtml(t("footer_legal_heading"))}</strong>
          <div class="footer-links">
            <a href="${escapeHtml(company.contactUrl)}">${escapeHtml(t("footer_contact_link"))}</a>
            <a href="${escapeHtml(company.privacyUrl)}">${escapeHtml(t("footer_privacy_link"))}</a>
            <a href="${escapeHtml(company.termsUrl)}">${escapeHtml(t("footer_terms_link"))}</a>
          </div>
        </div>
      </div>
      <p class="copyright">${escapeHtml(t("footer_copyright"))}</p>
    </div>
  </footer>`;

const renderWhatsAppFloat = () => `<div class="whatsapp-float-wrap">
    ${renderWhatsAppLink({ className: "whatsapp-float", label: t("whatsapp_floating_label"), location: "floating_icon", iconOnly: true })}
  </div>`;

const renderWhatsAppModal = () => `
  <div class="whatsapp-modal" data-whatsapp-modal hidden aria-hidden="true">
    <div class="whatsapp-modal-backdrop" data-whatsapp-modal-close></div>
    <section class="whatsapp-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsappModalTitle">
      <button class="whatsapp-modal-close" type="button" data-whatsapp-modal-close>${escapeHtml(t("whatsapp_close"))}</button>
      <span class="eyebrow">${escapeHtml(t("whatsapp_eyebrow"))}</span>
      <h3 id="whatsappModalTitle">${escapeHtml(t("whatsapp_title"))}</h3>
      <p class="section-copy">${escapeHtml(t("whatsapp_copy"))}</p>
      <div class="phone-input-row whatsapp-modal-phone-row">
        <div class="field">
          <label for="whatsappModalCountryCode">${escapeHtml(t("whatsapp_country_code"))}</label>
          <input id="whatsappModalCountryCode" type="text" inputmode="tel" autocomplete="tel-country-code" value="+971" placeholder="+971">
        </div>
        <div class="field" id="whatsappModalPhoneField">
          <label for="whatsappModalPhone">${escapeHtml(t("whatsapp_phone"))}</label>
          <input id="whatsappModalPhone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="${escapeHtml(t("whatsapp_phone_placeholder"))}">
          <div class="field-error">${escapeHtml(t("whatsapp_phone_error"))}</div>
        </div>
      </div>
      <p class="whatsapp-modal-note">${escapeHtml(t("whatsapp_note"))}</p>
      <div class="whatsapp-modal-status" id="whatsappModalStatus" hidden>
        <div class="whatsapp-modal-status-track" aria-hidden="true">
          <span class="whatsapp-modal-status-fill" id="whatsappModalStatusFill"></span>
        </div>
        <p class="whatsapp-modal-status-text" id="whatsappModalStatusText">${escapeHtml(t("whatsapp_progress_step_1"))}</p>
      </div>
      <div id="whatsappModalError" class="form-error">${escapeHtml(t("whatsapp_error"))}</div>
      <div id="whatsappModalBlocked" class="form-success">
        <h3>${escapeHtml(t("blocked_success_title"))}</h3>
        <p class="section-copy">${escapeHtml(project.form.blacklistBlockedMessage || "Thank you. Your inquiry has already been received.")}</p>
      </div>
      <div class="whatsapp-modal-actions">
        <button class="btn btn-primary" type="button" id="whatsappModalContinue">${escapeHtml(t("whatsapp_continue"))}</button>
        <button class="btn btn-ghost" type="button" data-whatsapp-modal-close>${escapeHtml(t("cancel"))}</button>
      </div>
    </section>
  </div>`;

const renderHighlights = () =>
  project.highlights
    .map(
      (item) => `
          <article class="highlight-card">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </article>`,
    )
    .join("");

const renderHeroVisual = () => {
  const slides = project.heroSlides?.length ? project.heroSlides : [{ image: project.hero.background, label: project.hero.title }];
  if (slides.length === 1) {
    return `<div class="hero-bg" style="background-image: url('${escapeHtml(withAssetVersion(slides[0].image))}');"></div>`;
  }
  return `<div class="hero-slider" data-hero-slider>
        ${slides
          .map(
            (slide, index) =>
              `<div class="hero-bg hero-slide${index === 0 ? " is-active" : ""}" style="background-image: url('${escapeHtml(withAssetVersion(slide.image))}');" aria-label="${escapeHtml(slide.label)}"></div>`,
          )
          .join("\n        ")}
      </div>`;
};

const renderGallerySlides = () =>
  project.gallery.items
    .map(
      (item) => `
            <article class="gallery-slide" data-gallery-slide>
              <div class="gallery-image" style="background-image: url('${escapeHtml(withAssetVersion(item.image))}');">
                <div class="gallery-caption">
                  <span>${escapeHtml(item.eyebrow)}</span>
                  <strong>${escapeHtml(item.title)}</strong>
                </div>
              </div>
            </article>`,
    )
    .join("");

const renderGalleryDots = () =>
  project.gallery.items
    .map(
      (_, index) => `
          <button class="gallery-dot${index === 0 ? " is-active" : ""}" type="button" aria-label="Go to gallery image ${index + 1}" aria-pressed="${index === 0 ? "true" : "false"}" data-gallery-dot></button>`,
    )
    .join("");

const renderSnapshotItems = () =>
  project.snapshot.items
    .map(
      (item) => `
          <article class="why-card">
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </article>`,
    )
    .join("");

const renderLocationBullets = () =>
  project.location.bullets
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

const renderComplianceCards = () =>
  project.trustPoints
    .map(
      (item) => `
          <article class="compliance-card">
            <strong>${renderBrandText(item.title)}</strong>
            <p>${renderBrandText(item.text)}</p>
          </article>`,
    )
    .join("");

const renderPermitNote = () => {
  const permit = project.compliance?.permit;
  if (!permit?.value) return "";
  return `<p class="permit-note">${escapeHtml(permit.label || "Permit No.")} ${escapeHtml(permit.value)} — ${escapeHtml(permit.authority || "Issued by the relevant regulator")}</p>`;
};

const renderFaq = () => {
  if (!project.faq?.length) return "";
  return `<section class="section faq-section">
      <div class="shell">
        <div class="section-kicker">
          <span class="eyebrow">${escapeHtml(t("faq_eyebrow"))}</span>
          <h2 class="section-title">${escapeHtml(t("faq_title"))}</h2>
        </div>
        <div class="faq-grid">
          ${project.faq
            .map(
              (item) => `<article class="faq-card">
            <strong>${escapeHtml(item.question)}</strong>
            <p>${escapeHtml(item.answer)}</p>
          </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
};

const renderOptions = (items) =>
  items.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");

const getDefaultPhoneCountry = () =>
  project.form.phoneCountries?.[0] || { flag: "🇦🇪", label: "United Arab Emirates", dialCode: "+971" };

const renderPhoneCountryPicker = () => {
  const defaultCountry = getDefaultPhoneCountry();

  return `<div class="country-picker" data-country-picker>
      <input id="landing_phone_country" name="phone_country_code" type="hidden" value="${escapeHtml(defaultCountry.dialCode)}">
      <button
        class="country-picker-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="false"
        data-country-picker-trigger
      >
        <span class="country-picker-current">
          <span class="country-picker-flag" data-country-picker-flag>${escapeHtml(defaultCountry.flag)}</span>
          <span class="country-picker-label" data-country-picker-label>${escapeHtml(defaultCountry.label)}</span>
          <span class="country-picker-code" data-country-picker-code>${escapeHtml(defaultCountry.dialCode)}</span>
        </span>
        <span class="country-picker-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="country-picker-panel" data-country-picker-panel hidden>
        <label class="sr-only" for="landing_phone_country_search">${escapeHtml(t("phone_search_sr_label"))}</label>
        <input
          id="landing_phone_country_search"
          class="country-picker-search"
          type="search"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          enterkeyhint="search"
          placeholder="${escapeHtml(t("phone_search_placeholder"))}"
          data-country-picker-search
        >
        <div class="country-picker-list" role="listbox" data-country-picker-list>
          ${project.form.phoneCountries
            .map(
              (item, index) => `<button
              class="country-picker-option${index === 0 ? " is-selected" : ""}"
              type="button"
              role="option"
              aria-selected="${index === 0 ? "true" : "false"}"
              data-country-option
              data-country-flag="${escapeHtml(item.flag)}"
              data-country-label="${escapeHtml(item.label)}"
              data-country-code="${escapeHtml(item.dialCode)}"
              data-country-query="${escapeHtml(`${item.label} ${item.dialCode}`.toLowerCase())}"
            >
              <span class="country-picker-option-flag">${escapeHtml(item.flag)}</span>
              <span class="country-picker-option-label">${escapeHtml(item.label)}</span>
              <span class="country-picker-option-code">${escapeHtml(item.dialCode)}</span>
            </button>`,
            )
            .join("")}
        </div>
        <p class="country-picker-empty" data-country-picker-empty hidden>${escapeHtml(t("phone_search_empty"))}</p>
      </div>
    </div>`;
};

const getFormLabels = () => ({
  name: "Full Name",
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone",
  email: "Email",
  project: "Preferred Project",
  propertyType: "Property Type",
  ...(project.form.labels || {}),
});

const renderNameFields = (formLabels) => {
  if (!project.form.splitName) {
    return `<div class="field" id="nameField">
                <label for="landing_full_name">${escapeHtml(formLabels.name)}</label>
                <input id="landing_full_name" name="full_name" type="text" autocomplete="name" required>
                <div class="field-error">${escapeHtml(t("validation_name"))}</div>
              </div>`;
  }

  return `<div class="field" id="firstNameField">
                <label for="landing_first_name">${escapeHtml(formLabels.firstName)}</label>
                <input id="landing_first_name" name="first_name" type="text" autocomplete="given-name" required>
                <div class="field-error">${escapeHtml(t("validation_first_name"))}</div>
              </div>
              <div class="field" id="lastNameField">
                <label for="landing_last_name">${escapeHtml(formLabels.lastName)}</label>
                <input id="landing_last_name" name="last_name" type="text" autocomplete="family-name" required>
                <div class="field-error">${escapeHtml(t("validation_last_name"))}</div>
              </div>`;
};

const renderAbout = () => {
  if (!project.about) return "";
  return `<section class="section about-community">
      <div class="shell about-panel">
        <span class="eyebrow">${escapeHtml(project.about.eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(project.about.title)}</h2>
        <p class="section-copy">${renderBrandText(project.about.text)}</p>
      </div>
    </section>`;
};

const renderUnitCardsSection = () => {
  if (!project.unitCardsSection?.items?.length) return "";
  const labels = {
    size: project.unitCardsSection.labels?.size || "Size",
    price: project.unitCardsSection.labels?.price || "Price",
    pricePerSqft: project.unitCardsSection.labels?.pricePerSqft || "Price / Sqft"
  };
  return `<section class="section unit-cards-section">
      <div class="shell">
        <div class="section-kicker">
          <span class="eyebrow">${escapeHtml(project.unitCardsSection.eyebrow)}</span>
          <h2 class="section-title">${escapeHtml(project.unitCardsSection.title)}</h2>
        </div>
        <div class="unit-cards-grid">
          ${project.unitCardsSection.items
            .map(
              (item) => `<article class="unit-card">
                <strong class="unit-card-title">${escapeHtml(item.title)}</strong>
                <div class="unit-card-rows">
                  <div class="unit-card-row">
                    <span class="unit-card-label">${escapeHtml(labels.size)}</span>
                    <span class="unit-card-value">${escapeHtml(item.size)}</span>
                  </div>
                  <div class="unit-card-row unit-card-row--price">
                    <span class="unit-card-label">${escapeHtml(labels.price)}</span>
                    <span class="unit-card-value">${escapeHtml(item.price)}</span>
                  </div>
                  <div class="unit-card-row unit-card-row--accent">
                    <span class="unit-card-label">${escapeHtml(labels.pricePerSqft)}</span>
                    <span class="unit-card-value">${escapeHtml(item.pricePerSqft)}</span>
                  </div>
                </div>
              </article>`,
            )
            .join("")}
        </div>
        ${project.unitCardsSection.note ? `<p class="unit-cards-note">${escapeHtml(project.unitCardsSection.note)}</p>` : ""}
      </div>
    </section>`;
};

const renderAboutUsSection = () => {
  if (!project.aboutUsSection) return "";
  return `<section class="section about-us-section">
      <div class="shell about-panel about-us-panel">
        <span class="eyebrow">${escapeHtml(project.aboutUsSection.eyebrow)}</span>
        <h2 class="section-title">${renderBrandText(project.aboutUsSection.title)}</h2>
        <p class="section-copy">${renderBrandText(project.aboutUsSection.text)}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="${escapeHtml(project.aboutUsSection.href)}" target="_blank" rel="noopener">${renderBrandText(project.aboutUsSection.ctaLabel)}</a>
        </div>
      </div>
    </section>`;
};

const isHttpUrl = (value = "") => /^https?:\/\//i.test(String(value));
const isWhatsAppUrl = (value = "") => /wa\.me|whatsapp/i.test(String(value));
const isTelUrl = (value = "") => /^tel:/i.test(String(value));
const isMapUrl = (value = "") => /maps\.app|google\.[^/]+\/maps/i.test(String(value));

const getFaviconUrl = (href = "") => {
  if (!isHttpUrl(href)) return "";
  return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(href)}`;
};

const getLinkHubActionLabel = (item) => {
  if (!item.href) return "URL Pending";
  if (item.actionLabel) return item.actionLabel;
  if (isTelUrl(item.href)) return "Call";
  if (isWhatsAppUrl(item.href)) return "Chat";
  if (isMapUrl(item.href)) return "Directions";
  return "Visit";
};

const renderLinkHubCardMedia = (item = {}) => {
  if (item.image) {
    return `<span class="link-hub-card-media is-image" aria-hidden="true"><img src="${escapeHtml(item.image)}" alt=""></span>`;
  }

  if (item.logo) {
    return `<span class="link-hub-card-media is-logo" aria-hidden="true"><img src="${escapeHtml(item.logo)}" alt=""></span>`;
  }

  if (item.avatarText) {
    return `<span class="link-hub-card-media is-avatar" aria-hidden="true">${escapeHtml(item.avatarText)}</span>`;
  }

  if (item.href && isHttpUrl(item.href) && !isMapUrl(item.href) && !isWhatsAppUrl(item.href)) {
    return `<span class="link-hub-card-media is-favicon" aria-hidden="true"><img src="${escapeHtml(getFaviconUrl(item.href))}" alt=""></span>`;
  }

  const iconClass = item.icon || "bx bx-link";
  return `<span class="link-hub-card-media is-icon" aria-hidden="true"><i class="${escapeHtml(iconClass)}"></i></span>`;
};

const renderLinkHubCards = (items = [], section = {}) =>
  items
    .map((item) => {
      const actionLabel = getLinkHubActionLabel(item);
      const classes = [
        "link-hub-card",
        item.href ? "" : "is-placeholder",
        item.image ? "has-image" : "",
        item.logo ? "has-logo" : "",
        item.avatarText ? "has-avatar" : "",
        section.title === "Contacts" ? "is-contact" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const cardInner = `
        ${renderLinkHubCardMedia(item)}
        <span class="link-hub-card-copy">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.description || "Add final destination URL")}</small>
        </span>
        <span class="link-hub-card-badge${item.href ? "" : " is-pending"}">${escapeHtml(actionLabel)}</span>
        <span class="link-hub-card-arrow" aria-hidden="true">${item.href ? "↗" : "…"}</span>`;

      if (item.href) {
        const externalAttrs = isHttpUrl(item.href) ? ' target="_blank" rel="noopener"' : "";
        return `<a class="${classes}" href="${escapeHtml(item.href)}"${externalAttrs}>${cardInner}</a>`;
      }

      return `<article class="${classes}">${cardInner}</article>`;
    })
    .join("");

const renderLinkHubJumpNav = (sections = []) =>
  `<nav class="link-hub-jump-nav" aria-label="Quick links">
    ${sections
      .map(
        (section) => `<a class="link-hub-jump-chip" href="#${escapeHtml(slugify(section.title))}">${escapeHtml(section.title)}</a>`,
      )
      .join("")}
  </nav>`;

const renderLinkHubSections = () =>
  (project.linkHub?.sections || [])
    .map(
      (section) => `
        <section class="link-hub-group link-hub-group--${escapeHtml(section.layout || "compact")}" id="${escapeHtml(slugify(section.title))}">
          <div class="link-hub-group-panel">
            <div class="link-hub-group-header">
              <span class="link-hub-group-title">${escapeHtml(section.title)}</span>
              <span class="link-hub-group-count">${section.items.length} link${section.items.length === 1 ? "" : "s"}</span>
            </div>
            <div class="link-hub-card-stack">
              ${renderLinkHubCards(section.items, section)}
            </div>
          </div>
        </section>`,
    )
    .join("");

const renderLinkHubPage = (nextProject) => {
  setProject(nextProject);
  const linkHub = project.linkHub;
  if (!linkHub) return "";
  const lang = getLocaleLang();
  const dir = getLocaleDir();
  const bodyClass = getBodyClass("link-hub-page");

  return `<!doctype html>
<html lang="${escapeHtml(lang)}" dir="${escapeHtml(dir)}">
<head>
${renderHead({
  title: linkHub.seo.title,
  description: linkHub.seo.description,
  canonical: linkHub.landingPageUrl,
  noindex: true,
  includeListingSchema: false,
})}
</head>
<body${bodyClass ? ` class="${escapeHtml(bodyClass)}"` : ""}>
${renderGtmBody(project.tracking, escapeHtml)}
  <main class="link-hub">
    <div class="link-hub-shell">
      <section class="link-hub-profile">
        <div class="link-hub-profile-panel">
          <div class="link-hub-profile-cover"${linkHub.profile.coverImage ? ` style="background-image: url('${escapeHtml(linkHub.profile.coverImage)}')"` : ""}></div>
          <div class="link-hub-profile-overlay"></div>
          <div class="link-hub-profile-body">
            <div class="link-hub-mark" aria-hidden="true">${linkHub.profile.logo ? `<img src="${escapeHtml(linkHub.profile.logo)}" alt="">` : "OR"}</div>
            <span class="eyebrow">${escapeHtml(linkHub.profile.eyebrow)}</span>
            <div class="link-hub-handle">${escapeHtml(linkHub.profile.handle)}</div>
            <h1>${escapeHtml(linkHub.profile.title)}</h1>
            <p class="link-hub-subtitle">${escapeHtml(linkHub.profile.subtitle)}</p>
            <p class="link-hub-note">${escapeHtml(linkHub.profile.note)}</p>
            ${renderLinkHubJumpNav(linkHub.sections)}
          </div>
        </div>
      </section>
      <div class="link-hub-stack">
        ${renderLinkHubSections()}
      </div>
    </div>
  </main>
</body>
</html>`;
};

const renderLandingPage = (nextProject) => {
  setProject(nextProject);
  const formLabels = getFormLabels();
  const lang = getLocaleLang();
  const dir = getLocaleDir();
  const bodyClass = getBodyClass();
  return `<!doctype html>
<html lang="${escapeHtml(lang)}" dir="${escapeHtml(dir)}">
<head>
${renderHead({
  title: project.seo.title,
  description: project.seo.description,
  canonical: project.landingPageUrl,
})}
  <script>window.OAKLYN_LANDING_CONFIG = ${json(getClientConfig())};</script>
</head>
<body${bodyClass ? ` class="${escapeHtml(bodyClass)}"` : ""}>
${renderGtmBody(project.tracking, escapeHtml)}
${renderNav()}
  <main>
    <section class="hero">
      ${renderHeroVisual()}
      <div class="hero-shade"></div>
      <div class="shell hero-content">
        <span class="eyebrow">${renderBrandText(project.hero.eyebrow)}</span>
        <h1>${escapeHtml(project.hero.title)}</h1>
        <p>${escapeHtml(project.hero.subtitle)}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#contact">${escapeHtml(project.hero.primaryCta)}</a>
          <a class="btn btn-ghost" href="#contact">${escapeHtml(project.hero.secondaryCta)}</a>
        </div>
      </div>
    </section>

    <section class="section quick-highlights" id="overview">
      <div class="shell">
        <div class="section-kicker">
          <span class="eyebrow">${escapeHtml(t("quick_highlights_eyebrow"))}</span>
          <h2 class="section-title">${escapeHtml(t("quick_highlights_title"))}</h2>
        </div>
        <div class="highlight-grid">
          ${renderHighlights()}
        </div>
      </div>
    </section>

    ${renderUnitCardsSection()}

    ${renderAbout()}

    <section class="section gallery-section" id="gallery">
      <div class="shell">
        <div class="gallery-header section-kicker">
          <span class="eyebrow">${escapeHtml(project.gallery.eyebrow)}</span>
          <h2 class="section-title">${escapeHtml(project.gallery.title)}</h2>
          <p class="section-copy">${escapeHtml(project.gallery.text)}</p>
        </div>
        <div class="gallery glass-card" data-gallery>
          <div class="gallery-track" data-gallery-track>
            ${renderGallerySlides()}
          </div>
        </div>
        <div class="gallery-controls">
          <div class="gallery-dots">${renderGalleryDots()}</div>
          <div class="gallery-arrows">
            <button class="gallery-arrow" type="button" aria-label="${escapeHtml(t("gallery_prev"))}" data-gallery-prev>←</button>
            <button class="gallery-arrow" type="button" aria-label="${escapeHtml(t("gallery_next"))}" data-gallery-next>→</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section why-section">
      <div class="shell">
        <div class="section-kicker">
          <span class="eyebrow">${escapeHtml(project.snapshot.eyebrow)}</span>
          <h2 class="section-title">${escapeHtml(project.snapshot.title)}</h2>
        </div>
        <div class="why-grid">${renderSnapshotItems()}</div>
      </div>
    </section>

    <section class="section" id="location">
      <div class="shell location-panel">
        <div>
          <span class="eyebrow">${escapeHtml(project.location.eyebrow)}</span>
          <h2 class="section-title">${escapeHtml(project.location.title)}</h2>
        </div>
        <ul class="location-list">
          ${renderLocationBullets()}
        </ul>
      </div>
    </section>

    ${renderAboutUsSection()}

    <section class="section" id="contact">
      <div class="shell contact-layout">
        <div class="form-intro compact-intro">
          <span class="eyebrow">${escapeHtml(t("request_information_eyebrow"))}</span>
          <h2 class="section-title">${escapeHtml(project.form.title)}</h2>
          <p class="section-copy">${renderBrandText(project.form.text)}</p>
          <div class="mini-compliance">
            <span>${escapeHtml(t("basic_enquiry_only"))}</span>
            <span>${escapeHtml(t("subject_to_confirmation"))}</span>
            <span>${escapeHtml(t("no_guaranteed_returns"))}</span>
          </div>
        </div>
        <div class="form-panel">
          <form id="landingLeadForm" novalidate>
            <div class="field-grid">
              ${renderNameFields(formLabels)}
              <div class="field is-phone" id="phoneField">
                <label for="landing_phone">${escapeHtml(formLabels.phone)}</label>
                <div class="phone-input-row">
                  ${renderPhoneCountryPicker()}
                  <input id="landing_phone" name="phone" type="tel" inputmode="tel" autocomplete="off" autocorrect="off" spellcheck="false" maxlength="20" placeholder="${escapeHtml(t("form_phone_placeholder"))}" required>
                </div>
                <div class="field-error">${escapeHtml(t("form_phone_error"))}</div>
              </div>
              <div class="field" id="emailField">
                <label for="landing_email">${escapeHtml(formLabels.email)}</label>
                <input id="landing_email" name="email" type="email" autocomplete="email" required>
                <div class="field-error">${escapeHtml(t("form_email_error"))}</div>
              </div>
              <div class="field" id="projectField">
                <label for="landing_preferred_project">${escapeHtml(formLabels.project)}</label>
                <select id="landing_preferred_project" name="preferred_project" required>${renderOptions(project.form.preferredProjects)}</select>
                <div class="field-error">${escapeHtml(t("form_select_error"))}</div>
              </div>
              <div class="field" id="propertyTypeField">
                <label for="landing_property_type">${escapeHtml(formLabels.propertyType)}</label>
                <select id="landing_property_type" name="property_type" required>${renderOptions(project.form.propertyTypes)}</select>
                <div class="field-error">${escapeHtml(t("form_select_error"))}</div>
              </div>
            </div>
            <input id="landing_gclid" name="gclid" type="hidden">
            <input id="landing_gbraid" name="gbraid" type="hidden">
            <input id="landing_wbraid" name="wbraid" type="hidden">
            <input id="landing_lead_id" name="lead_id" type="hidden">
            <input id="landing_website" class="hidden-field" name="landing_website" type="text" tabindex="-1" autocomplete="off">
            <p class="disclaimer">${renderBrandText(project.form.consent)}</p>
            <p class="disclaimer">${escapeHtml(project.form.sensitiveDataNotice)}</p>
            <p class="disclaimer">${escapeHtml(project.form.disclaimer)}</p>
            <button id="landingSubmitBtn" class="btn btn-primary" type="submit">${escapeHtml(t("form_submit"))}</button>
            <div id="landingFormError" class="form-error">${renderBrandText(t("form_submit_error"))}</div>
          </form>
          <div id="landingSuccess" class="form-success">
            <h3>${escapeHtml(t("form_success_title"))}</h3>
            <p class="section-copy">${renderBrandText(project.form.successText || `${t("form_success_copy_prefix")} ${project.name}.`)}</p>
          </div>
        </div>
      </div>
    </section>

    ${renderFaq()}

    <section class="section trust-compliance">
      <div class="shell">
        <div class="section-kicker">
          <span class="eyebrow">${escapeHtml(t("trust_eyebrow"))}</span>
          <h2 class="section-title">${escapeHtml(t("trust_title"))}</h2>
        </div>
        <div class="compliance-grid">${renderComplianceCards()}</div>
        ${renderPermitNote()}
      </div>
    </section>
  </main>
  ${renderFooter()}
  ${renderWhatsAppFloat()}
  ${renderWhatsAppModal()}
  <div class="mobile-contact-bar">
    <a href="tel:${escapeHtml(company.phoneHref)}">${escapeHtml(t("mobile_call"))}</a>
    ${renderWhatsAppLink({ label: t("mobile_whatsapp"), location: "mobile_contact_bar" })}
  </div>
  <script src="/client.js?v=${escapeHtml(project.assetVersion)}" defer></script>
</body>
</html>`;
};

const renderThankYouTracking = () => `<script>
(function () {
  var params = new URLSearchParams(window.location.search);
  var leadId = params.get('lead_id') || '';
  var eventId = leadId || (${JSON.stringify(project.slug)} + '_thank_you_' + Date.now());
  var trackingPayload = {
    project_name: ${JSON.stringify(project.name)},
    project_slug: ${JSON.stringify(project.slug)},
    source_page: ${JSON.stringify(project.sourcePage)},
    landing_page_url: ${JSON.stringify(project.landingPageUrl)},
    thank_you_page_url: ${JSON.stringify(project.thankYouPageUrl)},
    lead_id: leadId,
    event_id: eventId,
    gclid: params.get('gclid') || '',
    gbraid: params.get('gbraid') || '',
    wbraid: params.get('wbraid') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || ''
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: 'lead_thank_you_page_view' }, trackingPayload));
  window.dataLayer.push(Object.assign({ event: 'lead_conversion_thank_you' }, trackingPayload));
})();
</script>`;

const renderThankYouPage = ({ currentProject, canonical, backHref }) => {
  setProject(currentProject);
  const lang = getLocaleLang();
  const dir = getLocaleDir();
  const bodyClass = getBodyClass();
  return `<!doctype html>
<html lang="${escapeHtml(lang)}" dir="${escapeHtml(dir)}">
<head>
${renderHead({
  title: `${t("thank_you_meta_title_prefix")} | ${project.name} | ${company.company}`,
  description: t("thank_you_meta_description"),
  canonical,
  noindex: true,
})}
</head>
<body${bodyClass ? ` class="${escapeHtml(bodyClass)}"` : ""}>
${renderGtmBody(project.tracking, escapeHtml)}
${renderNav()}
  <main class="section">
    <div class="shell">
      <section class="form-panel">
        <span class="eyebrow">${escapeHtml(t("thank_you_eyebrow"))}</span>
        <h1>${escapeHtml(t("thank_you_title"))}</h1>
        <p class="section-copy">${renderBrandText(project.form.thankYouText || `${t("thank_you_copy_prefix")} ${project.name}. ${t("thank_you_copy_suffix")}`)}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="${escapeHtml(backHref)}">${escapeHtml(t("back_to_project"))}</a>
          <a class="btn btn-ghost" href="${escapeHtml(company.contactUrl)}">${escapeHtml(t("contact_oaklyn"))}</a>
        </div>
      </section>
    </div>
  </main>
  ${renderFooter()}
  ${renderThankYouTracking()}
</body>
</html>`;
};

const writeGeneratedFile = async (relativePath, contents) => {
  const target = path.join(distDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents);
};

const copyRequiredAssets = async () => {
  const source = path.join(rootDir, "assets");
  const target = path.join(distDir, "assets");

  try {
    const sourceStat = await stat(source);
    if (!sourceStat.isDirectory()) {
      throw new Error("assets exists but is not a directory");
    }
  } catch (error) {
    return;
  }

  await cp(source, target, { recursive: true });
};

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await writeGeneratedFile("index.html", renderLandingPage(landingProject));

const routePath = trimSlashes(landingProject.routePath);
if (routePath) {
  await writeGeneratedFile(`${routePath}/index.html`, renderLandingPage(landingProject));
}

await writeGeneratedFile(
  "thank-you/index.html",
  renderThankYouPage({ currentProject: landingProject, canonical: landingProject.thankYouPageUrl, backHref: routePath ? `/${routePath}/` : "/" }),
);

const alternateThankYouPath = trimSlashes(landingProject.alternateThankYouPath);
if (alternateThankYouPath && alternateThankYouPath !== "thank-you") {
  await writeGeneratedFile(
    `${alternateThankYouPath}/index.html`,
    renderThankYouPage({
      currentProject: landingProject,
      canonical: `${landingProject.landingPageUrl.replace(/\/$/, "")}/${alternateThankYouPath}`,
      backHref: routePath ? `/${routePath}/` : "/",
    }),
  );
}

const linkHubRoutePath = trimSlashes(landingProject.linkHub?.routePath);
if (linkHubRoutePath) {
  await writeGeneratedFile(`${linkHubRoutePath}/index.html`, renderLinkHubPage(landingProject));
}

const arabicRoutePath = trimSlashes(arabicProject?.routePath);
if (arabicRoutePath) {
  await writeGeneratedFile(`${arabicRoutePath}/index.html`, renderLandingPage(arabicProject));
}

const arabicAlternateThankYouPath = trimSlashes(arabicProject?.alternateThankYouPath);
if (arabicAlternateThankYouPath) {
  await writeGeneratedFile(
    `${arabicAlternateThankYouPath}/index.html`,
    renderThankYouPage({
      currentProject: arabicProject,
      canonical: arabicProject.thankYouPageUrl,
      backHref: arabicRoutePath ? `/${arabicRoutePath}/` : "/",
    }),
  );
}

await copyFile(path.join(rootDir, "src", "styles.css"), path.join(distDir, "styles.css"));
await copyFile(path.join(rootDir, "src", "client.js"), path.join(distDir, "client.js"));
await copyRequiredAssets();

console.log(`Built ${landingProject.name} landing project in ${distDir}`);
