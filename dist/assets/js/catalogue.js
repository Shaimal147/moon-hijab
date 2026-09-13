// Product facts transcribed from the supplied Moon Hijab catalogue.
// Prices are MVR; all measurements are inches. null means confirmation needed.
export const categories = [
  {
    id: "niqabs",
    name: "Niqabs",
    description: "From simple silhouettes to layered coverage.",
  },
  {
    id: "hijabs-khimars",
    name: "Hijabs & Khimars",
    description: "Shawls, flowing hijabs and longer khimars.",
  },
  {
    id: "abayas-jilbabs",
    name: "Abayas & Jilbabs",
    description: "Full-length styles, with options to make them yours.",
  },
];
export const sizeLabels = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
};
const allSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const four = allSizes.slice(0, 4),
  three = allSizes.slice(0, 3);
const matrix = (rows) =>
  Object.fromEntries(
    rows.map((row, i) => [
      i + 1,
      Object.fromEntries(allSizes.map((s, j) => [s, row[j] ?? null])),
    ]),
  );
const measurements = (front, back, width) =>
  Object.fromEntries(
    front.map((v, i) => [
      allSizes[i],
      { front: v, back: back[i], ...(width ? { width: width[i] } : {}) },
    ]),
  );
const ferrariPrices = matrix([
  [200, 220, 270, 320, 370, 420],
  [270, 320, 370, 420, 470, 520],
  [320, 420, 470, 520, 570, 620],
]);
const hareerPrices = matrix([
  [230, 250, 300, 350, 400, 450],
  [300, 350, 400, 450, 500, 550],
  [350, 450, 500, 550, 600, 650],
]);
// The source repeats XXL in its last rows. Do not silently assign those prices to XXXL.
const shamaamaPrices = matrix([
  [280, 300, 350, 400, 450, null],
  [350, 400, 450, 500, 550, null],
  [400, 500, 550, 600, 650, null],
]);
const ferrariMeasurements = measurements(
  [22, 25, 27, 30, 30, 30],
  [32, 35, 37, 40, 45, 50],
);
const shamaamaMeasurements = measurements(
  [22, 25, 27, 30, 30, 30],
  [35, 38, 40, 43, 48, 53],
  [45, 50, 55, 55, 55, null],
);
export const generalNiqabRules = {
  layers: [1, 2, 3],
  layerLabel: "Back layers",
  removableBack: true,
  faina: true,
  fainaPrice: 50,
  cap: true,
  capPrice: 10,
  noseString: true,
  noseStringPrice: 10,
};
const niqab = (id, name, description, extra = {}) => ({
  id,
  slug: id,
  name,
  category: "niqabs",
  description,
  tags: [],
  images: [],
  sizes: allSizes,
  measurements: ferrariMeasurements,
  prices: ferrariPrices,
  startingPrice: 200,
  colour: "Black",
  variants: [],
  rules: { ...generalNiqabRules, ...extra.rules },
  availabilityNotes:
    "Please confirm availability and preparation time when enquiring.",
  ...Object.fromEntries(Object.entries(extra).filter(([k]) => k !== "rules")),
});
const single = (values) => ({
  1: Object.fromEntries(values.map((v, i) => [allSizes[i], v])),
});
const garment = (id, name, description, extra) => ({
  id,
  slug: id,
  name,
  description,
  category: "hijabs-khimars",
  tags: [],
  images: [],
  sizes: four,
  measurements: {},
  prices: {},
  colour: null,
  variants: [],
  rules: { layers: [], removableBack: false, faina: false },
  availabilityNotes:
    "Ask about available colours, availability and preparation time.",
  ...extra,
});
export const products = [
  niqab(
    "ferrari",
    "Ferrari",
    "A simple niqab with a square front and a flared back.",
    { tags: ["Square front", "Flared back"] },
  ),
  niqab("hareer", "Hareer", "A flowy niqab with a flared front and back.", {
    tags: ["Flared silhouette"],
    prices: hareerPrices,
    startingPrice: 230,
    images: [
       {src: "assets/images/hareer-niqab.png", alt: "Hareer Niqab" } 
      ]
  }),
  niqab(
    "shamaama",
    "Shamaama",
    "A niqab that extends around the shoulders for hijab-like coverage.",
    {
      tags: ["Shoulder coverage"],
      prices: shamaamaPrices,
      measurements: shamaamaMeasurements,
      startingPrice: 280,
      confirmationSizes: ["XXXL"],
      confirmationNote:
        "XXXL pricing and width need confirmation. Please request a quote.",
      images: [
       {src: "assets/images/shamaama-niqab.png", alt: "Shamaama Niqab" } 
      ]
    },
  ),
  niqab(
    "butterfly-niqab",
    "Butterfly Niqab",
    "A flowy niqab, available with one, two or three back layers. No pins needed.",
    { tags: ["Flowy style"], prices: hareerPrices, startingPrice: 230, images: [
       {src: "assets/images/butterfly-niqab2co.png", alt: "Butterfly Niqab" } 
      ]
    }
  ),
  niqab(
    "huzaima",
    "Huzaima",
    "A niqab with a longer back veil and a choice of layers.",
    {
      tags: ["Longer back veil"],
      prices: hareerPrices,
      startingPrice: 230,
      measurements: measurements(
        [22, 25, 27, 30, 30, 30],
        [35, 38, 40, 43, 48, 51],
      ),
    },
  ),
  niqab(
    "luyoona",
    "Luyoona",
    "A niqab suited to eye covering, with a choice of back layers.",
    { tags: ["Eye coverage"] },
  ),
  niqab("almas", "Almas", "A niqab with a distinctive diamond-shaped back.", {
    tags: ["Diamond back"],
  }),
  niqab("urwa", "Urwa", "A niqab designed to be worn with a hooded abaya.", {
    tags: ["For hooded abayas"],
    sizes: four,
    prices: matrix([
      [350, 400, 450, 500],
      [420, 500, 550, 600],
    ]),
    startingPrice: 350,
    measurements: measurements([22, 25, 27, 30], [45, 50, 55, 60]),
    rules: { layers: [1, 2] },
    customizationNote: "Available up to XL with one or two back layers.",
  }),
  niqab(
    "malak",
    "Malak",
    "A hooded hijab combined with a front veil. The hijab provides coverage at the back.",
    {
      tags: ["Hooded hijab + veil"],
      sizes: three,
      prices: single([500, 550, 600]),
      startingPrice: 500,
      measurements: {
        S: { frontVeil: 18, hijabFront: 25, hijabBack: 35 },
        M: { frontVeil: 20, hijabFront: 27, hijabBack: 40 },
        L: { frontVeil: 22, hijabFront: 29, hijabBack: 45 },
      },
      rules: { layers: [], removableBack: false },
      customizationNote:
        "No separate back veil or back-layer options. Available in Small, Medium and Large.",
    },
  ),
  niqab("yasmin-niqab", "Yasmin Niqab", "A niqab with a half-circle front.", {
    tags: ["Half-circle front"],
    prices: shamaamaPrices,
    startingPrice: 280,
    measurements: measurements(
      [22, 25, 27, 30, 30, 30],
      [35, 38, 40, 43, 48, 53],
    ),
    confirmationSizes: ["XXXL"],
    confirmationNote:
      "XXXL pricing needs confirmation. Please request a quote.",
    images: [
       {src: "assets/images/yasmin-niqab.png", alt: "Yasmin Niqab" } 
      ]
  }),
  niqab(
    "shawl-niqab",
    "Shawl Niqab",
    "A separate shawl paired with a separate front veil.",
    {
      tags: ["Two separate pieces"],
      sizes: four,
      prices: single([200, 270, 340, 430]),
      measurements: {
        S: { frontVeil: 18, shawl: "Small" },
        M: { frontVeil: 22, shawl: "Medium" },
        L: { frontVeil: 25, shawl: "Large" },
        XL: { frontVeil: 27, shawl: "XL" },
      },
      rules: { layers: [], removableBack: false },
      customizationNote:
        "Supplied as a shawl and front veil. No back-layer options are listed.",
      images: [
       {src: "assets/images/shawl-niqab2.png", alt: "Shawl Niqab" } 
      ]
    },
  ),
  niqab(
    "qaaroora",
    "Qaaroora",
    "A niqab with a flared back veil folded into a single layer. Front and back lengths match.",
    {
      tags: ["Fixed single layer"],
      sizes: four,
      prices: single([280, 300, 350, 400]),
      startingPrice: 280,
      measurements: measurements([22, 25, 27, 30], [22, 25, 27, 30]),
      rules: { layers: [1], removableBack: false, faina: true },
      customizationNote:
        "Available in one back layer, up to XL, with optional cap and nose string.",
    },
  ),
  garment(
    "khimar",
    "Khimar",
    "A khimar with a longer back than front, available in four sizes.",
    {
      tags: ["Long coverage"],
      startingPrice: 350,
      prices: single([350, 400, 450, 500]),
      measurements: measurements([32, 35, 37, 40], [45, 50, 55, 60]),
    },
  ),
  garment(
    "shawl",
    "Shawl",
    "A rectangular shawl in four length and width combinations.",
    {
      tags: ["Rectangular"],
      startingPrice: 100,
      prices: single([100, 150, 200, 250]),
      measurements: {
        S: { length: 72, width: 27 },
        M: { length: 81, width: 36 },
        L: { length: 81, width: 45 },
        XL: { length: 90, width: 54 },
      },
    },
  ),
  garment(
    "flare-hijab",
    "Flare Hijab",
    "A flared hijab with four front and back length combinations.",
    {
      tags: ["Flared silhouette"],
      startingPrice: 200,
      prices: single([200, 250, 300, 350]),
      measurements: measurements([35, 40, 45, 50], [50, 55, 60, 60]),
    },
  ),
  garment(
    "yasmin-hijab",
    "Yasmin Layered Hijab",
    "A layered hijab with your choice of two or three layers.",
    {
      tags: ["2 or 3 layers"],
      startingPrice: 400,
      prices: {
        2: { S: 400, M: 500, L: 600, XL: 700 },
        3: { S: 500, M: 600, L: 700, XL: 800 },
      },
      rules: {
        layers: [2, 3],
        layerLabel: "Hijab layers",
        removableBack: false,
        faina: false,
      },
      measurements: measurements([35, 40, 45, 50], [50, 55, 60, 60]),
    },
  ),
  garment(
    "khimar-kulsum",
    "Khimar Kulsum",
    "A longer khimar, available in Small, Medium and Large.",
    {
      tags: ["Longer front"],
      sizes: three,
      startingPrice: 400,
      prices: single([400, 450, 500]),
      measurements: measurements([48, 50, 52], [52, 54, 56]),
    },
  ),
  garment(
    "butterfly-abaya",
    "Butterfly Abaya",
    "A butterfly abaya available with or without a hood. Price depends on your customization.",
    {
      category: "abayas-jilbabs",
      tags: ["Optional hood", "Made to your choices"],
      priceRange: [500, 1000],
      startingPrice: 500,
      measurements: {
        S: { length: "50, 51 or 52" },
        M: { length: "53, 54 or 55" },
        L: { length: "56 or 57" },
        XL: { length: 58 },
      },
      variants: [
        { id: "hood", label: "Hood", options: ["With hood", "Without hood"] },
      ],
      lengthOptions: {
        S: [50, 51, 52],
        M: [53, 54, 55],
        L: [56, 57],
        XL: [58],
      },
      customizationNote:
        "Choose a hood and length, then tell us about any other adjustments. We will confirm the final price.",
    },
  ),
  garment(
    "jilbab",
    "Jilbab",
    "A jilbab in three sizes, with front, back and sleeve measurements to help you choose.",
    {
      category: "abayas-jilbabs",
      tags: ["Full-length coverage"],
      sizes: three,
      priceRange: [700, 1000],
      startingPrice: 700,
      measurements: {
        S: { back: 63, front: 57, sleeve: 29 },
        M: { back: 65, front: 59, sleeve: 30 },
        L: { back: 67, front: 61, sleeve: 32 },
      },
      customizationNote:
        "Final pricing depends on customization. Share your requirements for a confirmed quote.",
    },
  ),
];
export const measurementLabels = {
  front: "Front",
  back: "Back",
  width: "Width",
  length: "Length",
  frontVeil: "Front veil",
  hijabFront: "Hijab front",
  hijabBack: "Hijab back",
  shawl: "Shawl size",
  sleeve: "Sleeve",
};
export const money = (n) => `MVR ${n.toLocaleString("en-US")}`;
export const categoryName = (id) =>
  categories.find((c) => c.id === id)?.name ?? "";
