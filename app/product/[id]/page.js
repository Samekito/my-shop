// Server Component — required for generateStaticParams with output: export
import PropTypes from "prop-types";
import ProductDetailClient from "./ProductDetailClient";

// Fallback list of all valid Fake Store API product IDs (1–20).
// Used when the live API fetch fails during the CI/CD build.
const FALLBACK_IDS = Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));

/**
 * generateStaticParams tells Next.js which product IDs to pre-render
 * at build time when using `output: 'export'`. It tries to fetch all
 * products from the Fake Store API and falls back to hardcoded IDs if
 * the API is unreachable (e.g. in GitHub Actions CI).
 */
export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      // Don't cache during build — we want fresh data if available
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Fake Store API returned ${res.status}. Using fallback IDs.`);
      return FALLBACK_IDS;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn("Fake Store API did not return JSON. Using fallback IDs.");
      return FALLBACK_IDS;
    }

    const products = await res.json();
    return products.map((product) => ({ id: String(product.id) }));
  } catch (err) {
    console.warn("Failed to fetch product list for static params:", err.message);
    return FALLBACK_IDS;
  }
}

// Delegate all client-side rendering to the client component
export default async function ProductDetail({ params }) {
  // In Next.js 15+, dynamic route params must be awaited
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}

ProductDetail.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
