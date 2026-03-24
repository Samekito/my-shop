"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, priority = false }) {
  const { addToCart } = useCart();

  return (
    <div className="card animate-fade-in">
      <Link href={`/product/${product.id}`} className="image-container">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="product-image"
          unoptimized
          priority={priority}
        />
      </Link>
      
      <div className="card-body">
        <Link href={`/product/${product.id}`}>
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>
        </Link>
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <button 
          onClick={() => addToCart(product)} 
          className="btn btn-primary mt-auto"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  priority: PropTypes.bool,
};
