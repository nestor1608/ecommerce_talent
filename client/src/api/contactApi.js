import api from './index.js';

export const contactApi = {
    // Submit contact form
    submitContact: async (contactData) => {
        const response = await api.post('/contact', contactData);
        return response.data;
    },

    // Get all messages (admin)
    getMessages: async () => {
        const response = await api.get('/contact/messages');
        return response.data;
    },

    // Update message status (admin)
    updateMessageStatus: async (id, status) => {
        const response = await api.put(`/contact/${id}/status`, { status });
        return response.data;
    },
};
