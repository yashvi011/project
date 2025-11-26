  import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';

function Login({ onLogin, onUserRegister, users }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Registration logic
      if (username && password && email) {
        // Validate password length
        if (password.length < 6) {
          alert('Password must be at least 6 characters long!');
          return;
        }
        // Check if user already exists
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
          alert('User with this username or email already exists!');
          return;
        }
        const userData = {
          id: Date.now(),
          username,
          email,
          password, // In a real app, this would be hashed
          registrationDate: new Date().toISOString(),
          role: 'user'
        };
        onUserRegister(userData);
        onLogin(userData);
        alert('Registration successful!');
      } else {
        alert('Please fill in all fields');
      }
    } else {
      // Login logic - check against stored users
      const existingUser = users.find(user => user.username === username && user.password === password);
      if (existingUser) {
        onLogin(existingUser);
        alert('Login successful!');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPassword
        users={users}
        onPasswordReset={(userId, newPassword) => {
          // Update user password in the users array
          const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, password: newPassword } : user
          );
          // Update localStorage
          localStorage.setItem('beautyBeatsUsers', JSON.stringify(updatedUsers));
          // Reset to login view
          setShowForgotPassword(false);
          alert('Password reset successful! Please login with your new password.');
        }}
        isAdmin={false}
      />
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isRegistering ? 'Register' : 'User Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <p>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button
            className="toggle-btn"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
        {!isRegistering && (
          <p>
            <button
              className="forgot-btn"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;
