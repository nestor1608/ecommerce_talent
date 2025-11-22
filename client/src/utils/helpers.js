// Get error message from error object
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.message) {
        return error.message;
    }
    return 'An unexpected error occurred';
};

// Scroll to top
export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Get user from localStorage
export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
