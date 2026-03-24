"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="success-page animate-fade-in">
        <div className="success-icon">🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping at MyShop. Your items will be shipped soon.</p>
        <button 
          onClick={() => router.push("/")}
          className="btn btn-primary"
          style={{ marginTop: "2rem" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-redirect" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h2>Your Cart is Empty</h2>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page animate-fade-in">
      <h1 className="page-title">Secure Checkout</h1>

      <div className="checkout-container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                id="name"
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input 
                id="address"
                required 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                  id="city"
                  required 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input 
                  id="zip"
                  required 
                  type="text" 
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="input-field" 
                />
              </div>
            </div>

            <h2 className="mt-8">Payment Details</h2>
            
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input 
                id="cardName"
                required 
                type="text" 
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input 
                id="cardNumber"
                required 
                type="text" 
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input 
                  id="expiry"
                  required 
                  type="text" 
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="input-field" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input 
                  id="cvv"
                  required 
                  type="text" 
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="input-field" 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Place Order (${cartTotal.toFixed(2)})
            </button>
          </form>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          <div className="items-list">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">{item.title}</span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
