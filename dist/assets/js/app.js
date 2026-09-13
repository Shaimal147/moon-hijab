import {
  products,
  categories,
  sizeLabels,
  measurementLabels,
  money,
  categoryName,
  priceFor,
  enquiryMessage,
} from "./catalogue.js";
import { business, contactLinks } from "./config.js";
const $ = (s) => document.querySelector(s);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      c
      ],
  );
const page = document.body.dataset.page;
function brand() {
  return business.logo
    ? `<img class="brand-logo" src="${esc(business.logo)}" alt="Moon Hijab">`
    : "Moon <span>Hijab</span>";
}
$("#site-header").innerHTML =
  `<a class="skip-link" href="#main">Skip to content</a><div class="announcement text-center px-3 py-2">Where modesty meets everyday elegance.</div><nav class="navbar navbar-expand-md py-3 border-bottom" aria-label="Main navigation"><div class="container"><a class="navbar-brand brand-wordmark" href="index.html">${brand()}</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="main-nav"><ul class="navbar-nav ms-auto align-items-md-center gap-md-4">${[
    ["home", "Home", "index.html"],
    ["products", "Products", "products.html"],
    ["guide", "Size guide", "size-guide.html"],
    ["contact", "Contact", "contact.html"],
  ]
    .map(
      ([id, label, url]) =>
        `<li class="nav-item"><a class="nav-link ${page === id || (page === "product" && id === "products") ? "active" : ""}" ${page === id ? 'aria-current="page"' : ""} href="${url}">${label}</a></li>`,
    )
    .join("")}</ul></div></div></nav>`;
$("#site-footer").innerHTML =
  `<div class="container py-5"><div class="row gy-4 align-items-start"><div class="col-md-5"><a href="index.html" class="brand-wordmark text-decoration-none">${brand()}</a><p class="mt-3 mb-0 text-secondary">Everyday elegance, rooted in modesty.</p></div><div class="col-6 col-md-3"><p class="eyebrow mb-3">Explore</p><ul class="list-unstyled mb-0"><li class="mb-2"><a href="products.html">All products</a></li><li><a href="size-guide.html">Size & measurement guide</a></li></ul></div><div class="col-6 col-md-4"><p class="eyebrow mb-3">Here to help</p><a href="contact.html">Contact Moon Hijab</a><p class="text-secondary mt-2 mb-0">Confirm your choices with us before ordering.</p></div></div><div class="border-top mt-4 pt-4 d-flex flex-wrap justify-content-between gap-2 text-secondary"><span>© ${new Date().getFullYear()} Moon Hijab</span><span>All prices in Maldivian Rufiyaa (MVR)</span></div></div>`;
// Shared by every page, including the missing-page fallback.
const chatLinks = contactLinks(
  "Assalaamu alaikum! I would like to ask about the Moon Hijab collection.",
);
const chatButtons = document.createElement("nav");
chatButtons.className = "floating-chat";
chatButtons.setAttribute("aria-label", "Chat with Moon Hijab");
chatButtons.innerHTML = `
  <a class="floating-chat-button floating-chat-whatsapp" aria-label="Chat with Moon Hijab on WhatsApp (opens in a new tab)" title="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true" focusable="false">
      <path d="M27 15.5a11 11 0 0 1-16.4 9.6L5 27l1.8-5.7A11 11 0 1 1 27 15.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="m12 9-2 1c-1 3 1 6 3 8s5 4 8 3l1-2-4-2-1.5 1.5c-2-1-3-2-4-4L14 13Z" fill="currentColor"/>
    </svg>
  </a>
  <a class="floating-chat-button floating-chat-viber" aria-label="Chat with Moon Hijab on Viber (requires Viber)" title="Chat on Viber">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 5c4-2 10-2 14 0 3 2 4 5 4 10s-2 8-6 9l-6 1-5 4v-5c-4-1-5-4-5-9S6 7 9 5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="m11 9-2 1c-1 3 1 6 3 8s5 4 8 3l1-2-4-2-1.5 1.5c-2-1-3-2-4-4L13 13Z" fill="currentColor"/>
      <path d="M17 8a7 7 0 0 1 7 7m-7-4a4 4 0 0 1 4 4m-4-1a1 1 0 0 1 1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </a>`;
