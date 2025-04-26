import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../utils/constants';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Fetch cart on mount and when user changes
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], total: 0 });
        }
    }, [user]);

    const getConfig = () => ({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
        }
    });

    const handleError = (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        setError(message);
        console.error('Cart operation failed:', error);
        return { success: false, error: message };
    };

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${API_BASE_URL}/api/cart`, getConfig());
            setCart(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            return handleError(new Error('Please login to add items to cart'));
        }

        try {
            setLoading(true);
            setError(null);
            
            const { data } = await axios.post(
                `${API_BASE_URL}/api/cart`,
                { productId, quantity },
                getConfig()
            );
            
            setCart(data);
            return { success: true };
        } catch (error) {
            return handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        if (!user) {
            return handleError(new Error('Please login to update cart'));
        }

        try {
            setLoading(true);
            setError(null);
            
            const { data } = await axios.put(
                `${API_BASE_URL}/api/cart`,
                { productId, quantity },
                getConfig()
            );
            
            setCart(data);
            return { success: true };
        } catch (error) {
            return handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        if (!user) {
            return handleError(new Error('Please login to remove items'));
        }

        try {
            setLoading(true);
            setError(null);
            
            const { data } = await axios.delete(
                `${API_BASE_URL}/api/cart/${productId}`,
                getConfig()
            );
            
            setCart(data);
            return { success: true };
        } catch (error) {
            return handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!user) {
            return handleError(new Error('Please login to clear cart'));
        }

        try {
            setLoading(true);
            setError(null);
            
            const { data } = await axios.delete(
                `${API_BASE_URL}/api/cart`,
                getConfig()
            );
            
            setCart(data);
            return { success: true };
        } catch (error) {
            return handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext; 