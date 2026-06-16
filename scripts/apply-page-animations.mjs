import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const cssId = "raw-ar-motion-css";
const jsId = "raw-ar-motion-js";

const motionCss = `<style id="${cssId}">
  html{scroll-behavior:smooth}
  .raw-attached-template.raw-motion-ready .reveal,
  .raw-attached-template.raw-motion-ready .motion-reveal{
    opacity:0;
    transform:translate3d(0,30px,0);
    filter:blur(6px);
    transition:opacity .78s cubic-bezier(.22,1,.36,1),transform .78s cubic-bezier(.22,1,.36,1),filter .78s cubic-bezier(.22,1,.36,1);
    transition-delay:var(--motion-delay,0ms);
    will-change:opacity,transform,filter;
  }
  .raw-attached-template.raw-motion-ready .reveal.active,
  .raw-attached-template.raw-motion-ready .motion-reveal.active{
    opacity:1;
    transform:translate3d(0,0,0);
    filter:blur(0);
  }
  .raw-attached-template.raw-motion-ready header .max-w-2xl > *{
    animation:rawHeroText .82s cubic-bezier(.22,1,.36,1) both;
    animation-delay:var(--hero-delay,0ms);
  }
  .raw-attached-template.raw-motion-ready header .max-w-2xl > :nth-child(1){--hero-delay:80ms}
  .raw-attached-template.raw-motion-ready header .max-w-2xl > :nth-child(2){--hero-delay:180ms}
  .raw-attached-template.raw-motion-ready header .max-w-2xl > :nth-child(3){--hero-delay:290ms}
  .raw-attached-template.raw-motion-ready header .max-w-2xl > :nth-child(4){--hero-delay:400ms}
  .raw-attached-template.raw-motion-ready header img[src*="/assets/raw-district/photos/"]{
    animation:rawHeroImage 14s cubic-bezier(.22,1,.36,1) both;
    transform-origin:center center;
  }
  .raw-attached-template .motion-image{
    transition:transform .72s cubic-bezier(.22,1,.36,1),filter .72s cubic-bezier(.22,1,.36,1);
    transform-origin:center center;
    will-change:transform,filter;
  }
  .raw-attached-template .group:hover .motion-image,
  .raw-attached-template .motion-image:hover{transform:scale(1.035);filter:saturate(1.08) contrast(1.04)}
  .raw-attached-template .motion-cta{
    position:relative;
    isolation:isolate;
    overflow:hidden;
    transform:translateZ(0);
    transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease,background-color .22s ease,color .22s ease;
    will-change:transform;
  }
  .raw-attached-template .motion-cta:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 20px 52px rgba(201,168,76,.22)!important}
  .raw-attached-template .motion-cta:active{transform:translateY(0) scale(.985)}
  .raw-attached-template .motion-cta::after{
    content:"";
    position:absolute;
    inset:-60% -35%;
    z-index:-1;
    pointer-events:none;
    background:linear-gradient(100deg,transparent 35%,rgba(255,255,255,.28) 50%,transparent 65%);
    transform:translateX(120%) rotate(8deg);
    transition:transform .72s cubic-bezier(.22,1,.36,1);
  }
  .raw-attached-template .motion-cta:hover::after{transform:translateX(-120%) rotate(8deg)}
  .raw-attached-template .whatsapp-float{transition:transform .24s ease,box-shadow .24s ease}
  .raw-attached-template .whatsapp-float::before{
    content:"";
    position:absolute;
    inset:-7px;
    border:1px solid rgba(37,211,102,.45);
    border-radius:999px;
    animation:rawWhatsappPulse 2.6s ease-out infinite;
  }
  .raw-attached-template .whatsapp-float:hover{transform:translateY(-3px) scale(1.04)}
  @keyframes rawHeroText{
    from{opacity:0;transform:translate3d(0,22px,0);filter:blur(8px)}
    to{opacity:1;transform:translate3d(0,0,0);filter:blur(0)}
  }
  @keyframes rawHeroImage{
    from{transform:scale(1.045);filter:saturate(.88) contrast(.96)}
    to{transform:scale(1);filter:saturate(1) contrast(1)}
  }
  @keyframes rawWhatsappPulse{
    0%{opacity:.72;transform:scale(.92)}
    80%,100%{opacity:0;transform:scale(1.35)}
  }
  @media (prefers-reduced-motion:reduce){
    html{scroll-behavior:auto}
    .raw-attached-template *,
    .raw-attached-template *::before,
    .raw-attached-template *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
    .raw-attached-template.raw-motion-ready .reveal,
    .raw-attached-template.raw-motion-ready .motion-reveal{opacity:1!important;transform:none!important;filter:none!important}
  }
</style>`;

const motionJs = `<script id="${jsId}">
(function(){
  function ready(fn){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",fn,{once:true});}else{fn();}}
  ready(function(){
    var root=document.body;
    if(!root || !root.classList.contains("raw-attached-template")) return;
    root.classList.add("raw-motion-ready");

    var revealSelectors=[
      "main section",
      "header .hidden.lg\\\\:block",
      "#overview .grid > div",
      "#gallery .group",
      "#location [data-map-link]",
      "#contact .tracked-form-shell"
    ];
    document.querySelectorAll(revealSelectors.join(",")).forEach(function(el){el.classList.add("motion-reveal");});

    document.querySelectorAll("img[src*='/assets/raw-district/photos/']").forEach(function(img){img.classList.add("motion-image");});
    document.querySelectorAll("a[href='#contact'],a[data-whatsapp-cta],a[data-map-link],button#landingSubmitBtn").forEach(function(el){el.classList.add("motion-cta");});

    var items=Array.prototype.slice.call(document.querySelectorAll(".reveal,.motion-reveal"));
    items.forEach(function(el,index){el.style.setProperty("--motion-delay",Math.min((index % 8) * 65,420)+"ms");});

    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      items.forEach(function(el){el.classList.add("active");});
      return;
    }

    if(!("IntersectionObserver" in window)){
      items.forEach(function(el){el.classList.add("active");});
      return;
    }

    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },{rootMargin:"0px 0px -12% 0px",threshold:.12});

    items.forEach(function(el){observer.observe(el);});
  });
})();
</script>`;

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

async function findHtmlFiles(dir) {
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
      const filePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) await walk(filePath);
      if (entry.isFile() && entry.name.endsWith(".html")) found.push(filePath);
    }
  }
  await walk(dir);
  return found;
}

function upsertBlock(html, id, block, closeTag) {
  const existing = new RegExp(`<${closeTag === "</head>" ? "style" : "script"} id="${id}">[\\s\\S]*?<\\/${closeTag === "</head>" ? "style" : "script"}>`);
  if (existing.test(html)) return html.replace(existing, block);
  return html.replace(closeTag, `${block}\n${closeTag}`);
}

function patchHtml(html) {
  if (!html.includes("raw-attached-template")) return html;
  let next = html;
  next = upsertBlock(next, cssId, motionCss, "</head>");
  next = upsertBlock(next, jsId, motionJs, "</body>");
  return next;
}

const htmlFiles = Array.from(new Set([path.join(rootDir, "index.html"), ...(await findHtmlFiles(distDir))]));
let changed = 0;

for (const filePath of htmlFiles) {
  const before = await readIfExists(filePath);
  if (!before) continue;
  const after = patchHtml(before);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed += 1;
  }
}

console.log(`Applied page, image, and CTA animations to ${changed} HTML file(s).`);