setLink(chatButtons.querySelector(".floating-chat-whatsapp"), chatLinks.whatsapp);
setLink(chatButtons.querySelector(".floating-chat-viber"), chatLinks.viber);
document.body.append(chatButtons);

function placeholder(name) {
  return `<div class="photo-placeholder"><div class="photo-name">${esc(name)}</div><div class="photo-line"></div><div class="photo-caption">Photography coming soon</div></div>`;
}
function photo(p, extra = "") {
  return `<div class="photo-slot ${extra}">${p.images?.length ? `<img src="${esc(p.images[0].src ?? p.images[0])}" alt="${esc(p.images[0].alt ?? p.name)}" loading="lazy" width="600" height="800">` : placeholder(p.name)}</div>`;
}
const cardPrice = (p) =>
  p.priceRange
    ? p.priceRange.map(money).join(" – ")
    : `From ${money(p.startingPrice)}`;
function card(p) {
  return `<div class="col-6 col-lg-3"><article class="card product-card h-100"><a href="product.html?id=${p.slug}" class="text-decoration-none" aria-label="View ${esc(p.name)}">${photo(p)}</a><div class="card-body d-flex flex-column"><div class="d-flex flex-wrap gap-1 mb-2">${p.tags
    .slice(0, 2)
    .map((t) => `<span class="badge feature-badge">${esc(t)}</span>`)
    .join(
      "",
    )}</div><h3 class="mb-2"><a class="text-decoration-none" href="product.html?id=${p.slug}">${esc(p.name)}</a></h3><p class="card-text mb-3">${esc(p.description)}</p><div class="mt-auto"><p class="fw-semibold mb-1">${cardPrice(p)}</p><p class="small text-secondary mb-3">${sizeLabels[p.sizes[0]]} – ${sizeLabels[p.sizes.at(-1)]}</p><a href="product.html?id=${p.slug}" class="btn btn-outline-primary w-100">View details<span class="visually-hidden"> for ${esc(p.name)}</span></a></div></div></article></div>`;
}
function filtersMarkup() {
  return [{ id: "all", name: "All" }, ...categories]
    .map(
      (c) =>
        `<button type="button" class="btn filter-btn" data-category="${c.id}" aria-pressed="false">${esc(c.name)}</button>`,
    )
    .join("");
}
function table(p, selected) {
  const keys = [...new Set(Object.values(p.measurements).flatMap(Object.keys))];
  return `<div class="table-responsive"><table class="table align-middle mb-0"><caption>Garment measurements in inches. Sizes vary by style.</caption><thead><tr><th scope="col">Size</th>${keys.map((k) => `<th scope="col">${measurementLabels[k]}</th>`).join("")}</tr></thead><tbody>${p.sizes.map((s) => `<tr class="${s === selected ? "selected-size" : ""}"><th scope="row">${sizeLabels[s]}</th>${keys.map((k) => `<td>${esc(p.measurements[s]?.[k] ?? "To confirm")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function accordion(id, title, body, open = false) {
  return `<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button ${open ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="${open}" aria-controls="${id}">${title}</button></h2><div id="${id}" class="accordion-collapse collapse ${open ? "show" : ""}"><div class="accordion-body">${body}</div></div></div>`;
}
function setLink(el, url) {
  el.classList.toggle("disabled", !url);
  if (url) {
    el.href = url;
    el.removeAttribute("aria-disabled");
    el.removeAttribute("tabindex");
  } else {
    el.removeAttribute("href");
    el.setAttribute("aria-disabled", "true");
    el.tabIndex = -1;
  }
}
async function copyMessage() {
  const field = $("#enquiry-message");
  try {
    await navigator.clipboard.writeText(field.value);
    $("#copy-status").textContent =
      "Message copied. Paste it into your conversation.";
  } catch {
    field.focus();
    field.select();
    $("#copy-status").textContent =
      "Select and copy the message above, then paste it into your conversation.";
  }
}
function connectContact(message, quote = false) {
  const links = contactLinks(message);
  setLink($("#whatsapp-link"), links.whatsapp);
  setLink($("#viber-link"), links.viber);
  $("#whatsapp-link").textContent = quote
    ? "Request quote on WhatsApp"
    : "Enquire on WhatsApp";
  $("#contact-status").textContent =
    !links.whatsapp && !links.viber
      ? "Contact details will be available soon. You can still copy your enquiry below."
      : !links.whatsapp
        ? "WhatsApp contact is not available yet."
        : !links.viber
          ? "Viber contact is not available yet."
          : "";
  $("#enquiry-message").value = message;
  $("#copy-status").textContent = "";
}
if (page === "home") {
  $("#hero-image").innerHTML = business.heroImage
    ? `<img src="${esc(business.heroImage)}" alt="Moon Hijab collection" width="800" height="1000">`
    : placeholder("Moon Hijab");
  $("#home-categories").innerHTML = categories
    .map(
      (c, i) =>
        `<a class="category-link" href="products.html?category=${c.id}"><div class="d-flex align-items-center gap-4"><span class="section-number">0${i + 1}</span><div><h3>${c.name}</h3><p class="text-secondary small mb-0 mt-2">${c.description}</p></div></div><span class="ms-3" aria-hidden="true"><svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12L12 4M6 4H12V10"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></span></a>`,
    )
    .join("");
  $("#featured-products").innerHTML = [
    "ferrari",
    "malak",
    "khimar",
    "butterfly-abaya",
  ]
    .map((id) => card(products.find((p) => p.id === id)))
    .join("");
}
if (page === "products") {
  const params = new URLSearchParams(location.search);
  let category = categories.some((c) => c.id === params.get("category"))
    ? params.get("category")
    : "all";
  $("#category-filters").innerHTML = filtersMarkup();
  $("#product-search").value = params.get("q") ?? "";
  function render() {
    const q = $("#product-search").value.trim().toLowerCase();
    const found = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.name.toLowerCase().includes(q),
    );
    $("#product-grid").innerHTML = found.length
      ? found.map(card).join("")
      : '<div class="col-12"><div class="no-results text-center"><h2 class="h3">No matching products</h2><p class="text-secondary">Try another name or browse all styles.</p><button class="btn btn-outline-primary" id="reset-filters">Clear filters</button></div></div>';
    $("#product-count").textContent =
      `${found.length} ${found.length === 1 ? "style" : "styles"}`;
    document.querySelectorAll("[data-category]").forEach((b) => {
      const on = b.dataset.category === category;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const url = new URL(location.href);
    category === "all"
      ? url.searchParams.delete("category")
      : url.searchParams.set("category", category);
    q
      ? url.searchParams.set("q", $("#product-search").value.trim())
      : url.searchParams.delete("q");
    history.replaceState({}, "", url);
    $("#reset-filters")?.addEventListener("click", () => {
      category = "all";
      $("#product-search").value = "";
      render();
    });
  }
  $("#category-filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-category]");
    if (b) {
      category = b.dataset.category;
      render();
    }
  });
  $("#product-search").addEventListener("input", render);
  render();
}
if (page === "product") {
  const p = products.find(
    (p) => p.id === new URLSearchParams(location.search).get("id"),
  );
  if (!p) {
    $("#product-root").innerHTML =
      '<div class="py-5 text-center"><p class="eyebrow">Product unavailable</p><h1 class="page-title">Let’s find your style.</h1><p class="text-secondary my-4">This product link is incomplete or no longer available.</p><a class="btn btn-primary" href="products.html">Browse all products</a></div>';
  } else {
    document.title = `${p.name} | Moon Hijab`;
    document.querySelector('meta[name="description"]').content = p.description;
    $("#product-root").innerHTML =
      `<nav aria-label="Breadcrumb" class="py-4"><ol class="breadcrumb mb-0"><li class="breadcrumb-item"><a href="products.html">Products</a></li><li class="breadcrumb-item"><a href="products.html?category=${p.category}">${categoryName(p.category)}</a></li><li class="breadcrumb-item active" aria-current="page">${esc(p.name)}</li></ol></nav><div class="row g-4 g-lg-5 pb-5"><div class="col-lg-6"><div class="detail-photo">${photo(p)}${p.images.length > 1 ? `<div class="d-flex gap-3 mt-3" role="group" aria-label="Product photos">${p.images.map((im, i) => `<button class="gallery-thumb" data-image="${i}" aria-label="View photo ${i + 1}" aria-pressed="${i === 0}"><img src="${esc(im.src ?? im)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}</div></div><div class="col-lg-6 product-info"><p class="eyebrow mb-3">${categoryName(p.category)}</p><h1 class="page-title mb-3">${esc(p.name)}</h1><p class="text-secondary mb-3">${esc(p.description)}</p><div class="d-flex flex-wrap gap-2 mb-4">${p.tags.map((t) => `<span class="badge feature-badge">${esc(t)}</span>`).join("")}${p.colour ? `<span class="badge feature-badge">${p.colour}</span>` : ""}</div><form id="configuration"><fieldset class="mb-4"><legend class="fs-6 fw-semibold mb-2">Choose your size</legend><div class="d-flex flex-wrap gap-2">${p.sizes.map((s, i) => `<input class="btn-check" type="radio" name="size" id="size-${s}" value="${s}" ${i === 0 ? "checked" : ""}><label class="btn btn-outline-primary size-option" for="size-${s}" title="${sizeLabels[s]}">${s}</label>`).join("")}</div><a class="small d-inline-block mt-2" href="size-guide.html?product=${p.id}">Find your measurements</a><div id="measure-summary" class="measure-summary mt-2"></div></fieldset>${p.rules.layers.length > 1 ? `<div class="mb-4"><label class="form-label fw-semibold" for="layers">${p.rules.layerLabel}</label><select class="form-select" id="layers" name="layers">${p.rules.layers.map((n) => `<option value="${n}">${n} ${n === 1 ? "layer" : "layers"}</option>`).join("")}</select></div>` : ""}${p.variants.map((v) => `<div class="mb-4"><label class="form-label fw-semibold" for="${v.id}">${v.label}</label><select class="form-select" id="${v.id}" name="${v.id}">${v.options.map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>`).join("")}${p.lengthOptions ? '<div class="mb-4"><label class="form-label fw-semibold" for="length">Garment length (inches)</label><select class="form-select" id="length" name="length"></select></div>' : ""}${p.rules.faina || p.rules.removableBack ? `<fieldset class="mb-4"><legend class="fs-6 fw-semibold">Make it yours</legend>${p.rules.faina ? '<div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="faina" name="faina"><label class="form-check-label ms-1" for="faina">Faina eagle-eye treatment <span class="text-secondary">(+MVR 50)</span></label></div>' : ""}${p.rules.removableBack ? '<div class="form-check"><input class="form-check-input" type="checkbox" id="removeBack" name="removeBack"><label class="form-check-label ms-1" for="removeBack">Remove the back veil <span class="text-secondary">(request a quote)</span></label></div>' : ""}</fieldset>` : ""}${p.priceRange ? '<div class="mb-4"><label class="form-label fw-semibold" for="notes">Customization requests <span class="fw-normal text-secondary">(optional)</span></label><textarea class="form-control" id="notes" name="notes" rows="3" maxlength="1000" placeholder="Tell us about any adjustments you would like."></textarea></div>' : ""}</form><div class="price-panel py-3 my-4" aria-live="polite" aria-atomic="true"><div id="price-value" class="price-value"></div><p id="price-note" class="small text-secondary mb-0 mt-1"></p></div><div class="d-grid gap-2"><a class="btn btn-primary" id="whatsapp-link" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a><a class="btn btn-outline-primary" id="viber-link">Open Viber</a></div><p id="contact-status" class="small text-secondary mt-3 mb-2"></p><p class="small text-secondary">For Viber, copy your enquiry below and paste it into the chat. Viber must be installed.</p><div class="accordion accordion-flush border-top mt-4">${accordion("measurements", "Measurements", `<div id="measurement-table"></div><a href="size-guide.html?product=${p.id}">View the size guide</a>`)}${accordion("customizations", "Customization & availability", `<p>${esc(p.customizationNote ?? "Choose from the available options above.")}</p>${p.rules.faina ? "<p>Faina adds an eagle-eye curve to this niqab for MVR 50.</p>" : ""}${p.rules.removableBack ? "<p>Removing the back veil needs a separate quote. Back-layer selection does not apply when it is removed.</p>" : ""}${p.confirmationNote ? `<p>${esc(p.confirmationNote)}</p>` : ""}<p class="mb-0">${esc(p.availabilityNotes)}</p>`)}${accordion("message-preview", "Your enquiry message", '<label for="enquiry-message" class="form-label small">Copy and send your selected details</label><textarea id="enquiry-message" class="form-control contact-message" readonly></textarea><button type="button" class="btn btn-outline-primary mt-3" id="copy-message">Copy enquiry</button><p class="small mt-2 mb-0" id="copy-status" role="status"></p>')}</div></div></div>`;
    let previousSize = "";
    function update() {
      const f = new FormData($("#configuration"));
      const s = Object.fromEntries(f.entries());
      s.layers = Number(s.layers ?? p.rules.layers[0] ?? 1);
      s.faina = f.has("faina");
      s.removeBack = f.has("removeBack");
      if (p.lengthOptions && previousSize !== s.size) {
        $("#length").innerHTML = p.lengthOptions[s.size]
          .map((n) => `<option value="${n}">${n} inches</option>`)
          .join("");
        s.length = String(p.lengthOptions[s.size][0]);
      }
      previousSize = s.size;
      if ($("#layers")) $("#layers").disabled = s.removeBack;
      const price = priceFor(p, s);
      $("#price-value").textContent =
        price.exact !== null
          ? money(price.exact)
          : price.range
            ? price.range.map(money).join(" – ")
            : "Request a quote";
      $("#price-note").textContent = price.note;
      $("#measure-summary").textContent = Object.entries(p.measurements[s.size])
        .map(
          ([k, v]) =>
            `${measurementLabels[k]}: ${v == null ? "to confirm" : v}${v != null && k !== "shawl" ? " in" : ""}`,
        )
        .join(" · ");
      $("#measurement-table").innerHTML = table(p, s.size);
      connectContact(enquiryMessage(p, s, price), price.exact === null);
    }
    $("#configuration").addEventListener("input", update);
    $("#configuration").addEventListener("submit", (e) => e.preventDefault());
    $("#copy-message").addEventListener("click", copyMessage);
    document.querySelectorAll("[data-image]").forEach((b) =>
      b.addEventListener("click", () => {
        const im = p.images[Number(b.dataset.image)];
        const img = $(".detail-photo .photo-slot img");
        img.src = im.src ?? im;
        img.alt = im.alt ?? p.name;
        document
          .querySelectorAll("[data-image]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      }),
    );
    update();
  }
}
if (page === "guide") {
  const choice = $("#guide-product");
  choice.innerHTML = categories
    .map(
      (c) =>
        `<optgroup label="${esc(c.name)}">${products
          .filter((p) => p.category === c.id)
          .map((p) => `<option value="${p.id}">${esc(p.name)}</option>`)
          .join("")}</optgroup>`,
    )
    .join("");
  const id = new URLSearchParams(location.search).get("product");
  if (products.some((p) => p.id === id)) choice.value = id;
  function update() {
    const p = products.find((p) => p.id === choice.value);
    $("#guide-name").textContent = p.name;
    $("#guide-table").innerHTML = table(p);
    $("#guide-detail").href = `product.html?id=${p.id}`;
    $("#guide-note").textContent =
      p.confirmationNote ??
      "Compare these garment measurements with a similar piece that fits you well.";
  }
  choice.addEventListener("change", update);
  update();
}
if (page === "contact") {
  connectContact(
    "Assalaamu alaikum! I would like to ask about the Moon Hijab collection.",
  );
  $("#copy-message").addEventListener("click", copyMessage);
  $("#contact-details").innerHTML = [
    business.whatsappNumber
      ? `<p>WhatsApp: ${esc(business.whatsappNumber)}</p>`
      : "",
    business.viberNumber ? `<p>Viber: ${esc(business.viberNumber)}</p>` : "",
    business.address ? `<p>${esc(business.address)}</p>` : "",
    business.hours ? `<p>${esc(business.hours)}</p>` : "",
  ].join("");
}
// Graceful fallback when an owner-supplied photo cannot load.
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG" && e.target.closest(".photo-slot"))
      e.target.closest(".photo-slot").innerHTML = placeholder(
        e.target.alt || "Moon Hijab",
      );
  },
  true,
);
