# Moon Hijab — Phase 1

Static HTML5, local Bootstrap 5.3.3, and vanilla JavaScript ES modules. No backend, database, authentication, cart, checkout, courses or dashboard. The deployable website is `dist/`; upload its contents to any static host. Serve over HTTP, not by double-clicking HTML files (browser ES modules require a server).

## Pages

- `dist/index.html`: Home
- `dist/products.html`: Category filters and product-name search
- `dist/product.html?id=ferrari`: Reusable product page (ID comes from catalogue)
- `dist/size-guide.html?product=ferrari`: Product-specific measurements
- `dist/contact.html`: Direct enquiries
- `dist/404.html`: Missing-page fallback

## Fill in before customer launch

1. In `dist/assets/js/config.js`, replace the dummy `+9600000000` values for `whatsappNumber` and `viberNumber` with the real numbers in international format. These settings power both the bottom-right floating chat icons on every page and the contact/product enquiry links. The icons stay visible while scrolling. Blank numbers disable the corresponding contact actions. Add address/hours only if desired.
2. Put photos in `dist/assets/images/`. In each product's `images` array in `dist/assets/js/catalogue.js`, add `{src:'assets/images/ferrari-front.jpg',alt:'Front view of the Ferrari niqab'}` objects. The first is the card image, additional images become gallery thumbnails. Use consistent 3:4 portraits. Empty arrays render honest text placeholders; failed photos also fall back to placeholders.
3. Set `logo` and `heroImage` in config to your image paths. Without a logo, the business name uses a typographic wordmark. No pretend product photography, icon or logo has been generated. Add a favicon to the HTML head when ready.
4. Confirm Shamaama and Yasmin Niqab XXXL prices. The rough source's final pricing rows repeat XXL. Their likely intended XXXL figures are 500/600/700 MVR, but this implementation deliberately leaves XXXL prices null and requests a quote. Shamaama XXXL width is also left null due to the repeated size label. Correct the values and remove the corresponding `confirmationSizes`/`confirmationNote` after confirmation.
5. Confirm the price policy for back-veil removal: it currently always requests a quote because no price is supplied. Faina is +50 where supported, but no exact total is claimed for removal. Qaaroora has no customization controls; Malak and Shawl Niqab have no separate back veil to remove.
6. Verify the Viber link on the customer's intended mobile devices after adding the real number. It uses `viber://chat?number=%2B...`; ordinary phone chats do not have a reliable prefilled-message contract here. The visible copy-message fallback preserves all selected details. No enquiry is sent automatically.

## Product facts and editing

All 19 products, prices, measurements and customization rules live in `catalogue.js`. Faina is an add-on, never a separate product. Standard niqab defaults are separate from product overrides. Generic renderer code never branches on product names. Non-niqab colours, fabrics, delivery times and stock quantities were not supplied and have not been invented. Descriptions with missing source prose are short descriptions of the known garment type/measurements.

Ferrari/Hareer price and measurement groups are intentionally reused according to the source. Shamaama and Yasmin share lengths and prices, but Yasmin does not inherit width since the source says length only. Qaaroora uses Shamaama's confirmed one-layer prices. Huzaima XXXL back length is 51 inches as supplied. Abaya ranges and Jilbab ranges are quotations, not exact calculated totals. Butterfly Abaya length choices are constrained by size.

`app.js` handles presentation and contact state; `catalogue.js` exports pure price/message functions. A future backend can replace the data-loading boundary while retaining the HTML layout and product renderer. Bootstrap controls layout and components; `brand.css` only refines typography, colours, image ratios and component appearance. Bootstrap is vendored so customers do not need a CDN connection. Its upstream MIT license header is preserved.

## Validation

Run `npm test` for pricing, restrictions, source anchors and enquiry encoding tests. Static pages need no build step. The optional `create-pages.py` regenerates the authored HTML shells; if editing HTML directly, update the generator too or remove it to avoid overwriting later edits.
