import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';

// Generate JWT token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwtSecret, {
        expiresIn: config.jwtExpire,
    });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};

// Decode token without verification
export const decodeToken = (token) => {
    return jwt.decode(token);
};
