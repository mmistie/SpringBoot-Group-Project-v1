import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './App.css'; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <img src={`http://localhost:8088/images/${product.imageId}`} alt={product.name} className="product-image" />
              <div className="product-info">
                <a className="product-name" href={`/products/${product.id}`}>{product.name}</a>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}>-</button>
                  <input className="quantity-input" type="number" value={quantities[product.id] || 1} onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))} />
                  <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}>+</button>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
