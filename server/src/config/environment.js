import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    emailConfig: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    nodeEnv: process.env.NODE_ENV || 'development',
};
