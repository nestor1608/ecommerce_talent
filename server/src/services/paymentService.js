import Stripe from 'stripe';
import { config } from '../config/environment.js';

const stripe = new Stripe(config.stripeSecretKey);

// Process payment with Stripe
export const processPayment = async ({ amount, paymentMethodId, orderId }) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            metadata: {
                orderId: orderId.toString(),
            },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        return paymentIntent;
    } catch (error) {
        console.error('Payment error:', error);
        throw error;
    }
};

// Create payment intent
export const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
        });

        return paymentIntent;
    } catch (error) {
        console.error('Payment intent error:', error);
        throw error;
    }
};

// Refund payment
export const refundPayment = async (paymentIntentId) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
        });

        return refund;
    } catch (error) {
        console.error('Refund error:', error);
        throw error;
    }
};
