import api from './index.js';

export const aboutApi = {
    // Get about content
    getAbout: async () => {
        const response = await api.get('/about');
        return response.data;
    },

    // Update about content (admin)
    updateAbout: async (aboutData) => {
        const response = await api.put('/about', aboutData);
        return response.data;
    },
};
