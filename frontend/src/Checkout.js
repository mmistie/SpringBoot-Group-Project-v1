import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './App.css'; 

function Checkout() {
  const { cart, clearCart, removeFromCart } = useCart();
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quantities, setQuantities] = useState({});

  const TAX_RATE = 0.13; // 13% tax rate

  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        setError('No items in the cart. Please add items before placing an order.');
        return;
      }

      const orderItems = cart.map(product => ({
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageId: product.imageId
        },
        quantity: quantities[product.id] || product.quantity
      }));

      const orderData = {
        orderDate: new Date(),
        totalPrice: calculateTotalPrice(cart),
        orderItems: orderItems
      };

      const response = await axios.post('http://localhost:8081/orders', orderData);
      console.log('Order placed:', response.data);
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, product) => total + ((quantities[product.id] || product.quantity) * product.price), 0);
  };

  const calculateTax = (totalPrice) => {
    return totalPrice * TAX_RATE;
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
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
                <li key={index} className="cart-item">
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, (quantities[product.id] || product.quantity) - 1)}>-</button>
                      <span>{quantities[product.id] || product.quantity}</span>
                      <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, (quantities[product.id] || product.quantity) + 1)}>+</button>
                    </div>
                  </div>
                  <div className="price">Price: ${product.price.toFixed(2)}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="totals">
            <div className="subtotal">Subtotal: ${calculateTotalPrice(cart).toFixed(2)}</div>
            <div className="tax">Tax (13%): ${calculateTax(calculateTotalPrice(cart)).toFixed(2)}</div>
            <div className="total">Total: ${(calculateTotalPrice(cart) + calculateTax(calculateTotalPrice(cart))).toFixed(2)}</div>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
