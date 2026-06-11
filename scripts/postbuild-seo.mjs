import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const seo = {
  canonical: "https://raw-district-ae.oaklynrealty.ae/",
  title: "Raw District IMTIAZ دبي | شقق من ٦٤٩ ألف درهم في جبل علي",
  description:
    "تفاصيل Raw District by IMTIAZ في وسط جبل علي من ٦٤٩،٠٠٠ درهم — شقق مفروشة ومترو مباشر. اطلب التفاصيل الآن.",
  image:
    "https://raw-district-ae.oaklynrealty.ae/assets/raw-district/photos/template-exterior-master-aerial.png?v=20260610-new-ar-template",
  locale: "ar_AE",
  productId: "raw-district-ae-product",
  productName: "Raw District by IMTIAZ",
  developer: "IMTIAZ Developments",
  location: "Downtown Jebel Ali, Dubai",
  price: "649000",
  currency: "AED",
  alternates: [
    { hreflang: "ar-AE", href: "https://raw-district-ae.oaklynrealty.ae/" },
    { hreflang: "ar", href: "https://raw-district-ae.oaklynrealty.ae/" },
    { hreflang: "en-AE", href: "https://raw-district.oaklynrealty.ae/" },
    { hreflang: "en", href: "https://raw-district.oaklynrealty.ae/" },
    { hreflang: "x-default", href: "https://raw-district.oaklynrealty.ae/" },
  ],
};

const landingFiles = ["index.html", "index-ar.html", "raw-district/index.html", "__oaklyn-lang/ar/index.html"];
const targets = landingFiles.flatMap((file) => [path.join(rootDir, file), path.join(distDir, file)]);

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const upsertTag = (html, pattern, tag, afterPattern) =>
  pattern.test(html) ? html.replace(pattern, tag) : html.replace(afterPattern, `$&\n  ${tag}`);

const offer = {
  "@type": "Offer",
  url: seo.canonical,
  price: seo.price,
  priceCurrency: seo.currency,
  availability: "https://schema.org/InStock",
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://oaklynrealty.ae/#organization",
  name: "Oaklyn Realty",
  legalName: "Oaklyn Real Estate L.L.C.",
  url: "https://oaklynrealty.ae",
  logo: "https://oaklynrealty.com/wp-content/uploads/2026/05/logo_landscape.png",
  telephone: "+971585835230",
  email: "sales@oaklynrealty.ae",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Oxford Tower, Office 607, 6th Floor, Business Bay, Dubai, UAE",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${seo.canonical}#${seo.productId}`,
  name: seo.productName,
  description: seo.description,
  image: seo.image,
  brand: {
    "@type": "Organization",
    name: seo.developer,
  },
  category: "Dubai real estate project",
  areaServed: {
    "@type": "Place",
    name: seo.location,
  },
  offers: offer,
};
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${seo.canonical}#webpage`,
  url: seo.canonical,
  name: seo.title,
  description: seo.description,
  inLanguage: "ar-AE",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: seo.image,
  },
  about: { "@id": `${seo.canonical}#listing` },
  publisher: { "@id": "https://oaklynrealty.ae/#organization" },
};
const listingSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "@id": `${seo.canonical}#listing`,
  url: seo.canonical,
  name: seo.productName,
  description: seo.description,
  image: [seo.image],
  brokerage: {
    "@id": "https://oaklynrealty.ae/#organization",
  },
  broker: {
    "@id": "https://oaklynrealty.ae/#organization",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Downtown Jebel Ali",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: seo.developer,
  },
  offers: offer,
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${seo.canonical}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Oaklyn Realty", item: "https://oaklynrealty.ae" },
    { "@type": "ListItem", position: 2, name: seo.productName, item: seo.canonical },
  ],
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${seo.canonical}#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "ما هو سعر البداية في Raw District؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "يبدأ السعر من ٦٤٩ ألف درهم، مع ضرورة تأكيد الأسعار والتوافر من المطور قبل الحجز.",
      },
    },
    {
      "@type": "Question",
      name: "أين يقع Raw District؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "يقع Raw District في وسط جبل علي، دبي، مع وصول مناسب إلى المترو وشارع الشيخ زايد.",
      },
    },
  ],
};

const schemaHtml = [organizationSchema, webpageSchema, productSchema, listingSchema, breadcrumbSchema, faqSchema]
  .map((schema) => `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2).replaceAll("</script", "<\\/script")}\n</script>`)
  .join("\n  ");
const hreflangHtml = seo.alternates
  .map((item) => `<link rel="alternate" hreflang="${escapeHtml(item.hreflang)}" href="${escapeHtml(item.href)}">`)
  .join("\n  ");

const applySeo = (html) => {
  let next = html;
  next = next
    .replace(/"source_page":\s*"raw-district\.oaklynrealty\.ae"/g, '"source_page": "raw-district-ae.oaklynrealty.ae"')
    .replace(/"landing_page_url":\s*"https:\/\/raw-district\.oaklynrealty\.ae\/"/g, '"landing_page_url": "https://raw-district-ae.oaklynrealty.ae/"')
    .replace(/"thank_you_page_url":\s*"https:\/\/raw-district\.oaklynrealty\.ae\/thank-you\/"/g, '"thank_you_page_url": "https://raw-district-ae.oaklynrealty.ae/thank-you/"');
  next = upsertTag(next, /<meta name="robots" content="[^"]*">/, '<meta name="robots" content="index, follow">', /<meta name="viewport"[^>]*>/);
  next = upsertTag(next, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`, /<meta name="robots"[^>]*>/);
  next = upsertTag(
    next,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtml(seo.description)}">`,
    /<title>[\s\S]*?<\/title>/,
  );
  next = upsertTag(next, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${seo.canonical}">`, /<meta name="author"[^>]*>|<meta name="description"[^>]*>/);
  next = next.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">\n?/g, "\n");
  next = next.replace(/(<link rel="canonical" href="[^"]+">\s*)/, `$1\n  ${hreflangHtml}\n  `);
  next = upsertTag(next, /<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="website">', /<link rel="alternate"[^>]*>/);
  next = upsertTag(next, /<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${seo.locale}">`, /<meta property="og:type"[^>]*>/);
  next = upsertTag(next, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(seo.title)}">`, /<meta property="og:site_name"[^>]*>|<meta property="og:locale"[^>]*>/);
  next = upsertTag(next, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(seo.description)}">`, /<meta property="og:title"[^>]*>/);
  next = upsertTag(next, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${seo.canonical}">`, /<meta property="og:description"[^>]*>/);
  next = upsertTag(next, /<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${seo.image}">`, /<meta property="og:url"[^>]*>/);
  next = upsertTag(next, /<meta name="twitter:card" content="[^"]*">/, '<meta name="twitter:card" content="summary_large_image">', /<meta property="og:image"[^>]*>/);
  next = upsertTag(next, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`, /<meta name="twitter:card"[^>]*>/);
  next = upsertTag(next, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`, /<meta name="twitter:title"[^>]*>/);
  next = upsertTag(next, /<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${seo.image}">`, /<meta name="twitter:description"[^>]*>/);
  next = next.replace(/\s*<script type="application\/ld\+json">\n[\s\S]*?\n<\/script>\n?/g, "\n");
  next = next.replace(/(<link href="https:\/\/unpkg\.com\/boxicons@2\.1\.4\/css\/boxicons\.min\.css" rel="stylesheet">)/, `${schemaHtml}\n  $1`);
  return next;
};

for (const target of targets) {
  try {
    await writeFile(target, applySeo(await readFile(target, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

console.log("Applied Raw District Arabic SEO post-build fixes.");
