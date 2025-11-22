// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Product categories
export const CATEGORIES = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Beauty',
    'Food',
];

// Order statuses
export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

// Payment statuses
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
};

// Sort options
export const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

// Order statuses array
export const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

// Payment statuses array
export const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

// Contact message statuses
export const CONTACT_STATUSES = ['pending', 'in-progress', 'resolved'];

