import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile';
import Likes from './components/Likes';

function App() {
  const [userData, setUserData] = useState({}); // Store user-specific data: {userId: {likedProducts: [], cart: []}}
  const [currentUser, setCurrentUser] = useState(null); // null or user object for regular users
  const [currentAdmin, setCurrentAdmin] = useState(null); // null or 'admin' for admin
  const [adminProfile, setAdminProfile] = useState({ username: 'admin', email: 'admin@beautybeats.com', password: 'admin' });
  const [feedbacks, setFeedbacks] = useState([]); // Store user feedback

  // Get current user's data
  const currentUserData = currentUser ? userData[currentUser.id] || { likedProducts: [], cart: [] } : { likedProducts: [], cart: [] };
  const likedProducts = currentUserData.likedProducts || [];
  const cart = currentUserData.cart || [];

  // Initialize products with localStorage persistence
  const getInitialProducts = () => {
    const savedProducts = localStorage.getItem('beautyBeatsProducts');
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (error) {
        console.error('Error parsing saved products:', error);
        return [];
      }
    }
    // Default products if no saved products exist
    return [
      {
        id: 1,
        name: 'Red Lipstick',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
        category: 'Makeup'
      },
      {
        id: 2,
        name: 'Foundation',
        price: 25.99,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
        category: 'Makeup'
      },
      {
        id: 3,
        name: 'Mascara',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
        category: 'Makeup'
      },
      {
        id: 4,
        name: 'Skincare Cream',
        price: 30.99,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
        category: 'Skincare'
      },
      {
        id: 5,
        name: 'Eyeshadow Palette',
        price: 20.99,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
        category: 'Makeup'
      },
      {
        id: 6,
        name: 'Blush',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
        category: 'Makeup'
      },
      {
        id: 7,
        name: 'Perfume',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
        category: 'Fragrance'
      },
      {
        id: 8,
        name: 'Hair Shampoo',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
        category: 'Hair Care'
      }
    ];
  };

  const [products, setProducts] = useState(getInitialProducts);

  // Initialize users with localStorage persistence
  const getInitialUsers = () => {
    const savedUsers = localStorage.getItem('beautyBeatsUsers');
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (error) {
        console.error('Error parsing saved users:', error);
        return [];
      }
    }
    return [];
  };

  const [users, setUsers] = useState(getInitialUsers);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('beautyBeatsProducts', JSON.stringify(products));
  }, [products]);

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('beautyBeatsUsers', JSON.stringify(users));
  }, [users]);

  // Save user data to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('beautyBeatsUserData', JSON.stringify(userData));
  }, [userData]);

  // Save admin profile to localStorage whenever adminProfile changes
  useEffect(() => {
    localStorage.setItem('beautyBeatsAdmin', JSON.stringify(adminProfile));
  }, [adminProfile]);

  // Save feedbacks to localStorage whenever feedbacks change
  useEffect(() => {
    localStorage.setItem('beautyBeatsFeedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Save current user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('beautyBeatsCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('beautyBeatsCurrentUser');
    }
  }, [currentUser]);

  // Save current admin to localStorage whenever currentAdmin changes
  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem('beautyBeatsCurrentAdmin', JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem('beautyBeatsCurrentAdmin');
    }
  }, [currentAdmin]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('beautyBeatsUserData');
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        setUserData({});
      }
    }
  }, []);

  // Load current user and admin from localStorage on component mount
  useEffect(() => {
    const savedCurrentUser = localStorage.getItem('beautyBeatsCurrentUser');
    if (savedCurrentUser) {
      try {
        setCurrentUser(JSON.parse(savedCurrentUser));
      } catch (error) {
        console.error('Error parsing saved current user:', error);
      }
    }
    const savedCurrentAdmin = localStorage.getItem('beautyBeatsCurrentAdmin');
    if (savedCurrentAdmin) {
      try {
        setCurrentAdmin(JSON.parse(savedCurrentAdmin));
      } catch (error) {
        console.error('Error parsing saved current admin:', error);
      }
    }
  }, []);

  // Load feedbacks from localStorage on component mount
  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('beautyBeatsFeedbacks');
    const savedFeedbacksFromProducts = localStorage.getItem('feedbacks');
    let allFeedbacks = [];

    if (savedFeedbacks) {
      try {
        allFeedbacks = JSON.parse(savedFeedbacks);
      } catch (error) {
        console.error('Error parsing saved feedbacks:', error);
        allFeedbacks = [];
      }
    }

    if (savedFeedbacksFromProducts) {
      try {
        const productFeedbacks = JSON.parse(savedFeedbacksFromProducts);
        allFeedbacks = [...allFeedbacks, ...productFeedbacks];
      } catch (error) {
        console.error('Error parsing product feedbacks:', error);
      }
    }

    setFeedbacks(allFeedbacks);
  }, []);

  const toggleLike = (productId) => {
    if (currentUser) {
      setUserData(prev => ({
        ...prev,
        [currentUser.id]: {
          ...prev[currentUser.id],
          likedProducts: prev[currentUser.id]?.likedProducts?.includes(productId)
            ? prev[currentUser.id].likedProducts.filter(id => id !== productId)
            : [...(prev[currentUser.id]?.likedProducts || []), productId]
        }
      }));
    }
  };

  const addToCart = (product) => {
    if (currentUser) {
      setUserData(prev => ({
        ...prev,
        [currentUser.id]: {
          ...prev[currentUser.id],
          cart: [...(prev[currentUser.id]?.cart || []), product]
        }
      }));
    }
  };

  const removeFromCart = (index) => {
    if (currentUser) {
      setUserData(prev => ({
        ...prev,
        [currentUser.id]: {
          ...prev[currentUser.id],
          cart: prev[currentUser.id]?.cart?.filter((_, i) => i !== index) || []
        }
      }));
    }
  };

  const handleUserLogin = (userObj) => {
    setCurrentUser(userObj);
  };

  const handleAdminLogin = () => {
    setCurrentAdmin('admin');
  };

  const handleUserRegister = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(), // Simple ID generation
      registeredDate: new Date().toISOString(),
      membershipType: userData.membershipType || 'annual',
      membershipExpiry: userData.membershipType === 'annual'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 1 month from now
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
  };

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('beautyBeatsUsers', JSON.stringify(updatedUsers));
  };

  const cartCount = cart.length;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/">Beauty Beats</Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/likes">Likes</Link></li>
              <li><Link to="/cart">Cart ({cartCount})</Link></li>
              {currentUser && <li><Link to="/profile">Profile</Link></li>}
              <li><Link to={currentAdmin === 'admin' ? "/admin-dashboard" : "/admin-login"}>Admin</Link></li>
              {currentUser ? (
                <li><button onClick={handleUserLogout} className="logout-btn">Logout User</button></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
              {currentAdmin && (
                <li><button onClick={handleAdminLogout} className="logout-btn">Logout Admin</button></li>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" render={() => (
              <Products
                addToCart={addToCart}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
                products={products}
                currentUser={currentUser}
              />
            )} />
            <Route exact path="/cart" render={() => (
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                currentUser={currentUser}
              />
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" render={() => (
              <Login onLogin={handleUserLogin} onUserRegister={handleUserRegister} users={users} />
            )} />
            <Route exact path="/register" render={() => (
              <Register onRegister={handleUserRegister} />
            )} />
            <Route exact path="/profile" render={() => (
              currentUser ? (
                <UserProfile
                  user={currentUser}
                  cart={cart}
                  likedProducts={likedProducts}
                  products={products}
                  onUpdateProfile={(userId, updatedData) => {
                    setUsers(prev => prev.map(user =>
                      user.id === userId ? { ...user, ...updatedData } : user
                    ));
                    setCurrentUser(prev => prev ? { ...prev, ...updatedData } : prev);
                  }}
                />
              ) : (
                <Login onLogin={handleUserLogin} />
              )
            )} />
            <Route exact path="/admin-login" render={() => (
              <AdminLogin onLogin={handleAdminLogin} />
            )} />
            <Route exact path="/admin-dashboard" render={() => (
              currentAdmin === 'admin' ? (
                <AdminDashboard products={products} setProducts={setProducts} onLogout={handleAdminLogout} users={users} setUsers={setUsers} feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            )} />
            <Route exact path="/admin-profile" render={() => (
              currentAdmin === 'admin' ? (
                <AdminProfile
                  admin={adminProfile}
                  onUpdateProfile={(updatedData) => {
                    setAdminProfile(updatedData);
                    // In a real app, this would update a secure admin database
                  }}
                />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            )} />
            <Route exact path="/likes" render={() => (
              <Likes
                likedProducts={likedProducts.map(id => products.find(p => p.id === id)).filter(Boolean)}
                onLike={toggleLike}
                onAddToCart={addToCart}
                user={currentUser}
              />
            )} />
            <Route exact path="/product/:id" render={() => (
              <ProductDetail
                products={products}
                addToCart={addToCart}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
                currentUser={currentUser}
              />
            )} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
