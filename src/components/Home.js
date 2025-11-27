import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Beauty Beats</h2>
          <p>Discover the latest in beauty and wellness products</p>
          <p>Beauty Beats is your ultimate destination for premium beauty and wellness products. We believe that everyone deserves to feel confident and beautiful in their own skin.</p>
          <Link to="/products" className="cta-btn">Shop Now</Link>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop" alt="Beauty products" />
        </div>
      </section>
      <section className="features">
        <div className="feature">
          <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop" alt="Premium Quality" />
          <h3>Premium Quality</h3>
          <p>Only the best products for your beauty routine</p>
        </div>
        <div className="feature">
          <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=200&fit=crop" alt="Expert Advice" />
          <h3>Expert Advice</h3>
          <p>Get tips from beauty professionals</p>
        </div>
        <div className="feature">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop" alt="Fast Delivery" />
          <h3>Fast Delivery</h3>
          <p>Quick and reliable shipping worldwide</p>
        </div>
      </section>
      <section className="gallery">
        <h2>Our Beauty Collection</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop" alt="Lipstick Collection" />
            <h4>Lipstick Collection</h4>
            <p>Rich, vibrant colors for every occasion</p>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop" alt="Foundation Range" />
            <h4>Foundation Range</h4>
            <p>Perfect coverage for all skin types</p>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop" alt="Skincare Essentials" />
            <h4>Skincare Essentials</h4>
            <p>Nourish and rejuvenate your skin</p>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop" alt="Fragrance Collection" />
            <h4>Fragrance Collection</h4>
            <p>Signature scents to make you feel amazing</p>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop" alt="Makeup Brushes" />
            <h4>Makeup Brushes</h4>
            <p>Professional tools for flawless application</p>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop" alt="Hair Care Products" />
            <h4>Hair Care Products</h4>
            <p>Healthy, beautiful hair starts here</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Customer 1" />
            <p>"Beauty Beats has transformed my skincare routine. The products are amazing!"</p>
            <cite>- Sarah Johnson</cite>
            <div className="rating">★★★★★</div>
          </div>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Customer 2" />
            <p>"Fast delivery and excellent customer service. Highly recommend!"</p>
            <cite>- Michael Chen</cite>
            <div className="rating">★★★★★</div>
          </div>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Customer 3" />
            <p>"The quality of their makeup products is unmatched. Love shopping here!"</p>
            <cite>- Emily Davis</cite>
            <div className="rating">★★★★★</div>
          </div>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Customer 4" />
            <p>"Their membership program is fantastic! I've saved so much on premium products."</p>
            <cite>- David Wilson</cite>
            <div className="rating">★★★★★</div>
          </div>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" alt="Customer 5" />
            <p>"The fragrance collection is divine. Each scent tells a story. Pure luxury!"</p>
            <cite>- Lisa Rodriguez</cite>
            <div className="rating">★★★★★</div>
          </div>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="Customer 6" />
            <p>"Professional-grade hair care products that actually work. My hair has never looked better!"</p>
            <cite>- James Thompson</cite>
            <div className="rating">★★★★★</div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to Glow?</h2>
        <p>Join thousands of satisfied customers and discover your beauty potential</p>
        <div className="membership-offer">
          <p className="offer-text">Special Membership Offer: Get 20% off your first purchase + free shipping!</p>
        </div>
        <Link to="/register" className="cta-btn">Join Now</Link>
      </section>
    </div>
  );
}

export default Home;
