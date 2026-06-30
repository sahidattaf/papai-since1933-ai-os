export function buildWhatsAppLink(phone: string, message: string) {
  const normalizedPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
