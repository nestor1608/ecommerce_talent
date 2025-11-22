import api from './index.js';

export const ordersApi = {
    // Create new order
    createOrder: async (orderData) => {
        const response = await api.post('/orders/create', orderData);
        return response.data;
    },

    // Process payment
    processPayment: async (orderId, paymentMethodId) => {
        const response = await api.post('/orders/payment', { orderId, paymentMethodId });
        return response.data;
    },

    // Get order by ID
    getOrder: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Get user orders
    getUserOrders: async (userId) => {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}/status`, { orderStatus: status });
        return response.data;
    },
};
