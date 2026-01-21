import axios from 'axios';
import { env } from '../config/env.js';
export const sendWhatsAppMessage = async ({ to, body }) => {
    try {
        const response = await axios.post(`https://graph.facebook.com/v17.0/${env.WHATSAPP_PHONE_ID}/messages`, {
            messaging_product: 'whatsapp',
            to,
            text: { body },
        }, {
            headers: {
                Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('WhatsApp send failed:', error);
        throw new Error('Failed to send WhatsApp message');
    }
};
