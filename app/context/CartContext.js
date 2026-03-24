"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("myshop-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myshop-cart", JSON.stringify(cart));
  }, [cart]);

  // Add Product to Cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity if it exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add new item if it doesn't exist
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  // Remove completely from Cart
  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Update quantity directly (e.g. from cart page inputs)
  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);
  
  // Clear the Cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate Cart Total Price
  const cartTotal = useMemo(() => cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ), [cart]);

  // Calculate Total Number of Items
  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  return useContext(CartContext);
}
