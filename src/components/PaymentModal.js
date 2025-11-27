import React, { useState, useEffect } from 'react';

// Utility functions for payment validation
const luhnAlgorithm = (cardNumber) => {
  const digits = cardNumber.replace(/\s/g, '').split('').reverse().map(Number);
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    if (i % 2 === 1) {
      digits[i] *= 2;
      if (digits[i] > 9) digits[i] -= 9;
    }
    sum += digits[i];
  }

  return sum % 10 === 0;
};

const validateExpiryDate = (expiryDate) => {
  const [month, year] = expiryDate.split('/').map(Number);
  if (!month || !year || month < 1 || month > 12) return false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) return false;

  return true;
};

const validateCVV = (cvv, cardNumber) => {
  const cleanCard = cardNumber.replace(/\s/g, '');
  const cvvLength = cvv.length;

  // American Express cards have 4-digit CVV, others have 3
  if (cleanCard.startsWith('3')) {
    return cvvLength === 4;
  }
  return cvvLength === 3;
};

function PaymentModal({ isOpen, onClose, membershipType, onPaymentSuccess, userData }) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const membershipPrice = membershipType === 'annual' ? 49.99 : 4.99;
  const membershipLabel = membershipType === 'annual' ? 'Annual Membership' : 'Monthly Membership';

  // Rate limiting: max 3 attempts
  const maxAttempts = 3;

  useEffect(() => {
    if (isOpen) {
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
      setErrors({});
      setAttemptCount(0);
    }
  }, [isOpen]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'cardNumber':
        const cleanCard = value.replace(/\s/g, '');
        if (cleanCard.length < 13 || cleanCard.length > 19) {
          newErrors.cardNumber = 'Card number must be 13-19 digits';
        } else if (!/^\d+$/.test(cleanCard)) {
          newErrors.cardNumber = 'Card number must contain only digits';
        } else if (!luhnAlgorithm(cleanCard)) {
          newErrors.cardNumber = 'Invalid card number';
        } else {
          delete newErrors.cardNumber;
        }
        break;

      case 'expiryDate':
        if (!/^\d{2}\/\d{2}$/.test(value)) {
          newErrors.expiryDate = 'Expiry date must be in MM/YY format';
        } else if (!validateExpiryDate(value)) {
          newErrors.expiryDate = 'Card has expired or invalid date';
        } else {
          delete newErrors.expiryDate;
        }
        break;

      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) {
          newErrors.cvv = 'CVV must be 3 or 4 digits';
        } else if (!validateCVV(value, paymentData.cardNumber)) {
          newErrors.cvv = 'Invalid CVV for this card type';
        } else {
          delete newErrors.cvv;
        }
        break;

      case 'cardholderName':
        if (value.trim().length < 2) {
          newErrors.cardholderName = 'Cardholder name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          newErrors.cardholderName = 'Name must contain only letters and spaces';
        } else {
          delete newErrors.cardholderName;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    } else if (name === 'cvv') {
      // Only allow digits for CVV
      formattedValue = value.replace(/\D/g, '');
    }

    setPaymentData({
      ...paymentData,
      [name]: formattedValue
    });

    // Real-time validation
    if (formattedValue) {
      validateField(name, formattedValue);
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const allFieldsValid = Object.keys(paymentData).every(field =>
      validateField(field, paymentData[field])
    );

    if (!allFieldsValid || Object.keys(errors).length > 0) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }

    // Check rate limiting
    if (attemptCount >= maxAttempts) {
      alert('Too many payment attempts. Please try again later.');
      onClose();
      return;
    }

    setIsProcessing(true);
    setAttemptCount(prev => prev + 1);

    // Enhanced payment processing simulation
    setTimeout(() => {
      // Simulate various payment scenarios
      const scenarios = [
        { success: true, message: 'Payment successful!' },
        { success: false, message: 'Payment declined. Insufficient funds.' },
        { success: false, message: 'Payment failed. Invalid card details.' },
        { success: false, message: 'Payment failed. Card expired.' },
        { success: false, message: 'Payment failed. Network error.' },
        { success: false, message: 'Payment failed. Fraud detected.' },
        { success: false, message: 'Payment failed. Card blocked.' },
        { success: false, message: 'Payment failed. Bank declined transaction.' },
        { success: false, message: 'Payment failed. Technical error.' },
        { success: true, message: 'Payment successful!' } // 10% success rate
      ];

      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];

      if (randomScenario.success) {
        onPaymentSuccess(userData);
        onClose();
      } else {
        alert(randomScenario.message);
      }
      setIsProcessing(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Complete Your Payment</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="payment-summary">
          <h3>Membership Details</h3>
          <p><strong>{membershipLabel}</strong></p>
          <p>Price: <strong>${membershipPrice.toFixed(2)}</strong></p>
          <p>Duration: {membershipType === 'annual' ? '1 Year' : '1 Month'}</p>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className={errors.cardholderName ? 'error' : ''}
            />
            {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
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
                value={paymentData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                required
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
                value={paymentData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                required
                className={errors.cvv ? 'error' : ''}
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>

          <div className="payment-notice">
            <p>🔒 Your payment information is secure and encrypted.</p>
            <p>This is a demo payment system. No real charges will be made.</p>
          </div>

          <button
            type="submit"
            className="pay-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `Pay $${membershipPrice.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
