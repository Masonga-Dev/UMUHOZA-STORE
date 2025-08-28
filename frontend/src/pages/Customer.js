
import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Customer = () => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api.get('/my-orders/').then(res => setOrders(res.data));
    api.get('/profile/').then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2 className="mb-4" style={{ color: '#ff4500' }}>My Account</h2>
      <div className="mb-4">
        <h5>Profile</h5>
        <ul className="list-group">
          <li className="list-group-item"><b>Name:</b> {profile.username}</li>
          <li className="list-group-item"><b>Email:</b> {profile.email}</li>
        </ul>
      </div>
      <div>
        <h5>Order History</h5>
        <table className="table table-bordered">
          <thead style={{ background: '#000', color: '#fff' }}>
            <tr>
              <th>ID</th><th>Status</th><th>Date</th><th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.status}</td><td>{o.created_at}</td>
                <td>
                  <ul>
                    {o.items && o.items.map(i => (
                      <li key={i.id}>{i.product && i.product.name ? i.product.name : i.product_name} x {i.quantity}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
