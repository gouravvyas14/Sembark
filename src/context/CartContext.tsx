import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../services/api';
import Toast from '../components/Toast';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Bonus: Initialize from localStorage 
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('sembark_cart');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist whenever cart changes
    useEffect(() => {
        localStorage.setItem('sembark_cart', JSON.stringify(cart));
    }, [cart]);

    // Toast state for brief notifications
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastVisible, setToastVisible] = useState<boolean>(false);

    const showToast = (msg: string, duration = 4000) => {
        setToastMessage(msg);
        setToastVisible(true);
        window.setTimeout(() => setToastVisible(false), duration);
    };

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // Show a toast notification with product title
        try {
            showToast(`${product.title} added to cart successfully`);
        } catch (e) {
            // ignore
        }
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    // Derived state for easy access
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
            {children}
            <Toast message={toastMessage} visible={toastVisible} />
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};