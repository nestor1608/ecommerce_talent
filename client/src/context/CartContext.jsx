import { createContext, useState, useEffect } from 'react';
import { cartApi } from '../api/cartApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await cartApi.getCart();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const data = await cartApi.addToCart(productId, quantity);
            setCart(data);
            return data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const data = await cartApi.updateCartItem(productId, quantity);
            setCart(data);
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const data = await cartApi.removeFromCart(productId);
            setCart(data);
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await cartApi.clearCart();
            setCart({ items: [] });
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    };

    const getCartTotal = () => {
        return cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const getCartItemsCount = () => {
        return cart.items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemsCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
