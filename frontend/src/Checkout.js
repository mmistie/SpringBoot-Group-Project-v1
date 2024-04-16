import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

function Checkout() {
  const { cart, clearCart } = useCart();
  const [error, setError] = useState(null);

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
      clearCart(); // Clear the cart after placing the order
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
    <div>
      <h1>Checkout</h1>
      {error && <div>{error}</div>}
      <div>
        <h2>Cart Items</h2>
        <ul>
          {cart.map((product, index) => (
            <li key={index}>{product.name} - Quantity: {product.quantity}</li>
          ))}
        </ul>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;
