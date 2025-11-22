import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

        if (cart) {
            res.json(cart);
        } else {
            res.json({ userId: req.user._id, items: [] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists and has enough stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            // Create new cart
            cart = await Cart.create({
                userId: req.user._id,
                items: [{
                    productId,
                    quantity,
                    price: product.price,
                }],
            });
        } else {
            // Check if item already exists in cart
            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                // Update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item
                cart.items.push({
                    productId,
                    quantity,
                    price: product.price,
                });
            }
            await cart.save();
        }

        const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === req.params.productId
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            await cart.save();
            const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== req.params.productId
        );

        await cart.save();
        const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (cart) {
            cart.items = [];
            await cart.save();
            res.json({ message: 'Cart cleared' });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
