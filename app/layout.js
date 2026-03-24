import "./globals.css";
import PropTypes from "prop-types";
import { Inter } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyShop",
  description: "A beginner-friendly Next.js E-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="container" style={{ paddingBottom: "4rem" }}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
