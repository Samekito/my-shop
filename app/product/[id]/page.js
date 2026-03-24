// Server Component — required for generateStaticParams with output: export
import PropTypes from "prop-types";
import ProductDetailClient from "./ProductDetailClient";

/**
 * generateStaticParams tells Next.js which product IDs to pre-render
 * at build time when using `output: 'export'`. It fetches all products
 * from the Fake Store API and maps their IDs to the required format.
 */
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products.map((product) => ({ id: String(product.id) }));
}

// Delegate all client-side rendering to the client component
export default function ProductDetail({ params }) {
  return <ProductDetailClient id={params.id} />;
}

ProductDetail.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
