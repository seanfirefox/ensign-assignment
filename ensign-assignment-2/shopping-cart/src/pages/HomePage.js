import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
            />
            <h2>{product.title}</h2>
            <p>{product.description.substring(0, 50)}...</p>
            <div className="flex justify-between items-center">
              <p className="price">${product.price}</p>
              <Link to={`/product/${product.id}`} className="link">Shop Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
