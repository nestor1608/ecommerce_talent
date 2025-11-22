// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
    return password.length >= 6;
};

// Required field validation
export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

// Form validation
export const validateForm = (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !validateRequired(value)) {
            errors[field] = `${field} is required`;
        }

        if (fieldRules.email && value && !validateEmail(value)) {
            errors[field] = 'Invalid email format';
        }

        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[field] = `Minimum ${fieldRules.minLength} characters required`;
        }

        if (fieldRules.custom && value) {
            const customError = fieldRules.custom(value);
            if (customError) {
                errors[field] = customError;
            }
        }
    });

    return errors;
};
