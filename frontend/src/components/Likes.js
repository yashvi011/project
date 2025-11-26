import React from 'react';
import './Likes.css';

function Likes({ likedProducts, onLike, onAddToCart, user }) {
  return (
    <div className="likes-page">
      <h2>My Liked Products</h2>
      {user ? (
        likedProducts.length === 0 ? (
          <p>You haven't liked any products yet.</p>
        ) : (
          <div className="products-grid">
            {likedProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="category">{product.category}</p>
                <div className="product-actions">
                  <button
                    className={`like-btn ${likedProducts.some(p => p.id === product.id) ? 'liked' : ''}`}
                    onClick={() => {
                      if (!user) {
                        alert('Please login to like products');
                        return;
                      }
                      onLike(product.id);
                    }}
                  >
                    {likedProducts.some(p => p.id === product.id) ? '❤️' : '♡'}
                  </button>
                  <button className="add-to-cart-btn" onClick={() => {
                    if (!user) {
                      alert('Please login to add items to cart');
                      return;
                    }
                    onAddToCart(product);
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <p>Please login to view your liked products.</p>
      )}
    </div>
  );
}

export default Likes;
