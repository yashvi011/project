
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ products, setProducts, onLogout, users, setUsers, feedbacks, setFeedbacks }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Makeup',
    description: '',
    stock: '',
    ingredients: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const history = useHistory();

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', image: '', category: 'Makeup' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description || '',
      brand: product.brand || '',
      stock: product.stock || '',
      ingredients: product.ingredients || ''
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      category: newProduct.category,
      description: newProduct.description,
      brand: newProduct.brand,
      stock: newProduct.stock,
      ingredients: newProduct.ingredients
    };
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', image: '', category: 'Makeup', description: '', brand: '', stock: '', ingredients: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
  };

  // Removed handleDeleteUser function to prevent admin from deleting registered users

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', image: '', category: 'Makeup' });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-actions">
          <Link to="/admin-profile" className="admin-profile-link">Admin Profile</Link>
          <button className="admin-logout-btn" onClick={() => { onLogout(); history.push('/admin-login'); }}>Logout</button>
        </div>
      </div>
      <div className="add-product-form">
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            required
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          >
            <option value="Makeup">Makeup</option>
            <option value="Skincare">Skincare</option>
            <option value="Fragrance">Fragrance</option>
            <option value="Hair Care">Hair Care</option>
          </select>
          <textarea
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            rows="3"
          />
          <textarea
            placeholder="Ingredients (comma separated)"
            value={newProduct.ingredients}
            onChange={(e) => setNewProduct({...newProduct, ingredients: e.target.value})}
            rows="2"
          />
          <div className="form-buttons">
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            {editingProduct && (
              <button type="button" onClick={cancelEdit} className="cancel-btn">Cancel</button>
            )}
          </div>
        </form>
      </div>
      <div className="user-list">
        <h3>Registered Users ({users.length})</h3>
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h4>{user.username}</h4>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Member since: {new Date(user.registeredDate).toLocaleDateString()}</p>
              <p>Membership: {user.membershipType ? (user.membershipType === 'annual' ? 'Annual ($49.99/year)' : 'Monthly ($4.99/month)') : 'Non'}</p>
              <p>Expires: {user.membershipExpiry ? new Date(user.membershipExpiry).toLocaleDateString() : 'N/A'}</p>
              <div className="user-actions">
                <button onClick={() => handleViewUserDetails(user)} className="view-details-btn">View Details</button>
                {/* Admin cannot delete registered users - they remain permanently */}
              </div>
            </div>
          ))}
        </div>
        {selectedUser && (
          <div className="user-details-modal">
            <div className="user-details-content">
              <h3>User Details: {selectedUser.username}</h3>
              <div className="user-details-info">
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || 'Not provided'}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Member since:</strong> {new Date(selectedUser.registeredDate).toLocaleDateString()}</p>
                <p><strong>Membership Type:</strong> {selectedUser.membershipType ? (selectedUser.membershipType === 'annual' ? 'Annual ($49.99/year)' : 'Monthly ($4.99/month)') : 'Non'}</p>
                <p><strong>Membership Expires:</strong> {selectedUser.membershipExpiry ? new Date(selectedUser.membershipExpiry).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Account Status:</strong> Active</p>
                <p><strong>Password Strength:</strong> {selectedUser.password && selectedUser.password.length >= 6 ? 'Strong' : 'Weak'}</p>
                {/* Note: Bank details are intentionally excluded as per requirements */}
              </div>
              <button onClick={() => setSelectedUser(null)} className="close-details-btn">Close</button>
            </div>
          </div>
        )}
      </div>
      <div className="product-list">
        <h3>Current Products ({products.length})</h3>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p>Stock: {product.stock || 'N/A'}</p>
              <p>Category: {product.category}</p>
              <div className="product-actions">
                <button onClick={() => handleEditProduct(product)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-list">
        <h3>User Feedback ({feedbacks.length})</h3>
        {feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-grid">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-header">
                  <h4>{feedback.productName}</h4>
                  <div className="rating">
                    {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                  </div>
                </div>
                <p className="feedback-user">By: {feedback.username}</p>
                <p className="feedback-text">{feedback.feedback}</p>
                <p className="feedback-date">Submitted: {new Date(feedback.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
