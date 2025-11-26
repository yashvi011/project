import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminProfile.css';

function AdminProfile({ admin, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editData, setEditData] = useState({
    username: admin.username || 'admin',
    email: admin.email || 'admin@beautybeats.com',
    password: admin.password || 'admin',
    phone: admin.phone || ''
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
    onUpdateProfile(editData);
    setIsEditing(false);
    alert('Admin profile updated successfully!');
  };

  const isDefaultPassword = admin.password === 'admin';

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!isDefaultPassword && passwordData.currentPassword !== admin.password) {
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
    onUpdateProfile({ ...admin, password: passwordData.newPassword });
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert(isDefaultPassword ? 'Password created successfully!' : 'Password changed successfully!');
  };

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h2>Admin Profile</h2>
        <Link to="/admin-dashboard" className="back-to-dashboard-btn">Back to Admin Dashboard</Link>
      </div>
      <div className="profile-info">
        <h3>Welcome, Admin!</h3>
        <p>Role: Administrator</p>
        <p>Email: {admin.email || 'admin@beautybeats.com'}</p>
        <p>Phone: {admin.phone || 'Not provided'}</p>
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
          <h3>Edit Admin Profile</h3>
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
          <h3>{isDefaultPassword ? 'Create Password' : 'Change Password'}</h3>
          <form onSubmit={handlePasswordSubmit}>
            {!isDefaultPassword && (
              <div className="form-group">
                <label>Current Password:</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                />
              </div>
            )}
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
            <button type="submit" className="update-btn">{isDefaultPassword ? 'Create Password' : 'Change Password'}</button>
            <button type="button" onClick={() => setIsChangingPassword(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      ) : (
        <div className="profile-stats">
          <div className="stat">
            <h4>Account Security</h4>
            <p>Password: {admin.password && admin.password.length >= 6 ? 'Strong' : 'Weak'}</p>
          </div>
          <div className="stat">
            <h4>Admin Privileges</h4>
            <p>Full Access</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
