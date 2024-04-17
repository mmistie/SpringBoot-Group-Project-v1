import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Apply loading style
  }

  if (error) {
    return <div className="error">{error}</div>; // Apply error style
  }

  return (
    <div className="product-detail">
      {product && (
        <>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">Description: {product.description}</p>
          <img className="product-image" src={`http://localhost:8088/images/${id}`} alt={product.name} />
        </>
      )}
    </div>
  );
}

export default ProductDetail;
