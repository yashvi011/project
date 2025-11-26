import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    membershipType: 'annual' // Default to annual membership
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    // Show payment modal instead of direct registration
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (userData) => {
    // Complete registration after successful payment
    const registrationData = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      registeredDate: new Date().toISOString(),
      membershipType: userData.membershipType,
      membershipExpiry: userData.membershipType === 'annual'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    onRegister(registrationData);
    alert('Registration successful! Welcome to Beauty Beats!');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Join Beauty Beats Membership</h2>
        <p>Create your account to enjoy exclusive offers and free shipping!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="membershipType">Membership Type</label>
            <select
              id="membershipType"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              required
            >
              <option value="annual">Annual Membership - $49.99/year</option>
              <option value="monthly">Monthly Membership - $4.99/month</option>
            </select>
          </div>
          <button type="submit" className="register-btn">Create Account & Pay Membership Fee</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        membershipType={formData.membershipType}
        onPaymentSuccess={handlePaymentSuccess}
        userData={formData}
      />
    </div>
  );
}

export default Register;
