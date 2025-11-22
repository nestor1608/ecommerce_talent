import nodemailer from 'nodemailer';
import { config } from '../config/environment.js';

// Create transporter
const transporter = nodemailer.createTransport({
    host: config.emailConfig.host,
    port: config.emailConfig.port,
    secure: false,
    auth: {
        user: config.emailConfig.user,
        pass: config.emailConfig.pass,
    },
});

// Send email function
export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: `"E-commerce" <${config.emailConfig.user}>`,
            to,
            subject,
            text,
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};
