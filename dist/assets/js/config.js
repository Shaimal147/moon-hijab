// Add real contact details here. International format: +960 followed by number.
// Leave blank to keep contact actions disabled instead of contacting a wrong number.
export const business = {
  name: "Moon Hijab",
  whatsappNumber: "",
  viberNumber: "",
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
