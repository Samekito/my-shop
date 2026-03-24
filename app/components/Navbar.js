"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo">
          MyShop
        </Link>
        
        <Link href="/cart" className="cart-link">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>

    </nav>
  );
}
