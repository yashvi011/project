import React from 'react';

function About() {
  return (
    <div className="about-page">
      <h2>About Beauty Beats</h2>
      <p>Beauty Beats is your ultimate destination for premium beauty and wellness products. We believe that everyone deserves to feel confident and beautiful in their own skin.</p>
      <div className="about-content">
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>To provide high-quality, affordable beauty products that enhance your natural beauty and boost your confidence.</p>
        </div>
        <div className="about-section">
          <h3>Our Values</h3>
          <ul>
            <li>Quality: Only the best ingredients and formulations</li>
            <li>Inclusivity: Beauty for all skin types and tones</li>
            <li>Sustainability: Eco-friendly packaging and practices</li>
            <li>Education: Empowering you with beauty knowledge</li>
          </ul>
        </div>
        <div className="about-section">
          <h3>Our Services</h3>
          <ul>
            <li>Personalized Beauty Consultations</li>
            <li>Virtual Makeup Trials</li>
            <li>Skin Care Analysis</li>
            <li>Beauty Workshops and Tutorials</li>
            <li>Custom Product Recommendations</li>
            <li>Loyalty Program and Rewards</li>
          </ul>
        </div>
        <div className="about-section">
          <h3>Contact Us</h3>
          <ul>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Email:</strong> info@beautybeats.com</li>
            <li><strong>Instagram:</strong> @beautybeats</li>
            <li><strong>Facebook:</strong> Beauty Beats Official</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
