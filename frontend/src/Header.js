import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

function Header() {
  const { cart } = useCart();
  const location = useLocation();

  const handleHomeClick = () => {
    // Check if the current location is already the home page
    if (location.pathname === '/') {
      // If already on the home page, do nothing
      return;
    }
  };

  return (
    <header>
      <h1>My Online Store</h1>
      <nav>
        <ul>
          {/* Use a button for Home link */}
          <li>
            {/* Add onClick event to handle Home click */}
            <button onClick={handleHomeClick}><Link to="/">Home</Link></button>
          </li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
      </nav>
      <div>
        <span>Cart ({cart.length})</span>
        <Link to="/checkout">
          <button>Place Order</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
