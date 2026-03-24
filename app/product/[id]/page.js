"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext";

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch specific product by ID
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        if (!res.ok) throw new Error("Failed to load product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} ${product.title} added to cart!`);
    }
  };

  if (loading) return <div className="status-msg">Loading product details...</div>;
  if (error) return <div className="status-msg error">Error: {error}</div>;
  if (!product) return <div className="status-msg">Product not found</div>;

  return (
    <div className="product-detail-page animate-fade-in">
      <Link href="/" className="back-link">
        &larr; Back to Shop
      </Link>
      
      <div className="detail-container">
        <div className="image-section">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="detail-image"
            unoptimized
            priority
          />
        </div>
        
        <div className="info-section">
          <div className="category-badge">{product.category}</div>
          <h1 className="title">{product.title}</h1>
          
          <div className="rating">
            ⭐ {product.rating?.rate} / 5 ({product.rating?.count} reviews)
          </div>
          
          <div className="price">${product.price?.toFixed(2)}</div>
          
          <p className="description">{product.description}</p>
          
          <div className="action-section">
            <div className="quantity-selector">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
            
            <button className="btn btn-primary add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

ProductDetail.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
