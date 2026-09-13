import test from "node:test";
import assert from "node:assert/strict";
import {
  products,
  priceFor,
  enquiryMessage,
} from "../dist/assets/js/catalogue.js";
import { business, contactLinks } from "../dist/assets/js/config.js";
const product = (id) => products.find((p) => p.id === id);
const selection = (size = "S", layers = 1, extra = {}) => ({
  size,
  layers,
  faina: false,
  removeBack: false,
  ...extra,
});
test("all 19 catalogue styles have unique slugs and complete measurement coverage", () => {
  assert.equal(products.length, 19);
  assert.equal(new Set(products.map((p) => p.slug)).size, 19);
  for (const p of products) {
    for (const s of p.sizes) assert.ok(p.measurements[s], `${p.id} ${s}`);
    assert.ok(p.startingPrice > 0);
  }
  assert.equal(
    products.some((p) => p.id === "faina"),
    false,
  );
});
test("source price anchors and Faina supplement calculate correctly", () => {
  assert.equal(priceFor(product("ferrari"), selection()).exact, 200);
  assert.equal(
    priceFor(product("ferrari"), selection("XXXL", 3, { faina: true })).exact,
    670,
  );
  assert.equal(priceFor(product("hareer"), selection("S", 2)).exact, 300);
  assert.equal(
    priceFor(product("malak"), selection("L", 1, { faina: true })).exact,
    650,
  );
  assert.equal(
    priceFor(product("yasmin-hijab"), selection("XL", 3)).exact,
    800,
  );
  assert.equal(
    priceFor(product("qaaroora"), selection("XL", 1, { faina: true })).exact,
    400,
  );
});
test("restrictions are encoded in data and uncertain prices stay quotes", () => {
  assert.deepEqual(product("urwa").rules.layers, [1, 2]);
  assert.equal(product("urwa").sizes.at(-1), "XL");
  for (const id of ["malak", "shawl-niqab"]) {
    assert.deepEqual(product(id).rules.layers, []);
    assert.equal(product(id).rules.removableBack, false);
  }
  assert.equal(product("qaaroora").rules.faina, false);
  assert.equal(product("qaaroora").rules.removableBack, false);
  for (const id of ["shamaama", "yasmin-niqab"])
    assert.equal(priceFor(product(id), selection("XXXL", 3)).exact, null);
  assert.equal(
    priceFor(
      product("ferrari"),
      selection("M", 2, { removeBack: true, faina: true }),
    ).exact,
    null,
  );
  assert.deepEqual(
    priceFor(product("butterfly-abaya"), selection()).range,
    [500, 1000],
  );
  assert.deepEqual(priceFor(product("jilbab"), selection()).range, [700, 1000]);
});
test("every offered deterministic size/layer combination has a valid price", () => {
  for (const p of products) {
    for (const size of p.sizes) {
      for (const layers of p.rules.layers.length ? p.rules.layers : [1]) {
        const result = priceFor(p, selection(size, layers));
        if (p.priceRange || p.confirmationSizes?.includes(size))
          assert.equal(result.exact, null);
        else
          assert.ok(
            Number.isFinite(result.exact) && result.exact >= p.startingPrice,
            `${p.id} ${size} ${layers}`,
          );
      }
    }
  }
});
test("enquiries preserve price, add-ons, special requests, and do not misstate removal", () => {
  const p = product("ferrari"),
    s = selection("M", 2, { faina: true });
  const msg = enquiryMessage(p, s, priceFor(p, s));
  assert.match(msg, /Ferrari/);
  assert.match(msg, /Medium/);
  assert.match(msg, /Back layers: 2/);
  assert.match(msg, /MVR 370/);
  const removed = { ...s, removeBack: true };
  const quote = enquiryMessage(p, removed, priceFor(p, removed));
  assert.match(quote, /remove/);
  assert.doesNotMatch(quote, /Back layers:/);
  assert.match(quote, /provide a quote/);
  const ab = product("butterfly-abaya");
  const options = selection("M", 1, {
    hood: "Without hood",
    length: "54",
    notes: "Adjust sleeve & cuff",
  });
  const am = enquiryMessage(ab, options, priceFor(ab, options));
  assert.match(am, /Without hood/);
  assert.match(am, /54 inches/);
  assert.match(am, /Adjust sleeve & cuff/);
});
test("contact links disable blank numbers and encode messages", (t) => {
  const originalWhatsApp = business.whatsappNumber;
  const originalViber = business.viberNumber;
  t.after(() => {
    business.whatsappNumber = originalWhatsApp;
    business.viberNumber = originalViber;
  });
  business.whatsappNumber = "";
  business.viberNumber = "";
  assert.deepEqual(contactLinks("hello"), { whatsapp: null, viber: null });
  business.whatsappNumber = "+960 000 0000";
  business.viberNumber = "+960 000 0000";
  const message = "Size: M\nFaina +50 & quote?";
  const links = contactLinks(message);
  assert.equal(new URL(links.whatsapp).searchParams.get("text"), message);
  assert.match(links.viber, /number=%2B9600000000/);
  business.whatsappNumber = "";
  business.viberNumber = "";
});

test("cap and nose string add MVR 10 each to every niqab", () => {
  for (const p of products.filter((p) => p.category === "niqabs")) {
    for (const size of p.sizes) {
      for (const layers of p.rules.layers.length ? p.rules.layers : [1]) {
        const base = priceFor(p, selection(size, layers));
        for (const cap of [false, true]) {
          for (const noseString of [false, true]) {
            for (const faina of [false, true]) {
              const s = selection(size, layers, { cap, noseString, faina });
              const price = priceFor(p, s);
              assert.equal(price.exact, base.exact === null ? null :
                base.exact + (cap ? 10 : 0) + (noseString ? 10 : 0) +
                (faina && p.rules.faina ? 50 : 0), `${p.id} ${size} ${layers}`);
              const message = enquiryMessage(p, s, price);
              assert.ok(message.includes(`Cap: ${cap ? "Yes (+MVR 10)" : "No"}`));
              assert.ok(message.includes(`Nose string: ${noseString ? "Yes (+MVR 10)" : "No"}`));
            }
          }
        }
      }
    }
    if (p.rules.removableBack) {
      const s = selection("S", 1, { cap: true, noseString: true, removeBack: true });
      assert.equal(priceFor(p, s).exact, null);
    }
  }
});

test("niqab add-ons do not affect other garments", () => {
  for (const p of products.filter((p) => p.category !== "niqabs")) {
    const s = selection("S", p.rules.layers[0] ?? 1);
    const extras = { ...s, cap: true, noseString: true };
    assert.deepEqual(priceFor(p, extras), priceFor(p, s));
    assert.doesNotMatch(enquiryMessage(p, extras, priceFor(p, extras)), /Cap:|Nose string:/);
  }
});
