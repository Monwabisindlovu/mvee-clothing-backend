// Sends a WhatsApp message using Meta Graph API
// export const sendWhatsAppMessage = async ({ to, body }: WhatsAppMessage) => {
//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v17.0/${env.WHATSAPP_PHONE_ID}/messages`,
//       {
//         messaging_product: 'whatsapp',
//         to,
//         text: { body },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('WhatsApp send failed:', error);
//     throw new Error('Failed to send WhatsApp message');
//   }
// };
// Generates a WhatsApp link that can be opened in a browser
export const generateWhatsAppLink = (phone, message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
};
