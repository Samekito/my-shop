"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the Fake Store API
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page animate-fade-in">
      <div className="header-section">
        <h1>Welcome to MyShop</h1>
        <p className="subtitle">Find your perfect style today</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field search-input"
          />
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Loading products for you...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} priority />
          ))}
        </div>
      )}

    </div>
  );
}
