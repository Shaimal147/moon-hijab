// Replace the dummy +9600000000 numbers before launch. Use international format.
// Leave blank to keep contact actions disabled instead of contacting a wrong number.
export const business = {
  name: "Moon Hijab",
  whatsappNumber: "+9600000000",
  viberNumber: "+9600000000",
  address: "",
  hours: "",
  logo: "", // e.g. assets/images/logo.png
  heroImage: "", // e.g. assets/images/home.jpg
};
export function contactLinks(message) {
  const wa = business.whatsappNumber.replace(/\D/g, "");
  const vb = business.viberNumber.replace(/\D/g, "");
  return {
    whatsapp: wa
      ? `https://wa.me/${wa}?text=${encodeURIComponent(message)}`
      : null,
    viber: vb ? `viber://chat?number=${encodeURIComponent("+" + vb)}` : null,
  };
}
