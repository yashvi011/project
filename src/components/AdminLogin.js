import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get admin credentials from localStorage or use defaults
    const savedAdmin = localStorage.getItem('beautyBeatsAdmin');
    const adminCredentials = savedAdmin ? JSON.parse(savedAdmin) : { username: 'admin', password: 'admin' };

    // Simple admin authentication logic
    if (username === adminCredentials.username && password === adminCredentials.password) {
      onLogin();
      // Redirect to admin dashboard after login
      history.push('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPassword
        users={[{ id: 1, email: 'admin@beautybeats.com', username: 'admin', password: 'admin' }]} // Mock admin user for password reset
        onPasswordReset={(userId, newPassword) => {
          // In a real app, this would update the admin password securely
          alert('Admin password reset successful! New password: ' + newPassword + ' (Demo only - in real app this would be emailed)');
          setShowForgotPassword(false);
        }}
        isAdmin={true}
      />
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        <p>Enter your admin credentials to access the dashboard.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Admin Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Admin Login
          </button>
        </form>
        <p>
          <button
            className="forgot-btn"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Admin Password?
          </button>
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;
