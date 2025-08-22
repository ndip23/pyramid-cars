// src/context/CartContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { setGlobalLogout } from '../utils/axiosConfig.js';

const CartContext = createContext();

const getInitialState = (key) => {
    if (typeof window !== 'undefined') {
        const savedItem = localStorage.getItem(key);
        return savedItem ? JSON.parse(savedItem) : null;
    }
    return null;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialState('shoppingCart') || []);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(getInitialState('user'));

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setCartItems([]);
    };

    useEffect(() => {
        setGlobalLogout(logout);
    }, []);

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const login = (userData, userToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        setUser(userData);
        setToken(userToken);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        toast.success(`${product.name} added to cart!`);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const itemToRemove = prevItems.find(item => item._id === productId);
            if (itemToRemove) {
                 toast.error(`${itemToRemove.name} removed from cart.`);
            }
            return prevItems.filter(item => item._id !== productId);
        });
    };

    const updateQuantity = (productId, quantity) => {
        const numQuantity = parseInt(quantity);
        if (numQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity: numQuantity } : item
            )
        );
    };
    
    const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        user,
        token,
        login,
        logout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};