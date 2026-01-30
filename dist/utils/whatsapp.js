export const generateWhatsAppLink = (phone, message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
};
//# sourceMappingURL=whatsapp.js.map