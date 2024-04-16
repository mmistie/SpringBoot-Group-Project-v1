import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import ProductList from './Productlist'; 
import ProductDetail from './ProductDetail'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </nav>
        </header>
        <h1>Welcome to Our Ecommerce Website</h1>
        <Routes>
          {/* Render ProductList component when the path is exact '/' */}
          <Route exact path="/" element={<ProductList />} />

          {/* Render ProductDetail component when the path matches '/products/:id' */}
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
