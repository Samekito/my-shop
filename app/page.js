"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    // Fetch products from the local JSON
    const fetchProducts = async () => {
      try {
        const basePath = typeof window !== 'undefined' && window.location.pathname.startsWith('/my-shop') ? '/my-shop' : '';
        const res = await fetch(`${basePath}/data/products.json`);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
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

      {!loading && !error && displayedProducts.length > 0 && (
        <>
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} priority />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button 
                className="btn" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="btn btn-primary" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}
