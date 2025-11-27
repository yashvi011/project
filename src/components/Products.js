import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Products({ addToCart, toggleLike, likedProducts, products, currentUser }) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="products-page">
      <h2>Our Products</h2>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('Makeup')} className={filter === 'Makeup' ? 'active' : ''}>Makeup</button>
          <button onClick={() => setFilter('Skincare')} className={filter === 'Skincare' ? 'active' : ''}>Skincare</button>
          <button onClick={() => setFilter('Fragrance')} className={filter === 'Fragrance' ? 'active' : ''}>Fragrance</button>
          <button onClick={() => setFilter('Hair Care')} className={filter === 'Hair Care' ? 'active' : ''}>Hair Care</button>
        </div>
      </div>
      <div className="product-grid">
        {searchedProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
            </Link>
            <div className="product-actions">
              <button
                className={`like-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!currentUser) {
                    alert('Please login to like products');
                    return;
                  }
                  toggleLike(product.id);
                }}
              >
                {likedProducts.includes(product.id) ? '❤️' : '♡'}
              </button>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (!currentUser) {
                    alert('Please login to add items to cart');
                    return;
                  }
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
