import React, { useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [message, setMessage] = useState('');

  const handleRemove = (sku) => {
    const updated = cart.filter(item => item.sku !== sku);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = async () => {
    try {
      // Replace with your backend endpoint
      await axios.post('/orders/', { items: cart });
      setCart([]);
      localStorage.removeItem('cart');
      setMessage('Order placed successfully!');
    } catch (err) {
      setMessage('Error placing order.');
    }
  };

  return (
    <div>
      <h2 className="mb-4" style={{ color: '#e10600' }}>Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead style={{ background: '#ff4500', color: '#fff' }}>
              <tr>
                <th>Name</th><th>Brand</th><th>Qty</th><th>Price</th><th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.sku}>
                  <td>{item.name}</td><td>{item.brand}</td><td>{item.quantity}</td><td>{item.price}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.sku)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
