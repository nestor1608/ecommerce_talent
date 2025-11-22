import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { processPayment } from '../services/paymentService.js';
import { sendEmail } from '../services/emailService.js';

// @desc    Create new order
// @route   POST /api/orders/create
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Get cart
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total and prepare items
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = item.productId;

            // Check stock
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}`
                });
            }

            totalAmount += item.price * item.quantity;
            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: item.quantity,
                price: item.price,
            });
        }

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Process payment
// @route   POST /api/orders/payment
// @access  Private
export const processOrderPayment = async (req, res) => {
    try {
        const { orderId, paymentMethodId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Process payment with Stripe
        const paymentIntent = await processPayment({
            amount: order.totalAmount,
            paymentMethodId,
            orderId: order._id,
        });

        if (paymentIntent.status === 'succeeded') {
            order.paymentStatus = 'paid';
            order.orderStatus = 'processing';
            order.paymentIntentId = paymentIntent.id;
            await order.save();

            // Update product stock
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.quantity },
                });
            }

            // Clear cart
            await Cart.findOneAndUpdate(
                { userId: req.user._id },
                { items: [] }
            );

            // Send confirmation email
            await sendEmail({
                to: req.user.email,
                subject: 'Order Confirmation',
                text: `Your order #${order._id} has been confirmed!`,
            });

            res.json({ message: 'Payment successful', order });
        } else {
            order.paymentStatus = 'failed';
            await order.save();
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'name email');

        if (order) {
            // Check if user owns the order or is admin
            if (order.userId._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/user/:userId
// @access  Private
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
