import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';


function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user && user.role === 'admin' && <Route path="/admin" element={<Admin />} />}
          {user && user.role === 'customer' && <Route path="/customer" element={<Customer />} />}
          {user && user.role === 'customer' && <Route path="/cart" element={<Cart />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
