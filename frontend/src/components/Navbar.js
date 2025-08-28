
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Simulate auth and role (replace with real auth context later)
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: 'linear-gradient(90deg, #000 60%, #ff4500 100%)', color: '#fff', borderBottom: '4px solid #e10600' }} className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" style={{ color: '#fff', letterSpacing: 2 }} to="/">UMUHOZA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#fff' }} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: '#fff' }} to="/products">Products</Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" style={{ color: '#fff' }} to="/admin">Admin Dashboard</Link>
              </li>
            )}
            {user && user.role === 'customer' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: '#fff' }} to="/customer">My Account</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: '#fff' }} to="/cart">Cart</Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: '#fff' }} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: '#fff' }} to="/register">Register</Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
