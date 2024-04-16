import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ProductList from './Productlist'; 
import ProductDetail from './ProductDetail'; 
import Header from './Header'; 
import Checkout from './Checkout'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header component */}
        <Header />

        <Routes>
          {/* Render ProductList component when the path is exact '/' */}
          <Route exact path="/" element={<ProductList />} />

          {/* Render ProductDetail component when the path matches '/products/:id' */}
          <Route path="/products/:id" element={<ProductDetail/>} />

          {/* Add route for the Checkout component */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
