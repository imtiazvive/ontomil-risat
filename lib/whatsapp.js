const defaultWhatsAppNumber = "8801537364363";

export function getWhatsAppUrl(message) {
  const phone = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultWhatsAppNumber
  ).replace(/\D/g, "");

  if (phone.length < 8 || phone.length > 15) return null;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
