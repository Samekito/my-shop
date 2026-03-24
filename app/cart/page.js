"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart animate-fade-in">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <Link href="/" className="btn btn-primary mt-4">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image-wrapper">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="item-image"
                  unoptimized
                  priority
                />
              </div>

              <div className="item-details">
                <Link href={`/product/${item.id}`} className="item-title">
                  {item.title}
                </Link>
                <div className="item-price">${item.price.toFixed(2)}</div>
              </div>

              <div className="item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>

    </div>
  );
}
