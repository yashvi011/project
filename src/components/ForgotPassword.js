import React, { useState } from 'react';

function ForgotPassword({ users, onPasswordReset, isAdmin = false }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email);
    if (user) {
      if (newPassword.length >= 6) {
        onPasswordReset(user.id, newPassword);
        alert('Password reset successful! Please login with your new password.');
        setEmail('');
        setNewPassword('');
      } else {
        alert('New password must be at least 6 characters long.');
      }
    } else {
      alert('Email not found in our records.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password {isAdmin ? '(Admin)' : ''}</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password (min 6 characters):</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-btn">Reset Password</button>
        </form>
        <p>
          <button
            className="back-btn"
            onClick={() => {
              setEmail('');
              setNewPassword('');
              // For admin, navigate back to admin login
              if (isAdmin) {
                window.location.href = '/admin-login';
              } else {
                window.location.href = '/login';
              }
            }}
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
