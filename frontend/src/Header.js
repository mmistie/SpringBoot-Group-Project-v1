import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './App.css'; 

function Header() {
  const { cart } = useCart();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      return;
    }
  };

  return (
    <header className="header-container">
      <h1 className="store-title">My Online Store</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <button className="home-button" onClick={handleHomeClick}><Link to="/">Home</Link></button>
          </li>
          <li><Link to="/checkout" className="checkout-link">Checkout</Link></li>
        </ul>
      </nav>
      <div className="cart-info">
        <span>Cart ({cart.length})</span>
        <Link to="/checkout">
          <button className="place-order-button">Place Order</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
