import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ user, cart, likedProducts, products, onUpdateProfile }) {
  const likedProductDetails = products.filter(p => likedProducts.includes(p.id));
  const totalSpent = cart.reduce((sum, item) => sum + item.price, 0);
  const purchasedProducts = cart; // Assuming cart items are purchased products for demo
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    onUpdateProfile(user.id, editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.currentPassword !== user.password) {
      alert('Current password is incorrect!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long!');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    onUpdateProfile(user.id, { ...user, password: passwordData.newPassword });
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <h3>Welcome, {user.username}!</h3>
        <p>Role: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone || 'Not provided'}</p>
        <p>Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
        {user.membershipType ? (
          <>
            <p>Membership Type: {user.membershipType === 'annual' ? 'Annual ($49.99/year)' : 'Monthly ($4.99/month)'}</p>
            <p>Membership Expires: {new Date(user.membershipExpiry).toLocaleDateString()}</p>
          </>
        ) : (
          <p>Membership: Non</p>
        )}
        <p>Account Status: Active</p>
        {!isEditing && !isChangingPassword && (
          <>
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
            <button onClick={() => setIsChangingPassword(true)} className="change-password-btn">Change Password</button>
          </>
        )}
      </div>
      {isEditing ? (
        <div className="edit-profile">
          <h3>Edit Profile</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({...editData, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>New Password (min 6 characters):</label>
              <input
                type="password"
                value={editData.password}
                onChange={(e) => setEditData({...editData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="update-btn">Update Profile</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      ) : isChangingPassword ? (
        <div className="change-password">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password (min 6 characters):</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="update-btn">Change Password</button>
            <button type="button" onClick={() => setIsChangingPassword(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <div className="profile-stats">
            <div className="stat">
              <h4>Items in Cart</h4>
              <p>{cart.length}</p>
            </div>
            <div className="stat">
              <h4>Liked Products</h4>
              <p>{likedProducts.length}</p>
            </div>
            <div className="stat">
              <h4>Total Cart Value</h4>
              <p>${totalSpent.toFixed(2)}</p>
            </div>
            <div className="stat">
              <h4>Account Security</h4>
              <p>Password: {user.password.length >= 6 ? 'Strong' : 'Weak'}</p>
            </div>
          </div>
          <div className="purchased-products">
            <h3>Your Purchased Products</h3>
            {purchasedProducts.length === 0 ? (
              <p>You haven't purchased any products yet.</p>
            ) : (
              <div className="purchased-grid">
                {purchasedProducts.map((product, index) => (
                  <div key={index} className="purchased-item">
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                    <p className="purchase-date">Purchased on: {new Date().toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="liked-products">
            <h3>Your Liked Products</h3>
            {likedProductDetails.length === 0 ? (
              <p>You haven't liked any products yet.</p>
            ) : (
              <div className="liked-grid">
                {likedProductDetails.map(product => (
                  <div key={product.id} className="liked-item">
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
