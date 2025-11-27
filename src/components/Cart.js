import React, { useState } from 'react';

function Cart({ cart, removeFromCart, currentUser }) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    phone: '',
    billingAddress: '',
    billingCity: '',
    billingZipCode: '',
    billingCountry: '',
    shippingAddress: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingCountry: '',
    sameAsBilling: true,
    savePaymentInfo: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  // Calculate discount for registered users and item-specific discounts
  const isMember = currentUser && currentUser.registeredDate;
  const memberDiscount = isMember ? 0.2 : 0; // 20% discount for members
  const subtotal = cart.reduce((sum, item) => {
    const price = item.discountedPrice && item.discountExpiry && Date.now() < item.discountExpiry ? item.discountedPrice : item.price;
    return sum + price;
  }, 0);
  const memberDiscountAmount = subtotal * memberDiscount;
  const total = subtotal - memberDiscountAmount;

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePaymentDetails = () => {
    const newErrors = {};

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!paymentDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentDetails.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!paymentDetails.email || !/\S+@\S+\.\S+/.test(paymentDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!paymentDetails.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    }

    if (!paymentDetails.billingAddress.trim()) {
      newErrors.billingAddress = 'Please enter your billing address';
    }

    if (!paymentDetails.billingCity.trim()) {
      newErrors.billingCity = 'Please enter your billing city';
    }

    if (!paymentDetails.billingZipCode.trim()) {
      newErrors.billingZipCode = 'Please enter your billing ZIP code';
    }

    if (!paymentDetails.billingCountry.trim()) {
      newErrors.billingCountry = 'Please enter your billing country';
    }

    if (!paymentDetails.sameAsBilling) {
      if (!paymentDetails.shippingAddress.trim()) {
        newErrors.shippingAddress = 'Please enter your shipping address';
      }

      if (!paymentDetails.shippingCity.trim()) {
        newErrors.shippingCity = 'Please enter your shipping city';
      }

      if (!paymentDetails.shippingZipCode.trim()) {
        newErrors.shippingZipCode = 'Please enter your shipping ZIP code';
      }

      if (!paymentDetails.shippingCountry.trim()) {
        newErrors.shippingCountry = 'Please enter your shipping country';
      }
    }

    if (!paymentDetails.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentDetails()) {
      // Simulate payment processing
      alert('Payment successful! Thank you for your purchase.');
      // Here you would typically send the payment details to your backend
      setShowPaymentForm(false);
      // Clear cart after successful payment
      // This would need to be handled by parent component
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formatted
    }));
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: ''
      }));
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>
                    {item.discountedPrice && item.discountExpiry && Date.now() < item.discountExpiry
                      ? `$${item.discountedPrice.toFixed(2)} (was $${item.price.toFixed(2)})`
                      : `$${item.price.toFixed(2)}`
                    }
                  </p>
                </div>
                <button onClick={() => removeFromCart(index)} className="remove-btn">Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            {isMember && (
              <p className="member-discount">Member Discount: 20% off (${memberDiscountAmount.toFixed(2)})</p>
            )}
            <h3>Total: ${total.toFixed(2)}</h3>
            {!showPaymentForm ? (
              <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
            ) : (
              <div className="payment-form-container">
                <h3>Payment Details</h3>
                <form onSubmit={handlePaymentSubmit} className="payment-form">
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={paymentDetails.paymentMethod}
                      onChange={handlePaymentChange}
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={errors.expiryDate ? 'error' : ''}
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="4"
                        className={errors.cvv ? 'error' : ''}
                      />
                      {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={paymentDetails.name}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={paymentDetails.email}
                      onChange={handlePaymentChange}
                      placeholder="john@example.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={paymentDetails.phone}
                      onChange={handlePaymentChange}
                      placeholder="(555) 123-4567"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <h4>Billing Address</h4>
                  <div className="form-group">
                    <label htmlFor="billingAddress">Billing Address</label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={paymentDetails.billingAddress}
                      onChange={handlePaymentChange}
                      placeholder="123 Main Street"
                      className={errors.billingAddress ? 'error' : ''}
                    />
                    {errors.billingAddress && <span className="error-message">{errors.billingAddress}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="billingCity">City</label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        value={paymentDetails.billingCity}
                        onChange={handlePaymentChange}
                        placeholder="New York"
                        className={errors.billingCity ? 'error' : ''}
                      />
                      {errors.billingCity && <span className="error-message">{errors.billingCity}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="billingZipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="billingZipCode"
                        name="billingZipCode"
                        value={paymentDetails.billingZipCode}
                        onChange={handlePaymentChange}
                        placeholder="10001"
                        className={errors.billingZipCode ? 'error' : ''}
                      />
                      {errors.billingZipCode && <span className="error-message">{errors.billingZipCode}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingCountry">Country</label>
                    <input
                      type="text"
                      id="billingCountry"
                      name="billingCountry"
                      value={paymentDetails.billingCountry}
                      onChange={handlePaymentChange}
                      placeholder="United States"
                      className={errors.billingCountry ? 'error' : ''}
                    />
                    {errors.billingCountry && <span className="error-message">{errors.billingCountry}</span>}
                  </div>

                  <h4>Shipping Address</h4>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="sameAsBilling"
                        checked={paymentDetails.sameAsBilling}
                        onChange={(e) => setPaymentDetails(prev => ({
                          ...prev,
                          sameAsBilling: e.target.checked,
                          shippingAddress: e.target.checked ? prev.billingAddress : prev.shippingAddress,
                          shippingCity: e.target.checked ? prev.billingCity : prev.shippingCity,
                          shippingZipCode: e.target.checked ? prev.billingZipCode : prev.shippingZipCode,
                          shippingCountry: e.target.checked ? prev.billingCountry : prev.shippingCountry
                        }))}
                      />
                      Same as billing address
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingAddress">Shipping Address</label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={paymentDetails.shippingAddress}
                      onChange={handlePaymentChange}
                      placeholder="123 Main Street"
                      disabled={paymentDetails.sameAsBilling}
                      className={errors.shippingAddress ? 'error' : ''}
                    />
                    {errors.shippingAddress && <span className="error-message">{errors.shippingAddress}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="shippingCity">City</label>
                      <input
                        type="text"
                        id="shippingCity"
                        name="shippingCity"
                        value={paymentDetails.shippingCity}
                        onChange={handlePaymentChange}
                        placeholder="New York"
                        disabled={paymentDetails.sameAsBilling}
                        className={errors.shippingCity ? 'error' : ''}
                      />
                      {errors.shippingCity && <span className="error-message">{errors.shippingCity}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="shippingZipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="shippingZipCode"
                        name="shippingZipCode"
                        value={paymentDetails.shippingZipCode}
                        onChange={handlePaymentChange}
                        placeholder="10001"
                        disabled={paymentDetails.sameAsBilling}
                        className={errors.shippingZipCode ? 'error' : ''}
                      />
                      {errors.shippingZipCode && <span className="error-message">{errors.shippingZipCode}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingCountry">Country</label>
                    <input
                      type="text"
                      id="shippingCountry"
                      name="shippingCountry"
                      value={paymentDetails.shippingCountry}
                      onChange={handlePaymentChange}
                      placeholder="United States"
                      disabled={paymentDetails.sameAsBilling}
                      className={errors.shippingCountry ? 'error' : ''}
                    />
                    {errors.shippingCountry && <span className="error-message">{errors.shippingCountry}</span>}
                  </div>



                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="savePaymentInfo"
                        checked={paymentDetails.savePaymentInfo}
                        onChange={(e) => setPaymentDetails(prev => ({
                          ...prev,
                          savePaymentInfo: e.target.checked
                        }))}
                      />
                      Save payment information for future purchases
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={paymentDetails.acceptTerms}
                        onChange={(e) => setPaymentDetails(prev => ({
                          ...prev,
                          acceptTerms: e.target.checked
                        }))}
                        className={errors.acceptTerms ? 'error' : ''}
                      />
                      I accept the terms and conditions
                    </label>
                    {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                  </div>

                  <div className="payment-buttons">
                    <button type="button" onClick={() => setShowPaymentForm(false)} className="cancel-payment-btn">
                      Cancel
                    </button>
                    <button type="submit" className="confirm-payment-btn">
                      Pay ${total.toFixed(2)}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
