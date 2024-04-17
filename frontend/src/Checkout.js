import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './App.css'; // Import your CSS file for styling

function Checkout() {
  const { cart, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        setError('No items in the cart. Please add items before placing an order.');
        return;
      }

      const orderData = {
        orderDate: new Date(),
        totalPrice: calculateTotalPrice(cart),
        orderItems: cart
      };

      const response = await axios.post('http://localhost:8081/orders', orderData);
      console.log('Order placed:', response.data);
      clearCart();
      setOrderPlaced(true); // Set orderPlaced to true after successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {error && <div className="error">{error}</div>}
      {orderPlaced ? (
        <div className="order-placed">Thank you for your order! It has been placed successfully.</div>
      ) : (
        <div className="checkout-details">
          <div>
            <h2>Cart Items</h2>
            <ul>
              {cart.map((product, index) => (
                <li key={index}>{product.name} - Quantity: {product.quantity}</li>
              ))}
            </ul>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