export function priceFor(product, selection) {
  if (product.priceRange)
    return {
      exact: null,
      range: product.priceRange,
      note: "Final price depends on customization.",
    };
  const base =
    product.prices[selection.layers ?? product.rules.layers[0] ?? 1]?.[
      selection.size
    ];
  const selectedAddOns = [
    ["faina", "Faina eagle-eye treatment"],
    ["cap", "cap"],
    ["noseString", "nose string"],
  ].filter(([id]) => selection[id] && product.rules[id]);
  const extra = selectedAddOns.reduce(
    (total, [id]) => total + product.rules[`${id}Price`],
    0,
  );
  if (selection.removeBack && product.rules.removableBack)
    return {
      exact: null,
      range: null,
      note: "Back-veil removal is quoted individually. The standard catalogue price is not a removal quote.",
    };
  if (base == null || product.confirmationSizes?.includes(selection.size))
    return {
      exact: null,
      range: null,
      note: product.confirmationNote ?? "Please ask for a confirmed price.",
    };
  return {
    exact: base + extra,
    range: null,
    note: extra
      ? `Includes ${selectedAddOns.map(([, label]) => label).join(", ")}.`
      : "For the selected size and options.",
  };
}
export function enquiryMessage(product, s, price) {
  const lines = [
    `Assalaamu alaikum! I would like to enquire about ${product.name}.`,
    `Size: ${sizeLabels[s.size]}`,
  ];
  if (product.colour) lines.push(`Colour: ${product.colour}`);
  if (s.removeBack) lines.push("Back veil: remove (quote requested)");
  else if (product.rules.layers.length)
    lines.push(`${product.rules.layerLabel ?? "Layers"}: ${s.layers}`);
  if (product.rules.faina)
    lines.push(
      `Faina eagle-eye treatment: ${s.faina ? "Yes (+MVR 50)" : "No"}`,
    );
  for (const [id, label] of [["cap", "Cap"], ["noseString", "Nose string"]])
    if (product.rules[id])
      lines.push(`${label}: ${s[id] ? `Yes (+${money(product.rules[`${id}Price`])})` : "No"}`);
  for (const v of product.variants) lines.push(`${v.label}: ${s[v.id]}`);
  if (s.length) lines.push(`Length: ${s.length} inches`);
  if (s.notes?.trim()) lines.push(`Requests: ${s.notes.trim()}`);
  lines.push(
    price.exact !== null
      ? `Displayed price: ${money(price.exact)}`
      : price.range
        ? `Catalogue range: ${price.range.map(money).join("–")} (please confirm final quote)`
        : "Price: please provide a quote.",
  );
  lines.push("Please confirm availability and ordering details.");
  return lines.join("\n");
}
