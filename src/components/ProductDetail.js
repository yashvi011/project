import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail({ products, addToCart, toggleLike, likedProducts, currentUser }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  if (!product) {
    return <div className="product-detail-page"><h2>Product not found</h2></div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">
            Discover the beauty of {product.name}. This premium product is designed to enhance your natural beauty with high-quality ingredients and expert formulation.
          </p>
          <div className="product-actions">
            <button
              className="like-btn"
              onClick={() => {
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
              onClick={() => {
                if (!currentUser) {
                  alert('Please login to add items to cart');
                  return;
                }
                let productToAdd = { ...product };
                if (discountApplied && discountedPrice) {
                  productToAdd.discountedPrice = discountedPrice;
                  productToAdd.discountExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
                }
                addToCart(productToAdd);
                setDiscountCode('');
                setDiscountApplied(false);
                setDiscountedPrice(null);
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="discount-section">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
            />
            <button
              className="apply-discount-btn"
              onClick={() => {
                if (discountCode === 'DISCOUNT10') {
                  const discount = product.price * 0.1;
                  setDiscountedPrice(product.price - discount);
                  setDiscountApplied(true);
                  alert('Discount applied! 10% off for 1 hour.');
                } else {
                  alert('Invalid discount code.');
                  setDiscountApplied(false);
                  setDiscountedPrice(null);
                }
              }}
            >
              Apply
            </button>
            {discountApplied && discountedPrice && (
              <p className="discounted-price">Discounted Price: ${discountedPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
      <div className="product-feedback-section">
        <button
          className="feedback-toggle-btn"
          onClick={() => {
            if (!currentUser) {
              alert('Please login to provide feedback');
              return;
            }
            setShowFeedback(!showFeedback);
          }}
        >
          {showFeedback ? 'Hide Feedback' : 'Leave Feedback'}
        </button>
        {showFeedback && (
          <div className="feedback-form">
            <h3>Share Your Experience</h3>
            <div className="rating-input">
              <label>Rating:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star ${rating >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="feedback-input">
              <label>Your Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with this product..."
                rows="4"
              />
            </div>
            <button
              className="submit-feedback-btn"
              onClick={() => {
                if (!feedback.trim()) {
                  alert('Please enter your feedback');
                  return;
                }
                // Here you would typically send the feedback to your backend
                const newFeedback = {
                  id: Date.now(),
                  productId: product.id,
                  productName: product.name,
                  userId: currentUser.id,
                  username: currentUser.username,
                  rating: rating,
                  feedback: feedback,
                  date: new Date().toISOString()
                };

                // Get existing feedbacks from localStorage
                const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
                existingFeedbacks.push(newFeedback);
                localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks));

                alert(`Thank you for your ${rating}-star feedback!`);
                setFeedback('');
                setRating(5);
                setShowFeedback(false);
              }}
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
